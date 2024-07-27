package BackEnd.Repository.ShoppingRepositories;

import BackEnd.Entity.ShoppingEntities.Order;
import BackEnd.Form.StatisticForms.BestSellerForm;
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

    @Query(value = "SELECT s.ShoeId AS shoeId, s.ShoeName AS shoeName, od.Size AS size, " +
        "COUNT(od.Quantity) AS quantity, COUNT(od.Total) AS total " +
        "FROM `Order` o " +
        "JOIN `OrderDetail` od ON o.Id = od.OrderId " +
        "JOIN `Shoe` s ON od.ShoeId = s.ShoeId " +
        "JOIN `OrderStatus` os ON os.OrderId = o.Id " +
        "WHERE os.Status = 'GiaoThanhCong' AND " +
        "DATE(os.UpdateTime) BETWEEN COALESCE(:minDate, '2022-01-01') AND COALESCE(:maxDate, CURRENT_DATE()) " +
        "GROUP BY s.ShoeId, s.ShoeName, od.Size " +
        "ORDER BY total DESC, quantity DESC", nativeQuery = true)
    List<BestSellerForm> findShoeSales(@Param("minDate") String minDate, @Param("maxDate") String maxDate);


}
