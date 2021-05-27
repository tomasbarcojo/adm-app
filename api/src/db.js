require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const UserPricelist = require('./models/UserPricelist');
const { ClientRequest } = require('http');
const {  DB_USER, DB_PASSWORD, DB_HOST,} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/activa`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { User, Supplier, Client, Pricelist, Article, Category, Userpricelist } = sequelize.models;

// Aca vendrian las relaciones
// Relaciones:


/*
Pricelist guarda nombre 
Userpricelist porcentaje TABLA INTERMEDIA

1 CLIENTE TIENE 1 Pricelist
N PRICELIST TIENEN M Client

id pricelist

id --> Userpricelist para aplicarle los descuentos

*/


Pricelist.belongsToMany(Article, { through: Userpricelist });
Article.belongsToMany(Pricelist, { through: Userpricelist });

Pricelist.hasMany(Client, {foreignKey: 'pricelistId', sourcekey: 'id'});
Client.belongsTo(Pricelist, {foreignKey: 'pricelistId', sourcekey: 'id'});




// Pricelist.hasMany(Client);
// Client.belongsTo(Pricelist);

// Article.belongsTo(Category);
// Article.belongsTo(Supplier);

// Article.belongsToMany(Pricelist, { through: Userpricelist });
// Pricelist.belongsToMany(Article, { through: Userpricelist });

// Userpricelist.belongsTo(Article)
// Userpricelist.belongsTo(Pricelist)


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};