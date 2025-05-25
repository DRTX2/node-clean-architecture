import { JwtAdapter, StringValue } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { UserToken } from "./register-user.use-case";

type SignToken=(payload: Record<string, any>, duration?: StringValue)=> Promise<string | null>;

interface LoginUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken:SignToken=JwtAdapter.generateToken,
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    //create user
    const user = await this.authRepository.login(loginUserDto);
    //token
    const token =await this.signToken({id:user.id},'2h');
    if(!token) throw CustomError.internalServerError("Error generating token");

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
