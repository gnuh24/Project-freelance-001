package BackEnd.Service.ProductService.ShoeSize;

import BackEnd.Entity.ProductInfomation.ShoeSize;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import BackEnd.Repository.ProductRepository.ShoeSizeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoeSizeService implements IShoeSizeService {

    @Autowired
    private ShoeSizeRepository shoeSizeRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<ShoeSize> getAllShoeSizeByShoeId(Short shoeId) {
        return shoeSizeRepository.findByShoe_ShoeId(shoeId);
    }


    @Override
    public ShoeSize createShoeSize(Short shoeId, ShoeSizeCreateForm form) {

        ShoeSize entity = modelMapper.map(form, ShoeSize.class);

        ShoeSize.ShoeSizeId id = new ShoeSize.ShoeSizeId(shoeId, form.getSize());
        entity.setId(id);

        return shoeSizeRepository.save(entity);
    }
}
