require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()


//ler json/ middlewares
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

//rotas api
const personRouter = require('./routes/personRoutes')

app.use('/person', personRouter)

//rota inicial
app.get('/', (req, res) => {
    //mostra req
    res.json({ message: 'oi mundo!!' })
})
//entrega uma porta
const DB_USER = process.env.db
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster0.szfrx.mongodb.net/bancoapinode?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Connectamos ao mongoDB")
        app.listen(3000)
    })
    .catch((err) => console.log(err))

