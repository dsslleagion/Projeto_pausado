import cors = require("cors");
import { Router, Request, Response } from "express";

import cliente from "./cliente";
import noticia from "./noticia";
import tribuna from './tribuna';
import candidato from './candidato';
import jornal from './jornal';
import formulario from './formulario';
import clienteToTribuna from './ClienteToTribuna'
import clienteToCandidato from './ClienteToCandidato'
import candidatoToJornal from './candidatoToJornal'
import tribunaToNoticia from './TribunaToNoticia'

const routes = Router()

routes.use(cors());


routes.use("/cliente", cliente);
routes.use("/noticia", noticia);
routes.use("/tribuna", tribuna);
routes.use("/candidato", candidato);
routes.use("/jornal", jornal);
routes.use("/form", formulario);
routes.use('/ct', clienteToTribuna)
routes.use('/cc', clienteToCandidato)
routes.use('/cj', candidatoToJornal)
routes.use('/tn', tribunaToNoticia)

routes.use((req: Request, res: Response) => res.status(404).json({ error: "Requisição desconhecida" }));

export default routes;
