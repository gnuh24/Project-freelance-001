package BackEnd.Service.AccountServices.AccountService;

import BackEnd.Configure.ErrorResponse.TheValueAlreadyExists;
import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Entity.AccountEntity.Token;
import BackEnd.Event.OnSendRegistrationUserConfirmViaEmailEvent;
import BackEnd.Form.AccountForm.AccountCreateForm;
import BackEnd.Repository.AccountRepository.IAccountRepository;
import BackEnd.Service.AccountServices.TokenServices.ITokenService;
import BackEnd.Service.AccountServices.UserInformationService.IUserInformationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private IAccountRepository repository;

    @Autowired
    private IUserInformationService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ITokenService tokenService;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    private ModelMapper modelMapper;

//    @Override
//    public Page<Account> getAllAccounts(Pageable pageable, String search, AccountFilterForm form) {
//        Specification<Account> buildWhere = AccountSpecification.buildWhere(search, form);
//        return repository.findAll(buildWhere, pageable);
//    }
//
//    @Override
//    public Account getAccountById(Integer accountId) {
//        return repository.findById(accountId).orElse(null);
//    }



    @Override
    public Account getAccountByEmail(String email) {
        return repository.findByUserInformation_Email(email);
    }

    @Override
    public Account createAccount(AccountCreateForm form) throws TheValueAlreadyExists {
        Account account = new Account();
        account.setPassword(passwordEncoder.encode(form.getPassword()));
        account = repository.save(account);
        userService.createUser(account.getId(), form.getEmail());

        tokenService.createRegistrationToken(account);
        eventPublisher.publishEvent(new OnSendRegistrationUserConfirmViaEmailEvent(form.getEmail()));

        return account;
    }
//
//    @Override
//    public Account updateAccount(Integer accountId, AccountUpdateForm form) throws TheValueAlreadyExists {
//        return null;
//    }

    @Override
    /**
     * MÔ TẢ VỀ NGHIỆP VỤ KÍCH HOẠT TÀI KHOẢN
     *             1. Tìm đối tượng RegistrationToken dựa tên Token
     *             2. Kiểm tra hạn sử dụng
     *                 2.1 Nếu hợp lệ
     *                - Mở khóa tài khoản
     *                - Xóa token đã dùng
     *                 2.2 Neu không hợp lệ
     *                - Xóa token, tài khoản và người dùng liên quan
     *                - Yêu cầu ng dùng Registates lại
     *
     *
     *     Các mã lỗi
     *     0: Thành công
     *     1. Token hết hn
     *     2. Token không còn tồn tại

     */
    public int activateUser(String token){
        Token registrationToken = tokenService.getRegistrationTokenByToken(token);

        if (registrationToken == null){
            return 2;
        }

        Account account = registrationToken.getAccount();


        if ( registrationToken.getExpiration().isAfter(LocalDateTime.now())){
            account.setStatus(true);
            repository.save(account);
            tokenService.deleteRegistrationToken(registrationToken.getId());
            return 0;
        }else{
            // remove Registration User Token
            tokenService.deleteRegistrationToken(registrationToken.getId());
            deleteByAccountId(account.getId());
            return 1;
            //throw new TokenExpiredException("Token kích hoạt tài khoản của bạn đã hết hạn !! Xin hãy tạo lại tài khoản !!");
        }


    }


//
//    @Override
//    public Page<Account> getAllAccounts(Pageable pageable, String search, AccountFilterForm form) {
//        return null;
//    }
//
//    @Override
//    @Transactional
//    public Account createAccount(AccountCreateForm form) throws TheValueAlreadyExists {
//        if (!userService.isEmailExists(form.getEmail())) {
//            Account account = modelMapper.map(form, Account.class);
//            account.setPassword(passwordEncoder.encode(form.getPassword()));
//            account = repository.save(account);
//
//            userService.createUser(account.getId(), form);
//            registrationTokenService.createRegistrationToken(account);
//            eventPublisher.publishEvent(new OnSendRegistrationUserConfirmViaEmailEvent(form.getEmail()));
//
//            return account;
//        } else {
//            throw new TheValueAlreadyExists("Email '" + form.getEmail() + "' already exists, please choose another email.");
//        }
//    }
//
//    @Override
//    @Transactional
//    public Account updateAccount(Integer accountId, AccountUpdateForm form) {
//        Account account = repository.findById(accountId).orElse(null);
//
//        if (account != null) {
//            userService.updateUser(accountId, form);
//
//            if (form.getRole() != null) {
//                account.setRole(form.getRole());
//            }
//
//            if (form.getStatus() != null) {
//                account.setStatus(form.getStatus());
//            }
//
//            account = repository.save(account);
//            userService.updateUser(account.getId(), form);
//
//            return account;
//        }
//        return null;
//    }
//
    @Override
    @Transactional
    public void deleteByAccountId(Integer accountId) {
        userService.deleteUser(accountId);
        repository.deleteById(accountId);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = getAccountByEmail(username);

        if (account == null) {
            throw new UsernameNotFoundException(username);
        }

        return new org.springframework.security.core.userdetails.User(
            account.getUserInformation().getEmail(),
            account.getPassword(),
            AuthorityUtils.createAuthorityList(account.getRole().toString())
        );
    }
}
