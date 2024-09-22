import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePasswordDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'password', description: 'Senha antiga do usuário.'})
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'newPassword', description: 'Senha antiga do usuário.'})
    newPassword: string;
}