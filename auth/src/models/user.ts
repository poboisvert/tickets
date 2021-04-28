import mongoose from 'mongoose';
import { Password } from '../services/password';

// This model ma not work with other Mongoose 11 is working
// Typescript
// Required field to create a user in MongoDB - What it takes to create a user
interface UserAttrs {
  email: string;
  password: string;
}

// Extend Existing Model to UserModel - add UserModel to Model - What the collection looks
// What a single user has properties
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc; // Add the build method for TScript to validate
}

// DB Schema for MongoDB
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Reconvert Mongo to a more general JSON - not really MVC approach
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password; // Delete the password in the return response
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
