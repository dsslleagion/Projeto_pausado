import { Router } from "express";
import { NoticiaController as NoticiaController } from "../controllers";

const routes = Router();


routes.get('/noticias', NoticiaController.index);
routes.get('/noticias/:id', NoticiaController.show);
routes.post('/noticias', NoticiaController.store);
routes.put('/noticias/:id', NoticiaController.update);
routes.delete('/noticias/:id', NoticiaController.destroy);



export default routes;