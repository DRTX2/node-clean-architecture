import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes{
    static get routes():Router{
        const router=Router();
        const controller = new AuthController();
        
        router.post('/login',controller.loginUser)
        router.post('/register', controller.registerUser)
        // router.use('/api/users')
        // router.use('/api/products')
        // router.use('/api/clients')
        // router.use('/api/orders')
        return router;
    }
}