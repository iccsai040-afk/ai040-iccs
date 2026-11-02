import React, { useState } from 'react';
import { 
  Smartphone, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  QrCode, 
  Download, 
  Sparkles, 
  FileCheck, 
  Printer, 
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  User,
  Phone
} from 'lucide-react';
import { QueueBooking } from '../types.ts';
import { OFFICE_INFO } from '../data/phraeData.ts';

export const SmartQueueGuide: React.FC = () => {
  // Simulator State
  const [branch, setBranch] = useState<string>(OFFICE_INFO.branches[0].name);
  const [serviceId, setServiceId] = useState<string>(OFFICE_INFO.services[0].id);
  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('09:30 - 10:30 น.');
  const [fullName, setFullName] = useState<string>('นายสมชาย ใจดี');
  const [phone, setPhone] = useState<string>('089-123-4567');
  const [bookingConfirmed, setBookingConfirmed] = useState<QueueBooking | null>(null);

  const selectedService = OFFICE_INFO.services.find(s => s.id === serviceId) || OFFICE_INFO.services[0];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = `PR-${serviceId === 'car-tax' ? 'B' : 'A'}${Math.floor(100 + Math.random() * 900)}`;
    
    const booking: QueueBooking = {
      ticketNumber: randomTicket,
      branch,
      serviceType: selectedService.name,
      date,
      timeSlot,
      fullName: fullName || 'ผู้รับบริการ ขนส่งแพร่',
      citizenId: '1-5499-XXXXX-XX-X',
      phone: phone || '08X-XXX-XXXX',
      channel: 'ช่องบริการด่วน Smart Queue ขนส่งจังหวัดแพร่',
      requiredDocuments: selectedService.docs
    };

    setBookingConfirmed(booking);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>ระบบคิวอัจฉริยะ กรมการขนส่งทางบก</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ขั้นตอนการจองคิวออนไลน์ <span className="text-indigo-400">DLT Smart Queue</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            สะดวกรวดเร็ว ไม่ต้องเดินทางมารอคิวตั้งแต่เช้าตรู่ เลือกวันและเวลาที่สะดวกได้ด้วยตนเองตลอด 24 ชั่วโมง พร้อมเข้ารับบริการช่องทางด่วน ณ สำนักงานขนส่งจังหวัดแพร่
          </p>
        </div>
      </div>

      {/* 5-Step Visual Walkthrough */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>5 ขั้นตอนง่ายๆ จองคิวลุล่วงใน 1 นาที</span>
          </h3>
          <span className="text-xs text-slate-400">ทำได้ทุกที่ ทุกเวลา</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          
          {/* Step 1 */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between space-y-3 relative group hover:border-indigo-500/50 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h4 className="text-sm font-bold text-white">ดาวน์โหลดแอป</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                โหลดแอป <strong>DLT Smart Queue</strong> บน iOS / Android หรือเข้าเว็บ <strong>gecc.dlt.go.th</strong>
              </p>
            </div>
            <div className="text-[11px] text-indigo-400 font-medium">เปิดใช้งานฟรี</div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between space-y-3 relative group hover:border-indigo-500/50 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h4 className="text-sm font-bold text-white">เลือกขนส่งแพร่</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                ลงทะเบียนด้วยเลขบัตรประชาชน แล้วเลือก <strong>สำนักงานขนส่งจังหวัดแพร่</strong> หรือสาขาเด่นชัย
              </p>
            </div>
            <div className="text-[11px] text-indigo-400 font-medium">ครอบคลุมทั้ง 2 สาขา</div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between space-y-3 relative group hover:border-indigo-500/50 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h4 className="text-sm font-bold text-white">เลือกงานบริการ</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                เลือกประเภทงาน เช่น ทำใบขับขี่ใหม่, ต่ออายุใบขับขี่, ชำระภาษีรถ หรือโอนทะเบียนรถ
              </p>
            </div>
            <div className="text-[11px] text-indigo-400 font-medium">มีระบบคัดกรองเอกสาร</div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between space-y-3 relative group hover:border-indigo-500/50 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h4 className="text-sm font-bold text-white">เลือกวันและรอบเวลา</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                เลือกวันที่ต้องการในปฏิทิน และเลือกรอบเวลาที่สะดวก พร้อมกดยืนยันการจองคิว
              </p>
            </div>
            <div className="text-[11px] text-indigo-400 font-medium">ตรงเวลา ไม่ต้องรอ</div>
          </div>

          {/* Step 5 */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between space-y-3 relative group hover:border-indigo-500/50 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-lg">
                5
              </div>
              <h4 className="text-sm font-bold text-white">รับคิว QR Code</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                บันทึกภาพหน้าจอ QR Code แล้วนำมาแสดงต่อเจ้าหน้าที่ก่อนเวลานัดหมาย 15 นาที
              </p>
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">เข้าช่องบริการด่วนทันที</div>
          </div>

        </div>
      </div>

      {/* Interactive Queue Booking Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Booking Form (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-400" />
              <span>ทดลองจำลองการจองคิว (DLT Smart Queue Simulator)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              ลองทดสอบระบบเพื่อดูรูปแบบบัตรคิวอิเล็กทรอนิกส์และเอกสารที่ต้องเตรียม
            </p>
          </div>

          <form onSubmit={handleConfirmBooking} className="space-y-4">
            
            {/* Branch Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>เลือกสถานที่รับบริการ</span>
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {OFFICE_INFO.branches.map((b, i) => (
                  <option key={i} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Service Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>เลือกประเภทงานบริการ</span>
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {OFFICE_INFO.services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Date & Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>เลือกวันที่ต้องการรับบริการ</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>เลือกรอบเวลา</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="08:30 - 09:30 น.">08:30 - 09:30 น. (รอบเช้า 1)</option>
                  <option value="09:30 - 10:30 น.">09:30 - 10:30 น. (รอบเช้า 2)</option>
                  <option value="10:30 - 11:30 น.">10:30 - 11:30 น. (รอบเช้า 3)</option>
                  <option value="13:00 - 14:00 น.">13:00 - 14:00 น. (รอบบ่าย 1)</option>
                  <option value="14:00 - 15:00 น.">14:00 - 15:00 น. (รอบบ่าย 2)</option>
                  <option value="15:00 - 16:00 น.">15:00 - 16:00 น. (รอบบ่าย 3)</option>
                </select>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>ชื่อ-นามสกุล ผู้รับบริการ</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="เช่น นายสมชาย ใจดี"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  <span>เบอร์โทรศัพท์ติดต่อ</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08X-XXX-XXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01]"
            >
              ออกบัตรคิวอิเล็กทรอนิกส์จำลอง (Generate e-Queue Pass)
            </button>
          </form>

        </div>

        {/* Generated e-Ticket Pass (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          {bookingConfirmed ? (
            <div className="w-full max-w-sm bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border-4 border-indigo-600 space-y-4 animate-scale-up relative overflow-hidden">
              
              {/* Ticket Top Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500" />

              {/* Ticket Header */}
              <div className="text-center pt-2 pb-1 border-b border-dashed border-slate-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xl mb-1 border border-indigo-200">
                  ขส
                </div>
                <h4 className="text-sm font-bold text-slate-800">สำนักงานขนส่งจังหวัดแพร่</h4>
                <p className="text-[11px] text-slate-500">DLT Smart Queue Electronic Ticket</p>
              </div>

              {/* Big Queue Number */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100 text-center space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">หมายเลขคิวของคุณ</div>
                <div className="text-4xl font-extrabold text-indigo-900 tracking-wider font-mono">
                  {bookingConfirmed.ticketNumber}
                </div>
                <div className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full inline-block">
                  ช่องบริการด่วน Smart Service
                </div>
              </div>

              {/* Booking Info */}
              <div className="space-y-2 text-xs text-slate-700 border-b border-dashed border-slate-300 pb-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">บริการ:</span>
                  <span className="font-semibold text-right max-w-[200px]">{bookingConfirmed.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">วันที่นัดหมาย:</span>
                  <span className="font-semibold">{bookingConfirmed.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ช่วงเวลา:</span>
                  <span className="font-semibold text-indigo-700">{bookingConfirmed.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ชื่อผู้จอง:</span>
                  <span className="font-semibold">{bookingConfirmed.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">สถานที่:</span>
                  <span className="font-semibold text-right text-[11px]">{bookingConfirmed.branch}</span>
                </div>
              </div>

              {/* Mock QR Code */}
              <div className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-28 h-28 bg-white border border-slate-300 rounded-lg p-2 flex items-center justify-center shadow-inner">
                  <QrCode className="w-24 h-24 text-slate-900" />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">สแกนที่ตู้คิวขนส่งแพร่เพื่อรับบัตรจริง</p>
              </div>

              {/* Checklist Notice */}
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1 text-amber-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>เอกสารที่ต้องนำมาด้วย:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[10px] text-amber-950 pl-1">
                  {bookingConfirmed.requiredDocuments.slice(0, 3).map((doc, idx) => (
                    <li key={idx} className="line-clamp-1">{doc}</li>
                  ))}
                </ul>
              </div>

              {/* Action Print */}
              <div className="pt-1 flex gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>พิมพ์หรือบันทึกบัตรคิว</span>
                </button>
              </div>

            </div>
          ) : (
            /* Placeholder before booking */
            <div className="w-full max-w-sm bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <QrCode className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-200">ยังไม่มีบัตรคิวจำลอง</h4>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  กรอกข้อมูลในแบบฟอร์มด้านซ้ายและกด <strong>"ออกบัตรคิวอิเล็กทรอนิกส์จำลอง"</strong> เพื่อดูตัวอย่างบัตรคิว
                </p>
              </div>
              <div className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                สะดวกรวดเร็วใน 1 นาที
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
