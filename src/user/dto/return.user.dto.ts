import { ApiProperty } from "@nestjs/swagger";
import { ReturnAddressDto } from "../../address/dto/return.address.dto";
import { User } from "../entities/user.entity";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReturnUserDto{
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: Number, example: 1, description: 'Id do usuário.'})
    id: number;

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
    phone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, example: '11422333951', description: 'CPF do usuário.'})
    cpf: string;

    @ApiProperty({type: [ReturnAddressDto], description: 'Endereços do usuário.'})
    addresses?: ReturnAddressDto[];

    constructor(user: User){
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.phone = user.phone;
        this.cpf = user.cpf;
        this.addresses = user.addresses ? user.addresses.map((address)=> new ReturnAddressDto(address)) : undefined;
    }
}