import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [SolutionsController, CategoriesController],
  providers: [SolutionsService, CategoriesService],
})
export class SolutionsModule {}
