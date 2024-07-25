package BackEnd.Service.NewsServices.FeedbackServices;


import BackEnd.Entity.NewsEntities.Feedback;
import BackEnd.Form.NewsForms.FeedbackForms.FeedbackCreateForm;
import BackEnd.Form.NewsForms.FeedbackForms.FeedbackFilterForm;
import BackEnd.Form.NewsForms.FeedbackForms.FeedbackUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IFeedbackService {
    Feedback getFeedbackById(Integer id);
    Feedback createFeedback(FeedbackCreateForm form);
    Page<Feedback> getAllFeedbacks(Pageable pageable, FeedbackFilterForm form, String search);
    void deleteFeedback(Integer id);
}
