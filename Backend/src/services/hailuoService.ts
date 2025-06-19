// src/services/hailuoService.ts
import fetch from 'node-fetch';
import { VideoService } from './videoService';
import {
  MarketingVideoRequest,
  TourVideoRequest,
  VideoJobStatus,
} from '../models/videoTypes';

const RAW_HOST = process.env.HAILUO_API_HOST;
if (!RAW_HOST) throw new Error('Missing HAILUO_API_HOST (e.g. https://api.minimax.io/v1)');
const API_BASE = RAW_HOST.replace(/\/$/, '');

const API_KEY = process.env.HAILUO_API_KEY;
if (!API_KEY) throw new Error('Missing HAILUO_API_KEY');

export class HailuoService implements VideoService {
  private getStaticImage() {
    const server = process.env.SERVER_URL;
    if (!server) throw new Error('Missing SERVER_URL');
    return `${server.replace(/\/$/, '')}/images/suplimax.jpg`;
  }

  private async callCreate(payload: any) {
    console.log('📤 create payload:', payload);
    const resp = await fetch(`${API_BASE}/video_generation`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const json = await resp.json();
    console.log('📥 create response:', json);
    // check for base_resp errors
    if ('base_resp' in json && json.base_resp.status_code !== 0) {
      throw new Error(
        `Minimax create job error ${json.base_resp.status_code}: ${json.base_resp.status_msg}`
      );
    }
    if (!json.task_id) {
      throw new Error(`Minimax create returned empty task_id`);
    }
    return json.task_id as string;
  }

  async generateMarketingImage(): Promise<string> {
    return this.getStaticImage();
  }

  async startMarketingVideo(req: MarketingVideoRequest): Promise<string> {
    console.log('→ startMarketingVideo()', req);
    const imageUrl = req.imageUrl || this.getStaticImage();
    const promptText = `Create a ${req.tone} marketing video for Suplimax energy drink highlighting ${req.features.join(
      ', '
    )}. Audience: ${req.audience}. Style: ${req.style}.`;
    const payload = {
      model: 'I2V-01',
      prompt: promptText,              // ← meaningful prompt
      first_frame_image: imageUrl,
      duration: 6,                     // ← allowed 6 or 10
      resolution: '768P',
    };
    return this.callCreate(payload);
  }

  async startTourVideo(req: TourVideoRequest): Promise<string> {
    console.log('→ startTourVideo()', req);
    const promptText = `Virtual tour of ${req.address}: ${req.beds} bd, ${req.baths} ba, ${req.sqft} sqft; features: ${req.features.join(
      ', '
    )}. Price: $${req.price.toLocaleString()}. Style: ${req.style}.`;
    const payload = {
      model: 'T2V-01',
      prompt: promptText,              // ← text→video needs prompt
      duration: 6,
      resolution: '768P',
    };
    return this.callCreate(payload);
  }

  async getVideoStatus(jobId: string): Promise<VideoJobStatus> {
    console.log('→ getVideoStatus()', jobId);
    // 1) query status
    const statusResp = await fetch(
      `${API_BASE}/query/video_generation?task_id=${encodeURIComponent(jobId)}`,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
    const js = await statusResp.json();
    console.log('📥 status response:', js);

    // 2) if succeeded, retrieve download URL
    if (js.status === 'SUCCEEDED' && js.file_id) {
      const dl = await fetch(
        `${API_BASE}/retrieve/video_generation?file_id=${js.file_id}`,
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );
      const body = await dl.json() as { url: string };
      console.log('📥 retrieve response:', body);
      return { jobId: js.task_id, status: 'complete', videoUrl: body.url };
    }

    // 3) still pending or failed
    return {
      jobId: js.task_id,
      status: js.status === 'FAILED' ? 'failed' : 'pending',
      videoUrl: undefined,
    };
  }
}
