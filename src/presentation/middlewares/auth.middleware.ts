import { Request, Response, NextFunction, RequestHandler } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

type JwtPayload = {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
};

export class AuthMiddleware {
  static validateJWT: RequestHandler = async (req, res, next) => {
    const authorization = req.header("Authorization");

    if (!authorization) {
      res.status(400).json({ error: "No token provided" });
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      res.status(400).json({ error: "Invalid Bearer token" });
      return;
    }

    const token = authorization.split(" ")[1] || "";

    try {
      const payload = await JwtAdapter.validateToken<JwtPayload>(token);

      if (!payload) {
        res.status(401).json({ error: "Invalid token" });
        return;
      }

      const user = await UserModel.findById(payload.id);

      if (!user) {
        res.status(401).json({ error: "Invalid token - user not found" });
        return;
      }

      (req as any).user = user;

      console.log("termino el middleware");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Invalid token" });
    }
  };
}
