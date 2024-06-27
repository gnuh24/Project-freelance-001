package BackEnd.Controller.ImageController;

import BackEnd.Other.ImageService.ImageService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping(value = "/Image")
@CrossOrigin(origins = "*")
public class ImageController {

    @GetMapping(value = "/Brand/{logo}")
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




}

