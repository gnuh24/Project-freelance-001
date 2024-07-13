package BackEnd.Repository.ShoppingRepositories;

import BackEnd.Entity.ShoppingEntities.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderStatusRepository extends JpaRepository<OrderStatus, OrderStatus.OrderStatusId> {
}
