console.log(`Loaded product model`)

var mg = require('mongoose')

var ProductSchema = new mg.Schema({
  name: String,
  img: String,
  url: String,
  desc: String,
  quantity: Number
},
{
  timestamps: true
})

var Products = mg.model("Product", ProductSchema)

module.exports = Products
