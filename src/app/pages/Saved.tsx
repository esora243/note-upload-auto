import { useState } from "react";
import { Link } from "react-router";
import { Bookmark, Clock, MapPin, JapaneseYen, ExternalLink, ChevronRight } from "lucide-react";
import { useLayoutContext } from "../components/Layout";

export function Saved() {
  const { isLoggedIn, openLoginModal } = useLayoutContext();
  const [activeTab, setActiveTab] = useState<"jobs" | "campaigns">("jobs");

  // Since this page requires login, theoretically we shouldn't see this state, but as a fallback:
  if (!isLoggedIn) {
    return (
      <div className="w-full max-w-lg mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <Bookmark size={48} className="text-[#B9C2DB] mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">保存機能</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">保存した求人やキャンペーンを見るにはログインが必要です</p>
        <button 
          onClick={openLoginModal}
          className="bg-[#1E3A8A] text-white font-bold py-3 px-8 rounded-full shadow-sm hover:bg-[#11204C] transition-colors"
        >
          ログインする
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto pb-20 animate-in fade-in slide-in-from-right-2 duration-300">
      
      {/* Header */}
      <div className="sticky top-[110px] z-30 bg-[#F2F4F8]/90 backdrop-blur-md pt-2 pb-3 px-4 border-b border-[#B9C2DB]">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Bookmark className="text-[#1E3A8A]" />
          保存リスト
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-full p-1 border border-[#B9C2DB] shadow-sm px-4 pt-3">
        <button 
          onClick={() => setActiveTab("jobs")}
          className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${
            activeTab === "jobs" ? "bg-[#1E3A8A] text-white shadow" : "text-gray-500 hover:text-[#1E3A8A]"
          }`}
        >
          求人 (2)
        </button>
        <button 
          onClick={() => setActiveTab("campaigns")}
          className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${
            activeTab === "campaigns" ? "bg-[#1E3A8A] text-white shadow" : "text-gray-500 hover:text-[#1E3A8A]"
          }`}
        >
          キャンペーン (1)
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4 px-4 pt-3">
        
        {activeTab === "jobs" && (
          <>
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-[#F2F4F8] relative group">
                <button className="absolute top-4 right-4 text-[#1E3A8A] hover:text-gray-300 transition-colors">
                  <Bookmark size={22} className="fill-current" />
                </button>
                
                <div className="flex gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#B9C2DB]/30 text-[#11204C] rounded">
                    {i === 1 ? "インターン" : "家庭教師"}
                  </span>
                </div>
                
                <h4 className="font-bold text-gray-800 leading-snug pr-8 mb-3 group-hover:text-[#11204C] transition-colors">
                  {i === 1 
                    ? "医療系スタートアップでのPMアシスタント業務（フルリモート）"
                    : "医学部受験生向けのマンツーマン指導（週1回〜OK）"}
                </h4>
                
                <div className="space-y-1.5 text-xs text-gray-600 mb-4 bg-gray-50/50 p-3 rounded-xl border border-gray-50">
                  <div className="flex items-center gap-1.5"><MapPin size={14} className="text-[#1E3A8A] shrink-0" /> {i === 1 ? "フルリモート" : "東京都 港区"}</div>
                  <div className="flex items-center gap-1.5"><JapaneseYen size={14} className="text-[#1E3A8A] shrink-0" /> {i === 1 ? "時給 1,500円〜" : "時給 3,500円〜"}</div>
                  <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#1E3A8A] shrink-0" /> {i === 1 ? "週10時間程度" : "平日 18:00〜21:00"}</div>
                </div>
                
                <Link 
                  to={`/jobs/${i}`}
                  className="flex items-center justify-center w-full bg-[#F2F4F8] text-[#11204C] text-xs font-bold py-2.5 rounded-xl hover:bg-[#B9C2DB]/30 transition-colors"
                >
                  詳細を見る
                </Link>
              </div>
            ))}
          </>
        )}

        {activeTab === "campaigns" && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#F2F4F8] overflow-hidden">
            <div className="relative h-32 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1758691462848-ba1e929da259?auto=format&fit=crop&q=80&w=600" 
                alt="Campaign"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#1E3A8A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                見学会
              </div>
              <button className="absolute top-3 right-3 text-[#1E3A8A] bg-white/80 p-1.5 rounded-full backdrop-blur-sm">
                <Bookmark size={18} className="fill-current" />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-800 text-sm leading-tight mb-2">
                最新の医療機器・設備を学ぶ
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded bg-[#F2F4F8] flex items-center justify-center text-[#1E3A8A] font-bold text-[10px]">
                  C
                </div>
                <span className="text-xs font-semibold text-gray-500">MedTech Innovations</span>
              </div>
              
              <Link 
                to="/campaign/1"
                className="flex items-center justify-center w-full bg-[#F2F4F8] text-[#11204C] text-xs font-bold py-2.5 rounded-xl hover:bg-[#B9C2DB]/30 transition-colors"
              >
                詳細を見る <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}