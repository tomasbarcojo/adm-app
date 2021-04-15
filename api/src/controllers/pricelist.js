const { Pricelist } = require('../db.js')

module.exports = {
    async getPriceLists(req, res) {
      try {
        const pricelist = await Pricelist.findAll();
        if (pricelist && pricelist.length === 0) {
          return res.status(404).send({ message: 'No price lists', status: 404 })
        }
        return res.status(200).send({pricelist, status: 200})
      } catch (err) {
        console.log(err)
        return res.status(400).send({ message: 'Failed to get price lists' })
      }
    },

    async createPriceList(req, res) {
        try {

        } catch (err) {
            console.log(err)
            return res.status(400).send({ message: 'Failed to create price list' })
        }
    }
  }