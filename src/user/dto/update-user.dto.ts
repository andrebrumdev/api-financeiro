import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsUrl, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
