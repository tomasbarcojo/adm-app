require('dotenv').config()
const { Supplier } = require('../db.js')
const { Op } = require('sequelize')
const sequelize = require('sequelize');

module.exports = {
  async getSuppliers(req, res) {
    try {
      const suppliers = await Supplier.findAll({ limit: 25 })
      if (suppliers && suppliers.length === 0) {
        return res.status(404).send({ message: 'No suppliers', status: 404 })
      }
      return res.status(200).send({ suppliers, status: 200 })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get users' })
    }
  },

  async getSuppliersByName(req, res) {
    try {
      const { name } = req.body;
      name.toLowerCase();
      const suppliers = await Supplier.findAll({
        where: {
          businessName: sequelize.where(sequelize.fn('LOWER', sequelize.col('businessName')), 'LIKE', '%' + name + '%')
        },
        limit: 15
      })
      if (suppliers && suppliers.length === 0) {
        return res.status(404).send({ message: 'No suppliers', status: 404 })
      }
      return res.status(200).send({ suppliers, status: 200 })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get users' })
    }
  },

  async createSupplier(req, res) {
    const { businessName, cuit, phone, altPhone, address, city, CP, bankaccount1, bankaccount2, bankaccount3, obs } = req.body
    if (!businessName || !cuit || !phone || !address || !city || !CP) {
      return res.status(400).send({ message: 'Necesary data required', status: 400 })
    }
    try {
      const supplier = await Supplier.findOne({ where: { cuit: cuit } })
      if (supplier) {
        return res.status(400).send({ message: "Supplier already exists", status: 400 });
      }
      const supplierData = { businessName, cuit, phone, altPhone, address, city, CP, bankaccount1, bankaccount2, bankaccount3, obs };
      const newSupplier = await Supplier.create(supplierData)
      return res.status(201).send({ newSupplier, status: 201 })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },
}