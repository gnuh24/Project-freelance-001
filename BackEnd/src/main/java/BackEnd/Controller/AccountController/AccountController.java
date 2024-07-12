package BackEnd.Controller.AccountController;


import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Form.AccountForm.AccountDTOForProfile;
import BackEnd.Form.AccountForm.AccountUpdateForm;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Account")
@CrossOrigin(origins = "*")
public class AccountController {

    @Autowired
    private IAccountService accountService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "/{accountId}/{token}")
    public AccountDTOForProfile getPersonalIn4(@PathVariable Integer accountId,
                                               @PathVariable String token){

        Account account = accountService.getAccountById(accountId, token);

        return modelMapper.map(account, AccountDTOForProfile.class);

    }

    @PatchMapping(value = "/{token}")
    public AccountDTOForProfile updateAccount(@PathVariable String token,
                                            @ModelAttribute @Valid AccountUpdateForm form){

        AccountDTOForProfile account = modelMapper.map(accountService.updateAccount(token, form), AccountDTOForProfile.class);
        return account;
    }

    @PatchMapping(value = "/ChangeStatus")
    public AccountDTOForProfile updateStatusOfAccount(@ModelAttribute @Valid AccountUpdateForm form){

        AccountDTOForProfile account = modelMapper.map(accountService.updateStatusOfAccount(form), AccountDTOForProfile.class);
        return account;
    }

}
