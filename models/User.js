import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    profilepic: { type: String },
    coverpic: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = models.User || model('User', UserSchema);

export { User };
