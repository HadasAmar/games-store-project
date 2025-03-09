import { Router } from "express";
import bodyParser from "body-parser";
import gameController from "../controller/gameController.js";


const gameRoute=Router()
gameRoute.use(bodyParser.json())

gameRoute.get('/',gameController.getAll)
gameRoute.post('/',gameController.add)
gameRoute.put('/:id',gameController.update)
gameRoute.delete('/:id',gameController.delete)
gameRoute.get('/byCategory/:id',gameController.getByCategory)

export default gameRoute