package BackEnd.Service.InventoryServices.InventoryReportServices;


import BackEnd.Entity.InventoryEntities.InventoryReport;
import BackEnd.Form.InventoryForms.InventoryReportDetailForms.InventoryReportDetailCreateForm;
import BackEnd.Form.InventoryForms.InventoryReportDetailForms.InventoryReportDetailCreateFormForFirstTime;
import BackEnd.Form.InventoryForms.InventoryReportForms.InventoryReportCreateForm;
import BackEnd.Form.InventoryForms.InventoryReportForms.InventoryReportFilterForm;
import BackEnd.Form.InventoryForms.InventoryReportForms.InventoryReportUpdateForm;
import BackEnd.Repository.InventoryRepositoties.IInventoryReportRepository;
import BackEnd.Service.InventoryServices.InventoryReportDetailServices.IInventoryReportDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import BackEnd.Specification.InventorySpecifications.InventoryReportSpecification;
@Service
public class InventoryReportService implements IInventoryReportService {

    @Autowired
    private IInventoryReportRepository inventoryReportRepository;

    @Autowired
    private IInventoryReportDetailService inventoryReportDetailService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public InventoryReport getInventoryReportById(Integer id) {
        return inventoryReportRepository.findById(id).orElse(null);
    }

    @Override
    public Page<InventoryReport> getAllInventoryReports(Pageable pageable, InventoryReportFilterForm filterForm, String search) {
        Specification<InventoryReport> where = InventoryReportSpecification.buildWhere(search, filterForm);
        return inventoryReportRepository.findAll(where, pageable);
    }

    @Override
    @Transactional
    public InventoryReport createInventoryReport(InventoryReportCreateForm form) {
        InventoryReport inventoryReport = modelMapper.map(form, InventoryReport.class);
        inventoryReport = inventoryReportRepository.save(inventoryReport);
        System.err.println("Trước khi tạo detail");
        for(InventoryReportDetailCreateFormForFirstTime detailForm: form.getInventoryReportDetailCreateFormList()){
            System.err.println("Shoe: " + detailForm.getIdShoeId());
            System.err.println("Size: " + detailForm.getIdSize());
            InventoryReportDetailCreateForm detailCreateForm = modelMapper.map(detailForm, InventoryReportDetailCreateForm.class);
            detailCreateForm.setIdInventoryReportId(inventoryReport.getId());

            System.err.println("Inventory: " + detailCreateForm.getIdInventoryReportId());
            System.err.println("Shoe: " + detailCreateForm.getIdShoeId());
            System.err.println("Size: " + detailCreateForm.getIdSize());
            System.err.println("___________________");
            inventoryReportDetailService.createInventoryReportDetail(detailCreateForm);
        }
        System.err.println("Sau khi tạo detail");

        return inventoryReport;
    }

    @Override
    @Transactional
    public InventoryReport updateInventoryReportById(InventoryReportUpdateForm form) {
        InventoryReport inventoryReport = getInventoryReportById(form.getId());

        if (form.getSupplier() != null){
            inventoryReport.setSupplier(form.getSupplier());
        }

        if (form.getSupplierPhone() != null){
            inventoryReport.setSupplierPhone(form.getSupplierPhone());
        }

        if (form.getTotalPrice() != null){
            inventoryReport.setTotalPrice(form.getTotalPrice());
        }

        return inventoryReportRepository.save(inventoryReport);

    }
}

