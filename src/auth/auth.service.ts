import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly userRepository: UserRepository = new UserRepository();
  
  public async login(loginDto: LoginDto): Promise<any> {
    try {
      const userRecord = await this.userRepository.getUser(
        loginDto.email
      );

      // Autenticação bem-sucedida, retorne os detalhes do usuário ou um token JWT, se necessário
      return { user: userRecord };
    } catch (error) {
      // Lide com o erro de autenticação
      throw error;
    }
  }

  public async sessionLogin(idToken: any,expiresIn:number){
    return await this.userRepository.sessionLogin(idToken,expiresIn);
  }
  
}
