import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>){}

  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.create(createProductDto)
    newProduct.totalPrice = newProduct.unitPrice * newProduct.quantity
    return this.productRepository.save(newProduct);
  }

  findAll() {
    return this.productRepository.find({relations:['category']});
  }

  async findOne(id: number) {
    const productFound = await this.productRepository.findOne({
      where: {id},
      relations:['category']
    });

    if(!productFound) return  new HttpException('Product not found', HttpStatus.NOT_FOUND)
    return productFound;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productFound = await this.productRepository.findOne({where: {id}});

    if(!productFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedProduct = Object.assign(productFound, updateProductDto);
    return this.productRepository.save(updatedProduct)
  }

  async remove(id: number) {
    const result = await this.productRepository.delete({id});
    if(result.affected === 0) return new HttpException('Product not found', HttpStatus.NOT_FOUND)

    return result;
  }
}
