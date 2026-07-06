# 変更内容 — 初回起動時の利用規約・プライバシーポリシー表示

## 概要
Web アプリを最初に開いたときに、利用規約とプライバシーポリシーの同意モーダルを
自動表示するように変更しました。ユーザーが「同意して始める」を押すまで、
モーダルは閉じられません。同意は `localStorage` に記録され、次回以降は表示されません。
(規約改定時は `LEGAL_CONSENT_VERSION` を更新することで、既存ユーザーにも再度確認を求められます。)

デザインは Hugmeid Web app mock 側の最新デザイン言語 (Vite + React Router + Tailwind、
`#11204C` / `#1E3A8A` / `#B9C2DB` のブランドカラー、rounded-2xl、`sonner` トースト等) に
沿ってゼロから作り直しています。

## 変更ファイル一覧

| 種別 | ファイル | 内容 |
| --- | --- | --- |
| 🆕 新規 | `src/app/data/legal.ts` | 利用規約 (15条) とプライバシーポリシー (14項) の全文データ、および `localStorage` キー / バージョン定数 |
| 🆕 新規 | `src/app/components/LegalConsentModal.tsx` | 初回起動時に表示する同意モーダル本体 |
| ✏️ 更新 | `src/app/components/Layout.tsx` | 初回起動判定 (`useEffect` + `localStorage`) と `<LegalConsentModal />` の統合 |

その他のファイルは変更していません。

## モーダルの主な仕様

- タブで「利用規約」「プライバシーポリシー」を切り替え
- 両方とも本文を最下部までスクロールしないと同意チェックボックスが有効化されない
- 両方読み終わってチェックボックスをオンにした場合のみ「同意して始める」ボタンが有効になる
- スクロールが必要なタブでは「最後までスクロールして確認」ボタンを表示し、
  ワンタップで末尾まで自動スクロール
- モーダル表示中はページ本体のスクロールをロック (`document.body.style.overflow`)
- 同意時に `localStorage.hugnavi.legalConsent = { version, agreedAt }` を保存
- `localStorage` にアクセスできない環境 (プライベートモード等) でも UI は破綻せず先に進める
