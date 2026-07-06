import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

type UserProfile = {
  gender: string;
  grade: string;
  university: string;
  club: string;
  specialty: string;
};

export function ProfileEdit() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    gender: "",
    grade: "",
    university: "浜松医科大学",
    club: "",
    specialty: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    toast.success("プロフィールを更新しました");
    navigate("/profile");
  };

  const updateField = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F2F4F8] pb-20">
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="sticky top-[110px] z-30 bg-white border-b border-[#B9C2DB] px-4 py-4 flex items-center gap-3 shadow-sm">
          <button onClick={() => navigate("/profile")} className="text-gray-600 hover:text-[#1E3A8A]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-800 flex-1">プロフィール編集</h1>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 bg-[#1E3A8A] text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-[#11204C] active:scale-95 transition-all"
          >
            <Save size={16} />
            保存
          </button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">

          {/* 性別 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F2F4F8]">
            <label className="text-xs font-bold text-gray-500 mb-3 block">性別</label>
            <div className="grid grid-cols-2 gap-2">
              {["男性", "女性", "その他", "回答しない"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateField("gender", option)}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                    profile.gender === option
                      ? "bg-[#1E3A8A] text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-[#F2F4F8] border border-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* 学年 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F2F4F8]">
            <label className="text-xs font-bold text-gray-500 mb-3 block">学年</label>
            <div className="grid grid-cols-3 gap-2">
              {["1年生", "2年生", "3年生", "4年生", "5年生", "6年生", "その他"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateField("grade", option)}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                    profile.grade === option
                      ? "bg-[#1E3A8A] text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-[#F2F4F8] border border-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* 大学名 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F2F4F8]">
            <label className="text-xs font-bold text-gray-500 mb-3 block">大学名</label>
            <select
              value={profile.university}
              onChange={(e) => updateField("university", e.target.value)}
              className="w-full py-3 px-4 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            >
              <option value="浜松医科大学">浜松医科大学</option>
            </select>
            <p className="text-xs text-gray-400 mt-2">※ Phase 1では浜松医科大学のみ対応</p>
          </div>

          {/* 部活 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F2F4F8]">
            <label className="text-xs font-bold text-gray-500 mb-3 block">部活・サークル（任意）</label>
            <div className="grid grid-cols-2 gap-2">
              {["運動部", "文化部", "医療系サークル", "その他", "所属していない"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateField("club", option)}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                    profile.club === option
                      ? "bg-[#1E3A8A] text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-[#F2F4F8] border border-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* 希望診療科 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F2F4F8]">
            <label className="text-xs font-bold text-gray-500 mb-3 block">希望診療科（任意）</label>
            <div className="grid grid-cols-2 gap-2">
              {["内科", "外科", "小児科", "産婦人科", "整形外科", "精神科", "皮膚科", "眼科", "耳鼻咽喉科", "その他", "未定"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateField("specialty", option)}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                    profile.specialty === option
                      ? "bg-[#1E3A8A] text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-[#F2F4F8] border border-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
