import React from 'react';
import { Video, CalendarCheck, Film, Building2, Sparkles, ExternalLink } from 'lucide-react';

interface NavbarProps {
  activeTab: 'studio' | 'queue' | 'gallery' | 'office';
  setActiveTab: (tab: 'studio' | 'queue' | 'gallery' | 'office') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Office Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('studio')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 shadow-lg shadow-indigo-500/20">
              <span className="text-2xl font-bold text-white tracking-wider">ขส</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" title="ระบบพร้อมใช้งาน" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  ขนส่งจังหวัดแพร่ • DLT Phrae
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  <Sparkles className="w-3 h-3" /> จิตบริการประทับใจ
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
                DLT Phrae Smart Video Studio
              </h1>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'studio'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>สตูดิโอสร้างวิดีโอ</span>
            </button>

            <button
              onClick={() => setActiveTab('queue')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'queue'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>จองคิว & คิวจำลอง</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>แกลเลอรีสื่อประชาสัมพันธ์</span>
            </button>

            <button
              onClick={() => setActiveTab('office')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'office'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>ข้อมูลขนส่งแพร่</span>
            </button>
          </nav>

          {/* External DLT Queue Link */}
          <div className="flex items-center gap-2">
            <a
              href="https://gecc.dlt.go.th"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-600 hover:to-purple-600 border border-indigo-400/30 shadow-md shadow-purple-900/20 transition-all hover:scale-[1.02]"
            >
              <span>DLT Smart Queue</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-slate-800 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
              activeTab === 'studio' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>สร้างวิดีโอ</span>
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
              activeTab === 'queue' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>จองคิว DLT</span>
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
              activeTab === 'gallery' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>แกลเลอรี</span>
          </button>
          <button
            onClick={() => setActiveTab('office')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
              activeTab === 'office' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>ข้อมูลขนส่ง</span>
          </button>
        </div>
      </div>
    </header>
  );
};
