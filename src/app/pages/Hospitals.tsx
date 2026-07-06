import { useState } from "react";
import { Search, MapPin, Star, Users, Calendar, ExternalLink, BookmarkPlus, Building2, X } from "lucide-react";
import { Link } from "react-router";

type Hospital = {
  id: number;
  name: string;
  prefecture: string;
  city: string;
  category: string;
  rating: number;
  specialties: string[];
  residentsCount: number;
  image: string;
  features: string[];
};

export function Hospitals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const categories = ["すべて", "大学病院", "市中病院", "専門病院", "地域医療"];

  const hospitals: Hospital[] = [
    {
      id: 1,
      name: "浜松医科大学医学部附属病院",
      prefecture: "静岡県",
      city: "浜松市",
      category: "大学病院",
      rating: 4.5,
      specialties: ["救急科", "総合診療科", "内科", "外科", "小児科"],
      residentsCount: 40,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
      features: ["症例豊富", "指導体制充実", "研究環境良好"]
    },
    {
      id: 2,
      name: "聖隷浜松病院",
      prefecture: "静岡県",
      city: "浜松市",
      category: "市中病院",
      rating: 4.7,
      specialties: ["救急科", "循環器内科", "消化器外科"],
      residentsCount: 35,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600",
      features: ["救急搬送多数", "手技が豊富", "給与良好"]
    },
    {
      id: 3,
      name: "浜松医療センター",
      prefecture: "静岡県",
      city: "浜松市",
      category: "市中病院",
      rating: 4.3,
      specialties: ["総合診療", "救急科", "内科"],
      residentsCount: 28,
      image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=600",
      features: ["地域密着", "コモン疾患多数", "福利厚生充実"]
    },
    {
      id: 4,
      name: "静岡県立総合病院",
      prefecture: "静岡県",
      city: "静岡市",
      category: "市中病院",
      rating: 4.6,
      specialties: ["救急科", "産婦人科", "小児科", "外科"],
      residentsCount: 42,
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600",
      features: ["症例豊富", "産科充実", "ER型救急"]
    }
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = searchQuery === "" ||
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "すべて" || hospital.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-lg mx-auto pb-8 animate-in fade-in slide-in-from-right-2 duration-300">

      {/* Header */}
      <div className="sticky top-[110px] z-30 bg-white border-b border-[#B9C2DB] px-4 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3">研修病院情報</h2>

        {/* Search */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-[#B9C2DB] p-2.5 flex items-center gap-2">
            <Search className="text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="病院名・地域で検索"
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-300"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#1E3A8A] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital List */}
      <div className="px-4 pt-3 space-y-4">
        <div className="text-sm text-gray-600 mb-3">
          {filteredHospitals.length}件の研修病院が見つかりました
        </div>

        {filteredHospitals.map((hospital) => (
          <Link
            key={hospital.id}
            to={`/hospitals/${hospital.id}`}
            className="block bg-white rounded-2xl shadow-sm border border-[#F2F4F8] overflow-hidden hover:shadow-md transition-all group"
          >
            <div className="relative h-40">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-[#1E3A8A] transition-colors shadow-sm"
                >
                  <BookmarkPlus size={18} strokeWidth={1.5} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-blue-500 text-white rounded">
                  {hospital.category}
                </span>
                <span className="text-[10px] font-bold px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  {hospital.rating}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#11204C] transition-colors">
                {hospital.name}
              </h3>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <MapPin size={14} className="text-[#1E3A8A]" />
                <span>{hospital.prefecture} {hospital.city}</span>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-3">
                {hospital.features.map((feature, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-1 bg-[#F2F4F8] text-[#11204C] rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-3">
                {hospital.specialties.slice(0, 3).map((specialty, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded">
                    {specialty}
                  </span>
                ))}
                {hospital.specialties.length > 3 && (
                  <span className="text-[10px] px-2 py-1 text-gray-400">
                    +{hospital.specialties.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Users size={14} className="text-gray-400" />
                  <span>研修医 {hospital.residentsCount}名</span>
                </div>
                <ExternalLink size={16} className="text-[#1E3A8A]" />
              </div>
            </div>
          </Link>
        ))}

        {filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">条件に一致する病院が見つかりませんでした</p>
          </div>
        )}
      </div>
    </div>
  );
}
