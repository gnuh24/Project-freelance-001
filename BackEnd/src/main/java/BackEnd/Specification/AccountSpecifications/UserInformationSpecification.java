package BackEnd.Specification.AccountSpecifications;


import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Entity.AccountEntity.UserInformation;
import BackEnd.Form.UsersForms.AccountForms.AccountFilterForm;
import com.mysql.cj.util.StringUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;

@Data
public class UserInformationSpecification implements Specification<UserInformation> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(@NotNull Root<UserInformation> root,
                                 @NotNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("phoneNumber")) {
            return criteriaBuilder.like(root.get("phoneNumber"), "%" + value + "%");
        }

        return null;
    }

    public static Specification<UserInformation> buildWhere(String search) {
        Specification<UserInformation> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            UserInformationSpecification roleSpec = new UserInformationSpecification("phoneNumber", search);
            where = Specification.where(roleSpec);
        }

        return where;
    }
}

