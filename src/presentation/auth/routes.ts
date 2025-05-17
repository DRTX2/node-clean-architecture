import { Router } from "express";

import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource=new AuthDatasourceImpl();
    const authRepository=new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    // router.use('/api/users')
    // router.use('/api/products')
    // router.use('/api/clients')
    // router.use('/api/orders')
    return router;
  }
}
