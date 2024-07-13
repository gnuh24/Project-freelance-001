package BackEnd.Controller.ShoppingControllers;

import BackEnd.Entity.ShoppingEntities.Order;
import BackEnd.Form.ShoppingForms.OrderForm.*;
import BackEnd.Service.ShoppingServices.OrderServices.OrderService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Order")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ModelMapper modelMapper;

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
