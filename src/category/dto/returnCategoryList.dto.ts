import { Category } from "../entities/category.entity";
import { ReturnCategoryDto } from "./returnCategory.dto";

export class ReturnCategoryListDto{
    count: number;
    categories: ReturnCategoryDto[];
    constructor(categories: Category[]){
        this.count = categories.length;
        this.categories = categories.map((category) => new ReturnCategoryDto(category));
    }
}