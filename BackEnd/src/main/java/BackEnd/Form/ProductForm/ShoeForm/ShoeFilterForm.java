package BackEnd.Form.ProductForm.ShoeForm;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoeFilterForm {

    private Boolean status;

    private LocalDate minCreateDate;

    private LocalDate maxCreateDate;

    private Boolean priority;

    private Byte brandId;

    private Byte shoeTypeId;

}
