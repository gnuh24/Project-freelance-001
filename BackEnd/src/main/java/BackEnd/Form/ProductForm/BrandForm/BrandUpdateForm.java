package BackEnd.Form.ProductForm.BrandForm;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BrandUpdateForm {

    @NotNull(message = "Bạn không thể để trống ID brand cần update !!")
    private Byte brandId;

    @NotBlank(message = "Bạn không được để trống tên brand !!")
    private String brandName;

    //@NotNull(message = "Bạn không được để trống logo !!")
    private MultipartFile logo;

}
