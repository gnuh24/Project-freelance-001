package BackEnd.Controller.NewsControllers;

import BackEnd.Entity.NewsEntities.Feedback;
import BackEnd.Form.NewsForms.FeedbackForms.FeedbackCreateForm;
import BackEnd.Form.NewsForms.FeedbackForms.FeedbackFilterForm;
import BackEnd.Form.NewsForms.FeedbackForms.FeedbackListDTO;
import BackEnd.Service.NewsServices.FeedbackServices.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public void createFeedback(@ModelAttribute @Valid FeedbackCreateForm form) {
        feedbackService.createFeedback(form);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Integer id) {
        Feedback feedback = feedbackService.getFeedbackById(id);
        if (feedback == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(feedback);
    }

    @GetMapping
    public ResponseEntity<Page<Feedback>> getAllFeedbacks(Pageable pageable,
                                                          FeedbackFilterForm form,
                                                          @RequestParam(required = false) String search) {
        form.setIsDeleted(false);
        Page<Feedback> feedbacks = feedbackService.getAllFeedbacks(pageable, form, search);
        return ResponseEntity.ok(feedbacks);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Integer id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
}

