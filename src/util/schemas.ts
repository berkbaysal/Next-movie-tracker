import mongoose, { model, Schema } from 'mongoose';
import { IUser } from "./interfaces"

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true }
});
export const User = mongoose.models.User ? model<IUser>('User') : model<IUser>('User', UserSchema);


