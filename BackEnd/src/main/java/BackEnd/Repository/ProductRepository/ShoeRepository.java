package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductInfomation.Shoe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ShoeRepository extends JpaRepository<Shoe, Short>, JpaSpecificationExecutor<Shoe> {
}
