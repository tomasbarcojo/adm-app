import { NestFactory } from '@nestjs/core';
import { UserService } from '../../modules/user/user.service';
import { AppModule } from '../../app.module';
import { faker } from '@faker-js/faker';
import { UserModule } from '../../modules/user/user.module';
import { CategoryModule } from '../../modules/category/category.module';
import { CategoryService } from '../../modules/category/category.service';
import { ProductModule } from '../../modules/product/product.module';
import { ProductService } from '../../modules/product/product.service';

const boostrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.select(UserModule).get(UserService, { strict: true });
  const productService = app.select(ProductModule).get(ProductService, { strict: true });
  const categoryService = app.select(CategoryModule).get(CategoryService, { strict: true });

  // await userService.create({
  //   firstName: 'Tomas',
  //   lastName: 'Barcojo',
  //   email: faker.internet.email(),
  //   username: 'tomi',
  //   password: '112233',
  // });
  // await Supplier.create({
  //   businessName: 'Activa SRL',
  //   cuit: '30707651926',
  //   phone: '3424663535',
  //   address: '25 de Mayo 2387',
  //   city: 'Santa Fe',
  //   CP: '3000',
  //   bankaccout1: '519925-12',
  // });
  // for (var i = 0; i < 100; i++) {
  //   await Supplier.create({
  //     businessName: faker.company.companyName(),
  //     cuit: i,
  //     phone: faker.phone.phoneNumber(),
  //     address: '25 de Mayo 2387',
  //     city: faker.address.streetAddress(),
  //     CP: faker.address.zipCode(),
  //     bankaccount1: faker.finance.account(),
  //   });
  // }
  for (var i = 0; i < 10; i++) {
    await categoryService.create({
      categoryName: `Categoria ${i}`,
      image: faker.image.business(640, 480, true),
    });
  }
  for (var i = 0; i < 300; i++) {
    await productService.create({
      articleName: faker.commerce.productName(),
      code: String(faker.commerce.product()),
      price: Number(faker.commerce.price()),
      stock: faker.datatype.number(),
      stockAlert: faker.datatype.number({ min: 10, max: 30 }),
      image: faker.image.business(640, 480, true),
      categoryId: Math.floor(Math.random() * 10) + 1,
      supplierId: Math.floor(Math.random() * 100) + 1,
      obs: faker.commerce.productDescription(),
    });
  }
  // for (var i = 0; i < 600; i++) {
  //   await Client.create({
  //     businessName: faker.internet.userName(),
  //     cuit: i,
  //     address: faker.address.streetName(),
  //     city: faker.address.cityName(),
  //     CP: faker.address.zipCode(),
  //     phone: faker.phone.phoneNumber(),
  //     altphone: faker.phone.phoneNumber(),
  //   });
  // }
  // await Article.create({
  //   articleName: 'Prueba articulo 2',
  //   price: '1000',
  //   stock: '10',
  //   image: '8719',
  //   categoryId: 1,
  //   supplierId: 1,
  // });
  // await Article.create({
  //   articleName: 'Prueba articulo 3',
  //   price: '1000',
  //   stock: '10',
  //   image: '8719',
  //   categoryId: 1,
  //   supplierId: 2,
  // });

  await app.close();
};

boostrap();
