// backend/src/services/videoService.ts
import {
  MarketingVideoRequest,
  TourVideoRequest,
  VideoJobStatus
} from '../models/videoTypes';

export interface VideoService {
  generateMarketingImage(): Promise<string>;
  startMarketingVideo(req: MarketingVideoRequest): Promise<string>;   // returns jobId
  startTourVideo(req: TourVideoRequest): Promise<string>;           // returns jobId
  getVideoStatus(jobId: string): Promise<VideoJobStatus>;
}
