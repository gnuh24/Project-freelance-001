package BackEnd.Service.AccountServices.UserInformationService;

import BackEnd.Configure.ErrorResponse.TheValueAlreadyExists;
import BackEnd.Entity.AccountEntity.UserInformation;
import BackEnd.Form.AccountForm.AccountCreateForm;
import BackEnd.Form.AccountForm.AccountUpdateForm;

public interface IUserInformationService {

    UserInformation getUserById(Integer userId);

    UserInformation createUser(Integer accountId, String email) throws TheValueAlreadyExists;

    boolean isEmailExists(String email);

    UserInformation updateUser(Integer accountId, AccountUpdateForm form);

    void deleteUser(Integer userId);
}
