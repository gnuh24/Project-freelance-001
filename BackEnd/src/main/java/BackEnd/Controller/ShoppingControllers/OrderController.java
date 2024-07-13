package BackEnd.Controller.ShoppingControllers;

import BackEnd.Entity.ShoppingEntities.Order;
import BackEnd.Entity.ShoppingEntities.OrderStatus;
import BackEnd.Form.ProductForm.ShoeForm.ShoeDTOListAdmin;
import BackEnd.Form.ShoppingForms.OrderForm.*;
import BackEnd.Service.ShoppingServices.OrderServices.OrderService;
import BackEnd.Service.ShoppingServices.OrderStatusServices.IOrderStatusService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/Order")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private IOrderStatusService statusService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<OrderDTOListAdmin> getAllOrderAdmin(Pageable pageable,
                                                    OrderFilterForm form,
                                                    @RequestParam(required = false) String search) {
        Page<Order> entities = orderService.getAllOrder(pageable, form, search);
        List<OrderDTOListAdmin> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<OrderDTOListAdmin>>() {
        }.getType());

        for (OrderDTOListAdmin dtoListAdmin: dtos){
            OrderStatus newStatus = statusService.getNewestOrderStatus(dtoListAdmin.getId());
            dtoListAdmin.setLatestStatus(
                newStatus.getId().getStatus().toString()
            );
        }

        return new PageImpl<>(dtos, pageable, entities.getTotalElements());
    }

    @PostMapping()
    public ResponseEntity<OrderDTO> createNewOrder(@Valid @ModelAttribute OrderCreateForm orderCreateDTO) {
        Order savedOrder = orderService.createOrder(orderCreateDTO);
        OrderDTO dto = modelMapper.map(savedOrder, OrderDTO.class);
        return ResponseEntity.ok(dto);
    }

    @PatchMapping()
    public ResponseEntity<OrderDTO> updateOrder( @ModelAttribute OrderUpdateForm orderUpdateForm) {

        // Save the updated order
        Order updatedOrder = orderService.updateOrder(orderUpdateForm);

        // Map the updated order to DTO
        OrderDTO dto = modelMapper.map(updatedOrder, OrderDTO.class);

        // Return ResponseEntity with the updated DTO
        return ResponseEntity.ok(dto);
    }
}
