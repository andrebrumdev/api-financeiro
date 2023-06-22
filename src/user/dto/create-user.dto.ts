import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    name: string;
    @IsEmail()
    email: string;
    url_perfil: string;
    @IsNotEmpty()
    password: string;
}