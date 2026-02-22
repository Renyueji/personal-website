// Simple i18n: loads translations, applies to data-i18n elements, stores preference
(function() {
  var LANG_KEY = 'lang';
  var translations = {};
  var currentLang = localStorage.getItem(LANG_KEY) || 'en';

  function getLang() { return currentLang; }

  function t(key) {
    var parts = key.split('.');
    var v = translations[currentLang];
    for (var i = 0; i < parts.length && v; i++) v = v[parts[i]];
    return v != null ? v : key;
  }

  function apply() {
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
      else if (el.getAttribute('data-i18n-html')) el.innerHTML = val;
      else el.textContent = val;
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'zh') return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    apply();
  }

  function init() {
    fetch('data/translations.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        translations = data;
        apply();
      })
      .catch(function() {});
  }

  window.i18n = { getLang: getLang, t: t, setLang: setLang };
  document.addEventListener('DOMContentLoaded', init);
})();
