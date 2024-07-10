package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductEntity.ShoeColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ShoeColorRepository extends JpaRepository<ShoeColor, Byte>, JpaSpecificationExecutor<ShoeColor> {

    List<ShoeColor> findByStatus(Boolean status);

}
