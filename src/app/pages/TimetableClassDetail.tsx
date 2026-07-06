import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";

type LectureSession = {
  id: string;
  date: string;
  time: string;
  room: string;
  isCompleted: boolean;
};

type Assignment = {
  id: string;
  title: string;
  dueDate: string;
  isCompleted: boolean;
};

export function TimetableClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classInfo] = useState({
    name: "生理学",
    period: "1〜2限",
    time: "09:00-12:00",
    semester: "前期/後期",
    teacher: "担当教員",
    zoomUrl: "https://zoom.us/j/123456",
    powerUrl: "https://example.com/power",
    tags: ["試験あり"]
  });

  const [lectureSessions, setLectureSessions] = useState<LectureSession[]>([
    { id: "1", date: "2026/04/15 (火)", time: "09:00-12:00", room: "2-2", isCompleted: false },
    { id: "2", date: "2026/04/22 (火)", time: "09:00-12:00", room: "2-2", isCompleted: false },
    { id: "3", date: "2026/04/29 (火)", time: "09:00-12:00", room: "2-2", isCompleted: false }
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: "1", title: "〜週のレポート 提出まとめ", dueDate: "2026/04/30", isCompleted: false },
    { id: "2", title: "課題タイトル1", dueDate: "2026/05/07", isCompleted: true },
    { id: "3", title: "課題タイトル2", dueDate: "2026/05/14", isCompleted: false }
  ]);

  const [memo, setMemo] = useState("ノート追加でこんな感じでコメント書いたり授業でのメモ書いたり、次の授業時間までに〜〜する等");

  const [notifications, setNotifications] = useState({
    reminder: true,
    assignmentDeadline: true,
    cancelNotice: false
  });

  const toggleSession = (sessionId: string) => {
    setLectureSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, isCompleted: !s.isCompleted } : s))
    );
  };

  const toggleAssignment = (assignmentId: string) => {
    setAssignments(prev =>
      prev.map(a => (a.id === assignmentId ? { ...a, isCompleted: !a.isCompleted } : a))
    );
  };

  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="min-h-screen bg-[#F2F4F8] pb-20">
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="sticky top-[110px] z-30 bg-white border-b border-[#B9C2DB] px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/school/timetable")} className="text-gray-600 hover:text-[#1E3A8A]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-base font-bold text-gray-800 flex-1">授業の詳細</h1>
          <button className="text-[#1E3A8A] text-sm font-bold">編集</button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{classInfo.name}</h2>

            <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">曜日・時限</span>
                <span className="font-medium text-gray-800">{classInfo.period}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">時間</span>
                <span className="font-medium text-gray-800">{classInfo.time}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">開講期間</span>
                <span className="font-medium text-gray-800">{classInfo.semester}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">担当教員</span>
                <span className="font-medium text-gray-800">{classInfo.teacher}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {classInfo.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-[#B9C2DB]/30 text-[#11204C] rounded-full text-xs font-bold">
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-4 flex gap-3">
              <a
                href={classInfo.zoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-bold hover:bg-blue-600 transition-colors"
              >
                <ExternalLink size={16} />
                Zoom を開く
              </a>
              <a
                href={classInfo.powerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                <ExternalLink size={16} />
                Power を開く
              </a>
            </div>
          </div>

          {/* Lecture Sessions */}
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-3">講義日程</h3>
            <div className="space-y-2">
              {lectureSessions.map(session => (
                <div
                  key={session.id}
                  className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-3"
                >
                  <button
                    onClick={() => toggleSession(session.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                      session.isCompleted
                        ? "bg-[#1E3A8A] border-[#1E3A8A]"
                        : "border-gray-300 hover:border-[#1E3A8A]"
                    }`}
                  >
                    {session.isCompleted && <Check size={14} className="text-white" />}
                  </button>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">{session.date}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {session.time} / {session.room}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-dashed border-gray-200" />

          {/* Assignments */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-800">課題</h3>
              <button className="text-[#1E3A8A] text-sm font-bold flex items-center gap-1">
                <Plus size={16} />
                課題を追加
              </button>
            </div>
            <div className="space-y-2">
              {assignments.map(assignment => (
                <div
                  key={assignment.id}
                  className="bg-white rounded-xl p-4 border border-gray-200 flex items-start gap-3"
                >
                  <button
                    onClick={() => toggleAssignment(assignment.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                      assignment.isCompleted
                        ? "bg-[#1E3A8A] border-[#1E3A8A]"
                        : "border-gray-300 hover:border-[#1E3A8A]"
                    }`}
                  >
                    {assignment.isCompleted && <Check size={14} className="text-white" />}
                  </button>
                  <div className="flex-1">
                    <div
                      className={`text-sm font-medium mb-1 ${
                        assignment.isCompleted ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {assignment.title}
                    </div>
                    <div className="text-xs text-gray-500">期限: {assignment.dueDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Memo */}
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-3">メモ</h3>
            <textarea
              value={memo}
              onChange={e => setMemo(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm resize-none"
              placeholder="授業のメモを入力..."
            />
          </div>

          {/* LINE Notifications */}
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-3">LINE通知設定</h3>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
              {/* 授業リマインド */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-800">授業リマインド</div>
                  <div className="text-xs text-gray-500 mt-0.5">授業30分前</div>
                </div>
                <button
                  onClick={() => toggleNotification("reminder")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.reminder ? "bg-[#1E3A8A]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      notifications.reminder ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* 課題期限リマインド */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-800">課題期限リマインド</div>
                  <div className="text-xs text-gray-500 mt-0.5">締切2日前に通知</div>
                </div>
                <button
                  onClick={() => toggleNotification("assignmentDeadline")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.assignmentDeadline ? "bg-[#1E3A8A]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      notifications.assignmentDeadline ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* 休講/教室変更通知 */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-800">休講/教室変更通知</div>
                  <div className="text-xs text-gray-500 mt-0.5">即座に通知</div>
                </div>
                <button
                  onClick={() => toggleNotification("cancelNotice")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.cancelNotice ? "bg-[#1E3A8A]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      notifications.cancelNotice ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
