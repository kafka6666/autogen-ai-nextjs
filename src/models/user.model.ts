import { model, models, Schema } from "mongoose";

export interface IUser {
    email: string;
    name: string;
    image: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
});

const UserModel = models.User || model<IUser>("User", userSchema);

export default UserModel;