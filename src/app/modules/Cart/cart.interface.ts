import { Types } from "mongoose";

export type TCart = {
    userEmail?: string;
    product: Types.ObjectId;
    quantity: number;
    price: number;
    isDeleted?: boolean
}
