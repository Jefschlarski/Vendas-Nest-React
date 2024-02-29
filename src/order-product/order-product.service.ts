import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { Repository } from 'typeorm';
import { CartProduct } from 'src/cart-product/entities/cart-product.entity';

@Injectable()
export class OrderProductService {
    constructor(
        @InjectRepository(OrderProduct)
        private readonly orderProductRepository: Repository<OrderProduct>,
    ){}
    
    async createByCartProduct(cartProducts: CartProduct[], orderId: number): Promise<void>{
        await Promise.all(cartProducts.map(async (cartProduct) => {
            await this.create(cartProduct.productId, orderId, cartProduct.product.price, cartProduct.amount);
        }));
    }

    async create(productId: number, orderId: number, price: number, amount: number): Promise<OrderProduct>{
        return await this.orderProductRepository.save({productId, orderId, amount, price});
    }
}
