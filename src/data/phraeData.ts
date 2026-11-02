import { VideoPreset } from '../types.ts';

export const VIDEO_PRESETS: VideoPreset[] = [
  {
    id: 'preset-queue-easy',
    title: 'จองคิวง่ายใน 1 นาที ด้วย DLT Smart Queue',
    subtitle: 'นำเสนอความง่ายของการจองคิวออนไลน์ ไม่ต้องเดินทางมารอแต่เช้า',
    category: 'smart-queue',
    badge: 'ยอดนิยมสำหรับโซเชียล',
    suggestedAspectRatio: '9:16',
    suggestedDuration: '5s',
    thaiNarration: 'ชาวแพร่ยุคใหม่ สบายใจกว่าเดิม! จองคิวล่วงหน้าผ่านแอป DLT Smart Queue สะดวก รวดเร็ว เลือกวันและเวลาได้เอง ไม่ต้องยืนรอคิวอีกต่อไป',
    thaiSubtitles: [
      '📲 โหลดแอป DLT Smart Queue',
      '📍 เลือกขนส่งจังหวัดแพร่',
      '⏱️ รับบริการตรงเวลา รวดเร็วทันใจ'
    ],
    thumbnailGradient: 'from-blue-600 via-indigo-600 to-purple-700',
    prompt: 'A cinematic high quality realistic 9:16 vertical video of a modern Thai woman in Phrae province smiling happily while holding a smartphone. She taps the DLT Smart Queue app screen which displays a green confirmed booking badge. Next cut: she comfortably steps into the brightly lit Phrae Land Transport office, warmly greeted with a traditional polite Thai Wai by friendly transport officers in neat beige uniforms with subtle Phrae indigo Mor-Hom accents. Bright modern atmosphere, crisp 4k resolution, welcoming and trustworthy government service.'
  },
  {
    id: 'preset-service-mind',
    title: 'จิตบริการด้วยใจ เจ้าหน้าที่ขนส่งแพร่พร้อมดูแล',
    subtitle: 'สะท้อนรอยยิ้ม ความอบอุ่น และการดูแลเอาใจใส่ประชาชนอย่างมืออาชีพ',
    category: 'service-mind',
    badge: 'สร้างความประทับใจ',
    suggestedAspectRatio: '16:9',
    suggestedDuration: '5s',
    thaiNarration: 'สำนักงานขนส่งจังหวัดแพร่ บริการด้วยใจ ยิ้มแย้มแจ่มใส ให้คำแนะนำทุกขั้นตอน เพื่อความสะดวกสบายและความประทับใจสูงสุดของพ่อแม่พี่น้องชาวแพร่',
    thaiSubtitles: [
      '✨ ยินดีต้อนรับสู่สำนักงานขนส่งจังหวัดแพร่',
      '🤝 บริการด้วยรอยยิ้มและจิตบริการ',
      '💖 สุภาพ รวดเร็ว ถูกต้อง ประทับใจ'
    ],
    thumbnailGradient: 'from-amber-600 via-orange-600 to-rose-700',
    prompt: 'A cinematic 16:9 widescreen video showing the heart of public service at Phrae Provincial Land Transport Office. A smiling, courteous Thai male and female officer in official transport uniforms warmly assisting an elderly citizen and a young driver at a clean modern customer counter. The officers explain documents with gentle gestures and warm northern Thai friendliness. Sunlight streaming through large glass windows, lush northern trees outside, professional, heartwarming atmosphere.'
  },
  {
    id: 'preset-fast-track',
    title: 'ต่อภาษีและทำใบขับขี่ รวดเร็วฉับไว ไร้กังวล',
    subtitle: 'โฟกัสขั้นตอนรวดเร็วเมื่อมาถึง เพียงสแกนคิว ก็รับบริการช่องทางด่วนทันที',
    category: 'fast-track',
    badge: 'ขั้นตอนฉับไว',
    suggestedAspectRatio: '16:9',
    suggestedDuration: '5s',
    thaiNarration: 'มาถึงขนส่งแพร่ตามเวลา สแกน QR Code คิวอัจฉริยะ เข้ารับบริการช่องด่วนทันใจ ทั้งต่อภาษีและทำใบอนุญาตขับรถ สะดวก ปลอดภัย มืออาชีพ',
    thaiSubtitles: [
      '🎟️ สแกน QR Code รับบัตรคิวทันที',
      '⚡ ช่องบริการด่วน Smart Service',
      '🚗 เสร็จไว มั่นใจ ได้มาตรฐาน'
    ],
    thumbnailGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    prompt: 'A dynamic 16:9 commercial style video at Phrae transport office. A citizen smoothly scans a smartphone QR code at a sleek modern digital kiosk. An electronic bell rings with number displayed on LED screen. A polite officer immediately waves them to Counter 3. The transaction for vehicle tax and driver license renewal is completed smoothly in a few minutes with smiles. Fast, seamless, futuristic provincial governance.'
  },
  {
    id: 'preset-welcome-phrae',
    title: 'ยินดีต้อนรับสู่สำนักงานขนส่งจังหวัดแพร่ ยุคดิจิทัล',
    subtitle: 'เปิดภาพทัศนียภาพสำนักงานขนส่งแพร่และคำเชิญชวนอย่างสง่างาม',
    category: 'welcome',
    badge: 'ภาพลักษณ์องค์กร',
    suggestedAspectRatio: '16:9',
    suggestedDuration: '10s',
    thaiNarration: 'สำนักงานขนส่งจังหวัดแพร่ ก้าวสู่ยุคบริการดิจิทัลเต็มรูปแบบ ยกระดับการบริการเพื่อคุณภาพชีวิตที่ดีของชาวเมืองแพร่ทุกท่าน จองคิววันนี้ แล้วพบกันนะคะ',
    thaiSubtitles: [
      '🏢 สำนักงานขนส่งจังหวัดแพร่ ยุคดิจิทัล',
      '🌿 บรรยากาศร่มรื่น สะอาด สะดวกสบาย',
      '📱 จองคิวล่วงหน้าง่ายๆ ได้ทุกวัน'
    ],
    thumbnailGradient: 'from-indigo-700 via-blue-800 to-slate-900',
    prompt: 'A majestic cinematic drone shot descending towards the official building of the Phrae Provincial Land Transport Office in Northern Thailand, surrounded by green mountains and blue sky. Text banner or signage in Thai. Then cuts smoothly to the interior showing clean organized waiting areas, smiling staff members waving warmly to the camera, inviting Thai citizens to book online queues. Beautiful golden hour lighting, cinematic film look, 4k.'
  }
];

export const OFFICE_INFO = {
  name: 'สำนักงานขนส่งจังหวัดแพร่ (Phrae Provincial Land Transport Office)',
  motto: 'บริการด้วยใจ ยิ้มแย้มแจ่มใส รวดเร็ว ถูกต้อง ประทับใจ สู่มาตรฐานสากล',
  branches: [
    {
      name: 'สำนักงานขนส่งจังหวัดแพร่ (สำนักงานใหญ่)',
      address: 'เลขที่ 222 หมู่ 7 ถนนยันตรกิจโกศล ตำบลทุ่งโฮ้ง อำเภอเมืองแพร่ จังหวัดแพร่ 54000',
      phone: '054-652-544, 054-652-545',
      fax: '054-652-546',
      hours: 'วันจันทร์ - วันศุกร์ 08.30 - 16.30 น. (เว้นวันหยุดราชการ)'
    },
    {
      name: 'สำนักงานขนส่งจังหวัดแพร่ สาขาอำเภอเด่นชัย',
      address: 'เลขที่ 99 หมู่ 10 ถนนยันตรกิจโกศล ตำบลเด่นชัย อำเภอเด่นชัย จังหวัดแพร่ 54110',
      phone: '054-614-222',
      fax: '054-614-223',
      hours: 'วันจันทร์ - วันศุกร์ 08.30 - 16.30 น. (เว้นวันหยุดราชการ)'
    }
  ],
  services: [
    {
      id: 'driver-license-renew',
      name: 'ต่ออายุใบอนุญาตขับรถ (5 ปี เป็น 5 ปี / 2 ปี เป็น 5 ปี)',
      durationEstimate: 'ประมาณ 45 - 60 นาที (รวมอบรมออนไลน์/ทดสอบสมรรถภาพ)',
      docs: ['บัตรประจำตัวประชาชนฉบับจริง', 'ใบขับขี่เดิมที่หมดอายุหรือใกล้หมดอายุ', 'ใบรับรองแพทย์ (อายุไม่เกิน 1 เดือน)', 'หลักฐานผ่านการอบรมออนไลน์ DLT e-Learning']
    },
    {
      id: 'driver-license-new',
      name: 'ขอรับใบอนุญาตขับรถส่วนบุคคลใหม่ (ชั่วคราว 2 ปี)',
      durationEstimate: 'ตามรอบการอบรมและทดสอบขับขี่',
      docs: ['บัตรประจำตัวประชาชนฉบับจริง', 'ใบรับรองแพทย์ (อายุไม่เกิน 1 เดือน)', 'หลักฐานการจองคิว DLT Smart Queue']
    },
    {
      id: 'car-tax',
      name: 'ชำระภาษีรถประจำปี (ต่อป้ายวงกลม)',
      durationEstimate: 'ประมาณ 5 - 10 นาที (หรือบริการ เลื่อนล้อต่อภาษี Drive-Thru)',
      docs: ['สมุดคู่มือจดทะเบียนรถ (หรือสำเนา)', 'หลักฐาน พ.ร.บ. คุ้มครองผู้ประสบภัยจากรถที่ยังไม่หมดอายุ', 'ใบรับรองการตรวจสภาพรถ (ตรอ.) หากรถยนต์เกิน 7 ปี หรือ จยย. เกิน 5 ปี']
    },
    {
      id: 'vehicle-transfer',
      name: 'โอนกรรมสิทธิ์ / เปลี่ยนแปลงสาระสำคัญของรถ',
      durationEstimate: 'ประมาณ 30 - 45 นาที (ขึ้นอยู่กับการตรวจสภาพ)',
      docs: ['สมุดคู่มือจดทะเบียนรถฉบับจริง', 'หลักฐานบัตร ปชช. ผู้โอนและผู้รับโอน', 'สัญญาซื้อขาย/ใบเสร็จรับเงิน', 'หนังสือมอบอำนาจ (กรณีไม่ได้มาด้วยตนเอง)']
    }
  ]
};
