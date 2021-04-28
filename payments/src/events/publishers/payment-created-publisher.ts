import { Subjects, Publisher, PaymentCreatedEvent } from '@bonnethood/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
