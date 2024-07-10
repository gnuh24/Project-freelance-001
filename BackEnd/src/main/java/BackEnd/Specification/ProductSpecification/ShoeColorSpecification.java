package BackEnd.Specification.ProductSpecification;

import BackEnd.Entity.ProductInfomation.ShoeColor;
import com.mysql.cj.util.StringUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

@Data
public class ShoeColorSpecification implements Specification<ShoeColor> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(@NonNull Root<ShoeColor> root,
                                 @NonNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("shoeColorName")) {
            return criteriaBuilder.like(root.get("shoeColorName"), "%" + value + "%");
        }
        if (field.equalsIgnoreCase("status")) {
            return criteriaBuilder.equal(root.get("status"), value );
        }


        return null;
    }

    public static Specification<ShoeColor> buildWhere(String search) {
        Specification<ShoeColor> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            ShoeColorSpecification spec = new ShoeColorSpecification("shoeColorName", search);
            where = Specification.where(spec);
        }

        ShoeColorSpecification status = new ShoeColorSpecification("status",true);
        if (where == null){
            where = Specification.where(status);
        }else{
            where = where.and(status);
        }

        return where;
    }
}
