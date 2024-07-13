package BackEnd.Repository.ShoppingRepositories;

import BackEnd.Entity.ShoppingEntities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IOrderRepository extends JpaRepository<Order, String>, JpaSpecificationExecutor<Order> {
}
