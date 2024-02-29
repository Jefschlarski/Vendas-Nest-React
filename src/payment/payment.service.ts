import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { CreditCardPayment } from './entities/payment-credit-card.entity';
import { PaymentStatus } from 'src/payment-status/enum/payment-status.enum';
import { PixPayment } from './entities/payment-pix.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
    ){}

    async createPayment(createOrderDto: CreateOrderDto, cart: Cart): Promise<Payment>{

        const price = cart.getTotalPrice();
        const discount = 0;
        const finalPrice = price - discount;

        if(createOrderDto.amountPayments){
            const paymentCreditCard = new CreditCardPayment(PaymentStatus.Done, price, discount, finalPrice , createOrderDto);
            return await this.paymentRepository.save(paymentCreditCard);
        }else if(createOrderDto.code && createOrderDto.datePayment){
            const paymentPix = new PixPayment(PaymentStatus.Done, price, discount, finalPrice, createOrderDto);
            return await this.paymentRepository.save(paymentPix);
        }
        throw new BadRequestException('Payment not created: invalid data');
    }

    async updatePayment(payment: Payment): Promise<Payment>{
        return await this.paymentRepository.save(payment);
    }
}
