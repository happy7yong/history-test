document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector('.slider');
  const navigation = document.querySelector('.navigation');
  const slides = slider.querySelectorAll('.slide');
  const slideCount = slides.length;

  // 슬라이드 갯수에 따라 네비게이션 버튼 생성
  for (let i = 0; i < slideCount; i++) {
    const navBtn = document.createElement('div');
    navBtn.classList.add('nav-btn');
    if (i === 0) navBtn.classList.add('active'); // 첫번째 버튼 활성화
    navBtn.addEventListener('click', () => {
      slider.scrollTo({
        left: i * slider.clientWidth,
        behavior: 'smooth'
      });
      updateNavigation(i);
    });
    navigation.appendChild(navBtn);
  }

  // 네비게이션 상태 업데이트
  function updateNavigation(activeIndex) {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach((btn, index) => {
      btn.classList.toggle('active', index === activeIndex);
    });
  }
});
