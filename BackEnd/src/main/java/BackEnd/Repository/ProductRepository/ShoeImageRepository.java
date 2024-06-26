package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Entity.ProductInfomation.ShoeImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ShoeImageRepository extends JpaRepository<ShoeImage, Short>, JpaSpecificationExecutor<ShoeImage> {
}