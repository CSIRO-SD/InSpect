
(() => {
 const output = document.getElementById('visitor-location');
 document.querySelectorAll('.visitor-dot').forEach(dot => {
  const show = () => { output.textContent = `${dot.dataset.city} · ${dot.dataset.views} demo views`; };
  dot.addEventListener('pointerenter', show);
  dot.addEventListener('focus', show);
  dot.addEventListener('click', show);
  dot.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); show();} });
 });
})();
