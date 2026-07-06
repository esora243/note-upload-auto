import { useState } from "react";
import { Filter, Search, MapPin, JapaneseYen, Clock, BookmarkPlus, X } from "lucide-react";
import { Link } from "react-router";
import { useLayoutContext } from "../components/Layout";
import { AdBanner } from "../components/AdBanner";
import { JobFilterModal } from "../components/JobFilterModal";

type Job = {
  id: number;
  title: string;
  employmentType: string;
  jobType: string;
  prefecture: string;
  location: string;
  salary: number;
  salaryDisplay: string;
  schedule: string;
  company: string;
  companyType: string;
  requirements?: string;
};

type FilterOptions = {
  employmentType: string[];
  jobType: string[];
  prefecture: string[];
  salaryMin: string;
};

export function Jobs() {
  const { openLoginModal } = useLayoutContext();
  const [activeTab, setActiveTab] = useState("すべて");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    employmentType: [],
    jobType: [],
    prefecture: [],
    salaryMin: ""
  });

  const categories = ["すべて", "家庭教師", "塾", "インターン", "その他"];

  const allJobs: Job[] = [
    {
      id: 1,
      title: "医学部受験生向けのマンツーマン指導（週1回〜OK）",
      employmentType: "アルバイト",
      jobType: "家庭教師",
      prefecture: "東京都",
      location: "東京都 港区",
      salary: 3500,
      salaryDisplay: "時給 3,500円〜",
      schedule: "平日 18:00〜21:00 の間で2時間",
      company: "個人契約",
      companyType: "個",
      requirements: "4年生以上対象"
    },
    {
      id: 2,
      title: "医療系スタートアップでのPMアシスタント業務（フルリモート）",
      employmentType: "インターン",
      jobType: "インターン",
      prefecture: "オンライン",
      location: "フルリモート",
      salary: 1500,
      salaryDisplay: "時給 1,500円〜",
      schedule: "週10時間程度（柔軟対応）",
      company: "株式会社MedicalTech",
      companyType: "S"
    },
    {
      id: 3,
      title: "学習塾での医学部受験指導スタッフ",
      employmentType: "アルバイト",
      jobType: "塾",
      prefecture: "神奈川県",
      location: "神奈川県 横浜市",
      salary: 2500,
      salaryDisplay: "時給 2,500円〜",
      schedule: "週2回〜 17:00〜22:00",
      company: "医学部専門予備校メディカル",
      companyType: "S"
    },
    {
      id: 4,
      title: "病院実習サポート＆データ入力",
      employmentType: "アルバイト",
      jobType: "その他",
      prefecture: "東京都",
      location: "東京都 新宿区",
      salary: 1200,
      salaryDisplay: "時給 1,200円〜",
      schedule: "週3日〜 9:00〜17:00",
      company: "総合病院グループ",
      companyType: "S"
    },
    {
      id: 5,
      title: "オンライン家庭教師（高校生対象・医学部志望者優先）",
      employmentType: "アルバイト",
      jobType: "家庭教師",
      prefecture: "オンライン",
      location: "完全オンライン",
      salary: 3000,
      salaryDisplay: "時給 3,000円〜",
      schedule: "好きな時間でOK",
      company: "オンライン家庭教師プラットフォーム",
      companyType: "S"
    },
    {
      id: 6,
      title: "飲食店での接客スタッフ（医学生歓迎）",
      employmentType: "アルバイト",
      jobType: "その他",
      prefecture: "大阪府",
      location: "大阪府 大阪市",
      salary: 1200,
      salaryDisplay: "時給 1,200円〜",
      schedule: "週2回〜 17:00〜22:00",
      company: "イタリアンレストランチェーン",
      companyType: "S"
    }
  ];

  const filteredJobs = allJobs.filter(job => {
    // テキスト検索
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // タブフィルター
    if (activeTab !== "すべて" && job.jobType !== activeTab) {
      return false;
    }

    // 詳細フィルター
    if (filters.employmentType.length > 0 && !filters.employmentType.includes(job.employmentType)) {
      return false;
    }

    if (filters.jobType.length > 0 && !filters.jobType.includes(job.jobType)) {
      return false;
    }

    if (filters.prefecture.length > 0 && !filters.prefecture.includes(job.prefecture)) {
      return false;
    }

    if (filters.salaryMin && job.salary < Number(filters.salaryMin)) {
      return false;
    }

    return true;
  });

  const activeFilterCount =
    filters.employmentType.length +
    filters.jobType.length +
    filters.prefecture.length +
    (filters.salaryMin ? 1 : 0);

  const clearFilters = () => {
    setFilters({
      employmentType: [],
      jobType: [],
      prefecture: [],
      salaryMin: ""
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto pb-4 animate-in fade-in slide-in-from-right-2 duration-300">

      {/* Header / Search / Categories */}
      <div className="sticky top-[10px] z-30 bg-[#F2F4F8]/90 backdrop-blur-md pt-2 pb-3 -mx-4 px-4 border-b border-[#B9C2DB]">
        <h2 className="text-xl font-bold text-gray-800 mb-3">求人</h2>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-[#B9C2DB] p-2.5 flex items-center gap-2">
            <Search className="text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="フリーワードで絞り込み"
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-300"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="relative bg-[#F2F4F8] p-2.5 rounded-xl border border-[#B9C2DB] text-[#1E3A8A] hover:bg-[#B9C2DB]/30 transition-colors"
          >
            <Filter className="w-5 h-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1E3A8A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === cat
                  ? "bg-[#1E3A8A] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 px-4 pt-3">
        {filteredJobs.length}件の求人が見つかりました
      </div>

      {/* Job List */}
      <div className="space-y-4 px-4 pb-8">
        {filteredJobs.map((job, idx) => (
          <div key={job.id}>
            {idx === 1 && (
              <div className="mb-4">
                <AdBanner
                  type="infeed"
                  campaignId="5"
                  title="2026年度 初期研修説明会 受付中"
                  imageUrl="https://images.unsplash.com/photo-1758691462848-ba1e929da259?auto=format&fit=crop&q=80&w=1080"
                  sponsorName="医療法人伏見会　伏見病院"
                />
              </div>
            )}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#F2F4F8] relative hover:shadow-md transition-all group">
              <button
                onClick={(e) => { e.preventDefault(); openLoginModal(); }}
                className="absolute top-4 right-4 text-gray-300 hover:text-[#1E3A8A] transition-colors active:scale-90"
              >
                <BookmarkPlus size={22} strokeWidth={1.5} />
              </button>

              <div className="flex gap-2 mb-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#B9C2DB]/30 text-[#11204C] rounded">
                  {job.jobType}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                  {job.employmentType}
                </span>
                {job.requirements && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">
                    {job.requirements}
                  </span>
                )}
              </div>

              <h4 className="font-bold text-gray-800 leading-snug pr-8 mb-3 group-hover:text-[#11204C] transition-colors">
                {job.title}
              </h4>

              <div className="space-y-1.5 text-xs text-gray-600 mb-4 bg-gray-50/50 p-3 rounded-xl border border-gray-50">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#1E3A8A] shrink-0" /> {job.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <JapaneseYen size={14} className="text-[#1E3A8A] shrink-0" /> {job.salaryDisplay}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#1E3A8A] shrink-0" /> {job.schedule}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-5 h-5 rounded-full bg-[#B9C2DB]/30 text-[#1E3A8A] flex items-center justify-center font-bold text-[10px]">
                    {job.companyType}
                  </div>
                  <span className="line-clamp-1">{job.company}</span>
                </div>
                <Link
                  to={`/jobs/${job.id}`}
                  className="bg-gradient-to-r from-[#1E3A8A] to-[#11204C] text-white text-xs font-bold px-5 py-2 rounded-full shadow-sm hover:shadow-md hover:from-[#11204C] hover:to-[#1E3A8A] transition-all active:scale-95"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">条件に一致する求人が見つかりませんでした</p>
            <button
              onClick={clearFilters}
              className="text-[#1E3A8A] font-bold hover:text-[#11204C]"
            >
              絞り込みをクリア
            </button>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <JobFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />

      {/* Sponsor Section */}
      <div className="px-4 pb-10">
        <div className="rounded-2xl overflow-hidden border border-[#B9C2DB] shadow-sm">
          <div className="px-5 py-3 flex items-center gap-2" style={{ background: "#11204C" }}>
            <span className="text-white text-xs font-bold tracking-widest">SPONSORS & PARTNERS</span>
          </div>
          <div className="bg-white p-5 space-y-4">
            <p className="text-xs text-gray-500 mb-4">HagNaviを応援いただいているパートナー企業・医療機関様</p>
            {[
              { name: "医療法人伏見会　伏見病院", category: "医療機関", tag: "PLATINUM", img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=400", id: "1" },
              { name: "メディカルテックカンパニー", category: "IT・テクノロジー", tag: "PLATINUM", img: "https://images.unsplash.com/photo-1560111828-e16fc96d9a5e?auto=format&fit=crop&q=80&w=400", id: "2" },
              { name: "グローバル医療教育機構", category: "教育・留学", tag: "GOLD", img: "https://images.unsplash.com/photo-1609126385558-bc3fc5082b0a?auto=format&fit=crop&q=80&w=400", id: "3" },
              { name: "株式会社メディカルキャリア", category: "人材紹介", tag: "GOLD", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400", id: "4" },
            ].map((s) => (
              <Link key={s.id} to={`/sponsors`} className="flex items-center gap-3 p-3 rounded-xl border border-[#F2F4F8] hover:border-[#B9C2DB] hover:bg-[#F2F4F8] transition-all group">
                <img src={s.img} alt={s.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate group-hover:text-[#1E3A8A] transition-colors">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.category}</p>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white shrink-0" style={{ background: s.tag === "PLATINUM" ? "#11204C" : "#1E3A8A" }}>{s.tag}</span>
              </Link>
            ))}
            <Link to="/sponsors" className="block text-center text-xs font-bold text-[#1E3A8A] hover:text-[#11204C] py-2 border-t border-[#F2F4F8] mt-2">
              すべてのパートナーを見る →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}