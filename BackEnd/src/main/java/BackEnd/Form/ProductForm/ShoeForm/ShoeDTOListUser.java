package BackEnd.Form.ProductForm.ShoeForm;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoeDTOListUser {

    private Short shoeId;

    private String shoeName;

    private Boolean priority;

    private String avatar;

    private Integer lowestPrice;

    private Byte numberOfShoeSize;

    private List<Byte> top3Size;
}
