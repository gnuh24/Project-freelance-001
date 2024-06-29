package BackEnd.Service.ProductService.ShoeImage;

import BackEnd.Entity.ProductInfomation.Shoe;
import BackEnd.Entity.ProductInfomation.ShoeImage;
import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageCreateForm;
import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageUpdateForm;
import BackEnd.Other.ImageService.ImageService;
import BackEnd.Repository.ProductRepository.ShoeImageRepository;
import BackEnd.Service.ProductService.Shoe.IShoeService;
import BackEnd.Service.ProductService.ShoeImage.IShoeImageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ShoeImageService implements IShoeImageService {

    @Autowired
    private ShoeImageRepository shoeImageRepository;

    @Autowired
    @Lazy
    private IShoeService shoeService;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public ShoeImage getShoeImageByShoeIdAndPriority(Short shoeId, Boolean priority) {
        return shoeImageRepository.findByShoe_shoeIdAndPriority(shoeId, priority);
    }

    @Override
    public ShoeImage getShoeImageByShoeImageId(Short shoeImageId) {
        return shoeImageRepository.findByShoeImageId(shoeImageId);
    }


    @Override
    public List<ShoeImage> getShoeImageByShoeId(Short shoeId) {
        return shoeImageRepository.findByShoe_shoeId(shoeId);
    }

    @Override
    public ShoeImage createShoeImage(Shoe shoe, ShoeImageCreateForm form) throws IOException {
        ShoeImage entity = new ShoeImage();
        entity.setPriority(form.getPriority());
        entity.setPath(ImageService.saveImage(ImageService.shoeImagePath, form.getShoeImage()));
        entity.setShoe(shoe);
        return shoeImageRepository.save(entity);
    }

    @Override
    public ShoeImage createShoeImage(Short shoeId, ShoeImageCreateForm form) throws IOException {
        ShoeImage entity = new ShoeImage();
        entity.setPriority(form.getPriority());
        entity.setPath(ImageService.saveImage(ImageService.shoeImagePath, form.getShoeImage()));
        entity.setShoe(shoeService.getShoeByShoeId(shoeId));
        return shoeImageRepository.save(entity);
    }

    @Override
    public ShoeImage updateShoeImage(Short shoeImageId, ShoeImageUpdateForm form) throws IOException {
        ShoeImage entity = getShoeImageByShoeImageId(shoeImageId);
        entity.setPath(ImageService.saveImage(ImageService.shoeImagePath, form.getShoeImage()));
        return shoeImageRepository.save(entity);
    }
}
