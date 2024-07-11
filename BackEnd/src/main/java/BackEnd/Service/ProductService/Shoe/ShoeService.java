package BackEnd.Service.ProductService.Shoe;

import BackEnd.Entity.ProductEntity.Brand;
import BackEnd.Entity.ProductEntity.Shoe;
import BackEnd.Entity.ProductEntity.ShoeColor;
import BackEnd.Entity.ProductEntity.ShoeType;
import BackEnd.Form.ProductForm.ShoeForm.*;
import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageCreateForm;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import BackEnd.Repository.ProductRepository.IShoeRepository;
import BackEnd.Service.ProductService.Brand.IBrandService;
import BackEnd.Service.ProductService.ShoeColor.IShoeColorService;
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
    private IShoeRepository IShoeRepository;

    @Autowired
    private IBrandService brandService;

    @Autowired
    private IShoeColorService shoeColorService;

    @Autowired
    private IShoeTypeService shoeTypeService;

    @Autowired
    private IShoeSizeService shoeSizeService;

    @Autowired
    private IShoeImageService shoeImageService;


    @Override
    public Page<Shoe> getAllShoe(Pageable pageable, String search, ShoeFilterForm form) {
        Specification<Shoe> where = ShoeSpecification.buildWhere(search, form);
        return IShoeRepository.findAll(where, pageable);
    }

    @Override
    public Shoe getShoeByShoeId(Short shoeId) {
        return IShoeRepository.findById(shoeId).get();
    }

    public List<Shoe> getAllShoeByListId(List<Short> listId) {
        return IShoeRepository.findAllById(listId);
    }

    @Override
    @Transactional
    public Shoe createShoe(ShoeCreateForm form) throws IOException {

        Shoe entity = new Shoe();
        entity.setShoeName(form.getShoeName());
        entity.setDescription(form.getDescription());
        entity.setPriority(form.getPriority());
        entity.setStatus(form.getStatus());

        ShoeColor color = shoeColorService.getShoeColorById(form.getShoeColorId());
        entity.setShoeColor(color);

        Brand brand = brandService.getBrandById(form.getBrandId());
        entity.setBrand(brand);

        ShoeType shoeType = shoeTypeService.getShoeTypeById(form.getShoeTypeId());
        entity.setShoeType(shoeType);

        entity = IShoeRepository.save(entity);


        for (ShoeSizeCreateForm shoeSizeCreateForm: form.getShoeSizes()) {
            shoeSizeService.createShoeSize(entity.getShoeId(), shoeSizeCreateForm);
        }

        for (ShoeImageCreateForm shoeImageCreateForm: form.getShoeImages()) {
            shoeImageService.createShoeImage(entity, shoeImageCreateForm);
        }

        return entity;
    }

    @Override
    @Transactional
    public Shoe updateShoe(Short shoeId, ShoeUpdateForm form) {
        Shoe oldShoe = getShoeByShoeId(shoeId);

        if (form.getShoeName() != null) {
            oldShoe.setShoeName(form.getShoeName());
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
        if (form.getShoeColorId() != null) {
            ShoeColor newColor = shoeColorService.getShoeColorById(form.getShoeColorId());
            oldShoe.setShoeColor(newColor);
        }
        if (form.getBrandId() != null) {
            Brand newBrand = brandService.getBrandById(form.getBrandId());
            oldShoe.setBrand(newBrand);
        }
        if (form.getShoeTypeId() != null) {
            ShoeType shoeType = shoeTypeService.getShoeTypeById(form.getShoeTypeId());
            oldShoe.setShoeType(shoeType);
        }
        return IShoeRepository.save(oldShoe);
    }

    @Override
    @Transactional
    public Shoe updateShoeTypeofShoe(Shoe shoe, ShoeType shoeType){
        shoe.setShoeType(shoeType);
        return IShoeRepository.save( shoe );
    }

    @Override
    @Transactional
    public List<Shoe> updateBrandOfShoes(ShoeUpdateBrandForm form){

        List<Shoe> shoes = getAllShoeByListId(form.getShoesId());

        Brand newBrand = brandService.getBrandById(form.getBrandId());

        for (Shoe shoe: shoes){
            shoe.setBrand(newBrand);
        }

        return IShoeRepository.saveAll(shoes);
    }

    @Override
    @Transactional
    public List<Shoe> updateShoeTypeOfShoes(ShoeUpdateShoeTypeForm form) {
        List<Shoe> shoes = getAllShoeByListId(form.getShoesId());

        ShoeType newShoeType = shoeTypeService.getShoeTypeById(form.getShoeTypeId());

        for (Shoe shoe: shoes){
            shoe.setShoeType(newShoeType);
        }

        return IShoeRepository.saveAll(shoes);
    }

    @Override
    @Transactional
    public List<Shoe> updateShoeColorOfShoes(ShoeUpdateShoeColorForm form) {
        List<Shoe> shoes = getAllShoeByListId(form.getShoesId());

        ShoeColor newShoeColor = shoeColorService.getShoeColorById(form.getShoeColorId());

        for (Shoe shoe: shoes){
            shoe.setShoeColor(newShoeColor);
        }

        return IShoeRepository.saveAll(shoes);
    }

    @Override
    @Transactional
    public Shoe updateBrandofShoe(Shoe shoe, Brand brand){
        shoe.setBrand(brand);
        return IShoeRepository.save( shoe);
    }

    @Override
    @Transactional
    public Shoe updateShoeColorofShoe(Shoe shoe, ShoeColor shoeColor){
        shoe.setShoeColor(shoeColor);
        return IShoeRepository.save(shoe);
    }

    @Override
    public List<Shoe> getShoeByBrand_BrandId(Byte brandId) {
        return IShoeRepository.getShoeByBrand_BrandId(brandId);
    }

    @Override
    public List<Shoe> getShoeByShoeType_ShoeTypeId(Byte shoeTypeId) {
        return IShoeRepository.getShoeByShoeType_ShoeTypeId(shoeTypeId);
    }

    @Override
    public List<Shoe> getShoeByShoeColor_ShoeColorId(Byte shoeColorId) {
        return IShoeRepository.getShoeByShoeColor_ShoeColorId(shoeColorId);
    }


}
