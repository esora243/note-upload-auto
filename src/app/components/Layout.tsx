import { Outlet, NavLink, useLocation, useNavigate, useOutletContext } from "react-router";
import { Briefcase, GraduationCap, Users, User, Minus, X, ArrowLeft, ArrowRight, RefreshCw, Share2, Menu, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { LoginModal } from "./LoginModal";
import { LegalConsentModal } from "./LegalConsentModal";
import { LEGAL_CONSENT_STORAGE_KEY, LEGAL_CONSENT_VERSION } from "../data/legal";
import { toast, Toaster } from "sonner";

export type LayoutContextType = {
  isLoggedIn: boolean;
  openLoginModal: () => void;
  logout: () => void;
};

export function useLayoutContext() {
  return useOutletContext<LayoutContextType>();
}

export function Layout() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 初回起動時に利用規約・プライバシーポリシーへの同意モーダルを表示する
  // localStorage に保存された同意バージョンが現行と一致しない場合、再度表示される
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(LEGAL_CONSENT_STORAGE_KEY);
      if (!stored) {
        setIsLegalModalOpen(true);
        return;
      }
      const parsed = JSON.parse(stored) as { version?: string };
      if (parsed.version !== LEGAL_CONSENT_VERSION) {
        setIsLegalModalOpen(true);
      }
    } catch {
      // ストレージ読み込み失敗時も安全側に倒して表示する
      setIsLegalModalOpen(true);
    }
  }, []);

  const handleLegalAgree = () => {
    try {
      window.localStorage.setItem(
        LEGAL_CONSENT_STORAGE_KEY,
        JSON.stringify({
          version: LEGAL_CONSENT_VERSION,
          agreedAt: new Date().toISOString(),
        }),
      );
    } catch {
      // ストレージ書き込みに失敗しても UI は先に進める
    }
    setIsLegalModalOpen(false);
  };

  const handleAuthRequired = (path: string) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const navItems = [
    { name: "求人", path: "/jobs", icon: Briefcase },
    { name: "学校", path: "/school", icon: GraduationCap },
    { name: "課外活動", path: "/activities", icon: Users },
    { name: "記事", path: "/articles", icon: BookOpen },
    { name: "マイページ", path: "/profile", icon: User, onClick: () => handleAuthRequired("/profile") },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F8] text-[#1A1C24] font-sans">
      <Toaster position="top-center" />

      {/* Browser Header */}
      <div className="sticky top-0 z-50 text-white" style={{ background: "#11204C" }}>
        <div className="flex items-center justify-between px-4 py-3">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
            <Minus size={18} />
          </button>
          <h2 className="text-sm font-semibold tracking-wide">HagNavi</h2>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="sticky top-[52px] z-40 bg-white backdrop-blur-md shadow-sm" style={{ borderBottom: "1px solid #B9C2DB" }}>
        {/* Navigation Items */}
        <div className="flex items-center px-1 py-1">
          <div className="flex items-center gap-0.5 flex-1 justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));

              const activeClass = "text-white rounded-lg";
              const inactiveClass = "text-gray-500 hover:rounded-lg";

              return item.onClick ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  style={isActive ? { backgroundColor: "#1E3A8A" } : {}}
                  className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 transition-colors min-w-[58px] ${isActive ? activeClass : inactiveClass}`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium whitespace-nowrap">{item.name}</span>
                </button>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.path}
                  style={({ isActive: a }) => a ? { backgroundColor: "#1E3A8A" } : {}}
                  className={({ isActive: a }) =>
                    `flex flex-col items-center justify-center gap-0.5 px-2 py-1 transition-colors min-w-[58px] ${a ? activeClass : inactiveClass}`
                  }
                >
                  {({ isActive: a }) => (
                    <>
                      <Icon size={18} strokeWidth={a ? 2.5 : 2} />
                      <span className="text-[10px] font-medium whitespace-nowrap">{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden pb-16">
        <Outlet context={{
          isLoggedIn,
          openLoginModal: () => setIsLoginModalOpen(true),
          logout: () => setIsLoggedIn(false)
        }} />
      </main>

      {/* Footer Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 text-white" style={{ background: "#11204C" }}>
        <div className="flex items-center justify-around px-4 py-3">
          <button className="flex items-center justify-center w-12 h-10 hover:bg-white/10 rounded transition-colors">
            <ArrowLeft size={22} />
          </button>
          <button className="flex items-center justify-center w-12 h-10 hover:bg-white/10 rounded transition-colors">
            <ArrowRight size={22} />
          </button>
          <button className="flex items-center justify-center w-12 h-10 hover:bg-white/10 rounded transition-colors">
            <RefreshCw size={22} />
          </button>
          <button className="flex items-center justify-center w-12 h-10 hover:bg-white/10 rounded transition-colors">
            <Share2 size={22} />
          </button>
          <button className="flex items-center justify-center w-12 h-10 hover:bg-white/10 rounded transition-colors">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mock LINE Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setIsLoginModalOpen(false);
          toast.success("LINEでログインしました");
        }}
      />

      {/* First-launch legal consent modal (Terms of Service / Privacy Policy) */}
      <LegalConsentModal
        isOpen={isLegalModalOpen}
        onAgree={handleLegalAgree}
      />
    </div>
  );
}
