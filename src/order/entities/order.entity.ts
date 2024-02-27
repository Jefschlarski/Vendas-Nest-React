import { Address } from "../../address/entities/address.entity";
import { OrderProduct } from "../../order-product/entities/order-product.entity";
import { Payment } from "../../payment/entities/payment.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'order'})
export class Order{

    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'user_id', nullable: false})
    userId: number;

    @Column({name: 'address_id', nullable: false})
    addressId: number;
    
    @Column({name: 'date', nullable: false})
    type: Date;

    @Column({name: 'payment_id', nullable: false})
    paymentId: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt:Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt:Date;
    
    @ManyToMany(() => User, (user) => user.orders)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user?: User;

    @ManyToMany(() => Address, (address) => address.orders)
    @JoinColumn({name: 'address_id', referencedColumnName: 'id'})
    address?: Address;

    @ManyToMany(() => Payment, (payment) => payment.orders)
    @JoinColumn({name: 'payment_id', referencedColumnName: 'id'})
    payment?: Payment;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts?: OrderProduct[]
}