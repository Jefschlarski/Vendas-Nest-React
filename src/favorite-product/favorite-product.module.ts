import { Module, forwardRef } from '@nestjs/common';
import { FavoriteProductService } from './favorite-product.service';
import { FavoriteProductController } from './favorite-product.controller';
import { FavoriteProduct } from './entities/favorite-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteProduct]), forwardRef(() => ProductModule)],
  providers: [FavoriteProductService],
  controllers: [FavoriteProductController],
  exports: [FavoriteProductService],
})
export class FavoriteProductModule {}
