app.controller('headerController', ['$scope', '$rootScope', function($scope, $rootScope){
  $scope.head = {}

  $scope.head['dashclass'] = ''
  $scope.head['pdtclass']  = ''
  $scope.head['ordclass']  = ''
  $scope.head['custclass'] = ''

  $rootScope.$on('pageLoad', function(event, data){
    switch (data){
      case '/products':
        $scope.head['dashclass'] = ''
        $scope.head['pdtclass']  = 'clicked'
        $scope.head['ordclass']  = ''
        $scope.head['custclass'] = ''
        break
      case '/orders':
        $scope.head['dashclass'] = ''
        $scope.head['pdtclass']  = ''
        $scope.head['ordclass']  = 'clicked'
        $scope.head['custclass'] = ''
        break
      case '/customers':
        $scope.head['dashclass'] = ''
        $scope.head['pdtclass']  = ''
        $scope.head['ordclass']  = ''
        $scope.head['custclass'] = 'clicked'
        break
      default:
        $scope.head['dashclass'] = 'clicked'
        $scope.head['pdtclass']  = ''
        $scope.head['ordclass']  = ''
        $scope.head['custclass'] = ''
    }
  })
}])

// -------------------------------------------------------------------------
app.controller('dashController', ['$scope', '$rootScope', 'storeFactory', function($scope, $rootScope, SF){

  $rootScope.$emit('pageLoad', '/dashboard')

  var serverRoute = ''

  $scope.dash     = {}

  $scope.dash['filter'] = ""

  serverRoute = '/productDashboard'
  SF.getDashRows(serverRoute)
  .then(function(products){
    $scope.dash['products'] = products.data
  }, function(err){
    console.log(`Error retrieving Product data from server`)
    console.log(err)
  })

  serverRoute = 'orderDashboard'
  SF.getDashRows(serverRoute)
  .then(function(orders){
    for (i in orders.data){
      let time = Math.round((((new Date() - new Date(orders.data[i]['createdAt']))/1000)/60)/60)

      if (time){
        orders.data[i]['time'] = `${time} hour(s)`
      } else {
        time = Math.round(((new Date() - new Date(orders.data[i]['createdAt']))/1000)/60)
        orders.data[i]['time'] = `${time} min(s)`
      }
    }
    $scope.dash['orders'] = orders.data
  }, function(err){
    console.log(`Error retrieving Order data from server`)
    console.log(err)
  })

  serverRoute = 'customerDashboard'
  SF.getDashRows(serverRoute)
  .then(function(customers){
    for (i in customers.data){
      let time = Math.round((((new Date() - new Date(customers.data[i]['createdAt']))/1000)/60)/60)

      if (time){
        customers.data[i]['time'] = `${time} hour(s)`
      } else {
        time = Math.round(((new Date() - new Date(customers.data[i]['createdAt']))/1000)/60)
        customers.data[i]['time'] = `${time} min(s)`
      }
    }
    $scope.dash['customers'] = customers.data
  }, function(err){
    console.log(`Error retrieving Customer data from server`)
    console.log(err)
  })

}])

// -------------------------------------------------------------------------
app.controller('productController', ['$scope', '$rootScope', 'storeFactory', function($scope, $rootScope, SF){

  $rootScope.$emit('pageLoad', '/products')

  var serverRoute = "/product",
      newProduct  = {}

  $scope.pdt           = {}
  $scope.pdt['search'] = ""

  function getProducts(serverRoute){
    SF.getAllRows(serverRoute)
    .then(function(products){
      $scope.pdt['products'] = products.data
    })
  }

  getProducts(serverRoute)

  $scope.addNewProduct = function(){
    newProduct['name']     = $scope.pdt['name']
    newProduct['url']      = $scope.pdt['url']
    newProduct['desc']     = $scope.pdt['desc']
    newProduct['quantity'] = $scope.pdt['quantity']

    for (key in newProduct){
      if (!newProduct[key]){
        $scope.pdt['error'] = "*Please fill in all the fields"
        break
      }
      $scope.pdt['error'] = ''
    }

    if (!$scope.pdt['error']){
      SF.addRow(serverRoute, newProduct)
      .then(function(){
        $scope.pdt['name']    = ''
        $scope.pdt['url']     = ''
        $scope.pdt['desc']    = ''
        $scope.pdt['quantity']= ''
        getProducts(serverRoute)
      })
    }
  }
}])

// -------------------------------------------------------------------------
app.controller('customerController', ['$scope', '$rootScope', 'storeFactory', function($scope, $rootScope, SF){

  $rootScope.$emit('pageLoad', '/customers')

  var serverRoute = '/customer',
      newCust     = {}

  $scope.cust = {}
  $scope.cust['name'] = ''
  $scope.cust['search'] = ''

  function getCustomers(serverRoute){
    SF.getAllRows(serverRoute)
    .then(function(customers){
      let data = customers.data
      for (i in data){
        data[i]['createdAt'] = new Date(data[i]['createdAt']).toDateString()
      }

      $scope.cust['customers'] = customers.data
    })
  }

  getCustomers(serverRoute)

  $scope.addCust = function(){
    if ($scope.cust['name']){
      $scope.cust['error'] = ''
      newCust['name'] = $scope.cust['name']
      SF.addRow(serverRoute, newCust)
      .then(function(){
        $scope.cust['name'] = ''
        getCustomers(serverRoute)
      })
    } else {
      $scope.cust['error'] = "*Please fill in customer name"
    }
  }

  $scope.deleteCust = function(id){
    SF.delRow(serverRoute, id)
    .then(function(){
      getCustomers(serverRoute)
    })
  }

}])

// -------------------------------------------------------------------------
app.controller('orderController', ['$scope', '$rootScope', 'storeFactory', function($scope, $rootScope, SF){

  $rootScope.$emit('pageLoad', '/orders')

  var pdtRoute   = "/product",
      custRoute  = "/customer",
      serverRoute="/order",
      newOrder   = {}

  $scope.ord              = {}
  $scope.ord['custName']  = {}
  $scope.ord['pdtName']   = {}
  $scope.ord['orderQty']  = ''
  $scope.ord['customers'] = []
  $scope.ord['products']  = []
  $scope.ord['quantity']  = []
  $scope.ord['orders']    = []
  $scope.ord['filter']    = ""

  function getOrders(serverRoute){
    SF.getAllRows(serverRoute)
    .then(function(orders){
      let allOrders = orders.data
      for (i in allOrders){
        allOrders[i]['createdAt'] = new Date(allOrders[i]['createdAt']).toDateString()
        $scope.ord['orders'] = orders.data
      }
    })
  }

  function getCustomers(custRoute){
    SF.getAllRows(custRoute)
    .then(function(customers){
      $scope.ord['customers'] = customers.data
    })
  }

  function getProducts(pdtRoute){
    SF.getAllRows(pdtRoute)
    .then(function(products){
      $scope.ord['products'] = products.data
    })
  }

  getOrders(serverRoute)
  getCustomers(custRoute)
  getProducts(pdtRoute)

  $scope.getQty = function(selectedPdt){
    if (selectedPdt){
      $scope.ord['quantity'] = []
      $scope.ord['orderQty'] = ''

      for (let i = 1; i <= selectedPdt['quantity']; i++){
        $scope.ord['quantity'].push(i)
      }

      $scope.ord['pdtID'] = selectedPdt['_id']
      $scope.ord['pdtQty']= selectedPdt['quantity']
    }
  }

  $scope.saveOrder = function(){
    if (('name' in $scope.ord['custName']) && ('name' in $scope.ord['pdtName']) && ($scope.ord['orderQty'])){
      $scope.ord['error'] = ''
      newOrder['custName'] = $scope.ord['custName']['name']
      newOrder['pdtName']  = $scope.ord['pdtName']['name']
      newOrder['orderQty'] = $scope.ord['orderQty']

      SF.addRow(serverRoute, newOrder)
      .then(function(){
        $scope.ord['custName'] = ''
        $scope.ord['pdtName']  = ''
        $scope.ord['orderQty'] = ''

        getOrders(serverRoute)

        $scope.ord['pdtQty'] = $scope.ord['pdtQty'] - newOrder['orderQty']
        SF.modRow(pdtRoute, $scope.ord['pdtID'], {quantity: $scope.ord['pdtQty']})
        .then(function(){
          getProducts(pdtRoute)
        })
      })
    } else {
      $scope.ord['error'] = "*Please fill in all the fields"
    }
  }
}])
