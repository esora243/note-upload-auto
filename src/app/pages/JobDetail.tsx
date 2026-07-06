import { useParams, useNavigate } from "react-router";
import { MapPin, JapaneseYen, Clock, ArrowLeft, BookmarkPlus, Share, Calendar, CheckCircle2 } from "lucide-react";
import { useLayoutContext } from "../components/Layout";

export function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, openLoginModal } = useLayoutContext();

  const handleApply = () => {
    if (isLoggedIn) {
      alert("モック: 応募フォームを開きます");
    } else {
      openLoginModal();
    }
  };

  const handleSave = () => {
    if (isLoggedIn) {
      alert("モック: 求人を保存しました");
    } else {
      openLoginModal();
    }
  };

  const isRemote = Number(id) % 2 === 0;

  return (
    <div className="w-full max-w-lg mx-auto bg-white min-h-screen animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[#F2F4F8] px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <span className="font-bold text-sm text-gray-800">求人詳細</span>
        <button className="p-2 -mr-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
          <Share size={18} />
        </button>
      </header>

      {/* Content */}
      <div className="p-4 space-y-6 pb-28">
        
        {/* Title Area */}
        <div>
          <div className="flex gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#B9C2DB]/30 text-[#11204C] rounded">
              {isRemote ? "インターン" : "家庭教師"}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">
              {id === "1" ? "4年生以上対象" : "全学年対象"}
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 leading-snug mb-3">
            {isRemote 
              ? "医療系スタートアップでのPMアシスタント業務（フルリモート）"
              : "医学部受験生向けのマンツーマン指導（週1回〜OK）"}
          </h2>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 border-b border-gray-100 pb-4">
            <div className="w-6 h-6 rounded-full bg-[#F2F4F8] text-[#1E3A8A] flex items-center justify-center font-bold text-xs">
              {isRemote ? "S" : "個"}
            </div>
            <span>{isRemote ? "株式会社MedicalTech" : "個人契約"}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-[#F2F4F8]/50 p-3 rounded-xl flex items-start gap-3">
            <JapaneseYen className="text-[#1E3A8A] mt-0.5" size={18} />
            <div>
              <div className="text-xs text-gray-500 mb-0.5">給与・報酬</div>
              <div className="text-sm font-bold text-gray-800">{isRemote ? "時給 1,500円〜" : "時給 3,500円〜"}</div>
            </div>
          </div>
          
          <div className="bg-[#F2F4F8]/50 p-3 rounded-xl flex items-start gap-3">
            <MapPin className="text-[#1E3A8A] mt-0.5" size={18} />
            <div>
              <div className="text-xs text-gray-500 mb-0.5">勤務地</div>
              <div className="text-sm font-bold text-gray-800">{isRemote ? "フルリモート" : "東京都 港区（六本木駅 徒歩5分）"}</div>
            </div>
          </div>
          
          <div className="bg-[#F2F4F8]/50 p-3 rounded-xl flex items-start gap-3">
            <Clock className="text-[#1E3A8A] mt-0.5" size={18} />
            <div>
              <div className="text-xs text-gray-500 mb-0.5">勤務時間</div>
              <div className="text-sm font-bold text-gray-800">{isRemote ? "週10時間程度（柔軟に対応可能）" : "平日 18:00〜21:00 の間で2時間"}</div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b border-[#B9C2DB] pb-2">
            <span className="w-1.5 h-4 bg-[#1E3A8A] rounded-full"></span>
            募集要項
          </h3>
          
          <div className="text-sm text-gray-600 leading-relaxed space-y-4">
            <p>
              {isRemote 
                ? "医療系スタートアップ企業でのプロダクトマネージャー（PM）アシスタントを募集しています。新しい医療サービスの開発現場で、リサーチやドキュメント作成、ユーザーヒアリングのサポートを行っていただきます。医療知識を活かしつつ、ビジネスサイドの経験を積みたい方に最適です。"
                : "医学部を目指す高校生（高3）のマンツーマン指導をお願いします。主に数学と英語を担当していただきます。生徒の自宅（港区内）での指導となりますが、テスト期間中などはオンライン指導も相談可能です。"}
            </p>
            
            <div className="bg-white border border-gray-100 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-1.5 text-sm">
                <CheckCircle2 size={16} className="text-green-500" /> 必須要件
              </h4>
              <ul className="list-disc list-inside text-xs space-y-1.5 ml-1 text-gray-600">
                {isRemote ? (
                  <>
                    <li>医学部に在籍していること（学年不問）</li>
                    <li>基本的なPCスキル（Word, Excel, PowerPoint等）</li>
                    <li>週に1回、オンラインミーティングに参加できること</li>
                  </>
                ) : (
                  <>
                    <li>医学部4年生以上の方</li>
                    <li>大学受験での数学・英語の指導経験（塾講師・家庭教師など）がある方</li>
                    <li>責任感を持って最後まで指導できる方</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-xs text-gray-400 flex items-center gap-4 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-1"><Calendar size={14} /> 掲載日: 2023.10.01</div>
          <div className="flex items-center gap-1">求人ID: HUG-{id}</div>
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
            className="flex-1 bg-[#06C755] hover:bg-[#05B34C] text-white font-bold rounded-xl flex justify-center items-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            LINEで応募する
          </button>
        </div>
      </div>

    </div>
  );
}