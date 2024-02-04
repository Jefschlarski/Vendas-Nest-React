import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
<<<<<<< HEAD
  controllers: [CategoryController],
  exports: [CategoryService],
=======
  controllers: [CategoryController]
>>>>>>> develop
})
export class CategoryModule {}
