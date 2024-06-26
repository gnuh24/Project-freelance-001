package BackEnd.Controller.ProductController;


import BackEnd.Entity.ProductInfomation.ShoeType;
import BackEnd.Form.ProductForm.ShoeTypeForm.ShoeTypeCreateForm;
import BackEnd.Form.ProductForm.ShoeTypeForm.ShoeTypeDTO;
import BackEnd.Form.ProductForm.ShoeTypeForm.ShoeTypeUpdateForm;
import BackEnd.Service.ProductService.IShoeTypeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/ShoeType")
@CrossOrigin(origins = "*")
public class ShoeTypeController {

    @Autowired
    private IShoeTypeService shoeTypeService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "/noPaging")
    public List<ShoeTypeDTO> getAllShoeTypeNoPaging(){

        //Lấy dữ liệu từ Service
        List<ShoeType> list = shoeTypeService.getAllShoeTypeNoPaging();

        //Dùng Model Mapper để chuyển từ list ShoeType -> list ShoeTypeDTO
        List<ShoeTypeDTO> listDTO = modelMapper.map(list, new TypeToken<List<ShoeTypeDTO>>(){}.getType());
        return listDTO;
    }

    @GetMapping()
    public Page<ShoeTypeDTO> getAllShoeType(Pageable pageable,
                                          @RequestParam(name = "search", required = false) String search){
        Page<ShoeType> entites = shoeTypeService.getAllShoeType(pageable, search);
        List<ShoeTypeDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<ShoeTypeDTO>>(){}.getType());
        return new PageImpl<>(dtos, pageable, entites.getTotalElements());
    }

    @GetMapping(value = "/{shoeTypeId}")
    public ShoeTypeDTO getShoeTypeById(@PathVariable Byte shoeTypeId){
        ShoeType entity = shoeTypeService.getShoeTypeById(shoeTypeId);
        return modelMapper.map(entity, ShoeTypeDTO.class);
    }

    @PostMapping()
    public ShoeTypeDTO createShoeType(@ModelAttribute ShoeTypeCreateForm form){
        ShoeType entity = shoeTypeService.createShoeType(form);
        return modelMapper.map(entity, ShoeTypeDTO.class);
    }

    @PatchMapping()
    public ShoeTypeDTO updateShoeType(@ModelAttribute ShoeTypeUpdateForm form){
        ShoeType entity = shoeTypeService.updateShoeType(form);
        return modelMapper.map(entity, ShoeTypeDTO.class);
    }

    @DeleteMapping(value = "/{shoeTypeId}")
    public void deleteShoeType(@PathVariable Byte shoeTypeId){
        shoeTypeService.deleteShoeType(shoeTypeId);
    }

}
