package BackEnd.Service.StatisticServices;

import BackEnd.Form.StatisticForms.BestSellerForm;

import java.util.List;

public interface IStatisticService {
    List<BestSellerForm> getShoeSales(String minDate, String maxDate);

}
