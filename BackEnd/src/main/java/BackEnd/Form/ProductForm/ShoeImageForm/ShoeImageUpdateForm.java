package BackEnd.Form.ProductForm.ShoeImageForm;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeImageUpdateForm {

//    private Integer shoeId;

    private MultipartFile shoeImage;

    private Boolean priority;

}
