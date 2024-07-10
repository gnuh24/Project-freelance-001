package BackEnd.Form.ProductForm.ShoeColorForm;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ShoeColorUpdateForm {

    @NotNull(message = "Bạn không thể để trống ID màu cần update !!")
    private Byte shoeColorId;

    @NotBlank(message = "Bạn không được để trống tên màu !!")
    private String shoeColorName;
}
