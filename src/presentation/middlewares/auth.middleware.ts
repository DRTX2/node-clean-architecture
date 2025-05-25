import { Request, Response, NextFunction, RequestHandler } from "express";
import { JwtAdapter } from "../../config";
import { UserRepository } from "../../domain/repositories/user/user.repository";

type JwtPayload = {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
};

export class AuthMiddleware {
  static validateJWT(userRepo: UserRepository): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.header("Authorization");

      if (!authorization || !authorization.startsWith("Bearer ")) {
        res.status(400).json({ error: "Invalid or missing token" });
        return;
      }

      const token = authorization.split(" ")[1];

      try {
        const payload = await JwtAdapter.validateToken<JwtPayload>(token);

        if (!payload) {
          res.status(401).json({ error: "Invalid token" });
          return;
        }

        const user = await userRepo.findByEmail(payload.email);

        if (!user) {
          res.status(401).json({ error: "User not found" });
          return;
        }

        (req as any).user = user;
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Token validation failed" });
        return;
      }
    };
  }
}
