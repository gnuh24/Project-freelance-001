package BackEnd.Form.ProductForm.ShoeForm;

import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageCreateForm;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeCreateForm {

    private String shoeName;

    private String color;

    private Boolean status;

    private String description;

    private Boolean priority;

    private Byte brandId;

    private Byte shoeTypeId;

    private List<ShoeSizeCreateForm> shoeSizes;

    private List<ShoeImageCreateForm> shoeImages;
}
