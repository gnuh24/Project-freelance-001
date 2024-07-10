package BackEnd.Specification.AccountSpecifications;

import BackEnd.Entity.AccountEntity.Account;
import com.mysql.cj.util.StringUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

@Data
public class AccountSpecification implements Specification<Account> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(@NotNull Root<Account> root,
                                 @NotNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("role")) {
            return criteriaBuilder.equal(root.get("role"), value);
        }

        if (field.equalsIgnoreCase("status")) {
            return criteriaBuilder.equal(root.get("status"), value);
        }

        return null;
    }

    public static Specification<Account> buildWhere(String search) {
        Specification<Account> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            AccountSpecification roleSpec = new AccountSpecification("role", search);
            where = Specification.where(roleSpec);
        }

        return where;
    }
}

