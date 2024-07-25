package BackEnd.Entity.NewsEntities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "Feedback")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Content", nullable = false)
    private String content;

    @Column(name = "CreateTime", nullable = false)
    private LocalDateTime createTime;

    @Column(name = "IsChecked", nullable = false)
    private Boolean isChecked;


    @Column(name = "IsDeleted", nullable = false)
    private Boolean isDeleted;

    @Column(name = "OrderId", nullable = false)
    private String orderId;

    @PrePersist
    public void prePersist() {
        if (createTime == null) {
            createTime = LocalDateTime.now();
        }

        if (isDeleted == null) {
            isDeleted = false;
        }

        if (isChecked == null) {
            isChecked = false;
        }
    }
}

