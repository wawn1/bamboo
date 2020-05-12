import {getSongUrl, reqSongDetail, OK} from "../index";

export function getSongDetail(id) {
  return reqSongDetail(id);
}

export async function parseSongById(id) {
  console.log(id);
  const res = await getSongDetail(id);
  if (res.code !== OK) return;
  const song = res.songs[0];
  return {
    id: song.id,
    name: song.name,
    singer: song.ar.map((v) => v.name).join("/"),
    album: song.al.name,
    image: song.al.picUrl,
    url: getSongUrl(song.id),
    duration: song.dt,
  };
}
