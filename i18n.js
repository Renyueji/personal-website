// i18n: loads translations, applies to data-i18n elements
(function() {
  var LANG_KEY = 'lang';
  var currentLang = localStorage.getItem(LANG_KEY) || 'en';

  // Inline translations to avoid encoding issues with fetch
  var translations = {
    en: {
      "nav.home": "Home", "nav.research": "Research", "nav.publications": "Publications",
      "nav.insights": "Insights", "nav.about": "About", "nav.viewPhoto": "View photo (PDF)",
      "home.tagline": "Researcher | Environmental & Earth Sciences",
      "home.heroSub": "Coal geology, environmental health, lung cancer epidemiology in Xuan Wei, China · Green hydrogen and CCUS",
      "home.welcome": "Welcome",
      "home.intro1": "I am a researcher at The University of Hong Kong, working at the intersection of Earth sciences, environmental health, and energy transitions. My work spans from understanding how minerals in coal affect human health—especially in Xuan Wei, Yunnan—to designing pathways for green hydrogen and carbon capture.",
      "home.intro2": "Explore my", "home.intro2.research": "research", "home.intro2.publications": "publications",
      "home.intro2.insights": "insights", "home.intro2.and": "and", "home.intro2.about": "about", "home.intro2.more": "pages for more.",
      "research.title": "Research", "research.subtitle": "Coal mineralogy, environmental health, energy transitions",
      "research.overview": "Overview",
      "research.overviewText": "I research coal mineralogy, environmental health, and lung cancer epidemiology—particularly in Xuan Wei, Yunnan, where high lung cancer rates are linked to Fe-rich chamosite in domestic coal combustion. I also work on energy decarbonization, including green hydrogen and CCUS via cement-methanol co-production.",
      "research.coal": "Coal & Mineralogy",
      "research.coalText": "My work on Late Permian coals examines the occurrence and origin of chamosite, berthierine, and quartz. In Xuan Wei coal, these authigenic minerals—especially Fe-rich chamosite—are released during indoor combustion and implicated in carcinogenic pathways.",
      "research.health": "Environmental Health",
      "research.healthText": "Xuan Wei County has among the highest lung cancer mortality rates in China. I trace the link between mineral particles in coal and oxidative stress and malignant transformation in bronchial epithelial cells, bridging geology and environmental health.",
      "research.energy": "Energy Transitions",
      "research.energyText": "I collaborate on pathways to scale green hydrogen and carbon capture, utilization, and storage (CCUS) in China, including integrated cement-methanol co-production to reduce fossil fuel reliance and emissions.",
      "publications.title": "Publications", "publications.subtitle": "View my work on", "publications.loading": "Loading publications…",
      "insights.title": "Insights", "insights.subtitle": "Essays, reports, and reflections on research and environmental issues.",
      "insights.placeholderTitle": "Add your essays and reports", "insights.placeholderMeta": "Add entries to data/insights.json",
      "insights.placeholderText": "Place your essays, reports, and reflections here. Edit", "insights.placeholderCode": "data/insights.json",
      "insights.placeholderText2": "to add items with title, date, summary, and link.",
      "about.title": "About", "about.subtitle": "My background and research journey",
      "about.para1": "My research journey sits at the intersection of Earth sciences, environmental health, and energy transitions—shaped by a simple question: how do the materials beneath our feet shape human health and the future of our planet?",
      "about.para2": "I began in coal geology and mineralogy, drawn to the Late Permian coals of Yunnan. That work led me to",
      "about.para2XuanWei": "Xuan Wei",
      "about.para2rest": ", a county with among the highest lung cancer rates in China, especially among women who burn local coal indoors. There, I traced the link between Fe-rich chamosite and berthierine in the coal and carcinogenic mineral particles released during combustion—nanometer-sized particles that trigger oxidative stress and malignant transformation. Understanding that chain drove home how deeply geology and human health are intertwined.",
      "about.para3": "Today, I'm based at", "about.para3HKU": "The University of Hong Kong",
      "about.para3rest": ", where my work has expanded to designing solutions: pathways to scale green hydrogen and CCUS in China, including integrated cement-methanol co-production. For more details, see my",
      "about.para3CV": "CV", "about.para3dot": ".",
      "about.coal": "Coal & Mineralogy", "about.coalDesc": "Late Permian coals, chamosite, berthierine, authigenic minerals",
      "about.health": "Environmental Health", "about.healthDesc": "Xuan Wei lung cancer, indoor combustion, oxidative stress",
      "about.energy": "Energy Transitions", "about.energyDesc": "Green hydrogen, CCUS, cement-methanol co-production",
      "about.path": "Path", "about.path1": "Earth sciences & coal mineralogy",
      "about.path2": "Xuan Wei: linking minerals to lung cancer", "about.path3": "Decarbonization & green energy pathways",
      "footer.copyright": "© 2025 Renyue Ji", "lang.en": "EN", "lang.zh": "中文"
    },
    zh: {
      "nav.home": "首页", "nav.research": "研究", "nav.publications": "论文",
      "nav.insights": "随笔", "nav.about": "关于", "nav.viewPhoto": "查看照片（PDF）",
      "home.tagline": "研究员 | 环境与地球科学",
      "home.heroSub": "煤地质学、环境健康、宣威肺癌流行病学 · 绿氢与CCUS",
      "home.welcome": "欢迎",
      "home.intro1": "我是香港大学的一名研究员，工作聚焦于地球科学、环境健康与能源转型的交叉领域。研究从理解煤炭中的矿物如何影响人类健康——尤其是云南宣威——到设计绿氢与碳捕集利用的路径。",
      "home.intro2": "欢迎浏览我的", "home.intro2.research": "研究", "home.intro2.publications": "论文",
      "home.intro2.insights": "随笔", "home.intro2.and": "与", "home.intro2.about": "关于", "home.intro2.more": "页面了解更多。",
      "research.title": "研究", "research.subtitle": "煤矿物学、环境健康、能源转型",
      "research.overview": "概述",
      "research.overviewText": "我研究煤矿物学、环境健康与肺癌流行病学——尤其是云南宣威地区，该地区肺癌发病率高与家用燃煤中的富铁鲕绿泥石相关。同时致力于能源脱碳，包括绿氢与水泥-甲醇联产的碳捕集利用与封存（CCUS）。",
      "research.coal": "煤与矿物学",
      "research.coalText": "我对晚二叠世煤的研究探讨鲕绿泥石、鳞绿泥石与石英的赋存与成因。宣威煤中的这些自生矿物——尤其是富铁鲕绿泥石——在室内燃烧时释放，并与致癌途径相关。",
      "research.health": "环境健康",
      "research.healthText": "宣威县是中国肺癌死亡率最高的地区之一。我追踪煤中矿物颗粒与氧化应激、支气管上皮细胞恶性转化之间的联系，贯通地质学与环境健康。",
      "research.energy": "能源转型",
      "research.energyText": "我参与设计中国绿氢与碳捕集利用封存（CCUS）的规模化路径，包括水泥-甲醇联产以降低化石燃料依赖和排放。",
      "publications.title": "论文", "publications.subtitle": "在", "publications.loading": "加载论文中…",
      "insights.title": "随笔", "insights.subtitle": "关于研究与环境议题的随笔、报告与思考。",
      "insights.placeholderTitle": "添加您的随笔与报告", "insights.placeholderMeta": "在 data/insights.json 中添加条目",
      "insights.placeholderText": "在此放置您的随笔、报告与思考。编辑", "insights.placeholderCode": "data/insights.json",
      "insights.placeholderText2": "以添加标题、日期、摘要和链接。",
      "about.title": "关于", "about.subtitle": "我的背景与研究历程",
      "about.para1": "我的研究历程处于地球科学、环境健康与能源转型的交叉点——由一个简单的问题驱动：脚下的物质如何影响人类健康与地球的未来？",
      "about.para2": "我从煤地质学与矿物学起步，被云南的晚二叠世煤所吸引。这项工作将我带到",
      "about.para2XuanWei": "宣威",
      "about.para2rest": "——中国肺癌率最高的县之一，尤其以在室内燃煤的女性为著。在那里，我追踪了煤中富铁鲕绿泥石与鳞绿泥石与燃烧时释放的致癌矿物颗粒之间的联系——纳米级颗粒引发氧化应激与恶性转化。理解这一链条让我深刻认识到地质学与人类健康如何紧密交织。",
      "about.para3": "如今，我任职于", "about.para3HKU": "香港大学",
      "about.para3rest": "，工作扩展至设计解决方案：在中国规模化绿氢与CCUS的路径，包括水泥-甲醇联产。更多详情请参阅我的",
      "about.para3CV": "简历", "about.para3dot": "。",
      "about.coal": "煤与矿物学", "about.coalDesc": "晚二叠世煤，鲕绿泥石，鳞绿泥石，自生矿物",
      "about.health": "环境健康", "about.healthDesc": "宣威肺癌，室内燃煤，氧化应激",
      "about.energy": "能源转型", "about.energyDesc": "绿氢，CCUS，水泥-甲醇联产",
      "about.path": "历程", "about.path1": "地球科学与煤矿物学",
      "about.path2": "宣威：矿物与肺癌的联系", "about.path3": "脱碳与绿色能源路径",
      "footer.copyright": "© 2025 季仁越", "lang.en": "EN", "lang.zh": "中文"
    }
  };

  function getLang() { return currentLang; }

  function t(key) {
    var parts = key.split('.');
    var v = translations[currentLang];
    for (var i = 0; i < parts.length && v; i++) v = v[parts[i]];
    return (v != null && typeof v === 'string') ? v : null;
  }

  function apply() {
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (!val) return;
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

  window.i18n = { getLang: getLang, t: t, setLang: setLang };
  document.addEventListener('DOMContentLoaded', apply);
})();
