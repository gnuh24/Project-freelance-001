package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductInfomation.ShoeColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ShoeColorRepository extends JpaRepository<ShoeColor, Byte>, JpaSpecificationExecutor<ShoeColor> {
}
