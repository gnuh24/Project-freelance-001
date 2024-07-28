package BackEnd.Controller.StatisticControllers;

import BackEnd.Form.StatisticForms.BestSellerForm;
import BackEnd.Service.StatisticServices.IStatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/Statistic")
@CrossOrigin(origins = "*")
public class StatisticController {

    @Autowired
    private IStatisticService statisticService;

    @GetMapping
    public List<BestSellerForm> getBestSeller(@RequestParam(required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") Date minDate,
                                              @RequestParam(required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") Date maxDate){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String minDateString = minDate != null ? sdf.format(minDate) : null;
        String maxDateString = maxDate != null ? sdf.format(maxDate) : null;

        return statisticService.getShoeSales(minDateString, maxDateString);
    }
}
