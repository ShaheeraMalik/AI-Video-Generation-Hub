// src/lib/types.ts

// Marketing
export type Tone = 'energetic' | 'playful' | 'serious';
export type Audience = 'athletes' | 'gamers' | 'college students';
export type Style = 'fast-cut' | 'cinematic' | 'animated';

export interface MarketingVideoRequest {
  features: string[];
  tone: Tone;
  audience: Audience;
  style: Style;
}

// Real-Estate Tour
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
