package BackEnd.Service.AccountServices.AccountService;

import BackEnd.Configure.ErrorResponse.TheValueAlreadyExists;
import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Form.AccountForm.AccountCreateForm;
import BackEnd.Form.AccountForm.AccountFilterForm;
import BackEnd.Form.AccountForm.AccountUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IAccountService extends UserDetailsService {

    int activateUser(String token);
//
//    Page<Account> getAllAccounts(Pageable pageable, String search, AccountFilterForm form);

    Account getAccountById(Integer accountId);
//
    Account getAccountById(Integer accountId, String token);

    Account getAccountByEmail(String email);

    Account createAccount(AccountCreateForm form) throws TheValueAlreadyExists;

    Account updateAccount(String token, AccountUpdateForm form);

    Account updateStatusOfAccount(AccountUpdateForm form);

    void deleteByAccountId(Integer accountId);
}
