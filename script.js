// Load publications from data/publications.json if available
async function loadPublications() {
  try {
    const res = await fetch('data/publications.json');
    if (res.ok) {
      const data = await res.json();
      renderPublications(data.publications || []);
    }
  } catch {
    // File not found or invalid - leave placeholder
  }
}

function renderPublications(publications) {
  const container = document.getElementById('publications-container');
  if (!container || !publications.length) return;

  container.innerHTML = publications
    .map((p) => {
      const authors = Array.isArray(p.authors) ? p.authors.join(', ') : (p.authors || '');
      const venue = p.venue || p.journal || '';
      const year = p.year || '';
      const meta = [venue, year].filter(Boolean).join(', ');
      const url = p.url || (p.doi ? `https://doi.org/${p.doi}` : '');
      const titleEl = url ? `<a href="${url}" target="_blank" rel="noopener">${p.title}</a>` : p.title;
      const pdfLink = p.pdf ? `<a href="${p.pdf}" target="_blank" rel="noopener" class="pdf-link">[PDF]</a>` : '';
      const summary = p.summary ? `<p class="publication-summary">${p.summary}</p>` : '';

      return `
        <div class="publication-item">
          <div class="publication-title">${titleEl} ${pdfLink}</div>
          ${authors ? `<div class="publication-meta">${authors}</div>` : ''}
          ${meta ? `<div class="publication-meta">${meta}</div>` : ''}
          ${summary}
        </div>
      `;
    })
    .join('');
}

document.addEventListener('DOMContentLoaded', loadPublications);
