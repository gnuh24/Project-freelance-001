package BackEnd.Entity.AccountEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "UserInformation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInformation {

    @Id
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @Column(name = "Address")
    private String address;

    @Column(name = "Birthday")
    @Temporal(TemporalType.DATE)
    private LocalDate birthday;

    @Column(name = "Fullname")
    private String fullname;

    @Enumerated(EnumType.STRING)
    @Column(name = "Gender", length = 6)
    private Gender gender;

    @Column(name = "PhoneNumber", length = 20)
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "Id")
    private Account account;

    public enum Gender{
        Male, Female, Other
    }

}