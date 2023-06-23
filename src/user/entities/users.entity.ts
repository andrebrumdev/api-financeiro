import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, Length } from 'class-validator';
import { Collection } from 'fireorm';

@Collection()
export class User {
    id: string;

    uid: string;

    puid: string;

    name!: string;

    @IsEmail()
    email!: string;

    @IsEmail()
    @IsOptional()
    url_perfil?: string;
    
    @IsNotEmpty({ message: 'Senha não pode ser vazia' })
    @Length(5, 16, { message: 'Senha precisa ter entre 5 e 10 caracteres' })
    password!: string;

    @IsOptional()
    @IsPhoneNumber('BR')
    phoneNumber?: string;
}
