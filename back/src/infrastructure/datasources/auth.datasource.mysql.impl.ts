import { BcryptAdapter } from "../../config";
import { MySQLDatabase } from "../../data/mysqldb/mysql-database";
import {
  AuthDataSource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashedPassword: string) => boolean;

export class AuthDatasourceMySQLImpl implements AuthDataSource {
  constructor(
    private readonly hashFunction: HashFunction = BcryptAdapter.hash,
    private readonly compareFunction: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      const exists = await MySQLDatabase.client.user.findUnique({
        where: { email },
      });

      if (exists) throw CustomError.badRequest("Email already registered");

      const newUser = await MySQLDatabase.client.user.create({
        data: {
          name,
          email,
          password: this.hashFunction(password),
          roles: {
            create: [{ role: "USER_ROLE" }],
          },
        },
        include: { roles: true },
      });

      return UserMapper.userEntityFromObject(newUser);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.error(error);
      throw CustomError.internalServerError();
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await MySQLDatabase.client.user.findUnique({
        where: { email },
        include: { roles: true },
      });

      if (!user) throw CustomError.badRequest("User not found");

      const isValid = this.compareFunction(password, user.password);
      if (!isValid) throw CustomError.unauthorized("Invalid credentials");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      console.error(error);
      throw CustomError.internalServerError();
    }
  }
}