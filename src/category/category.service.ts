import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { description: createCategoryDto.description },
    });

    if (categoryFound) {
      return new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    const newCategory = await this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryFound) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return categoryFound;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryFound) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const updateCategory = Object.assign(categoryFound, updateCategoryDto);
    return this.categoryRepository.save(updateCategory);
  }

  async remove(id: number) {
    const categoryFound = await this.categoryRepository.delete({ id });

    if (categoryFound.affected === 0) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return categoryFound;
  }
}
