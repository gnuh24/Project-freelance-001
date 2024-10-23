package BackEnd.Controller.ProductController;

import BackEnd.Entity.ProductEntity.ShoeColor;
import BackEnd.Form.ProductForm.ShoeColorForms.ShoeColorCreateForm;
import BackEnd.Form.ProductForm.ShoeColorForms.ShoeColorDTO;
import BackEnd.Form.ProductForm.ShoeColorForms.ShoeColorDeleteForm;
import BackEnd.Service.ProductService.ShoeColorServices.IShoeColorService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ShoeColor")
public class ShoeColorController {

    @Autowired
    private IShoeColorService shoeColorService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping()
    public ShoeColorDTO createShoeColor(@ModelAttribute @Valid ShoeColorCreateForm form) {
        ShoeColor shoeColor = shoeColorService.createShoeColor(form);
        return modelMapper.map(shoeColor, ShoeColorDTO.class);
    }


    @DeleteMapping()
    public String deleteShoeColor(@ModelAttribute @Valid ShoeColorDeleteForm form) {
        ShoeColor.ShoeColorId id = modelMapper.map(form,ShoeColor.ShoeColorId.class );
        shoeColorService.deleteShoeColor(id);
        return "Xóa thành công màu khỏi sản phẩm !";
    }
}
