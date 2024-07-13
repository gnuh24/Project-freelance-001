package BackEnd.Service.ShoppingServices.OrderStatusServices;

import BackEnd.Entity.ShoppingEntities.Order;
import BackEnd.Entity.ShoppingEntities.OrderStatus;
import BackEnd.Form.ShoppingForms.OrderStatusForms.OrderStatusCreateFormForFirstTime;
import BackEnd.Repository.ShoppingRepositories.IOrderStatusRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderStatusService implements IOrderStatusService{

    @Autowired
    private IOrderStatusRepository orderStatusRepository;

    @Autowired
    private ModelMapper  modelMapper;

    @Override
    public OrderStatus getNewestOrderStatus(String orderId) {
        return orderStatusRepository.findLatestOrderStatusByOrderId(orderId);
    }

    @Override
    public OrderStatus createOrderStatus(OrderStatusCreateFormForFirstTime form) {

        OrderStatus newOrderStatus = modelMapper.map(form, OrderStatus.class);

        return orderStatusRepository.save(newOrderStatus);

    }
}
