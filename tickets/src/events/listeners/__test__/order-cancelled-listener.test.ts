import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { OrderCancelledEvent } from '@bonnethood/common';

import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  // New listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  // Create orderID
  const orderId = mongoose.Types.ObjectId().toHexString();

  // Create and save ticket
  const ticket = Ticket.build({
    title: 'test',
    price: 22,
    userId: 'asd',
  });

  // add orderId
  ticket.set({ orderId });
  // save ticket
  await ticket.save();

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, ticket, orderId, listener };
};

it('Update, publish and acks MSG', async () => {
  const { listener, ticket, orderId, data, msg } = await setup();

  await listener.onMessage(data, msg);

  // Find
  const updatedTicket = await Ticket.findById(ticket.id);
  // Tests
  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
