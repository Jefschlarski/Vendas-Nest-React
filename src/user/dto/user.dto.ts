import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {
     
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, example: 'João da Silva', description: 'Nome do usuário.'})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, example: 'Y4N9n@example.com', description: 'Email do usuário.'})
    email: string;
   
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, example: '49001230014', description: 'Telefone do usuário.'})
    phone: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, example: '11422333951', description: 'CPF do usuário.'})
    cpf: string;

    @IsString()
    @ApiProperty({example: 'password', description: 'Senha do usuário.'})
    password: string;
}
