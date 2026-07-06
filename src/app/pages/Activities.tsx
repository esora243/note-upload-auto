import { useState } from "react";
import { Link } from "react-router";
import { Users, Plane, BookOpen, ExternalLink, Instagram, Twitter, Mail } from "lucide-react";
import { FloatingBanner } from "../components/FloatingBanner";

export function Activities() {
  const [activeTab, setActiveTab] = useState<"groups" | "study-abroad" | "npo" | "articles">("groups");

  const groups = [
    {
      id: 1,
      name: "医療×IT研究会",
      category: "学生団体",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
      description: "医療とテクノロジーの融合を目指す学生団体。アプリ開発やAI研究を行っています。",
      members: 25,
      social: { instagram: "@med_tech", twitter: "@medtech_club" }
    },
    {
      id: 2,
      name: "国際医療支援サークル",
      category: "学生団体",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=600",
      description: "途上国への医療支援活動を行う団体。年1回の海外ボランティアも実施しています。",
      members: 40,
      social: { instagram: "@global_med", mail: "contact@globalmed.org" }
    },
    {
      id: 3,
      name: "救急医療研究会",
      category: "学生団体",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=600",
      description: "救急医療に興味のある学生が集まるサークル。BLS・ACLS講習会を定期開催。",
      members: 35,
      social: { twitter: "@emergency_med" }
    }
  ];

  const studyAbroad = [
    {
      id: 1,
      title: "野口医学研究所 短期留学プログラム",
      country: "アメリカ",
      duration: "2週間〜4週間",
      image: "https://images.unsplash.com/photo-1609126385558-bc3fc5082b0a?auto=format&fit=crop&q=80&w=600",
      organization: "公益財団法人 野口医学研究所",
      deadline: "2026年5月31日"
    },
    {
      id: 2,
      title: "欧州医学交流プログラム",
      country: "ドイツ・フランス",
      duration: "1ヶ月",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=600",
      organization: "日欧医学教育交流協会",
      deadline: "2026年6月15日"
    },
    {
      id: 3,
      title: "アジア臨床実習プログラム",
      country: "シンガポール・タイ",
      duration: "2週間",
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=600",
      organization: "アジア医療教育機構",
      deadline: "2026年7月10日"
    }
  ];

  const npoVolunteer = [
    {
      id: 1,
      name: "認定NPO法人ロシナンテス",
      category: "国際医療支援",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600",
      description: "スーダン・ザンビアで医療支援活動を展開。医学生ボランティアも募集中。",
      activities: ["診療所運営", "医療従事者育成", "水衛生改善"],
      website: "https://www.rocinantes.org"
    },
    {
      id: 2,
      name: "ジャパンハート",
      category: "国際医療支援",
      image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=600",
      description: "カンボジア、ミャンマーで医療活動。短期医療ボランティアプログラムあり。",
      activities: ["無料診療", "医療人材育成", "緊急医療支援"],
      website: "https://www.japanheart.org"
    },
    {
      id: 3,
      name: "TABLE FOR TWO",
      category: "社会貢献",
      image: "https://images.unsplash.com/photo-1593113598332-cd388c2fb744?auto=format&fit=crop&q=80&w=600",
      description: "食の不均衡解消を目指すNPO。大学内での活動も可能。",
      activities: ["健康的な食事提供", "開発途上国支援", "啓発活動"],
      website: "https://www.tablefor2.org"
    },
    {
      id: 4,
      name: "認定NPO法人フローレンス",
      category: "国内医療・福祉",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=600",
      description: "病児保育、障害児保育など子育て支援。医学生インターンも受け入れ。",
      activities: ["病児保育", "障害児保育", "こども宅食"],
      website: "https://www.florence.or.jp"
    }
  ];

  const articles = [
    {
      id: 1,
      title: "医学部生が起業するまでのストーリー",
      category: "起業",
      date: "2026-04-03",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      title: "基礎研究の魅力とキャリアパス",
      category: "研究",
      date: "2026-04-01",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      title: "臨床医として働く日々",
      category: "臨床",
      date: "2026-03-29",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="w-full max-w-lg mx-auto pb-8 animate-in fade-in slide-in-from-right-2 duration-300">

      {/* Header */}
      <div className="sticky top-[20px] z-30 bg-white border-b border-[#B9C2DB] px-4 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">課外活動</h2>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => setActiveTab("groups")}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "groups"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            👥 学生団体
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("study-abroad")}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "study-abroad"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            ✈️ 留学情報
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("npo")}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "npo"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            🤝 NPO・ボランティア
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("articles")}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "articles"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            📝 記事
          </button>
        </div>
      </div>

      {/* Floating Banner */}
      <FloatingBanner
        campaignId="2"
        title="留学支援プログラム説明会開催中"
        imageUrl="https://images.unsplash.com/photo-1609126385558-bc3fc5082b0a?auto=format&fit=crop&q=80&w=1080"
        sponsorName="グローバル医療教育機構"
      />

      {/* Content */}
      <div className="px-4 pt-1 space-y-4">
        {activeTab === "groups" && groups.map((group) => (
          <Link
            key={group.id}
            to={`/activities/groups/${group.id}`}
            className="block bg-white rounded-2xl shadow-sm border border-[#F2F4F8] overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="relative h-40">
              <img
                src={group.image}
                alt={group.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-bold bg-[#1E3A8A] text-white px-2 py-1 rounded-full">
                  {group.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#11204C] transition-colors">
                {group.name}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                {group.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Users size={14} className="text-[#1E3A8A]" />
                  <span>{group.members}名</span>
                </div>
                <div className="flex items-center gap-2">
                  {group.social.instagram && (
                    <div className="text-[#1E3A8A]">
                      <Instagram size={14} />
                    </div>
                  )}
                  {group.social.twitter && (
                    <div className="text-blue-400">
                      <Twitter size={14} />
                    </div>
                  )}
                  {group.social.mail && (
                    <div className="text-gray-400">
                      <Mail size={14} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}

        {activeTab === "study-abroad" && studyAbroad.map((program) => (
          <Link
            key={program.id}
            to={`/activities/study-abroad/${program.id}`}
            className="block bg-white rounded-2xl shadow-sm border border-[#F2F4F8] overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="relative h-32">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-blue-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                {program.country}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#11204C] transition-colors">
                {program.title}
              </h3>
              <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <Plane size={12} className="text-[#1E3A8A]" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={12} className="text-[#1E3A8A]" />
                  <span>{program.organization}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <span className="text-[10px] text-red-500 font-bold">締切: {program.deadline}</span>
                <button className="flex items-center gap-1 text-xs font-bold text-[#1E3A8A] hover:text-[#11204C]">
                  詳細 <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </Link>
        ))}

        {activeTab === "npo" && npoVolunteer.map((npo) => (
          <div
            key={npo.id}
            className="bg-white rounded-2xl shadow-sm border border-[#F2F4F8] overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-36">
              <img
                src={npo.image}
                alt={npo.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                {npo.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2">{npo.name}</h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{npo.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {npo.activities.map((activity, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                    {activity}
                  </span>
                ))}
              </div>

              <a
                href={npo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#1E3A8A] text-white font-bold py-2.5 rounded-xl hover:bg-[#11204C] transition-colors text-sm"
              >
                <ExternalLink size={16} />
                詳細を見る
              </a>
            </div>
          </div>
        ))}

        {activeTab === "articles" && articles.map((article) => (
          <Link
            key={article.id}
            to={`/activities/articles/${article.id}`}
            className="block bg-white rounded-2xl shadow-sm border border-[#F2F4F8] overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="flex gap-4 p-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-50 text-purple-600 rounded">
                    {article.category}
                  </span>
                  <span className="text-[10px] text-gray-400">{article.date}</span>
                </div>
                <h3 className="font-bold text-gray-800 leading-tight line-clamp-2 group-hover:text-[#11204C] transition-colors">
                  {article.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
