import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly categoryService: CategoryService,
      ){} 
    
    /**
     * Asynchronously creates a new product.
     *
     * @param {Product} createProductDto - the product to be created
     * @return {Promise<Product>} the newly created product
     */
    async create(createProductDto: Product): Promise<Product> {
        await this.categoryService.findById(createProductDto.categoryId);
        const product = await this.findByName(createProductDto.name).catch(() => undefined);

        if(product) {
            throw new ConflictException('Product already exists');
        }

        return await this.productRepository.save(createProductDto);
    }

    /**
     * Find all products.
     *
     * @return {Promise<Product[]>} List of products
     */
    async findAll(): Promise<Product[]> {
        const product = await this.productRepository.find();
        if(!product || product.length === 0) {
            throw new NotFoundException('Products empty');
        }
        return product
    }

    /**
     * Find a product by its ID.
     *
     * @param {number} id - The ID of the product to find
     * @return {Promise<Product>} The product found by the ID
     */
    async findById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({where: {id}});
        if(!product) {
            throw new NotFoundException('Product not found');
        }
        return product
    }

    /**
     * Finds a product by name.
     *
     * @param {string} name - the name of the product to find
     * @return {Promise<Product>} the product found by name
     */    
    async findByName(name: string): Promise<Product> {
        const product = await this.productRepository.findOne({where: {name}});
        if(!product) {
            throw new NotFoundException('Product not found');
        }
        return product
    }

    /**
     * Asynchronously deletes a product by its ID.
     *
     * @param {number} productId - The ID of the product to delete
     * @return {Promise<DeleteResult>} A promise that resolves to the result of the delete operation
     */
    async delete(productId: number): Promise<DeleteResult> {
        await this.findById(productId);
        return await this.productRepository.delete({id: productId});
    }
    
    /**
     * Update a product by ID with the provided information.
     *
     * @param {number} productId - The ID of the product to update
     * @param {UpdateProductDto} updateProductDto - The DTO containing the updated product information
     * @return {Promise<Product>} The updated product
     */
    async update(productId: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findById(productId);
        return await this.productRepository.save({...product, ...updateProductDto});
    }
}
