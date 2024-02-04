import { IsInt, IsString } from "class-validator";

export class CreateProductDto{
    @IsString()
    name: string;
    @IsInt()
    categoryId: number;
    @IsInt()
    price: number;
    @IsString()
    image: string; 
}