package BackEnd.Service.ProductService.Shoe;

import BackEnd.Entity.ProductInfomation.Brand;
import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Entity.ProductInfomation.ShoeType;
import BackEnd.Form.ProductForm.ShoeForm.ShoeCreateForm;
import BackEnd.Form.ProductForm.ShoeForm.ShoeFilterForm;
import BackEnd.Form.ProductForm.ShoeForm.ShoeUpdateForm;
import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageCreateForm;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import BackEnd.Repository.ProductRepository.ShoeRepository;
import BackEnd.Service.ProductService.Brand.IBrandService;
import BackEnd.Service.ProductService.ShoeImage.IShoeImageService;
import BackEnd.Service.ProductService.ShoeSize.IShoeSizeService;
import BackEnd.Service.ProductService.ShoeType.IShoeTypeService;
import BackEnd.Specification.ProductSpecification.ShoeSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
public class ShoeService implements IShoeService {

    @Autowired
    private ShoeRepository shoeRepository;

    @Autowired
    private IBrandService brandServicer;

    @Autowired
    private IShoeTypeService shoeTypeService;

    @Autowired
    private IShoeSizeService shoeSizeService;

    @Autowired
    private IShoeImageService shoeImageService;


    @Override
    public Page<Shoe> getAllShoe(Pageable pageable, String search, ShoeFilterForm form) {
        Specification<Shoe> where = ShoeSpecification.buildWhere(search, form);
        return shoeRepository.findAll(where, pageable);
    }

    @Override
    public Shoe getShoeByShoeId(Short shoeId) {
        return shoeRepository.findById(shoeId).get();
    }

    @Override
    @Transactional
    public Shoe createShoe(ShoeCreateForm form) throws IOException {

        Shoe entity = new Shoe();
        entity.setShoeName(form.getShoeName());
        entity.setColor(form.getColor());
        entity.setDescription(form.getDescription());
        entity.setPriority(form.getPriority());
        entity.setStatus(form.getStatus());

        Brand brand = brandServicer.getBrandById(form.getBrandId());
        entity.setBrand(brand);

        ShoeType shoeType = shoeTypeService.getShoeTypeById(form.getShoeTypeId());
        entity.setShoeType(shoeType);

        entity = shoeRepository.save(entity);


        for (ShoeSizeCreateForm shoeSizeCreateForm: form.getShoeSizes()) {
            shoeSizeService.createShoeSize(entity.getShoeId(), shoeSizeCreateForm);
        }

        for (ShoeImageCreateForm shoeImageCreateForm: form.getShoeImages()) {
            shoeImageService.createShoeImage(entity, shoeImageCreateForm);
        }

        return entity;
    }

    @Override
    public Shoe updateShoe(Short shoeId, ShoeUpdateForm form) {
        Shoe oldShoe = getShoeByShoeId(shoeId);

        if (form.getShoeName() != null) {
            oldShoe.setShoeName(form.getShoeName());
        }
        if (form.getColor() != null) {
            oldShoe.setColor(form.getColor());
        }
        if (form.getStatus() != null) {
            oldShoe.setStatus(form.getStatus());
        }
        if (form.getDescription() != null) {
            oldShoe.setDescription(form.getDescription());
        }
        if (form.getPriority() != null) {
            oldShoe.setPriority(form.getPriority());
        }
        if (form.getBrandId() != null) {
            Brand newBrand = brandServicer.getBrandById(form.getBrandId());
            oldShoe.setBrand(newBrand);
        }
        if (form.getShoeTypeId() != null) {
            Brand newBrand = brandServicer.getBrandById(form.getBrandId());
            oldShoe.setBrand(newBrand);
        }

        return shoeRepository.save(oldShoe);
    }


    @Override
    public List<Shoe> getShoeByBrand_BrandId(Byte brandId) {
        return shoeRepository.getShoeByBrand_BrandId(brandId);
    }

    @Override
    public List<Shoe> getShoeByShoeType_ShoeTypeId(Byte shoeTypeId) {
        return shoeRepository.getShoeByShoeType_ShoeTypeId(shoeTypeId);
    }


}
