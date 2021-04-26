import routes from './pages';

console.log('routes: ', routes);

const express = require('express')
const app = express()
const port = 3000

app.get('/', routes.main)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})