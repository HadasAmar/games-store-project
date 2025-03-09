import express from 'express'
import mongoose from 'mongoose'
import categoryRoute from './route/categoryRoute.js'
import gameRoute from './route/gameRoute.js'
import customerRoute from './route/customerRoute.js'
import orderRoute from './route/orderRoute.js'
import cors from 'cors'

const app=express()
app.use(express.static('images'))

app.use(cors())
app.listen('8080',()=>{
    console.log("run:)")
})

app.use('/categories',categoryRoute)
app.use('/games',gameRoute)
app.use('/customers',customerRoute)
app.use('/orders',orderRoute)

mongoose.connect('mongodb://0.0.0.0:27017/gameStore')
.then(()=>{
    console.log("The connection was successful")
})
.catch((err)=>{
    console.log(err.message)
})