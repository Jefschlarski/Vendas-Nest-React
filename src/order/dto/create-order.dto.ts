import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {
    
    @IsOptional()
    @IsNumber()
    amountPayments?: number;

    @IsOptional()
    @IsString()
    code: string;

    @IsOptional()
    @IsString()
    datePayment?: string;
}