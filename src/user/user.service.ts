import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/repository';


@Injectable()
export class UserService {
  private userRespository : UserRepository = new UserRepository();
  
  create(createUserDto: CreateUserDto) {
    return this.userRespository.createUser(createUserDto);
  }

  findOne(id: string) {
    return this.userRespository.getUser(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRespository.updateUser(id,updateUserDto);
  }

  remove(id: string) {
    return this.userRespository.deleteUser(id);
  }
}
