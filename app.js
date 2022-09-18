const express = require ('express')
require('./dbconfig');
const cors = require('cors')

const gruposRoutes = require ('./routes/grupos')
const contatosRoutes = require ('./routes/contatos')


const app = express()
const port = 8080

app.use(cors());

app.use (
  express.urlencoded({
    extended: true
  })
)

app.use(express.json({
  type : "*/*"
}))


app.use('/api/grupos', gruposRoutes)
app.use('/api/contatos', contatosRoutes)




app.listen(port,() => {
  console.log(`estoy ejecutando http://localhost:${port}`)
})









