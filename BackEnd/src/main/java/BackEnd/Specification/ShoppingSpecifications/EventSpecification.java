package BackEnd.Specification.ShoppingSpecifications;

import BackEnd.Entity.ShoppingEntities.Event;
import BackEnd.Form.ShoppingForms.EventForms.EventFilterForm;
import BackEnd.Other.Helper.StringHelper;
import com.mysql.cj.util.StringUtils;
import jakarta.persistence.criteria.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@Data
@AllArgsConstructor
public class EventSpecification implements Specification<Event> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(@NonNull Root<Event> root,
                                 @NonNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("status")) {
            return criteriaBuilder.equal(root.get("status"), value);
        }

        if (field.equalsIgnoreCase("eventDate")) { // Use the field name that represents the date input
            return criteriaBuilder.and(
                criteriaBuilder.greaterThanOrEqualTo(root.get("endTime").as(java.sql.Date.class), (Date) value), // Include the end of the event day
                criteriaBuilder.lessThanOrEqualTo(root.get("startTime").as(java.sql.Date.class) ,(Date) value) // Include the start of the event day
            );
        }

        if (field.equalsIgnoreCase("minPercent")) {
            return criteriaBuilder.greaterThanOrEqualTo(root.get("percentage"), (Byte) value);
        }

        if (field.equalsIgnoreCase("maxPercent")) {
            return criteriaBuilder.lessThanOrEqualTo(root.get("percentage"), (Byte) value);
        }

        if (field.equalsIgnoreCase("eventName")) {
            return criteriaBuilder.like(root.get("eventName"), "%" + value + "%");
        }

        return null;
    }

    public static Specification<Event> buildWhere(EventFilterForm form, String search) {
        Specification<Event> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            EventSpecification eventNameSpec = new EventSpecification("eventName", search);
            where = Specification.where(eventNameSpec);
        }

        if (form != null) {

            if (form.getStatus() != null) {
                EventSpecification statusSpec = new EventSpecification("status", form.getStatus());
                if (where != null) {
                    where = where.and(statusSpec);
                } else {
                    where = Specification.where(statusSpec);
                }
            }

            if (form.getEventTime() != null) {
                EventSpecification statusSpec = new EventSpecification("eventDate", form.getEventTime());
                if (where != null) {
                    where = where.and(statusSpec);
                } else {
                    where = Specification.where(statusSpec);
                }
            }

            if (form.getMinPercent() != null) {
                EventSpecification minPercentSpec = new EventSpecification("minPercent", form.getMinPercent());
                if (where != null) {
                    where = where.and(minPercentSpec);
                } else {
                    where = Specification.where(minPercentSpec);
                }
            }

            if (form.getMaxPercent() != null) {
                EventSpecification maxPercentSpec = new EventSpecification("maxPercent", form.getMaxPercent());
                if (where != null) {
                    where = where.and(maxPercentSpec);
                } else {
                    where = Specification.where(maxPercentSpec);
                }
            }
        }

        return where;
    }
}
