package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductEntity.ShoeImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ShoeImageRepository extends JpaRepository<ShoeImage, Short>, JpaSpecificationExecutor<ShoeImage> {
    ShoeImage findByShoe_shoeIdAndPriority(Short shoeId, Boolean priority);
    ShoeImage findByShoeImageId(Short shoeImageId);

    List<ShoeImage> findByShoe_shoeId(Short shoeId);

}