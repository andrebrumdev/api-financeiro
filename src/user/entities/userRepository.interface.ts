import { User } from "./users.entity";

export default interface IUserRepository {
    exec(data: any): User
}