import React, { useState } from 'react';
import { Film, Play, Download, Sparkles, Monitor, Smartphone, Clock, Eye } from 'lucide-react';
import { GeneratedVideo, AspectRatio } from '../types.ts';
import { VIDEO_PRESETS } from '../data/phraeData.ts';

interface VideoGalleryProps {
  customVideos: GeneratedVideo[];
  onPlayInStudio: (prompt: string, title: string, aspectRatio: AspectRatio) => void;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({ customVideos, onPlayInStudio }) => {
  const [filterRatio, setFilterRatio] = useState<'all' | '16:9' | '9:16'>('all');
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(0);

  // Curated showcase campaigns for Phrae Land Transport
  const showcaseCampaigns = [
    {
      id: 'sc-1',
      title: 'จองคิวง่ายใน 1 นาที สะดวกสบายชาวเมืองแพร่',
      tag: 'DLT Smart Queue',
      aspectRatio: '9:16' as AspectRatio,
      duration: '5s',
      description: 'คลิปสั้นแนวตั้งสำหรับ TikTok และ Reels ถ่ายทอดการเปิดแอปจองคิวออนไลน์ ไม่ต้องมารอแต่เช้า',
      gradient: 'from-blue-600 via-indigo-700 to-purple-800',
      views: '12.4K ครั้ง',
      presetId: 'preset-queue-easy'
    },
    {
      id: 'sc-2',
      title: 'จิตบริการด้วยใจ เจ้าหน้าที่ขนส่งแพร่พร้อมดูแล',
      tag: 'จิตบริการ & ความประทับใจ',
      aspectRatio: '16:9' as AspectRatio,
      duration: '5s',
      description: 'คลิปแนวนอนสะท้อนรอยยิ้ม การไหว้ทักทาย และความสุภาพอบอุ่นของเจ้าหน้าที่ขนส่งแพร่',
      gradient: 'from-amber-600 via-orange-600 to-rose-700',
      views: '18.9K ครั้ง',
      presetId: 'preset-service-mind'
    },
    {
      id: 'sc-3',
      title: 'ต่อภาษีรถและทำใบขับขี่ รวดเร็วฉับไว ไร้กังวล',
      tag: 'Smart Service',
      aspectRatio: '16:9' as AspectRatio,
      duration: '5s',
      description: 'ขั้นตอนสแกน QR Code แล้วเข้ารับบริการช่องด่วนทันใจ เสร็จไวในไม่กี่นาที',
      gradient: 'from-emerald-600 via-teal-700 to-cyan-800',
      views: '9.2K ครั้ง',
      presetId: 'preset-fast-track'
    },
    {
      id: 'sc-4',
      title: 'ยินดีต้อนรับสู่สำนักงานขนส่งจังหวัดแพร่ ยุคดิจิทัล',
      tag: 'ภาพลักษณ์องค์กร',
      aspectRatio: '16:9' as AspectRatio,
      duration: '10s',
      description: 'มุมมองทัศนียภาพสำนักงานขนส่งแพร่ ท่ามกลางธรรมชาติเมืองเหนือและการบริการที่ทันสมัย',
      gradient: 'from-purple-700 via-indigo-800 to-slate-900',
      views: '24.1K ครั้ง',
      presetId: 'preset-welcome-phrae'
    }
  ];

  const filteredCampaigns = showcaseCampaigns.filter(c => {
    if (filterRatio === 'all') return true;
    return c.aspectRatio === filterRatio;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Film className="w-6 h-6 text-indigo-400" />
            <span>คลังสื่อวิดีโอประชาสัมพันธ์ ขนส่งจังหวัดแพร่</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            รวมผลงานวิดีโอและสตอรี่บอร์ดประชาสัมพันธ์ สำหรับเผยแพร่บนสื่อสังคมออนไลน์และจอประชาสัมพันธ์
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setFilterRatio('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterRatio === 'all' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setFilterRatio('16:9')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterRatio === '16:9' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>แนวนอน 16:9</span>
          </button>
          <button
            onClick={() => setFilterRatio('9:16')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterRatio === '9:16' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>แนวตั้ง 9:16</span>
          </button>
        </div>
      </div>

      {/* Custom Videos Created in this Session */}
      {customVideos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              วิดีโอที่คุณเพิ่งสร้างด้วย Gemini ({customVideos.length} คลิป)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customVideos.map((video) => (
              <div
                key={video.id}
                className="bg-slate-900 rounded-2xl border border-indigo-500/30 overflow-hidden shadow-xl flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <video src={video.videoUrl} className="w-full h-full object-cover" controls />
                  <span className="absolute top-2 right-2 bg-indigo-600/90 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {video.aspectRatio} • {video.duration}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="text-sm font-bold text-white line-clamp-1">{video.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{video.thaiNarration || video.prompt}</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>สร้างเมื่อ: {video.createdAt}</span>
                    <a
                      href={video.videoUrl}
                      download={`DLT-Phrae-${video.id}.mp4`}
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลด MP4</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curated Showcase Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          ชุดแคมเปญประชาสัมพันธ์แนะนำ (Curated Campaigns)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCampaigns.map((camp, idx) => {
            const preset = VIDEO_PRESETS.find(p => p.id === camp.presetId) || VIDEO_PRESETS[0];
            return (
              <div
                key={camp.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-indigo-500/40 p-5 shadow-xl flex flex-col justify-between space-y-4 group transition-all"
              >
                <div className="space-y-3">
                  {/* Thumbnail / Graphic Card */}
                  <div className={`relative h-44 rounded-xl bg-gradient-to-tr ${camp.gradient} p-4 flex flex-col justify-between overflow-hidden shadow-inner`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                        {camp.tag}
                      </span>
                      <span className="text-xs font-mono font-semibold text-white/90 bg-black/30 px-2 py-0.5 rounded">
                        {camp.aspectRatio} • {camp.duration}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] text-white/80 font-medium">ขนส่งจังหวัดแพร่</span>
                      <h4 className="text-base sm:text-lg font-bold text-white drop-shadow-md">
                        {camp.title}
                      </h4>
                    </div>

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                        <Play className="w-6 h-6 ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {camp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    <span>รับชมแล้ว {camp.views}</span>
                  </div>

                  <button
                    onClick={() => onPlayInStudio(preset.prompt, preset.title, preset.suggestedAspectRatio)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all hover:scale-105"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>นำไปสร้างในสตูดิโอ</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
