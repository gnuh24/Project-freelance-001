package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductInfomation.Shoe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ShoeRepository extends JpaRepository<Shoe, Short>, JpaSpecificationExecutor<Shoe> {

    List<Shoe> getShoeByBrand_BrandId(Byte brandId);

    List<Shoe> getShoeByShoeType_ShoeTypeId(Byte shoeTypeId);

    List<Shoe> getShoeByShoeColor_ShoeColorId(Byte shoeColorId);

}
