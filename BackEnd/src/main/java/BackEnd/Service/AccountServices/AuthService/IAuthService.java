package BackEnd.Service.AccountServices.AuthService;

import BackEnd.Configure.ErrorResponse.InvalidToken;
import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Form.AuthForm.LoginInfoDTO;
import BackEnd.Form.AuthForm.LoginInputForm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public interface IAuthService {
    LoginInfoDTO signIn(LoginInputForm signinRequest);
    LoginInfoDTO refreshToken(String oldToken, String refreshToken) throws InvalidToken;
}
