import { CartProduct } from "../../cart-product/entities/cart-product.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: 'cart'})
export class Cart {
    @PrimaryGeneratedColumn('rowid')
    id: number
    
    @Column({name: 'user_id', nullable: false})
    userId: number

    @Column({name: 'active', nullable: false})
    active: boolean
     
    @CreateDateColumn({name: 'created_at'})    
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @OneToMany(() => CartProduct, (cartProduct: CartProduct)=> cartProduct.cart)
    cartProducts?: CartProduct[]

    getTotalPrice(): number {
        return this.cartProducts.reduce((total, cartProduct) => total + cartProduct.product.price * cartProduct.amount, 0);
    }
}

