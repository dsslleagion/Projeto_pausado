import { Router } from "express";
import {TribunaToNoticiaController} from "../controllers";

const router = Router()

router.get('/all', TribunaToNoticiaController.getAll)
router.get('/one/:uuid', TribunaToNoticiaController.getOne)
router.get('/allTri/:uuid', TribunaToNoticiaController.getOneIdTribuna)
router.post('/post/', TribunaToNoticiaController.post)
router.put('/put/:uuid', TribunaToNoticiaController.put)
router.delete('/delete/:uuid', TribunaToNoticiaController.delete)

export default router