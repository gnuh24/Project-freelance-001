package BackEnd.Controller;

import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Form.AuthForm.LoginInfoDTO;
import BackEnd.Form.AuthForm.LoginInputForm;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import BackEnd.Service.AccountServices.AuthService.IAuthService;
import BackEnd.Service.AccountServices.AuthService.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private IAuthService authService;

    @Autowired
    private JWTUtils jwtUtils;

    @GetMapping("/login")
    public Map<String, Object> login(OAuth2AuthenticationToken token) {

        return token.getPrincipal().getAttributes();
    }

    @GetMapping("/home")
    public ResponseEntity<LoginInfoDTO> home(HttpServletRequest request) {
        Account user = (Account) request.getSession().getAttribute("account");

        LoginInfoDTO response = new LoginInfoDTO();
        //Set các thuộc tính cho kết quả trả về
        response.setStatusCode(200);

        //Tạo Token
        String jwt = jwtUtils.generateToken(user);
        response.setToken(jwt);
        response.setTokenExpirationTime("30 phút");

        //Tạo refresh token
        String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
        response.setRefreshToken(refreshToken);
        response.setRefreshTokenExpirationTime("7 ngày");

        response.setMessage("Successfully Signed In");

        response.setStatus(user.getStatus());
        response.setEmail(user.getUsername());
        response.setId(user.getId());
        response.setRole(user.getRole().toString());

        // Trả về thông tin người dùng hoặc thực hiện các thao tác khác
        return ResponseEntity.ok(response);

    }

}



