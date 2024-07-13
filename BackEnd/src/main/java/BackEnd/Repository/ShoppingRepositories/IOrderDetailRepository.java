package BackEnd.Repository.ShoppingRepositories;

import BackEnd.Entity.ShoppingEntities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderDetailRepository extends JpaRepository<OrderDetail, OrderDetail.OrderDetailId> {
}
