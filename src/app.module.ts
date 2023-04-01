import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      host: 'containers-us-west-66.railway.app',
      port: 6014,
      username: 'root',
      password: '1Gxne7zIDXeL9RetzJqN',
      database: 'railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    CategoryModule,
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
