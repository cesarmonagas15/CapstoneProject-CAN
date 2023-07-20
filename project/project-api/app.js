const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { NotFoundError } = require("./utils/errors")

const config = require("./config")
const authRoutes = require("./routes/auth")
const spoonRoutes = require("./routes/spoon")

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get('/', function(req, res) {
  return res.status(200).json({
    ping: 'pong',
  });
});


app.use("/auth", authRoutes)

app.use("/spoon", spoonRoutes)


app.use(function (req, res, next) {
  return next(new NotFoundError())
})


/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (!config.IS_TESTING) console.error(err.stack)
  const status = err.status || 500
  const message = err.message
  return res.status(status).json({
    error: { message, status },
  })
})


module.exports = app