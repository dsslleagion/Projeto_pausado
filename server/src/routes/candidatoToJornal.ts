import { Router } from "express";
import {CandidatoToJornalController} from "../controllers";

const router = Router()

router.get('/all', CandidatoToJornalController.getAll)
router.get('/one/:uuid', CandidatoToJornalController.getOne)
router.get('/allCan/:uuid', CandidatoToJornalController.getOneIdCandidato)
router.post('/post/', CandidatoToJornalController.post)
router.put('/put/:uuid', CandidatoToJornalController.put)
router.delete('/delete/:uuid', CandidatoToJornalController.delete)

export default router