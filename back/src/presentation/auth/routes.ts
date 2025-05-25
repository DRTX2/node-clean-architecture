import { Router } from "express";
import { UserRepositoryFactory } from "../../infrastructure/repositories/user";
import { AuthUseCase } from "../../domain";
import { AuthController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    // Obtiene el repositorio correcto según configuración (MySQL o Mongo)
    const userRepository = UserRepositoryFactory.create();

    // Instancia del caso de uso de autenticación
    const authUseCase = new AuthUseCase(userRepository);

    // Controlador principal
    const controller = new AuthController(authUseCase);

    // Rutas HTTP
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/users", [AuthMiddleware.validateJWT(userRepository)], controller.getUsers);

    return router;
  }
}
