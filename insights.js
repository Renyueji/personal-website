// Load insights (essays and reports) from data/insights.json
function getLang() {
  return (window.i18n && window.i18n.getLang()) ? window.i18n.getLang() : 'en';
}

async function loadInsights() {
  try {
    var res = await fetch('data/insights.json');
    if (res.ok) {
      var data = await res.json();
      renderInsights(data.insights || []);
    }
  } catch (e) {}
}

function renderInsights(insights) {
  var container = document.getElementById('insights-container');
  if (!container || !insights.length) return;

  var lang = getLang();

  container.innerHTML = insights
    .map(function(i) {
      var title = (lang === 'zh' && i.title_zh) ? i.title_zh : i.title;
      var summary = (lang === 'zh' && i.summary_zh) ? i.summary_zh : (i.summary || '');
      var url = i.url || '';
      var titleEl = url ? '<a href="' + url + '" target="_blank" rel="noopener">' + title + '</a>' : '<span>' + title + '</span>';
      var meta = i.date ? '<div class="meta">' + i.date + '</div>' : '';

      return '<div class="insight-card">' +
        '<h3>' + titleEl + '</h3>' +
        meta +
        '<p>' + summary + '</p>' +
        '</div>';
    })
    .join('');
}

function init() {
  loadInsights();
  document.addEventListener('langchange', function() { loadInsights(); });
}

document.addEventListener('DOMContentLoaded', init);
