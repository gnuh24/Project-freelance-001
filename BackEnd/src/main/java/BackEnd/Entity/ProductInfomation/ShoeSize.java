package BackEnd.Entity.ProductInfomation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "ShoeSize")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoeSize {

    @EmbeddedId
    private ShoeSizeId id;

    @Column(name = "Price", nullable = false)
    private Integer price;

    @Column(name = "Quanlity", nullable = false)
    private Short quantity;

    @ManyToOne
    @MapsId("shoeId")
    @JoinColumn(name = "ShoeId", nullable = false)
    private Shoe shoe;


    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class ShoeSizeId implements Serializable {

        private Short shoeId;
        private Byte size;


//        // Override equals and hashCode
//        @Override
//        public boolean equals(Object o) {
//            if (this == o) return true;
//            if (o == null || getClass() != o.getClass()) return false;
//            ShoeSizeId that = (ShoeSizeId) o;
//            return Objects.equals(shoeId, that.shoeId) &&
//                Objects.equals(size, that.size);
//        }
//
//        @Override
//        public int hashCode() {
//            return Objects.hash(shoeId, size);
//        }
    }
}
