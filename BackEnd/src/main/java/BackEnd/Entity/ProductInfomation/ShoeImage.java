package BackEnd.Entity.ProductInfomation;

import jakarta.persistence.*;

@Entity
@Table(name = "ShoeImage")
public class ShoeImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ShoeImageId")
    private Short shoeImageId;

    @Column(name = "Path", nullable = false, length = 255)
    private String path;

    @Column(name = "Priority", nullable = false)
    private Integer priority;

    @ManyToOne
    @JoinColumn(name = "ShoeId", nullable = false)
    private Shoe shoe;
}
