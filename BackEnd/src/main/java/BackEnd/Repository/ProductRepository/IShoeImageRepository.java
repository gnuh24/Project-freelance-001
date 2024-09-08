package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductEntity.ShoeImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IShoeImageRepository extends JpaRepository<ShoeImage,  Integer>, JpaSpecificationExecutor<ShoeImage> {
    ShoeImage findTopByShoe_ShoeIdAndPriority(Integer shoeId, Boolean priority);
    ShoeImage findByShoeImageId( Integer shoeImageId);
    List<ShoeImage> findByShoe_shoeId( Integer shoeId);

    // Custom query to update ShoeImage where ShoeId = ? and Priority = true
    @Modifying
    @Query(value = "UPDATE ShoeImage si SET si.priority = false WHERE si.shoeId = :shoeId AND si.priority = true", nativeQuery = true)
    int updateShoeImagePathByShoeIdAndPriorityTrue(@Param("shoeId") Integer shoeId);

}