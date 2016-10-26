console.log(`Loaded customers controller`)

var Customer = require('../models/customer')

function dbError(action, error){
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(`Error in ** ${action} **`)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(error)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}

module.exports = {
  dashBoard: function(req, res, next){
    Customer.find({})
           .sort({'createdAt': -1})
           .limit(5)
           .exec(function(err, lastestCustomers){
              if (!err){
               res.json(lastestCustomers)
              } else {
               dbError('Cusotmer DashBoard', err)
              }
            })
  },
// -----------------------------------------------------------------------------
  index: function(req, res, next){
    Customer.find({})
            .exec(function(err, allCustomers){
              if (!err){
                res.json(allCustomers)
              } else {
                dbError('Customer Index', err)
              }
            })
  },
// -----------------------------------------------------------------------------
  add: function(req, res, next){
    let customer = new Customer
    customer.name= req.body['name']
    customer.save(function(err, savedCustomer){
      if (!err){
        res.json(savedCustomer)
      } else {
        dbError('Customer Add', err)
      }
    })
  },
// -----------------------------------------------------------------------------
  delete: function(req, res, next){
    Customer.findByIdAndRemove(req.params['id'])
            .exec(function(err){
              if (!err){
                res.json({deleted: true})
              } else {
                dbError('Customer Delete', err)
              }
            })
  }
}
