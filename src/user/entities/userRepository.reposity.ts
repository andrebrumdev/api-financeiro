import { BaseFirestoreRepository, CustomRepository } from "fireorm";
import { ICreateUserDTO } from "../dto/create-user.dto";
import { User } from "./users.entity";
import IUserRepository from "./userRepository.interface";

@CustomRepository(User)
export default class UserRepository extends BaseFirestoreRepository<User> implements IUserRepository {
    public async exec(userCreate: ICreateUserDTO): Promise<User> {
        const user = new User()
        Object.entries(userCreate).forEach(([key, value]) => {
            if (value && user[key]) {
              user[key] = value;
            }
        });
        await this.create(user)
        return user
    }
}