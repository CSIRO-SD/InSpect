(() => {
 const gallery = document.querySelector('.rec-gallery');
 if (!gallery) return;
 const samples = [...gallery.querySelectorAll('[data-rec-index]')];
 const panels = [...gallery.querySelectorAll('.rec-panel')];
 samples.forEach((button, index) => button.addEventListener('click', () => {
  samples.forEach((sample, i) => sample.setAttribute('aria-pressed', String(i === index)));
  panels.forEach((panel, i) => { panel.hidden = i !== index; });
 }));
 const views = [...gallery.querySelectorAll('[data-rec-view]')];
 views.forEach(button => button.addEventListener('click', () => {
  gallery.dataset.recMode = button.dataset.recView;
  views.forEach(view => view.setAttribute('aria-pressed', String(view === button)));
 }));
 const dialog = document.querySelector('.rec-dialog');
 let opener;
 gallery.querySelectorAll('.rec-photo').forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  if (!dialog.showModal) return;
  event.preventDefault();
  opener = link;
  const image = dialog.querySelector('img');
  image.src = link.href;
  image.alt = link.querySelector('img').alt;
  dialog.querySelector('a').href = link.href;
  dialog.showModal();
 }));
 dialog.addEventListener('close', () => opener?.focus({preventScroll:true}));
})();
