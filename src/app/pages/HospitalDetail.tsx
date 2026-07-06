import { ArrowLeft, MapPin, Star, Users, Calendar, ExternalLink, BookmarkPlus, Phone, Mail, Globe } from "lucide-react";
import { useNavigate } from "react-router";

export function HospitalDetail() {
  const navigate = useNavigate();

  const hospital = {
    name: "浜松医科大学医学部附属病院",
    prefecture: "静岡県",
    city: "浜松市",
    address: "静岡県浜松市東区半田山1-20-1",
    category: "大学病院",
    rating: 4.5,
    specialties: ["救急科", "総合診療科", "内科", "外科", "小児科", "産婦人科", "精神科"],
    residentsCount: 40,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    features: ["症例豊富", "指導体制充実", "研究環境良好", "大学院進学可"],
    phone: "053-435-2111",
    email: "kenshu@hama-med.ac.jp",
    website: "https://www.hama-med.ac.jp/hospital/",
    description: "浜松医科大学医学部附属病院は、静岡県西部の高度医療を担う特定機能病院です。豊富な症例と充実した指導体制により、質の高い臨床研修を提供しています。",
    workEnvironment: [
      "当直回数：月4〜5回程度",
      "給与：初年度 約400万円",
      "宿舎：単身者用あり（家賃補助あり）",
      "福利厚生：社会保険完備、医師賠償責任保険加入"
    ],
    recruitmentInfo: {
      positions: 40,
      selectionMethod: "書類選考・面接",
      applicationPeriod: "2026年7月1日〜8月31日",
      matchingParticipation: "参加"
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto pb-8 animate-in fade-in slide-in-from-right-2 duration-300">

      {/* Header */}
      <div className="sticky top-[110px] z-30 bg-white/90 backdrop-blur-md border-b border-[#B9C2DB] px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/hospitals")} className="text-gray-600 hover:text-[#1E3A8A]">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-gray-800 flex-1 truncate">病院詳細</h2>
        <button className="text-gray-400 hover:text-[#1E3A8A] transition-colors">
          <BookmarkPlus size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative h-56">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex gap-2 mb-2">
            <span className="text-[10px] font-bold px-2 py-1 bg-blue-500 text-white rounded">
              {hospital.category}
            </span>
            <span className="text-[10px] font-bold px-2 py-1 bg-white/90 text-gray-700 rounded flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              {hospital.rating}
            </span>
          </div>
          <h1 className="text-xl font-bold text-white">{hospital.name}</h1>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-6">

        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F4F8]">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-[#1E3A8A]" />
            基本情報
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-gray-500 min-w-[60px]">所在地</span>
              <span className="text-gray-800 flex-1">{hospital.address}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500 min-w-[60px]">電話</span>
              <a href={`tel:${hospital.phone}`} className="text-[#1E3A8A] hover:text-[#11204C]">
                {hospital.phone}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500 min-w-[60px]">Email</span>
              <a href={`mailto:${hospital.email}`} className="text-[#1E3A8A] hover:text-[#11204C]">
                {hospital.email}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500 min-w-[60px]">研修医数</span>
              <span className="text-gray-800 flex items-center gap-1">
                <Users size={14} />
                {hospital.residentsCount}名
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F4F8]">
          <h3 className="font-bold text-gray-800 mb-2">病院の特徴</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{hospital.description}</p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F4F8]">
          <h3 className="font-bold text-gray-800 mb-3">研修の特色</h3>
          <div className="flex flex-wrap gap-2">
            {hospital.features.map((feature, idx) => (
              <span key={idx} className="text-xs px-3 py-1.5 bg-[#F2F4F8] text-[#11204C] rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Specialties */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F4F8]">
          <h3 className="font-bold text-gray-800 mb-3">研修可能な診療科</h3>
          <div className="flex flex-wrap gap-2">
            {hospital.specialties.map((specialty, idx) => (
              <span key={idx} className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Work Environment */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F4F8]">
          <h3 className="font-bold text-gray-800 mb-3">勤務環境・待遇</h3>
          <div className="space-y-2">
            {hospital.workEnvironment.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] mt-1.5 shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Info */}
        <div className="bg-gradient-to-br from-[#F2F4F8] to-[#F2F4F8] rounded-2xl p-4 border border-[#B9C2DB]">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Calendar size={18} className="text-[#1E3A8A]" />
            募集情報
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-gray-600 min-w-[80px]">募集人数</span>
              <span className="text-gray-800 font-bold">{hospital.recruitmentInfo.positions}名</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600 min-w-[80px]">選考方法</span>
              <span className="text-gray-800">{hospital.recruitmentInfo.selectionMethod}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600 min-w-[80px]">応募期間</span>
              <span className="text-gray-800">{hospital.recruitmentInfo.applicationPeriod}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600 min-w-[80px]">マッチング</span>
              <span className="text-gray-800">{hospital.recruitmentInfo.matchingParticipation}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={hospital.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#1E3A8A] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#11204C] transition-colors text-center flex items-center justify-center gap-2"
          >
            <Globe size={18} />
            病院公式サイトを見る
          </a>

          <button className="w-full bg-white text-[#1E3A8A] font-bold py-3 rounded-xl border-2 border-[#1E3A8A] hover:bg-[#F2F4F8] transition-colors">
            見学予約をする
          </button>
        </div>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-gray-700">
            <span className="font-bold">💡 ヒント：</span>
            病院見学の際は、実際の研修医に直接質問するのがおすすめです。勤務の実態や雰囲気を確認しましょう。
          </p>
        </div>
      </div>
    </div>
  );
}
