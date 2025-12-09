import { Router } from "express";
import { 
  getReportes, 
  getReporteById 
} from "../controllers/reporteventas.controller.js";

const router = Router();

router.get("/", getReportes);
router.get("/:id", getReporteById);

export default router;
