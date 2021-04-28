import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';

it('fetch an order', async () => {
  // Create order
  const ticket = Ticket.build({
    title: 'A title',
    price: 11,
    id: mongoose.Types.ObjectId().toHexString(),
  });

  await ticket.save();

  // make a request to build an order with the ticket
  const user = global.signin();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it('fetch order of another user - response error', async () => {
  // Create order
  const ticket = Ticket.build({
    title: 'A title',
    price: 11,
    id: mongoose.Types.ObjectId().toHexString(),
  });

  await ticket.save();

  // make a request to build an order with the ticket
  const user = global.signin();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signin()) // new user fetch
    .send()
    .expect(401);
});