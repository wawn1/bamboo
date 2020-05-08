import cnchar from "cnchar";

export function aggregate(arr) {
  let hash = {};
  for (let {id, name, picUrl} of arr) {
    let initial = cnchar.spell(name)[0].toUpperCase();
    hash[initial] = hash[initial] || [];
    hash[initial].push({id, name, picUrl});
  }
  let res = [];
  for (let key in hash) res.push({title: key, items: hash[key]});
  res.sort((a, b) => a["title"].charCodeAt(0) - b["title"].charCodeAt(0));
  return res;
}
