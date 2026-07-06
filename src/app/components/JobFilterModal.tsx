import { X } from "lucide-react";

type FilterOptions = {
  employmentType: string[];
  jobType: string[];
  prefecture: string[];
  salaryMin: string;
};

type JobFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
};

export function JobFilterModal({ isOpen, onClose, filters, onApplyFilters }: JobFilterModalProps) {
  const [localFilters, setLocalFilters] = React.useState(filters);

  const employmentTypes = ["アルバイト", "正社員", "契約社員", "インターン", "業務委託"];
  const jobTypes = ["家庭教師", "学習塾", "医療系インターン", "IT系インターン", "飲食", "その他"];
  const prefectures = [
    "東京都", "神奈川県", "千葉県", "埼玉県", "大阪府", "京都府", "愛知県", "福岡県", "オンライン"
  ];

  const toggleFilter = (category: keyof FilterOptions, value: string) => {
    if (category === "salaryMin") {
      setLocalFilters(prev => ({ ...prev, salaryMin: value }));
      return;
    }

    setLocalFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      employmentType: [],
      jobType: [],
      prefecture: [],
      salaryMin: ""
    };
    setLocalFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center animate-in fade-in duration-200">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">絞り込み検索</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* 雇用形態 */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3">雇用形態</h4>
            <div className="flex flex-wrap gap-2">
              {employmentTypes.map(type => (
                <button
                  key={type}
                  onClick={() => toggleFilter("employmentType", type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    localFilters.employmentType.includes(type)
                      ? "bg-[#1E3A8A] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 業種 */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3">業種</h4>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map(type => (
                <button
                  key={type}
                  onClick={() => toggleFilter("jobType", type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    localFilters.jobType.includes(type)
                      ? "bg-[#1E3A8A] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 勤務地 */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3">勤務地</h4>
            <div className="flex flex-wrap gap-2">
              {prefectures.map(pref => (
                <button
                  key={pref}
                  onClick={() => toggleFilter("prefecture", pref)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    localFilters.prefecture.includes(pref)
                      ? "bg-[#1E3A8A] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          {/* 最低時給 */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3">最低時給</h4>
            <select
              value={localFilters.salaryMin}
              onChange={e => toggleFilter("salaryMin", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">指定なし</option>
              <option value="1000">1,000円以上</option>
              <option value="1500">1,500円以上</option>
              <option value="2000">2,000円以上</option>
              <option value="2500">2,500円以上</option>
              <option value="3000">3,000円以上</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
          >
            リセット
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#11204C] text-white font-bold shadow-md hover:shadow-lg transition-all"
          >
            適用する
          </button>
        </div>
      </div>
    </div>
  );
}

// Add React import at top
import React from "react";
