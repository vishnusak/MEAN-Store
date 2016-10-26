console.log(`Loaded order model`)

var mg = require('mongoose')

var OrderSchema = new mg.Schema({
  custName: String,
  pdtName: String,
  orderQty: Number
},
{
  timestamps: true
})

var Orders = mg.model("Order", OrderSchema)

module.exports = Orders
