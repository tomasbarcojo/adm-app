const { Category } = require('../db.js')

module.exports = {
  async getCategories(req, res) {
    try {
      const categories = await Category.findAll()
      if (categories && categories.length === 0) {
        return res.status(404).send({ message: 'No categories', status: 404 })
      }
      return res.status(200).send({categories, status: 200})
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get categories' })
    }
  },

  async createCategory(req, res) {
    const { categoryName, image, obs } = req.body
    if (!categoryName || !image) {
      return res.status(400).send({ message: 'Necesary data required', status: 400 })
    }
    try {
      const category = await Category.findOne({ where: { categoryName: categoryName }})
      if (category) {
        return res.status(400).send({ message: "Category already exists", status: 400 });
      }
      const categoryData = { categoryName, image, obs };
      const newCategory = await Category.create(categoryData)
      return res.status(201).send({ newCategory, status: 201 })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  },
};