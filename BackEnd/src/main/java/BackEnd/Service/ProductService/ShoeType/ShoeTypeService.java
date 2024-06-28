package BackEnd.Service.ProductService.ShoeType;

import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Entity.ProductInfomation.ShoeType;
import BackEnd.Form.ProductForm.ShoeForm.ShoeUpdateForm;
import BackEnd.Form.ProductForm.ShoeTypeForm.ShoeTypeCreateForm;
import BackEnd.Form.ProductForm.ShoeTypeForm.ShoeTypeUpdateForm;
import BackEnd.Repository.ProductRepository.ShoeTypeRepository;
import BackEnd.Service.ProductService.Shoe.IShoeService;
import BackEnd.Specification.ProductSpecification.ShoeTypeSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShoeTypeService implements IShoeTypeService {

    @Autowired
    private ShoeTypeRepository shoeTypeRepository;

    @Autowired
    @Lazy
    private IShoeService shoeService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ShoeType> getAllShoeTypeNoPaging() {

        return shoeTypeRepository.findAll();
    }

    @Override
    public Page<ShoeType> getAllShoeType(Pageable pageable, String search) {
        Specification specification = ShoeTypeSpecification.buildWhere(search);
        return shoeTypeRepository.findAll(specification, pageable);
    }

    @Override
    public ShoeType getShoeTypeById(Byte id) {
        return shoeTypeRepository.findById(id.byteValue()).get();
    }

    @Override
    @Transactional
    public ShoeType createShoeType(ShoeTypeCreateForm form) {

        ShoeType entity = modelMapper.map(form, ShoeType.class);

        return shoeTypeRepository.save(entity);

    }

    @Override
    @Transactional
    public ShoeType updateShoeType(ShoeTypeUpdateForm form) {

        ShoeType entity = modelMapper.map(form, ShoeType.class);

        return shoeTypeRepository.save(entity);

    }

    @Override
    @Transactional
    public void deleteShoeType(Byte shoeTypeId) {

        //1. Tìm tất cả các `Shoe` có liên quan tới `ShoeType` định xóa
        List<Shoe> listShoe = shoeService.getShoeByShoeType_ShoeTypeId(shoeTypeId);

        //2. Điều chỉnh khóa ngoại của toàn bộ `Shoe` thành `ShoeType` mặc định
        for (Shoe shoe: listShoe) {
            ShoeUpdateForm form = new ShoeUpdateForm();
            form.setShoeTypeId( (byte) 1);
            shoeService.updateShoe(shoe.getShoeId(), form);
        }

        //3. Xóa ShoeType khỏi CSDL
        shoeTypeRepository.deleteById(shoeTypeId);
    }


}
