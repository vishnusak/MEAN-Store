console.log(`Loaded orders controller`)

var Order = require('../models/order')

function dbError(action, error){
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(`Error in ** ${action} **`)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(error)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}

module.exports = {
  dashBoard: function(req, res, next){
    Order.find({})
         .sort({'createdAt': -1})
         .limit(5)
         .exec(function(err, lastestOrders){
            if (!err){
             res.json(lastestOrders)
            } else {
             dbError('Order DashBoard', err)
            }
          })
  },
// -----------------------------------------------------------------------------
  index: function(req, res, next){
    Order.find({})
         .exec(function(err, allOrders){
          if (!err){
            res.json(allOrders)
          } else {
            dbError('Order Index', err)
          }
         })
  },
// -----------------------------------------------------------------------------
  add: function(req, res, next){
    let order = new Order
    order.custName= req.body['custName']
    order.pdtName = req.body['pdtName']
    order.orderQty= req.body['orderQty']

    order.save(function(err, savedOrder){
      if (!err){
        res.json(savedOrder)
      } else {
        dbError('Order Add', err)
      }
    })
  }
// -----------------------------------------------------------------------------
}
