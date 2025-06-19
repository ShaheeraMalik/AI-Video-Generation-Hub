// backend/src/models/videoTypes.ts

// --- Marketing enums & request ---
export type MarketingTone = 'energetic' | 'calm' | 'professional';
export type MarketingAudience = 'athletes' | 'students' | 'professionals';
export type MarketingStyle = 'modern' | 'playful' | 'cinematic';

/**
 * When you parse the incoming form-data via multer+Zod, you’ll
 * end up calling JSON.parse on the `features` field (if it
 * arrived as a string) and coercing the enums to exactly these
 * three lists below.
 */
export interface MarketingVideoRequest {
  features: string[];
  tone: MarketingTone;
  audience: MarketingAudience;
  style: MarketingStyle;

  /** 
   * We don’t validate imageUrl through Zod — multer gives you
   * `req.file` — but your controller will still accept it.
   */
  imageUrl?: string;
}


// --- Tour enums & request ---
export type TourStyle = 'luxury' | 'family-friendly' | 'modern minimalist';

export interface TourVideoRequest {
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  features: string[];
  style: TourStyle;
}


// --- Common response for job status ---
export interface VideoJobStatus {
  jobId: string;
  status: 'pending' | 'complete' | 'failed';
  videoUrl?: string;
}
