package BackEnd.Service.ShoppingServices.OrderServices;

import BackEnd.Entity.ShoppingEntities.Order;
import BackEnd.Form.ShoppingForms.OrderForm.OrderCreateForm;
import BackEnd.Form.ShoppingForms.OrderForm.OrderUpdateForm;

public interface IOrderService {

    Order getOrderById(String orderId);

    Order createOrder(OrderCreateForm form);

    Order updateOrder(OrderUpdateForm form);

}
