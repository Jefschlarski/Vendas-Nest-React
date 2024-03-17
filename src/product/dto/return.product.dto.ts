import { Product } from "../entities/product.entity";
import { ReturnCategoryDto } from "../../category/dto/returnCategory.dto";

export class ReturnProductDto{
    id: number;
    name: string;
    price: number;
    image: string;
    category: ReturnCategoryDto;
    favorite?: boolean;

    constructor(product: Product){
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.image = product.image;
        this.category = new ReturnCategoryDto(product.category);
    }
}