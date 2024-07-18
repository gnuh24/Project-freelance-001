package BackEnd.Entity.ProductEntity;

import BackEnd.Entity.ShoppingEntities.Sale;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "Shoe")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Shoe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ShoeId")
    private Short shoeId;

    @Column(name = "ShoeName", nullable = false, length = 255)
    private String shoeName;

    @Column(name = "Status", nullable = false)
    private Boolean status;

    @Column(name = "CreateDate", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "Priority", nullable = false)
    private Boolean priority;

    @Column(name = "Description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "BrandId", nullable = false)
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "ShoeTypeId", nullable = false)
    private ShoeType shoeType;

    @ManyToOne
    @JoinColumn(name = "ShoeColorId", nullable = false)
    private ShoeColor shoeColor;

    @OneToMany(mappedBy = "shoe")
    private List<ShoeSize> shoeSizes;

    @OneToMany(mappedBy = "shoe")
    private List<ShoeImage> shoeImages;

    @OneToMany(mappedBy = "shoe")
    private List<Sale> sales;

    @PrePersist
    private void prePersist(){
        if (createDate == null){
            createDate = LocalDateTime.now();
        }
    }

}
