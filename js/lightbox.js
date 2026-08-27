// Lightbox: Bild anklicken zum Vergroessern, blaettern mit Pfeilen
(function () {
  var bilder = Array.prototype.slice.call(
    document.querySelectorAll('.galerie img, main figure img'));
  if (!bilder.length) return;

  var aktuell = 0;
  var lb = null;

  function zeigen(i) {
    aktuell = (i + bilder.length) % bilder.length;
    var img = lb.querySelector('img');
    img.src = bilder[aktuell].src;
    img.alt = bilder[aktuell].alt || '';
    lb.querySelector('.lb-num').textContent =
      bilder.length > 1 ? (aktuell + 1) + ' / ' + bilder.length : '';
  }

  function schliessen() {
    if (!lb) return;
    document.body.removeChild(lb);
    lb = null;
    document.removeEventListener('keydown', tasten);
  }

  function tasten(e) {
    if (e.key === 'Escape') schliessen();
    else if (e.key === 'ArrowRight') zeigen(aktuell + 1);
    else if (e.key === 'ArrowLeft') zeigen(aktuell - 1);
  }

  function oeffnen(i) {
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.innerHTML = '<img alt="">' +
      (bilder.length > 1
        ? '<button class="lb-prev" aria-label="Vorheriges Bild">\u2039</button>' +
          '<button class="lb-next" aria-label="N\u00e4chstes Bild">\u203a</button>'
        : '') +
      '<button class="lb-close" aria-label="Schliessen">\u00d7</button>' +
      '<div class="lb-num"></div>';
    document.body.appendChild(lb);
    lb.addEventListener('click', function (e) {
      if (e.target.classList.contains('lb-prev')) zeigen(aktuell - 1);
      else if (e.target.classList.contains('lb-next')) zeigen(aktuell + 1);
      else if (e.target.tagName !== 'IMG') schliessen();
    });
    document.addEventListener('keydown', tasten);
    zeigen(i);
  }

  bilder.forEach(function (img, i) {
    img.addEventListener('click', function () { oeffnen(i); });
  });
})();
