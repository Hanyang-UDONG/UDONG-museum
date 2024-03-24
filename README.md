<h1>
사진작가·그림작가를 위한 사진 관리 및 온라인 전시회 사이트<br/>
Managing Pictures and Online Exhibition Site for Photographers and Painting Artists
</h1>
<br/>
<p>
  🎨 Project Name: UDONG EDONG(우동이동)<br/>

  📆 Project Period: 2022.11.15 ~ 2022.12.31<br/>

  👩🏻‍🤝‍🧑🏻 Member: <br/>
  
  <a href="https://github.com/menuin">김은민</a> : Frontend <br/>
  <a href="https://github.com/parkjineon">박진언</a> : Backend 
  
</p>

<hr/>

<h2>📃 Description</h2>
<p>
UDONG EDONG(우동이동)은 우리동네 이웃동네의 약칭이다. <br/><br/>
사진 찍거나 그림을 그린 후 실물로 직접 관리하는 것은 상당히 까다로우며 접근성도 좋지 못하다. 게다가, 사진이나 그림을 취미로 하거나 소규모 전시회를 열고 싶은 작가들에겐 오프라인 전시회가 부담스러울 수 있다. 이러한 부분을 해결하기 위해, 온라인 전시회를 열 수 있는 장을 제공하여 대중들에겐 사진이나 그림에 대한 접근성을 높이고, 작가들에게는 금전적 부담을 덜어준다. 공간적/시간적 제약을 가지고 있는 오프라인 전시회의 한계를 보완해준다는 장점도 가지고 있다.<br/>
<br/>
주 사용자는 사진 작가나 그림 작가를 타깃으로 한다. 사용자가 찍은 사진이나 그린 그림을 개인 계정에 업로드 한 후 제목과 날짜, 설명 등의 정보와 함께 관리할 수 있다. 계정에 올라온 이미지 파일를 선택하고 위치와 기간, 제목 등의 정보를 작성한 뒤 온라인 전시회를 개최할 수 있다. 랜딩페이지에 있는 지도나 계정 팔로우를 통해 개최한 전시회에 접근할 수 있다.
</p>

<h2>💻 Tech </h2>

- Frontend : ````React````<br/>
- State Management : ````Redux````<br/>
- Backend : ````Exoress````<br/>
- Database : ````MongoDB````<br/>
- Image Storage : ````AWS S3````<br/>

<h2>⚙ Installation </h2>


<h2>🖼 Screen Shots</h2>
<h3>메인 페이지</h3>

- Kakao Map API 사용
- 사용자의 현재 위치 주변에 있는 전시회들을 지도 위 마커와 리스트에 표시한다<br/>
- 지도 확대/축소는 불가, 지도 상 위치가 변하면 해당 범위 내 전시회들을 다시 검색해 KakaoMap 컴포넌트 다시 렌더

<img src="https://user-images.githubusercontent.com/63971484/228744695-74e41336-2c9e-41eb-abd6-0cfdb397871e.gif">
<br/>
<h3>유저 프로필 페이지</h3>

- 현재 유저가 오픈하고 있는 전시회 배너
- 전시중인 작품은 <전시중> 표시, 현재 전시중인 작품은 해당 작품을 소유하는 유저 외에는 자세히 보기는 불가능함 (전시장에서 확인 가능)

<img src="https://user-images.githubusercontent.com/63971484/228746478-7bc9b1b2-d71e-4a23-8484-b33cb02a0449.gif">
<br />
<h3>새로운 전시회 열기</h3>

- 전시회 제목/설명, 위치, 기간, 전시할 작품 선택
- 이미 기존 전시회에 포함된 작품은 새로운 전시회에 전시할 수 없음

<img src="https://user-images.githubusercontent.com/63971484/228747226-fa27e0d1-3ba7-4303-93ea-2e5b0e562d51.gif">

<h3>전시회장</h3>

- Three.js 사용 3D 개체 생성 - 원통형 기둥, 사진, 제목 등
<img src="https://user-images.githubusercontent.com/63971484/228756061-942e85e5-9c56-4f59-8a3e-e4053b0bfb71.gif">
