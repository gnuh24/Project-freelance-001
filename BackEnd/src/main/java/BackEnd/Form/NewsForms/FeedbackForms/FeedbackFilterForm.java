package BackEnd.Form.NewsForms.FeedbackForms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackFilterForm {

    private LocalDateTime from;

    private LocalDateTime to;

    private Boolean isDeleted;

    private Boolean isReaded;
}

