const { Pricelist, User, Userpricelist, Client } = require('../db.js')
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
      const { priceListName, percentage } = req.body
      if (!priceListName || !percentage) {
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
      const priceListData = { priceListName, percentage };
      const newPriceList = await Pricelist.create(priceListData)
      return res.status(201).send({ newPriceList, status: 201 })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to create price list' })
    }
  },

  async createPriceList2(req, res) {
    const testPricelist = await Pricelist.create({ priceListName: 'Pricelist test 1'});
    const testClient = await Client.create({
      businessName: 'test',
      cuit: 'test',
      address: 'test',
      city: 'test',
      CP: 'test',
      phone: 'test',
      altPhone: 'test',
      pricelistId: 1,
    });

    await testClient.addPricelist(testPricelist, { through: { percentage: 12 }})
    // const queen = await Userpricelist.create({ percentage: 10 });
    // await amidala.addProfile(queen, { through: { Userpricelist: false } });
    // const result = await Client.findOne({
    //     where: { businessName: 'test222' },
    //     include: Pricelist
    // });

    const result = await Client.findAll({
      include: Pricelist
    })
    // console.log(result);
    return res.status(200).send(result)
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