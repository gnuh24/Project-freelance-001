package BackEnd.Form.ProductForm.BrandForm;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class BrandUpdateForm {

    private Byte brandId;

    private String brandName;

    private MultipartFile logo;

}
