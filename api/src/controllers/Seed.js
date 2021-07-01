const { User, Supplier, Category, Article, Client } = require('../db.js')
var faker = require('faker');
const { fake, finance } = require('faker');

module.exports = {
    async Seed (req, res) {
        await User.create({
            firstName: 'Tomas',
            lastName: 'Barcojo',
            email: 'tomasbarcojo@gmail.com',
            username: 'tomi',
            password: 'tomasito15'
        });
        await Supplier.create({
            businessName: 'Activa SRL',
            cuit: '30707651926',
            phone: '3424663535',
            address: '25 de Mayo 2387',
            city: 'Santa Fe',
            CP: '3000',
            bankaccout1: '519925-12'
        });
        for (var i = 0; i < 100; i++) {
            await Supplier.create({
                businessName: faker.company.companyName(),
                cuit: i,
                phone: faker.phone.phoneNumber(),
                address: '25 de Mayo 2387',
                city: faker.address.streetAddress(),
                CP: faker.address.zipCode(),
                bankaccount1: faker.finance.account(),
            });
        }
        for (var i = 0; i < 10; i++) {
            await Category.create({
                categoryName: `Categoria ${i}`,
                image: faker.image.business(),
            });
        }
        for (var i = 0; i < 300; i++) {
            await Article.create({
                articleName: faker.commerce.productName(),
                price: faker.commerce.price(),
                stock: '10',
                image: faker.image.business(),
                categoryId: Math.floor(Math.random() * 10) + 1,
                supplierId: Math.floor(Math.random() * 100) + 1
            })
        }
        for (var i = 0; i < 600; i++) {
            await Client.create({
                businessName: faker.internet.userName(),
                cuit: i,
                address: faker.address.streetName(),
                city: faker.address.cityName(),
                CP: faker.address.zipCode(),
                phone: faker.phone.phoneNumber(),
                altphone: faker.phone.phoneNumber()
            })
        }
        // await Article.create({
        //     articleName: 'Prueba articulo 2',
        //     price: '1000',
        //     stock: '10',
        //     image: '8719',
        //     categoryId: 1,
        //     supplierId: 1
        // })
        // await Article.create({
        //     articleName: 'Prueba articulo 3',
        //     price: '1000',
        //     stock: '10',
        //     image: '8719',
        //     categoryId: 1,
        //     supplierId: 2
        // })
        return res.send('LISTO')
      }
}