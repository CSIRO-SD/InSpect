(() => {
  'use strict';
  const base = document.body.dataset.base || '';
  // Keep links to the previous single-page version usable.
  if (!base && /(?:\/|\/index\.html)$/.test(location.pathname)) {
    const routes = {overview:'introduction.html',dataset:'dataset.html',benchmarks:'dataset.html#annotations-examples',gallery:'dataset.html',resources:'dataset.html#resources',citation:'dataset.html#citation'};
    const route = routes[location.hash.slice(1)];
    if (route) { location.replace('docs/en/' + route); return; }
  }
  const copy = document.querySelector('#copy-bibtex');
  if (copy) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      const code = document.querySelector('#bibtex');
      const status = document.querySelector('#copy-status');
      try {
        await navigator.clipboard.writeText(code.textContent.trim() + '\n');
        status.textContent = 'Provisional BibTeX copied.';
      } catch {
        const range = document.createRange(); range.selectNodeContents(code);
        const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
        status.textContent = 'Text selected. Press Ctrl/Cmd+C to copy.';
      }
    });
  }
  Object.entries(window.INSPECT_RESOURCES || {}).forEach(([key, value]) => {
    if (!['dataset','code'].includes(key) || !value) return;
    let url; try { url = new URL(value); } catch { return; }
    if (url.protocol !== 'https:') return;
    const slot = document.querySelector(`[data-resource-link="${key}"]`);
    if (!slot) return;
    const link = document.createElement('a'); link.href = url.href;
    if (key === 'dataset') link.dataset.downloadTrack = 'dataset-link-click';
    link.textContent = key === 'dataset' ? '[Download dataset]' : '[Code]'; slot.replaceWith(link);
  });
  const tocHeadings = [...document.querySelectorAll('.dataset-page article h2[id], .dataset-page article h3[id]')];
  if (tocHeadings.length) {
    let scheduled = false;
    const updateToc = () => {
      scheduled = false;
      let active = tocHeadings[0];
      for (const heading of tocHeadings) {
        if (heading.getBoundingClientRect().top <= 100) active = heading;
      }
      document.querySelectorAll('.dataset-page .toc a').forEach(link => {
        const current = link.getAttribute('href') === '#' + active.id;
        link.parentElement.classList.toggle('active', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    document.querySelectorAll('.dataset-page .toc a').forEach(link => {
      link.addEventListener('click', event => {
        const target = document.getElementById(link.hash.slice(1));
        if (!target) return;
        event.preventDefault();
        history.replaceState(null, '', link.hash);
        target.scrollIntoView({behavior:'instant', block:'start'});
        updateToc();
      });
    });
    document.addEventListener('scroll', () => {
      if (!scheduled) { scheduled = true; requestAnimationFrame(updateToc); }
    }, {passive:true, capture:true});
    updateToc();
  }
  const dialog = document.querySelector('.inspect-search');
  const input = document.querySelector('#search-input');
  const results = document.querySelector('#search-results');
  const updateSearch = () => {
    const query = input.value.trim().toLowerCase();
    const matches = (window.INSPECT_SEARCH || []).filter(item => !query || (item.title+' '+item.text).toLowerCase().includes(query));
    results.replaceChildren();
    const count = document.createElement('p'); count.textContent = `${matches.length} ${matches.length===1?'page':'pages'} found.`; results.append(count);
    const list = document.createElement('ul');
    matches.forEach(item => { const li=document.createElement('li'); const a=document.createElement('a'); a.href=base+item.url; a.textContent=item.title; li.append(a); list.append(li); });
    results.append(list);
  };
  document.querySelectorAll('.search-button').forEach(button => button.addEventListener('click', () => {dialog.showModal();updateSearch();input.focus();}));
  document.querySelector('.search-close').addEventListener('click', () => dialog.close());
  input.addEventListener('input',updateSearch);
})();
