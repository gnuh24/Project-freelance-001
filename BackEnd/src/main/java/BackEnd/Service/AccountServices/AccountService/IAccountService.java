package BackEnd.Service.AccountServices.AccountService;


import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Form.AccountForm.AccountCreateForm;
import BackEnd.Form.AccountForm.AccountUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IAccountService {
    List<Account> getAllAccountsNoPaging();
    Page<Account> getAllAccounts(Pageable pageable, String search);
    Account getAccountById(Integer id);
    Account createAccount(AccountCreateForm form);
    Account updateAccount(AccountUpdateForm form);
}

