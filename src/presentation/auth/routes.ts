import { Router } from "express";

export class AuthRoutes{
    static get routes():Router{
        const router=Router();
        router.post('/login', (req,res)=>{
            res.json("Login")
        })
        router.post('/register', (req,res)=>{
            res.json("Register")
        })
        // router.use('/api/users')
        // router.use('/api/products')
        // router.use('/api/clients')
        // router.use('/api/orders')
        return router;
    }
}