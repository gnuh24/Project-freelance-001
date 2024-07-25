package BackEnd.Form.NewsForms.FeedbackForms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackCreateForm {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotNull
    private String orderId;
}

