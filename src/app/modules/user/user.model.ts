import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})


userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );

    next();
})

userSchema.post('save', function (doc, next) {
    (doc as any).password = undefined
    next();
});


userSchema.statics.isUserExistsByEmailAddress = async function (email: string) {
    return await User.findOne({ email: email }).select('+password');
};


export const User = model<TUser, UserModel>("User", userSchema)