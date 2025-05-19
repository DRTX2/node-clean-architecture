import { Request, response, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    if (typeof error === "object" && error !== null && "message" in error) {
      return res.status(500).json({ error: (error as any).message });
    }

    // errors without a message
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUser = async (req: Request, res: Response): Promise<void> => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error || !registerUserDto) {
      res.status(400).json({ message: "Invalid input", error });
      return;
    }

    try {
      const user = await this.authRepository.register(registerUserDto);
      const token = await JwtAdapter.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      
      res.json({
        user,
        token,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  loginUser = (req: Request, res: Response) => {
    res.json("loginUser controller");
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const users = await UserModel.find();

      res.json({
        users,
        // user,
        token: user,
        // userInfoFromToken: req.user,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
