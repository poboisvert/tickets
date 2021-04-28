import { Publisher, OrderCreatedEvent, Subjects } from '@bonnethood/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
