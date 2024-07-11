package BackEnd.Configure.WebSecurity;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import BackEnd.Service.AccountServices.AuthService.JWTUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    @Lazy
    private IAccountService accountService;

    @Override
    //Xác thực Token khi login và call API (Chạy đầu tiên)
    protected void doFilterInternal(HttpServletRequest request,
                                    @NotNull HttpServletResponse response,
                                    @NotNull FilterChain filterChain) throws ServletException, IOException {

        final   String authHeader = request.getHeader("Authorization");
        final   String jwtToken;
        final   String userEmail;


        //Kiểm tra Header có null hay trống không ?
        if (authHeader == null || authHeader.isBlank()) {
            filterChain.doFilter(request, response);
            return;
        }

        /**
         * authHeader thường là 1 chuỗi thế này
         * VD: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodW5nbnQuMDIwNDA0QGdtYWlsLmNvbSIsImlhdCI6MTcxMjY3Nzk3NSwiZXhwIjoxNzEyNzY0Mzc1fQ.GeODCykd-jW9_TJCocD-j8WcQ6aH6gCIo1OPGEKpwEc"
         *  -> Dùng subString cắt ra để lấy được token
         *  Hàm tách username ra từ chuỗi JWT -> Lấy được email
         */
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsernameWithoutLibrary(jwtToken);

        //Nếu token có thể tách được email ra
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            //Lấy ra theo Email
            UserDetails userDetails = accountService.loadUserByUsername(userEmail);

            // Kiểm tra xem token hợp lệ không ?
            try {
                if (jwtUtils.isTokenValid(jwtToken, userDetails)) {

                    /**
                     * Thiet lập các configure liên quan
                     */

                    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                    );
                    token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    securityContext.setAuthentication(token);
                    SecurityContextHolder.setContext(securityContext);

                }
            }
            catch (Exception e) {
                System.err.println(e.getMessage());
                throw new ServletException(e);
            }
        }
        filterChain.doFilter(request, response);
    }
}
