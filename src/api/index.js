import ajax from "./ajax";

// 请求轮播图
export const reqBanner = () => ajax("/banner");
// 请求推荐列表
export const reqRecommendList = () => ajax("/personalized?limit=51");
// 请求热门歌手列表
export const reqHotSinger = () => ajax("/top/artists?offset=0&limit=100");
// 请求歌手热门50首歌曲
export const reqTop50Songs = (id) => ajax(`/artist/top/song?id=${id}`);
//拼接出歌曲的url链接
export const getSongUrl = (id) => `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
// 请求歌曲详情
export const reqSongDetail = (id) => ajax(`/song/detail?ids=${id}`);
// 请求歌词
export const reqLyric = (id) => ajax(`/lyric?id=${id}`);
// 搜索结果
export const reqResultSongs = (query) => ajax(`/search?keywords=${query}`);
// 搜索热词
export const reqHotKeyWords = () => ajax("/search/hot");
// 搜索建议列表
export const reqSuggestList = (query) => ajax(`/search/suggest?keywords=${query}`);
export const OK = 200;
