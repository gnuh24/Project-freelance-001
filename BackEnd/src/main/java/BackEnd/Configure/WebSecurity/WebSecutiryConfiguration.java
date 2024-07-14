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

                // Các API Tài khoản
//                  .requestMatchers(HttpMethod.GET,"/TaiKhoan")                    .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.GET,"/Account/{accountId}/{token}")         .permitAll()
                    .requestMatchers(HttpMethod.PATCH,"/Account/{token}")                   .permitAll()
//                  .requestMatchers(HttpMethod.GET,"/TaiKhoan/activeUser")         .permitAll()
//


            // TODO: CÁC API LIÊN QUAN ĐẾN PRODUCT
                    // Các API `Brand`
                    .requestMatchers(HttpMethod.GET,"/Brand/noPaging")                              .permitAll()
                    .requestMatchers(HttpMethod.GET,"/Brand")                                       .permitAll()
                    .requestMatchers(HttpMethod.GET,"/Brand/{BrandId}")                             .permitAll()
                    .requestMatchers(HttpMethod.GET,"/Brand/Image/{logo}")                          .permitAll()
                    .requestMatchers(HttpMethod.POST,"/Brand")                                      .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.PATCH,"/Brand")                                     .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.DELETE,"/Brand/{BrandId}")                          .hasAnyAuthority("Admin")

                    // Các API `ShoeType`
                    .requestMatchers(HttpMethod.GET,"/ShoeType/noPaging")                           .permitAll()
                    .requestMatchers(HttpMethod.GET,"/ShoeType")                                    .permitAll()
                    .requestMatchers(HttpMethod.GET,"/ShoeType/{shoeTypeId}")                       .permitAll()
                    .requestMatchers(HttpMethod.POST,"/ShoeType")                                   .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.PATCH,"/ShoeType")                                  .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.DELETE,"/ShoeType/{shoeTypeId}")                    .hasAnyAuthority("Admin")

                    // Các API `ShoeColor`
                    .requestMatchers(HttpMethod.GET,"/ShoeColor/noPaging")                           .permitAll()
                    .requestMatchers(HttpMethod.GET,"/ShoeColor")                                    .permitAll()
                    .requestMatchers(HttpMethod.GET,"/ShoeColor/{shoeColorId}")                      .permitAll()
                    .requestMatchers(HttpMethod.POST,"/ShoeColor")                                   .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.PATCH,"/ShoeColor")                                  .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.DELETE,"/ShoeColor/{shoeColorId}")                   .hasAnyAuthority("Admin")


                    // Các API `Shoe`
                    .requestMatchers(HttpMethod.GET,"/Shoe/Admin")                                  .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.GET,"/Shoe/Admin/{shoeId}")                         .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.GET,"/Shoe/CommonUser")                             .permitAll()
                    .requestMatchers(HttpMethod.GET,"/Shoe/CommonUser/{shoeId}")                    .permitAll()
                    .requestMatchers(HttpMethod.POST,"/Shoe")                                       .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.PATCH,"/Shoe")                                      .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.PATCH,"/Shoe/UpdateBrand")                          .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.PATCH,"/Shoe/UpdateShoeType")                       .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.PATCH,"/Shoe/UpdateShoeColor")                      .hasAnyAuthority("Admin")

                    // Các API `ShoeSize`
                    .requestMatchers(HttpMethod.POST,"/ShoeSize/{shoeId}")                          .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.PATCH,"/ShoeSize/{shoeId}/{size}")                  .hasAnyAuthority("Admin")

                    // Các API `ShoeImage`
                    .requestMatchers(HttpMethod.GET,"/ShoeImage/Image/{path}")                      .permitAll()
                    .requestMatchers(HttpMethod.POST,"/ShoeImage/{shoeId}")                         .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.PATCH,"/ShoeImage/{shoeImageId}")                   .hasAnyAuthority("Admin")


                    // TODO: Các API liên quan đến `Account`
                    .requestMatchers(HttpMethod.POST,"/Auth/SignIn").permitAll()
                    .requestMatchers("/Auth/Refresh").permitAll()
                    .requestMatchers(HttpMethod.POST,"/Auth/Registration").permitAll()
                    .requestMatchers(HttpMethod.GET, "/Auth/ActiveUser").permitAll()

                    .requestMatchers(HttpMethod.GET,"/Account/{accountId}")                  .permitAll()
                    .requestMatchers(HttpMethod.PATCH,"/Account")                               .permitAll()
                    .requestMatchers(HttpMethod.PATCH,"/Account/ChangeStatus")                .hasAnyAuthority("Admin")

                    .requestMatchers(HttpMethod.POST,"/UserInformation")                      .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.PATCH,"/UserInformation")                      .hasAnyAuthority("Admin")

                // TODO: Các API liên quan đến chức năng mua hàng
                    //Các API Giỏ hàng
                    .requestMatchers(HttpMethod.GET,"/CartItem/{accountId}")                        .permitAll()
                    .requestMatchers(HttpMethod.POST,"/CartItem")                                   .permitAll()
                    .requestMatchers(HttpMethod.PATCH,"/CartItem")                                  .permitAll()
                    .requestMatchers(HttpMethod.DELETE,"/CartItem")                                 .permitAll()

                    // Các API Đơn hàng
                    .requestMatchers(HttpMethod.GET,"/Order/Admin")                                       .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.GET,"/Order/Admin/{id}")                                  .hasAnyAuthority("Admin")
                    .requestMatchers(HttpMethod.GET,"/Order/MyOrder")                                   .permitAll()
                    .requestMatchers(HttpMethod.GET,"/Order/MyOrder/{id}")                                   .permitAll()

                    .requestMatchers(HttpMethod.POST,"/Order")                                      .permitAll()
                    .requestMatchers(HttpMethod.PATCH,"/Order")                                     .hasAnyAuthority("Admin")


                    // Các API Trạng thái đơn hàng

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
