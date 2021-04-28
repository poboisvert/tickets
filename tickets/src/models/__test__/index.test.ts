import { Ticket } from "../ticket";

it("Optimistic concurrency control", async (done) => {
  // Create ticket
  const ticket = Ticket.build({
    title: "test1",
    price: 11,
    userId: "123",
  });

  // Save info
  await ticket.save();

  // Fetch 2x ticket
  const oneTry = await Ticket.findById(ticket.id);
  const twoTry = await Ticket.findById(ticket.id);

  // Change ticket
  oneTry!.set({ price: 999 });
  twoTry!.set({ price: 666 });

  // Save first ticket
  await oneTry!.save();

  //save second ticket
  try {
    //    await twoTry!.save();
    await twoTry!.save();
  } catch (err) {
    return done();
  }
  throw new Error("Something went wrong!");
});

it("check version and increment to avoid mismatch with NATS", async () => {
  // Create ticket
  const ticket = Ticket.build({
    title: "test1",
    price: 11,
    userId: "123",
  });
  // Save first ticket
  await ticket.save();

  // Version shoudl be 0
  expect(ticket.version).toEqual(0);

  // Save another ticket
  await ticket.save();

  // Version shoudl be 1
  expect(ticket.version).toEqual(1);

  // Save another ticket
  await ticket.save();

  // Version shoudl be 2
  expect(ticket.version).toEqual(2);
});
