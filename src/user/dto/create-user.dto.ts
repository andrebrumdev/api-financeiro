import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, Length, IsUrl, IsOptional } from "class-validator";
import { User } from "../entities/users.entity";

const [minLengthPassword,maxLengthPassword] = [5,16];


export class ICreateUserDTO extends PartialType(User) {
    id?: string

    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Senha não pode ser vazia' })
    @Length(minLengthPassword, maxLengthPassword, { message: `Senha precisa ter entre ${minLengthPassword} e ${maxLengthPassword} caracteres` })
    password: string;

    name: string;

    @IsOptional()
    @IsUrl()
    url_perfil: string;

    @IsOptional()
    puid: string;

    @IsOptional()
    uid: string;
}
