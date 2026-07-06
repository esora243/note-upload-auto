import { useState } from "react";
import { BookOpen, ChevronRight, Check, X, RotateCcw, TrendingUp } from "lucide-react";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
};

export function ExamPrep() {
  const [activeMode, setActiveMode] = useState<"browse" | "quiz">("browse");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const questions: Question[] = [
    {
      id: 1,
      question: "心筋梗塞の診断基準として、最も重要な検査所見はどれか。",
      options: [
        "心電図のST上昇",
        "トロポニンの上昇",
        "CKの上昇",
        "胸部X線での心拡大"
      ],
      correctAnswer: 1,
      explanation: "心筋梗塞の診断には、心筋トロポニン（TnT/TnI）の上昇が最も特異的です。心電図変化やCK上昇も参考になりますが、トロポニンが最も感度・特異度が高い検査です。",
      category: "循環器"
    },
    {
      id: 2,
      question: "糖尿病の診断基準に含まれないものはどれか。",
      options: [
        "空腹時血糖値 126 mg/dL以上",
        "HbA1c 6.5%以上",
        "随時血糖値 200 mg/dL以上",
        "尿糖陽性"
      ],
      correctAnswer: 3,
      explanation: "尿糖陽性は糖尿病の診断基準には含まれません。診断基準は、空腹時血糖≧126、75gOGTT 2時間値≧200、随時血糖≧200、HbA1c≧6.5%のいずれかです。",
      category: "内分泌・代謝"
    },
    {
      id: 3,
      question: "肺炎球菌性肺炎の第一選択薬はどれか。",
      options: [
        "ペニシリンG",
        "セフトリアキソン",
        "アジスロマイシン",
        "レボフロキサシン"
      ],
      correctAnswer: 1,
      explanation: "市中肺炎の原因として最も多い肺炎球菌に対しては、第3世代セフェム（セフトリアキソンなど）が第一選択となります。",
      category: "呼吸器・感染症"
    },
    {
      id: 4,
      question: "急性腎不全の原因として腎前性に分類されるものはどれか。",
      options: [
        "尿管結石",
        "脱水",
        "急性尿細管壊死",
        "間質性腎炎"
      ],
      correctAnswer: 1,
      explanation: "腎前性急性腎不全は、腎臓への血流が減少することで起こります。脱水、出血、心不全などが原因となります。尿管結石は腎後性、ATNや間質性腎炎は腎性に分類されます。",
      category: "腎・泌尿器"
    },
    {
      id: 5,
      question: "胃癌のリスク因子として最も関連が強いものはどれか。",
      options: [
        "ヘリコバクター・ピロリ感染",
        "喫煙",
        "アルコール摂取",
        "肥満"
      ],
      correctAnswer: 0,
      explanation: "ヘリコバクター・ピロリ菌感染は胃癌の最大のリスク因子です。WHO（国際がん研究機関）もピロリ菌を胃癌の確実な発がん因子（Group 1）と分類しています。",
      category: "消化器"
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
  };

  return (
    <div className="w-full max-w-lg mx-auto pb-8 animate-in fade-in slide-in-from-right-2 duration-300">

      {/* Header */}
      <div className="sticky top-[110px] z-30 bg-white border-b border-[#B9C2DB] px-4 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">CBT・国試対策</h2>

        {/* Mode Toggle */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveMode("browse")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeMode === "browse"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            📚 カテゴリー一覧
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("quiz")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeMode === "quiz"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            ✏️ 一問一答
          </button>
        </div>
      </div>

      <div className="px-4 pt-3">
        {activeMode === "browse" ? (
          <div className="space-y-3">
            {/* Score Card */}
            {score.total > 0 && (
              <div className="bg-gradient-to-br from-[#F2F4F8] to-[#F2F4F8] rounded-2xl p-4 border border-[#B9C2DB] mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">今日の正答率</p>
                    <p className="text-2xl font-bold text-[#11204C]">
                      {Math.round((score.correct / score.total) * 100)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">
                      {score.correct} / {score.total} 問正解
                    </p>
                    <button
                      onClick={handleReset}
                      className="text-xs text-[#1E3A8A] hover:text-[#11204C] font-bold flex items-center gap-1 mt-1"
                    >
                      <RotateCcw size={12} />
                      リセット
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Categories */}
            {["循環器", "呼吸器・感染症", "消化器", "内分泌・代謝", "腎・泌尿器", "神経", "血液・免疫"].map((category) => (
              <div key={category} className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F4F8] hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#B9C2DB]/30 flex items-center justify-center">
                      <BookOpen size={20} className="text-[#1E3A8A]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{category}</h3>
                      <p className="text-xs text-gray-500">全50問</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-300" />
                </div>
              </div>
            ))}

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
              <p className="text-xs text-gray-700">
                <span className="font-bold">💡 ヒント：</span>
                一問一答モードで効率的に復習できます。間違えた問題は自動的にマークされ、後で復習できます。
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Progress */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F4F8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">
                  問題 {currentQuestionIndex + 1} / {questions.length}
                </span>
                {score.total > 0 && (
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-[#1E3A8A]" />
                    <span className="text-xs font-bold text-[#11204C]">
                      {Math.round((score.correct / score.total) * 100)}% 正解
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#1E3A8A] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F2F4F8]">
              <div className="mb-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-blue-100 text-blue-600 rounded">
                  {currentQuestion.category}
                </span>
              </div>
              <h3 className="font-bold text-gray-800 leading-relaxed mb-4">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  const showCorrectAnswer = showResult && isCorrect;
                  const showWrongAnswer = showResult && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                        showCorrectAnswer
                          ? "border-green-500 bg-green-50"
                          : showWrongAnswer
                          ? "border-red-500 bg-red-50"
                          : isSelected
                          ? "border-[#1E3A8A] bg-[#F2F4F8]"
                          : "border-gray-200 hover:border-[#B9C2DB]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800 flex-1">{option}</span>
                        {showCorrectAnswer && (
                          <Check size={18} className="text-green-600" />
                        )}
                        {showWrongAnswer && (
                          <X size={18} className="text-red-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            {showResult && (
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <BookOpen size={16} className="text-blue-500" />
                  解説
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="w-full bg-[#1E3A8A] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#11204C] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                解答する
              </button>
            ) : (
              <div className="flex gap-2">
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-[#1E3A8A] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#11204C] transition-colors"
                  >
                    次の問題
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-[#1E3A8A] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#11204C] transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} />
                    最初から
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
