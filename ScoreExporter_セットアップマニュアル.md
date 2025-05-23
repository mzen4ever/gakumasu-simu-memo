# Score Exporter 拡張機能セットアップ手順

この拡張機能は、gktools.ris.moe で表示されるスコアとステージ情報を Google スプレッドシートに送信します。

---

## 1. Google スプレッドシートのコピーと Webhook URL の発行

1. 以下のテンプレートスプレッドシートを開いて「ファイル」＞「コピーを作成」を選択  
   [テンプレートシートを開く](https://docs.google.com/spreadsheets/d/1CGYGaRDrwSilKyTSfuyIyMcH_3A9F2bcEmjiFDMNsm0/edit?usp=sharing)
2. コピー先のシートで「拡張機能」＞「Apps Script」を開く
3. 以下の `doPost` コードが含まれていることを確認（すでに貼られています）

4. 上部メニュー「デプロイ」＞「新しいデプロイ」
   - 種類：ウェブアプリ
   - 実行する関数：doPost
   - アクセス権：全員（匿名ユーザー含む）
5. 表示された `/exec` で終わる URL をコピー（後で拡張機能に設定します）

---

## 2. Webhook URL を拡張機能に設定

1. Chrome の拡張機能ページ（chrome://extensions/）を開く
2. Score Exporter の「詳細」＞「オプション」をクリック
3. 発行した Webhook URL を貼り付けて「保存」

---

## 3. list シートの作成と設定

1. スプレッドシートに「list」という名前のシートを追加
2. A列にカード番号、B列に対応するアイドル名を入力

例：

| A列（cardNumber） | B列（名前）     |
|------------------|----------------|
| 544              | あ〇ふらい     |
| 123              | m〇ri       |
| 999              | こ〇ろ       |

---

## 4. 拡張機能の使い方

1. gktools.ris.moe/simulator を開く
2. ステージとスコアを表示（シミュレーション完了後）
3. 拡張機能ボタンをクリックすると、該当ステージのシートに自動で記録されます

---

不明点があれば、配布元に問い合わせてください。
