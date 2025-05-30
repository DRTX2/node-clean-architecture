import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, password, roles } = object;
    
    if (!_id && !id) throw CustomError.badRequest("Missing id");
    if (!name) throw CustomError.badRequest("Missign name");
    if (!email) throw CustomError.badRequest("Missign email");
    if (!password) throw CustomError.badRequest("Missign password");
    if (!roles) throw CustomError.badRequest("Missign roles");

    return new UserEntity(_id || id, name, email, password, roles);
  }
}
