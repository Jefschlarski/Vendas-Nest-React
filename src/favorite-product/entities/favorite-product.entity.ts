import { User } from "../../user/entities/user.entity";
import { Product } from "../../product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'favorite_product'})
export class FavoriteProduct{

    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'user_id', nullable: false})
    userId: number;

    @Column({name: 'product_id', nullable: false})
    productId: number;
    
    @CreateDateColumn({name: 'created_at'})
    createdAt:Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt:Date;

    @ManyToOne(() => User, (user) => user.favoriteProducts)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user?: User;

    @OneToOne(() => Product, (product) => product.favoriteProducts)
    @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
    product: Product;
}