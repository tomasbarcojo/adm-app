require('dotenv').config()
const { User } = require('../db.js')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const hashPassword = (password) => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return reject(err)
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return reject(err)
      return resolve(hash)
    })
  })
});

User.addHook('beforeCreate', (user) => hashPassword(user.password)
  .then((newPassword) => {
    user.set('password', newPassword)
  })
  .catch((err) => {
    if (err) console.log(err)
  }));

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.findAll()
      if (users && users.length === 0) {
        return res.status(404).send({ message: 'No users' })
      } else {
        return res.status(200).send(users)
      }
    } catch (err) {
      console.log(err)
      return res.status(500).send({ message: 'Failed to get users' })
    }
  },

  async createUser(req, res) {
    const { firstName, lastName, username, email, password } = req.body
    if (!firstName || !lastName || !username || !email || !password) {
      res.status(401).send({ message: 'Data required', status: 401 })
    }
    try {
      const user = await User.findOne({ where: { email: email } })
      if (user) {
        return res.status(400).send({ message: "User already exists", status: 400 });
      }
      const userData = { firstName, lastName, username, email, password };
      const newUser = await User.create(userData)
      return res.status(201).send({ newUser, status: 201 })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },

  async loginUser(req, res) {
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        return res.status(400).send({ message: 'Data required' })
      }
      const user = await User.findOne({ where: { username: username } })
      if (!user) {
        return res.status(400).send({ message: "Non-existent account", status: 400 })
      }
      const validate = await bcrypt.compare(password, user.password)
      if (!validate) {
        return res.status(401).send({ message: 'Invalid credentials', status: 401 })
      }
      const token = jwt.sign({
        id: user.id,
        username: user.username,
        password: user.password }, ACCESS_TOKEN_SECRET)
      res.header('auth-token', token)
      res.status(200).send({ token: token, user, status: 200 })
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
        return res.status(404).send({ message: 'User not found', status: 404 })
      }
      return res.status(200).send({user, status: 200})
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },

  // async userLogout(req, res) {
  //   try {
  //     res.status(200).send({ message: 'Disconnected' })
  //   } catch (err) {
  //     console.log(err)
  //     res.status(500).send(err)
  //   }
  // }
}