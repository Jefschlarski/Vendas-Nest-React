import { IsInt, IsString } from "class-validator";

export class UpdateProductDto{
    @IsString()
    name: string;
    @IsInt()
    categoryId: number;
    @IsInt()
    price: number;
    @IsString()
    image: string; 
}