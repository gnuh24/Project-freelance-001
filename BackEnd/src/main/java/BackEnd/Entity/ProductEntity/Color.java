package BackEnd.Entity.ProductEntity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

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

    @OneToMany(mappedBy = "color")
    private List<ShoeColor> shoeColors;

    @PrePersist
    private void prePersist(){
        if (status == null){
            status = true;
        }
    }

}

