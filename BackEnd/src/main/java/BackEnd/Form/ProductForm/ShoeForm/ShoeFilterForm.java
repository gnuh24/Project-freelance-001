package BackEnd.Form.ProductForm.ShoeForm;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoeFilterForm {

    //Admin

    private Boolean status;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date minCreateDate;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date maxCreateDate;

    private Boolean priority;

    private Byte brandId;

    private Byte shoeTypeId;

    private Byte shoeColorId;


    //User

    private Integer minPrice;

    private Integer maxPrice;

    private Byte minSize;

    private Byte maxSize;

    // Event

    private Integer eventId;

}
