package BackEnd.Controller.AccountController;


import BackEnd.Configure.ErrorResponse.TheValueAlreadyExists;
import BackEnd.Form.AccountForm.AccountCreateForm;
import BackEnd.Form.AuthForm.LoginInfoDTO;
import BackEnd.Form.AuthForm.LoginInputForm;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import BackEnd.Service.AccountServices.AuthService.AuthService;
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

    //API Login
    @PostMapping("/SignIn")
    public ResponseEntity<?> signIn(@ModelAttribute LoginInputForm signInRequest){

        LoginInfoDTO dto = authService.signIn(signInRequest);

        return ResponseEntity.ok(dto);

    }

    @PostMapping("/Registration")
    public String registration(@ModelAttribute AccountCreateForm form) throws TheValueAlreadyExists {
        accountService.createAccount(form);
        return "Tạo tài khoản thành công !! Hãy kiêm email " + form.getEmail() + "!";
    }

    //API Kích hoạt tài khoản
    @GetMapping("/ActiveUser")
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

//    @PostMapping("/refresh")
//    public ResponseEntity<LoginInfoDTO> refreshToken(@RequestParam String token){
//        return ResponseEntity.ok(authService.refreshToken(token));
//    }
}

