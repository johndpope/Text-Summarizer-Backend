import express from 'express';
import constants from './config/constants';
import './config/database';
import middelwareConfig from './config/middlewares';
import apiRoutes from './modules';
import session from 'express-session';
const app = express();
app.use(session({ secret: 'this is my secret session' }));
middelwareConfig(app);

app.get('/book', (req, res) => {
  res.status(200).send('Hello World!');
});

apiRoutes(app);


app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
       Server running on port: ${constants.PORT}
       ---
       Running on: ${process.env.NODE_ENV}
       ---
       Make something great
       `);
  }
});

module.exports = app;
