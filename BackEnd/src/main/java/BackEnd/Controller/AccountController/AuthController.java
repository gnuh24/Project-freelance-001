//package BackEnd.Controller.AccountController;
//
//
//import BackEnd.Form.AuthForm.LoginInputForm;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//    import org.springframework.beans.factory.annotation.Autowired;
//    import org.springframework.http.ResponseEntity;
//    import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/auth")
//public class  AuthController {
//
//    @Autowired
//    private AuthService authService;
//
//    //API Login
//    @PostMapping("/signin")
//    public ResponseEntity<?> signIn(@ModelAttribute LoginInputForm signInRequest){
//
//        LoginInfoDTO dto = authService.signIn(signInRequest);
//
//        if (dto.getStatusCode() != 500){
//            if (!dto.getTrangThai()){
//                dto = new LoginInfoDTO();
//                dto.setStatusCode(500);
//                dto.setError("Tài khoản của bạn đã bị khóa !!!");
//            }
//        }
//
//        return ResponseEntity.ok(dto);
//    }
//    @PostMapping("/refresh")
//    public ResponseEntity<LoginInfoDTO> refreshToken(@RequestParam String token){
//        return ResponseEntity.ok(authService.refreshToken(token));
//    }
//}
//
