import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsNotEmpty({ message: 'Senha não pode ser vazia' })
    @Length(5, 16, { message: 'Senha precisa ter entre 5 e 10 caracteres' })
    password: string;
}