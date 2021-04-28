export enum OrderStatus {
  // Order created, but it's not 100% reserved
  Created = 'created',
  // Reserved but someone has been quicker to book it or cancelled by client or expired before complete the payment
  Cancelled = 'cancelled',
  // Order success reserved
  AwaitingPayment = 'awaiting:payment',
  // Reversed and paid with success
  Complete = 'complete',
}
