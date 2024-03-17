import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { FavoriteProductModule } from '../favorite-product/favorite-product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule, FavoriteProductModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})

export class ProductModule {}
