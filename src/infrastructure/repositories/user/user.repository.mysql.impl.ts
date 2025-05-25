import { MySQLDatabase } from "../../../data/mysql/mysql-database";
import { UserEntity, UserRepository } from "../../../domain";
import { UserMapper } from "../../mappers/user.mapper";

type NewUserData = {
  name: string;
  email: string;
  password: string;
  img?: string;
};

export class MySQLUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await MySQLDatabase.client.user.findUnique({
      where: { email },
      include: { roles: true },
    });
    return user ? UserMapper.userEntityFromObject(user) : null;
  }

  async create(data: NewUserData): Promise<UserEntity> {
    const user = await MySQLDatabase.client.user.create({
      data: {
        ...data,
        roles: { create: [{ role: "USER_ROLE" }] },
      },
      include: { roles: true },
    });

    return UserMapper.userEntityFromObject(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await MySQLDatabase.client.user.findMany({
      include: { roles: true },
    });
    return users.map(UserMapper.userEntityFromObject);
  }
}
