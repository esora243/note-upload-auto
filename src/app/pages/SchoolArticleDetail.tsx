import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";

export function SchoolArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = {
    id: Number(id),
    title: "解剖学の効率的な勉強法",
    category: "勉強",
    date: "2026-04-01",
    image: "https://images.unsplash.com/photo-1603726574690-cc3138bfec8c?auto=format&fit=crop&q=80&w=1080",
    content: `
医学部1年生にとって最初の大きな壁となる解剖学。膨大な量の暗記事項を効率よく学習するためのポイントをまとめました。

## 1. 立体的なイメージを持つ

解剖学は平面の教科書だけでは理解しにくい科目です。3Dモデルアプリや解剖学アトラスを活用して、立体的な構造を把握しましょう。

## 2. 実習と座学を連動させる

解剖実習の前後に教科書を読むことで、理論と実践を結びつけることができます。実習で見た構造を復習することで記憶に定着しやすくなります。

## 3. グループ学習を活用

同じグループのメンバーと問題を出し合ったり、分からない部分を教え合うことで理解が深まります。

## 4. 国試過去問で重要ポイントを押さえる

国家試験の過去問を解くことで、頻出ポイントが分かります。早い段階から過去問に触れておくことをおすすめします。

## 5. 定期的な復習

一度学んだ内容も時間が経つと忘れてしまいます。スペース学習法を取り入れ、定期的に復習する習慣をつけましょう。
    `
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="sticky top-[110px] z-30 bg-white/90 backdrop-blur-md border-b border-[#B9C2DB] px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/school")} className="text-gray-600 hover:text-[#1E3A8A]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-base font-bold text-gray-800 flex-1 truncate">記事詳細</h1>
          <button className="text-gray-400 hover:text-[#1E3A8A]">
            <Share2 size={20} />
          </button>
        </div>

        {/* Article Content */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Featured Image */}
          <div className="w-full h-64 bg-gray-100">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Info */}
          <div className="px-4 py-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full flex items-center gap-1">
                <Tag size={12} />
                {article.category}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={12} />
                {article.date}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 leading-tight">{article.title}</h1>
          </div>

          {/* Article Body */}
          <div className="px-4 py-6 prose prose-sm max-w-none">
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('##')) {
                return (
                  <h2 key={idx} className="text-lg font-bold text-gray-800 mt-6 mb-3">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              return (
                <p key={idx} className="text-sm text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Related Articles */}
          <div className="px-4 py-6 bg-gray-50 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4">関連記事</h3>
            <div className="space-y-3">
              {[
                { id: 2, title: "国家試験対策スケジュールの立て方", category: "勉強" },
                { id: 3, title: "臨床実習で学ぶべきポイント", category: "臨床" }
              ].map((related) => (
                <button
                  key={related.id}
                  onClick={() => navigate(`/school/articles/${related.id}`)}
                  className="w-full bg-white p-3 rounded-xl border border-gray-100 text-left hover:border-[#B9C2DB] hover:bg-[#F2F4F8]/50 transition-all"
                >
                  <span className="text-[10px] font-bold text-blue-600 mb-1 block">{related.category}</span>
                  <p className="text-sm font-bold text-gray-800">{related.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
