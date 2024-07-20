package BackEnd.Service.AccountServices.AuthService;

import BackEnd.Configure.ErrorResponse.InvalidToken;
import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Form.AuthForm.LoginInfoDTO;
import BackEnd.Form.AuthForm.LoginInputForm;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;


@Service
public class AuthService implements IAuthService{

    @Autowired
    private IAccountService accountService;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public LoginInfoDTO signIn(LoginInputForm signinRequest){
        LoginInfoDTO response = new LoginInfoDTO();
        try {

            //Xác thực đăng nhập (gián tiếp Call LoadByUsername bên TaiKhoanService)
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    signinRequest.getEmail(),
                    signinRequest.getPassword()
                )
            );


            // Tìm kiếm TaiKhoan theo Email
            Account user = accountService.getAccountByEmail(signinRequest.getEmail());
            //Tạo Token
            var jwt = jwtUtils.generateToken(user);


            //Set các thuộc tính cho kết quả trả về
            response.setStatusCode(200);
            response.setToken(jwt);

            String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("30 phút");
            response.setMessage("Successfully Signed In");

            response.setStatus(user.getStatus());
            response.setEmail(user.getUsername());
            response.setId(user.getId());
            response.setRole(user.getRole().toString());


        }catch (Exception e){
            response.setStatusCode(500);
            response.setError("Đăng nhập thất bại !!!");
        }
        return response;
    }

    @Override
    public LoginInfoDTO refreshToken(String oldToken, String refreshToken) throws InvalidToken {
        LoginInfoDTO response = new LoginInfoDTO();
        System.err.println("Trước khi tách");
        //Lấy Email từ Token (Dùng hàm viết tay -> Vì hàm có sẵn sẽ tự kiểm tra thời hạn của Token cũ)
        String ourEmailByOldToken = jwtUtils.extractUsernameWithoutLibrary(oldToken);
        String ourEmail = jwtUtils.extractUsernameWithoutLibrary(refreshToken);
        System.err.println("Sau khi tách");
        if (!ourEmail.equals(ourEmailByOldToken)){
            throw new InvalidToken("Token cũ và refresh token không khớp với nhau !!");
        }

        //TÌm tài khoản dựa trên Email
        Account account = accountService.getAccountByEmail(ourEmail);

        if (jwtUtils.isTokenValidWithoutExpired(refreshToken, account)) {
            response.setStatusCode(200);

            //Set Token mới
            var jwt = jwtUtils.generateToken(account);
            response.setToken(jwt);

            response.setExpirationTime("30s");
            response.setMessage("Successfully Refreshed Token");
        }else{
            response.setStatusCode(500);
        }
        return response;
    }
}

