import { Router } from "express";
import bodyParser from "body-parser";
import orderController from "../controller/orderController.js";


const orderRoute=Router()
orderRoute.use(bodyParser.json())

orderRoute.get('/',orderController.getAll)
orderRoute.get('/byOrder/:id',orderController.getByOrder)
orderRoute.get('/getByUser/:id',orderController.getByUser)
orderRoute.delete('/:id',orderController.delete)
orderRoute.post('/',orderController.createOrder)

export default orderRoute