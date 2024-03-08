import { Router } from "express";
import { NoticiaController as NoticiaController } from "../controllers";

const routes = Router();


routes.get('/all', NoticiaController.getAll);
routes.get('/one/:uuid', NoticiaController.getOne);
routes.post('/post', NoticiaController.store);
routes.put('/put/:uuid', NoticiaController.update);
routes.delete('/delete/:uuid', NoticiaController.destroy);



export default routes;