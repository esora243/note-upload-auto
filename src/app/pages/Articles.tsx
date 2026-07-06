import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { FloatingBanner } from "../components/FloatingBanner";

export function Articles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const articles = [
    {
      id: 1,
      title: "2025年再試率50%!解剖実習突破法！",
      category: "基礎医学",
      date: "2026-04-01",
      image: "https://images.unsplash.com/photo-1603726574690-cc3138bfec8c?auto=format&fit=crop&q=80&w=600",
      excerpt: "医学科2年生必見！教授の出題傾向と過去問の活用法を徹底解説。"
    },
    {
      id: 2,
      title: "国家試験対策スケジュールの立て方",
      category: "国試対策",
      date: "2026-03-28",
      image: "https://images.unsplash.com/photo-1560111828-e16fc96d9a5e?auto=format&fit=crop&q=80&w=600",
      excerpt: "医師国家試験に合格するための計画的な学習スケジュールの作成方法。"
    },
    {
      id: 3,
      title: "臨床推論の基本：病歴聴取のコツ",
      category: "臨床・実習",
      date: "2026-04-05",
      image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=600",
      excerpt: "OSCEやポリクリで役立つ、OPQRSTを使ったスムーズな問診テクニック。"
    },
    {
      id: 4,
      title: "病理学エッセンス：組織免疫染色の見極め",
      category: "基礎医学",
      date: "2026-04-08",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600",
      excerpt: "腫瘍マーカーと免疫組織化学染色（IHC）の頻出パターンまとめ。"
    },
    {
      id: 5,
      title: "Notionを使った効率的な医学知識のまとめ方",
      category: "ツール",
      date: "2026-04-02",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=600",
      excerpt: "膨大な授業資料をデータベース化して検索可能にするNotionテンプレ配布。"
    },
    {
      id: 6,
      title: "ポリクリで回る前に準備すべき手技と知識",
      category: "臨床・実習",
      date: "2026-03-20",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      excerpt: "採血、ルート確保、縫合など、実習前に動画で確認しておくべきリスト。"
    },
    {
      id: 7,
      title: "胸部X線の読影ステップ完全ガイド",
      category: "臨床・実習",
      date: "2026-03-15",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600",
      excerpt: "シルエットサインからABCDEアプローチまで、見落としを防ぐ読影法。"
    },
    {
      id: 8,
      title: "マッチング対策：病院見学で聞くべき質問",
      category: "キャリア",
      date: "2026-03-10",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600",
      excerpt: "初期研修病院を選ぶ際、先輩研修医にこっそり聞いておくべき裏事情。"
    },
    {
      id: 9,
      title: "医学生向け：iPadアプリ活用術2026年版",
      category: "ツール",
      date: "2026-02-28",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600",
      excerpt: "GoodNotes6とAnkiを連携させた最強の暗記フローを紹介。"
    },
    {
      id: 10,
      title: "心電図の波形と軸偏位の覚え方",
      category: "基礎医学",
      date: "2026-02-20",
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600",
      excerpt: "循環器ブロックでつまずきやすい心電図の基礎をゴロ合わせで攻略。"
    },
    {
      id: 11,
      title: "CBT対策：出やすい公衆衛生の計算問題",
      category: "国試対策",
      date: "2026-02-15",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
      excerpt: "感度・特異度、オッズ比、相対危険度など、絶対に落とせない計算問題。"
    },
    {
      id: 12,
      title: "頻出する抗菌薬のスペクトラムまとめ",
      category: "基礎医学",
      date: "2026-02-10",
      image: "https://images.unsplash.com/photo-1584308666744-24d5e4a83b27?auto=format&fit=crop&q=80&w=600",
      excerpt: "ペニシリン系からカルバペネムまで、どの菌に効くかを一枚の図解に。"
    }
  ];

  const categories = ["すべて", ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchQuery = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === "すべて" || article.category === selectedCategory;
      return matchQuery && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full max-w-lg mx-auto pb-8 bg-white min-h-screen animate-in fade-in duration-300">

      {/* Header */}
      <div className="sticky top-[110px] z-30 bg-white border-b border-gray-100 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">記事</h2>
          <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
            ✏️ 記事を投稿する
          </button>
        </div>

        {/* 検索バー */}
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="記事を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] sm:text-sm transition-colors"
          />
        </div>

        {/* カテゴリチップ */}
        <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                selectedCategory === category
                  ? "bg-gray-800 border-gray-800 text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Banner */}
      <FloatingBanner
        campaignId="3"
        title="医学生向け奨学金プログラム説明会"
        imageUrl="https://images.unsplash.com/photo-1603726574690-cc3138bfec8c?auto=format&fit=crop&q=80&w=1080"
        sponsorName="公益財団法人 未来医療基金"
      />

      {/* 記事リスト */}
      <div className="px-4 pt-1 space-y-3 pb-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex hover:shadow-md transition-shadow cursor-pointer">
              <img src={article.image} alt={article.title} className="w-14 h-14 object-cover shrink-0 self-center ml-3 rounded-lg my-3" />
              <div className="p-3 flex flex-col justify-center min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#1E3A8A] font-bold px-1.5 py-0.5 bg-[#F2F4F8] rounded-sm">
                    {article.category}
                  </span>
                  <span className="text-[10px] text-gray-400">{article.date.replace(/-/g, '/')}</span>
                </div>
                <h4 className="text-sm font-bold text-gray-800 line-clamp-2 mb-1 leading-tight">{article.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2 leading-tight">{article.excerpt}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-sm font-bold">一致する記事が見つかりません</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("すべて"); }}
              className="mt-2 text-[#1E3A8A] text-xs font-bold underline"
            >
              検索条件をクリア
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
