(function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  var ddItem = document.querySelector('.nav-item--dropdown');
  var ddToggle = ddItem ? ddItem.querySelector('.nav-dropdown-toggle') : null;

  function closeDropdown() {
    if (!ddItem) return;
    ddItem.classList.remove('is-open');
    if (ddToggle) ddToggle.setAttribute('aria-expanded', 'false');
  }

  function close() {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    closeDropdown();
  }
  function open() {
    links.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', function () {
    if (links.classList.contains('is-open')) close(); else open();
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('.nav-dropdown-toggle')) return;
    if (e.target.closest('a')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  document.addEventListener('click', function (e) {
    if (!links.classList.contains('is-open')) return;
    if (links.contains(e.target) || toggle.contains(e.target)) return;
    close();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) close();
  });

  if (ddItem && ddToggle) {
    ddToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = ddItem.classList.toggle('is-open');
      ddToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!ddItem.classList.contains('is-open')) return;
      if (ddItem.contains(e.target)) return;
      closeDropdown();
    });
  }
})();
