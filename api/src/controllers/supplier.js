require('dotenv').config()
const { Supplier, User } = require('../db.js')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

// const hashPassword = (password) => new Promise((resolve, reject) => {
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return reject(err)
//     bcrypt.hash(password, salt, (err, hash) => {
//       if (err) return reject(err)
//       return resolve(hash)
//     })
//   })
// })

// User.addHook('beforeCreate', (user) => hashPassword(user.password)
//   .then((newPassword) => {
//     user.set('password', newPassword)
//   })
//   .catch((err) => {
//     if (err) console.log(err)
//   }))

module.exports = {
  async getSuppliers(req, res) {
    try {
      const suppliers = await Supplier.findAll()
      if (suppliers && suppliers.length === 0) {
        return res.status(404).send({ message: 'No suppliers', status: 404 })
      }
      return res.status(200).send({suppliers, status: 200})
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
      const supplier = await Supplier.findOne({ where: { cuit: cuit }})
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

  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'Data required' })
    }
    try {
      const user = await User.findOne({ where: { email: email } })
      if (!user) {
        return res.status(400).send({ message: "Non-existent account, please sign in", status: 400 })
      }
      const validate = await bcrypt.compare(password, user.password)
      if (!validate) {
        return res.status(401).json({ message: 'Invalid credentials', status: 401 })
      }
      const token = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET)
      res.header('auth-token', token)
      return res.status(200).send({ token: token, user, status: 200 })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },

  async modifyUser(req, res) {
    const { firstName, lastName, newpassword } = req.body
    try {
      const user = await User.findByPk(req.params.id)
      if (!user) return res.status(404).send('User does not exist')

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      // let changedPassword = await hashPassword(newpassword)
      // user.password = changedPassword || user.password;

      await user.save()
      return res.status(200).send({ user, status: 200 })
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'Something went wrong' })
    }
  },

  async deleteUser(req, res) { // not used
    try {
      User.findByPk(req.params.id)
        .then((user) => {
          user.destroy().then(() => {
            return res.status(200).send({ user, status: 200 })
          })
        })
    } catch (err) {
      return res.status(404).send({ message: 'Invalid ID', status: 404 })
    }
  },

  async getOneUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id)
      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }
      res.status(200).send(user)
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },

  async userLogout(req, res) {
    try {
      return res.send({ message: 'Disconnected' })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  }
}