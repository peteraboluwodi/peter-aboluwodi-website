(function () {
  var STORAGE_KEY = 'theme';
  var buttons = document.querySelectorAll('.theme-btn');
  if (!buttons.length) return;

  var mql = window.matchMedia('(prefers-color-scheme: dark)');

  function getPreference() {
    try { return localStorage.getItem(STORAGE_KEY) || 'system'; } catch (e) { return 'system'; }
  }

  function resolve(pref) {
    return pref === 'system' ? (mql.matches ? 'dark' : 'light') : pref;
  }

  function applyTheme(pref) {
    document.documentElement.dataset.theme = resolve(pref);
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.themeChoice === pref ? 'true' : 'false');
    });
  }

  function setPreference(pref) {
    try { localStorage.setItem(STORAGE_KEY, pref); } catch (e) {}
    applyTheme(pref);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () { setPreference(btn.dataset.themeChoice); });
  });

  mql.addEventListener('change', function () {
    if (getPreference() === 'system') applyTheme('system');
  });

  applyTheme(getPreference());
})();
