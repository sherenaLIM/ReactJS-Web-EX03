// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

// custom route handler for POST /customers
server.post('/customers', (req, res, next) => {
  const db = router.db;
  const customers = db.get('customers');
  const lastCustomer = customers.value().slice(-1)[0];
  const nextId = lastCustomer ? lastCustomer.id + 1 : 1;
  req.body.id = nextId; // manipulate the id field
  next();
});

server.use(middlewares); // use middlewares after defining custom route handler
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
