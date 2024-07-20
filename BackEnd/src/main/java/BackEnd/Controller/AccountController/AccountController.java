package BackEnd.Controller.AccountController;


import BackEnd.Configure.ErrorResponse.InvalidToken;
import BackEnd.Configure.ErrorResponse.TheValueAlreadyExists;
import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Form.ProductForm.ShoeForm.ShoeDTOListAdmin;
import BackEnd.Form.UsersForms.AccountForms.*;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import BackEnd.Service.AccountServices.TokenServices.ITokenService;
import BackEnd.Service.AccountServices.UserInformationService.IUserInformationService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Account")
@CrossOrigin(origins = "*")
public class AccountController {

    @Autowired
    private IAccountService accountService;

    @Autowired
    private IUserInformationService userInformationService;

    @Autowired
    private ITokenService tokenService;

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping()
    public Page<AccountDTOForAdmin> getAllAccount(Pageable pageable,
                                                  String search,
                                                  AccountFilterForm form) {

        Page<Account> entities = accountService.getAllAccounts(pageable, search, form);

        List<AccountDTOForAdmin> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<AccountDTOForAdmin>>() {
        }.getType());

        return new PageImpl<>(dtos, pageable, entities.getTotalElements());
    }


    @GetMapping(value = "/isThisEmailExists")
    public Boolean isThisEmailExists(@RequestParam String email){
        return userInformationService.isEmailExists(email);
    }

    @GetMapping(value = "/GetKeyForUpdateEmail")
    public String getKeyForUpdateEmail(@RequestHeader("Authorization") String token,
                                       @RequestParam String newEmail) {
        return accountService.getKeyForUpdateEmail(token, newEmail);
    }

    @GetMapping(value = "/{accountId}")
    public AccountDTOForProfile getPersonalIn4(@PathVariable Integer accountId,
                                               @RequestHeader("Authorization") String token){

        Account account = accountService.getAccountById(accountId, token);

        return modelMapper.map(account, AccountDTOForProfile.class);

    }

    @PatchMapping(value = "/UpdateInformation")
    public AccountDTOForProfile updateAccount(  @RequestHeader("Authorization") String token,
                                                @ModelAttribute @Valid AccountUpdateForm form){
        AccountDTOForProfile account = modelMapper.map(accountService.updateAccount(token, form), AccountDTOForProfile.class);
        return account;
    }

    @PatchMapping(value = "/ChangeStatus")
    public AccountDTOForProfile updateStatusOfAccount(@ModelAttribute @Valid AccountUpdateFormForStatus form){
        AccountDTOForProfile account = modelMapper.map(accountService.updateStatusOfAccount(form), AccountDTOForProfile.class);
        return account;
    }


    @PatchMapping(value = "/NewEmail")
    public AccountDTOForProfile updateEmailOfAccount(@RequestHeader("Authorization") String token,
                                                    @ModelAttribute @Valid AccountUpdateFormForEmail form) throws InvalidToken {
        AccountDTOForProfile account = modelMapper.map(accountService.updateEmailOfAccount(token, form), AccountDTOForProfile.class);
        return account;
    }
}
