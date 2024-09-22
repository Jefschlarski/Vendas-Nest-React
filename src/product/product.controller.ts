import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { Roles } from '../decorators/roles.decorator';
import { ReturnProductDto } from './dto/return.product.dto';
import { UserType } from '../user/enum/user-type.enum';
import { UpdateProductDto } from './dto/update.product.dto';
import { FavoriteProductService } from '../favorite-product/favorite-product.service';
import { UserId } from '../decorators/user-id.decorator';
import { CreateProductDto } from './dto/create.product.dto';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService, private readonly favoriteProductService: FavoriteProductService){}

    /**
     * Create a new product.
     *
     * @param {Product} product - the product to create
     * @return {Promise<ReturnProductDto>} a promise that resolves to the newly created product
     */
    @Post()
    @Roles(UserType.Admin)
    async create(@Body() product: CreateProductDto): Promise<ReturnProductDto> {
        return await this.productService.create(product);
    }
    
    /**
     * Delete a record by ID.
     *
     * @param {number} id - The ID of the record to delete
     * @return {Promise<DeleteResult>} A Promise that resolves with the result of the delete operation
     */
    @Delete('/:id')
    @Roles(UserType.Admin)
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.productService.delete(id); 
    }

    /**
     * Asynchronously updates a product.
     *
     * @param {number} id - The ID of the product to update
     * @param {UpdateProductDto} updateProductDto - The data to update the product with
     * @return {Promise<ReturnProductDto>} The updated product
     */
    @Put('/:id')
    @Roles(UserType.Admin)
    async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<ReturnProductDto> {
        return new ReturnProductDto(await this.productService.update(id, updateProductDto));   
    }
    
    /**
     * Asynchronously finds all products and returns the mapped result as an array of ReturnProductDto.
     *
     * @return {Promise<ReturnProductDto[]>} the mapped result as an array of ReturnProductDto
     */
    @Get()
    @Roles(UserType.Admin, UserType.User)
    async findAll(@UserId() userId: number): Promise<ReturnProductDto[]> {
        const favoriteProducts = await this.favoriteProductService.findAllByUserId(userId).catch(() => undefined);
        const products = (await this.productService.findAll()).map((product) => new ReturnProductDto(product))

        if (favoriteProducts) {
            favoriteProducts.forEach((favoriteProduct) => {
                products.forEach((product) => {
                    if (product.id === favoriteProduct.productId) {
                        product.favorite = true;
                    }
                })
            })
            return products;
        }
        return products
    }
    
}
