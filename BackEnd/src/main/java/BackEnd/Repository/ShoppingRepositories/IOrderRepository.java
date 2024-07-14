package BackEnd.Repository.ShoppingRepositories;

import BackEnd.Entity.ShoppingEntities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IOrderRepository extends JpaRepository<Order, String>, JpaSpecificationExecutor<Order> {

    List<Order> findByUserInformation_Id(Integer userInformationId);

    @Query("SELECT CASE WHEN COUNT(o) > 0 THEN true ELSE false END " +
        "FROM Order o " +
        "WHERE o.userInformation.id = :userInformationId " +
        "AND o.id = :orderId")
    Boolean isOrderBelongToThisId(@Param("userInformationId") Integer userInformationId,
                                  @Param("orderId") String orderId);

}
