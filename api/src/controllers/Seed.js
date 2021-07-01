const { User, Supplier, Category, Article } = require('../db.js')
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
        await Category.create({
            categoryName: 'Celulares',
            image: '54',
        });
        await Article.create({
            articleName: 'Prueba articulo 1',
            price: '1000',
            stock: '10',
            image: '8719',
            categoryId: 1,
            supplierId: 1
        })
        await Article.create({
            articleName: 'Prueba articulo 2',
            price: '1000',
            stock: '10',
            image: '8719',
            categoryId: 1,
            supplierId: 1
        })
        await Article.create({
            articleName: 'Prueba articulo 3',
            price: '1000',
            stock: '10',
            image: '8719',
            categoryId: 1,
            supplierId: 2
        })
        return res.send('LISTO')
      }
}