package BackEnd.Entity.ProductEntity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Color")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Byte id;

    @Column(name = "colorName", nullable = false)
    private String colorName;

    @Column(name = "Status", nullable = false)
    private Boolean status;

    @PrePersist
    private void prePersist(){
        if (status == null){
            status = true;
        }
    }

}

