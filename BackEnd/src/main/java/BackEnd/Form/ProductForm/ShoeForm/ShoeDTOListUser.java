package BackEnd.Form.ProductForm.ShoeForm;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoeDTOListUser {

    private Short shoeId;

    private String shoeName;

    private Boolean priority;

    private String defaultImage;

    private Integer lowestPrice;

    private Byte numberOfShoeSize;

    private List<Byte> top3Size;
}
