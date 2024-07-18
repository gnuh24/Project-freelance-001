package BackEnd.Form.ShoppingForms.EventForms;

import BackEnd.Form.ShoppingForms.SaleForms.SaleCreateFormForFirstTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventCreateForm {

    private String eventName;
    private MultipartFile banner;

    @DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime startTime;

    @DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime endTime;

    private Boolean status;

    private Byte percentage;

    private List<SaleCreateFormForFirstTime> saleCreateForm;

}

