import { IsInt, IsString } from "class-validator";

export class UpdateProductDto{
    @IsInt()
    id: number;
    @IsString()
    name: string;
    @IsInt()
    categoryId: number;
    @IsInt()
    price: number;
    @IsString()
    image: string; 
}