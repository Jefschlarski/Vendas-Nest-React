import { FavoriteProductDto } from "./favorite-product.dto";
import { FavoriteProduct } from "../entities/favorite-product.entity";


export class ReturnFavoriteProductListDto{
   count: number;
   favoriteProducts: FavoriteProductDto[];
   constructor(favoriteProducts: FavoriteProduct[]){
       this.count = favoriteProducts.length;
       this.favoriteProducts = favoriteProducts.map((favoriteProduct) => new FavoriteProductDto(favoriteProduct));
   }
}