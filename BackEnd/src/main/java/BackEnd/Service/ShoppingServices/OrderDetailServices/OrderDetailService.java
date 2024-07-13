package BackEnd.Service.ShoppingServices.OrderDetailServices;

import BackEnd.Entity.ShoppingEntities.Order;
import BackEnd.Entity.ShoppingEntities.OrderDetail;
import BackEnd.Form.ProductForm.ShoeForm.ShoeDTOListAdmin;
import BackEnd.Form.ShoppingForms.OrderDetailForm.OrderDetailCreateForm;
import BackEnd.Repository.ShoppingRepositories.IOrderDetailRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService implements IOrderDetailService{

    @Autowired
    private IOrderDetailRepository orderDetailRepository;


    @Autowired
    private ModelMapper modelMapper;

    @Override
    public OrderDetail createOrderDetail(Order order, OrderDetailCreateForm listForm) {
        System.err.println("Lỗi trước MOdel Mapper");
        OrderDetail orderDetail = modelMapper.map(listForm, OrderDetail.class);
        orderDetail.setOrder(order);
        System.err.println("Sau model Mapper");
        OrderDetail result = orderDetailRepository.save(orderDetail);
        System.err.println("Sau khi lưu ");
        return result;
    }

}
