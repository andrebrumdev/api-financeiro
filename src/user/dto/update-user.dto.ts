import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsUrl, Length } from 'class-validator';
import { User } from '../entities/users.entity';

export class UpdateUserDto extends PartialType(User) {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Senha não pode ser vazia' })
    @Length(5, 16, { message: 'Senha precisa ter entre 5 e 10 caracteres' })
    password: string;

    @IsOptional()
    name: string;
    
    @IsOptional()
    @IsUrl()
    url_perfil: string;

    @IsOptional()
    @IsUrl()
    idToken: string;
}
