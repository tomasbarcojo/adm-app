const { Purchase, Supplier, Article, Purchaseproduct } = require('../db.js')
const { Op } = require('sequelize')

module.exports = {
  async getPurchases(req, res) {
    try {
      const purchase = await Purchase.findAll({ include: [Supplier], order: [['updatedAt', 'ASC']] });
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

  async getPurchaseDetailById(req, res) {
    try {
      const purchase = await Purchaseproduct.findAll({ where: { purchaseId: req.params.id }, include: [Article] });
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
      const { supplierId, data, paymentExpirationDate } = req.body;
      if (!supplierId || !data) return res.status(400).send({ message: 'Necesary data required', status: 400 });
      const purchaseData = { supplierId: supplierId, paymentExpirationDate: paymentExpirationDate }
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

  async updateState(req, res) {
    try {
      const purchase = await Purchase.findByPk(req.params.id);
      if (purchase.state !== req.body.state) {
        const updatedPurchase = await purchase.update({
          state: req.body.state
        })
        return res.status(201).send({ updatedPurchase, status: 201 })
      } else {
        return res.status(200).send({ msg: 'The state is the same', status: 200 })
      }
    } catch (err) {
      return res.status(400).send({ message: 'Failed to update state' });
    }
  },
}