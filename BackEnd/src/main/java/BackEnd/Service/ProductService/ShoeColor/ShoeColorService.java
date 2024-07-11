package BackEnd.Service.ProductService.ShoeColor;

import BackEnd.Entity.ProductEntity.ShoeColor;
import BackEnd.Form.ProductForm.ShoeColorForm.ShoeColorCreateForm;
import BackEnd.Form.ProductForm.ShoeColorForm.ShoeColorUpdateForm;
import BackEnd.Repository.ProductRepository.IShoeColorRepository;
import BackEnd.Service.ProductService.Shoe.IShoeService;
import BackEnd.Specification.ProductSpecification.ShoeColorSpecification;
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
public class ShoeColorService implements IShoeColorService {

    @Autowired
    private IShoeColorRepository IShoeColorRepository;

    @Autowired
    @Lazy
    private IShoeService shoeService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ShoeColor> getAllShoeColorNoPaging() {
        return IShoeColorRepository.findByStatus(true);
    }

    @Override
    public Page<ShoeColor> getAllShoeColor(Pageable pageable, String search) {
        Specification<ShoeColor> specification = ShoeColorSpecification.buildWhere(search);
        return IShoeColorRepository.findAll(specification, pageable);
    }

    @Override
    public ShoeColor getShoeColorById(Byte id) {
        return IShoeColorRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public ShoeColor createShoeColor(ShoeColorCreateForm form) {
        ShoeColor entity = modelMapper.map(form, ShoeColor.class);
        return IShoeColorRepository.save(entity);
    }

    @Override
    @Transactional
    public ShoeColor updateShoeColor(ShoeColorUpdateForm form) {
        ShoeColor entity = modelMapper.map(form, ShoeColor.class);
        entity.setStatus(true);
        return IShoeColorRepository.save(entity);
    }

    @Override
    @Transactional
    public void deleteShoeColor(Byte shoeColorId) {
        ShoeColor target = getShoeColorById(shoeColorId);
        target.setStatus(false);
        IShoeColorRepository.save(target);
    }
}
