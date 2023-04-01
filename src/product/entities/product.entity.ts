import { Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Category } from 'src/category/entities/category.entity'

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    quantity: number

    @Column({ type: "float" })
    unitPrice: number

    @Column({ type: "float" })
    totalPrice: number

    @Column()
    categoryId: number

    @ManyToOne(() => Category, category => category.categories)
    category: Category
}
