package BackEnd.Form.AccountForm;

import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccountUpdateForm {

    private Integer id;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    private Boolean status;

    private String role;
}
