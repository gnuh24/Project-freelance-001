package BackEnd.Controller.ProductController;

import BackEnd.Entity.ProductEntity.Shoe;
import BackEnd.Entity.ProductEntity.ShoeImage;
import BackEnd.Entity.ProductEntity.ShoeSize;
import BackEnd.Form.ProductForm.ShoeForm.*;
import BackEnd.Form.ProductForm.ShoeImageForm.ShoeImageDTO;
import BackEnd.Form.ProductForm.ShoeSizeForm.ShoeSizeDTO;
import BackEnd.Service.ProductService.ShoeImage.IShoeImageService;
import BackEnd.Service.ProductService.Shoe.IShoeService;
import BackEnd.Service.ProductService.ShoeSize.IShoeSizeService;
import jakarta.annotation.PostConstruct;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/Shoe")
@CrossOrigin(origins = "*")
public class ShoeController {

    @Autowired
    private IShoeService shoeService;

    @Autowired
    private IShoeImageService shoeImageService;

    @Autowired
    private IShoeSizeService shoeSizeService;

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping(value = "/Admin")
    // API Sử dụng cho chức năng QL Tài khoản (Admin - Xem dưới dạng danh sách)
    public Page<ShoeDTOListAdmin> getAllShoeForAdmin(Pageable pageable,
                                                     @RequestParam(name = "search", required = false) String search,
                                                     ShoeFilterForm form) {
        // Lấy từ Database
        Page<Shoe> entites = shoeService.getAllShoe(pageable, search, form);

        // Chuyển sang List DTO
        List<ShoeDTOListAdmin> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<ShoeDTOListAdmin>>() {
        }.getType());


        // Tìm kiếm avatar cho mỗi Shoe
        for (ShoeDTOListAdmin dto : dtos) {
            dto.setDefaultImage(shoeImageService.getShoeImageByShoeIdAndPriority(dto.getShoeId(), true).getPath());
        }

        // Trả về FrontEnd với định dạng Page (Tích họp Sort, Paging)
        return new PageImpl<>(dtos, pageable, entites.getTotalElements());
    }

    @GetMapping(value = "/Admin/{shoeId}")
    // API Sử dụng cho chức năng QL Tài khoản (Admin - Xem chi tiết 1 sản phẩm)
    public ShoeDTODetailAdmin getShoeInDetailForAdmin(@PathVariable Short shoeId) {
        // 1. Lấy từ Database
        Shoe entity = shoeService.getShoeByShoeId(shoeId);

        // 2. Chuyển sang DTO
        ShoeDTODetailAdmin dtos = modelMapper.map(entity, ShoeDTODetailAdmin.class);

        // 3. Tìm kiếm ảnh cho mỗi Shoe

        // 3.1 Lay ảnh từ Database dựa vào ShoeId
        List<ShoeImage> listImage = shoeImageService.getShoeImageByShoeId(shoeId);

        // 3.2 Quy đổi các đối tượng của ảnh trên thành List DTO (Dùng ModelMapper)
        List<ShoeImageDTO> listImageDTO = modelMapper.map(listImage, new TypeToken<List<ShoeImageDTO>>() {
        }.getType());

        // 3.3 Set cho dtos list ảnh vừa quy đổi
        dtos.setShoeImages(listImageDTO);

        // 4. Tìm kiếm thông tin các size giày liên quan

        // 4.1 Lấy size giày từ Database dựa vào ShoeId
        List<ShoeSize> listSize = shoeSizeService.getAllShoeSizeByShoeId(shoeId);

        // 4.2 Quy đổi các đối tượng của ảnh trên thành List DTO (Dùng ModelMapper)
        List<ShoeSizeDTO> listSizeDTO = modelMapper.map(listSize, new TypeToken<List<ShoeSizeDTO>>() {
        }.getType());

        // 4.3 Set cho dtos list size vừa quy đổi
        dtos.setShoeSizes(listSizeDTO);

        // 5. Trả về FrontEnd với định dạng Page (Tích họp Sort, Paging)
        return dtos;
    }

    @GetMapping(value = "/CommonUser")
    // API Sử dụng cho chức năng Xem các sản phẩm bầy bán (User - Xem dưới dạng danh
    // sách)
    public Page<ShoeDTOListUser> getAllShoeForUser(Pageable pageable,
            @RequestParam(name = "search", required = false) String search,
            ShoeFilterForm form) {
        // Lấy từ Database
        Page<Shoe> entites = shoeService.getAllShoe(pageable, search, form);
        // Chuyển sang List DTO
        List<ShoeDTOListUser> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<ShoeDTOListUser>>() {
        }.getType());

        // Tìm kiếm avatar cho mỗi Shoe
        for (ShoeDTOListUser dto : dtos) {

            dto.setDefaultImage(shoeImageService.getShoeImageByShoeIdAndPriority(dto.getShoeId(), true).getPath());

            // Đếm số lượng size giày
            dto.setNumberOfShoeSize(shoeSizeService.getNumberOfSize(dto.getShoeId()));

            // Giá thấp nhất cho mỗi đôi
            dto.setLowestPrice(shoeSizeService.getTheLowestPrice(dto.getShoeId()));

            // Lấy 3 size lớn nhất (Trạng thái public)
            dto.setTop3Size(shoeSizeService.getTop3SizeOfShoe(dto.getShoeId()));
        }

        // Trả về FrontEnd với định dạng Page (Tích họp Sort, Paging)
        return new PageImpl<>(dtos, pageable, entites.getTotalElements());
    }

    @GetMapping(value = "/CommonUser/{shoeId}")
    // API Sử dụng cho chức năng QL Tài khoản (Admin - Xem chi tiết 1 sản phẩm)
    public ShoeDTODetailUser getShoeInDetailForUser(@PathVariable Short shoeId) {

        // 1. Lấy từ Database
        Shoe entity = shoeService.getShoeByShoeId(shoeId);

        // 2. Chuyển sang DTO
        ShoeDTODetailUser dtos = modelMapper.map(entity, ShoeDTODetailUser.class);

        // 3. Tìm kiếm ảnh cho mỗi Shoe

        // 3.1 Lay ảnh từ Database dựa vào ShoeId
        List<ShoeImage> listImage = shoeImageService.getShoeImageByShoeId(shoeId);

        // 3.2 Quy đổi các đối tượng của ảnh trên thành List DTO (Dùng ModelMapper)
        List<ShoeImageDTO> listImageDTO = modelMapper.map(listImage, new TypeToken<List<ShoeImageDTO>>() {
        }.getType());

        // 3.3 Set cho dtos list ảnh vừa quy đổi
        dtos.setShoeImages(listImageDTO);

        // 4. Tìm kiếm thông tin các size giày liên quan

        // 4.1 Lấy size giày từ Database dựa vào ShoeId
        List<ShoeSize> listSize = shoeSizeService.getAllShoeSizeByShoeIdAndStatus(shoeId, true);

        // 4.2 Quy đổi các đối tượng của ảnh trên thành List DTO (Dùng ModelMapper)
        List<ShoeSizeDTO> listSizeDTO = modelMapper.map(listSize, new TypeToken<List<ShoeSizeDTO>>() {
        }.getType());

        // 4.3 Set cho dtos list size vừa quy đổi
        dtos.setShoeSizes(listSizeDTO);

        // 5. Trả về FrontEnd với định dạng Page (Tích họp Sort, Paging)
        return dtos;

    }

    @PostMapping()
    public ShoeDTOListAdmin createShoe(@ModelAttribute ShoeCreateForm form) throws IOException {
        Shoe entity = shoeService.createShoe(form);
        ShoeDTOListAdmin newEntity = modelMapper.map(entity, ShoeDTOListAdmin.class);
        ShoeImage avatar = shoeImageService.getShoeImageByShoeIdAndPriority(entity.getShoeId(), true);
        newEntity.setDefaultImage(avatar.getPath());
        return newEntity;
    }

    @PatchMapping()
    public ShoeDTOListAdmin updateShoe(@ModelAttribute ShoeUpdateForm form) {
        Shoe entity = shoeService.updateShoe(form.getShoeId(), form);
        ShoeDTOListAdmin newEntity = modelMapper.map(entity, ShoeDTOListAdmin.class);
        ShoeImage avatar = shoeImageService.getShoeImageByShoeIdAndPriority(entity.getShoeId(), true);
        newEntity.setDefaultImage(avatar.getPath());
        return newEntity;
    }

    @PatchMapping(value = "/UpdateBrand")
    public List<ShoeDTOListAdmin> updateBrandOfShoes(@ModelAttribute ShoeUpdateBrandForm form){

        List<Shoe> entites = shoeService.updateBrandOfShoes(form);
        return modelMapper.map(entites, new TypeToken<List<ShoeDTOListAdmin>>() {
        }.getType());
    }

    @PatchMapping(value = "/UpdateShoeType")
    public List<ShoeDTOListAdmin> updateShoeTypeOfShoes(@ModelAttribute ShoeUpdateShoeTypeForm form){
        List<Shoe> entites = shoeService.updateShoeTypeOfShoes(form);
        return modelMapper.map(entites, new TypeToken<List<ShoeDTOListAdmin>>() {
        }.getType());
    }

    @PatchMapping(value = "/UpdateShoeColor")
    public List<ShoeDTOListAdmin> updateShoeColorOfShoes(@ModelAttribute ShoeUpdateShoeColorForm form){
        List<Shoe> entites = shoeService.updateShoeColorOfShoes(form);
        return modelMapper.map(entites, new TypeToken<List<ShoeDTOListAdmin>>() {
        }.getType());
    }

}
