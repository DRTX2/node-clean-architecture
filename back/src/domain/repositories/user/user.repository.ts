import { UserEntity } from "../../entities/user.entity";

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  create(user: Partial<UserEntity>): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
}