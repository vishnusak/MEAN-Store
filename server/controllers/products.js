console.log(`Loaded products controller`)

var Product = require('../models/product'),
    request = require('request'),
    fs      = require('fs'),
    path    = require('path'),
    count   = 0

function dbError(action, error){
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(`Error in ** ${action} **`)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(error)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}

module.exports = {
  dashBoard: function(req, res, next){
    Product.find({})
           .sort({'createdAt': -1})
           .limit(5)
           .exec(function(err, lastestProducts){
              if (!err){
               res.json(lastestProducts)
              } else {
               dbError('Product DashBoard', err)
              }
            })
  },
// -----------------------------------------------------------------------------
  index: function(req, res, next){
    Product.find({})
           .exec(function(err, allProducts){
              if (!err){
                res.json(allProducts)
              } else {
                dbError('Product Index', err)
              }
            })
  },
// -----------------------------------------------------------------------------
  add: function(req, res, next){

    let filePath = path.join(__dirname, '../../client/static/img/'),
        filePathRelative = '/img/',
        fileName = req.body['name'],
        file     = '',
        isImage  = false

    count++

    request.head(req.body['url'], function(err, httpRes, body){
      if (!httpRes.headers['content-type']){
        fileName = `${fileName}${count}.jpg`
        isImage  = true
      } else if (httpRes.headers['content-type'].substring(0, 5) === 'image'){
        if (httpRes.headers['content-type'].substring(6) === 'jpeg'){
          fileName = `${fileName}${count}.jpg`
          isImage  = true
        }
        if (httpRes.headers['content-type'].substring(6) === 'png'){
          fileName = `${fileName}${count}.png`
          isImage  = true
        }
      }

      if (isImage){
        file = filePath + fileName
        request(req.body['url'])
        .pipe(fs.createWriteStream(file))
        .on('close', function(){
          let newProduct      = new Product()
          newProduct.name     = req.body['name']
          newProduct.img      = `${filePathRelative}${fileName}`
          newProduct.url      = req.body['url']
          newProduct.desc     = req.body['desc']
          newProduct.quantity = req.body['quantity']
          newProduct.save(function(err, savedProduct){
            if (!err){
              res.json(savedProduct)
            } else {
              dbError('Product Add', err)
            }
          })
        })
      } else {
        dbError('Get Image from URL', `The content type returned from the URL - ${req.body['url']} - was not an image`)
      }
    })
  },
// -----------------------------------------------------------------------------
  edit: function(req, res, next){
    if (req.body['quantity'] > 0){
      Product.update({'_id': req.params['id']}, {$set: {'quantity': req.body['quantity']}})
              .exec(function(err, updatedProduct){
                if (!err){
                  res.json(updatedProduct)
                } else {
                  dbError('Product Update', err)
                }
              })

    } else {
      Product.remove({'_id': req.params['id']})
             .exec(function(err){
               if (!err){
                 res.json({deleted: true})
               } else {
                 dbError('Product Delete', err)
               }
             })
    }
  }
}
