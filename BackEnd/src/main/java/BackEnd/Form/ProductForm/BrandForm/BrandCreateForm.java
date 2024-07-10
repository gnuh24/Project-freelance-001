package BackEnd.Form.ProductForm.BrandForm;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class BrandCreateForm {

    @NotBlank(message = "Bạn không được để trống tên thương hiệu !!")
    private String brandName;

    //@NotNull(message = "Bạn không được để trống logo !!")
    //@FileSize(maxSize = 1048576, message = "File size should be less than 1MB") // 1MB = 1048576 bytes
    // TODO:
    private MultipartFile logo;

}
