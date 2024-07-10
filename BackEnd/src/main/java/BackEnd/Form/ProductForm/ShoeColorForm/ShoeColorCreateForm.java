package BackEnd.Form.ProductForm.ShoeColorForm;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ShoeColorCreateForm {

    @NotBlank(message = "Bạn không được để trống tên màu !!")
    private String shoeColorName;
}
