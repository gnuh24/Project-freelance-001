package BackEnd.Service.ProductService.Shoe;

import BackEnd.Entity.ProductEntity.Brand;
import BackEnd.Entity.ProductEntity.Color;
import BackEnd.Entity.ProductEntity.Shoe;
import BackEnd.Entity.ProductEntity.ShoeType;
import BackEnd.Form.ProductForm.ShoeForm.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

public interface IShoeService {

    Page<Shoe> getAllShoe(Pageable pageable, String search, ShoeFilterForm form);

    Shoe getShoeByShoeId(Short shoeId);

    List<Shoe> getShoeByEventId(Integer eventId);

//    List<Shoe> updateBrandOfShoes(ShoeUpdateBrandForm form);
//
//    List<Shoe> updateShoeTypeOfShoes(ShoeUpdateShoeTypeForm form);

    int updateDefaultBrandOfShoes(Byte brandId);

    int updateDefaultShoeTypeOfShoes(Byte shoeTypeId);

    Shoe updateShoe(Short shoeId, ShoeUpdateForm form);

    Shoe createShoe(ShoeCreateForm form) throws IOException;
}
