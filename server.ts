import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Helper to get GoogleGenAI client safely
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the environment.');
  }
  return new GoogleGenAI({ apiKey });
}

// 1. API: Generate Video with gemini-omni-1.1-flash
app.post('/api/generate-video', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      prompt,
      aspectRatio = '16:9',
      duration = '5s',
      resolution = '720p',
      imageBase64,
      imageMimeType = 'image/png'
    } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'กรุณาระบุรายละเอียดคำสั่ง prompt สำหรับการสร้างวิดีโอ' });
      return;
    }

    const validAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';
    const validDuration = duration === '10s' ? '10s' : '5s';
    const validResolution = ['360p', '720p', '1080p'].includes(resolution) ? resolution : '720p';

    const ai = getGeminiClient();

    let inputPayload: any;
    if (imageBase64) {
      inputPayload = [
        {
          type: 'image',
          mime_type: imageMimeType,
          data: imageBase64.replace(/^data:[^;]+;base64,/, '')
        },
        {
          type: 'text',
          text: prompt
        }
      ];
    } else {
      inputPayload = prompt;
    }

    console.log(`[Video Gen] Request started with model 'gemini-omni-1.1-flash', aspect: ${validAspectRatio}, duration: ${validDuration}`);

    const interaction = await ai.interactions.create(
      {
        model: 'gemini-omni-1.1-flash',
        input: inputPayload,
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: 'video',
          aspect_ratio: validAspectRatio,
          duration: validDuration,
          resolution: validResolution
        }
      },
      { timeout: 300000 } // 5 minutes timeout
    );

    const videoPart = interaction.output_video;

    if (videoPart && videoPart.data) {
      const mimeType = videoPart.mime_type || 'video/mp4';
      res.json({
        success: true,
        videoBase64: videoPart.data,
        mimeType: mimeType,
        aspectRatio: validAspectRatio,
        duration: validDuration,
        interactionId: interaction.id
      });
      return;
    }

    // Check if video is in steps
    let foundVideoData: string | null = null;
    let foundMimeType = 'video/mp4';

    if (interaction.steps) {
      for (const step of interaction.steps) {
        if (step.type === 'model_output' && step.content) {
          const videoContent: any = step.content.find((c: any) => c.type === 'video');
          if (videoContent && videoContent.data) {
            foundVideoData = videoContent.data;
            if (videoContent.mime_type) foundMimeType = videoContent.mime_type;
            break;
          }
        }
      }
    }

    if (foundVideoData) {
      res.json({
        success: true,
        videoBase64: foundVideoData,
        mimeType: foundMimeType,
        aspectRatio: validAspectRatio,
        duration: validDuration,
        interactionId: interaction.id
      });
      return;
    }

    res.status(500).json({
      error: 'ไม่พบข้อมูลวิดีโอที่ส่งกลับมาจากโมเดล กรุณาลองปรับแต่งคำบรรยายภาพใหม่อีกครั้ง'
    });
  } catch (error: any) {
    console.error('[Video Gen Error]:', error);
    const errorMessage = error?.message || 'เกิดข้อผิดพลาดในการสร้างวิดีโอ';
    
    res.status(500).json({
      error: errorMessage,
      details: error?.statusText || error?.stack || ''
    });
  }
});

// 2. API: Generate Script / Storyboard with gemini-3.8-flash
app.post('/api/generate-script', async (req: Request, res: Response): Promise<void> => {
  try {
    const { topic, targetAudience = 'ประชาชนทั่วไปในจังหวัดแพร่', tone = 'อบอุ่น เป็นมิตร ทันสมัย' } = req.body;

    const ai = getGeminiClient();

    const systemInstruction = `คุณเป็นผู้เชี่ยวชาญด้านการสื่อสารประชาสัมพันธ์ภาครัฐ ของสำนักงานขนส่งจังหวัดแพร่ (DLT Phrae)
มีหน้าที่สร้างบทสคริปต์วิดีโอประชาสัมพันธ์เชิญชวนผู้มารับบริการให้มาจองคิวออนไลน์ผ่าน DLT Smart Queue
เน้นจิตบริการด้วยใจ อัธยาศัยไมตรีเมืองแพร่ (เมืองแพร่น่าอยู่ ผู้คนน่ารัก) สะดวก รวดเร็ว ตรงเวลา ไม่ต้องรอนาน`;

    const prompt = `จงสร้างสคริปต์วิดีโอประชาสัมพันธ์ความยาว 15-30 วินาที หัวข้อ: "${topic || 'เชิญชวนจองคิวออนไลน์ DLT Smart Queue'}"
กลุ่มเป้าหมาย: ${targetAudience}
โทนอารมณ์: ${tone}

ตอบกลับเป็นรูปแบบ JSON โดยมีโครงสร้างดังนี้:
{
  "title": "ชื่อคลิปวิดีโอที่ดึงดูดใจ",
  "hook": "ประโยคเปิดเรื่องที่สะดุดตาและน่าติดตาม (3 วินาทีแรก)",
  "concept": "แนวคิดหลักของคลิป",
  "recommendedPrompt": "Prompt ภาษาอังกฤษที่พร้อมส่งเข้า gemini-omni-1.1-flash เพื่อสร้างวิดีโอคุณภาพสูงที่ตรงกับฉากนี้อย่างสมจริง (เน้นแสงธรรมชาติ บรรยากาศสำนักงานขนส่งไทย เจ้าหน้าที่ยิ้มแย้ม การกดสมาร์ทโฟนจองคิว)",
  "scenes": [
    {
      "time": "0:00 - 0:03",
      "visual": "ภาพที่ปรากฏในฉาก",
      "audio": "บทพูด/เสียงบรรยายภาษาไทย",
      "caption": "ข้อความตัวอักษรบนจอ (Text Overlay)"
    }
  ],
  "callToAction": "ข้อความเชิญชวนส่งท้ายพร้อมช่องทางติดต่อ",
  "hashtags": ["#ขนส่งแพร่", "#DLTSmartQueue", "..."]
}`;

    const interaction = await ai.interactions.create({
      model: 'gemini-3.8-flash',
      input: prompt,
      system_instruction: systemInstruction,
      generation_config: {
        thinking_level: 'low'
      }
    });

    let fullOutput = '';
    if (interaction.steps) {
      for (const step of interaction.steps) {
        if (step.type === 'model_output' && step.content) {
          const textContent: any = step.content.find((c: any) => c.type === 'text');
          if (textContent && textContent.text) {
            fullOutput += textContent.text;
          }
        }
      }
    }
    if (!fullOutput && interaction.output_text) {
      fullOutput = interaction.output_text;
    }

    let parsedResult = null;
    const jsonMatch = fullOutput.match(/```json\s*([\s\S]*?)\s*```/) || fullOutput.match(/([\{\[][\s\S]*[\}\]])/);
    if (jsonMatch) {
      try {
        parsedResult = JSON.parse(jsonMatch[1]);
      } catch (err) {
        console.error('JSON parse error from script generation:', err);
      }
    }

    if (!parsedResult) {
      parsedResult = {
        title: "จองคิวง่าย สบายใจ ขนส่งแพร่บริการด้วยรอยยิ้ม",
        hook: "รู้ยัง? ไปขนส่งแพร่วันนี้ ไม่ต้องรอคิวให้เหนื่อยอีกต่อไป!",
        concept: "นำเสนอความสะดวกของการจองคิวออนไลน์และจิตบริการที่อบอุ่นของเจ้าหน้าที่ขนส่งแพร่",
        recommendedPrompt: "A bright, warm, and cinematic 4k video of a modern Thai provincial land transport office in Phrae, Thailand. A smiling Thai government female officer in clean formal khaki and indigo Phrae Mor-Hom uniform politely greeting visitors with a traditional Wai. A visitor happily showing a confirmed digital queue ticket on a smartphone. Smooth steady camera, cinematic lighting, cheerful hospitality.",
        scenes: [
          {
            time: "0:00 - 0:03",
            visual: "ภาพมุมกว้างสำนักงานขนส่งจังหวัดแพร่ ป้ายชื่อชัดเจน บรรยากาศร่มรื่น",
            audio: "ยินดีต้อนรับสู่สำนักงานขนส่งจังหวัดแพร่ เจ้าหน้าที่พร้อมดูแลคุณด้วยใจ",
            caption: "สำนักงานขนส่งจังหวัดแพร่ บริการด้วยใจ"
          },
          {
            time: "0:03 - 0:06",
            visual: "ภาพคนแพร่เปิดแอป DLT Smart Queue จองคิวเพียงไม่กี่คลิก",
            audio: "จองคิวออนไลน์ง่ายๆ ผ่านแอป DLT Smart Queue ล่วงหน้าได้ตลอด 24 ชั่วโมง",
            caption: "จองคิวออนไลน์ สะดวก รวดเร็ว ใน 1 นาที"
          },
          {
            time: "0:06 - 0:10",
            visual: "มาถึงขนส่ง สแกน QR Code แล้วเข้ารับบริการช่องทางพิเศษ เจ้าหน้าที่ยิ้มแย้ม",
            audio: "มาถึงตามเวลานัด รับบริการรวดเร็ว ทันใจ ยิ้มแย้มประทับใจทุกขั้นตอน",
            caption: "ตรงต่อเวลา สะดวกสบาย รวดเร็วทันใจ"
          }
        ],
        callToAction: "ดาวน์โหลดแอป DLT Smart Queue ได้แล้ววันนี้ ทั้ง iOS และ Android",
        hashtags: ["#ขนส่งแพร่", "#DLTSmartQueue", "#จิตบริการขนส่ง", "#เมืองแพร่น่าอยู่"]
      };
    }

    res.json({ success: true, script: parsedResult });
  } catch (error: any) {
    console.error('[Script Gen Error]:', error);
    res.status(500).json({ error: error?.message || 'ไม่สามารถสร้างสคริปต์ได้' });
  }
});

// 3. API: Generate Voiceover TTS with gemini-3.8-flash-lite-tts
app.post('/api/generate-tts', async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, voice = 'Kore', speed = 1.0 } = req.body;

    if (!text) {
      res.status(400).json({ error: 'กรุณาระบุข้อความสำหรับอ่านออกเสียง' });
      return;
    }

    const ai = getGeminiClient();

    const interaction = await ai.interactions.create({
      model: 'gemini-3.8-flash-lite-tts',
      input: [
        {
          type: 'text',
          text: text,
          annotations: [
            {
              type: 'speech_metadata',
              style: 'Warm, clear, polite and welcoming Thai provincial customer service representative'
            }
          ]
        }
      ],
      response_format: { type: 'audio' },
      generation_config: {
        speech_config: [
          {
            language: 'th-TH',
            voice: voice
          }
        ]
      }
    });

    const audio = interaction.output_audio;
    if (audio?.data) {
      res.json({
        success: true,
        audioBase64: audio.data,
        mimeType: audio.mime_type || 'audio/wav'
      });
      return;
    }

    res.status(500).json({ error: 'ไม่พบไฟล์เสียงที่สร้างจากโมเดล' });
  } catch (error: any) {
    console.error('[TTS Gen Error]:', error);
    res.status(500).json({ error: error?.message || 'ไม่สามารถสร้างเสียงบรรยายได้' });
  }
});

// Setup Vite or static serving
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true }
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
