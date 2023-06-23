import { ICreateUserDTO } from "../dto/create-user.dto";
import { User } from "./users.entity";

export default interface IUserRepository {
    exec(data: ICreateUserDTO): Promise<User>
}