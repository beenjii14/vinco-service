import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    firstName: String,
    lastName: String,
    email: String,
    avatar: { type: String, default: 'https://picsum.photos/200' },
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    active: { type: Boolean, default: true },
    createdAt: { type: Number, default: ~~(new Date().getTime() / 1e3) },
    updatedAt: { type: Number, default: ~~(new Date().getTime() / 1e3) },
  },
  { timestamps: false, _id: true, versionKey: false }
);

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.createdAt = new Date(returnedObject.createdAt * 1e3);
    returnedObject.updatedAt = new Date(returnedObject.updatedAt * 1e3);
    delete returnedObject.password;
  },
});

const User = model('User', UserSchema);
module.exports = User;
