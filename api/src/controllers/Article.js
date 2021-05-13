const { Article } = require('../db.js')

module.exports = {
  async getArticles(req, res) {
    try {
      const clients = await Client.findAll()
      if (clients && clients.length === 0) {
        return res.status(404).send({ message: 'No clients', status: 404 })
      }
      return res.status(200).send({clients, status: 200})
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get clients' })
    }
  },

  async createArticle(req, res) {
    const { businessName, cuit, phone, altPhone, address, city, CP, bankaccount1, bankaccount2, bankaccount3, obs } = req.body
    if (!businessName || !cuit || !phone || !address || !city || !CP) {
      return res.status(400).send({ message: 'Necesary data required', status: 400 })
    }
    try {
      const client = await Client.findOne({ where: { cuit: cuit }})
      if (client) {
        return res.status(400).send({ message: "Client already exists", status: 400 });
      }
      const clientData = { businessName, cuit, phone, altPhone, address, city, CP, bankaccount1, bankaccount2, bankaccount3, obs };
      const newClient = await Client.create(clientData)
      return res.status(201).send({ newClient, status: 201 })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },

  async uploadImage (req, res) {
    const name = req.file.filename
    res.status(201).send(JSON.stringify(name))
  }
}