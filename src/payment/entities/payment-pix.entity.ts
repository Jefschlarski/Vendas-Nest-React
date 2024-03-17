import { ChildEntity, Column} from "typeorm";
import { Payment } from "./payment.entity";
import { CreateOrderDto } from "../../order/dto/create-order.dto";

@ChildEntity()
export class PixPayment extends Payment{

    @Column({name: 'code', nullable: false})
    code: string;

    @Column({name: 'date_payment', nullable: false})
    datePayment: Date;

    constructor(
        statusId: number,
        price: number,
        discount: number,
        finalPrice: number,
        createOrderDto: CreateOrderDto,
    ){
       super(statusId, price, discount, finalPrice);
       this.code = createOrderDto?.code || '';
       this.datePayment = new Date(createOrderDto?.datePayment || '');
    }
}