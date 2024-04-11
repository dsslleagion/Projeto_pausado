import { Router } from 'express';
import EstatisticasController from '../controllers/EstatisticasController';

const routes = Router();

routes.get('/cliente/:clienteId/interesse-tribunas', EstatisticasController.getInteresseTribunasPorCliente);
routes.get('/intencao-voto/clientes', EstatisticasController.getIntencaoVotoPorCliente);
routes.get('/interesse-tribunas/clientes', EstatisticasController.getInteresseClientesPorTribuna);
routes.get('/candidato/:candidatoId/intencao-voto', EstatisticasController.getIntencaoVotoPorCandidato);

export default routes;
