package BackEnd.Entity.ProductEntity;

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
public class ShoeSize implements Serializable{

    @EmbeddedId
    private ShoeSizeId id;

    @Column(name = "Price", nullable = false)
    private Integer price;

    @Column(name = "Quanlity", nullable = false)
    private Short quantity;

    @Column(name = "Status", nullable = false)
    private Boolean status;

    @ManyToOne
    @MapsId("ShoeId")
    @JoinColumn(name = "ShoeId",  referencedColumnName = "ShoeId")
    private Shoe shoe;

    @PrePersist
    private void prePersist(){
        if (quantity == null){
            quantity = 0;
        }

        if (status == null){
            status = true;
        }
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ShoeSizeId implements Serializable {


        @Column(name = "ShoeId", nullable = false)
        private Short shoeId;

        @Column(name = "Size", nullable = false)
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
