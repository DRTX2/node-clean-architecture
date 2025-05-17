import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDataSource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;
    try{
        // verificate if email is already registered
        if(email)   throw CustomError.badRequest("Email already registered")
        // encrypt password

        // const encryptedPassword=


        // map response to an userEntity
        return new UserEntity(
            '1',name,email,password,['ADMIN_ROLE']
        );

    }catch(error){
        if(error instanceof CustomError){
            throw error;
        }
        console.error(error);
        throw CustomError.internalServerError();
    }
  }
}
