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
    try {
      const { priceListName, data } = req.body;
      if (!priceListName || !data) return res.status(400).send({ message: 'Necesary data required', status: 400 });
      let createdUPL = [];
      let arrData = [];
      const result = await Pricelist.create({ priceListName: priceListName });
      for (const e of data) {
        const item = await Userpricelist.create({ percentage: e.percentage, pricelistId: result.id, articleId: e.articleId });
        createdUPL.push(item);
      }
      for (const e of createdUPL) {
        const item = await Userpricelist.findAll({ where: { pricelistId: e.pricelistId }, include: [Article, Pricelist] });
        arrData.push(item)
      }
      return res.status(201).send({ arrData, status: 201 })
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