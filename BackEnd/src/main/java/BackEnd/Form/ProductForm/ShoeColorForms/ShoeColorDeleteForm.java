package BackEnd.Form.ProductForm.ShoeColorForms;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoeColorDeleteForm {

    @NotNull(message = "Bạn không được thiếu Color Id !")
    private  Integer colorId;

    @NotNull(message = "Bạn không được thiếu Shoe Id !")
    private  Integer shoeId;
}

