package BackEnd.Controller.AccountController;


import BackEnd.Configure.ErrorResponse.AuthException.MismatchedTokenAccountException;
import BackEnd.Configure.ErrorResponse.TheValueAlreadyExists;
import BackEnd.Form.UsersForms.AccountForms.AccountCreateForm;
import BackEnd.Form.AuthForm.LoginInfoDTO;
import BackEnd.Form.AuthForm.LoginInputForm;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import BackEnd.Service.AccountServices.AuthService.AuthService;
import BackEnd.Service.AccountServices.AuthService.JWTUtils;
import BackEnd.Service.AccountServices.LogoutJWTToken.ILogoutJWTTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Auth")
@CrossOrigin(origins = "*")
public class  AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private IAccountService accountService;

    @Autowired
    private ILogoutJWTTokenService tokenService;

    @Autowired
    private JWTUtils jwtUtils;

    //API Login
    @PostMapping(value = "/SignIn")
    public ResponseEntity<?> signInForUser(@ModelAttribute LoginInputForm signInRequest){

        LoginInfoDTO dto = authService.signInForUser(signInRequest);

        return ResponseEntity.ok(dto);

    }

    //API Login
    @PostMapping(value = "/LoginAdmin")
    public ResponseEntity<?> signInForAdmin(@ModelAttribute LoginInputForm signInRequest){

        LoginInfoDTO dto = authService.signInForAdmin(signInRequest);

        return ResponseEntity.ok(dto);

    }

    @PostMapping(value = "/Registration")
    public String registration(@ModelAttribute AccountCreateForm form) throws TheValueAlreadyExists {
        accountService.createAccount(form);
        return "Tạo tài khoản thành công !! Hãy kiêm email " + form.getEmail() + "!";
    }

    //API Kích hoạt tài khoản
    @GetMapping(value = "/ActiveUser")
    public ResponseEntity<?> activeUserViaEmail(@RequestParam String token) {
        int flag = accountService.activateUser(token);
        switch (flag){
            case 0:
                return new ResponseEntity<>("Active success!", HttpStatus.OK);
            case 1:
                return new ResponseEntity<>("Token của bạn đã hết hạn xin hãy tạo lại tài khoản !!", HttpStatus.OK);
            case 2:
                return new ResponseEntity<>("Token này đã không còn tồn tại !!", HttpStatus.OK);
        }
        return null;
    }

    @PostMapping(value = "/Refresh")
    public ResponseEntity<LoginInfoDTO> refreshToken(@RequestHeader("Authorization") String token,
                                                        @ModelAttribute LoginInfoDTO form) {
        return ResponseEntity.ok(authService.refreshToken(token, form.getRefreshToken()));
    }
    @PostMapping(value = "/Logout")
    public String createLogoutToken(@RequestHeader("Authorization") String token,
                                    @ModelAttribute LoginInfoDTO form) {

        //Lấy Email từ Token (Dùng hàm viết tay -> Vì hàm có sẵn sẽ tự kiểm tra thời hạn của Token cũ)
        String ourEmailByOldToken = jwtUtils.extractUsernameWithoutLibrary(token);
        String ourEmail = jwtUtils.extractUsernameWithoutLibrary(form.getRefreshToken());

        if (!ourEmail.equals(ourEmailByOldToken)){
            throw new MismatchedTokenAccountException("Access Token và Refresh Token không cùng 1 chủ sở hữu !!");
        }

        tokenService.createLogoutJWTToken(token);
        tokenService.createLogoutJWTToken(form.getRefreshToken());
        return "Đăng xuất thành công.";
    }
}

