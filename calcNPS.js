import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { DateTime, Day } from "https://js.sabae.cc/DateTime.js";

const spot0 = await CSV.fetchJSON("spot.csv");
const data = await CSV.fetchJSON("merged_survey_common.csv");

const spot2 = spot0.filter(i => i.市区町村.length > 1);
console.log(spot2);

const nmin = 100;

/*
推奨者（Promoters）: 9点～10点（友人・同僚に勧めたいと強く思う）
中立者（Passives）: 7点～8点（満足はしているが、他社に乗り換える可能性も）
批判者（Detractors）: 0点～6点（不満があり、周囲にネガティブな口コミをする可能性）
NPS = 推奨者の割合(％) － 批判者の割合(％) 
*/

const cities = ArrayUtil.toUnique(spot0.map(i => i.市区町村));

const list = [];
for (const city of cities) {
  const spot3 = spot2.filter(i => i.市区町村 == city).map(i => i.type);
  const data2 = data.filter(i => spot3.indexOf(i.回答場所) >= 0);
  //console.log(data2, spot.type);
  //const nps = ArrayUtil.toUnique(data2.map(i => i.おすすめ度));
  //console.log(nps);
  const d = {};
  d.pref = spot0.find(i => i.市区町村 == city).都道府県;
  d.city = city;
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
const list2 = list.filter(i => !isNaN(i.NPS) && i.cnt >= nmin);
list2.sort((a, b) => b.NPS - a.NPS);
await Deno.writeTextFile("nps-city.csv", CSV.stringify(list2));
