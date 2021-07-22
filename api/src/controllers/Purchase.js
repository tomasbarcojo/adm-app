const { Purchase, Supplier, Article, Purchaseproduct } = require('../db.js')
const { Op } = require('sequelize')

module.exports = {
  async getPurchases(req, res) {
    try {
      const purchase = await Purchase.findAll({ include: [Supplier] });
      if (purchase && purchase.length === 0) {
        return res.status(404).send({ message: 'No price lists', status: 404 })
      }
      return res.status(200).send({ purchase, status: 200 })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get price lists' })
    }
  },

  async getPriceListsWithData(req, res) {
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

  async createPurchase(req, res) {
    try {
      const { state, supplierId, data } = req.body;
      if (!state || !supplierId || !data) return res.status(400).send({ message: 'Necesary data required', status: 400 });
      const purchaseData = { state, supplierId }
      const newPurchase = await Purchase.create(purchaseData);
      for (const e of data) {
        await Purchaseproduct.create({
          quantity: e.quantity,
          purchaseId: newPurchase.id,
          price: e.price,
          articleId: e.articleId
        });
      }
      return res.status(201).send({ newPurchase, status: 201 })
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Failed to create price list' });
    }
  },

  async editPricelist(req, res) {
    try {
      const { data } = req.body
      const { id } = req.params
      console.log(data.length)
      if (!data || data.length === 0) {
        return res.status(400).send({ message: 'Necesary data required', status: 400 })
      }
      for (const e of data) {
        Userpricelist.findOne({ where: { pricelistId: id, articleId: e.articleId } }).then(userPL => {
          userPL.percentage = e.percentage;
          userPL.save()
        })
      }
      return res.status(201).send({ message: 'Todo ok', status: 204 })
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Failed to edit price list' });
    }
  },

  async getPriceListsById(req, res) {
    try {
      const { id } = req.params;
      await Userpricelist.findAll({ where: { pricelistId: id }, include: [Article, Pricelist] })
        .then((pricelist) => {
          if (!pricelist) return res.status(404).send({ message: 'Invalid id', status: 404 })
          return res.status(200).send({ pricelist, status: 200 })
        })
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Failed to get price list by id' });
    }
  },

  async deletePriceList(req, res) {
    try {
      const pricelist = await Pricelist.findByPk(req.params.id)
      if (!pricelist) {
        return res.status(404).send({ message: 'Price list not found with provided id', status: 404 })
      }
      pricelist.destroy() // deleting on cascade (userpricelists)
      return res.status(200).send({ pricelist, status: 200 })
    } catch (err) {
      console.log(err)
      return res.status(500).send({ message: 'Failed to delete price list by id', status: 500 });
    }
  }
}