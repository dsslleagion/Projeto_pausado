import { Router } from "express";
import TribunaController from "../controllers/TribunaController";

const router = Router()

router.get('/all', TribunaController.getAll)
router.get('/one/:uuid', TribunaController.getOne)

export default router