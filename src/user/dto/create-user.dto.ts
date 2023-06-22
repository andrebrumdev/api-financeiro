import { IsEmail, IsNotEmpty, Length, IsUrl, IsOptional, IsDate} from "class-validator";

export class CreateUserDto {
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
    @IsUrl()
    idToken: string;

    @IsDate()
    createDate: Date;
}