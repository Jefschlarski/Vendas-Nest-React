import { Cart } from "src/cart/entities/cart.entity"
import { Product } from "src/product/entities/product.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: 'cart_product'})
export class CartProduct {
    @PrimaryGeneratedColumn('rowid')
    id: number
    
    @Column({name: 'cart_id', nullable: false})
    cartId: number
     
    @Column({name: 'product_id', nullable: false})
    productId: number

    @Column({name: 'amount', nullable: false})
    amount: number

    @CreateDateColumn({name: 'created_at'})    
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @ManyToOne(() => Product, (product: Product)=> product.cartProduct)
    @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
    product?: Product;
    
    @ManyToOne(() => Cart, (cart: Cart)=> cart.cartProducts)
    @JoinColumn({name: 'cart_id', referencedColumnName: 'id'})
    cart?: Cart;
}
