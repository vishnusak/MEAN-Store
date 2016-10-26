console.log(`Loaded customer model`)

var mg = require('mongoose')

var CustomerSchema = new mg.Schema({
  name: {type: String, unique: true}
},
{
  timestamps: true
})

var Customers = mg.model("Customer", CustomerSchema)

module.exports = Customers
