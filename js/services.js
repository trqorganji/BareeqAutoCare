console.log('services.js loaded');
import { fetchSanityData, getImageUrl } from './sanity.js';

async function loadServices() {
  const query = `*[_type == "services"][0]{
    sectionTitle,
    servicesList[]{
      title,
      description,
      price,
      image{
        asset
      }
    }
  }`;

  try {
    const data = await fetchSanityData(query);

    console.log('SANITY SERVICES DATA:', data);
    console.log('TITLE ELEMENT:', document.getElementById('services-section-title'));
    console.log('CONTAINER ELEMENT:', document.getElementById('services-container'));

    if (!data) return;

    const titleEl = document.getElementById('services-section-title');
    const container = document.getElementById('services-container');

    if (titleEl) {
      titleEl.textContent = data.sectionTitle || 'Our Services';
    }

    if (!container) return;

    container.innerHTML = '';

    data.servicesList.forEach((service, index) => {
      const imageUrl = service.image ? getImageUrl(service.image) : '';
      const isLeft = index % 2 === 0;

      const html = `
        <div class="service-item ${isLeft ? 'service-item-left' : 'service-item-right'}"
             data-aos="${isLeft ? 'fade-right' : 'fade-left'}"
             data-aos-delay="${index * 150}"
             data-aos-duration="1000">

          <div class="row g-0 align-items-center">

            <div class="col-md-5 ${!isLeft ? 'order-md-1 text-md-end' : ''}">
              <div class="service-img p-5"
                   data-aos="zoom-in"
                   data-aos-delay="${index * 150 + 100}">
                ${imageUrl ? `
                  <div class="service-circle-frame">
                    <img class="service-circle-img ${service.title ? service.title.toLowerCase().replace(/\s+/g, '-') : ''}"
                         src="${imageUrl}" alt="${service.title || ''}">
                  </div>
                ` : ''}
              </div>
            </div>

            <div class="col-md-7">
              <div class="service-text px-5 px-md-0 py-md-5 ${!isLeft ? 'text-md-end' : ''}"
                   data-aos="fade-up"
                   data-aos-delay="${index * 150 + 200}">
                <h3 class="text-uppercase">${service.title || ''}</h3>
                ${service.price ? `<p class="mb-2 text-primary fw-bold">Starting from SAR ${service.price}</p>` : ''}
                <p class="mb-4">${service.description || ''}</p>
              </div>
            </div>

          </div>
        </div>
      `;

      container.innerHTML += html;
    });

    // ✅ IMPORTANT: refresh AOS after dynamic content
    if (window.AOS) {
      AOS.refresh();
    }

  } catch (error) {
    console.error('Error loading services:', error);
  }
}

loadServices();