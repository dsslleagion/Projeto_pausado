import { Router } from "express";
import {ClienteToCandidatoController} from "../controllers";

const router = Router()

router.get('/all', ClienteToCandidatoController.getAll)
router.get('/one/:uuid', ClienteToCandidatoController.getOne)
router.get('/allCan/:uuid', ClienteToCandidatoController.getOneIdClient)
router.post('/post/', ClienteToCandidatoController.post)
router.put('/put/:uuid', ClienteToCandidatoController.put)
router.delete('/delete/:uuid', ClienteToCandidatoController.delete)

export default router