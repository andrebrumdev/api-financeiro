import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { getRepository } from 'fireorm';
import { User } from 'src/user/entities/users.entity';

@Injectable()
export class AuthService {
  private userRepository = getRepository(User);
  
  public async login(loginDto: LoginDto): Promise<any> {
    try {
      console.log(loginDto);
      const userRecord = this.userRepository.whereEqualTo("email",loginDto.email);
      if(userRecord){
        return { user: userRecord };
      }
      else{
        return null;
      }
      // Autenticação bem-sucedida, retorne os detalhes do usuário ou um token JWT, se necessário
    } catch (error) {
      // Lide com o erro de autenticação
      throw error.message;
    }
  }
  
}
