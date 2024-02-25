import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'order_product'})
export abstract class Payment{

    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'user_id', nullable: false})
    userId: number;

    @Column({name: 'product_id', nullable: false})
    productId: number;
    
    @Column({name: 'amount', nullable: false})
    type: number;

    @Column({name: 'price', nullable: false})
    price: number;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt:Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt:Date;
}