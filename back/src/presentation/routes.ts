import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes{
    static get routes():Router{
        const router=Router();
        router.use('/api/auth', AuthRoutes.routes)
        // router.use('/api/users')
        // router.use('/api/products')
        // router.use('/api/clients')
        // router.use('/api/orders')
        return router;
    }
}