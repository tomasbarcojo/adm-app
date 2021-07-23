const { Purchase, Supplier, Article, Purchaseproduct } = require('../db.js')
const { Op } = require('sequelize')

module.exports = {
  async getPurchases(req, res) {
    try {
      const purchase = await Purchase.findAll({ include: [Supplier] });
      if (purchase && purchase.length === 0) {
        return res.status(404).send({ message: 'No purchases', status: 404 })
      }
      return res.status(200).send({ purchase, status: 200 })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get purchases' })
    }
  },

  async getPurchasesById(req, res) {
    try {
      const purchase = await Purchase.findByPk(req.params.id, { include: [Supplier] });
      if (purchase && purchase.length === 0) {
        return res.status(404).send({ message: 'No purchases', status: 404 })
      }
      return res.status(200).send({ purchase, status: 200 })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get purchases' })
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
}