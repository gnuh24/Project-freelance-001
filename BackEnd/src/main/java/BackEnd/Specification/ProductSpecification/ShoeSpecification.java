package BackEnd.Specification.ProductSpecification;

import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Form.ProductForm.ShoeForm.ShoeFilterForm;
import com.mysql.cj.util.StringUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;


@Data
@AllArgsConstructor
public class ShoeSpecification implements Specification<Shoe> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    //Đây là phương thức ta dùng để custom filter
    public Predicate toPredicate(@NonNull  Root<Shoe> root,
                                 @NonNull  CriteriaQuery<?> query,
                                 @NonNull  CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("shoeId")){
            return criteriaBuilder.equal(root.get("shoeId") ,value);
        }

        if (field.equalsIgnoreCase("shoeName")){
            return criteriaBuilder.like(root.get("shoeName") ,"%" + value  + "%");
        }

        if (field.equalsIgnoreCase("status")){
            return criteriaBuilder.equal(root.get("status"), value);
        }

        if (field.equalsIgnoreCase("priority")){
            return criteriaBuilder.equal(root.get("priority"), value);
        }

        if (field.equalsIgnoreCase("minCreateDate")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("createDate").as(java.sql.Date.class) , (Date) value);
        }

        if (field.equalsIgnoreCase("maxCreateDate")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("createDate").as(java.sql.Date.class) , (Date) value);
        }

        if (field.equalsIgnoreCase("brandId")){
            return criteriaBuilder.equal(root.get("brand").get("brandId"), value);
        }

        if (field.equalsIgnoreCase("shoeTypeId")){
            return criteriaBuilder.equal(root.get("shoeType").get("shoeTypeId"), value);
        }

        return null;
    }


    public static Specification<Shoe> buildWhere(String search, ShoeFilterForm form){
        Specification<Shoe> where = null;

        //Filter cho thanh tìm kiếm
        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            ShoeSpecification shoeName = new ShoeSpecification("shoeName", search);
            ShoeSpecification shoeId = new ShoeSpecification("shoeId", search);

            where = Specification.where(shoeName).or(shoeId);
        }

        if (form != null){

            //Filter cho Combobox Status (Trạng thái)
            if (form.getStatus() != null){
                ShoeSpecification status = new ShoeSpecification("status", form.getStatus());
                if (where != null){
                    where = where.and(status);
                }else{
                    where = Specification.where(status);
                }
            }

            //Filter cho Combobox Priority (Độ ưu tiên)
            if (form.getPriority() != null){
                ShoeSpecification priority = new ShoeSpecification("priority", form.getPriority());
                if (where != null){
                    where = where.and(priority);
                }else{
                    where = Specification.where(priority);
                }
            }

            //Filter cho bộ lọc theo ngày ( Cận dưới )
            if (form.getMinCreateDate() != null){
                ShoeSpecification minCreateDate = new ShoeSpecification("minCreateDate", form.getMinCreateDate());
                if (where != null){
                    where = where.and(minCreateDate);
                }else{
                    where = Specification.where(minCreateDate);
                }
            }

            //Filter cho bộ lọc theo ngày ( Cận trên )
            if (form.getMaxCreateDate() != null){
                ShoeSpecification maxCreateDate = new ShoeSpecification("maxCreateDate", form.getMaxCreateDate());
                if (where != null){
                    where = where.and(maxCreateDate);
                }else{
                    where = Specification.where(maxCreateDate);
                }
            }

            //Filter cho bộ lọc theo thương hiệu
            if (form.getBrandId() != null){
                ShoeSpecification brandId = new ShoeSpecification("brandId", form.getBrandId());
                if (where != null){
                    where = where.and(brandId);
                }else{
                    where = Specification.where(brandId);
                }
            }

            //Filter cho bộ lọc theo loại sản phẩm
            if (form.getShoeTypeId() != null){
                ShoeSpecification shoeTypeId = new ShoeSpecification("shoeTypeId", form.getShoeTypeId());
                if (where != null){
                    where = where.and(shoeTypeId);
                }else{
                    where = Specification.where(shoeTypeId);
                }
            }
        }


        return where;
    }


}
