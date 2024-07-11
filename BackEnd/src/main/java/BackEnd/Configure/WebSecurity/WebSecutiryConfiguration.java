package BackEnd.Configure.WebSecurity;

import BackEnd.Configure.ErrorResponse.AuthExceptionHandler;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecutiryConfiguration {

    @Autowired
    @Lazy
    private IAccountService accountService;

    @Autowired
    @Lazy
    private AuthExceptionHandler authExceptionHandler;


    @Autowired
    private JWTAuthorizationFilter jwtAuthFIlter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           CorsConfigurationSource corsConfigurationSource) throws Exception {

        http
            //Loại bỏ bảo vệ CSRF
            .csrf(AbstractHttpConfigurer::disable)

            //Configure các luồng truy cập
            .authorizeHttpRequests((auth) -> auth

//                // Các API Tài khoản
//                .requestMatchers(HttpMethod.GET,"/TaiKhoan")                    .hasAnyAuthority("Admin")
//                .requestMatchers(HttpMethod.GET,"/TaiKhoan/{maTaiKhoan}")       .permitAll()
//                .requestMatchers(HttpMethod.POST,"/TaiKhoan")                   .permitAll()
//                .requestMatchers(HttpMethod.PATCH,"/TaiKhoan/{maTaiKhoan}")     .permitAll()
//                .requestMatchers(HttpMethod.GET,"/TaiKhoan/activeUser")         .permitAll()
//
//                // Các API Địa chỉ
//                .requestMatchers(HttpMethod.GET,"/DiaChi/diaChiCuaToi/{maDiaChi}")          .permitAll()
//                .requestMatchers(HttpMethod.GET,"/DiaChi/{maDiaChi}")                       .permitAll()
//                .requestMatchers(HttpMethod.POST,"/DiaChi")                                  .permitAll()
//                .requestMatchers(HttpMethod.PATCH,"/DiaChi/{maDiaChi}")                       .permitAll()
//                .requestMatchers(HttpMethod.DELETE,"/DiaChi/{maDiaChi}")                       .permitAll()
//
//                // Các API Giỏ hàng
//                .requestMatchers(HttpMethod.GET,"/GioHang/{maTaiKhoan}")                    .permitAll()
//                .requestMatchers("/GioHang")                                                .permitAll()
//                .requestMatchers("/GioHang/{maTaiKhoan}/{maSanPham}")                       .permitAll()
//
//                // Các API Sản phẩm
//                .requestMatchers(HttpMethod.GET,"/SanPham")                                 .permitAll()
//                .requestMatchers(HttpMethod.GET,"/SanPham/{maSanPham}")                     .permitAll()
//                .requestMatchers(HttpMethod.POST,"/SanPham")                                .hasAnyAuthority("Manager")
//                .requestMatchers(HttpMethod.GET,"/SanPham/{maSanPham}")                     .hasAnyAuthority("Manager")
//
//
//                // Các API Loại Sản Phẩm
//                .requestMatchers(HttpMethod.GET,"/LoaiSanPham")                                         .permitAll()
//                .requestMatchers(HttpMethod.GET, "/LoaiSanPham/{maLoaiSanPham}")                        .permitAll()
//                .requestMatchers(HttpMethod.POST,"/LoaiSanPham")                                        .hasAnyAuthority("Manager")
//                .requestMatchers(HttpMethod.PATCH,"/LoaiSanPham/{maLoaiSanPham}")                                       .hasAnyAuthority("Manager")
//                .requestMatchers(HttpMethod.DELETE, "/LoaiSanPham/{maLoaiSanPham}")                     .hasAnyAuthority("Manager")
//                .requestMatchers(HttpMethod.DELETE,"/LoaiSanPham/deleteMany/{danhSachMaLoaiSanPham}")   .hasAnyAuthority("Manager")
//
//                // Các API Thương hiệu
//                .requestMatchers(HttpMethod.GET,"/ThuongHieu")                                          .permitAll()
//                .requestMatchers(HttpMethod.GET, "/ThuongHieu/{maThuongHieu}")                          .permitAll()
//                .requestMatchers(HttpMethod.POST,"/ThuongHieu")                                         .hasAnyAuthority("Manager")
//                .requestMatchers(HttpMethod.PATCH,"/ThuongHieu/{maThuongHieu}")                                        .hasAnyAuthority("Manager")
//                .requestMatchers(HttpMethod.DELETE, "/ThuongHieu/{maThuongHieu}")                       .hasAnyAuthority("Manager")
//                .requestMatchers(HttpMethod.DELETE,"/ThuongHieu/deleteMany/{danhSachMaThuongHieu}")     .hasAnyAuthority("Manager")
//
//                //Các API Dịch vụ vận chuyển
//                .requestMatchers(HttpMethod.GET,"/DichVuVanChuyen").permitAll()
//
//                //Các API Phương thức thanh toán
//                .requestMatchers(HttpMethod.GET,"/PhuongThucThanhToan").permitAll()
//
//                //Các API Đơn hàng
//                .requestMatchers(HttpMethod.GET,"/DonHang")                                      .hasAnyAuthority("Seller", "Manager")
//                .requestMatchers(HttpMethod.GET,"/DonHang/{maDonHang}")                          .permitAll()
//                .requestMatchers(HttpMethod.GET,"/DonHang/donHangCuaToi/{maKhachHang}")          .permitAll()
//                .requestMatchers(HttpMethod.GET,"/DonHang/chiTietDonHang/{maDonHang}")           .permitAll()
//                .requestMatchers(HttpMethod.GET,"/DonHang/trangThaiDonHang/{maDonHang}")         .permitAll()
//                .requestMatchers(HttpMethod.POST,"/DonHang")                                     .permitAll()
//                .requestMatchers(HttpMethod.PATCH,"/DonHang/{maDonHang}")                        .permitAll()
//
//                //Các API Thống kê
//                .requestMatchers(HttpMethod.GET,"/ThongKe/TongQuat")                            .hasAnyAuthority("CEO")
//                .requestMatchers(HttpMethod.GET,"/ThongKe/DonHang")                             .hasAnyAuthority("CEO")
//
//
//
//
                .requestMatchers("/Auth/SignIn").permitAll()
                .requestMatchers("/Auth/Refresh").permitAll()
                    .requestMatchers("/Auth/Registration").permitAll()
                    .requestMatchers("/Auth/ActiveUser").permitAll()



                // Xác thực tất cả các request
                .anyRequest()
                .authenticated()
            ).httpBasic(Customizer.withDefaults())


            //Add JWT vào chuỗi lọc và ưu tiên loc theo JWT
            .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider()).addFilterBefore(
                jwtAuthFIlter, UsernamePasswordAuthenticationFilter.class
            )

            .exceptionHandling((exceptionHandling) ->
                exceptionHandling

                    // Cấu hình xử lý ngoại lệ cho trường hợp không xác thực (Login sai ^^)
                    .authenticationEntryPoint(authExceptionHandler)

                    // Cấu hình xử lý ngoại lệ cho trường hợp truy cập bị từ chối (Không đủ quyền)
                    .accessDeniedHandler(authExceptionHandler)

            );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(accountService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

}
