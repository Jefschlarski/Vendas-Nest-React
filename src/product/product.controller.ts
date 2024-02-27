import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { Roles } from '../decorators/roles.decorator';
import { ReturnProductDto } from './dto/return.product.dto';
import { UserType } from '../user/enum/user-type.enum';
import { UpdateProductDto } from './dto/update.product.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    /**
     * Create a new product.
     *
     * @param {Product} product - the product to create
     * @return {Promise<ReturnProductDto>} a promise that resolves to the newly created product
     */
    @Post()
    @Roles(UserType.Admin)
    async create(@Body() product: Product): Promise<ReturnProductDto> {
        return new ReturnProductDto(await this.productService.create(product));
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
    async findAll(): Promise<ReturnProductDto[]> {
        return (await this.productService.findAll()).map((product) => new ReturnProductDto(product)); 
    }  
    
}
