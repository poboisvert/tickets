import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@bonnethood/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
