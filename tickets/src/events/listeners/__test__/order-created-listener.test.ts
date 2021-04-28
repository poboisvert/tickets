import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { OrderCreatedEvent, OrderStatus } from '@bonnethood/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  // New listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create and save ticket
  const ticket = Ticket.build({
    title: 'test',
    price: 11,
    userId: 'asd',
  });
  // save ticket
  await ticket.save();

  // fake data to send
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'qqqq',
    expiresAt: 'aaaa',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it('set userId for a ticket', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg); // Comment to see the test crashing and confirm

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks messages', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg); // Comment to see the test crashing and confirm

  expect(msg.ack).toHaveBeenCalled();
});

it('publish ticket on updated event', async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg); // Comment to see the test crashing and confirm

  expect(natsWrapper.client.publish).toHaveBeenCalled();
  // console.log(natsWrapper.client.publish.mock.calls[0][1]);
  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(ticketUpdatedData.orderId);
});
