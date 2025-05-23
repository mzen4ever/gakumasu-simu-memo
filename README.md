# Score Exporter 拡張機能

このChrome拡張機能は、[gktools.ris.moe](https://gktools.ris.moe) のスコアシミュレーターからスコア結果とステージ情報を取得し、Google スプレッドシートに自動で記録します。

## 機能概要

- スコア（最小値、平均値、中央値、最大値）を読み取り
- ステージ番号（例：24-1）を自動取得し、対応するシートに記録
- アイテムリンクURLからカード番号を抽出し、`list` シートと照合してアイドル名を取得
- アイドル名を含むハイパーリンクとして記録
- シートがなければ自動作成し、ヘッダー・フィルターを設定
- シート順を自動整列（listシートは常に一番右）

## Chrome拡張機能のインストール手順（ローカル読み込み）

この拡張機能は Chrome ウェブストアではなく、ローカルで読み込んで使用します。

1. このリポジトリをダウンロード（「Code」＞「Download ZIP」）し、ZIPを解凍する
2. Chrome のアドレスバーに `chrome://extensions/` と入力して開く
3. 右上の「デベロッパーモード」をオンにする
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、解凍したフォルダを選択
5. 拡張機能が追加され、「スプレッドシートに送信」ボタンが表示される
6. オプション画面で Webhook URL を設定し、使用開始

## セットアップ手順

詳細な手順は以下のマニュアルをご参照ください：  
[ScoreExporter_セットアップマニュアル.md](./ScoreExporter_セットアップマニュアル.md)

### 要約：

1. [テンプレートスプレッドシートをコピー](https://docs.google.com/spreadsheets/d/1CGYGaRDrwSilKyTSfuyIyMcH_3A9F2bcEmjiFDMNsm0/edit?usp=sharing)
2. Apps Script を開き、`doPost()` 関数があることを確認
3. ウェブアプリとしてデプロイし、`/exec` で終わるURLを取得
4. 拡張機能のオプション画面でそのURLを設定
5. `list` シートにカード番号とアイドル名を入力
6. 拡張機能ボタンをクリック → スプレッドシートに記録

## 使用環境

- Google Chrome（最新）
- Google アカウント（スプレッドシートおよびApps Scriptの利用に必要）

## ライセンス

MIT License
