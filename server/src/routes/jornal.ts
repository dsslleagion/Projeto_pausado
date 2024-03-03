import { Router } from "express";
import JornalController from "../controllers/JornalController";


const routes = Router();


routes.get('/all', JornalController.getAll)
routes.get('/one/:uuid', JornalController.getOne)
routes.post('/post/',JornalController.post)
routes.put('/put/:uuid',JornalController.put)
routes.delete('/delete/:uuid', JornalController.delete)




export default routes;