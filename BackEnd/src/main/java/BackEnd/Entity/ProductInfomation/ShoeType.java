package BackEnd.Entity.ProductInfomation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "ShoeType")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ShoeTypeId")
    private Byte shoeTypeId;

    @Column(name = "ShoeTypeName", nullable = false)
    private String shoeTypeName;

}