import { Category } from "../entities/category.entity";

export class ReturnCategoryDto{
    id: number;
    name: string;
    categoryColor: string;
    constructor(category: Category){
        this.id = category.id;
        this.name = category.name;
        this.categoryColor = category.categoryColor
    }
}