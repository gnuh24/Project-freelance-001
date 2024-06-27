package BackEnd.Service.ProductService;

import BackEnd.Entity.ProductInfomation.ShoeType;
import BackEnd.Form.ProductForm.ShoeTypeForm.ShoeTypeCreateForm;
import BackEnd.Form.ProductForm.ShoeTypeForm.ShoeTypeUpdateForm;
import BackEnd.Repository.ProductRepository.ShoeTypeRepository;
import BackEnd.Specification.ProductSpecification.ShoeTypeSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShoeTypeService implements IShoeTypeService{

    @Autowired
    private ShoeTypeRepository shoeTypeRepository;

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

        shoeTypeRepository.deleteById(shoeTypeId);

    }


}
