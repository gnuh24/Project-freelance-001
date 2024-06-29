package BackEnd.Controller.ProductController;

import BackEnd.Entity.ProductInfomation.Brand;
import BackEnd.Form.ProductForm.BrandForm.BrandCreateForm;
import BackEnd.Form.ProductForm.BrandForm.BrandDTO;
import BackEnd.Form.ProductForm.BrandForm.BrandUpdateForm;
import BackEnd.Other.ImageService.ImageService;
import BackEnd.Service.ProductService.Brand.IBrandService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping(value = "/Brand")
@CrossOrigin(origins = "*")
public class BrandController {

    @Autowired
    private IBrandService brandService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "/noPaging")
    public List<BrandDTO> getAllBrandNoPaging() {

        // Lấy dữ liệu từ Service
        List<Brand> list = brandService.getAllBrandNoPaging();

        // Dùng Model Mapper để chuyển từ list Brand -> list BrandDTO
        List<BrandDTO> listDTO = modelMapper.map(list, new TypeToken<List<BrandDTO>>() {
        }.getType());

        return listDTO;
    }

    @GetMapping()
    public Page<BrandDTO> getAllBrand(Pageable pageable,
            @RequestParam(name = "search", required = false) String search) {
        Page<Brand> entites = brandService.getAllBrand(pageable, search);
        List<BrandDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<BrandDTO>>() {
        }.getType());
        return new PageImpl<>(dtos, pageable, entites.getTotalElements());
    }

    @GetMapping(value = "/{BrandId}")
    public BrandDTO getBrandById(@PathVariable Byte BrandId) {
        Brand entity = brandService.getBrandById(BrandId);
        return modelMapper.map(entity, BrandDTO.class);
    }

    @GetMapping(value = "/Image/{logo}")
    public ResponseEntity<Resource> getBrandLogoByName(@PathVariable String logo) {
        try{
            Path imagePath = Paths.get(ImageService.brandLogoPath, logo);
            Resource resource = new UrlResource(imagePath.toUri());

            return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
        }

        catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping()
    public BrandDTO createBrand(@ModelAttribute BrandCreateForm form) throws IOException {
        Brand entity = brandService.createBrand(form);
        return modelMapper.map(entity, BrandDTO.class);
    }

    @PatchMapping()
    public BrandDTO updateBrand(@ModelAttribute BrandUpdateForm form) throws IOException {
        Brand entity = brandService.updateBrand(form);
        return modelMapper.map(entity, BrandDTO.class);
    }

    @DeleteMapping(value = "/{BrandId}")
    public void deleteBrand(@PathVariable Byte BrandId) {
        brandService.deleteBrand(BrandId);
    }

}
