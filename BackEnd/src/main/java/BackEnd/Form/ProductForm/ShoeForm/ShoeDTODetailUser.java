package BackEnd.Form.ProductForm.ShoeForm;

import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageDTO;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeDTODetailUser {

    private Short shoeId;

    private String shoeName;

    private String color;

    private Boolean priority;

    private String description;

    private String brandName;

    private String shoeTypeName;

    private List<ShoeSizeDTO> shoeSizes;

    private List<ShoeImageDTO> shoeImages;

}
