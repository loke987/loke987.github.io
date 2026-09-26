// Extend the existing project and gallery views without changing their content.
const previousProjectView = openProject;
openProject = function(id) {
 const item = items.find(record => record.id === id);
 detail.classList.toggle('document-dialog', item?.kind === 'pdf');
 if (item?.kind !== 'pdf') {
  previousProjectView(id);
  if (item?.type === 'game') {
   const actions = document.querySelector('#detail-content .detail-actions');
   const packageURL = safeURL(item.url);
   if (actions) actions.innerHTML = packageURL
    ? `<a class="primary" href="${escapeHTML(packageURL)}" download>下载游戏安装包 ↓</a>`
    : '<span class="unavailable">游戏安装包暂未提供</span>';
  }
  return;
 }
 detail.classList.remove('gallery-dialog');
 document.querySelector('#detail-content').innerHTML = `<h2 id="detail-title">${escapeHTML(item.title)}</h2><p>${escapeHTML(item.description)}</p><div class="detail-actions"><a class="secondary" href="reader.html" target="_blank" rel="noopener">在新页面阅读 ↗</a><a class="text-link" href="${escapeHTML(safeURL(item.url))}" download>下载 PDF ↓</a></div><iframe class="pdf-reader" src="reader.html" title="暴食阿姆游戏策划案在线阅读器"></iframe>`;
 if (!detail.open) detail.showModal();
 document.body.classList.add('modal-open');
 detail.scrollTop = 0;
};
const previousDocumentCover = cover;
cover = function(item) { return previousDocumentCover(item).replace('<span class="doc-version">V2.0</span>', '<span class="doc-version">在线阅读 · PDF</span>'); };
render(); checkHash();
