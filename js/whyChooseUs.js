import { fetchSanityData, getImageUrl } from './sanity.js';

async function loadWhyChooseUs() {
  const query = `*[_type == "whyChooseUs"][0]{
    smallTitle,
    sectionTitle,
    sectionSubtitle,
    aboutImage{
      asset
    },
    reasons[]{
      title,
      description,
      icon
    }
  }`;

  try {
    const data = await fetchSanityData(query);

    if (!data) return;

    const smallTitleEl = document.getElementById('why-choose-us-small-title');
    const titleEl = document.getElementById('why-choose-us-title');
    const subtitleEl = document.getElementById('why-choose-us-subtitle');
    const container = document.getElementById('why-choose-us-container');
    const aboutImgEl = document.getElementById('why-choose-us-image');

    if (smallTitleEl) {
      smallTitleEl.textContent = data.smallTitle || 'Why Us?';
    }

    if (titleEl) {
      titleEl.textContent = data.sectionTitle || 'Why Choose Us';
    }

    if (subtitleEl) {
      subtitleEl.textContent = data.sectionSubtitle || '';
    }

    if (data.aboutImage && aboutImgEl) {
      const imageUrl = getImageUrl(data.aboutImage);
      if (imageUrl) {
        aboutImgEl.src = imageUrl;
      }
    }

    if (!container) return;

    container.innerHTML = '';

    data.reasons?.forEach((reason) => {
      const item = document.createElement('li');
      item.className = 'list-group-item bg-dark text-body border-secondary ps-0';

      item.innerHTML = `
        <i class="${reason.icon || 'fa fa-check-circle'} text-primary me-1"></i>
        ${reason.title || ''}
      `;

      container.appendChild(item);
    });
  } catch (error) {
    console.error('Error loading Why Choose Us:', error);
  }
}

loadWhyChooseUs();