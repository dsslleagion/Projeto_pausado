import { Router } from "express";
import { SobreController } from "../controllers/";


const routes = Router();


routes.get('/all', SobreController.getAll)
routes.get('/one/:uuid', SobreController.getOne)
routes.post('/post/',SobreController.post)
routes.put('/put/:uuid',SobreController.put)
routes.delete('/delete/:uuid', SobreController.delete)




export default routes;