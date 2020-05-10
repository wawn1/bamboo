/*
lines : array
line :{
    txt: string,
    time: number,  // ms
}
*/

const timeExp = /\[(\d{2}):(\d{2})[\.\:](\d{2,3})\]/g;

const PAUSE = 0;
const PLAYING = 1;

export default class Lyric {
  constructor(lrc, handler) {
    this.lrc = lrc;
    this.handler = handler;
    this.lines = [];
    this.nextLineNum = 0;
    this.state = PAUSE;

    this.parse(lrc);
  }

  callHandler(i) {
    if (i < 0 || i >= this.lines.length) return;

    this.handler({
      playingLyric: this.lines[i].txt,
      currentLineNum: i,
    });
  }

  parse(lrc) {
    const lines = this.lrc.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let result = timeExp.exec(line);
      if (result) {
        const txt = line.replace(timeExp, "").trim();
        if (txt) {
          this.lines.push({
            time: result[1] * 60 * 1000 + result[2] * 1000 + result[3] * 1,
            txt,
          });
        }
      }
    }
    this.lines.sort((a, b) => {
      return a.time - b.time;
    });
  }

  findNextLineIndex(offset) {
    for (let i = 0; i < this.lines.length; i++) {
      if (offset <= this.lines[i].time) {
        return i;
      }
    }
    return this.lines.length - 1;
  }

  playRest(offset, isSeek = false) {
    clearTimeout(this.timer);

    let line = this.lines[this.nextLineNum];

    let delay;
    if (isSeek) {
      delay = line.time - offset;
    } else {
      let preTime = this.lines[this.nextLineNum - 1] ? this.lines[this.nextLineNum - 1].time : 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this.callHandler(this.nextLineNum);
      this.nextLineNum++;
      if (this.nextLineNum < this.lines.length && this.state === PLAYING) {
        this.playRest();
      }
    }, delay);
  }

  play(offset = 0, isSeek = false) {
    if (!this.lines.length) return;

    this.state = PLAYING;
    this.nextLineNum = this.findNextLineIndex(offset);
    this.callHandler(this.nextLineNum - 1);

    if (this.nextLineNum < this.lines.length) {
      this.playRest(offset, isSeek);
    }
  }

  pause() {
    this.state = PAUSE;
    clearTimeout(this.timer);
  }

  destory() {
    this.lrc = "";
    this.handler = null;
    this.lines = [];
    this.nextLineNum = 0;
    this.state = PAUSE;
    clearTimeout(this.timer);
  }

  seek(offset) {
    clearTimeout(this.timer);
    this.play(offset, true);
  }
}
