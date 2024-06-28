package BackEnd.Form.ProductForm.ShoeSizeForm;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeSizeDTO {

    private Byte idSize;

    private Integer price;

    private Short quantity;
}
