import { BcryptAdapter, JwtAdapter, StringValue } from "../../config";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";
import { CustomError } from "../errors/custom.error";
import { UserRepository } from "../repositories/user/user.repository";

type SignToken = (
  payload: Record<string, any>,
  duration?: StringValue
) => Promise<string | null>;
type HashFunction = (plain: string) => string;
type CompareFunction = (plain: string, hash: string) => boolean;

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class AuthUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashFn: HashFunction = BcryptAdapter.hash,
    private readonly compareFn: CompareFunction = BcryptAdapter.compare,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  private async generateUserToken(user: UserEntity): Promise<string> {
    const token = await this.signToken(
      { id: user.id, email: user.email, role: user.role },
      "2h"
    );
    if (!token) throw CustomError.internalServerError("Error generating token");
    return token;
  }

  private buildUserToken(user: UserEntity, token: string): UserToken {
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async register(dto: RegisterUserDto): Promise<UserToken> {
    const { name, email, password } = dto;

    const exists = await this.userRepo.findByEmail(email);
    if (exists) throw CustomError.badRequest("Email already registered");

    const hashedPassword = await this.hashFn(password);
    const user = await this.userRepo.create({ name, email, password: hashedPassword });
    const token = await this.generateUserToken(user);

    return this.buildUserToken(user, token);
  }

  async login(dto: LoginUserDto): Promise<UserToken> {
    const { email, password } = dto;

    const user = await this.userRepo.findByEmail(email);
    if (!user) throw CustomError.badRequest("User not found");

    const isValid = await this.compareFn(password, user.password);
    if (!isValid) throw CustomError.unauthorized("Invalid credentials");

    const token = await this.generateUserToken(user);
    return this.buildUserToken(user, token);
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepo.findAll();
  }
}
