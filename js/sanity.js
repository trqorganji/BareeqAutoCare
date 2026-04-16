const projectId = 'dw1988l9';
const dataset = 'production';
const apiVersion = '2024-10-01';

export async function fetchSanityData(query) {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.result;
}

export function getImageUrl(imageRef) {
  if (!imageRef || !imageRef.asset || !imageRef.asset._ref) return '';

  const ref = imageRef.asset._ref;
  const parts = ref.split('-');
  const id = parts[1];
  const dimensions = parts[2];
  const format = parts[3];

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}