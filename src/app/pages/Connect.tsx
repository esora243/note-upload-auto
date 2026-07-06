import { useState } from "react";
import { MessageCircle, HelpCircle, Send, ChevronDown, Users, GraduationCap, Briefcase, MapPin, Mail, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { FloatingBanner } from "../components/FloatingBanner";

export function Connect() {
  const [activeTab, setActiveTab] = useState<"contact" | "faq" | "ob-matching" | "community">("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: ""
  });
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [faqCategory, setFaqCategory] = useState<string>("すべて");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("お問い合わせを送信しました！担当者より連絡いたします。");
    setFormData({ name: "", email: "", category: "", message: "" });
  };

  const faqs = [
    {
      id: 1,
      category: "基本情報",
      question: "HagNaviの利用は無料ですか？",
      answer: "はい、HagNaviの基本機能は全て無料でご利用いただけます。医学生の皆様の学習やキャリア支援を目的としたプラットフォームです。"
    },
    {
      id: 2,
      category: "求人",
      question: "求人に応募するにはどうすればいいですか？",
      answer: "求人詳細ページから「応募する」ボタンをクリックすると、企業の応募フォームに移動します。一部の求人ではHagNavi内で直接応募も可能です。"
    },
    {
      id: 3,
      category: "アカウント",
      question: "プロフィール情報は企業に公開されますか？",
      answer: "基本的にプロフィール情報は非公開です。求人に応募する際に、あなたが選択した情報のみが企業に共有されます。"
    },
    {
      id: 4,
      category: "アカウント",
      question: "LINEログインは必須ですか？",
      answer: "求人や記事の閲覧は誰でも可能ですが、保存機能や応募機能を利用するにはLINEログインが必要です。"
    },
    {
      id: 5,
      category: "アカウント",
      question: "退会したい場合はどうすればいいですか？",
      answer: "マイページの設定から退会手続きが可能です。または、お問い合わせフォームからご連絡ください。"
    },
    {
      id: 6,
      category: "通知",
      question: "企業からの連絡はどこに届きますか？",
      answer: "登録されたメールアドレスとLINEに通知が届きます。通知設定はマイページから変更可能です。"
    },
    {
      id: 7,
      category: "課外活動",
      question: "留学情報の詳細はどこで確認できますか？",
      answer: "課外活動セクションの「留学情報」タブから、各プログラムの詳細ページにアクセスできます。外部の支援機関のサイトへのリンクも掲載しています。"
    },
    {
      id: 8,
      category: "課外活動",
      question: "学生団体の連絡先を知りたいのですが？",
      answer: "各学生団体の詳細ページにSNSアカウントやメールアドレスが掲載されています。また、お問い合わせフォームから「〜〜の連絡先が欲しい」とご連絡いただくことも可能です。"
    }
  ];

  const obProfiles = [
    {
      id: 1,
      name: "田中 太郎",
      graduationYear: 2020,
      specialty: "循環器内科",
      hospital: "浜松医科大学医学部附属病院",
      location: "静岡県浜松市",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200",
      bio: "循環器内科医として研修中。医学生の相談に乗ります。",
      availableFor: ["病院見学相談", "キャリア相談", "研修先選び"]
    },
    {
      id: 2,
      name: "佐藤 花子",
      graduationYear: 2018,
      specialty: "小児科",
      hospital: "聖隷浜松病院",
      location: "静岡県浜松市",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200",
      bio: "小児科専攻医。医学生時代の経験をシェアします。",
      availableFor: ["小児科相談", "女性医師のキャリア", "ワークライフバランス"]
    },
    {
      id: 3,
      name: "鈴木 健一",
      graduationYear: 2015,
      specialty: "外科",
      hospital: "静岡県立総合病院",
      location: "静岡県静岡市",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200",
      bio: "外科医として活躍中。手術手技について相談可能。",
      availableFor: ["外科志望相談", "手技トレーニング", "研修生活"]
    }
  ];

  const communities = [
    {
      id: 1,
      name: "浜松医大 医学生コミュニティ",
      members: 250,
      category: "大学別",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600",
      description: "浜松医科大学の医学生が情報交換するコミュニティ。試験対策、部活、バイト情報など。"
    },
    {
      id: 2,
      name: "医学生IT・スタートアップ部",
      members: 180,
      category: "テーマ別",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
      description: "医療×ITに興味のある医学生のコミュニティ。アプリ開発やAI、起業に関する情報共有。"
    },
    {
      id: 3,
      name: "医学生キャリア相談室",
      members: 420,
      category: "キャリア",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600",
      description: "進路、マッチング、専門科選びなど、キャリアに関する相談ができるコミュニティ。"
    }
  ];

  const faqCategories = ["すべて", "基本情報", "求人", "アカウント", "通知", "課外活動"];

  const filteredFaqs = faqCategory === "すべて"
    ? faqs
    : faqs.filter(faq => faq.category === faqCategory);

  return (
    <div className="w-full max-w-lg mx-auto pb-8 animate-in fade-in slide-in-from-right-2 duration-300">

      {/* Header */}
      <div className="sticky top-[10px] z-30 bg-white border-b border-[#B9C2DB] px-4 pt-4 pb-3">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "contact"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            💬 お問い合わせ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("faq")}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "faq"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            ❓ FAQ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ob-matching")}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "ob-matching"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            👥 OBマッチング
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("community")}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "community"
                ? "bg-[#1E3A8A] text-white shadow-md"
                : "bg-gray-50 text-gray-600 hover:bg-[#F2F4F8]"
            }`}
          >
            🌐 コミュニティ
          </button>
        </div>
      </div>

      {/* Floating Banner */}
      <FloatingBanner
        campaignId="4"
        title="OB訪問・キャリア相談会のお知らせ"
        imageUrl="https://images.unsplash.com/photo-1560111828-e16fc96d9a5e?auto=format&fit=crop&q=80&w=1080"
        sponsorName="医学生キャリア支援センター"
      />

      {/* Content */}
      <div className="px-4 pt-1">
        {activeTab === "contact" ? (
          <div className="space-y-4">
            {/* Info Card */}
            <div className="bg-gradient-to-br from-[#F2F4F8] to-[#F2F4F8] rounded-2xl p-6 border border-[#B9C2DB]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] flex items-center justify-center shadow-md">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">お問い合わせ</h3>
                  <p className="text-xs text-gray-500">お気軽にご連絡ください</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                ご質問、ご要望、不具合報告など、どんなことでもお気軽にお問い合わせください。
                担当者より2営業日以内にご連絡いたします。
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#F2F4F8] p-6 space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-600 mb-2 block">お名前 *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="山田 太郎"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 mb-2 block">メールアドレス *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 mb-2 block">お問い合わせ種別 *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm"
                >
                  <option value="">選択してください</option>
                  <option value="contact">連絡先が欲しい</option>
                  <option value="question">サービスについての質問</option>
                  <option value="bug">不具合報告</option>
                  <option value="request">機能リクエスト</option>
                  <option value="article">記事投稿について</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 mb-2 block">お問い合わせ内容 *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="お問い合わせ内容をご記入ください"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#11204C] text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Send size={18} />
                送信する
              </button>
            </form>

            {/* Article Submission Note */}
            <div className="rounded-xl p-4 border" style={{ background: "#F2F4F8", borderColor: "#B9C2DB" }}>
              <p className="text-xs font-bold mb-1" style={{ color: "#1E3A8A" }}>✍️ 記事投稿について</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                HagNaviでは医学生・医療従事者による記事投稿を募集しています。勉強法、臨床実習レポート、キャリア体験談など、他の医学生に役立つ内容であれば歓迎します。お問い合わせ種別で「記事投稿について」を選択してご連絡ください。
              </p>
            </div>

            {/* Additional Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs text-gray-700">
                <span className="font-bold">💡 ヒント：</span>
                「〜〜の連絡先が欲しい」などのご要望もお気軽にお送りください。
                可能な限り情報をお調べしてご連絡いたします。
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* FAQ Header */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 mb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
                  <HelpCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">よくある質問</h3>
                  <p className="text-xs text-gray-500">FAQ</p>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                よくあるご質問をまとめました。解決しない場合はお問い合わせください。
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex overflow-x-auto gap-2 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    faqCategory === cat
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-sm border border-[#F2F4F8] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                    className="w-full p-4 flex items-start justify-between text-left hover:bg-[#F2F4F8]/50 transition-colors"
                  >
                    <div className="flex-1 pr-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-600 rounded">
                          {faq.category}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="shrink-0 text-[#1E3A8A] font-bold text-sm mt-0.5">Q.</span>
                        <span className="text-sm font-bold text-gray-800 leading-snug">
                          {faq.question}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-gray-400 shrink-0 transition-transform ${
                        openFaqId === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaqId === faq.id && (
                    <div className="px-4 pb-4 pt-0 border-t border-gray-50">
                      <div className="flex items-start gap-2 bg-[#F2F4F8]/50 p-3 rounded-lg">
                        <span className="shrink-0 text-blue-500 font-bold text-sm mt-0.5">A.</span>
                        <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 記事投稿バナー */}
            <div
              className="rounded-2xl overflow-hidden border border-[#B9C2DB] shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setActiveTab("contact")}
            >
              <div className="px-5 py-4 flex items-center gap-4" style={{ background: "linear-gradient(135deg, #1E3A8A, #11204C)" }}>
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0 text-2xl">
                  ✍️
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm leading-tight">記事を投稿したい</p>
                  <p className="text-white/70 text-xs mt-0.5">勉強法・実習レポートなど医学生に役立つ記事を募集中</p>
                </div>
                <ChevronDown size={18} className="text-white/60 shrink-0 -rotate-90" />
              </div>
            </div>

            {/* Contact Link */}
            <div className="bg-gray-50 rounded-xl p-5 text-center mt-2">
              <p className="text-xs text-gray-600 mb-3">解決しない場合は</p>
              <button
                onClick={() => setActiveTab("contact")}
                className="bg-[#1E3A8A] text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-sm hover:bg-[#11204C] transition-colors active:scale-95"
              >
                お問い合わせする
              </button>
            </div>
          </div>
        )}

        {activeTab === "ob-matching" && (
          <div className="space-y-4">
            {/* OB Matching Header */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">OBマッチング</h3>
                  <p className="text-xs text-gray-500">先輩医師に相談できます</p>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                研修先選び、専門科選択、キャリア相談など、先輩医師に直接相談できるサービスです。
              </p>
            </div>

            {/* OB Profiles */}
            {obProfiles.map((ob) => (
              <div key={ob.id} className="bg-white rounded-2xl shadow-sm border border-[#F2F4F8] p-4">
                <div className="flex gap-4 mb-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-gray-100">
                    <img src={ob.image} alt={ob.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{ob.name}</h4>
                    <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                      <Briefcase size={12} className="text-[#1E3A8A]" />
                      {ob.specialty}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-[#1E3A8A]" />
                      {ob.hospital}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {ob.graduationYear}年卒
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3">{ob.bio}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {ob.availableFor.map((topic, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-[#1E3A8A] text-white font-bold py-2.5 rounded-xl hover:bg-[#11204C] transition-colors text-sm flex items-center justify-center gap-2">
                  <Mail size={16} />
                  相談を申し込む
                </button>
              </div>
            ))}

            {/* Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-xs text-gray-700">
                <span className="font-bold">⚠️ 注意：</span>
                Phase 2機能です。マッチング申し込み後、運営から連絡先を共有します。
              </p>
            </div>
          </div>
        )}

        {activeTab === "community" && (
          <div className="space-y-4">
            {/* Community Header */}
            <div className="bg-gradient-to-br from-purple-50 to-[#F2F4F8] rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center shadow-md">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">医学生コミュニティ</h3>
                  <p className="text-xs text-gray-500">仲間と繋がろう</p>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                同じ目標を持つ仲間と情報交換、勉強会、交流イベントなどを開催しています。
              </p>
            </div>

            {/* Communities */}
            {communities.map((community) => (
              <div key={community.id} className="bg-white rounded-2xl shadow-sm border border-[#F2F4F8] overflow-hidden">
                <div className="relative h-32">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-purple-500 text-white rounded-full shadow-sm">
                      {community.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1.5 text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Users size={12} />
                      <span className="text-xs font-bold">{community.members}人</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-2">{community.name}</h4>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{community.description}</p>

                  <button className="w-full bg-purple-500 text-white font-bold py-2.5 rounded-xl hover:bg-purple-600 transition-colors text-sm flex items-center justify-center gap-2">
                    <ExternalLink size={16} />
                    コミュニティに参加
                  </button>
                </div>
              </div>
            ))}

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs text-gray-700">
                <span className="font-bold">💡 ヒント：</span>
                コミュニティに参加すると、LINE OpenChatに招待されます。情報交換や交流イベントに参加できます。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
