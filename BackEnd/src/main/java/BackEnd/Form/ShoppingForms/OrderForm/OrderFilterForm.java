package BackEnd.Form.ShoppingForms.OrderForm;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderFilterForm {

    private LocalDate from;

    private LocalDate to;

    private String status;

    private String type;

}
