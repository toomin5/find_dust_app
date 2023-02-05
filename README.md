### 공공데이터 API를 이용한 미세먼지정보앱

###### JavaScript

---

GitHub.IO 주소 =>

1. url주소를 가져와<br>
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

2. displayChnage()함수는 fetch가 api를 로딩하기전까지 화면을 가렸다가 완료되면 보여주는 간단한 함수

   function displayChange() {
   $mainDiv.style.display = "block";
   $loadingDiv.style.display = "none";
   }

지역을 입력하고
