package BackEnd.Service.ProductService.ShoeSize;

import BackEnd.Entity.ProductEntity.ShoeSize;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeCreateForm;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeUpdateForm;

import java.util.List;

public interface IShoeSizeService {
    List<ShoeSize> getAllShoeSizeByShoeId(Short shoeId);

    List<ShoeSize> getAllShoeSizeByShoeIdAndStatus(Short shoeId, Boolean status);

    Byte getNumberOfSize(Short shoeId);

    Integer getTheLowestPrice(Short shoeId);

    List<Byte> getTop3SizeOfShoe(Short shoeId);

    ShoeSize getShoeSizeById(Short shoeId, Byte size);

    ShoeSize createShoeSize(Short shoeId, ShoeSizeCreateForm form);

    ShoeSize updateShoeSize(ShoeSizeUpdateForm form);

}
