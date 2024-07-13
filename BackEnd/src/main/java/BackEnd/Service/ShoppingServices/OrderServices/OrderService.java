package BackEnd.Service.ShoppingServices.OrderServices;

import BackEnd.Entity.AccountEntity.UserInformation;
import BackEnd.Entity.ShoppingEntities.Order;
import BackEnd.Entity.ShoppingEntities.OrderStatus;
import BackEnd.Form.ShoppingForms.OrderDetailForm.OrderDetailCreateForm;
import BackEnd.Form.ShoppingForms.OrderForm.OrderCreateForm;
import BackEnd.Form.ShoppingForms.OrderForm.OrderUpdateForm;
import BackEnd.Form.ShoppingForms.OrderStatusForms.OrderStatusCreateFormForFirstTime;
import BackEnd.Repository.ShoppingRepositories.IOrderRepository;
import BackEnd.Service.AccountServices.UserInformationService.IUserInformationService;
import BackEnd.Service.ShoppingServices.OrderDetailServices.IOrderDetailService;
import BackEnd.Service.ShoppingServices.OrderStatusServices.IOrderStatusService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService implements IOrderService{

    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IOrderDetailService orderDetailService;

    @Autowired
    private IOrderStatusService orderStatusService;

    @Autowired
    private IUserInformationService userInformationService;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public Order getOrderById(String orderId) {

        return orderRepository.findById(orderId).orElse(null);
    }


    @Override
    @Transactional
    public Order createOrder(OrderCreateForm form) {

        // 1. Create new `Order`
        Order newOrder = modelMapper.map(form, Order.class);
        newOrder = orderRepository.save(newOrder);

        // 2. Create new `OrderDetail`s
        for (OrderDetailCreateForm form1: form.getListOrderDetail()){
            orderDetailService.createOrderDetail(newOrder, form1);
        }

        // 3. Create new `OrderStatus`
        OrderStatusCreateFormForFirstTime orderStatusCreateForm = new OrderStatusCreateFormForFirstTime(newOrder.getId(), OrderStatus.Status.ChoDuyet);
        orderStatusService.createOrderStatus(orderStatusCreateForm);

        // 4. Liên kết thông tin người dùng
        UserInformation in4 = userInformationService.getUserById(form.getUserInformationId());
        newOrder.setUserInformation(in4);

        return newOrder;

    }

    @Override
    public Order updateOrder(OrderUpdateForm form) {

        Order order = getOrderById(form.getId());

        if (form.getType() != null){
            order.setType(form.getType());
        }

        if (form.getNote() != null){
            order.setNote(form.getNote());
        }

        if (form.getUserInformationId() != null){

            UserInformation in4 = userInformationService.getUserById(form.getUserInformationId());
            order.setUserInformation(in4);

        }

        return orderRepository.save(order);
    }

}
