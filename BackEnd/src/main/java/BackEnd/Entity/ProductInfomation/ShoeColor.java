package BackEnd.Entity.ProductInfomation;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "ShoeColor")
public class ShoeColor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ShoeColorId")

    private Byte shoeColorId;

    @Column(name = "shoeColorName", nullable = false)
    private String shoeColorName;

    @Column(name = "Status", nullable = false)
    private Boolean status;

    @PrePersist
    private void prePersist(){
        if (status == null){
            status = true;
        }
    }

}

