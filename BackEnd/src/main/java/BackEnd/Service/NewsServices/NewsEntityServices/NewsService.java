package BackEnd.Service.NewsServices.NewsEntityServices;

import BackEnd.Entity.AccountEntity.Account;
import BackEnd.Entity.NewsEntities.News;
import BackEnd.Form.NewsForms.NewsEntityForms.NewsCreateForm;
import BackEnd.Form.NewsForms.NewsEntityForms.NewsFilterForm;
import BackEnd.Form.NewsForms.NewsEntityForms.NewsUpdateForm;
import BackEnd.Form.NewsForms.NewsImageEntityForms.NewsImageDeleteForm;
import BackEnd.Other.ImageService.ImageService;
import BackEnd.Repository.NewsRepositories.INewsRepository;
import BackEnd.Service.AccountServices.AccountService.IAccountService;
import BackEnd.Service.NewsServices.NewsImageServices.INewsImageService;
import BackEnd.Specification.NewsSpecifications.NewsSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class NewsService implements INewsService {

    @Autowired
    private INewsRepository newsRepository;

    @Autowired
    private INewsImageService newsImageService;

    @Autowired
    @Lazy
    private IAccountService accountService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public News getNewsById(Integer newsId) {
        return newsRepository.findById(newsId).orElse(null);
    }

    @Override
    public List<News> getAllPrioritialNews() {
        return newsRepository.findByPriorityFlag(true);
    }

    @Override
    public Page<News> getAllNewsByUser(Pageable pageable) {
        NewsFilterForm form = new NewsFilterForm();
        form.setStatus(true);
        Specification<News> where = NewsSpecification.buildWhere("", form);
        return newsRepository.findAll(where, pageable);
    }

    @Override
    public Page<News> getAllNewsByAdmin(Pageable pageable, NewsFilterForm form, String search) {
        Specification<News> where = NewsSpecification.buildWhere(search, form);
        return newsRepository.findAll(where, pageable);
    }

    @Override
    @Transactional
    public News createNews(NewsCreateForm form) throws IOException {

        // Create and set fields for the News entity
        News news = new News();
        news.setTitle(form.getTitle());

        // Save the banner image and set its path
        String bannerPath = ImageService.saveImage(ImageService.newsImagePath, form.getBanner());
        news.setBanner(bannerPath);

        // Set other fields
        news.setContent(form.getContent());
        news.setStatus(form.getStatus() != null ? form.getStatus() : false);
        news.setAuthorId(form.getAuthorId());

        // Retrieve and set the account
        Account account = accountService.getAccountById(form.getAuthorId());
        news.setAccount(account);

        // Save the initial News entity
        news = newsRepository.save(news);

        // Initialize StringBuilder for efficient string concatenation
        StringBuilder finalContentBuilder = new StringBuilder();

        // Split the content by <img src=" to handle image paths
        String[] split = news.getContent().split("<img src=\"");

        // Append the initial content part before any image tags
        finalContentBuilder.append(split[0]);

        // Iterate through the images and build the final content
        for (int i = 0; i < form.getNewsImageList().size(); i++) {
            // Generate the image path and URL
            MultipartFile file = form.getNewsImageList().get(i);
            String imagePath = newsImageService.createNewsImage(news, file).getPath();
            finalContentBuilder.append("<img src='http://localhost:8080/NewsImage/").append(imagePath).append("'");

            // Append the remaining content after the current image URL
            if (i < split.length - 1) {
                finalContentBuilder.append(split[i + 1]);
            }
        }

        // Append any remaining content from the split array
        if (split.length > form.getNewsImageList().size()) {
            finalContentBuilder.append(split[split.length - 1]);
        }

        // Update the content of the news entity
        news.setContent(finalContentBuilder.toString());

        // Save and return the updated news entity
        return newsRepository.save(news);
    }


    @Override
    @Transactional
    public News updateNews(NewsUpdateForm form) throws IOException {
        News news = getNewsById(form.getId());
        if (news != null) {
            if (form.getTitle() != null) {
                news.setTitle(form.getTitle());
            }
            if (form.getContent() != null) {
                news.setContent(form.getContent());
            }
            if (form.getBanner() != null) {
                ImageService.deleteImage(ImageService.newsImagePath, news.getBanner());
                String newBanner = ImageService.saveImage(ImageService.newsImagePath, form.getBanner());
                news.setBanner(newBanner);
            }
            if (form.getStatus() != null) {
                news.setStatus(form.getStatus());
            }
            if (form.getPriorityFlag() != null) {
                news.setPriorityFlag(form.getPriorityFlag());
            }
            return newsRepository.save(news);
        }
        return null;
    }
}
