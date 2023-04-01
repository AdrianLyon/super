import { Product } from 'src/product/entities/product.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity({ name: 'categories'})
export class Category {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    description: string

    @OneToMany(() => Product, categories => categories.category)
    categories: Product[] 
}
