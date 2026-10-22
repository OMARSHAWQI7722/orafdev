/* Runs before first paint: applies the saved theme and language so the page never flashes the wrong one. */
(function () {
  var d = document.documentElement, theme = null, lang = null;
  try { theme = localStorage.getItem('orafdev-theme'); lang = localStorage.getItem('orafdev-lang'); } catch (e) {}
  d.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
  if (lang === 'ar') {
    d.lang = 'ar'; d.dir = 'rtl';
    d.classList.add('i18n-pending');
    setTimeout(function () { d.classList.remove('i18n-pending'); }, 1500);
  }
})();
