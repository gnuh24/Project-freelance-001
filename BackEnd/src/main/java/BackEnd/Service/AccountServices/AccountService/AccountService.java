package BackEnd.Service.AccountServices.AccountService;
import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Form.AccountForm.AccountCreateForm;
import BackEnd.Form.AccountForm.AccountUpdateForm;
import BackEnd.Repository.AccountRepository.AccountRepository;
import BackEnd.Specification.AccountSpecifications.AccountSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<Account> getAllAccountsNoPaging() {
        return accountRepository.findAll();
    }

    @Override
    public Page<Account> getAllAccounts(Pageable pageable, String search) {
        Specification<Account> specification = AccountSpecification.buildWhere(search);
        return accountRepository.findAll(specification, pageable);
    }

    @Override
    public Account getAccountById(Integer id) {
        return accountRepository.findById(id).orElse(null);
    }


    @Override
    @Transactional
    public Account createAccount(AccountCreateForm form) {
        Account account = modelMapper.map(form, Account.class);
        return accountRepository.save(account);
    }

    @Override
    @Transactional
    public Account updateAccount(AccountUpdateForm form) {
        Account account = getAccountById(form.getId());
        if (account == null) return null;

        modelMapper.map(form, account);
        return accountRepository.save(account);
    }

}

