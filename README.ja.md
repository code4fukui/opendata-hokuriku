# opendata-hokuriku

北陸三県（富山・石川・福井）の観光アンケートデータを集計・分析し、処理済みデータおよびNet Promoter Score（NPS）の分析結果を提供するオープンデータリポジトリです。

## ダッシュボード

- **[EKKA's - 観光NPSダッシュボード](https://code4fukui.github.io/ekkas/)**

北陸地方の各市町の月別NPSの推移を可視化したウェブダッシュボードです。

## データファイル

- **[merged_survey_common.csv](merged_survey_common.csv)**
  - 北陸三県観光アンケートデータ 共通項目マージ版 (2025/04/18 - 2025/10/31)
  - 三県すべてに共通する項目のみを抽出してマージしたアンケートデータです。

- **[spot.csv](spot.csv)**
  - 北陸三県観光スポット市町対応表
  - 観光スポットとそれぞれの市町を紐付けるマッピングデータです。

- **[nps-city.csv](nps-city.csv)**
  - 北陸三県観光市町・月別NPS (2025/04 - 2025/10)
  - 各市町について算出された月別のNet Promoter Score（NPS）です。

- **[nps-city-2025.csv](nps-city-2025.csv)**
  - 北陸三県観光市町NPS (100件以上) (2025/04/18 - 2025/10/31)
  - アンケート回答数が100件以上の市町を対象とした、対象期間全体のNPSです。

## 使い方

同梱のDenoスクリプトを使用して、データファイルを再生成できます。

### 必要な環境
- [Deno](https://deno.land/) ランタイム

### スクリプト

1. **共通アンケートデータの生成**
   元のデータを処理し、フィルタリングおよびマージを行って `merged_survey_common.csv` を生成します。
   ```bash
   deno run --allow-read --allow-write check.js
   ```

2. **NPSの計算**
   `merged_survey_common.csv` を読み込んで月別および全体のNPSを計算し、`nps-city.csv` と `nps-city-2025.csv` を生成します。
   ```bash
   deno run --allow-read --allow-write calcNPS.js
   ```

## データソース

このデータセットは、以下のリポジトリで提供されている統合オープンデータを基にしています。
- [hokuriku-inbound-kanko/opendata: 富山・石川・福井県の統合オープンデータ](https://github.com/hokuriku-inbound-kanko/opendata)

## ライセンス

元のリポジトリのライセンスファイルをご参照ください。
