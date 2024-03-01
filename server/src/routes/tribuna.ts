import { Router } from "express";
import TribunaController from "../controllers/TribunaController";

const router = Router()

router.get('/all', TribunaController.getAll)
router.get('/one/:uuid', TribunaController.getOne)
router.post('/post/', TribunaController.post)
router.put('/put/:uuid', TribunaController.put)
router.delete('/delete/:uuid', TribunaController.delete)

export default router