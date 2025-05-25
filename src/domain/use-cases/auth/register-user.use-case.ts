import { JwtAdapter, StringValue } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

export interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export type SignToken=(payload: Record<string, any>, duration?: StringValue)=> Promise<string | null>;

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken:SignToken=JwtAdapter.generateToken,
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    //create user
    const user = await this.authRepository.register(registerUserDto);
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
