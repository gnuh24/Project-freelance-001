package BackEnd.Form.ProductForm.ColorForm;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ColorUpdateForm {

    @NotNull(message = "Bạn không thể để trống ID màu cần update !!")
    private Byte id;

    @NotBlank(message = "Bạn không được để trống tên màu !!")
    private String colorName;

}
