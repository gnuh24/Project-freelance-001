package BackEnd.Service.ProductService.Shoe;

import BackEnd.Entity.ProductEntity.Brand;
import BackEnd.Entity.ProductEntity.Shoe;
import BackEnd.Entity.ProductEntity.ShoeColor;
import BackEnd.Entity.ProductEntity.ShoeType;
import BackEnd.Form.ProductForm.ShoeForm.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

public interface IShoeService {

    // Retrieve operations
    Page<Shoe> getAllShoe(Pageable pageable, String search, ShoeFilterForm form);

    Shoe getShoeByShoeId(Short shoeId);

    List<Shoe> getShoeByEventId(Integer eventId);

    List<Shoe> getShoeByBrand_BrandId(Byte brandId);

    List<Shoe> getShoeByShoeType_ShoeTypeId(Byte shoeTypeId);

    List<Shoe> getShoeByShoeColor_ShoeColorId(Byte shoeColorId);

    // Update operations
    List<Shoe> updateBrandOfShoes(ShoeUpdateBrandForm form);

    List<Shoe> updateShoeTypeOfShoes(ShoeUpdateShoeTypeForm form);

    List<Shoe> updateShoeColorOfShoes(ShoeUpdateShoeColorForm form);

    Shoe updateShoe(Short shoeId, ShoeUpdateForm form);

    Shoe updateShoeTypeofShoe(Shoe shoe, ShoeType shoeType);

    Shoe updateBrandofShoe(Shoe shoe, Brand brand);

    Shoe updateShoeColorofShoe(Shoe shoe, ShoeColor shoeColor);

    // Create operation
    Shoe createShoe(ShoeCreateForm form) throws IOException;
}
