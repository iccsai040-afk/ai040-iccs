import React, { useState } from 'react';
import { X, Sparkles, Wand2, Volume2, Check, Copy, Film, Clock, MessageSquareQuote } from 'lucide-react';
import { GeneratedScript } from '../types.ts';

interface ScriptGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyScript: (prompt: string, title: string, narration: string) => void;
}

export const ScriptGeneratorModal: React.FC<ScriptGeneratorModalProps> = ({
  isOpen,
  onClose,
  onApplyScript
}) => {
  const [topic, setTopic] = useState<string>('เชิญชวนจองคิวออนไลน์ทำใบขับขี่และต่อภาษี ขนส่งแพร่');
  const [targetAudience, setTargetAudience] = useState<string>('ประชาชนชาวจังหวัดแพร่ทุกเพศทุกวัย');
  const [tone, setTone] = useState<string>('อบอุ่น เป็นมิตร ทันสมัย สุภาพ');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scriptResult, setScriptResult] = useState<GeneratedScript | null>(null);
  const [isGeneratingTts, setIsGeneratingTts] = useState<boolean>(false);
  const [ttsAudioUrl, setTtsAudioUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGenerateScript = async () => {
    setIsLoading(true);
    setTtsAudioUrl(null);
    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, targetAudience, tone })
      });
      const data = await response.json();
      if (data.success && data.script) {
        setScriptResult(data.script);
      } else {
        alert(data.error || 'ไม่สามารถสร้างสคริปต์ได้');
      }
    } catch (err: any) {
      console.error(err);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTts = async () => {
    if (!scriptResult) return;
    const narrationText = scriptResult.scenes.map(s => s.audio).join(' ');
    setIsGeneratingTts(true);
    try {
      const response = await fetch('/api/generate-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: narrationText })
      });
      const data = await response.json();
      if (data.success && data.audioBase64) {
        const url = `data:${data.mimeType};base64,${data.audioBase64}`;
        setTtsAudioUrl(url);
      } else {
        alert(data.error || 'ไม่สามารถสังเคราะห์เสียงบรรยายได้');
      }
    } catch (err: any) {
      console.error(err);
      alert('เกิดข้อผิดพลาดในการสร้างเสียงบรรยาย');
    } finally {
      setIsGeneratingTts(false);
    }
  };

  const handleCopyPrompt = () => {
    if (!scriptResult) return;
    navigator.clipboard.writeText(scriptResult.recommendedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (!scriptResult) return;
    const combinedNarration = scriptResult.scenes.map(s => s.audio).join(' ');
    onApplyScript(scriptResult.recommendedPrompt, scriptResult.title, combinedNarration);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI สคริปต์สปอตวิดีโอประชาสัมพันธ์</h3>
              <p className="text-xs text-slate-400">สร้างบทพูด ฉาก และ Prompt แนะนำสำหรับสำนักงานขนส่งจังหวัดแพร่</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300">หัวข้อแคมเปญ / จุดประสงค์การสื่อสาร</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="เช่น จองคิวออนไลน์ทำใบขับขี่ใหม่, รอยยิ้มและจิตบริการขนส่งแพร่"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">กลุ่มเป้าหมาย</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">น้ำเสียงและโทนอารมณ์</label>
            <input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleGenerateScript}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>กำลังร่างสคริปต์ด้วย Gemini...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>สร้างสคริปต์และสตอรี่บอร์ด</span>
              </>
            )}
          </button>
        </div>

        {/* Result Area */}
        {scriptResult && (
          <div className="space-y-4 pt-4 border-t border-slate-800 animate-fade-in">
            <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">ชื่อผลงาน</span>
                  <h4 className="text-base font-bold text-white mt-0.5">{scriptResult.title}</h4>
                  <p className="text-xs text-indigo-200 mt-1">💡 <strong>ฮุก 3 วิแรก:</strong> {scriptResult.hook}</p>
                </div>
              </div>
            </div>

            {/* Scenes Breakdown */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-indigo-400" />
                <span>ลำดับฉากและบทบรรยาย (Storyboard Scenes)</span>
              </h5>
              <div className="grid grid-cols-1 gap-2.5">
                {scriptResult.scenes.map((scene, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex flex-col sm:flex-row gap-3">
                    <div className="flex sm:flex-col items-center justify-center bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-amber-400 mb-0.5 mr-1 sm:mr-0" />
                      <span className="text-xs font-mono font-bold text-amber-400">{scene.time}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-xs text-slate-300">
                        <strong className="text-slate-100">ภาพ:</strong> {scene.visual}
                      </p>
                      <p className="text-xs text-indigo-300">
                        <strong className="text-indigo-200">เสียงบรรยาย:</strong> {scene.audio}
                      </p>
                      <div className="inline-block text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        ตัวหนังสือ: {scene.caption}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prompt for Omni Flash */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Prompt ภาษาอังกฤษสำหรับ gemini-omni-1.1-flash</span>
                </span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-400 font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                {scriptResult.recommendedPrompt}
              </p>
            </div>

            {/* TTS Audio Preview */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-slate-300">ทดลองฟังเสียงบรรยายภาษาไทย (Gemini TTS)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerateTts}
                  disabled={isGeneratingTts}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors disabled:opacity-50"
                >
                  {isGeneratingTts ? 'กำลังสร้างเสียง...' : 'แปลงเสียงบรรยาย'}
                </button>
                {ttsAudioUrl && (
                  <audio controls src={ttsAudioUrl} className="h-8 max-w-[200px]" autoPlay />
                )}
              </div>
            </div>

            {/* Modal Bottom Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                ปิดหน้าต่าง
              </button>
              <button
                onClick={handleApply}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-700/20 transition-all hover:scale-[1.02]"
              >
                <Check className="w-4 h-4" />
                <span>นำสคริปต์นี้ไปสร้างวิดีโอทันที</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
