import { Router } from "express";
import CandidatoController from "../controllers/CandidatoController";

const routes = Router();

routes.get('/all', CandidatoController.getAll)
routes.get('/one/:uuid', CandidatoController.getOne)
routes.post('/post/', CandidatoController.post)
routes.put('/put/:uuid',CandidatoController.put)
routes.delete('/delete/:uuid', CandidatoController.delete)

export default routes;