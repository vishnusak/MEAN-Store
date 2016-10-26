console.log(`Loaded routes.js`)

var products = require('../controllers/products'),
    orders   = require('../controllers/orders'),
    customers= require('../controllers/customers')

module.exports = function(app){
  app.get('/productDashboard', products.dashBoard)
  app.get('/orderDashboard', orders.dashBoard)
  app.get('/customerDashboard', customers.dashBoard)

  app.get('/product', products.index)
  app.post('/product', products.add)
  app.put('/product/:id', products.edit)
  // app.put('/product/:id', products.update)

  app.get('/customer', customers.index)
  app.post('/customer', customers.add)
  app.delete('/customer/:id', customers.delete)

  app.get('/order', orders.index)
  app.post('/order', orders.add)
}
