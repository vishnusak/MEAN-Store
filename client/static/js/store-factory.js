app.factory('storeFactory', ['$http', function($http){
  var factory = {}

  factory.getAllRows = function(serverRoute){
    return $http({
      method: 'GET',
      url: serverRoute
    })
  }

  factory.getDashRows = function(serverRoute){
    return $http({
      method: 'GET',
      url: serverRoute
    })
  }

  factory.addRow = function(serverRoute, newRow){
    return $http({
      method: 'POST',
      url: serverRoute,
      data: newRow
    })
  }

  factory.delRow = function(serverRoute, id){
    return $http({
      method: 'DELETE',
      url: `${serverRoute}/${id}`
    })
  }

  factory.modRow = function(serverRoute, id, newData){
    return $http({
      method: 'PUT',
      url: `${serverRoute}/${id}`,
      data: newData
    })
  }

  return factory
}])
