package BackEnd.Controller.ProductController;

import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Entity.ProductInfomation.ShoeImage;
import BackEnd.Entity.ProductInfomation.ShoeSize;
import BackEnd.Entity.ProductInfomation.ShoeType;
import BackEnd.Form.ProductForm.ShoeForm.*;
import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageDTO;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeDTO;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeDTOForCreating;
import BackEnd.Service.ProductService.Shoe.IShoeService;
import BackEnd.Service.ProductService.ShoeImage.IShoeImageService;
import BackEnd.Service.ProductService.ShoeSize.IShoeSizeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

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
    public ShoeSizeDTOForCreating createShoe(@PathVariable Short shoeId,
                                             @ModelAttribute ShoeSizeCreateForm form) throws IOException {
       ShoeSize shoeSize = shoeSizeService.createShoeSize(shoeId, form);
       return modelMapper.map(shoeSize, ShoeSizeDTOForCreating.class);

    }

    @PatchMapping(value = "/{shoeId}")
    public ShoeDTOListAdmin updateShoe(@PathVariable Short shoeId,
                                       @ModelAttribute ShoeUpdateForm form) throws IOException {
        Shoe entity = shoeService.updateShoe(shoeId, form);

        ShoeDTOListAdmin newEntity = modelMapper.map(entity, ShoeDTOListAdmin.class);
        ShoeImage avatar = shoeImageService.getShoeImageByShoeIdAndPriority(entity.getShoeId(), true);
        newEntity.setAvatar(avatar.getPath());
        return newEntity;
    }



}

