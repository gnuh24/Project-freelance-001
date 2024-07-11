package BackEnd.Entity.AccountEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Column(name = "Email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "Address", length = 255)
    private String address;

    @Column(name = "Birthday")
    @Temporal(TemporalType.DATE)
    private Date birthday;

    @Column(name = "Fullname", length = 255)
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