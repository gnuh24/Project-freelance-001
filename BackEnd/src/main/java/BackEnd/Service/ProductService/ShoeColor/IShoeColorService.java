package BackEnd.Service.ProductService.ShoeColor;

import BackEnd.Entity.ProductInfomation.ShoeColor;
import BackEnd.Form.ProductForm.ShoeColorForm.ShoeColorCreateForm;
import BackEnd.Form.ProductForm.ShoeColorForm.ShoeColorUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IShoeColorService {
    List<ShoeColor> getAllShoeColorNoPaging();

    Page<ShoeColor> getAllShoeColor(Pageable pageable, String search);

    ShoeColor getShoeColorById(Byte id);

    ShoeColor createShoeColor(ShoeColorCreateForm form);

    ShoeColor updateShoeColor(ShoeColorUpdateForm form);

    void deleteShoeColor(Byte shoeColorId);
}
