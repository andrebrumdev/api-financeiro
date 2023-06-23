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

  async create(user: User) {
    return await this.userRepository.create(user);
  }

  async findOne(id: string) {
    return await this.userRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      Object.entries(updateUserDto).forEach(([key, value]) => {
        if (value && user[key]) {
          user[key] = value;
        }
      });

      await this.userRepository.update(user);
      return user;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  } 

  public async execute(user: ICreateUserDTO): Promise<void> {
    await this.userRepository.exec(user)
  }
}
