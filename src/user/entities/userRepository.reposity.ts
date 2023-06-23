import { BaseFirestoreRepository, CustomRepository } from "fireorm";
import { User } from "./users.entity";
import IUserRepository from "./userRepository.interface";
import * as bcrypt from 'bcrypt';

const saltRounds = 16;

@CustomRepository(User)
export default class UserRepository extends BaseFirestoreRepository<User>{
  public exec(userCreate: any): User {
    const user = new User;
    Object.entries(userCreate).forEach(([key, value]) => {
      if (key === "password") {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(value || "" as any, salt, function (err, hash) {
            user[key] = hash;
          });
        });
      }
      else if (value) {
        user[key] = value || null;
      }
    });
    console.log(user);
    return user
  }
}
