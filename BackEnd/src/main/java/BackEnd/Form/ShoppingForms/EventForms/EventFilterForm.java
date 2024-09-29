package BackEnd.Form.ShoppingForms.EventForms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventFilterForm {

    private Boolean status;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date eventTime;
    private Byte minPercent;
    private Byte maxPercent;
}
