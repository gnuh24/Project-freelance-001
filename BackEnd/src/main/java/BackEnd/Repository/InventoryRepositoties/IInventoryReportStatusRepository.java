package BackEnd.Repository.InventoryRepositoties;

import BackEnd.Entity.InventoryEntities.InventoryReportStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IInventoryReportStatusRepository extends JpaRepository<InventoryReportStatus, InventoryReportStatus.InventoryReportStatusId> {
}
