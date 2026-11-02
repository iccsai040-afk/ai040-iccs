import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  HeartHandshake, 
  Car, 
  FileText, 
  ShieldCheck, 
  CheckCircle,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { OFFICE_INFO } from '../data/phraeData.ts';

export const OfficeInfo: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Service Mind Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>จิตบริการด้วยใจ ชาวขนส่งแพร่</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            สำนักงานขนส่งจังหวัดแพร่
          </h2>
          <p className="text-base font-medium text-amber-300">
            "{OFFICE_INFO.motto}"
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            พวกเราชาวขนส่งจังหวัดแพร่ มุ่งมั่นพัฒนาระบบการให้บริการด้านการคมนาคมขนส่งทางถนน ด้วยความซื่อสัตย์ สุจริต โปร่งใส ยิ้มแย้มแจ่มใส ให้ความช่วยเหลือดูแลประชาชนดุจญาติมิตร พร้อมก้าวสู่การเป็นหน่วยงานดิจิทัลที่ทันสมัยเพื่อพี่น้องชาวแพร่ทุกคน
          </p>
        </div>
      </div>

      {/* 4 Pillars of Service Mind */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">ยิ้มแย้มแจ่มใส</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            ต้อนรับประชาชนด้วยรอยยิ้ม อัธยาศัยไมตรีเมืองแพร่ สุภาพอ่อนน้อม ให้เกียรติผู้รับบริการทุกท่าน
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">รวดเร็ว ฉับไว</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            บริการตามคิวนัดหมาย DLT Smart Queue ตรงต่อเวลา ลดขั้นตอนที่ซ้ำซ้อน ไม่ต้องรอนาน
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">ถูกต้อง มาตรฐาน</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            ปฏิบัติงานตามระเบียบและกฎหมายด้วยความถูกต้อง โปร่งใส ชัดเจน และตรวจสอบได้
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
            <Car className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Drive Thru สะดวก</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            บริการ "เลื่อนล้อต่อภาษี" (Drive Thru for Tax) ไม่ต้องลงจากรถ เสร็จไวใน 2 นาที
          </p>
        </div>
      </div>

      {/* Locations & Contact Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-400" />
          <span>สถานที่ตั้งและช่องทางติดต่อ</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OFFICE_INFO.branches.map((b, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    {idx === 0 ? 'สำนักงานใหญ่' : 'สาขาย่อย'}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">{b.name}</h4>
                </div>
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{b.phone} (โทรสาร: {b.fax})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{b.hours}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-medium">เปิดทำการในวันและเวลาราชการ</span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(b.name + ' ' + b.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>ดูแผนที่การเดินทาง</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <span>รายการเอกสารที่ต้องจัดเตรียม สำหรับงานบริการหลัก</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFICE_INFO.services.map((svc) => (
            <div key={svc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{svc.name}</h4>
                <span className="text-[11px] text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded">
                  {svc.durationEstimate}
                </span>
              </div>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                {svc.docs.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
