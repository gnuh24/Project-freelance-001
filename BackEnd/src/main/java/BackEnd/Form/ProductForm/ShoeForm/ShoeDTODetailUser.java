package BackEnd.Form.ProductForm.ShoeForm;

import BackEnd.Form.ProductForm.BrandForm.BrandDTOForShoe;
import BackEnd.Form.ProductForm.ColorForm.ColorDTO;
import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageDTO;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeDTO;
import BackEnd.Form.ProductForm.ShoeTypeForm.ShoeTypeDTOForShoe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeDTODetailUser {

    private Short shoeId;

    private String shoeName;


    private Boolean priority;

    private String description;

    private BrandDTOForShoe brand;

    private ShoeTypeDTOForShoe shoeType;

    private List<ColorDTO> shoeColor;

    private List<ShoeSizeDTO> shoeSizes;

    private List<ShoeImageDTO> shoeImages;

    private Byte sale;

}
