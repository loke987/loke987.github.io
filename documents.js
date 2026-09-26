// Extend the existing project and gallery views without changing their content.
const previousProjectView = openProject;
const pdfReaderURL = item => {
 const source = String(item?.url || '');
 const params = new URLSearchParams({ file: source, title: item?.title || '文档', project: item?.id || '' });
 return `reader.html?${params.toString()}`;
};
openProject = function(id) {
 const item = items.find(record => record.id === id);
 detail.classList.toggle('document-dialog', item?.kind === 'pdf');
 if (item?.kind !== 'pdf') {
  previousProjectView(id);
  if (item?.type === 'game') {
   const trailerURL = safeURL(item.trailer);
   const artwork = document.querySelector('#detail-content .dialog-art');
   if (artwork && trailerURL) {
    artwork.outerHTML = `<video controls playsinline preload="metadata" poster="assets/gluttony-trailer-poster.jpg" aria-label="暴食岛游戏宣传片" src="${escapeHTML(trailerURL)}">你的浏览器不支持视频播放，可<a href="${escapeHTML(trailerURL)}">打开宣传片</a>。</video>`;
   }
   const actions = document.querySelector('#detail-content .detail-actions');
   const packageURL = safeURL(item.url);
   if (actions) actions.innerHTML = packageURL
    ? `<a class="primary" href="${escapeHTML(packageURL)}" download>下载游戏安装包 ↓</a>`
    : '<span class="unavailable">游戏安装包暂未提供</span>';
  }
  if (item?.id === 'gluttony-trailer') {
   const video = document.querySelector('#detail-content video');
   if (video) { video.poster = 'assets/gluttony-trailer-poster.jpg'; video.setAttribute('aria-label', '暴食岛游戏宣传片'); }
  }
  return;
 }
 detail.classList.remove('gallery-dialog');
 const readerURL = pdfReaderURL(item);
 document.querySelector('#detail-content').innerHTML = `<h2 id="detail-title">${escapeHTML(item.title)}</h2><p>${escapeHTML(item.description)}</p><div class="detail-actions"><a class="secondary" href="${escapeHTML(readerURL)}" target="_blank" rel="noopener">在新页面阅读 ↗</a><a class="text-link" href="${escapeHTML(safeURL(item.url))}" download>下载 PDF ↓</a></div><iframe class="pdf-reader" src="${escapeHTML(readerURL)}" title="${escapeHTML(item.title)}在线阅读器"></iframe>`;
 if (!detail.open) detail.showModal();
 document.body.classList.add('modal-open');
 detail.scrollTop = 0;
};
const previousDocumentCover = cover;
cover = function(item) { return previousDocumentCover(item).replace('<span class="doc-version">V2.0</span>', '<span class="doc-version">在线阅读 · PDF</span>'); };
render(); checkHash();
