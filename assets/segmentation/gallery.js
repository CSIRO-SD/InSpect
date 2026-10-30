(() => {
 const gallery = document.querySelector('.seg-gallery');
 if (!gallery) return;
 const samples = [...gallery.querySelectorAll('[data-seg-index]')];
 const panels = [...gallery.querySelectorAll('.seg-panel')];
 samples.forEach(button => button.addEventListener('click', () => {
  const index = Number(button.dataset.segIndex);
  samples.forEach((sample, i) => sample.setAttribute('aria-pressed', String(i === index)));
  panels.forEach((panel, i) => { panel.hidden = i !== index; });
 }));
 const modes = [...gallery.querySelectorAll('[data-seg-mode-button]')];
 modes.forEach(button => button.addEventListener('click', () => {
  gallery.dataset.segMode = button.dataset.segModeButton;
  modes.forEach(mode => mode.setAttribute('aria-pressed', String(mode === button)));
 }));
 const slider = gallery.querySelector('#seg-opacity');
 const output = gallery.querySelector('output');
 slider.addEventListener('input', () => {
  gallery.style.setProperty('--mask-opacity', Number(slider.value) / 100);
  output.value = `${slider.value}%`;
 });
})();
