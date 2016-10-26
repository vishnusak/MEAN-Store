var app = angular.module('myApp', ['ngRoute'])

app.config(function($routeProvider){
  $routeProvider
  .when('/dashboard', {
    templateUrl: '/dashboard.html',
    controller: 'dashController'
  })
  .when('/products', {
    templateUrl: '/products.html',
    controller: 'productController'
  })
  .when('/orders', {
    templateUrl: 'orders.html',
    controller: 'orderController'
  })
  .when('/customers', {
    templateUrl: '/customers.html',
    controller: 'customerController'
  })
  .otherwise({
    redirectTo: '/dashboard'
  })
})
