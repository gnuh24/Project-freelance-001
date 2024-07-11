package BackEnd.Service.AccountServices.TokenServices;

import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Entity.AccountEntity.Token;
import BackEnd.Entity.AccountEntity.TokenType;
import BackEnd.Repository.AccountRepository.ITokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class TokenService implements ITokenService{

    @Autowired
    private ITokenRepository tokenRepository;

    @Autowired
    private ITokenTypeService tokenTypeService;


    //Lấy Token dựa tên ID
    @Override
    public Token getRegistrationTokenById(Integer id) {
        return tokenRepository.findById(id).orElse(null);
    }

    //Lấy Token dựa trên Mã tài khoản tương ứng
    @Override
    public Token getRegistrationTokenByAccountId(Integer accountId) {
        return tokenRepository.findByAccount_Id(accountId);
    }

    //Lấy Token dựa trên mã Token
    @Override
    public Token getRegistrationTokenByToken(String token) {
        return tokenRepository.findByToken(token);
    }



    //Tạo Token
    @Override
    @Transactional
    public Token createRegistrationToken(Account account) {

        Token registrationToken = new Token();

        //Tạo token bằng mã UUID
        String token = UUID.randomUUID().toString();

        registrationToken.setToken(token);

        registrationToken.setAccount(account);

        TokenType tokenType = tokenTypeService.getTokenTypeById( (byte) 1 );

        registrationToken.setTokenType(tokenType);

        return tokenRepository.save(registrationToken);
    }


    //Xóa token
    @Override
    @Transactional
    public void deleteRegistrationToken(Integer id) {
        tokenRepository.deleteById(id);
    }
}
