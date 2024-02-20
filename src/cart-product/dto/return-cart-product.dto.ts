import { IsNumber } from "class-validator"
import { ReturnCartDto } from "src/cart/dto/return-cart.dto";
import { ReturnProductDto } from "src/product/dto/return.product.dto";
import { CartProduct } from "../entities/cart-product.entity";

export class ReturnCartProductDto {

    id: number;
    cartId: number;
    productId: number;
    amount: number;
    product?: ReturnProductDto;
    cart?: ReturnCartDto;

    constructor(cartProduct: CartProduct){
        this.id = cartProduct.id;
        this.cartId = cartProduct.cartId;
        this.productId = cartProduct.productId;
        this.amount = cartProduct.amount;
        this.product = cartProduct.product ? new ReturnProductDto(cartProduct.product) : undefined;
        this.cart = cartProduct.cart ? new ReturnCartDto(cartProduct.cart) : undefined; 
    }
}
