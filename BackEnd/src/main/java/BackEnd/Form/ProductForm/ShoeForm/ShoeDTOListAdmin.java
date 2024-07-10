package BackEnd.Form.ProductForm.ShoeForm;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeDTOListAdmin {

    private Short shoeId;

    private String shoeName;

    private Boolean status;

    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime createDate;

    private Boolean priority;

    private String brandName;

    private String shoeTypeName;

    private String shoeColorName;

    private String defaultImage;
}
