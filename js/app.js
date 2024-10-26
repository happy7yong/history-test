const historyData = [
  { month: 1, event: "신년 행사 개최신년 행사 개최신년 행사 개최신년 행사 개최신년 행사 개최신년 행사 개최신년 행사 개최신년 행사 개최신년 행사 개최신년 행사 개최신년 행사 개최신년 행사 개최신년 행사 개최신년 행사 개최" },
  { month: 2, event: "연구개발 센터 확장" },
  { month: 3, event: "봄 채용 박람회 참가" },
  { month: 4, event: "1분기 실적 발표" },
  { month: 5, event: "창립 20주년 기념 행사" },
  { month: 6, event: "환경 보호 캠페인 시작" },
  { month: 7, event: "글로벌 파트너십 체결" }
];

let currentSlide = 0;
let totalSlides = 0;

function createSlides() {
  const slidesWrapper = document.querySelector('.slides-wrapper');
  slidesWrapper.innerHTML = '';
  const slideHeight = document.querySelector('.slides-container').offsetHeight;
  let currentSlideContent = '';
  let currentSlideHeight = 0;
  totalSlides = 0;

  historyData.forEach((event, index) => {
    const itemContent = `
                    <div class="history-item">
                        <h3>2023년 ${event.month}월</h3>
                        <p>${event.event}</p>
                    </div>
                `;

    const tempElement = document.createElement('div');
    tempElement.innerHTML = itemContent;
    document.body.appendChild(tempElement);
    const itemHeight = tempElement.firstElementChild.offsetHeight;
    document.body.removeChild(tempElement);

    if (currentSlideHeight + itemHeight > slideHeight) {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.innerHTML = `<div class="history-grid">${currentSlideContent}</div>`;
      slidesWrapper.appendChild(slide);
      totalSlides++;

      currentSlideContent = itemContent;
      currentSlideHeight = itemHeight;
    } else {
      currentSlideContent += itemContent;
      currentSlideHeight += itemHeight;
    }

    if (index === historyData.length - 1) {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.innerHTML = `<div class="history-grid">${currentSlideContent}</div>`;
      slidesWrapper.appendChild(slide);
      totalSlides++;
    }
  });

  updateNavigation();
  updatePageInfo();
}

function updateNavigation() {
  const nav = document.querySelector('.navigation');
  nav.innerHTML = '';

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.className = `nav-dot ${i === currentSlide ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    nav.appendChild(dot);
  }
}

function updatePageInfo() {
  const pageInfo = document.querySelector('.page-info');
  pageInfo.textContent = `${currentSlide + 1} / ${totalSlides}`;
}

function goToSlide(index) {
  currentSlide = index;
  const slidesWrapper = document.querySelector('.slides-wrapper');
  slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateNavigation();
  updatePageInfo();
}

function setupDrag() {
  const slidesContainer = document.querySelector('.slides-container');
  let startX;
  let isDragging = false;

  slidesContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - slidesContainer.offsetLeft;
    slidesContainer.style.cursor = 'grabbing';
  });

  slidesContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slidesContainer.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 100) {
      if (walk > 0 && currentSlide > 0) {
        goToSlide(currentSlide - 1);
      } else if (walk < 0 && currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
      }
      isDragging = false;
    }
  });

  slidesContainer.addEventListener('mouseup', () => {
    isDragging = false;
    slidesContainer.style.cursor = 'grab';
  });

  slidesContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    slidesContainer.style.cursor = 'grab';
  });
}

window.addEventListener('load', () => {
  createSlides();
  setupDrag();
});

window.addEventListener('resize', createSlides);
