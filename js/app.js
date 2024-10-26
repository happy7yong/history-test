const slider = document.getElementById('slider');
const navDots = document.getElementById('navDots');
const slides = document.querySelectorAll('.slide');
let isDragging = false;
let startX, currentTranslate = 0, prevTranslate = 0, currentIndex = 0;

// 동적으로 네비게이션 점 생성
function createNavDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('nav-dot');
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
    navDots.appendChild(dot);
  });
}
createNavDots();

const dots = document.querySelectorAll('.nav-dot');

// 마우스 드래그 이벤트
slider.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - slider.offsetLeft;
  slider.style.cursor = 'grabbing';
});

slider.addEventListener('mouseup', () => {
  isDragging = false;
  slider.style.cursor = 'grab';
  updateSlider();
});

slider.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const currentX = e.pageX - slider.offsetLeft;
  const deltaX = currentX - startX;
  slider.style.transform = `translateX(${prevTranslate + deltaX}px)`;
});

// 슬라이더 업데이트
function updateSlider() {
  currentTranslate = -currentIndex * slider.offsetWidth;
  prevTranslate = currentTranslate;
  slider.style.transform = `translateX(${currentTranslate}px)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}
