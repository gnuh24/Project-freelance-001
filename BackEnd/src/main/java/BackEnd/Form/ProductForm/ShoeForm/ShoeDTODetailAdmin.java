package BackEnd.Form.ProductForm.ShoeForm;

import BackEnd.Entity.ProductInfomation.Brand;
import BackEnd.Entity.ProductInfomation.ShoeImage;
import BackEnd.Entity.ProductInfomation.ShoeSize;
import BackEnd.Entity.ProductInfomation.ShoeType;
import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageDTO;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoeDTODetailAdmin {

    private Short shoeId;

    private String shoeName;

    private String shoeColorName;

    private Boolean status;

    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime createDate;

    private Boolean priority;

    private String description;

    private String brandName;

    private String shoeTypeName;

    private List<ShoeSizeDTO> shoeSizes;

    private List<ShoeImageDTO> shoeImages;
}
