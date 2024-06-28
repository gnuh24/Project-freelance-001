package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Entity.ProductInfomation.ShoeSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ShoeSizeRepository extends JpaRepository<ShoeSize, ShoeSize.ShoeSizeId>, JpaSpecificationExecutor<ShoeSize> {
    List<ShoeSize> findByShoe_ShoeId(Short shoeId);

    ShoeSize findByShoe_ShoeIdAndIdSize(Short shoeId, Byte size);


}
