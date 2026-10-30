(() => {
  'use strict';
  const config = window.INSPECT_CLICK_ANALYTICS;
  const count = document.getElementById('download-click-count');
  const status = document.getElementById('download-click-status');
  if (!config?.endpoint) return;
  let endpoint;
  try { endpoint = new URL(config.endpoint); } catch { return; }
  if (endpoint.protocol !== 'https:' || !endpoint.hostname.endsWith('.goatcounter.com') || endpoint.pathname !== '/count') return;
  const eventName = 'dataset-link-click';
  const production = location.hostname === 'csiro-sd.github.io' && location.pathname.startsWith('/InSpect/');
  const links = document.querySelectorAll('[data-download-track]');
  if (production && links.length) {
    // Only button events: do not send page views or deduplicate repeated clicks.
    window.goatcounter = {no_onload: true, endpoint: endpoint.href};
    const tracker = document.createElement('script');
    tracker.src = 'https://gc.zgo.at/count.js';
    tracker.async = true;
    tracker.dataset.goatcounter = endpoint.href;
    document.head.append(tracker);
    document.addEventListener('click', event => {
      const link = event.target.closest?.('a[data-download-track]');
      if (!link || !window.goatcounter?.count) return;
      window.goatcounter.count({path: eventName, title: 'Download dataset clicks', event: true, no_session: true, referrer: ''});
    });
  }
  if (!count || !status) return;
  status.textContent = 'Loading recorded clicks…';
  fetch(`${endpoint.origin}/counter/${eventName}.json?v=20261031-enabled`, {credentials: 'omit', signal: AbortSignal.timeout(10000)})
    .then(async response => {
      const data = await response.json();
      // GoatCounter returns 404 with a zero count before the first event exists.
      const noEvents = response.status === 404 && data.count === '0' && data.count_unique === '0';
      if (!response.ok && !noEvents) throw new Error('Counter is unavailable');
      return data;
    })
    .then(data => {
      if (typeof data.count !== 'string' && typeof data.count !== 'number') throw new Error('Invalid counter');
      count.textContent = String(data.count);
      status.textContent = 'Recorded clicks · totals may take up to four hours to refresh.';
    })
    .catch(() => {
      count.textContent = '—';
      status.textContent = 'Click tracking is configured. The public total is not available yet.';
    });
})();
