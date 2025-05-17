import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError=(error:unknown, response:Response)=>{
    if(error instanceof CustomError){
      return response.status(error.statusCode).json({error:error.message});
    }

    console.log(error);
    return response.status(500).json({error:"Internal Server Error"})
  }

  registerUser = async (req: Request, res: Response): Promise<void> => {
    const [error, registerUserDto] = await RegisterUserDto.create(req.body);

    if (error) {
      res.status(400).json({ message: "Invalid input", error });
      return;
    }
    this.authRepository
      .register(registerUserDto!)
      .then((user) => res.json(registerUserDto))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    res.json("loginUser controller");
  };
}
