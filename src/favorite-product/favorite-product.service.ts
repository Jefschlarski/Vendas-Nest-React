import { ConflictException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { FavoriteProduct } from './entities/favorite-product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class FavoriteProductService {

    constructor(
        @InjectRepository(FavoriteProduct)
        private readonly favoriteProductRepository: Repository<FavoriteProduct>,
        @Inject(forwardRef(() => ProductService))
        private readonly productService: ProductService,
    ){}
    
    /**
     * Creates a favorite product for a specific user.
     *
     * @param {number} productId - The ID of the product to be favorited
     * @param {number} userId - The ID of the user favoriting the product
     * @return {Promise<FavoriteProduct>} The newly created favorite product
     */
    async create(productId: number, userId: number): Promise<FavoriteProduct>{
        const product = await this.productService.findById(productId).catch(() => undefined);
        const favoriteProduct = await this.favoriteProductRepository.findOne({where: {productId, userId}});

        if(favoriteProduct){
            throw new ConflictException('Favorite product already exists');
        }

        if(!product){
            throw new NotFoundException('Product not found');
        }
        return await this.favoriteProductRepository.save({productId, userId});
    }

    /**
     * Find a favorite product by user ID and product ID.
     *
     * @param {number} userId - the user ID
     * @param {number} productId - the product ID
     * @return {Promise<FavoriteProduct>} the favorite product 
     */
    async findOneByUserIdAndProductId(userId: number, productId: number): Promise<FavoriteProduct>{
        const favoriteProduct = await this.favoriteProductRepository.findOne({where: {userId, productId}});
        if(!favoriteProduct){
            throw new NotFoundException('Favorite product not found');
        }
        return favoriteProduct;
    }

    /**
     * Finds all favorite products for a specific user.
     *
     * @param {number} userId - The user ID
     * @return {Promise<FavoriteProduct[]>} A list of favorite products
     */
    async findAllByUserId(userId: number): Promise<FavoriteProduct[]>{
        const favoriteProducts = await this.favoriteProductRepository.find({
            order: {
                createdAt: 'ASC',
            },
            where: {
                userId
            },
            relations: {
                product: {
                    category: true
                }
            }
        }
        );
        
        if(!favoriteProducts || favoriteProducts.length === 0) {
            throw new NotFoundException('Favorite Products empty');
        }

        return favoriteProducts;
    }

    /**
     * Delete a favorite product for a specific user.
     *
     * @param {number} userId - The ID of the user
     * @param {number} productId - The ID of the product to be deleted
     * @return {Promise<DeleteResult>} 
     */
    async delete(userId : number, productId: number): Promise<DeleteResult>{
        const favoriteProduct = await this.favoriteProductRepository.findOne({where: {userId, productId}});
        if(!favoriteProduct){
            throw new NotFoundException('Favorite product not found');
        }

        return await this.favoriteProductRepository.delete(favoriteProduct.id);
    }
}
