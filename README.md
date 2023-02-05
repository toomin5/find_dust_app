*.md

### 공공데이터 API를 이용한 미세먼지정보앱

###### JavaScript

---

GitHub.IO 주소 =>

url주소를 가져와<br>
   fetch()함수를 이용해 fetch의 인자로 url을 넣어주고 res.json 메소드 사용 시<br>
   http응답 body텍스트를 JSON형식으로 바뀐 promise를 반환함, .then(res ⇒ res.json()) 이다

- fetch()는 원격api의 데이터를 가져올 때 사용함
- fetch()는 get방식이 기본값이므로 인자가 불필요함

    fetch(url)
      .then((res) => res.json())
      .then((myJson) => {
    //api로딩 대기화면 (api가 로딩 완료가 안되면 검색해도 결과가 안나와서 display:none사용) 가려준다
    displayChange();
    //서울시 40개 정보보기 console.log(info);
    const info = myJson["response"]["body"]["items"];

info를 콘솔로그로 찍어보면 서울시의40지역 array items가 들어있고 각 지역에대한 미세먼지 정보가 들어있음<br>
----
displayChnage()함수는 fetch가 api를 로딩하기전까지 화면을 가렸다가 완료되면 보여주는 간단한 함수

    function displayChange() {
    $mainDiv.style.display = "block";
    $loadingDiv.style.display = "none";
    }

지역을 입력하고 검색을 누르면 40개의 myJson["response"]["body"]["items"][i].stationName의 <br>
값들중맞는 단어가 있으면 그 단어의 pm10Value(미세먼지농도)와 dataTime(측정시간) 을 표시해줌

    $searchbtn.addEventListener("click", () => {
        //서울시의 40개 지역 array가 0~39
      for (let i = 0; i < 40; i++) {
         const match = myJson["response"]["body"]["items"][i];

        //사용자가 입력한 값$search == items.stationName의 값이 같은 지역의 정보
        if (match.stationName == $search.value) {
          $sidoNameH1.innerHTML = `${match.sidoName}시 ${match.stationName}`;
          $pm10ValueH1.innerText = `미세먼지농도:${match.pm10Value}`;
          $dataTimeH1.innerHTML = `측정시간:${match.dataTime}`;
        break;

미세먼지농도를 숫자로 표기하는데 숫자의 범위에따라 컬러를 줘서 보기쉽게함

    if (match.pm10Value > 0 && match.pm10Value <= 30) {
      $pm10ValueH1.style.color = "blue";
    } else if (match.pm10Value > 30 && match.pm10Value <= 80) {
      $pm10ValueH1.style.color = "green";
    } else if (match.pm10Value > 80 && match.pm10Value <= 150) {
      $pm10ValueH1.style.color = "orange";
    } else {
      $pm10ValueH1.style.color = "red";
    }

만약 그 입력한 값이 일치하는게 아예 없을 때

    else if (match.stationName != $search.value) {
      $sidoNameH1.innerHTML = "위치를 잘못 입력하셨습니다.";
      $pm10ValueH1.innerHTML = "";
      $dataTimeH1.innerHTML = "";
      $search.focus();
    }


----