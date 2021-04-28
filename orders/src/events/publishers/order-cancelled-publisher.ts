import { Publisher, OrderCancelledEvent, Subjects } from '@bonnethood/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
