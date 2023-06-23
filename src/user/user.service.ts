import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { getRepository } from 'fireorm';
import { User } from 'src/user/entities/users.entity';
import UserRepository from './entities/userRepository.reposity';
import { ICreateUserDTO } from './dto/create-user.dto';


@Injectable()
export class UserService {
  private userRepository: UserRepository
  constructor() {
    this.userRepository = getRepository(User) as UserRepository
  }

  public async create(user: User) {
    return await this.userRepository.create(user);
  }

  public async findOne(id: string) {
    return await this.userRepository.findById(id);
  }

  public async update(id: string, updateUser: User) {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      const mergeUser = {id,...updateUser,...user} as User;

      await this.userRepository.update(mergeUser);
      
      return user;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  public async remove(id: string) {
    return await this.userRepository.delete(id);
  } 

  public execute(user: ICreateUserDTO | UpdateUserDto): User {
    return this.userRepository.exec(user)
  }
}
