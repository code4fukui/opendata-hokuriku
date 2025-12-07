import { CSV } from "https://js.sabae.cc/CSV.js";
import { getImageName } from "./getImageName.js";

const data = await CSV.fetchJSON("merged_survey.csv");
for (const d of data) {
  const fn = getImageName(d.性別, d.年代);
  console.log(fn);
  if (!fn) throw new Error(d.性別 + " " + d.年代);
}

