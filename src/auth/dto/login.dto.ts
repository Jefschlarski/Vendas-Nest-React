import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto{
   
    @IsString()
    @ApiProperty({example: 'Y4N9n@example.com', description: 'Email do usuário.'})
    email: string;
   
    @IsString()
    @ApiProperty({example: 'password', description: 'Senha do usuário.'})
    password: string;
}