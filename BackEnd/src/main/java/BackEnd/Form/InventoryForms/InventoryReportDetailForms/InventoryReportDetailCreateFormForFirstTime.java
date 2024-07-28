package BackEnd.Form.InventoryForms.InventoryReportDetailForms;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryReportDetailCreateFormForFirstTime {

    private Short idShoeId;

    private Byte idSize;

    private Integer quantity;

    private Integer unitPrice;

    private Integer total;
}
