const { Pricelist, User, Userpricelist, Client, Article } = require('../db.js')
const { Op } = require('sequelize')

module.exports = {
  async getPriceLists(req, res) {
    try {
      const pricelist = await Userpricelist.findAll({ include: [Article, Pricelist] });
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
    var sendData = {}
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
      await Pricelist.create({ priceListName: priceListName }).then(result => {
        // for (var i = 0; i < data.length; i++) {
        //   Userpricelist.create({ percentage: data[i].percentage, pricelistId: result.id, articleId: data[i].articleId })
        // }
        const pepe = Userpricelist.bulkCreate(data, {pricelistId: result.id})
        // sendData = Userpricelist.findAll({where: {pricelistId: result.id}})
      });
      return res.status(201).send({ pepe, status: 201 })
      // si es necesario puedo crear un array y pushear los elementos userpricelist creados para despues devolverlos
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Failed to create price list' });
    }
  },

  async editPricelist(req, res) {
    try {
      const { priceListName, data } = req.body
      if (!priceListName || !data) {
        return res.status(400).send({ message: 'Necesary data required', status: 400 })
      }
      const pricelist = await Pricelist.findOne({ where: { priceListName: priceListName } });
      if (pricelist) {
        return res.status(400).send({ message: "Price list already exists", status: 400 });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Failed to edit price list' });
    }
  },

  async getPriceListsById(req, res) {
    const { id } = req.params;
    try {
      await Userpricelist.findAll({ where: { pricelistId: id }, include: [Article, Pricelist] })
        .then((pricelist) => {
          if (!pricelist) return res.status(404).send({ message: 'Invalid id' })
          return res.status(200).json(pricelist)
        })
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Failed to get price list by id' });
    }
  }
}