const { mainrouter } = require('./routes/main');
const { authrouter } = require('./routes/auth');
const { cartrouter } = require('./routes/cart');
const { itemrouter } = require('./routes/item');

module.exports = (app) => {
  app.use(mainrouter);

  app.use('/user', authrouter);
  app.use('/cart', cartrouter);
  app.use('/item', itemrouter);

};
