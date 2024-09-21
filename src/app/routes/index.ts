import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { ProductRoutes } from "../modules/Product/product.route";
import { CartRoutes } from "../modules/Cart/cart.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/products',
        route: ProductRoutes,
    },
    {
        path: '/carts',
        route: CartRoutes,
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;

