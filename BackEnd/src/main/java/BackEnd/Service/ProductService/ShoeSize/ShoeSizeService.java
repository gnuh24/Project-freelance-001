package BackEnd.Service.ProductService.ShoeSize;

import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Entity.ProductInfomation.ShoeSize;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeUpdateForm;
import BackEnd.Repository.ProductRepository.ShoeSizeRepository;
import BackEnd.Service.ProductService.Shoe.IShoeService;
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

    @Override
    public ShoeSize getShoeSizeById(Short shoeId, Byte size) {
        return shoeSizeRepository.findByShoe_ShoeIdAndIdSize(shoeId, size);
    }

    @Override
    public ShoeSize updateShoeSize(Short shoeId, Byte size, ShoeSizeUpdateForm form) {

        ShoeSize shoeSize = getShoeSizeById(shoeId, size);

        if (form.getPrice() != null){
            shoeSize.setPrice(form.getPrice());
        }

        if (form.getQuanlity() != null){
            shoeSize.setQuantity(form.getQuanlity());
        }

        return shoeSize;
    }
}
