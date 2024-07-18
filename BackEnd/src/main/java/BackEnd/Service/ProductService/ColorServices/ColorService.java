package BackEnd.Service.ProductService.ColorServices;

import BackEnd.Entity.ProductEntity.Color;
import BackEnd.Form.ProductForm.ColorForm.ColorCreateForm;
import BackEnd.Form.ProductForm.ColorForm.ColorUpdateForm;
import BackEnd.Repository.ProductRepository.IColorRepository;
import BackEnd.Service.ProductService.Shoe.IShoeService;
import BackEnd.Specification.ProductSpecification.ColorSpecification;
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
public class ColorService implements IColorService {

    @Autowired
    private IColorRepository IColorRepository;

    @Autowired
    @Lazy
    private IShoeService shoeService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<Color> getAllShoeColorNoPaging() {
        return IColorRepository.findByStatus(true);
    }

    @Override
    public Page<Color> getAllShoeColor(Pageable pageable, String search) {
        Specification<Color> specification = ColorSpecification.buildWhere(search);
        return IColorRepository.findAll(specification, pageable);
    }

    @Override
    public Color getShoeColorById(Byte id) {
        return IColorRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Color createShoeColor(ColorCreateForm form) {
        Color entity = modelMapper.map(form, Color.class);
        return IColorRepository.save(entity);
    }

    @Override
    @Transactional
    public Color updateShoeColor(ColorUpdateForm form) {
        Color entity = modelMapper.map(form, Color.class);
        entity.setStatus(true);
        return IColorRepository.save(entity);
    }

    @Override
    @Transactional
    public void deleteShoeColor(Byte shoeColorId) {
        Color target = getShoeColorById(shoeColorId);
        target.setStatus(false);
        IColorRepository.save(target);
    }
}
