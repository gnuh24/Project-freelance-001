package BackEnd.Service.ProductService.ShoeSize;

import BackEnd.Entity.ProductInfomation.ShoeSize;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeUpdateForm;

import java.util.List;

public interface IShoeSizeService {
    List<ShoeSize> getAllShoeSizeByShoeId(Short shoeId);


    ShoeSize createShoeSize(Short shoeId, ShoeSizeCreateForm form);

    ShoeSize getShoeSizeById(Short shoeId, Byte size);

    ShoeSize updateShoeSize(Short shoeId, Byte size, ShoeSizeUpdateForm form);

}
