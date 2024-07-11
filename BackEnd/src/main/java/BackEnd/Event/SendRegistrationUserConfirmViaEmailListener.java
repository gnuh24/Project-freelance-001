package BackEnd.Event;

import BackEnd.Service.AccountServices.EmailService.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
//Đây là class thực thi khi co 1 sự kiện OnSendRegistrationUserConfirmViaEmailEvent được  call
public class SendRegistrationUserConfirmViaEmailListener
    implements ApplicationListener<OnSendRegistrationUserConfirmViaEmailEvent> {

    @Autowired
    private IEmailService emailService;

    @Override
    /*
    - Phương thức được thực thi khi OnSendRegistrationUserConfirmViaEmailEvent được call

     */
    public void onApplicationEvent(OnSendRegistrationUserConfirmViaEmailEvent event) {
        emailService.sendRegistrationUserConfirm(event.getEmail());
    }

}


