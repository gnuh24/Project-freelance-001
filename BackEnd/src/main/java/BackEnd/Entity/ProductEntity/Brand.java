package BackEnd.Entity.ProductEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Brand")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BrandId")
    private Byte brandId;

    @Column(name = "BrandName", nullable = false, length = 255)
    private String brandName;

    @Column(name = "Logo", nullable = false, length = 255)
    private String logo;

    @Column(name = "Status")
    private Boolean status;

    @PrePersist
    private void prePersist(){
        if (status == null){
            status = true;
        }
    }


}
