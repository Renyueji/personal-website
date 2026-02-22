// Load publications from data/publications.json
function getLang() {
  return (window.i18n && window.i18n.getLang()) ? window.i18n.getLang() : 'en';
}

async function loadPublications() {
  try {
    var res = await fetch('data/publications.json');
    if (res.ok) {
      var data = await res.json();
      renderPublications(data.publications || []);
    }
  } catch (e) {}
}

function renderPublications(publications) {
  var container = document.getElementById('publications-container');
  if (!container || !publications.length) return;

  var lang = getLang();
  var pdfLabel = lang === 'zh' ? '[PDF]' : '[PDF]';

  container.innerHTML = publications
    .map(function(p) {
      var title = (lang === 'zh' && p.title_zh) ? p.title_zh : p.title;
      var summary = (lang === 'zh' && p.summary_zh) ? p.summary_zh : p.summary;
      var venue = (lang === 'zh' && p.venue_zh) ? p.venue_zh : (p.venue || p.journal || '');
      var authors = Array.isArray(p.authors) ? p.authors.join(', ') : (p.authors || '');
      var year = p.year || '';
      var meta = [venue, year].filter(Boolean).join(', ');
      var url = p.url || (p.doi ? 'https://doi.org/' + p.doi : '');
      var titleEl = url ? '<a href="' + url + '" target="_blank" rel="noopener">' + title + '</a>' : title;
      var pdfLink = p.pdf ? '<a href="' + p.pdf + '" target="_blank" rel="noopener" class="pdf-link">' + pdfLabel + '</a>' : '';
      var summaryEl = summary ? '<p class="publication-summary">' + summary + '</p>' : '';

      return '<div class="publication-item">' +
        '<div class="publication-title">' + titleEl + ' ' + pdfLink + '</div>' +
        (authors ? '<div class="publication-meta">' + authors + '</div>' : '') +
        (meta ? '<div class="publication-meta">' + meta + '</div>' : '') +
        summaryEl +
        '</div>';
    })
    .join('');
}

function init() {
  loadPublications();
  document.addEventListener('langchange', function() { loadPublications(); });
}

document.addEventListener('DOMContentLoaded', init);
