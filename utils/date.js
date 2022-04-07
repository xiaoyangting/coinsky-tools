function conver(s) {
  return s < 10 ? '0' + s : s;
}
export function getDate(timetamp) {
  timetamp = typeof timetamp !== 'number' ? Number(timetamp) : timetamp
  timetamp = timetamp * 1000
  let myDate = new Date(timetamp); 
  let year = myDate.getFullYear();
  let month = myDate.getMonth() + 1;
  let date = myDate.getDate();
  let  h = myDate.getHours();
  let m = myDate.getMinutes();
  let s = myDate.getSeconds();
  let now = year + '-' + conver(month) + "-" + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
  return now
}

export function getTime(timetamp) {
  let myDate = new Date(timetamp); 
  let month = myDate.getMonth() + 1;
  let date = myDate.getDate();
  let  h = myDate.getHours();
  let m = myDate.getMinutes();
  let s = myDate.getSeconds();
  let now = conver(month) + "." + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
  return now
}