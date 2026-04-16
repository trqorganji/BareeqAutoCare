import { fetchSanityData } from './sanity.js';

async function loadContact() {
  const query = `*[_type == "contact"][0]{
    phone,
    location,
    locationLink,
    instagram,
    footerText,
    bookingLink
  }`;

  try {
    const data = await fetchSanityData(query);
    if (!data) return;

    const phoneEl = document.getElementById('contact-phone');
    const locationEl = document.getElementById('contact-location');
    const instagramEl = document.getElementById('contact-instagram');
    const footerTextEl = document.getElementById('footer-text');
    const bookingBtn = document.getElementById('booking-btn');

    if (phoneEl) {
      const phoneText = data.phone || '+966 58 366 6993';
      phoneEl.textContent = phoneText;
      phoneEl.href = `https://wa.me/${(data.phone || '').replace(/\D/g, '')}`;
    }

    if (locationEl) {
      locationEl.textContent = data.location || 'Jeddah, Saudi Arabia';
      locationEl.href = data.locationLink || '#';
    }

    if (instagramEl) {
      instagramEl.href = data.instagram || '#';
    }

    if (footerTextEl) {
      footerTextEl.textContent = data.footerText || 'Premium auto care, detailing, and protection in Jeddah.';
    }

    if (bookingBtn) {
      bookingBtn.href = data.bookingLink || '#';
    }

  } catch (error) {
    console.error('Error loading contact:', error);
  }
}

loadContact();