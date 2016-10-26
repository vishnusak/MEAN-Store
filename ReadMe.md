# mini MEAN Store - NodeJS / Express / Angular / MongoDB

## Routing

  Client Route         |    Server Route    | Server Method
  :-------------------:|:-------------------|:-------------:
  `/dashboard`         |`/productDashboard` | GET
                       |`/orderDashboard`   | GET
                       |`/customerDashboard`| GET
  `/products`          |`/product`          | GET
                       |`/product`          | POST
  `/orders`            |`/order`            | GET
                       |`/order`            | POST
                       |`/product/:id`      | PUT
  `/customers`         |`/customer`         | GET
                       |`/customer`         | POST
                       |`/customer/:id`     | DELETE

## Partials

 The base HTML is `/client/static/index.html`

 Tab      | Description                                | File Location
 :-------:|--------------------------------------------|--------------
 Dashboard| Store Dashboard                            | `/client/partials/dashboard.html`
 Products | Show all products and add new product      | `/client/partials/products.html`
 Orders   | Show all orders and add new order          | `/client/partials/orders.html`
 Customers| Show all customers and add/delete customers| `/client/partials/customers.html`

## DB Schema
  - customer Schema:
  ```
  var CustomerSchema = new mg.Schema({
      name: {type: String, unique: true}
  },
  {
      timestamps: true
  })
  ```

  - order Schema:
  ```
  var OrderSchema = new mg.Schema({
      custName: String,
      pdtName: String,
      orderQty: Number
  },
  {
      timestamps: true
  })
  ```

  - product Schema:
  ```
  var ProductSchema = new mg.Schema({
      name: String,
      img: String,
      url: String,
      desc: String,
      quantity: Number
  },
  {
      timestamps: true
  })
  ```

## Dependencies

  On     | Name             | Version | Description
  :-----:|:----------------:|:-------:|----------------------------
  Server | express          | 4.14.0  | web-server
  Server | body-parser      | 1.15.2  | package for parsing requests
  Server | mongoose         | 4.6.5   | mongoDB driver API
  Server | request          | 2.75.0  | make http requests to external URLs
  Client | angular          | 1.5.8   | front-end framework
  Client | angular-route    | 1.5.8   | angular plug-in for routing

#### Notes

  - All the data input forms have a basic front-end validation to make sure empty / incomplete info is not sent and stored.

  - Am downloading the picture from the product url, storing it locally on disk and displaying the image from the disk. Just to avoid hot-linking issues.
    - This poses 2 problems:
      - Handling the image size on-disk - which I haven't done anything about.
      - Naming the on-disk images so that existing images don't get overridden by new ones - took a very rudimentary approach to this by appending a serial number to the end of the image name.

  - After installing via `npm install`, copy the angular related files into the `/client/static/js` and use them from there.
