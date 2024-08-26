package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductEntity.Shoe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IShoeRepository extends JpaRepository<Shoe, Short>, JpaSpecificationExecutor<Shoe> {

    List<Shoe> getShoeByBrand_BrandId(Byte brandId);

    List<Shoe> getShoeByShoeType_ShoeTypeId(Byte shoeTypeId);

    @Query("SELECT s FROM Shoe s JOIN s.sales sa WHERE sa.event.eventId = :eventId")
    List<Shoe> findShoesByEventId(@Param("eventId") Integer eventId);

    @Transactional
    @Modifying
    @Query("UPDATE Shoe s SET s.brand.id = 1 WHERE s.brand.id = :brandId")
    int updateBrandToDefault(Byte brandId);

    @Transactional
    @Modifying
    @Query("UPDATE Shoe s SET s.shoeType.id = 1 WHERE s.shoeType.id = :shoeTypeId")
    int updateShoeTypeToDefault(Byte shoeTypeId);
}
