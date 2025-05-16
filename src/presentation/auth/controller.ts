import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";

export class AuthController {
  // constructor(private readonly){

  // }

  registerUser = async (req: Request, res: Response): Promise<void> => {
    const [error, registerUserDto] = await RegisterUserDto.create(req.body);

    if (error) {
      res.status(400).json({ message: "Invalid input", error });
      return;
    }

    res.json(registerUserDto);
  };

  loginUser = (req: Request, res: Response) => {
    res.json("loginUser controller");
  };
}
