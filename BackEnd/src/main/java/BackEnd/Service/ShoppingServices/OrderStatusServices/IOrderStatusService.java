package BackEnd.Service.ShoppingServices.OrderStatusServices;

import BackEnd.Entity.ShoppingEntities.Order;
import BackEnd.Entity.ShoppingEntities.OrderStatus;
import BackEnd.Form.ShoppingForms.OrderStatusForms.OrderStatusCreateFormForFirstTime;

public interface IOrderStatusService {

    OrderStatus getNewestOrderStatus(String orderId);

    OrderStatus createOrderStatusFirstTime(OrderStatusCreateFormForFirstTime form);

}
