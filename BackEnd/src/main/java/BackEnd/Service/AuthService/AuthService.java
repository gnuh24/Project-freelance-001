//package BackEnd.Service.AuthService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//
//public class AuthService {
//
//    @Autowired
//    private ITaiKhoanService taiKhoanService;
//
//    @Autowired
//    private JWTUtils jwtUtils;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    public LoginInfoDTO signIn(LoginInputForm signinRequest){
//        LoginInfoDTO response = new LoginInfoDTO();
//
//        try {
//
//            //Xác thực đăng nhập (gián tiếp Call LoadByUsername bên TaiKhoanService)
//            authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                    signinRequest.getEmail(),
//                    signinRequest.getPassword()
//                )
//            );
//
//
//            // Tìm kiếm TaiKhoan theo Email
//            TaiKhoan user = taiKhoanService.getTaiKhoanByEmail(signinRequest.getEmail());
//
//            //Tạo Token
//            var jwt = jwtUtils.generateToken(user);
//
//
//            //Set các thuộc tính cho kết quả trả về
//            response.setStatusCode(200);
//            response.setToken(jwt);
//            response.setExpirationTime("30s");
//            response.setMessage("Successfully Signed In");
//
//            response.setTrangThai(user.getTrangThai());
//            response.setEmail(user.getUsername());
//            response.setHoTen(user.getNguoiDung().getHoTen());
//            response.setMaTaiKhoan(user.getMaTaiKhoan());
//            response.setRole(user.getQuyen().toString());
//
//
//        }catch (Exception e){
//            response.setStatusCode(500);
//            response.setError("Đăng nhập thất bại !!!");
//        }
//        return response;
//    }
//
//    public LoginInfoDTO refreshToken(String refreshTokenReqiest){
//        LoginInfoDTO response = new LoginInfoDTO();
//
//        //Lấy Email từ Token (Dùng hàm viết tay -> Vì hàm có sẵn sẽ tự kiểm tra thời hạn của Token cũ)
//        String ourEmail = jwtUtils.extractUsernameWithoutLibrary(refreshTokenReqiest);
//
//        //TÌm tài khoản dựa trên Email
//        TaiKhoan users = taiKhoanService.getTaiKhoanByEmail(ourEmail);
//
//        if (jwtUtils.isTokenValidWithoutExpired(refreshTokenReqiest, users)) {
//            response.setStatusCode(200);
//
//            //Set Token mới
//            var jwt = jwtUtils.generateToken(users);
//            response.setToken(jwt);
//
//            response.setExpirationTime("30s");
//            response.setMessage("Successfully Refreshed Token");
//        }else{
//            response.setStatusCode(500);
//        }
//        return response;
//    }
//}
//
