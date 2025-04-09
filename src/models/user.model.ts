import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
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

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
