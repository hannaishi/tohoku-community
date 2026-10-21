# シーメイト東北部

Figma Makeの参考ソースを基に、HTML5 / SCSS / Vanilla JavaScriptで実装する静的サイトです。現在の実装範囲は共通設定・Header・Heroのみです。

## 開発

Node.js 24 / npm 11、Python 3で確認しています。

```sh
npm ci
npm run build
npm start
```

Sassの監視コンパイルは別ターミナルで `npm run watch` を実行します。クラウド環境で既定のnpmキャッシュに書き込めない場合は `npm ci --cache /tmp/tohoku-npm-cache` を使用してください。

`npm start` は8000番ポートで静的ファイルを配信します。ビルド済みCSSとフォントを同梱しているため、配信時のNode.jsは不要です。

## 構成

- `index.html`: Header・Hero。WordPress移行時に共通Headerと本文を分離します。
- `src/scss/global`: カラー・フォントのカスタムプロパティとブレークポイント。
- `src/scss/layout`: リセット、基本スタイル、Header。
- `src/scss/component`: コンテナ、ボタン。
- `src/scss/page`: Hero。
- `assets/css/style.css`: Sassのビルド結果。
- `assets/css/fonts.css` / `assets/fonts`: Fontsourceから取得した3書体とOFLライセンス。必要な文字範囲のWOFF2だけをブラウザが読み込みます。
- `assets/js/main.js`: メニュー開閉、フォーカス管理、スクロール時のHeader変更。

SCSSのセレクタはフラットに記述します。`l-`はレイアウト、`c-`は共通部品、`p-`はページ固有、`js-`は操作対象です。セレクタのネストと子セレクタは使用しません。

本文のブレークポイントは768px / 1024pxです。ナビゲーションのみ、ロゴ約167px＋ナビ約668px＋左右余白48px＋間隔32pxが必要なため1024pxから横並びにしています。Sassの切り替え幅を変更する際は、JavaScriptのmatchMediaも合わせて変更します。

## 確認結果・制限

Chromiumで1440 / 1024 / 768 / 390px（高さ900px）を確認し、横方向のはみ出しがないことを検証しました。390px・高さ600pxでEnter/Space/Tab、Escで閉じてフォーカスを戻す動作、リンク選択後の閉鎖、リサイズ時の状態リセット、スクロール40pxでは透明・41pxで背景変更を確認しました。

Heroの見出しは元ソースの文字サイズ・最大幅・明示改行を維持し、語句の途中で短く折れることを避けるため「東北で頑張る」「女性たちが、」「つながる場所。」をそれぞれひとまとまりにしています。短い画面でも固定Headerと本文が重ならないよう、Heroに上部余白を確保しています。

Hero画像は以下の元URLを参照しています。現在のクラウド環境ではプロキシから403が返り、ローカル取得もブラウザ表示もできませんでした。代替写真は使用していません。画像のトリミング指定は `object-fit: cover` / `object-position: center 30%` です。

https://images.unsplash.com/photo-1699616040692-987a9be61635?w=1800&h=1200&fit=crop&auto=format

Google Fontsへの接続も制限されていたため、同じ3書体をFontsourceのnpm配布から取得してローカル配信しています。版情報とライセンスは `assets/fonts` に保存しています。

JavaScriptの未捕捉エラーは検出されませんでした。画像の外部リソース読み込みエラーは残っています。Figma Makeの実画面キャプチャとの比較、写真を含む表示の確認は未実施です。

About以降・Footerは未実装です。ナビゲーションとCTAの `#about` 等のリンク先は、後続工程で作成するため現在は存在しません。
