package BackEnd.Service.NewsServices.FeedbackServices;

import BackEnd.Entity.NewsEntities.Feedback;
import BackEnd.Form.NewsForms.FeedbackForms.FeedbackCreateForm;
import BackEnd.Form.NewsForms.FeedbackForms.FeedbackFilterForm;
import BackEnd.Form.NewsForms.FeedbackForms.FeedbackUpdateForm;
import BackEnd.Repository.NewsRepositories.IFeedbackRepository;
import BackEnd.Specification.NewsSpecifications.FeedbackSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService implements IFeedbackService {

    @Autowired
    private IFeedbackRepository feedbackRepository;

    @Override
    public Feedback createFeedback(FeedbackCreateForm form) {
        Feedback feedback = new Feedback();
        feedback.setTitle(form.getTitle());
        feedback.setContent(form.getContent());
        feedback.setOrderId(form.getOrderId());
        return feedbackRepository.save(feedback);
    }


    @Override
    public Feedback getFeedbackById(Integer id) {
        Feedback feedback = feedbackRepository.findById(id).orElse(null);
        feedback.setIsChecked(true);
        return feedback;
    }

    @Override
    public Page<Feedback> getAllFeedbacks(Pageable pageable, FeedbackFilterForm form, String search) {
        Specification<Feedback> where = FeedbackSpecification.buildWhere(search, form);
        return feedbackRepository.findAll(where, pageable);
    }

    @Override
    public void deleteFeedback(Integer id) {
        Feedback feedback = getFeedbackById(id);
        feedback.setIsDeleted(true);
        feedbackRepository.save(feedback);
    }
}
