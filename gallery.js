// 图集保留原始 PNG 与 GIF 动画，仅在显示时进行最近邻放大。
const galleryDialog = document.querySelector('#detail');
const galleryContent = document.querySelector('#detail-content');
const galleryItem = window.PORTFOLIO_ITEMS.find(item => item.type === 'gallery');
const htmlText = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let activeImage = 0;
let imageScale = 0;
function showGallery() {
 galleryDialog.classList.add('gallery-dialog');
 galleryContent.innerHTML = `<h2 id="detail-title">${htmlText(galleryItem.title)}</h2><div class="tags"><span>自制素材图集</span><span>${galleryItem.images.length} 张 · 含 ${galleryItem.images.filter(image=>image.src.toLowerCase().endsWith('.gif')).length} 张 GIF 动画</span></div><p>${htmlText(galleryItem.description)}</p>${[...new Set(galleryItem.images.map(image=>image.group))].map(group=>`<section class="gallery-section"><h3>${group}<span>${galleryItem.images.filter(image=>image.group===group).length} 张</span></h3><div class="gallery-grid ${group==='食物图标'?'food-grid':group==='动画素材'?'animation-grid':'character-grid'}">${galleryItem.images.map((image,index)=>image.group===group?`<button class="gallery-tile ${image.scene?'scene-tile':''}" data-image="${index}" aria-label="放大查看${htmlText(image.name)}"><span class="pixel-surface"><img src="${htmlText(image.src)}" alt="${htmlText(image.name)}${group==='角色表情'?'表情图集':group==='动画素材'?'动画':'像素图标'}" ${image.previewWidth?`style="width:${Number(image.previewWidth)}px"`:''} loading="lazy"></span><span class="gallery-caption">${htmlText(image.name)}<span>${group==='动画素材'?'GIF · ':''}<span aria-hidden="true">↗</span></span></span></button>`:'').join('')}</div></section>`).join('')}`;
 if(!galleryDialog.open)galleryDialog.showModal();
 document.body.classList.add('modal-open');
 galleryDialog.scrollTop=0;
}
function showImage(index) {
 activeImage=(index+galleryItem.images.length)%galleryItem.images.length;
 const image=galleryItem.images[activeImage];
 galleryContent.innerHTML=`<button class="gallery-back text-link" data-back-gallery>← 返回图集</button><h2 id="detail-title">${htmlText(image.name)}</h2><div class="viewer-tools"><span>${activeImage+1} / ${galleryItem.images.length} · ${htmlText(image.group)}</span><div role="group" aria-label="图片缩放">${[0,1,2,4,8].map(scale=>`<button data-scale="${scale}" aria-pressed="${scale===imageScale}">${scale?scale+'×':'适应'}</button>`).join('')}</div></div><div class="image-viewport pixel-surface" tabindex="0" aria-label="放大图片区域，可滚动查看"><img id="gallery-image" src="${htmlText(image.src)}" alt="${htmlText(image.name)}完整原图"></div><p class="viewer-note">保留原始像素比例 · 放大后可滚动查看</p><div class="viewer-navigation"><button class="secondary" data-prev-image>← 上一张</button><button class="secondary" data-next-image>下一张 →</button></div>`;
 const img=galleryContent.querySelector('#gallery-image');
 img.addEventListener('load',applyScale,{once:true});if(img.complete)applyScale();
 galleryDialog.scrollTop=0;
}
function applyScale(){const img=galleryContent.querySelector('#gallery-image');if(!img)return;img.style.width=imageScale?img.naturalWidth*imageScale+'px':'';img.style.maxWidth=imageScale?'none':'100%';galleryContent.querySelectorAll('[data-scale]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.scale)===imageScale)));}
// 将图集详情接入原有项目入口，保留其他项目的行为。
const originalOpenProject = openProject;
openProject = function(id){galleryDialog.classList.toggle('gallery-dialog',id===galleryItem.id);if(id===galleryItem.id){showGallery();return;}originalOpenProject(id);};
const originalCover = cover;
cover = function(item){if(item.type!=='gallery')return originalCover(item);return '<div class="gallery-cover"><span class="gallery-cover-label">PIXEL ART COLLECTION</span><div class="portrait-row"><span class="portrait-sprite portrait-amu"></span><span class="portrait-sprite portrait-lulu"></span><span class="portrait-sprite portrait-felix"></span><span class="portrait-sprite portrait-chloe"></span></div><div class="food-preview">'+galleryItem.images.filter(image=>image.group==='食物图标').map(image=>`<img src="${htmlText(image.src)}" alt="${htmlText(image.name)}">`).join('')+'</div><span class="gallery-cover-caption">自制素材 · 表情 / 图标 / 动画</span></div>';};
const filters=document.querySelector('.filters');
const galleryFilter=document.createElement('button');galleryFilter.dataset.filter='gallery';galleryFilter.setAttribute('aria-pressed','false');galleryFilter.innerHTML='图集 <span>01</span>';filters.append(galleryFilter);
galleryFilter.addEventListener('click',()=>{filters.querySelectorAll('button').forEach(button=>{button.classList.toggle('active',button===galleryFilter);button.setAttribute('aria-pressed',String(button===galleryFilter));});render('gallery');});
galleryContent.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.hasAttribute('data-image')){imageScale=galleryItem.images[Number(button.dataset.image)].scale??(galleryItem.images[Number(button.dataset.image)].group==='食物图标'?8:0);showImage(Number(button.dataset.image));galleryContent.querySelector('[data-back-gallery]').focus();}if(button.hasAttribute('data-scale')){imageScale=Number(button.dataset.scale);applyScale();}if(button.hasAttribute('data-back-gallery')){showGallery();galleryContent.querySelector(`[data-image="${activeImage}"]`).focus();}if(button.hasAttribute('data-prev-image')){showImage(activeImage-1);galleryContent.querySelector('[data-prev-image]').focus();}if(button.hasAttribute('data-next-image')){showImage(activeImage+1);galleryContent.querySelector('[data-next-image]').focus();}});
galleryDialog.addEventListener('keydown',event=>{if(!galleryContent.querySelector('#gallery-image')||event.target.closest('.image-viewport'))return;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();showImage(activeImage+(event.key==='ArrowLeft'?-1:1));galleryContent.querySelector(event.key==='ArrowLeft'?'[data-prev-image]':'[data-next-image]').focus();}});
document.querySelector('.intro-note .muted').textContent='游戏 · 视频 · 设计文档 · 图集';
document.querySelector('meta[name="description"]').content='陈乐琦的个人作品集。探索游戏项目、观看视频、阅读设计文档与浏览像素素材图集。';
render();checkHash();
