package BackEnd.Service.StatisticServices;

import BackEnd.Form.StatisticForms.BestSellerForm;
import BackEnd.Form.StatisticForms.BestSellerSizeForm;
import BackEnd.Form.StatisticForms.OrderStatusSummary;

import java.util.List;

public interface IStatisticService {
    List<BestSellerForm> getShoeSales(String minDate, String maxDate, Integer limit);
    List<BestSellerSizeForm> getShoeSizeSales(Integer shoeId, String minDate, String maxDate);

    List<OrderStatusSummary> getAllSummaryOrderStatus(String minDate, String maxDate);
}
