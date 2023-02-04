//미세먼지 데이터 api
const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=zD7CrcYQGzGEHaBFNWR0f3bvbmU%2Fr1J2OcoNG3dJMgyyet6xMyLyeogm5xrYGTxghMWupdjyPdblNmE%2Fzw24FA%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.0`;
/*fetch()이용하기
  함수는 첫번째 인자로 url, 두번째 인자로 옵션객체 받고, promise타입의 객체를 반환한다.
  promise = 기능을 수행 후 -> 정상작동 -> 성공메시지+결과값 or 문제+에러
*/

const $mainDiv = document.querySelector("#main");
const $loadingDiv = document.querySelector("#loading");
const $sidoNameH1 = document.querySelector("#sidoName");
const $stationNameH1 = document.querySelector("#stationName");
const $pm10ValueH1 = document.querySelector("#pm10Value");
const $dataTimeH1 = document.querySelector("#dataTime");
const $searchbtn = document.querySelector("#searchBtn");

const $search = document.querySelector("#search"); //시 입력

responseApi(); //서버
function responseApi() {
  fetch(url)
    .then((res) => res.json())
    .then((myJson) => {
      //api로딩 대기화면
      displayChange();

      //api json 더 추가해야해서 지우지않는 코드
      const info = myJson["response"]["body"]["items"];

      //검색버튼
      $searchbtn.addEventListener("click", () => {
        //서울시의 40개 지역 array가 0~39
        for (let i = 0; i < 40; i++) {
          const match = myJson["response"]["body"]["items"][i];

          //사용자가 입력한 값$search == items.stationName의 값이 같은 지역의 정보
          if (match.stationName == $search.value) {
            $sidoNameH1.innerHTML = `${match.sidoName}시`;
            $stationNameH1.innerHTML = match.stationName;
            $pm10ValueH1.innerHTML = `미세먼지농도:${match.pm10Value}`;
            $dataTimeH1.innerHTML = `측정시간:${match.dataTime}`;
            pm10ValueColor();
          }
        }
        //input태그 초기화
        $search.value = "";
      });
    });
}

function displayChange() {
  $mainDiv.style.display = "block";
  $loadingDiv.style.display = "none";
}

function pm10ValueColor() {
  switch (match.pm10Value) {
    case match.pm10Value <= 30:
      $pm10ValueH1.style.color = "blue";
      break;
    case match.pm10Value <= 80:
      $pm10ValueH1.style.color = "green";
      break;
    case match.pm10Value <= 150:
      $pm10ValueH1.style.color = "orange";
      break;
    case match.pm10Value > 151:
      $pm10ValueH1.style.color = "red";
      break;
  }
  console.log(parseInt(match.pm10Value));
}

//1.시, 구 입력하는 input값 받고
//2.버튼클릭하면 그의 맞는 시,구의 미세먼지 농도,측정시간 표시
//3.로그인기능이나, 실시간시계넣기

//console.log(myJson["response"]["body"]["items"][0].pm10Value, "pm"); //미세먼지농도
//console.log(myJson["response"]["body"]["items"][0].dataTime, "time"); //측정시간