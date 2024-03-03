import { Router } from "express";
import FormularioController from "../controllers/FormularioController";


const routes =  Router();

routes.get('/all', FormularioController.getAll)
routes.get('/one/:uuid', FormularioController.getOne)
routes.post('/post/', FormularioController.post)
routes.put('/put/:uuid',FormularioController.put)
routes.delete('/delete/:uuid', FormularioController.delete)

export default routes;