package BackEnd.Specification.NewsSpecifications;

import BackEnd.Entity.NewsEntities.Feedback;
import BackEnd.Form.NewsForms.FeedbackForms.FeedbackFilterForm;
import com.mysql.cj.util.StringUtils;
import jakarta.persistence.criteria.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FeedbackSpecification implements Specification<Feedback> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(@NonNull Root<Feedback> root,
                                 @NonNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("title")) {
            return criteriaBuilder.equal(root.get("title"), "%" + value + "%");
        }

        if (field.equalsIgnoreCase("isDeleted")) {
            return criteriaBuilder.equal(root.get("isDeleted"), value);
        }

        if (field.equalsIgnoreCase("isReaded")) {
            return criteriaBuilder.equal(root.get("isReaded"), value);
        }

        if (field.equalsIgnoreCase("from")) {
            return criteriaBuilder.greaterThanOrEqualTo(root.get("createTime").as(LocalDateTime.class), (LocalDateTime) value);
        }

        if (field.equalsIgnoreCase("to")) {
            return criteriaBuilder.lessThanOrEqualTo(root.get("createTime").as(LocalDateTime.class), (LocalDateTime) value);
        }

        return null;
    }

    public static Specification<Feedback> buildWhere(String search, FeedbackFilterForm form) {
        Specification<Feedback> where = null;

        if (form != null) {

            if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
                search = search.trim();
                FeedbackSpecification orderIdSpec = new FeedbackSpecification("orderId", search);
                where = Specification.where(orderIdSpec);
            }

            if (form.getFrom() != null) {
                FeedbackSpecification fromSpec = new FeedbackSpecification("from", form.getFrom());
                if (where != null) {
                    where = where.and(fromSpec);
                } else {
                    where = Specification.where(fromSpec);
                }
            }

            if (form.getTo() != null) {
                FeedbackSpecification toSpec = new FeedbackSpecification("to", form.getTo());
                if (where != null) {
                    where = where.and(toSpec);
                } else {
                    where = Specification.where(toSpec);
                }
            }

            if (form.getIsDeleted() != null) {
                FeedbackSpecification isDeletedSpec = new FeedbackSpecification("isDeleted", form.getIsDeleted());
                if (where != null) {
                    where = where.and(isDeletedSpec);
                } else {
                    where = Specification.where(isDeletedSpec);
                }
            }

            if (form.getIsReaded() != null) {
                FeedbackSpecification isReadedSpec = new FeedbackSpecification("isReaded", form.getIsReaded());
                if (where != null) {
                    where = where.and(isReadedSpec);
                } else {
                    where = Specification.where(isReadedSpec);
                }
            }
        }

        return where;
    }
}
