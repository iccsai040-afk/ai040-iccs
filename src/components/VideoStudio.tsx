import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Play, 
  Smartphone, 
  Monitor, 
  Clock, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Volume2,
  RefreshCw,
  HeartHandshake,
  Download
} from 'lucide-react';
import { AspectRatio, Duration, Resolution, VideoPreset, GeneratedVideo } from '../types.ts';
import { VIDEO_PRESETS } from '../data/phraeData.ts';
import { VideoPlayer } from './VideoPlayer.tsx';
import { ScriptGeneratorModal } from './ScriptGeneratorModal.tsx';

interface VideoStudioProps {
  onAddVideoToGallery: (video: GeneratedVideo) => void;
}

export const VideoStudio: React.FC<VideoStudioProps> = ({ onAddVideoToGallery }) => {
  const [selectedPreset, setSelectedPreset] = useState<VideoPreset>(VIDEO_PRESETS[0]);
  const [prompt, setPrompt] = useState<string>(VIDEO_PRESETS[0].prompt);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(VIDEO_PRESETS[0].suggestedAspectRatio);
  const [duration, setDuration] = useState<Duration>(VIDEO_PRESETS[0].suggestedDuration);
  const [resolution, setResolution] = useState<Resolution>('720p');
  const [title, setTitle] = useState<string>(VIDEO_PRESETS[0].title);
  const [thaiNarration, setThaiNarration] = useState<string>(VIDEO_PRESETS[0].thaiNarration);
  const [subtitles, setSubtitles] = useState<string[]>(VIDEO_PRESETS[0].thaiSubtitles);

  // Generation status
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('กำลังเชื่อมต่อเซิร์ฟเวอร์...');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Script modal
  const [isScriptModalOpen, setIsScriptModalOpen] = useState<boolean>(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState<boolean>(false);

  // Select Preset
  const handleSelectPreset = (preset: VideoPreset) => {
    setSelectedPreset(preset);
    setPrompt(preset.prompt);
    setAspectRatio(preset.suggestedAspectRatio);
    setDuration(preset.suggestedDuration);
    setTitle(preset.title);
    setThaiNarration(preset.thaiNarration);
    setSubtitles(preset.thaiSubtitles);
    setSuccessNotice(null);
    setErrorMessage(null);
  };

  // Enhance prompt with Phrae & DLT details
  const handleAddPhraeEnhancements = () => {
    const phraeTags = ', authentic Northern Thai Phrae provincial Land Transport atmosphere, warm friendly officers wearing neat khaki uniform with Phrae indigo Mor-Hom subtle textile patterns, welcoming Wai greeting, cheerful smiles, modern DLT Smart Queue electronic displays with green checkmark, crisp 4k, smooth cinematic lighting';
    if (!prompt.includes('Phrae')) {
      setPrompt(prev => prev + phraeTags);
    } else {
      setPrompt(prev => prev + ', ultra realistic, high-end commercial grading, joyful hospitality');
    }
  };

  // Generate Video with Gemini Omni Flash
  const handleGenerateVideo = async () => {
    if (!prompt.trim()) {
      setErrorMessage('กรุณาระบุรายละเอียด Prompt ก่อนเริ่มสร้างวิดีโอ');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setSuccessNotice(null);
    setLoadingStep('ส่งคำสั่งไปยังโมเดล gemini-omni-1.1-flash...');

    try {
      // Simulate stepwise progress indicator for user feedback
      const progressTimer1 = setTimeout(() => {
        setLoadingStep('วิเคราะห์โครงสร้างฉากและแสงเงา (Interactions API)...');
      }, 3000);
      const progressTimer2 = setTimeout(() => {
        setLoadingStep(`เรนเดอร์ภาพเคลื่อนไหวอัตราส่วน ${aspectRatio} (${duration})...`);
      }, 9000);
      const progressTimer3 = setTimeout(() => {
        setLoadingStep('กำลังสังเคราะห์และบีบอัดไฟล์ MP4 ความละเอียดสูง...');
      }, 20000);

      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspectRatio,
          duration,
          resolution
        })
      });

      clearTimeout(progressTimer1);
      clearTimeout(progressTimer2);
      clearTimeout(progressTimer3);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการประมวลผลวิดีโอ');
      }

      if (data.videoBase64) {
        const videoUrl = `data:${data.mimeType || 'video/mp4'};base64,${data.videoBase64}`;
        setGeneratedVideoUrl(videoUrl);
        setSuccessNotice('สร้างวิดีโอด้วย Gemini Omni Flash สำเร็จเรียบร้อยแล้ว!');

        // Save to gallery
        const newVideo: GeneratedVideo = {
          id: `video-${Date.now()}`,
          videoUrl,
          aspectRatio,
          duration,
          prompt,
          title,
          thaiNarration,
          createdAt: new Date().toLocaleTimeString('th-TH')
        };
        onAddVideoToGallery(newVideo);
      } else {
        throw new Error('ไม่พบข้อมูลไบนารีวิดีโอจากโมเดล');
      }
    } catch (err: any) {
      console.error('[Video Generation Error]:', err);
      setErrorMessage(
        err.message || 'ไม่สามารถสร้างวิดีโอได้ กรุณาตรวจสอบการตั้งค่าหรือลองปรับคำบรรยายภาพใหม่อีกครั้ง'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate TTS Audio Voiceover
  const handleGenerateVoiceover = async () => {
    if (!thaiNarration) return;
    setIsGeneratingAudio(true);
    try {
      const response = await fetch('/api/generate-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: thaiNarration })
      });
      const data = await response.json();
      if (data.success && data.audioBase64) {
        const url = `data:${data.mimeType};base64,${data.audioBase64}`;
        setGeneratedAudioUrl(url);
        setSuccessNotice('สังเคราะห์เสียงบรรยายภาษาไทยสำเร็จ!');
      } else {
        alert(data.error || 'ไม่สามารถสร้างเสียงบรรยายได้');
      }
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อบริการสังเคราะห์เสียง');
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Banner with Phrae Transport identity */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>พลังขับเคลื่อนด้วย AI: gemini-omni-1.1-flash & Interactions API</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              สร้างวิดีโอประชาสัมพันธ์ <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300">
                ขนส่งแพร่ สะดวก รวดเร็ว ด้วยจิตบริการ
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              เชิญชวนประชาชนจองคิวออนไลน์ผ่านแอปพลิเคชัน <strong>DLT Smart Queue</strong> สัมผัสประสบการณ์การบริการที่ฉับไว สุภาพ ยิ้มแย้ม และประทับใจในทุกขั้นตอน
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={() => setIsScriptModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition-all hover:scale-105"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>คิดสคริปต์ด้วย Gemini</span>
            </button>
            <button
              onClick={handleGenerateVideo}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 disabled:opacity-50"
            >
              <Wand2 className="w-4 h-4" />
              <span>{isGenerating ? 'กำลังสร้างวิดีโอ...' : 'เริ่มสร้างวิดีโอ AI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Left Controls, Right Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Preset & Video Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Preset Selector */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  เลือกธีมวิดีโอประชาสัมพันธ์สำเร็จรูป
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">4 ฉากแนะนำสำหรับขนส่งแพร่</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VIDEO_PRESETS.map((preset) => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`cursor-pointer rounded-xl p-3.5 border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10 scale-[1.01]'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {preset.badge}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {preset.suggestedAspectRatio} • {preset.suggestedDuration}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100 line-clamp-1">{preset.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{preset.subtitle}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-indigo-400 font-medium flex items-center gap-1">
                        {isSelected ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3 h-3" />}
                        {isSelected ? 'กำลังเลือกฉากนี้' : 'เลือกฉากนี้'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Video Parameters Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>การตั้งค่ารูปแบบวิดีโอ (Video Specifications)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Aspect Ratio */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">อัตราส่วนหน้าจอ</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAspectRatio('16:9')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      aspectRatio === '16:9'
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/20'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>16:9 แนวนอน</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAspectRatio('9:16')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      aspectRatio === '9:16'
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/20'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>9:16 แนวตั้ง</span>
                  </button>
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">ความยาวคลิป</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDuration('5s')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      duration === '5s'
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/20'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    5 วินาที
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuration('10s')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      duration === '10s'
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/20'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    10 วินาที
                  </button>
                </div>
              </div>

              {/* Resolution */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">ความคมชัด</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setResolution('720p')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      resolution === '720p'
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    720p HD
                  </button>
                  <button
                    type="button"
                    onClick={() => setResolution('1080p')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      resolution === '1080p'
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    1080p FHD
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Prompt Studio Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>คำบรรยายฉาก (Video Prompt for gemini-omni-1.1-flash)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  ระบุรายละเอียดของภาพ การเคลื่อนไหว บรรยากาศสำนักงานขนส่ง และจิตบริการ
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddPhraeEnhancements}
                className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg transition-colors"
                title="เพิ่มรายละเอียดผ้าหม้อห้อม การไหว้ทักทาย และจิตบริการ"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>+ เพิ่มอัตลักษณ์แพร่</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="อธิบายฉาก เช่น ภาพประชาชนจองคิวผ่านแอป DLT Smart Queue เดินทางมาถึงขนส่งแพร่ ได้รับการต้อนรับด้วยรอยยิ้มอย่างอบอุ่น..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-indigo-500 font-mono resize-y"
              />
              <div className="absolute bottom-3 right-3 text-[11px] text-slate-400">
                {prompt.length} ตัวอักษร
              </div>
            </div>

            {/* Thai Narration & Subtitle Editor */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>บทพูดบรรยายเสียงภาษาไทย (Thai Voiceover Narration)</span>
                </label>
                <button
                  type="button"
                  onClick={handleGenerateVoiceover}
                  disabled={isGeneratingAudio}
                  className="text-xs text-purple-300 hover:text-purple-200 bg-purple-500/10 border border-purple-500/30 px-2.5 py-1 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isGeneratingAudio ? 'กำลังสังเคราะห์เสียง...' : 'แปลงเสียงด้วย Gemini TTS'}
                </button>
              </div>
              <input
                type="text"
                value={thaiNarration}
                onChange={(e) => setThaiNarration(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Subtitles Tag Editor */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">ข้อความตัวอักษรบนจอ (Text Overlays)</label>
              <div className="flex flex-wrap gap-2">
                {subtitles.map((sub, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-950 text-indigo-300 border border-slate-800 px-3 py-1 rounded-lg"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Error or Success Notice */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-rose-300 text-xs animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <div>
                  <p className="font-semibold">ไม่สามารถสร้างวิดีโอได้:</p>
                  <p className="text-rose-200 mt-0.5">{errorMessage}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    คำแนะนำ: คุณสามารถทดสอบดูตัวอย่างสตอรี่บอร์ดจำลองในกล่องพรีวิวได้ทันที หรือปรับข้อความคำบรรยายให้กระชับขึ้น
                  </p>
                </div>
              </div>
            )}

            {successNotice && (
              <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-emerald-300 text-xs animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successNotice}</span>
              </div>
            )}

            {/* Main Action Submit Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerateVideo}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{loadingStep}</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>เริ่มเรนเดอร์วิดีโอ (Render Video with Omni Flash)</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Live Player / Simulator Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg space-y-4 flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  หน้าจอแสดงผลวิดีโอ (Video Display)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {generatedVideoUrl ? 'MP4 Generated' : 'Live Interactive Preview'}
              </span>
            </div>

            {/* Video Player Component */}
            <VideoPlayer
              videoUrl={generatedVideoUrl}
              aspectRatio={aspectRatio}
              duration={duration}
              title={title}
              thaiNarration={thaiNarration}
              subtitles={subtitles}
              audioUrl={generatedAudioUrl}
              isLoading={isGenerating}
              loadingStep={loadingStep}
            />

            {/* Video Actions & Highlights */}
            <div className="w-full pt-3 border-t border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>อัตลักษณ์ขนส่งแพร่:</span>
                <span className="text-indigo-300 font-medium">ผ้าหม้อห้อม • รอยยิ้มเมืองแพร่ • DLT คิวออนไลน์</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>เทคโนโลยี:</span>
                <span className="text-slate-300 font-mono">Gemini Omni Flash 1.1</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>ความละเอียด:</span>
                <span className="text-slate-300 font-mono">{resolution} • {duration}</span>
              </div>
            </div>

          </div>

          {/* Quick Guide Card */}
          <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 rounded-2xl border border-indigo-500/20 p-5 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>3 จุดเด่นที่ควรมีในวิดีโอขนส่งแพร่</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">1.</span>
                <span><strong>จองคิวง่าย ไม่ต้องรอ:</strong> สะท้อนให้เห็นว่าแอป DLT Smart Queue ทำได้ในโทรศัพท์ ไม่ต้องมารอคิวแต่เช้าตรู่</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">2.</span>
                <span><strong>จิตบริการด้วยใจ:</strong> รอยยิ้ม การยกมือไหว้ และความกระตือรือร้นของเจ้าหน้าที่ขนส่งแพร่</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">3.</span>
                <span><strong>ฉับไว ถูกต้อง ปลอดภัย:</strong> ทุกขั้นตอนโปร่งใส ได้มาตรฐาน สะดวกสบายทั้งต่อภาษีและทำใบขับขี่</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Script Generator Modal */}
      <ScriptGeneratorModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
        onApplyScript={(newPrompt, newTitle, newNarration) => {
          setPrompt(newPrompt);
          setTitle(newTitle);
          setThaiNarration(newNarration);
          setSuccessNotice(`นำสคริปต์ "${newTitle}" มาปรับใช้ในสตูดิโอเรียบร้อยแล้ว`);
        }}
      />

    </div>
  );
};
