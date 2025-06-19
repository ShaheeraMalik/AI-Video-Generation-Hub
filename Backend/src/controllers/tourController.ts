// backend/src/controllers/tourController.ts
import { Request, Response, NextFunction } from "express";
import { createVideoService } from "../services/providerFactory";
import { TourVideoRequest } from "../models/videoTypes";

const videoSvc = createVideoService();

export async function startTourJob(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = req.validatedBody as TourVideoRequest;
    const jobId = await videoSvc.startTourVideo(data);

    res
      .status(202)
      .json({ success: true, message: "🚀 Tour video job accepted.", jobId });
  } catch (err) {
    next(err);
  }
}

export async function getTourStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { jobId } = req.params;
    const { jobId: id, status, videoUrl } = await videoSvc.getVideoStatus(jobId);

    if (status === "pending") {
      res.json({
        success: true,
        message: "⏳ Tour video is generating…",
        jobId: id,
        status,
      });
      return;
    }

    if (status === "complete") {
      res.json({
        success: true,
        message: "✅ Tour video ready!",
        jobId: id,
        status,
        videoUrl,
      });
      return;
    }

    // failed
    res.json({
      success: false,
      message: "❌ Tour video failed. Please retry.",
      jobId: id,
      status,
    });
  } catch (err) {
    next(err);
  }
}
