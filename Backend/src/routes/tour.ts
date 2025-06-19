// backend/src/routes/tour.ts
import { Router } from "express";
import { validateTour } from "../utils/validation";
import { startTourJob, getTourStatus } from "../controllers/tourController";

const router = Router();

router.post("/", validateTour, startTourJob);
router.get("/status/:jobId", getTourStatus);

export default router;
