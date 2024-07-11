package BackEnd.Service.AccountServices.TokenServices;


import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Entity.AccountEntity.Token;

public interface ITokenService {

    Token getRegistrationTokenById(Integer id);

    Token getRegistrationTokenByAccountId(Integer accountId);

    Token getRegistrationTokenByToken(String token);

    Token createRegistrationToken(Account account);

    void deleteRegistrationToken(Integer id);


}

