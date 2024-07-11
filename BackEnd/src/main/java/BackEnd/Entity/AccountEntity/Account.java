package BackEnd.Entity.AccountEntity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Account")
public class Account implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Password cannot be blank")
    private String password;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean status = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.User;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserInformation userInformation;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.toString()));
    }

    @Override
    public String getUsername() {
        return getUserInformation().getEmail();
    }

    public enum Role {
        User, Admin
    }
}
