import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'order'})
export abstract class Payment{

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
}