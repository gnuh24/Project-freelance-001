package BackEnd.Form.StatisticForms;

import java.time.LocalDate;

public interface OrderStatusSummary {
    String getStatus();
    Long getQuantity();
    LocalDate getUpdateDate();
}

