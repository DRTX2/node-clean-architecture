import { BcryptAdapter, JwtAdapter, StringValue } from "../../config";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";
import { CustomError } from "../errors/custom.error";
import { UserRepository } from "../repositories/user/user.repository";

type SignToken=(payload: Record<string, any>, duration?: StringValue)=> Promise<string | null>;
type HashFunction = (plain: string) => string;
type CompareFunction = (plain: string, hash: string) => boolean;

export class AuthUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashFn: HashFunction = BcryptAdapter.hash,
    private readonly compareFn: CompareFunction = BcryptAdapter.compare,
    private readonly signToken:SignToken=JwtAdapter.generateToken,
  ) {}

  async register(dto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = dto;

    const exists = await this.userRepo.findByEmail(email);
    if (exists) throw CustomError.badRequest("Email already registered");

    const user = await this.userRepo.create({
      name,
      email,
      password: this.hashFn(password),
    });
    const token =await this.signToken({id:user.id},'2h');
    if(!token) throw CustomError.internalServerError("Error generating token");

    return user;
  }

  async login(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;

    const user = await this.userRepo.findByEmail(email);
    if (!user) throw CustomError.badRequest("User not found");

    const isValid = this.compareFn(password, user.password);
    if (!isValid) throw CustomError.unauthorized("Invalid credentials");
    
    return user;
  }

  
}
