console.log(`db config is loaded`)

var mg          = require('mongoose')

mg.connect('mongodb://localhost/storeDB', function(err){
  if (err){
    console.log(`Unable to establish connection`)
    console.log(err)
  } else {
    console.log(`Connection to DB established`)
  }
})
