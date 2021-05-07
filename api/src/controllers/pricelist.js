const { Pricelist } = require('../db.js')
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
  }
}