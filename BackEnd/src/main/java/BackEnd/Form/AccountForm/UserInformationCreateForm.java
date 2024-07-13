package BackEnd.Form.AccountForm;

import BackEnd.Entity.AccountEntity.UserInformation;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class UserInformationCreateForm {

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email cannot be blank")
    @Size(max = 255, message = "Email cannot exceed 255 characters")
    private String email;

    @Size(max = 255, message = "Address cannot exceed 255 characters")
    private String address;

    @NotNull(message = "Birthday cannot be null")
    private LocalDate birthday;

    @NotBlank(message = "Fullname cannot be blank")
    @Size(max = 255, message = "Fullname cannot exceed 255 characters")
    private String fullname;

    @NotNull(message = "Gender cannot be null")
    private UserInformation.Gender gender;

    @NotBlank(message = "Phone number cannot be blank")
    @Pattern(regexp = "\\d{10,20}", message = "Phone number must be between 10 and 20 digits")
    private String phoneNumber;


}
