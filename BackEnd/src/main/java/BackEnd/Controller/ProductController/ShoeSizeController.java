package BackEnd.Controller.ProductController;

import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Entity.ProductInfomation.ShoeSize;
import BackEnd.Form.ProductForm.ShoeForm.ShoeUpdateForm;
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
@CrossOrigin(origins = "*")
public class ShoeSizeController {

//    @Autowired
//    private IShoeService shoeService;
//
//    @Autowired
//    private IShoeImageService shoeImageService;

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

    @PatchMapping(value = "/{shoeId}/{size}")
    public ShoeSizeDTO updateShoe(@PathVariable Short shoeId,
                                       @PathVariable Byte size,
                                       @ModelAttribute ShoeSizeUpdateForm form) {
        ShoeSize entity = shoeSizeService.updateShoeSize(shoeId, size, form);

        ShoeSizeDTO newEntity = modelMapper.map(entity, ShoeSizeDTO.class);

        return newEntity;
    }



}

