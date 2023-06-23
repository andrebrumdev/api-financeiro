import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, Length, IsUrl, IsOptional } from "class-validator";
import { User } from "../entities/users.entity";

export class ICreateUserDTO extends PartialType(User) {
    id?: string

    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Senha não pode ser vazia' })
    @Length(5, 16, { message: 'Senha precisa ter entre 5 e 10 caracteres' })
    password: string;

    name: string;

    @IsOptional()
    @IsUrl()
    url_perfil: string;

    @IsOptional()
    puid: string;

    uid: string;
}
