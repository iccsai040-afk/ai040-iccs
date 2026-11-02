export type AspectRatio = '16:9' | '9:16';
export type Duration = '5s' | '10s';
export type Resolution = '720p' | '1080p';

export interface VideoPreset {
  id: string;
  title: string;
  subtitle: string;
  category: 'smart-queue' | 'service-mind' | 'fast-track' | 'welcome';
  prompt: string;
  suggestedAspectRatio: AspectRatio;
  suggestedDuration: Duration;
  thaiNarration: string;
  thaiSubtitles: string[];
  thumbnailGradient: string;
  badge: string;
}

export interface GeneratedVideo {
  id: string;
  videoUrl: string;
  aspectRatio: AspectRatio;
  duration: Duration;
  prompt: string;
  title: string;
  thaiNarration?: string;
  createdAt: string;
  audioUrl?: string;
}

export interface ScriptScene {
  time: string;
  visual: string;
  audio: string;
  caption: string;
}

export interface GeneratedScript {
  title: string;
  hook: string;
  concept: string;
  recommendedPrompt: string;
  scenes: ScriptScene[];
  callToAction: string;
  hashtags: string[];
}

export interface QueueBooking {
  ticketNumber: string;
  branch: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  fullName: string;
  citizenId: string;
  phone: string;
  channel: string;
  requiredDocuments: string[];
}
