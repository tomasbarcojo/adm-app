module.exports = {
    async uploadImage (req, res) {
        const name = req.file.filename
        res.status(201).send(JSON.stringify(name))
      }
}