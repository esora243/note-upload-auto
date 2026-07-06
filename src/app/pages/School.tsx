import { useState } from "react";
import { Calendar, Clock, ChevronRight, ChevronLeft, MapPin, Plus, Menu, MoreVertical, Video, Edit2, Check } from "lucide-react";
import { FloatingBanner } from "../components/FloatingBanner";

export function School() {
  const [activeTab, setActiveTab] = useState<"timetable" | "syllabus">("timetable");
  const [view, setView] = useState<"main" | "detail">("main");
  const [selectedGrade, setSelectedGrade] = useState("すべて");

  const grades = ["1年", "2年", "3年", "4年", "5年", "6年"];

  // 時間割グリッドのデータ
  const days = ["月", "火", "水", "木", "金"];
  const dates = ["6", "7", "8", "9", "10"];
  
  const timetableGrid: Record<string, Record<number, any>> = {
    月: {
      1: { title: "解剖学\n実習", room: "第1実習室", style: "bg-[#F2F4F8] border-[#B9C2DB] text-[#1E3A8A]", dots: ["bg-blue-500", "bg-[#1E3A8A]"] },
      2: { title: "(実習\n続き)", style: "bg-[#F2F4F8] border-[#B9C2DB] text-[#1E3A8A] border-t-0 rounded-t-none" },
      4: { title: "生化学\n演習", room: "演習室1", style: "bg-emerald-50 border-emerald-200 text-emerald-700", dots: ["bg-amber-700"] }
    },
    火: {
      1: { title: "生理学", room: "第3講義室", style: "bg-blue-50 border-blue-400 text-blue-700 border-b-0 rounded-b-none", dots: ["bg-blue-500", "bg-[#1E3A8A]"] },
      2: { title: "(続き)", style: "bg-blue-50 border-blue-400 text-blue-700 border-t-0 rounded-t-none" },
      3: { title: "英語", room: "共通B", style: "bg-gray-50 border-gray-200 text-gray-700", dots: ["bg-[#1E3A8A]"] }
    },
    水: {
      2: { title: "病理学", room: "第2講義室", style: "bg-[#F2F4F8] border-[#B9C2DB] text-[#1E3A8A] border-b-0 rounded-b-none", dots: ["bg-[#1E3A8A]", "bg-amber-700"] },
      3: { title: "(続き)", style: "bg-[#F2F4F8] border-[#B9C2DB] text-[#1E3A8A] border-t-0 rounded-t-none" },
      5: { title: "総合\n演習", room: "大講義室", style: "bg-gray-50 border-gray-200 text-gray-700", dots: ["bg-[#1E3A8A]"] }
    },
    木: {
      1: { title: "生化学", room: "B棟204", style: "bg-emerald-50 border-emerald-200 text-emerald-700 border-b-0 rounded-b-none", dots: ["bg-amber-700"] },
      2: { title: "(続き)", style: "bg-emerald-50 border-emerald-200 text-emerald-700 border-t-0 rounded-t-none" },
      4: { title: "解剖学", room: "第1講義室", style: "bg-[#F2F4F8] border-[#B9C2DB] text-[#1E3A8A]", dots: ["bg-[#1E3A8A]"] },
      6: { title: "臨床\n入門", room: "医学部棟A", style: "bg-teal-50 border-teal-200 text-teal-700", dots: ["bg-blue-500", "bg-[#1E3A8A]"] }
    },
    金: {
      1: { title: "解剖学", room: "第1講義室", style: "bg-[#F2F4F8] border-[#B9C2DB] text-[#1E3A8A]" },
      3: { title: "組織学", room: "第4講義室", style: "bg-blue-50 border-blue-200 text-blue-700 border-b-0 rounded-b-none", dots: ["bg-blue-500"] },
      4: { title: "(続き)", style: "bg-blue-50 border-blue-200 text-blue-700 border-t-0 rounded-t-none" }
    }
  };

  // 授業詳細ビュー
  if (view === "detail") {
    return (
      <div className="w-full max-w-lg mx-auto bg-white min-h-screen pb-20 animate-in fade-in slide-in-from-right-2 duration-300">
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-white">
          <button onClick={() => setView("main")} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">授業の詳細</h2>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="px-5 pt-2">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-bold mb-3 border border-blue-100">機能系</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">生理学</h1>
          <p className="text-sm text-gray-700 mb-6 font-medium">火・1〜2限 09:00–12:00 第3講義室 田中 正樹 教授</p>
          
          <div className="flex justify-between border-b border-gray-200 mb-6">
            <button className="pb-3 border-b-2 border-[#1E3A8A] text-[#1E3A8A] font-bold text-sm px-4">基本情報</button>
            <button className="pb-3 text-gray-500 font-bold text-sm px-4 hover:text-gray-700">課題</button>
            <button className="pb-3 text-gray-500 font-bold text-sm px-4 hover:text-gray-700">メモ・通知</button>
          </div>

          <h3 className="font-bold text-sm text-gray-800 mb-3">授業情報</h3>
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="flex py-2 border-b border-gray-200">
              <div className="w-24 text-xs text-gray-600 flex items-center gap-2"><Clock size={14}/> 時間</div>
              <div className="text-xs font-medium text-gray-800">09:00–12:00（2コマ）</div>
            </div>
            <div className="flex py-3 border-b border-gray-200">
              <div className="w-24 text-xs text-gray-600 flex items-center gap-2"><Calendar size={14}/> 開講期間</div>
              <div className="text-xs font-medium text-gray-800">前期（4月〜7月）</div>
            </div>
            <div className="flex py-3 border-b border-gray-200">
              <div className="w-24 text-xs text-gray-600 flex items-center gap-2"><MapPin size={14}/> 教室</div>
              <div className="text-xs font-medium text-gray-800">第3講義室</div>
            </div>
            <div className="flex py-3 items-center">
              <div className="w-24 text-xs text-gray-600 flex items-center gap-2"><Video size={14}/> Zoom URL</div>
              <div className="text-xs font-medium text-blue-500">zoom.us/j/12345678</div>
            </div>
          </div>
          
          <div className="flex gap-3 mb-8">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 text-sm font-bold hover:bg-blue-100 transition-colors">
              <Video size={16}/> Zoomを開く
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-bold hover:bg-gray-50 transition-colors">
              <Edit2 size={16}/> URLを編集
            </button>
          </div>

          <h3 className="font-bold text-sm text-gray-800 mb-3">課題</h3>
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 space-y-4">
            <div className="flex gap-3 pb-4 border-b border-gray-200 opacity-50">
              <div className="bg-[#1E3A8A] text-white rounded w-5 h-5 flex items-center justify-center shrink-0 mt-0.5"><Check size={14} strokeWidth={3}/></div>
              <div>
                <p className="text-sm font-bold text-gray-800 line-through decoration-gray-500">第1回レポート（心臓生理）</p>
                <p className="text-xs text-gray-500 mt-1">提出期限：4月3日　提出済み</p>
              </div>
            </div>
            <div className="flex gap-3 pb-4 border-b border-gray-200">
              <div className="border-2 border-amber-500 bg-amber-50 rounded w-5 h-5 shrink-0 mt-0.5"></div>
              <div>
                <p className="text-sm font-bold text-gray-800">第2回レポート（呼吸生理）</p>
                <p className="text-xs text-amber-600 font-bold mt-1">提出期限：4月10日（残り3日）</p>
              </div>
            </div>
            <div className="flex gap-3 pb-4 border-b border-gray-200">
              <div className="border-2 border-gray-300 bg-white rounded w-5 h-5 shrink-0 mt-0.5"></div>
              <div>
                <p className="text-sm font-bold text-gray-800">中間テスト範囲まとめ</p>
                <p className="text-xs text-gray-500 mt-1">提出期限：4月25日</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-[#1E3A8A] text-sm font-bold py-1 hover:text-[#11204C]">
              <Plus size={16}/> 課題を追加
            </button>
          </div>

          <h3 className="font-bold text-sm text-gray-800 mb-3">メモ</h3>
          <div className="bg-amber-50/50 rounded-xl p-4 mb-3 border border-amber-100">
            <p className="text-sm text-gray-800 leading-relaxed">第3回は心臓の電気生理がメイン。試験範囲はp.45-78。<br/>教科書持参必須。</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 rounded-full border border-[#B9C2DB] bg-[#F2F4F8] text-[#11204C] text-xs font-bold">試験あり</span>
            <span className="px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-600 text-xs font-bold">必修</span>
            <button className="px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-500 text-xs font-bold hover:bg-gray-50">+ タグ追加</button>
          </div>

          <h3 className="font-bold text-sm text-gray-800 mb-3">LINE通知</h3>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-gray-800">授業リマインド</p>
                <p className="text-xs text-gray-500 mt-1">30分前に通知</p>
              </div>
              <div className="w-12 h-6 bg-[#1E3A8A] rounded-full flex items-center p-1 justify-end cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-gray-800">課題期限リマインド</p>
                <p className="text-xs text-gray-500 mt-1">期限2日前に通知</p>
              </div>
              <div className="w-12 h-6 bg-[#1E3A8A] rounded-full flex items-center p-1 justify-end cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-gray-800">休講・教室変更</p>
                <p className="text-xs text-gray-500 mt-1">即時通知</p>
              </div>
              <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center p-1 justify-start cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // メインビュー
  return (
    <div className="w-full max-w-lg mx-auto pb-8 bg-white min-h-screen animate-in fade-in duration-300">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">学校</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"><Plus size={16}/></button>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"><Menu size={16}/></button>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"><Clock size={16}/></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => setActiveTab("timetable")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "timetable"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            📅 時間割
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("syllabus")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "syllabus"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            📋 シラバス
          </button>
        </div>

        {/* 学年フィルター */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 shrink-0">学年</span>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="flex-1 text-xs font-bold border border-[#B9C2DB] rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#1E3A8A] cursor-pointer"
          >
            <option value="">すべて</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Floating Banner */}
      <FloatingBanner
        campaignId="1"
        title="2026年度 初期研修説明会 受付中"
        imageUrl="https://images.unsplash.com/photo-1758691462848-ba1e929da259?auto=format&fit=crop&q=80&w=1080"
        sponsorName="医療法人伏見会　伏見病院"
      />

      {/* Content */}
      <div className="px-3 pt-1">
        
        {/* === 時間割タブ === */}
        {activeTab === "timetable" && (
          <div className="space-y-4">

            {/* 日付ナビゲーション */}
            <div className="flex items-center justify-between px-2 mb-2">
              <button className="p-1"><ChevronLeft size={20} className="text-gray-400" /></button>
              <span className="font-bold text-gray-800">2026年4月 第2週</span>
              <button className="p-1"><ChevronRight size={20} className="text-gray-400" /></button>
            </div>

            {/* グリッドビュー */}
            <div className="bg-white">
              <div className="grid grid-cols-[24px_1fr_1fr_1fr_1fr_1fr] gap-1 mb-2">
                <div></div>
                {days.map((day, i) => (
                  <div key={day} className="text-center flex flex-col items-center">
                    {day === "火" ? (
                      <>
                        <span className="bg-[#1E3A8A] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">{dates[i]}</span>
                        <span className="text-[#1E3A8A] text-[10px] mt-0.5 font-bold">{day}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-800 text-xs font-bold h-6 flex items-center justify-center">{dates[i]}</span>
                        <span className="text-gray-500 text-[10px] mt-0.5">{day}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {[1, 2, 3, 4, 5, 6].map((period) => (
                <div key={period} className="grid grid-cols-[24px_1fr_1fr_1fr_1fr_1fr] gap-1 mb-1">
                  <div className="flex flex-col items-center justify-center text-[10px] text-gray-400">
                    <span className="font-bold">{period}</span>
                    <span className="scale-75">限</span>
                  </div>
                  {days.map((day) => {
                    const cell = timetableGrid[day]?.[period];
                    if (!cell) {
                      return <div key={day} className="border border-gray-200 rounded-md bg-gray-50/30 min-h-[70px]"></div>;
                    }
                    return (
                      <div 
                        key={day} 
                        onClick={() => setView("detail")}
                        className={`relative border rounded-md p-1.5 min-h-[70px] flex flex-col cursor-pointer hover:opacity-80 transition-opacity ${cell.style}`}
                      >
                        <span className="font-bold text-[10px] leading-tight whitespace-pre-line tracking-tight">{cell.title}</span>
                        {cell.room && <span className="text-[8px] mt-1 opacity-70 leading-tight">{cell.room}</span>}
                        {cell.dots && (
                          <div className="absolute bottom-1.5 left-1.5 flex gap-1">
                            {cell.dots.map((dotColor: string, i: number) => (
                              <div key={i} className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* 凡例 */}
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-[9px] mt-4 px-2 justify-center text-gray-600">
              <span className="flex items-center gap-1"><span className="w-2 h-2 border border-[#B9C2DB] bg-[#F2F4F8]"></span>形態系</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 border border-blue-200 bg-blue-50"></span>機能系</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 border border-emerald-200 bg-emerald-50"></span>生化学</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 border border-[#B9C2DB] bg-[#F2F4F8]"></span>病理</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 border border-teal-200 bg-teal-50"></span>臨床</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Zoom</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]"></span>通知</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>課題</span>
            </div>

          </div>
        )}

        {/* === シラバスタブ === */}
        {activeTab === "syllabus" && (
          <div className="space-y-4">
            <div className="w-full h-[70vh] rounded-xl overflow-hidden border border-gray-200 shadow-sm relative bg-gray-50">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-0">
                <Calendar className="text-gray-300 mb-2" size={32} />
                <p className="text-sm text-gray-500 font-bold mb-1">シラバスを読み込んでいます...</p>
                <p className="text-xs text-gray-400">表示されない場合は、<a href="https://lcu.hama-med.ac.jp/lcu-web/SC_06001B00_21" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">こちらからブラウザで開いて</a>ください。</p>
              </div>
              <iframe
                src="https://lcu.hama-med.ac.jp/lcu-web/SC_06001B00_21"
                title="大学シラバス"
                className="relative z-10 w-full h-full border-none bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}