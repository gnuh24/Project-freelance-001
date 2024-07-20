package BackEnd.Service.AccountServices.AccountService;

import BackEnd.Configure.ErrorResponse.InvalidToken;
import BackEnd.Configure.ErrorResponse.TheValueAlreadyExists;
import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Form.UsersForms.AccountForms.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IAccountService extends UserDetailsService {

    int activateUser(String token);

    String getKeyForUpdateEmail(String token, String newEmail);


    Page<Account> getAllAccounts(Pageable pageable, String search, AccountFilterForm form);

    Account getAccountById(Integer accountId);

    Account getAccountById(Integer accountId, String token);

    Account getAccountByEmail(String email);

    Account createAccount(AccountCreateForm form) throws TheValueAlreadyExists;

    int  updateEmailOfAccount(String token, AccountUpdateFormForEmail form) throws InvalidToken;

    Account updateAccount(String token, AccountUpdateForm form);

    Account updateStatusOfAccount(AccountUpdateFormForStatus form);

    void deleteByAccountId(Integer accountId);
}
