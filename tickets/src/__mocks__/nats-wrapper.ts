export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
          // Records the calls and arguments
        }
      ),
  },
};

// Fix NATS TEST ERROR - Fake natsWrapper to avoid error
