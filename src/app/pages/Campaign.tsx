import { ChevronRight, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { useLayoutContext } from "../components/Layout";
import { AdBanner } from "../components/AdBanner";

export function Campaign() {
  const { openLoginModal } = useLayoutContext();

  const campaigns = [
    {
      id: 1,
      title: "最新の医療機器・設備を学ぶ",
      company: "MedTech Innovations",
      img: "https://images.unsplash.com/photo-1758691462848-ba1e929da259?auto=format&fit=crop&q=80&w=600",
      description: "次世代の手術支援ロボットやAI診断ツールの見学・体験プログラムを開催中。医学生限定の特別セッションです。",
      tag: "見学会",
    },
    {
      id: 2,
      title: "若手医師との座談会・キャリア相談",
      company: "第一総合病院グループ",
      img: "https://images.unsplash.com/photo-1758691461973-553db5285280?auto=format&fit=crop&q=80&w=600",
      description: "現場で活躍する先輩医師から直接話が聞けるチャンス。初期研修のリアルな情報を知りたい方必見。",
      tag: "座談会",
    },
    {
      id: 3,
      title: "医学生向け奨学金プログラム説明会",
      company: "公益財団法人 未来医療基金",
      img: "https://images.unsplash.com/photo-1603726574690-cc3138bfec8c?auto=format&fit=crop&q=80&w=600",
      description: "返済不要の給付型奨学金や海外留学支援制度について、詳しい応募条件や選考プロセスをご案内します。",
      tag: "説明会",
    }
  ];

  return (
    <div className="w-full max-w-lg mx-auto pb-10 space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
      
      {/* Hero Section */}
      <div className="relative w-full h-48 bg-gradient-to-br from-[#1E3A8A] to-[#11204C] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1758691461973-553db5285280?auto=format&fit=crop&q=80&w=1080')] opacity-20 mix-blend-overlay bg-cover bg-center" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
          <span className="text-[#B9C2DB] font-bold tracking-widest text-xs mb-2">SPECIAL CAMPAIGN</span>
          <h2 className="text-white text-2xl font-extrabold leading-tight mb-3">
            医学生のための<br/>企業・病院特集
          </h2>
          <p className="text-white text-xs max-w-xs leading-relaxed">
            HagNaviが厳選した、医学生の皆様に知ってほしい企業や医療機関の特別コンテンツです。
          </p>
        </div>
      </div>

      <div className="px-4 space-y-6 -mt-6 relative z-10">
        {campaigns.map((camp, idx) => (
          <div key={camp.id}>
            {idx === 2 && (
              <div className="mb-6">
                <AdBanner
                  type="infeed"
                  campaignId="6"
                  title="医療AIスタートアップ説明会開催"
                  imageUrl="https://images.unsplash.com/photo-1560111828-e16fc96d9a5e?auto=format&fit=crop&q=80&w=1080"
                  sponsorName="メディカルテックカンパニー"
                />
              </div>
            )}
          <div className="bg-white rounded-2xl shadow-sm border border-[#F2F4F8] overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-40 overflow-hidden">
              <img 
                src={camp.img} 
                alt={camp.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#1E3A8A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                {camp.tag}
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2 group-hover:text-[#11204C] transition-colors">
                {camp.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded bg-[#F2F4F8] flex items-center justify-center text-[#1E3A8A] font-bold text-[10px]">
                  C
                </div>
                <span className="text-xs font-semibold text-gray-500">{camp.company}</span>
              </div>
              
              <p className="text-xs text-gray-600 leading-relaxed mb-5 line-clamp-2">
                {camp.description}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to={`/campaign/${camp.id}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#B9C2DB] text-[#1E3A8A] text-xs font-bold hover:bg-[#F2F4F8] transition-colors active:scale-95"
                >
                  <ExternalLink size={14} /> 詳細を見る
                </Link>
                <button 
                  onClick={() => openLoginModal()}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#11204C] shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  エントリー <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
          </div>
        ))}

        {/* Banner for Sponsoring */}
        <div className="mt-8 bg-gradient-to-r from-gray-50 to-[#F2F4F8] rounded-2xl p-6 border border-[#B9C2DB] text-center">
          <p className="text-xs font-bold text-gray-500 mb-1">企業・医療機関のご担当者様へ</p>
          <h4 className="text-sm font-bold text-gray-800 mb-3">HagNaviへの広告掲載について</h4>
          <button className="text-xs bg-white text-[#1E3A8A] border border-[#B9C2DB] px-5 py-2 rounded-full font-bold shadow-sm hover:bg-[#F2F4F8] transition-colors inline-flex items-center gap-1">
            資料請求・お問い合わせ <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}