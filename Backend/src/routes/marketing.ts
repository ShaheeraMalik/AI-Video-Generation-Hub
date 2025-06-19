// backend/src/routes/marketing.ts
import { Router } from "express";
import multer from "multer";
import { validateMarketing } from "../utils/validation";
import { startMarketingJob, getMarketingStatus } from "../controllers/marketingController";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/", upload.single("image"), validateMarketing, startMarketingJob);
router.get(
  '/status/:jobId',
  getMarketingStatus
);

export default router;
