import QueryBuilder from "../../builder/QueryBuilder";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { productsSearchableFields } from "./product.constant";
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


const getAllProductsFromDB = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(
        Product.find({ isDeleted: { $ne: true } }),
        query,
    )
        .search(productsSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await productQuery.modelQuery;
    const meta = await productQuery.countTotal()
    return {
        meta,
        result
    };
};

const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findOne({ _id: id, isDeleted: { $ne: true } });

    return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {

    const result = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteProductFromDB = async (id: string) => {
    const result = await Product.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB
}