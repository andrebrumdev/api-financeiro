import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { getRepository } from 'fireorm';
import { User } from 'src/user/entities/users.entity';
import * as admin from 'firebase-admin';
import { ICreateUserDTO } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private userRepository = getRepository(User);

  public async login(loginDto: LoginDto): Promise<any> {
    try {
      const userRecord = await this.userRepository.whereEqualTo("email", loginDto.email).findOne();
      if (userRecord) {
        bcrypt.compare(loginDto.password||"", userRecord.password, async function (err, result) {
          console.log("bcrypt",result);
          console.log(loginDto.password||"",userRecord.password||"");
          if (result) {
            return userRecord;
          }
          else {
            return null;
          }
        });
      }
      else {
        const cred = await admin.auth().getUserByEmail(loginDto.email);
        if (cred) {
          const user: ICreateUserDTO = {
            id: cred.uid,
            email: cred.email || null,
            uid: cred.uid || null,
            name: cred.displayName || null,
            password: cred.passwordHash || null,
            phoneNumber: cred.phoneNumber || null,
            url_perfil: cred.photoURL || null,
            puid: cred.providerData[0].uid || null
          }
          await this.userRepository.create(user);
          return  user;
        }
        else
          return null;
      }
      // Autenticação bem-sucedida, retorne os detalhes do usuário ou um token JWT, se necessário
    } catch (error) {
      // Lide com o erro de autenticação
      throw error.message;
    }
  }

}
