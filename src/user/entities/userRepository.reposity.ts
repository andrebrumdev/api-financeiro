import { BaseFirestoreRepository, CustomRepository } from "fireorm";
import { User } from "./users.entity";
import IUserRepository from "./userRepository.interface";

@CustomRepository(User)
export default class UserRepository extends BaseFirestoreRepository<User> implements IUserRepository {
    public exec(userCreate: any): User {
        const user = new User()
        Object.entries(userCreate).forEach(([key, value]) => {
            if (value && user[key]) {
              user[key] = value;
            }
        });
        return user
    }
}