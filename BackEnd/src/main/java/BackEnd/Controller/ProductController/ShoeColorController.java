package BackEnd.Controller.ProductController;

import BackEnd.Entity.ProductInfomation.ShoeColor;
import BackEnd.Form.ProductForm.ShoeColorForm.ShoeColorCreateForm;
import BackEnd.Form.ProductForm.ShoeColorForm.ShoeColorDTO;
import BackEnd.Form.ProductForm.ShoeColorForm.ShoeColorUpdateForm;
import BackEnd.Service.ProductService.ShoeColor.IShoeColorService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/ShoeColor")
@CrossOrigin(origins = "*")
public class ShoeColorController {

    @Autowired
    private IShoeColorService shoeColorService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "/noPaging")
    public List<ShoeColorDTO> getAllShoeColorNoPaging() {
        List<ShoeColor> list = shoeColorService.getAllShoeColorNoPaging();
        return modelMapper.map(list, new TypeToken<List<ShoeColorDTO>>() {}.getType());
    }

    @GetMapping()
    public Page<ShoeColorDTO> getAllShoeColor(Pageable pageable,
                                              @RequestParam(name = "search", required = false) String search) {
        Page<ShoeColor> entities = shoeColorService.getAllShoeColor(pageable, search);
        List<ShoeColorDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<ShoeColorDTO>>() {}.getType());
        return new PageImpl<>(dtos, pageable, entities.getTotalElements());
    }

    @GetMapping(value = "/{shoeColorId}")
    public ShoeColorDTO getShoeColorById(@PathVariable Byte shoeColorId) {
        ShoeColor entity = shoeColorService.getShoeColorById(shoeColorId);
        return modelMapper.map(entity, ShoeColorDTO.class);
    }

    @PostMapping()
    public ShoeColorDTO createShoeColor(@ModelAttribute @Valid ShoeColorCreateForm form) {
        ShoeColor entity = shoeColorService.createShoeColor(form);
        return modelMapper.map(entity, ShoeColorDTO.class);
    }

    @PatchMapping()
    public ShoeColorDTO updateShoeColor(@ModelAttribute @Valid ShoeColorUpdateForm form) {
        ShoeColor entity = shoeColorService.updateShoeColor(form);
        return modelMapper.map(entity, ShoeColorDTO.class);
    }

    @DeleteMapping(value = "/{shoeColorId}")
    public void deleteShoeColor(@PathVariable Byte shoeColorId) {
        shoeColorService.deleteShoeColor(shoeColorId);
    }
}
