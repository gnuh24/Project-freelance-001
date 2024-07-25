package BackEnd.Repository.NewsRepositories;

import BackEnd.Entity.NewsEntities.FeedbackImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFeedbackImageRepository extends JpaRepository<FeedbackImage, Integer> {
}
