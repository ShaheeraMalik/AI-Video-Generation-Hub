// src/lib/api.ts

import axios from 'axios';
import {
  MarketingVideoRequest,
  TourVideoRequest,
} from './types';

// Make sure you have NEXT_PUBLIC_BACKEND_URL in your .env.local,
// e.g. NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND) {
  throw new Error(
    'Missing NEXT_PUBLIC_BACKEND_URL environment variable'
  );
}

export interface StartJobResponse {
  success: boolean;
  message: string;
  jobId: string;
}

export interface StatusResponse {
  success: boolean;
  message: string;
  jobId: string;
  status: 'pending' | 'complete' | 'failed';
  videoUrl?: string;
}

export async function startMarketingVideo(
  body: MarketingVideoRequest
): Promise<StartJobResponse> {
  const res = await axios.post<StartJobResponse>(
    `${BACKEND}/api/video/marketing`,
    body
  );
  return res.data;
}

export async function getMarketingStatus(
  jobId: string
): Promise<StatusResponse> {
  const res = await axios.get<StatusResponse>(
    `${BACKEND}/api/video/marketing/status/${jobId}`
  );
  return res.data;
}

export async function startTourVideo(
  body: TourVideoRequest
): Promise<StartJobResponse> {
  const res = await axios.post<StartJobResponse>(
    `${BACKEND}/api/video/tour`,
    body
  );
  return res.data;
}

export async function getTourStatus(
  jobId: string
): Promise<StatusResponse> {
  const res = await axios.get<StatusResponse>(
    `${BACKEND}/api/video/tour/status/${jobId}`
  );
  return res.data;
}
