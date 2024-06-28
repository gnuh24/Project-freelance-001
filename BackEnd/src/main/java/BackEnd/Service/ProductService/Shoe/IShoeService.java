package BackEnd.Service.ProductService.Shoe;

import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Form.ProductForm.ShoeForm.ShoeCreateForm;
import BackEnd.Form.ProductForm.ShoeForm.ShoeFilterForm;
import BackEnd.Form.ProductForm.ShoeForm.ShoeUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

public interface IShoeService {

    Page<Shoe> getAllShoeForAdmin(Pageable pageable, String search, ShoeFilterForm form);

    Shoe getShoeByShoeId(Short shoeId);

    Shoe createShoe(ShoeCreateForm form) throws IOException;

    Shoe updateShoe(Short shoeId, ShoeUpdateForm form);

    List<Shoe> getShoeByBrand_BrandId(Byte brandId);

    List<Shoe> getShoeByShoeType_ShoeTypeId(Byte shoeTypeId);

}
