import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { DateTime, Day } from "https://js.sabae.cc/DateTime.js";

const spot0 = await CSV.fetchJSON("spot.csv");
const data = await CSV.fetchJSON("merged_survey_common.csv");

const spot2 = spot0.filter(i => i.市区町村.length > 1);
console.log(spot2);

/*
推奨者（Promoters）: 9点～10点（友人・同僚に勧めたいと強く思う）
中立者（Passives）: 7点～8点（満足はしているが、他社に乗り換える可能性も）
批判者（Detractors）: 0点～6点（不満があり、周囲にネガティブな口コミをする可能性）
NPS = 推奨者の割合(％) － 批判者の割合(％) 
*/

/*
ウェークリー 月曜日はじめ（月曜祝日があるけど）
*/
const dt = "アンケート回答日";

const startdt = data[0][dt];
const enddt = data[data.length - 1][dt];
const weekoffset = new DateTime(startdt).day.getWeek(); // 1:Monday, 7:Sunday
const startdt0 = new DateTime(startdt).day.dayBefore(weekoffset - 1);
console.log(startdt, startdt0, startdt0.getWeek())

const list = [];
for (const spot of spot2) {
  const data2 = data.filter(i => i.回答場所 == spot.type);
  //console.log(data2, spot.type);
  //const nps = ArrayUtil.toUnique(data2.map(i => i.おすすめ度));
  //console.log(nps);
  const d = {};
  d.spot = spot.type;
  d.NPS = "";
  d.cnt = data2.length;

  let dcnt = 0;
  let pcnt = 0;
  for (let i = 0; i <= 10; i++) {
    const n = data2.filter(j => j.おすすめ度 == i).length;
    d["NPS" + i] = (n / d.cnt * 100).toFixed(0) + "%";
    if (i <= 6) dcnt += n;
    if (i >= 9) pcnt += n;
  }
  d.NPS = ((pcnt - dcnt) / d.cnt * 100).toFixed(1);
  list.push(d);
}
await Deno.writeTextFile("spot-nps.csv", CSV.stringify(list));
