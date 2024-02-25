import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartDto } from './dto/cart.dto';
import { CartProductService } from '../cart-product/cart-product.service';

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
        
        const cart = await this.findByUserId(userId).catch(() => {
            return this.create(userId);
        })

        await this.cartProductService.insert(cart, cartDto);

        return this.findByUserId(userId);
    }

    /**
     * Find all carts.
     *
     * @return {Promise<Cart[]>} The promise of an array of carts.
     */
    async findAll(): Promise<Cart[]> {
        return await this.cartRepository.find();
    }

    /**
     * Verify active cart for a specific user.
     *
     * @param {number} userId - The user ID to verify the active cart for
     * @return {Promise<Cart>} The active cart for the user
     */
    async findByUserId(userId: number, hasRelations?: boolean): Promise<Cart> {

        const relations = hasRelations ? {cartProducts: {product: true},} : undefined;

        const cart = await this.cartRepository.findOne({where: {userId, active: true}, relations});

        if(!cart){
            throw new NotFoundException('Active cart not found');
        }
        return cart;
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

    async cleanCart(userId: number): Promise<Cart> {
        const cart = await this.findByUserId(userId);
        cart.cartProducts = [];
        return await this.cartRepository.save(cart);
    }
}
