import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentService } from 'src/payment/payment.service';
import { Payment } from 'src/payment/entities/payment.entity';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)    
        private readonly orderRepository: Repository<Order>,
        private readonly paymentService: PaymentService,
        private readonly cartService: CartService,
        private readonly orderProductService: OrderProductService,
    ) {}
    
    
    async save(createOrderDto: CreateOrderDto, userId: number, payment: Payment): Promise<Order>{
       return await this.orderRepository.save({
            addressId: createOrderDto.addressId,
            date: new Date(),
            paymentId: payment.id,
            userId: userId       
        });
    }

    async create(createOrderDto: CreateOrderDto, userId: number): Promise<Order>
    {   
        const cart = await this.cartService.findByUserId(userId, true);

        const payment: Payment = await this.paymentService.createPayment(createOrderDto, cart);

        const order = await this.save(createOrderDto, userId, payment);

        await this.orderProductService.createByCartProduct(cart.cartProducts, order.id);
        
        await this.cartService.cleanCart(userId);

        return order;
    }

    async findAllByUserId(userId: number): Promise<Order[]>{
        const orders =  await this.orderRepository.find({
            where: {
                userId
            },
            relations: {
                address: true,
                orderProducts: {product: true},
                payment: {
                    status: true
                }
            }
        });

        if(!orders || orders.length === 0){
            throw new NotFoundException('Orders not found');
        }

        return orders;
    }

    async findAll(): Promise<Order[]>{
        return await this.orderRepository.find({
            relations: {
                address: true,
                orderProducts: {product: true},
                payment: {
                    status: true
                }
            }
        });
    }

    async findOne(id: number): Promise<Order>{
        const order = await this.orderRepository.findOne({
            where: {
                id
            },
            relations: {
                address: true,
                orderProducts: {product: true},
                payment: {
                    status: true
                }
            }
        });
    
        if(!order){
            throw new NotFoundException('Order not found');
        }
    return order;
}
}
