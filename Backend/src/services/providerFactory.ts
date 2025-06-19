// src/services/providerFactory.ts
import { HailuoService } from './hailuoService';
import { VideoService } from './videoService';

export function createVideoService(): VideoService {
  return new HailuoService();
}
