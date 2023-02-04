const clock = document.querySelector("#clock");

function getClock() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerHTML = `지금은 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초 입니다.`;
}
getClock();
setInterval(getClock, 1000);
