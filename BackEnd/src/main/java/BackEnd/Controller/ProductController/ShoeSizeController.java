package BackEnd.Controller.ProductController;

import BackEnd.Entity.ProductEntity.ShoeSize;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeDTO;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeUpdateForm;
import BackEnd.Service.ProductService.ShoeSize.IShoeSizeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping(value = "/ShoeSize")

public class ShoeSizeController {

    @Autowired
    private IShoeSizeService shoeSizeService;

    @Autowired
    private ModelMapper modelMapper;



    @PostMapping(value = "/{shoeId}")
    public ShoeSizeDTO createShoe(@PathVariable Short shoeId,
                                             @ModelAttribute ShoeSizeCreateForm form) throws IOException {
       ShoeSize shoeSize = shoeSizeService.createShoeSize(shoeId, form);
       return modelMapper.map(shoeSize, ShoeSizeDTO.class);

    }

    @PatchMapping()
    public ShoeSizeDTO updateShoe(@ModelAttribute ShoeSizeUpdateForm form) {
        ShoeSize entity = shoeSizeService.updateShoeSize(form);

        return  modelMapper.map(entity, ShoeSizeDTO.class);
    }



}

