import { fetchSanityData } from './sanity.js';

async function loadTheme() {
  const query = `*[_type == "siteSettings"][0]{
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor,
    textColor
  }`;

  try {
    const data = await fetchSanityData(query);

    console.log('THEME DATA:', data);

    if (!data) return;

    const root = document.documentElement;

    root.style.setProperty('--primary', data.primaryColor || '#d4af37');
    root.style.setProperty('--secondary', data.secondaryColor || '#111111');
    root.style.setProperty('--accent', data.accentColor || '#ffffff');
    root.style.setProperty('--background', data.backgroundColor || '#000000');
    root.style.setProperty('--text-color', data.textColor || '#ffffff');

    root.style.setProperty('--bs-primary', data.primaryColor || '#d4af37');
    root.style.setProperty('--bs-secondary', data.secondaryColor || '#111111');
  } catch (error) {
    console.error('Error loading theme settings:', error);
  }
}

loadTheme();