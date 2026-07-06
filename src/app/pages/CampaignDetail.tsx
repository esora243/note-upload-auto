import { useParams, useNavigate } from "react-router";
import { MapPin, Calendar, Clock, ArrowLeft, BookmarkPlus, Share, Users, CheckCircle2 } from "lucide-react";
import { useLayoutContext } from "../components/Layout";

export function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, openLoginModal } = useLayoutContext();

  const handleApply = () => {
    if (isLoggedIn) {
      alert("モック: キャンペーンにエントリーしました");
    } else {
      openLoginModal();
    }
  };

  const handleSave = () => {
    if (isLoggedIn) {
      alert("モック: キャンペーンを保存しました");
    } else {
      openLoginModal();
    }
  };

  const campaigns = [
    {
      id: "1",
      title: "最新の医療機器・設備を学ぶ",
      company: "MedTech Innovations",
      img: "https://images.unsplash.com/photo-1758691462848-ba1e929da259?auto=format&fit=crop&q=80&w=1080",
      description: "次世代の手術支援ロボットやAI診断ツールの見学・体験プログラムを開催中。医学生限定の特別セッションです。これからの医療を担う皆様に、最先端の技術を肌で感じていただく機会を提供します。",
      tag: "見学会",
      date: "2023年11月15日(水)",
      time: "14:00〜17:00",
      location: "東京都品川区六本木ヒルズ（オンライン併催）",
      capacity: "30名（先着順）",
      target: "医学部4年生〜6年生"
    },
    {
      id: "2",
      title: "若手医師との座談会・キャリア相談",
      company: "第一総合病院グループ",
      img: "https://images.unsplash.com/photo-1758691461973-553db5285280?auto=format&fit=crop&q=80&w=1080",
      description: "現場で活躍する先輩医師から直接話が聞けるチャンス。初期研修のリアルな情報を知りたい方必見。各診療科の若手医師が参加し、皆様の疑問や不安に直接お答えします。少人数制のアットホームな雰囲気で行います。",
      tag: "座談会",
      date: "2023年12月2日(土)",
      time: "10:00〜12:30",
      location: "第一総合病院 本院 大会議室",
      capacity: "20名",
      target: "全学年対象"
    },
    {
      id: "3",
      title: "医学生向け奨学金プログラム説明会",
      company: "公益財団法人 未来医療基金",
      img: "https://images.unsplash.com/photo-1603726574690-cc3138bfec8c?auto=format&fit=crop&q=80&w=1080",
      description: "返済不要の給付型奨学金や海外留学支援制度について、詳しい応募条件や選考プロセスをご案内します。将来、地域医療や基礎研究を志す医学生を強力にバックアップするための制度です。",
      tag: "説明会",
      date: "2023年11月20日(月)",
      time: "18:00〜19:30",
      location: "オンライン（Zoom配信）",
      capacity: "制限なし",
      target: "医学部1年生〜5年生"
    }
  ];

  const camp = campaigns.find(c => c.id === id) || campaigns[0];

  return (
    <div className="w-full max-w-lg mx-auto bg-white min-h-screen animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[#F2F4F8] px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <span className="font-bold text-sm text-gray-800">キャンペーン詳細</span>
        <button className="p-2 -mr-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
          <Share size={18} />
        </button>
      </header>

      {/* Hero Image */}
      <div className="relative w-full h-56">
        <img 
          src={camp.img} 
          alt={camp.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-[#1E3A8A] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
          {camp.tag}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 pb-28">
        
        {/* Title Area */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 leading-snug mb-3">
            {camp.title}
          </h2>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 border-b border-gray-100 pb-4">
            <div className="w-6 h-6 rounded-full bg-[#B9C2DB]/30 text-[#1E3A8A] flex items-center justify-center font-bold text-xs">
              C
            </div>
            <span>{camp.company}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-[#F2F4F8]/50 p-3 rounded-xl flex items-start gap-3 border border-[#B9C2DB]/50">
            <Calendar className="text-[#1E3A8A] mt-0.5" size={18} />
            <div>
              <div className="text-xs text-gray-500 mb-0.5">開催日時</div>
              <div className="text-sm font-bold text-gray-800">{camp.date} <br/> <span className="text-xs font-normal text-gray-600">{camp.time}</span></div>
            </div>
          </div>
          
          <div className="bg-[#F2F4F8]/50 p-3 rounded-xl flex items-start gap-3 border border-[#B9C2DB]/50">
            <MapPin className="text-[#1E3A8A] mt-0.5" size={18} />
            <div>
              <div className="text-xs text-gray-500 mb-0.5">開催場所</div>
              <div className="text-sm font-bold text-gray-800">{camp.location}</div>
            </div>
          </div>
          
          <div className="bg-[#F2F4F8]/50 p-3 rounded-xl flex items-start gap-3 border border-[#B9C2DB]/50">
            <Users className="text-[#1E3A8A] mt-0.5" size={18} />
            <div>
              <div className="text-xs text-gray-500 mb-0.5">対象・定員</div>
              <div className="text-sm font-bold text-gray-800">{camp.target} <br/> <span className="text-xs font-normal text-gray-600">定員: {camp.capacity}</span></div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b border-[#B9C2DB] pb-2">
            <span className="w-1.5 h-4 bg-[#1E3A8A] rounded-full"></span>
            プログラム内容
          </h3>
          
          <div className="text-sm text-gray-600 leading-relaxed space-y-4">
            <p>
              {camp.description}
            </p>
            
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-1.5 text-sm">
                <CheckCircle2 size={16} className="text-[#1E3A8A]" /> 特典・メリット
              </h4>
              <ul className="list-disc list-inside text-xs space-y-1.5 ml-1 text-gray-600">
                <li>参加者全員にオリジナルグッズをプレゼント</li>
                <li>採用直結型の早期選考ルートへのご案内（希望者のみ）</li>
                <li>交通費の一部支給（遠方からの参加者のみ、要事前申請）</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#B9C2DB] p-3 pb-safe z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-lg mx-auto flex gap-3">
          <button 
            onClick={handleSave}
            className="flex flex-col items-center justify-center w-16 shrink-0 bg-[#F2F4F8] text-[#1E3A8A] rounded-xl border border-[#B9C2DB] hover:bg-[#B9C2DB]/30 transition-colors active:scale-95"
          >
            <BookmarkPlus size={20} className="mb-0.5" />
            <span className="text-[10px] font-bold">保存</span>
          </button>
          
          <button 
            onClick={handleApply}
            className="flex-1 bg-gradient-to-r from-[#1E3A8A] to-[#11204C] hover:from-[#11204C] hover:to-[#1E3A8A] text-white font-bold rounded-xl flex justify-center items-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            エントリーする
          </button>
        </div>
      </div>

    </div>
  );
}