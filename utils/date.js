function conver(s) {
  return s < 10 ? '0' + s : s;
}

// 时间戳转换
export const getTime = (timetamp) => {
  let myDate = new Date(timetamp);
  let month = myDate.getMonth() + 1;
  let date = myDate.getDate();
  let h = myDate.getHours();
  let m = myDate.getMinutes();
  let s = myDate.getSeconds();
  let now = conver(month) + "." + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
  return now
}