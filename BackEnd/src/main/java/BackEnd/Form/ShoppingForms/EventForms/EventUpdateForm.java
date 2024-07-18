package BackEnd.Form.ShoppingForms.EventForms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class EventUpdateForm {
    private Integer eventId;
    private MultipartFile banner;
    private String eventName;
    private Boolean status;
    private Byte percentage;
}
