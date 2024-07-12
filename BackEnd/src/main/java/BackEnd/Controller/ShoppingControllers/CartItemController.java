package BackEnd.Controller.ShoppingControllers;

import BackEnd.Entity.ShoppingEntities.CartItem;
import BackEnd.Form.ShoppingForms.CartItemForm.CartItemCreateForm;
import BackEnd.Form.ShoppingForms.CartItemForm.CartItemDTO;
import BackEnd.Form.ShoppingForms.CartItemForm.CartItemUpdateForm;
import BackEnd.Service.ShoppingServices.CartServices.ICartItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/CartItem")
@CrossOrigin(origins = "*")
public class CartItemController {

    @Autowired
    private ICartItemService cartItemService;

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping("/{accountId}")
    public List<CartItemDTO> getAllCartItemsByAccountId(@PathVariable Integer accountId) {
        cartItemService.getAllCartItemsByAccountId(accountId);

        return null;
    }

    @PostMapping
    public CartItemDTO createCartItem(@ModelAttribute @Valid CartItemCreateForm cartItemCreateForm) {
        return modelMapper.map(cartItemService.createCartItem(cartItemCreateForm), CartItemDTO.class);
    }

    @PutMapping
    public CartItemDTO updateCartItem(@ModelAttribute @Valid CartItemUpdateForm cartItemUpdateForm) {
        return modelMapper.map(cartItemService.updateCartItem(cartItemUpdateForm), CartItemDTO.class);
    }

    @DeleteMapping("/{shoeId}/{size}/{accountId}")
    public void deleteCartItem(@PathVariable Short shoeId, @PathVariable Byte size, @PathVariable Integer accountId) {
        cartItemService.deleteCartItem(shoeId, size, accountId);
    }
}
