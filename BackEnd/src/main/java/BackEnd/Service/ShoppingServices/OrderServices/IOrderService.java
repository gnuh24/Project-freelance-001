package BackEnd.Service.ShoppingServices.OrderServices;

import BackEnd.Entity.ShoppingEntities.Order;
import BackEnd.Form.ShoppingForms.OrderForm.OrderCreateForm;
import BackEnd.Form.ShoppingForms.OrderForm.OrderFilterForm;
import BackEnd.Form.ShoppingForms.OrderForm.OrderUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IOrderService {

    Page<Order> getAllOrder(Pageable pageable, OrderFilterForm form, String search);

    Order getOrderById(String orderId);

    Order createOrder(OrderCreateForm form);

    Order updateOrder(OrderUpdateForm form);

}
