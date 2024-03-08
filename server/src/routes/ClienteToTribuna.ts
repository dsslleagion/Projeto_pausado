import { Router } from "express";
import {ClienteToTribunaController} from "../controllers/";

const router = Router()

router.get('/all', ClienteToTribunaController.getAll)
router.get('/one/:uuid', ClienteToTribunaController.getOne)
router.get('/allTri/:uuid', ClienteToTribunaController.getOneIdClient)
router.post('/post/', ClienteToTribunaController.post)
router.put('/put/:uuid', ClienteToTribunaController.put)
router.delete('/delete/:uuid', ClienteToTribunaController.delete)

export default router