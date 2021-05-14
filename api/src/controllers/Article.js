const { Article } = require('../db.js')

module.exports = {
  async getArticles(req, res) {
    try {
      const articles = await Article.findAll()
      if (articles && articles.length === 0) {
        return res.status(404).send({ message: 'No articles', status: 404 })
      }
      return res.status(200).send({articles, status: 200})
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get articles' })
    }
  },

  async createArticle(req, res) {
    const { articleName, price, stock, image, obs, categoryId, supplierId } = req.body
    if (!articleName || !price || !stock || !image || !obs || !categoryId || !supplierId) {
      return res.status(400).send({ message: 'Necesary data required', status: 400 })
    }
    try {
      const article = await Article.findOne({ where: { articleName: articleName }})
      if (article) {
        return res.status(400).send({ message: "Article already exists", status: 400 });
      }
      const articleData = { articleName, price, stock, image, obs, categoryId, supplierId };
      const newArticle = await Article.create(articleData)
      return res.status(201).send({ newArticle, status: 201 })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  }
}