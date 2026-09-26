import { getDocument, GlobalWorkerOptions } from './assets/pdfjs/pdf.js';
GlobalWorkerOptions.workerSrc = new URL('./assets/pdfjs/pdf.worker.js', import.meta.url).href;
const el = id => document.getElementById(id);
let pdf, pageNumber = 1, task, generation = 0, resizeTimer;
const params = new URLSearchParams(location.search);
const fallbackFile = 'assets/gluttony-design.pdf';
const requestedFile = params.get('file') || fallbackFile;
const source = /^assets\/[-\w./]+\.pdf$/i.test(requestedFile) && !requestedFile.includes('..') ? requestedFile : fallbackFile;
const title = params.get('title') || '文档在线阅读';
const project = params.get('project') || 'gluttony-design';
document.title = `${title} · 在线阅读`;
el('doc-title').textContent = title;
el('back').href = `./#project=${encodeURIComponent(project)}`;
el('download').href = source;
el('open-pdf').href = source;
async function renderPage() {
 const current = ++generation;
 task?.cancel();
 el('status').textContent = `正在显示第 ${pageNumber} 页…`;
 try {
  const page = await pdf.getPage(pageNumber);
  if (current !== generation) return;
  const base = page.getViewport({scale:1});
  const available = el('viewport').clientWidth - (innerWidth < 580 ? 16 : 32);
  const scale = el('zoom').value === 'fit' ? available / base.width : Number(el('zoom').value);
  const viewport = page.getViewport({scale});
  const ratio = Math.min(devicePixelRatio || 1, 2);
  // Render off-screen so rapid paging never reuses an active canvas.
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(viewport.width * ratio); canvas.height = Math.ceil(viewport.height * ratio);
  canvas.style.width = `${viewport.width}px`; canvas.style.height = `${viewport.height}px`;
  task = page.render({canvasContext:canvas.getContext('2d'), viewport, transform:[ratio,0,0,ratio,0,0]});
  await task.promise;
  if (current !== generation) return;
  canvas.id = 'page-canvas'; canvas.setAttribute('role','img'); canvas.setAttribute('aria-label',`${title}，第 ${pageNumber} 页，共 ${pdf.numPages} 页`);
  el('page-canvas').replaceWith(canvas);
  el('page').value = pageNumber;
  el('prev').disabled = pageNumber === 1; el('next').disabled = pageNumber === pdf.numPages;
  el('status').textContent = `第 ${pageNumber} / ${pdf.numPages} 页`;
  el('error').hidden = true;
 } catch (error) {
  if (error.name === 'RenderingCancelledException' || current !== generation) return;
  el('status').textContent = '页面加载失败'; el('error').hidden = false;
 }
}
function goTo(number) { if (!pdf || !Number.isFinite(number)) return; pageNumber=Math.min(pdf.numPages,Math.max(1,Math.trunc(number))); renderPage(); el('viewport').scrollTo(0,0); }
el('prev').onclick=()=>goTo(pageNumber-1); el('next').onclick=()=>goTo(pageNumber+1);
el('jump').onsubmit=event=>{event.preventDefault();goTo(Number(el('page').value));};
el('zoom').onchange=()=>renderPage();
window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(pdf)renderPage();},180);});
el('viewport').addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();goTo(pageNumber+(event.key==='ArrowLeft'?-1:1));}});
try {
 pdf=await getDocument({url:source,cMapUrl:'./assets/pdfjs/cmaps/',cMapPacked:true,standardFontDataUrl:'./assets/pdfjs/standard_fonts/',wasmUrl:'./assets/pdfjs/wasm/',isEvalSupported:false}).promise;
 el('total').textContent=`/ ${pdf.numPages}`; el('page').max=pdf.numPages;
 for(const id of ['page','go','zoom'])el(id).disabled=false;
 await renderPage();
} catch(error) { el('status').textContent='文档加载失败'; el('error').hidden=false; }
