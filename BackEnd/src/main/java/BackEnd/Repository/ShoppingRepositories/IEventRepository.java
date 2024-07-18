package BackEnd.Repository.ShoppingRepositories;


import BackEnd.Entity.ShoppingEntities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

public interface IEventRepository extends JpaRepository<Event, Integer>, JpaSpecificationExecutor<Event> {
    @Query("SELECT e FROM Event e WHERE e.startTime <= :currentTime AND e.endTime >= :currentTime AND e.status = true")
    Event findCurrentEvent(LocalDateTime currentTime);
}

