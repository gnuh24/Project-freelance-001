package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductInfomation.ShoeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ShoeTypeRepository extends JpaRepository<ShoeType, Byte>, JpaSpecificationExecutor<ShoeType> {

    List<ShoeType> findByStatus(Boolean status);

}
