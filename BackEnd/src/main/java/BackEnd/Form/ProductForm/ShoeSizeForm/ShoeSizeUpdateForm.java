package BackEnd.Form.ProductForm.ShoeSizeForm;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoeSizeUpdateForm {

    private Short idShoeId;

    private Byte idSize;

    private Integer price;

    private Short quanlity;

    private Boolean status;

}
