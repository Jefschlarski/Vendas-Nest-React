import { ReturnProductDto } from "../../product/dto/return.product.dto";
import { FavoriteProduct } from "../entities/favorite-product.entity";


export class FavoriteProductDto{
    id: number;
    product: ReturnProductDto;
    constructor(favoriteProduct: FavoriteProduct ){
        this.id = favoriteProduct.id;
        this.product = new ReturnProductDto(favoriteProduct.product);
    }
}