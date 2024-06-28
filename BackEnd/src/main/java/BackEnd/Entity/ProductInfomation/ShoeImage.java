package BackEnd.Entity.ProductInfomation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ShoeImage")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoeImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ShoeImageId")
    private Short shoeImageId;

    @Column(name = "Path", nullable = false, length = 255)
    private String path;

    @Column(name = "Priority", nullable = false)
    private Boolean priority;

    @ManyToOne
    @JoinColumn(name = "ShoeId", nullable = false)
    private Shoe shoe;
}
