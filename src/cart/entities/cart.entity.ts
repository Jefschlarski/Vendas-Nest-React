import { CartProduct } from "src/cart-product/entities/cart-product.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: 'cart'})
export class Cart {
    @PrimaryGeneratedColumn('rowid')
    id: number
    
    @Column({name: 'user_id', nullable: false})
    userId: number
     
    @CreateDateColumn({name: 'created_at'})    
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @OneToMany(() => CartProduct, (cartProduct: CartProduct)=> cartProduct.cart)
    cartProducts?: CartProduct[]
}
