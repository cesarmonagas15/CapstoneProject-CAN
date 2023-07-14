const app = require('./app');
const { PORT } = require('./config');
app.listen(PORT, function () {
  console.log(`:rocket: Server running on http://localhost:${PORT}`);
});