# opendata-hokuriku

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

北陸三県（富山・石川・福井）の観光アンケートデータを集計・分析したオープンデータリポジトリです。

This repository provides open data derived from tourism surveys in Japan's Hokuriku region (Toyama, Ishikawa, and Fukui prefectures), including processed data and Net Promoter Score (NPS) analysis.

## Dashboard

- **[EKKA's - 観光NPSダッシュボード](https://code4fukui.github.io/ekkas/)**

A web-based dashboard visualizing the monthly NPS trends for municipalities across the Hokuriku region.

## Data Files

- **[merged_survey_common.csv](merged_survey_common.csv)**
  - 北陸三県観光アンケートデータ 共通項目マージ版 (2025/04/18 - 2025/10/31)
  - Merged survey data containing only the fields common to all three prefectures.

- **[spot.csv](spot.csv)**
  - 北陸三県観光スポット市町対応表
  - A mapping table that links tourist spots to their respective municipalities.

- **[nps-city.csv](nps-city.csv)**
  - 北陸三県観光市町・月別NPS (2025/04 - 2025/10)
  - Monthly Net Promoter Score (NPS) calculated for each municipality.

- **[nps-city-2025.csv](nps-city-2025.csv)**
  - 北陸三県観光市町NPS (100件以上) (2025/04/18 - 2025/10/31)
  - Overall NPS for the period, for municipalities with 100 or more survey responses.

## Usage

The data files can be regenerated using the provided Deno scripts.

### Dependencies
- [Deno](https://deno.land/) runtime

### Scripts

1.  **Generate Common Survey Data**
    This script processes the raw source data to create the filtered and merged `merged_survey_common.csv`.
    ```bash
    deno run --allow-read --allow-write check.js
    ```

2.  **Calculate NPS**
    This script reads `merged_survey_common.csv` to calculate monthly and overall NPS, generating `nps-city.csv` and `nps-city-2025.csv`.
    ```bash
    deno run --allow-read --allow-write calcNPS.js
    ```

## Data Source

This dataset is based on the integrated open data provided by the following repository:
- [hokuriku-inbound-kanko/opendata: Integrated open data for Toyama, Ishikawa, and Fukui prefectures](https://github.com/hokuriku-inbound-kanko/opendata)

## License

See the license file in the source repository.