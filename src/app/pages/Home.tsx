import { ChevronRight, BookmarkPlus, MapPin, JapaneseYen, Clock } from "lucide-react";
import { Link } from "react-router";
import { useLayoutContext } from "../components/Layout";
import { AdBanner } from "../components/AdBanner";

export function Home() {
  const { openLoginModal } = useLayoutContext();

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Search Bar Placeholder */}
      <div className="bg-white rounded-full shadow-sm border border-[#B9C2DB] p-3 flex items-center gap-3 text-gray-400">
        <div className="w-5 h-5 ml-2">🔍</div>
        <span className="text-sm">キーワード、大学名でさがす</span>
      </div>

      {/* Hero Banner (Large) */}
      <Link to="/campaign/1" className="block relative w-full h-56 rounded-2xl overflow-hidden shadow-md group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1758691461973-553db5285280?auto=format&fit=crop&q=80&w=1080" 
          alt="医学生のためのキャリア支援" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11204C]/80 via-[#1E3A8A]/20/20 to-transparent flex flex-col justify-end p-5">
          <span className="bg-[#1E3A8A] text-white text-xs font-bold px-2.5 py-1 rounded-full w-max mb-2 shadow-sm">
            4年生以上対象
          </span>
          <h2 className="text-white text-xl font-extrabold leading-tight shadow-sm">
            医学生特化の<br/>キャリアマッチング
          </h2>
          <p className="text-[#B9C2DB] text-sm mt-1">HagNavi限定のインターン情報をチェック</p>
        </div>
      </Link>

      {/* Medium Banners (Grid) */}
      <section>
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#1E3A8A] rounded-full"></span>
            おすすめコンテンツ
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/campaign/2" className="relative h-32 rounded-xl overflow-hidden shadow-sm group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1609126385558-bc3fc5082b0a?auto=format&fit=crop&q=80&w=600" 
              alt="留学・部活動" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 p-3 flex flex-col justify-end">
              <span className="text-white font-bold text-sm">留学・部活動</span>
            </div>
          </Link>
          <Link to="/jobs/1" className="relative h-32 rounded-xl overflow-hidden shadow-sm group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1603726574690-cc3138bfec8c?auto=format&fit=crop&q=80&w=600" 
              alt="家庭教師・塾" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 p-3 flex flex-col justify-end">
              <span className="text-white font-bold text-sm">高時給！<br/>家庭教師・塾講師</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Ad Banner - Infeed */}
      <AdBanner
        type="infeed"
        campaignId="3"
        title="医学部生のための奨学金情報2026"
        imageUrl="https://images.unsplash.com/photo-1603726574690-cc3138bfec8c?auto=format&fit=crop&q=80&w=1080"
        sponsorName="医療奨学財団"
      />

      {/* Small Banners (Horizontal Scroll) */}
      <section>
        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-3">
          <span className="w-1.5 h-4 bg-[#1E3A8A] rounded-full"></span>
          カテゴリから探す
        </h3>
        <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { id: 1, title: "今がアツい!離島クリニック", img: "https://images.unsplash.com/photo-1758691462848-ba1e929da259" },
            { id: 2, title: "先輩医師へのインタビュー", img: "https://images.unsplash.com/photo-1560111828-e16fc96d9a5e" },
            { id: 3, title: "CBTって何からやればええの", img: "https://images.unsplash.com/photo-1603726574690-cc3138bfec8c" }
          ].map((item) => (
            <Link key={item.id} to={`/campaign/${item.id}`} className="shrink-0 w-36 snap-start cursor-pointer group">
              <div className="h-20 rounded-lg overflow-hidden relative shadow-sm border border-[#F2F4F8]">
                <img src={`${item.img}?auto=format&fit=crop&w=400&q=80`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <p className="text-xs font-semibold text-gray-700 mt-1.5 text-center">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Banner - Infeed */}
      <AdBanner
        type="infeed"
        campaignId="4"
        title="専門医インタビュー連載スタート！"
        imageUrl="https://images.unsplash.com/photo-1560111828-e16fc96d9a5e?auto=format&fit=crop&q=80&w=1080"
        sponsorName="メディカルジャーナル"
      />

      {/* Recent Jobs */}
      <section className="pb-4">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#1E3A8A] rounded-full"></span>
            新着の求人
          </h3>
          <Link to="/jobs" className="text-xs text-[#1E3A8A] font-medium flex items-center hover:text-[#11204C]">
            すべて見る <ChevronRight size={14} />
          </Link>
        </div>

        <div className="space-y-4">
          {/* Job Card */}
          {[1, 2].map((i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-[#F2F4F8] relative hover:shadow-md transition-shadow">
              <button 
                onClick={(e) => { e.preventDefault(); openLoginModal(); }}
                className="absolute top-4 right-4 text-gray-300 hover:text-[#1E3A8A] transition-colors"
              >
                <BookmarkPlus size={22} strokeWidth={1.5} />
              </button>
              
              <div className="flex gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#B9C2DB]/30 text-[#11204C] rounded">家庭教師</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded">都内</span>
              </div>
              
              <h4 className="font-bold text-gray-800 leading-snug pr-8 mb-3">
                医学部受験生向けのマンツーマン指導（週1回〜OK）
              </h4>
              
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center gap-1.5"><MapPin size={14} className="text-[#1E3A8A]" /> 東京都 港区（オンライン応相談）</div>
                <div className="flex items-center gap-1.5"><JapaneseYen size={14} className="text-[#1E3A8A]" /> 時給 3,500円〜</div>
                <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#1E3A8A]" /> 平日 18:00〜21:00 の間で2時間</div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">1時間前に更新</span>
                <Link 
                  to={`/jobs/${i}`}
                  className="bg-[#F2F4F8] text-[#11204C] hover:bg-[#1E3A8A] hover:text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}