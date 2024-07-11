package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductEntity.ShoeSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IShoeSizeRepository extends JpaRepository<ShoeSize, ShoeSize.ShoeSizeId>, JpaSpecificationExecutor<ShoeSize> {
    List<ShoeSize> findByShoe_ShoeId(Short shoeId);

    List<ShoeSize> findByShoe_ShoeIdAndStatus(Short shoeId, Boolean status);


    ShoeSize findByShoe_ShoeIdAndIdSize(Short shoeId, Byte size);

    @Query(value = "SELECT COUNT(*) FROM ShoeSize WHERE ShoeId = :shoeId", nativeQuery = true)
    Byte countNumberOfSize(@Param(value = "shoeId") Short shoeId);


    @Query(value = "SElECT MIN(`Price`) as `LowestPrice` FROM `ShoeSize`\n" +
                    "WHERE `Status` = 1 AND\n" +
                    "`ShoeId` = :shoeId", nativeQuery = true)
    Integer getTheLowestPriceOfShoe(@Param(value = "shoeId") Short shoeId);

    @Query(value = "SELECT `Size` FROM `ShoeSize`\n" +
                    "WHERE `ShoeId` = :shoeId\n" +
                    "AND `Status` = 1\n" +
                    "ORDER BY `Size` desc\n" +
                    "LIMIT 3 ;", nativeQuery = true)
    List<Byte> get3BiggestSizeOfShoe(@Param(value = "shoeId") Short shoeId);

}
