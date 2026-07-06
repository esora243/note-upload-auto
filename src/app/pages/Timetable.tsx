import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, List, Clock } from "lucide-react";
import { useNavigate } from "react-router";

type Class = {
  id: string;
  name: string;
  category: "形態系" | "機能系" | "生化学" | "病理" | "臨床" | "一般";
  dayOfWeek: number; // 0=月, 1=火, 2=水, 3=木, 4=金
  periodStart: number;
  periodEnd: number;
  room: string;
  teacher: string;
  zoomUrl?: string;
  hasNotification?: boolean;
  hasUnfinishedAssignment?: boolean;
};

export function Timetable() {
  const navigate = useNavigate();
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeTab, setActiveTab] = useState<"timetable" | "syllabus" | "articles">("timetable");

  // モックデータ
  const classes: Class[] = [
    {
      id: "1",
      name: "解剖学",
      category: "形態系",
      dayOfWeek: 0,
      periodStart: 1,
      periodEnd: 2,
      room: "第1実習室",
      teacher: "田中教授",
      zoomUrl: "https://zoom.us/j/123",
      hasNotification: true,
      hasUnfinishedAssignment: true
    },
    {
      id: "2",
      name: "生理学",
      category: "機能系",
      dayOfWeek: 1,
      periodStart: 3,
      periodEnd: 3,
      room: "大講義室A",
      teacher: "佐藤教授",
      zoomUrl: "https://zoom.us/j/456",
      hasNotification: false,
      hasUnfinishedAssignment: false
    },
    {
      id: "3",
      name: "生化学",
      category: "生化学",
      dayOfWeek: 2,
      periodStart: 2,
      periodEnd: 2,
      room: "講義室B",
      teacher: "鈴木准教授"
    },
    {
      id: "4",
      name: "病理学",
      category: "病理",
      dayOfWeek: 3,
      periodStart: 4,
      periodEnd: 4,
      room: "大講義室A",
      teacher: "高橋教授",
      hasUnfinishedAssignment: true
    },
    {
      id: "5",
      name: "臨床実習",
      category: "臨床",
      dayOfWeek: 4,
      periodStart: 1,
      periodEnd: 3,
      room: "病棟",
      teacher: "山田医師",
      hasNotification: true
    }
  ];

  const periods = [
    { period: 1, start: "09:00", end: "10:30" },
    { period: 2, start: "10:40", end: "12:10" },
    { period: 3, start: "13:00", end: "14:30" },
    { period: 4, start: "14:40", end: "16:10" },
    { period: 5, start: "16:20", end: "17:50" },
    { period: 6, start: "18:00", end: "19:30" }
  ];

  const weekDays = ["月", "火", "水", "木", "金"];

  const categoryColors: Record<Class["category"], string> = {
    "形態系": "bg-blue-100 border-blue-300 text-blue-800",
    "機能系": "bg-green-100 border-green-300 text-green-800",
    "生化学": "bg-purple-100 border-purple-300 text-purple-800",
    "病理": "bg-red-100 border-red-300 text-red-800",
    "臨床": "bg-[#B9C2DB]/30 border-[#B9C2DB] text-[#11204C]",
    "一般": "bg-gray-100 border-gray-300 text-gray-800"
  };

  const getClassForCell = (day: number, period: number): Class | null => {
    return classes.find(
      c => c.dayOfWeek === day && period >= c.periodStart && period <= c.periodEnd
    ) || null;
  };

  const today = new Date().getDay(); // 0=日, 1=月, 2=火...
  const todayIndex = today === 0 ? -1 : today - 1; // 月曜を0とする

  const getCurrentWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1 + weekOffset * 7); // 月曜日
    return startOfWeek;
  };

  const weekStart = getCurrentWeek();
  const weekDates = weekDays.map((_, idx) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + idx);
    return date;
  });

  return (
    <div className="w-full max-w-6xl mx-auto pb-8 animate-in fade-in duration-300">

      {/* Header */}
      <div className="sticky top-[110px] z-30 bg-white border-b border-[#B9C2DB] px-4 py-4">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("timetable");
            }}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "timetable"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            📅 時間割
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("syllabus");
            }}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "syllabus"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            📚 シラバス
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("articles");
            }}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "articles"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            📝 勉強記事
          </button>
        </div>

        {activeTab === "timetable" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">時間割</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Clock size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <List size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-lg bg-[#1E3A8A] text-white hover:bg-[#11204C] transition-colors">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Week Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setWeekOffset(weekOffset - 1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <div className="text-sm font-bold text-gray-700">
                {weekDates[0].getMonth() + 1}月{weekDates[0].getDate()}日 〜 {weekDates[4].getMonth() + 1}月{weekDates[4].getDate()}日
              </div>
              <button
                onClick={() => setWeekOffset(weekOffset + 1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </>
        )}

        {activeTab === "syllabus" && (
          <div className="text-center py-4">
            <h2 className="text-xl font-bold text-gray-800">シラバス</h2>
          </div>
        )}

        {activeTab === "articles" && (
          <div className="text-center py-4">
            <h2 className="text-xl font-bold text-gray-800">勉強記事</h2>
          </div>
        )}
      </div>

      {/* Content */}
      {activeTab === "timetable" && (
        <>
          {/* Timetable Grid */}
          <div className="px-4 pt-2 overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Header Row */}
              <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-2 mb-2">
                <div></div>
                {weekDays.map((day, idx) => {
                  const date = weekDates[idx];
                  const isToday = todayIndex === idx && weekOffset === 0;
                  return (
                    <div key={day} className="text-center">
                      <div className={`text-xs font-bold mb-1 ${isToday ? "text-[#1E3A8A]" : "text-gray-600"}`}>
                        {day}
                      </div>
                      <div className={`text-xs ${isToday ? "text-[#1E3A8A] font-bold" : "text-gray-400"}`}>
                        {isToday ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1E3A8A] text-white">
                            {date.getDate()}
                          </span>
                        ) : (
                          date.getDate()
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Time Slots */}
              {periods.map(({ period, start, end }) => (
            <div key={period} className="grid grid-cols-[60px_repeat(5,1fr)] gap-2 mb-2">
              {/* Period Label */}
              <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200 py-2">
                <div className="text-sm font-bold text-gray-800">{period}限</div>
                <div className="text-[10px] text-gray-500 mt-1">{start}</div>
                <div className="text-[10px] text-gray-400">↓</div>
                <div className="text-[10px] text-gray-500">{end}</div>
              </div>

                {/* Class Cells */}
                {weekDays.map((_, dayIdx) => {
                const classData = getClassForCell(dayIdx, period);
                const isToday = todayIndex === dayIdx && weekOffset === 0;

                if (!classData) {
                  return (
                    <div
                      key={dayIdx}
                      className={`min-h-[100px] rounded-lg border-2 border-dashed transition-colors hover:bg-gray-50 cursor-pointer ${
                        isToday ? "border-[#B9C2DB] bg-[#F2F4F8]/30" : "border-gray-200"
                      }`}
                    />
                  );
                }

                // 連続コマの場合、最初のコマのみ表示
                if (period !== classData.periodStart) {
                  return <div key={dayIdx} className="hidden" />;
                }

                const spans = classData.periodEnd - classData.periodStart + 1;
                const colorClass = categoryColors[classData.category];

                return (
                  <div
                    key={dayIdx}
                    onClick={() => navigate(`/school/timetable/${classData.id}`)}
                    className={`min-h-[100px] rounded-lg border-2 p-3 cursor-pointer transition-all hover:shadow-md ${colorClass} ${
                      isToday ? "ring-2 ring-orange-400" : ""
                    }`}
                    style={{ gridRow: `span ${spans}` }}
                  >
                    <div className="font-bold text-sm mb-1 leading-tight">{classData.name}</div>
                    <div className="text-[10px] opacity-80 mb-2">{classData.room}</div>

                    {/* Indicators */}
                    <div className="flex items-center gap-1 flex-wrap">
                      {classData.zoomUrl && (
                        <div className="w-2 h-2 rounded-full bg-blue-500" title="Zoom URL設定済み" />
                      )}
                      {classData.hasNotification && (
                        <div className="w-2 h-2 rounded-full bg-[#1E3A8A]" title="LINE通知ON" />
                      )}
                      {classData.hasUnfinishedAssignment && (
                        <div className="px-1.5 py-0.5 rounded bg-[#1E3A8A] text-white text-[8px] font-bold">
                          課題
                        </div>
                      )}
                    </div>
                  </div>
                );
                })}
              </div>
            ))}
            </div>
          </div>

          {/* Legend */}
          <div className="px-4 mt-3 pb-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h4 className="text-xs font-bold text-gray-600 mb-3">凡例</h4>

              {/* Category Colors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {Object.entries(categoryColors).map(([category, colorClass]) => (
                  <div key={category} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded border-2 ${colorClass}`} />
                    <span className="text-xs text-gray-700">{category}</span>
                  </div>
                ))}
              </div>

              {/* Indicators */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-700">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Zoom URL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#1E3A8A]" />
                  <span>LINE通知</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="px-1.5 py-0.5 rounded bg-[#1E3A8A] text-white text-[8px] font-bold">課題</div>
                  <span>未完了課題</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "syllabus" && (
        <div className="px-4 pt-3 pb-8">
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">シラバス機能は準備中です</p>
            <p className="text-sm text-gray-400">Coming soon...</p>
          </div>
        </div>
      )}

      {activeTab === "articles" && (
        <div className="px-4 pt-3 pb-8">
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">勉強記事機能は準備中です</p>
            <p className="text-sm text-gray-400">Coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
}
