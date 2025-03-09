import { Router } from "express";
import bodyParser from "body-parser";
import categoryController from "../controller/categoryController.js";


const categoryRoute=Router()
categoryRoute.use(bodyParser.json())

categoryRoute.get('/',categoryController.getAll)
categoryRoute.post('/',categoryController.add)
categoryRoute.put('/:id',categoryController.update)
categoryRoute.delete('/:id',categoryController.delete)

export default categoryRoute