import { fetchSanityData, getImageUrl } from './sanity.js';

async function loadHero() {
  const query = `*[_type == "hero"][0]{
    slides[]{
      smallTitle,
      title,
      subtitle,
      backgroundImage{
        asset
      }
    }
  }`;

  try {
    const hero = await fetchSanityData(query);

    if (!hero || !hero.slides || !hero.slides.length) return;

    const carouselInner = document.querySelector('#header-carousel .carousel-inner');
    if (!carouselInner) return;

    carouselInner.innerHTML = '';

    hero.slides.forEach((slide, index) => {
      const imageUrl = slide.backgroundImage ? getImageUrl(slide.backgroundImage) : '';

      const slideItem = document.createElement('div');
      slideItem.className = `carousel-item${index === 0 ? ' active' : ''}`;

      slideItem.innerHTML = `
        <img class="w-100" src="${imageUrl}" alt="${slide.title || 'Hero Image'}">
        <div ${index === 0 ? 'id="home"' : ''} class="carousel-caption d-flex flex-column align-items-center justify-content-center">
          <div class="title mx-5 px-5 animated slideInDown">
            <div class="title-center">
              <h5>${slide.smallTitle || ''}</h5>
              <h1 class="display-1">${slide.title || ''}</h1>
            </div>
          </div>
          <p class="fs-5 mb-5 animated slideInDown">
            ${slide.subtitle || ''}
          </p>
        </div>
      `;

      carouselInner.appendChild(slideItem);
    });
  } catch (error) {
    console.error('Error loading hero:', error);
  }
}

loadHero();