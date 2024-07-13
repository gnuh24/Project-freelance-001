package BackEnd.Service.AccountServices.UserInformationService;

import BackEnd.Configure.ErrorResponse.TheValueAlreadyExists;
import BackEnd.Entity.AccountEntity.UserInformation;
import BackEnd.Form.AccountForm.AccountUpdateForm;
import BackEnd.Form.AccountForm.UserInformationCreateForm;
import BackEnd.Repository.AccountRepository.IUserInformationRepository;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserInformationService implements IUserInformationService {

    @Autowired
    private IUserInformationRepository userInformationRepository;

    @Autowired
    private ModelMapper modelMapperl;


    @Override
    public UserInformation getUserById(Integer userId) {
        return userInformationRepository.findById(userId).orElse(null);
    }

    @Override
    @Transactional
    public UserInformation createUser(UserInformationCreateForm form){
        UserInformation userInformation = modelMapperl.map(form, UserInformation.class);
        return userInformationRepository.save(userInformation);
    }


    @Override
    @Transactional
    public UserInformation createUser(String email) throws TheValueAlreadyExists {
        UserInformation userInformation = new UserInformation();

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
    public UserInformation updateUser(AccountUpdateForm form) {
        UserInformation user = userInformationRepository.findById(form.getId()).orElse(null);

        if (user != null) {
            if (form.getFullname() != null) {
                user.setFullname(form.getFullname());
            }
            if (form.getGender() != null) {
                user.setGender(form.getGender());
            }
            if (form.getBirthday() != null) {
                user.setBirthday(form.getBirthday());
            }
            if (form.getPhone() != null) {
                user.setPhoneNumber(form.getPhone());
            }

            if (form.getAddress() != null){
                user.setAddress(form.getAddress());
            }

        }
        return userInformationRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(Integer userId) {
        //repository.deleteById(userId);
    }
}
