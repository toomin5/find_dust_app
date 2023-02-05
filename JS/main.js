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
      //api로딩 대기화면 (api가 로딩 완료가 안되면 검색해도 결과가 안나와서 display:none사용) 가려준다
      displayChange();

      //서울시 40개 정보보기 console.log(info);
      const info = myJson["response"]["body"]["items"];

      //검색버튼
      $searchbtn.addEventListener("click", () => {
        //서울시의 40개 지역 array가 0~39
        for (let i = 0; i < 40; i++) {
          const match = myJson["response"]["body"]["items"][i];

          //사용자가 입력한 값$search == items.stationName의 값이 같은 지역의 정보
          if (match.stationName == $search.value) {
            $sidoNameH1.innerHTML = `${match.sidoName}시 ${match.stationName}`;
            $pm10ValueH1.innerText = `미세먼지농도:${match.pm10Value}`;
            $dataTimeH1.innerHTML = `측정시간:${match.dataTime}`;

            //미세먼지 농도에 따라 h1 컬러변경
            if (match.pm10Value > 0 && match.pm10Value <= 30) {
              $pm10ValueH1.style.color = "blue";
            } else if (match.pm10Value > 30 && match.pm10Value <= 80) {
              $pm10ValueH1.style.color = "green";
            } else if (match.pm10Value > 80 && match.pm10Value <= 150) {
              $pm10ValueH1.style.color = "orange";
            } else {
              $pm10ValueH1.style.color = "red";
            }

            break;
            //40기의 값과 맞지 않는 값을 입력한 경우
          } else if (match.stationName != $search.value) {
            $sidoNameH1.innerHTML = "위치를 잘못 입력하셨습니다.";
            $pm10ValueH1.innerHTML = "";
            $dataTimeH1.innerHTML = "";
            $search.focus();
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

//1.시, 구 입력하는 input값 받고(미완)
//2.버튼클릭하면 그의 맞는 시,구의 미세먼지 농도,측정시간 표시
//3.로그인기능이나, 실시간시계넣기

//console.log(myJson["response"]["body"]["items"][0].pm10Value, "pm"); //미세먼지농도
//console.log(myJson["response"]["body"]["items"][0].dataTime, "time"); //측정시간
