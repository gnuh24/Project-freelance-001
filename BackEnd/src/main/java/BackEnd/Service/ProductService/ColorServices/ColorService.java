package BackEnd.Service.ProductService.ColorServices;

import BackEnd.Entity.ProductEntity.Color;
import BackEnd.Form.ProductForm.ColorForm.ColorCreateForm;
import BackEnd.Form.ProductForm.ColorForm.ColorUpdateForm;
import BackEnd.Repository.ProductRepository.IColorRepository;
import BackEnd.Service.ProductService.Shoe.IShoeService;
import BackEnd.Service.ProductService.ShoeColorServices.IShoeColorService;
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
    private IColorRepository colorRepository;

    @Autowired
    @Lazy
    private IShoeService shoeService;

    @Autowired
    private IShoeColorService shoeColorService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<Color> getAllShoeColorNoPaging() {
        return colorRepository.findByStatus(true);
    }

    @Override
    public List<Color> getAllColorByShoeId(Short shoeId) {
        return colorRepository.findColorsByShoeId(shoeId);
    }

    @Override
    public Page<Color> getAllShoeColor(Pageable pageable, String search) {
        Specification<Color> specification = ColorSpecification.buildWhere(search);
        return colorRepository.findAll(specification, pageable);
    }

    @Override
    public Color getShoeColorById(Byte id) {
        return colorRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Color createShoeColor(ColorCreateForm form) {
        Color entity = modelMapper.map(form, Color.class);
        return colorRepository.save(entity);
    }

    @Override
    @Transactional
    public Color updateShoeColor(ColorUpdateForm form) {
        Color entity = modelMapper.map(form, Color.class);
        entity.setStatus(true);
        return colorRepository.save(entity);
    }

    @Override
    @Transactional
    public void deleteShoeColor(Byte shoeColorId) {
        Color target = getShoeColorById(shoeColorId);
        target.setStatus(false);
        shoeColorService.deleteShoeColorByColorId(target.getId());
        colorRepository.save(target);
    }
}
