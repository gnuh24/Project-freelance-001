package BackEnd.Form.NewsForms.NewsEntityForms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsListDTOForAdmin {
    private Integer id;
    private String banner;
    private String title;
    private LocalDateTime createTime;
    private Boolean status;
    private Boolean priorityFlag;
}
