// backend/src/utils/validation.ts
import { z } from "zod";
import {
  MarketingVideoRequest,
  TourVideoRequest,
} from "../models/videoTypes";

// ————————————————
// Marketing schema + middleware
// ————————————————
// Make sure these three lists match your UI exactly!
const marketingSchema = z.object({
  features: z
    .preprocess((val) => {
      // turn the JSON-string field back into an array
      if (typeof val === "string") {
        try { return JSON.parse(val); } catch { /* fall through */ }
      }
      return val;
    }, z.array(z.string().min(1)).min(1)),

  tone: z.enum(["energetic", "calm", "professional"]),
  audience: z.enum(["athletes", "students", "professionals"]),
  style: z.enum(["modern", "playful", "cinematic"]),

  // we no longer accept imageUrl here, multer will give us `req.file`
});

export function validateMarketing(req: any, res: any, next: any) {
  const result = marketingSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }
  req.validatedBody = result.data as MarketingVideoRequest;
  next();
}

// ————————————————
// Tour schema + middleware
// ————————————————
const tourSchema = z.object({
  address: z.string().min(1),
  price: z.preprocess((v) => Number(v), z.number().min(0)),
  beds:   z.preprocess((v) => Number(v), z.number().min(0)),
  baths:  z.preprocess((v) => Number(v), z.number().min(0)),
  sqft:   z.preprocess((v) => Number(v), z.number().min(0)),

  features: z
    .preprocess((val) => {
      if (typeof val === "string") {
        try { return JSON.parse(val); } catch {}
      }
      return val;
    }, z.array(z.string().min(1)).min(1)),

  style: z.enum(["luxury", "family-friendly", "modern minimalist"]),
});

export function validateTour(req: any, res: any, next: any) {
  const result = tourSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }
  req.validatedBody = result.data as TourVideoRequest;
  next();
}
