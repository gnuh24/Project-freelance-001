package BackEnd.Form.UsersForms.AccountForms;

import BackEnd.Entity.AccountEntity.Account;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class AccountFilterForm {

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date from;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date to;

    private Account.Role role;

    private Boolean status;


}

