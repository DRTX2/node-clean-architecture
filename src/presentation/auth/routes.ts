import { Router } from "express";

import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource=new AuthDatasourceImpl();
    const authRepository=new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get('/users', [AuthMiddleware.validateJWT], controller.getUsers);
    // router.use('/api/products')
    // router.use('/api/clients')
    // router.use('/api/orders')
    return router;
  }
}
