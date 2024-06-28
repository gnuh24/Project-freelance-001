package BackEnd.Service.ProductService.ShoeImage;


import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Entity.ProductInfomation.ShoeImage;
import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageCreateForm;

import java.io.IOException;
import java.util.List;

public interface IShoeImageService {

    ShoeImage getShoeImageByShoeIdAndPriority(Short shoeId, Boolean priority);

    List<ShoeImage> getShoeImageByShoeId(Short shoeId);

    ShoeImage createShoeImage(Shoe shoe, ShoeImageCreateForm form) throws IOException;

}
