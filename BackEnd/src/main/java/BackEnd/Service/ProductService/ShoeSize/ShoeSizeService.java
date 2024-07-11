package BackEnd.Service.ProductService.ShoeSize;

import BackEnd.Entity.ProductEntity.ShoeSize;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeUpdateForm;
import BackEnd.Repository.ProductRepository.IShoeSizeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoeSizeService implements IShoeSizeService {

    @Autowired
    private IShoeSizeRepository IShoeSizeRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<ShoeSize> getAllShoeSizeByShoeId(Short shoeId) {
        return IShoeSizeRepository.findByShoe_ShoeId(shoeId);
    }

    @Override
    public List<ShoeSize> getAllShoeSizeByShoeIdAndStatus(Short shoeId, Boolean status) {
        return IShoeSizeRepository.findByShoe_ShoeIdAndStatus(shoeId, status);
    }


    @Override
    public Byte getNumberOfSize(Short shoeId) {
        return IShoeSizeRepository.countNumberOfSize(shoeId);
    }

    @Override
    public Integer getTheLowestPrice(Short shoeId) {
        return IShoeSizeRepository.getTheLowestPriceOfShoe(shoeId);
    }

    @Override
    public List<Byte> getTop3SizeOfShoe(Short shoeId){
        return IShoeSizeRepository.get3BiggestSizeOfShoe(shoeId);
    }


    @Override
    public ShoeSize createShoeSize(Short shoeId, ShoeSizeCreateForm form) {

        ShoeSize entity = modelMapper.map(form, ShoeSize.class);

        ShoeSize.ShoeSizeId id = new ShoeSize.ShoeSizeId(shoeId, form.getSize());
        entity.setId(id);

        return IShoeSizeRepository.save(entity);
    }

    @Override
    public ShoeSize getShoeSizeById(Short shoeId, Byte size) {
        return IShoeSizeRepository.findByShoe_ShoeIdAndIdSize(shoeId, size);
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

        if (form.getStatus() != null){
            shoeSize.setStatus(form.getStatus());
        }

        return IShoeSizeRepository.save(shoeSize);
    }
}
