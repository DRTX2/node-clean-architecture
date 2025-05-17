import { Request, Response } from "express";
import { AuthRepository, RegisterUserDto } from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  registerUser = async (req: Request, res: Response): Promise<void> => {
    const [error, registerUserDto] = await RegisterUserDto.create(req.body);

    if (error) {
      res.status(400).json({ message: "Invalid input", error });
      return;
    }
    this.authRepository
      .register(registerUserDto!)
      .then((user) => res.json(registerUserDto))
      .catch((error) => res.status(500).json(error));
  };

  loginUser = (req: Request, res: Response) => {
    res.json("loginUser controller");
  };
}
