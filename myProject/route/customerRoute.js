import { Router } from "express";
import bodyParser from "body-parser";
import customerController from "../controller/customerController.js";

const customerRoute=Router()
customerRoute.use(bodyParser.json())

customerRoute.post('/',customerController.add)
customerRoute.get('/',customerController.getAll)
customerRoute.put('/',customerController.update)
customerRoute.get('/byCategory/:name/:pass', customerController.getByNameAndPassword);

export default customerRoute