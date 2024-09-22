import { Product } from "../../product/entities/product.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: 'category'})
export class Category {
    @PrimaryGeneratedColumn('rowid')
    id: number
    
    @Column({name: 'name', nullable: false})
    name: string
    
    @Column({name: 'category_color', nullable: false})
    categoryColor: string
    
    @CreateDateColumn({name: 'created_at'})    
    createdAt: Date
    
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @OneToMany(() => Product, (product: Product) => product.category)
    products?: Product[];
}
