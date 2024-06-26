package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductInfomation.ShoeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ShoeTypeRepository extends JpaRepository<ShoeType, Byte>, JpaSpecificationExecutor<ShoeType> {

        

}
