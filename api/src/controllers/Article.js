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

  async getArticlesBySupplierId(req, res) {
    try {
      const { id } = req.params
      const articles = await Article.findAll({where: {supplierId: id}})
      if (articles && articles.length === 0) {
        return res.status(404).send({ message: 'No articles', status: 404 })
      }
      return res.status(200).send({articles, status: 200})
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: 'Failed to get articles' })
    }
  },

  async getArticlesByCategoryId(req, res) {
    try {
      const { id } = req.params
      const articles = await Article.findAll({where: {categoryId: id}})
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
    const { articleName, categoryId, supplierId, price, stock, image, obs } = req.body
    if (!articleName || !categoryId || !supplierId || !price || !stock || !image || !obs) {
      fs.unlink(path.join(__dirname, `../../public/images/${image}`), function(err) {
        if (err) throw err;
      })
      return res.status(400).send({ message: 'Necesary data required', status: 400 })
    }
    try {
      const article = await Article.findOne({ where: { articleName: articleName }})
      if (article) {
        fs.unlink(path.join(__dirname, `../../public/images/${image}`), function(err) {
          if (err) throw err;
        })
        return res.status(400).send({ message: "Article already exists", status: 400 });
      }
      const articleData = { articleName, categoryId, supplierId, price, stock, image, obs };
      const newArticle = await Article.create(articleData)
      return res.status(201).send({ newArticle, status: 201 })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  }
}