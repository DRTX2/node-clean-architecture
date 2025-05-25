import jwt, { SignOptions } from "jsonwebtoken";
import { envs } from "./envs";

export type StringValue = `${number}${'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y'}`;

// Clave secreta fija
const JWT_SECRET = envs.JWT_SEED;

export class JwtAdapter {
  // Generar token
  static async generateToken(
    payload: Record<string, any>,
    duration: StringValue = "2h"
  ): Promise<string | null> {
    const options: SignOptions = {
      expiresIn: duration,
    };

    try {
      const token = jwt.sign(payload, JWT_SECRET, options);
      return token;
    } catch (error) {
      console.error("Error al generar token:", error);
      return null;
    }
  }

  // Validar token
  static async validateToken<T>(token: string): Promise<T | null> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as T;
      return decoded;
    } catch (error) {
      console.error("Token inválido:", error);
      return null;
    }
  }
}
