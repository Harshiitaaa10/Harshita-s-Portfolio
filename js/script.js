(function () {
  var root = document.documentElement;

  // Dark / light toggle
  document.getElementById('theme').addEventListener('click', function () {
    var dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme:dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
  });

  // Mobile menu
  var links = document.getElementById('links');
  document.getElementById('menu').addEventListener('click', function () {
    links.classList.toggle('open');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });

  // Project filters
  var buttons = document.querySelectorAll('.f');
  var cards = document.querySelectorAll('#pgrid .card');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      buttons.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      var f = b.dataset.f;
      cards.forEach(function (c) {
        c.hidden = !(f === 'all' || c.dataset.c.split(' ').indexOf(f) > -1);
      });
    });
  });

  // Copy buttons
  document.querySelectorAll('.copy[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.dataset.copy;
      function done() {
        b.textContent = 'Copied';
        b.classList.add('ok');
        setTimeout(function () { b.textContent = 'Copy'; b.classList.remove('ok'); }, 1600);
      }
      function fallback() {
        var a = document.createElement('textarea');
        a.value = t;
        document.body.appendChild(a);
        a.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(a);
        done();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).then(done, fallback);
      } else { fallback(); }
    });
  });

  // Highlight current section in navbar
  var ids = ['overview', 'projects', 'experience', 'skills', 'education', 'contact'];
  var secs = ids.map(function (i) { return document.getElementById(i); });
  var anchors = links.querySelectorAll('a');
  function spy() {
    var y = window.scrollY + 120, cur = 0;
    secs.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
    anchors.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();
})();
