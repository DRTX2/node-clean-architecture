import { Request, response, Response } from "express";
import { AuthRepository, CustomError, LoginUser, RegisterUser, RegisterUserDto } from "../../domain";
import { UserModel } from "../../data/mongodb";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

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
      const registerUseCase=new RegisterUser(this.authRepository);
      const registerData=await registerUseCase.execute(registerUserDto);
      res.json(registerData);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const [error, loginUserDto]=LoginUserDto.create(req.body);

    if (error || !loginUserDto) {
      res.status(400).json({ message: "Invalid input", error });
      return;
    }

    try {
      const loginUseCase=new LoginUser(this.authRepository);
      const loginData=await loginUseCase.execute(loginUserDto);
      res.json(loginData);
    } catch (error) {
      this.handleError(error, res);
    }

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
