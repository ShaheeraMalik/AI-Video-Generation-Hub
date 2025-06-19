// backend/src/controllers/marketingController.ts
import { Request, Response, NextFunction } from "express";
import { createVideoService } from "../services/providerFactory";
import { MarketingVideoRequest } from "../models/videoTypes";

const videoSvc = createVideoService();

export async function startMarketingJob(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = req.validatedBody as MarketingVideoRequest;

    // build data-URI from uploaded file or fallback to static
    let imageUrl: string;
    if (req.file) {
      const mime = req.file.mimetype;
      const b64 = req.file.buffer.toString("base64");
      imageUrl = `data:${mime};base64,${b64}`;
    } else {
      const server = (process.env.SERVER_URL || "").replace(/\/$/, "");
      imageUrl = `${server}/images/suplimax.jpg`;
    }

    const jobId = await videoSvc.startMarketingVideo({
      ...data,
      imageUrl,
    });

    res
      .status(202)
      .json({ success: true, message: "🚀 Marketing video job accepted.", jobId });
  } catch (err) {
    next(err);
  }
}

export async function getMarketingStatus(
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
        message: "⏳ Marketing video is generating…",
        jobId: id,
        status,
      });
      return;
    }

    if (status === "complete") {
      res.json({
        success: true,
        message: "✅ Marketing video ready!",
        jobId: id,
        status,
        videoUrl,
      });
      return;
    }

    // failed
    res.json({
      success: false,
      message: "❌ Marketing video failed. Please retry.",
      jobId: id,
      status,
    });
  } catch (err) {
    next(err);
  }
}
