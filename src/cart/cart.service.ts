import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersistenceContract } from 'src/interfaces/persistence.contract';
import { CartDto } from './dto/cart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        private readonly cartProductService: CartProductService
    ){}

    /**
     * Create a new cart for the specified user.
     *
     * @param {number} userId - The ID of the user for whom the cart is being created
     * @return {Promise<Cart>} A Promise that resolves to the newly created Cart object
     */
    async create(userId: number): Promise<Cart> {
        return await this.cartRepository.save({userId, active: true});
    }

    /**
     * Add a product to the cart for the given user.
     *
     * @param {CartDto} cartDto - the cart data transfer object
     * @param {number} userId - the user ID
     * @return {Promise<Cart>} the updated cart after adding the product
     */   
    async addProductToCart(cartDto: CartDto, userId: number): Promise<Cart> {
        const cart = await this.verifyActiveCart(userId).catch(() => {
            return this.create(userId);
        })

        await this.cartProductService.insert(cart, cartDto);

        return cart;
    }

    /**
     * Find all carts.
     *
     * @return {Promise<Cart[]>} The promise of an array of carts.
     */
    findAll(): Promise<Cart[]> {
        return this.cartRepository.find();
    }

    /**
     * Verify active cart for a specific user.
     *
     * @param {number} userId - The user ID to verify the active cart for
     * @return {Promise<Cart>} The active cart for the user
     */
    async verifyActiveCart(userId: number): Promise<Cart> {
        const cart = await this.findByUserId(userId);

        if(!cart){
            throw new NotFoundException('Active cart not found');
        }
        return cart;
    }
    
    /**
     * Find a cart by user ID.
     *
     * @param {number} userId - the user ID
     * @return {Promise<Cart>} the promise of finding a cart
     */
    async findByUserId(userId: number): Promise<Cart> {
        return await this.cartRepository.findOne({where: {userId}});
    }

    /**
     * Find cart by id.
     *
     * @param {number} id - the id of the cart
     * @return {Promise<Cart>} the found cart
     */
    async findById(id: number): Promise<Cart> {
        return await this.cartRepository.findOne({where: {id}}); 
    }
}
