import { Router } from "express";
import {
  getAllStudy,
  editStudy,
  addStudy,
  deleteStudyAll
} from "../controllers/studyController.js";

const router = Router();

router.get("/getAllStudy", getAllStudy);
router.post("/addStudy", addStudy);
router.put("/editStudy/:id", editStudy);
router.delete("/deleteStudyAll", deleteStudyAll);


// router.get("/getStudy/:idProfessional", getQuizByMatrizProfessional);
// router.post("/getMatrizFilter", getMatrizFilter);
// router.post("/addPeriod", addPeriod);
// router.delete("/:matrizId", deleteMatriz);

export default router;
