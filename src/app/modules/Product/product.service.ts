import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";


const createProductIntoDB = async (file: any, payload: TProduct) => {
    if (file) {
        const imageFileName = `${payload?.title}-${payload?.brand}`
        const path = file?.path

        //send Image to Cloudinnary
        const { secure_url } = await sendImageToCloudinary(imageFileName, path);
        payload.image = secure_url as string
    }

    const result = await Product.create(payload);
    return result;
}

export const ProductServices = {
    createProductIntoDB
}