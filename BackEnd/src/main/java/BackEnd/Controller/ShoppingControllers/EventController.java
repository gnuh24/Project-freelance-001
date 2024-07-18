package BackEnd.Controller.ShoppingControllers;

import BackEnd.Entity.ShoppingEntities.Event;
import BackEnd.Form.ShoppingForms.EventForms.EventCreateForm;
import BackEnd.Form.ShoppingForms.EventForms.EventDTO;
import BackEnd.Form.ShoppingForms.EventForms.EventFilterForm;
import BackEnd.Form.ShoppingForms.EventForms.EventUpdateForm;
import BackEnd.Form.ShoppingForms.VoucherForms.VoucherDTO;
import BackEnd.Service.ShoppingServices.EventServices.IEventService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/Event")
public class EventController {

    @Autowired
    private IEventService eventService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "/Admin")
    public ResponseEntity<Page<EventDTO>> getAllEventByAdmin(Pageable pageable,
                                                             EventFilterForm form,
                                                             String search){
        Page<Event> entities =  eventService.getAllEvents(pageable, form, search);
        List<EventDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<EventDTO>>() {}.getType());
        Page<EventDTO> result = new PageImpl<>(dtos, pageable, entities.getTotalElements());
        return ResponseEntity.ok( result);
    }

    @GetMapping("/Current")
    public ResponseEntity<EventDTO> getCurrentEvent() {
        Event currentEvent = eventService.getCurrentEvent();
        if (currentEvent != null) {
            EventDTO eventDTO = modelMapper.map(currentEvent, EventDTO.class);
            return ResponseEntity.ok(eventDTO);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@ModelAttribute EventCreateForm form) throws Exception {
        if (form.getStatus() != null && form.getStatus()) {
            if (eventService.getCurrentEvent() == null){
                Event createdEvent = eventService.createEvent(form);
                EventDTO dto = modelMapper.map(createdEvent, EventDTO.class);
                return ResponseEntity.ok(dto);
            }else {
                throw new Exception("Bạn không thể tạo 1 event public khi đang có event diễn ra hệ thống !!");
            }
        }else{
            Event createdEvent = eventService.createEvent(form);
            EventDTO dto = modelMapper.map(createdEvent, EventDTO.class);
            return ResponseEntity.ok(dto);
        }
    }

    @PatchMapping()
    public ResponseEntity<EventDTO> updateEvent(@ModelAttribute EventUpdateForm form) throws Exception {

        if (form.getStatus() != null && form.getStatus()){
            if (eventService.getCurrentEvent() == null){
                Event updatedEvent = eventService.updateEvent(form);
                EventDTO dto = modelMapper.map(updatedEvent, EventDTO.class);
                return ResponseEntity.ok(dto);
            }else {
                throw new Exception("Bạn không thể public 1 event khác trong khi đang có event diễn ra hệ thống !!");
            }
        }else{
            Event updatedEvent = eventService.updateEvent(form);
            EventDTO dto = modelMapper.map(updatedEvent, EventDTO.class);
            return ResponseEntity.ok(dto);
        }


    }
}
