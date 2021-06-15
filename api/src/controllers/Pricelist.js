const { Pricelist, User, Userpricelist, Client, Article } = require('../db.js')
const { Op } = require('sequelize')

module.exports = {
  async getPriceLists(req, res) {
    try {
      const pricelist = await Pricelist.findAll();
      if (pricelist && pricelist.length === 0) {
        return res.status(404).send({ message: 'No price lists', status: 404 })
      }
      return res.status(200).send({ pricelist, status: 200 })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get price lists' })
    }
  },

  async createPriceList(req, res) {
    try {
      const { priceListName, data } = req.body
      if (!priceListName || !data) {
        return res.status(400).send({ message: 'Necesary data required', status: 400 })
      }
      // const pricelist = await Pricelist.findOne({
      //   where: {
      //     [Op.or]: [
      //       {
      //         priceListName: {
      //           [Op.iLike]: `%${priceListName}%`,
      //         },
      //       },
      //       {
      //         percentage: percentage,
      //       },
      //     ],
      //   },
      // })
      // if (pricelist) {
      //   return res.status(400).send({ message: "Price list already exists", status: 400 });
      // }
      await Pricelist.create({pricelistName: priceListName});
      const idPricelist = Pricelist.findOne({
        where: { priceListName: priceListName}
      })
      for (var i = 0; i < data.length; i++) {
        Userpricelist.create({percentage: data.percentage, pricelistId: idPricelist.id, articleId: data.articleId})
      }
      return res.status(201).send({ newPriceList, status: 201 });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Failed to create price list' });
    }
  },

  async createPriceList2(req, res) {
    const testPricelist = await Pricelist.create({ priceListName: 'Pricelist test 1'});
    await Article.create({
      articleName: 'Articulo prueba1',
      price: '10',
      stock: '10',
      image: 'asd',
      obs: 'asd'
    })
    await Userpricelist.create({percentage: 10, pricelistId: 1, articleId: 1})
    // await Userpricelist.create({percentage: 15, pricelistId: 1, articleId: 1})
    // const testClient = await Client.create({
    //   businessName: 'test',
    //   cuit: 'test',
    //   address: 'test',
    //   city: 'test',
    //   CP: 'test',
    //   phone: 'test',
    //   altPhone: 'test',
    //   pricelistId: 1,
    // });


    // await testClient.addPricelist(testPricelist, { through: { percentage: 12 }})
    // const queen = await Userpricelist.create({ percentage: 10 });
    // await amidala.addProfile(queen, { through: { Userpricelist: false } });
    // const result = await Client.findOne({
    //     where: { businessName: 'test222' },
    //     include: Pricelist
    // });

    // const result = await Client.findAll({
    //   include: Pricelist
    // })
    // console.log(result);
    return res.status(200).send('Hecho')
  },

  async test(req, res) {

    // const result = await Userpricelist.findAll({
    //   include: Pricelist
    // })
    const result = await Userpricelist.findAll({ include: [Client, Pricelist] });
    // console.log(result);
    return res.status(200).send(result)
  }
}


/* cada vez que el usuario relaliza un cambio en el listado de precio

LOS LISTADOS DE PRECIO SON 1 PARA CADA CLIENTE, SI UN CLIENTE TIENE OTRO TIPO DE LISTADO SE LE CREA UN NUEVO LISTADO A ESE CLIENTE
POR LO TANTO PUEDO TENER LISTADOS "DEFAULT" Y LISTADOS PERSONALIZADOS

AHORA: DE QUE MANERA GUARDO ESOS LISTADOS?

LOS DEFAULT SE CREAN Y CHAU, LUEGO AL CREAR EL CLIENTE SE DEBERIA PODER ASOCIAR ESE LISTADO DEFAULT
CON LOS OTROS PERSONALIZADOS LO MISMO.

MANERA DE GUARDAR EN BASE DE DATOS?
1 LISTADO VA A TENER MUCHOS ARTICULOS
MUCHOS ARTICULOS VAN A TENER MUCHOS LISTADOS


*/