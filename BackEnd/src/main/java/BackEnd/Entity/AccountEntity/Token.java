package BackEnd.Entity.AccountEntity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Token")
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 36)
    private String token;

    @Column(nullable = false)
    private LocalDateTime expiration;

    @ManyToOne
    @JoinColumn(name = "tokenTypeId", nullable = false)
    private TokenType tokenType;

    @ManyToOne
    @JoinColumn(name = "accountId", nullable = false)
    private Account account;

    @PrePersist
    void prePersists() {
        if (expiration == null) {
            // Set hạn sử dụng trong 2 giờ
            expiration = LocalDateTime.now().plusHours(2);
        }
    }

}
