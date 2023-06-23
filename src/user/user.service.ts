import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/repository';


@Injectable()
export class UserService {
  private userRespository : UserRepository = new UserRepository();
  
  async create(createUserDto: CreateUserDto) {
    return await this.userRespository.createUser(createUserDto);
  }

  async findOne(id: string) {
    return await this.userRespository.getUser(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRespository.updateUser(id,updateUserDto);
  }

  async remove(id: string) {
    return await this.userRespository.deleteUser(id);
  }
}
