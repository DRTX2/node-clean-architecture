import { UserModel } from "../../../data/mongodb";
import { UserEntity, UserRepository } from "../../../domain";
import { UserMapper } from "../../mappers/user.mapper";

export class MongoUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email });
    return user ? UserMapper.userEntityFromObject(user) : null;
  }

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = await UserModel.create(data);
    await user.save();
    return UserMapper.userEntityFromObject(user);
  }
  async findAll(): Promise<UserEntity[]> {
    const users = await UserModel.find();
    return users.map(UserMapper.userEntityFromObject);
  }
}
