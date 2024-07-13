package BackEnd.Service.AccountServices.UserInformationService;

import BackEnd.Configure.ErrorResponse.TheValueAlreadyExists;
import BackEnd.Entity.AccountEntity.UserInformation;
import BackEnd.Form.AccountForm.AccountCreateForm;
import BackEnd.Form.AccountForm.AccountUpdateForm;
import BackEnd.Form.AccountForm.UserInformationCreateForm;

public interface IUserInformationService {

    UserInformation getUserById(Integer userId);

    UserInformation createUser(String email) throws TheValueAlreadyExists;

    UserInformation createUser(UserInformationCreateForm form);

    boolean isEmailExists(String email);

    UserInformation updateUser(AccountUpdateForm form);

    void deleteUser(Integer userId);
}
