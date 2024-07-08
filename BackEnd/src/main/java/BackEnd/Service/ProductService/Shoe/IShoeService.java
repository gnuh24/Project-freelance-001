package BackEnd.Service.ProductService.Shoe;

import BackEnd.Entity.ProductInfomation.Brand;
import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Entity.ProductInfomation.ShoeColor;
import BackEnd.Entity.ProductInfomation.ShoeType;
import BackEnd.Form.ProductForm.ShoeForm.ShoeCreateForm;
import BackEnd.Form.ProductForm.ShoeForm.ShoeFilterForm;
import BackEnd.Form.ProductForm.ShoeForm.ShoeUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

public interface IShoeService {

    Page<Shoe> getAllShoe(Pageable pageable, String search, ShoeFilterForm form);

    Shoe getShoeByShoeId(Short shoeId);

    Shoe createShoe(ShoeCreateForm form) throws IOException;

    Shoe updateShoe(Short shoeId, ShoeUpdateForm form);

    Shoe updateShoeTypeofShoe(Shoe shoe, ShoeType shoeType);

    Shoe updateBrandofShoe(Shoe shoe, Brand brand);

    Shoe updateShoeColorofShoe(Shoe shoe, ShoeColor shoeColor);

    List<Shoe> getShoeByBrand_BrandId(Byte brandId);

    List<Shoe> getShoeByShoeType_ShoeTypeId(Byte shoeTypeId);

    List<Shoe> getShoeByShoeColor_ShoeColorId(Byte shoeColorId);

}
