// Load insights (essays and reports) from data/insights.json
async function loadInsights() {
  try {
    const res = await fetch('data/insights.json');
    if (res.ok) {
      const data = await res.json();
      renderInsights(data.insights || []);
    }
  } catch {
    // File not found or invalid – keep placeholder
  }
}

function renderInsights(insights) {
  const container = document.getElementById('insights-container');
  if (!container || !insights.length) return;

  container.innerHTML = insights
    .map((i) => {
      const url = i.url || '';
      const title = url ? `<a href="${url}" target="_blank" rel="noopener">${i.title}</a>` : `<span>${i.title}</span>`;
      const meta = i.date ? `<div class="meta">${i.date}</div>` : '';

      return `
        <div class="insight-card">
          <h3>${title}</h3>
          ${meta}
          <p>${i.summary || ''}</p>
        </div>
      `;
    })
    .join('');
}

document.addEventListener('DOMContentLoaded', loadInsights);
