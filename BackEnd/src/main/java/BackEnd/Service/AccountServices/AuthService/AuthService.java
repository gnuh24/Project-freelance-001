package BackEnd.Service.AccountServices.AuthService;

import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Form.AuthForm.LoginInfoDTO;
import BackEnd.Form.AuthForm.LoginInputForm;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {

    @Autowired
    private IAccountService accountService;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

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
            response.setExpirationTime("7 days");
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

    public LoginInfoDTO refreshToken(String refreshTokenReqiest){
        LoginInfoDTO response = new LoginInfoDTO();

        //Lấy Email từ Token (Dùng hàm viết tay -> Vì hàm có sẵn sẽ tự kiểm tra thời hạn của Token cũ)
        String ourEmail = jwtUtils.extractUsernameWithoutLibrary(refreshTokenReqiest);

        //TÌm tài khoản dựa trên Email
        Account account = accountService.getAccountByEmail(ourEmail);

        if (jwtUtils.isTokenValidWithoutExpired(refreshTokenReqiest, account)) {
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

