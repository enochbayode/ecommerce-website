const { mainrouter } = require('./routes/main');
const { authrouter } = require('./routes/auth');
const { cartrouter } = require('./routes/cart')

module.exports = (app) => {
  app.use(mainrouter);

  app.use('/user', authrouter);
  app.use('/cart', cartrouter);
  

};
