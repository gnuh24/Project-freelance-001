package BackEnd.Repository.ProductRepository;

import BackEnd.Entity.ProductInfomation.Brand;
import BackEnd.Entity.ProductInfomation.ShoeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BrandRepository extends JpaRepository<Brand, Byte> , JpaSpecificationExecutor<Brand> {

}