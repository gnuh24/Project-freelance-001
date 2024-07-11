package BackEnd.Service.AccountServices.UserInformationService;

import BackEnd.Configure.ErrorResponse.TheValueAlreadyExists;
import BackEnd.Entity.AccountEntity.UserInformation;
import BackEnd.Form.AccountForm.AccountCreateForm;
import BackEnd.Form.AccountForm.AccountUpdateForm;
import BackEnd.Repository.AccountRepository.IUserInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserInformationService implements IUserInformationService {

    @Autowired
    private IUserInformationRepository userInformationRepository;


    @Override
    public UserInformation getUserById(Integer userId) {
        return userInformationRepository.findById(userId).orElse(null);
    }


    @Override
    @Transactional
    public UserInformation createUser(Integer accountId, String email) throws TheValueAlreadyExists {
        UserInformation userInformation = new UserInformation();
        userInformation.setId(accountId);

        if (isEmailExists(email)) {
            throw new TheValueAlreadyExists("Email đã tồn tại vui lòng điền email khác !!");
        }else{
            userInformation.setEmail(email);
        }

        return userInformationRepository.save(userInformation);
    }

    @Override
    public boolean isEmailExists(String email) {
        return userInformationRepository.existsByEmail(email);
    }



    @Override
    @Transactional
    public UserInformation updateUser(Integer accountId, AccountUpdateForm form) {
        UserInformation user = userInformationRepository.findById(accountId).orElse(null);

//        if (user != null) {
//            if (form.getFullName() != null) {
//                user.setFullName(form.getFullName());
//            }
//            if (form.getGender() != null) {
//                user.setGender(form.getGender());
//            }
//            if (form.getBirthday() != null) {
//                user.setBirthday(form.getBirthday());
//            }
//            if (form.getPhoneNumber() != null) {
//                user.setPhoneNumber(form.getPhoneNumber());
//            }
//            return repository.save(user);
//        }
        return null;
    }

    @Override
    @Transactional
    public void deleteUser(Integer userId) {
        //repository.deleteById(userId);
    }
}
