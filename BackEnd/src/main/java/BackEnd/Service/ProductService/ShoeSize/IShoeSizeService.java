package BackEnd.Service.ProductService.ShoeSize;

import BackEnd.Entity.ProductInfomation.ShoeSize;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;

import java.util.List;

public interface IShoeSizeService {
    List<ShoeSize> getAllShoeSizeByShoeId(Short shoeId);


    ShoeSize createShoeSize(Short shoeId, ShoeSizeCreateForm form);
}
