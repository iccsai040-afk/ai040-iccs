import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Download, Maximize2, Sparkles, CheckCircle2, Subtitles } from 'lucide-react';
import { AspectRatio, Duration } from '../types.ts';

interface VideoPlayerProps {
  videoUrl?: string | null;
  aspectRatio: AspectRatio;
  duration: Duration;
  title: string;
  thaiNarration?: string;
  subtitles?: string[];
  audioUrl?: string | null;
  isLoading?: boolean;
  loadingStep?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  aspectRatio,
  duration,
  title,
  thaiNarration,
  subtitles = [],
  audioUrl,
  isLoading = false,
  loadingStep = 'กำลังเตรียมการ...'
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState<number>(0);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [simulatedScene, setSimulatedScene] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse duration in seconds
  const totalDurationSec = duration === '10s' ? 10 : 5;

  // Handle Play/Pause
  const togglePlay = () => {
    if (videoUrl && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        audioRef.current?.pause();
      } else {
        videoRef.current.play();
        audioRef.current?.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Video Time Update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setPlaybackProgress(progress || 0);

      // Rotate subtitles
      if (subtitles.length > 0) {
        const subIdx = Math.min(
          Math.floor((videoRef.current.currentTime / videoRef.current.duration) * subtitles.length),
          subtitles.length - 1
        );
        setCurrentSubtitleIndex(subIdx);
      }
    }
  };

  // Simulation timer if no real MP4 yet or user previewing
  useEffect(() => {
    if (!videoUrl && isPlaying && !isLoading) {
      const interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          const next = prev + (100 / (totalDurationSec * 10));
          if (next >= 100) {
            return 0; // Loop
          }
          return next;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [videoUrl, isPlaying, totalDurationSec, isLoading]);

  // Synchronize simulated scenes based on progress
  useEffect(() => {
    if (!videoUrl) {
      const sceneIdx = Math.floor((playbackProgress / 100) * 3);
      setSimulatedScene(sceneIdx);
      if (subtitles.length > 0) {
        const subIdx = Math.min(
          Math.floor((playbackProgress / 100) * subtitles.length),
          subtitles.length - 1
        );
        setCurrentSubtitleIndex(subIdx);
      }
    }
  }, [playbackProgress, videoUrl, subtitles.length]);

  // Fullscreen
  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Download video file
  const handleDownload = () => {
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `DLT-Phrae-Video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const isPortrait = aspectRatio === '9:16';

  return (
    <div className="flex flex-col items-center w-full">
      {/* Video Container Card */}
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl transition-all duration-300 ${
          isPortrait
            ? 'w-full max-w-[340px] aspect-[9/16]'
            : 'w-full max-w-[720px] aspect-[16/9]'
        } flex items-center justify-center group`}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <div className="relative w-20 h-20 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <div className="absolute inset-3 rounded-full border-4 border-purple-500/20 border-b-purple-500 animate-spin [animation-direction:reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Gemini Omni Flash กำลังสร้างวิดีโอ</h4>
            <p className="text-xs sm:text-sm text-indigo-300 mb-3 max-w-xs">{loadingStep}</p>
            <div className="w-48 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 h-full w-full animate-scan" />
            </div>
            <p className="text-[11px] text-slate-400 mt-3">โมเดล gemini-omni-1.1-flash กำลังเรนเดอร์เฟรมความละเอียดสูง</p>
          </div>
        )}

        {/* Real Video Player */}
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />
        ) : (
          /* High-Fidelity Animated Storyboard Simulation Preview */
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950/60 to-slate-950">
            {/* Background Animated Gradient / Glow */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />

            {/* Header Badge */}
            <div className="relative z-10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-semibold text-slate-200">
                  {videoUrl ? 'วิดีโอสร้างเสร็จแล้ว' : 'ตัวอย่างพรีวิวสตอรี่บอร์ดจำลอง'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded">
                {aspectRatio} • {duration}
              </span>
            </div>

            {/* Visual Scene Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
              {simulatedScene === 0 && (
                <div className="animate-fade-in flex flex-col items-center space-y-4 max-w-md">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                      <span className="text-4xl">🙏</span>
                    </div>
                    <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ยินดีต้อนรับ
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      สำนักงานขนส่งจังหวัดแพร่
                    </h3>
                    <p className="text-xs text-indigo-300 mt-1">
                      บริการด้วยจิตบริการ ยิ้มแย้มแจ่มใส ต้อนรับดุจญาติมิตร
                    </p>
                  </div>
                </div>
              )}

              {simulatedScene === 1 && (
                <div className="animate-fade-in flex flex-col items-center space-y-3 max-w-md">
                  <div className="w-20 h-28 bg-slate-900 rounded-2xl border-2 border-indigo-400 p-2 shadow-2xl flex flex-col justify-between items-center">
                    <div className="w-8 h-1 bg-slate-700 rounded-full" />
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 flex flex-col items-center justify-center text-white">
                      <span className="text-xs font-bold">DLT</span>
                      <span className="text-[9px]">Queue</span>
                    </div>
                    <div className="w-10 h-1 bg-emerald-400 rounded-full" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-emerald-400">
                      จองคิวออนไลน์ง่ายๆ ใน 1 นาที
                    </h3>
                    <p className="text-xs text-slate-300">
                      เลือกวัน เวลา และบริการ ไม่ต้องมานั่งรอคิวยาว
                    </p>
                  </div>
                </div>
              )}

              {simulatedScene === 2 && (
                <div className="animate-fade-in flex flex-col items-center space-y-3 max-w-md">
                  <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 rounded-2xl">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    <div className="text-left">
                      <div className="text-xs font-semibold text-emerald-300">ช่องบริการด่วน Smart Service</div>
                      <div className="text-sm font-bold text-white">รับบริการรวดเร็ว ตรงเวลา ประทับใจ</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    ต่อใบขับขี่ • ชำระภาษีรถ • โอนกรรมสิทธิ์ เสร็จไวในพริบตา
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Scene Indicators */}
            <div className="relative z-10 px-6 pb-2 flex justify-center space-x-2">
              <span className={`h-1.5 rounded-full transition-all duration-300 ${simulatedScene === 0 ? 'w-8 bg-indigo-400' : 'w-2 bg-slate-700'}`} />
              <span className={`h-1.5 rounded-full transition-all duration-300 ${simulatedScene === 1 ? 'w-8 bg-indigo-400' : 'w-2 bg-slate-700'}`} />
              <span className={`h-1.5 rounded-full transition-all duration-300 ${simulatedScene === 2 ? 'w-8 bg-indigo-400' : 'w-2 bg-slate-700'}`} />
            </div>
          </div>
        )}

        {/* Subtitles Overlay */}
        {showSubtitles && (subtitles.length > 0 || thaiNarration) && (
          <div className="absolute bottom-14 left-4 right-4 z-20 pointer-events-none flex justify-center">
            <div className="bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/60 shadow-xl max-w-lg text-center animate-fade-in">
              <p className="text-xs sm:text-sm font-semibold text-amber-300 tracking-wide drop-shadow">
                {subtitles.length > 0 ? subtitles[currentSubtitleIndex] : thaiNarration}
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 z-30">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 transition-all duration-100"
            style={{ width: `${playbackProgress}%` }}
          />
        </div>

        {/* Hover Controls Overlay */}
        <div className="absolute inset-0 z-30 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 pointer-events-none">
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlay}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-transform active:scale-95"
                title={isPlaying ? 'หยุดชั่วคราว' : 'เล่นต่อ'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setPlaybackProgress(0);
                  if (videoRef.current) videoRef.current.currentTime = 0;
                }}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-transform active:scale-95"
                title="เล่นใหม่ตั้งแต่ต้น"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-transform active:scale-95"
                title={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                  showSubtitles ? 'bg-indigo-600 text-white' : 'bg-white/20 text-slate-300 hover:bg-white/30'
                }`}
                title="เปิด/ปิด คำบรรยายไทย"
              >
                <Subtitles className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {videoUrl && (
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-transform active:scale-95"
                  title="ดาวน์โหลดไฟล์วิดีโอ MP4"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleFullscreen}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-transform active:scale-95"
                title="ขยายเต็มจอ"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Hidden Audio element if audioUrl provided */}
        {audioUrl && (
          <audio ref={audioRef} src={audioUrl} autoPlay loop muted={isMuted} />
        )}
      </div>

      {/* Video Details & Quick Bar */}
      <div className="w-full max-w-2xl mt-4 px-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
            <span className="text-[10px] font-medium px-2 py-0.5 bg-indigo-500/15 text-indigo-300 rounded border border-indigo-500/20">
              {aspectRatio === '9:16' ? 'แนวตั้ง 9:16 (TikTok/Reels)' : 'แนวนอน 16:9 (จอกว้าง/ทีวี)'}
            </span>
          </div>
          <p className="text-xs text-slate-400 line-clamp-1">
            {thaiNarration || 'วิดีโอประชาสัมพันธ์เชิญชวนจองคิวออนไลน์ ขนส่งจังหวัดแพร่'}
          </p>
        </div>

        {videoUrl && (
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-md shadow-emerald-700/20 transition-all shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>บันทึกไฟล์ MP4</span>
          </button>
        )}
      </div>
    </div>
  );
};
