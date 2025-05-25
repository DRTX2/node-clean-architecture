import { envs } from "../../../config";
import { UserRepository } from "../../../domain";
import { MongoUserRepository } from "./user.repository.mongo.impl";
import { MySQLUserRepository } from "./user.repository.mysql.impl";

const repositoryMap: Record<string, () => UserRepository> = {
  mysql: () => new MySQLUserRepository(),
  mongodb: () => new MongoUserRepository(),
};

export class UserRepositoryFactory {
  static create(): UserRepository {
    const dbType = envs.DB_PREFERED?.toLowerCase();

    const factoryFn = repositoryMap[dbType];
    if (!factoryFn) {
      throw new Error(`[FACTORY ERROR] Unknown DB type: ${dbType}`);
    }

    return factoryFn();
  }
}
