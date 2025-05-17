import { UserModel } from "../../data/mongodb";
import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthDatasourceImpl implements AuthDataSource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;
    try {
      // verificate if email is already registered
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest("Email already registered");

      // encrypt password
      // const encryptedPassword
      const user = await UserModel.create({
        name,
        email,
        password,
      });
      await user.save();

      // map response to an userEntity(todo)
      return new UserEntity(user.id , user.name, user.email, user.password, user.roles);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.error(error);
      throw CustomError.internalServerError();
    }
  }
}
