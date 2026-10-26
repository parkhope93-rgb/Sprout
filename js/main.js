const initial = [
  { id: 'os', label: 'OS', parent: null, level: 0, children: ['chap1'], note: 'Operating System\\n컴퓨터 하드웨어와 응용 프로그램 사이에서 자원을 관리하는 시스템 소프트웨어.' },
  { id: 'chap1', label: 'Chap. 1', parent: 'os', level: 1, children: ['definition', 'cs', 'classification', 'structure', 'functions', 'dual', 'syscall', 'virtualization', 'cloud'], note: 'Introduction and System Structures' },
  { id: 'definition', label: 'Definition', parent: 'chap1', level: 2, children: [], note: '운영체제의 정의와 역할' },
  { id: 'cs', label: 'CS organization', parent: 'chap1', level: 2, children: [], note: '컴퓨터 시스템의 구성 요소와 동작' },
  { id: 'classification', label: 'OS classification', parent: 'chap1', level: 2, children: ['users', 'singlemulti', 'tasking'], note: '운영체제 분류 기준' },
  { id: 'users', label: 'Number of users / processes / Job mechanism', parent: 'classification', level: 3, children: [], note: '사용자 수, 프로세스 수, 작업 처리 방식에 따른 분류' },
  { id: 'singlemulti', label: 'Single user / Multi user', parent: 'classification', level: 3, children: [], note: '단일 사용자 운영체제와 다중 사용자 운영체제' },
  { id: 'tasking', label: 'Single tasking / Multi tasking', parent: 'classification', level: 3, children: [], note: '한 번에 하나 또는 여러 작업을 처리하는 방식' },
  { id: 'structure', label: 'OS structure', parent: 'chap1', level: 2, children: ['kernel', 'booting'], note: '운영체제의 구조' },
  { id: 'kernel', label: 'Kernel / Utilities', parent: 'structure', level: 3, children: [], note: '커널과 시스템 유틸리티의 역할' },
  { id: 'booting', label: 'Booting', parent: 'structure', level: 3, children: [], note: '컴퓨터를 시작할 때 운영체제가 메모리에 적재되는 과정' },
  { id: 'functions', label: 'Functions of OS', parent: 'chap1', level: 2, children: ['process', 'processor', 'memory', 'file', 'io', 'storage', 'other'], note: '운영체제가 제공하는 핵심 기능' },
  { id: 'process', label: 'Process management', parent: 'functions', level: 3, children: [], note: '프로세스 생성·종료, 스케줄링, 동기화, 교착 상태 처리' },
  { id: 'processor', label: 'Processor management', parent: 'functions', level: 3, children: [], note: 'CPU 할당과 프로세서 스케줄링' },
  { id: 'memory', label: 'Memory management', parent: 'functions', level: 3, children: [], note: '메모리 할당, 해제, 가상 메모리 관리' },
  { id: 'file', label: 'File management', parent: 'functions', level: 3, children: [], note: '파일과 디렉터리의 생성·삭제·접근 제어' },
  { id: 'io', label: 'I/O management', parent: 'functions', level: 3, children: [], note: '입출력 장치 및 장치 드라이버 관리' },
  { id: 'storage', label: 'Secondary storage management', parent: 'functions', level: 3, children: [], note: '보조기억장치의 공간과 데이터 관리' },
  { id: 'other', label: 'Other', parent: 'functions', level: 3, children: [], note: '보호·보안, 네트워킹, 오류 탐지 등' },
  { id: 'dual', label: 'Dual Mode Operation', parent: 'chap1', level: 2, children: ['interrupt', 'privileged'], note: '사용자 모드와 커널 모드를 구분해 시스템을 보호하는 방식' },
  { id: 'interrupt', label: 'Interrupt and trap', parent: 'dual', level: 3, children: [], note: '인터럽트와 트랩의 차이 및 처리 과정' },
  { id: 'privileged', label: 'Privileged instructions', parent: 'dual', level: 3, children: [], note: '커널 모드에서만 실행할 수 있는 특권 명령어' },
  { id: 'syscall', label: 'System Call Interface', parent: 'chap1', level: 2, children: [], note: '응용 프로그램이 운영체제 서비스를 요청하는 인터페이스' },
  { id: 'virtualization', label: 'Virtualization', parent: 'chap1', level: 2, children: ['hw', 'osvirt'], note: '가상화의 개념과 유형' },
  { id: 'hw', label: 'H/W virtualization', parent: 'virtualization', level: 3, children: ['types', 'vmm', 'benefits'], note: '하드웨어 가상화' },
  { id: 'types', label: 'Types of virtualization', parent: 'hw', level: 4, children: [], note: '전가상화, 반가상화, 하드웨어 지원 가상화 등' },
  { id: 'vmm', label: 'Types of VMM', parent: 'hw', level: 4, children: [], note: 'VMM / 하이퍼바이저 유형' },
  { id: 'benefits', label: 'Benefits', parent: 'hw', level: 4, children: [], note: '자원 활용률, 격리, 유연성, 관리 효율성' },
  { id: 'osvirt', label: 'OS virtualization', parent: 'virtualization', level: 3, children: [], note: '컨테이너 기반 가상화 등' },
  { id: 'cloud', label: 'Cloud Computing', parent: 'chap1', level: 2, children: ['cloudmodels'], note: '네트워크를 통해 컴퓨팅 자원을 서비스로 제공하는 모델' },
  { id: 'cloudmodels', label: 'SaaS / PaaS / IaaS', parent: 'cloud', level: 3, children: [], note: 'Software / Platform / Infrastructure as a Service' }
];
const STORE_KEY = 'sprout-mindmap-v2';
const UI = 1.95;
const MAX_LEVEL = 5;
let data = structuredClone(initial), selected = 'chap1', collapsed = new Set(), positions = {}, zoom = .82, pan = { x: 70 * UI, y: 55 * UI }, dragging = false, dragStart = null, history = [], future = [], examMode = false;
const $ = s => document.querySelector(s), viewport = $('#viewport'), world = $('#world');
function persist() { try { localStorage.setItem(STORE_KEY, JSON.stringify({ data, collapsed: [...collapsed], selected, updatedAt: new Date().toISOString() })); $('#saveText').textContent = '자동 저장됨' } catch (e) { $('#saveText').textContent = '브라우저 저장을 사용할 수 없음' } }
function loadSaved() { try { const raw = localStorage.getItem(STORE_KEY); if (raw) { const s = JSON.parse(raw); if (Array.isArray(s.data) && s.data.some(n => n.id === 'os')) { data = s.data; collapsed = new Set(s.collapsed || []); selected = data.some(n => n.id === s.selected) ? s.selected : 'chap1' } } } catch (e) { } }
function snapshot() { history.push(JSON.stringify({ data, collapsed: [...collapsed] })); if (history.length > 40) history.shift(); future = []; $('#saveText').textContent = '저장 중…'; setTimeout(persist, 200) }
function node(id) { return data.find(n => n.id === id) }
function levelClass(level) { return level <= 0 ? 'root' : 'level' + Math.min(level, MAX_LEVEL) }
function normalizeLevels() { function walk(id, level) { const n = node(id); if (!n) return; n.level = level; n.children.forEach(cid => walk(cid, Math.min(level + 1, MAX_LEVEL))) } walk('os', 0) }
function visibleNodes() { let out = []; function walk(id) { let n = node(id); if (!n) return; out.push(n); if (!collapsed.has(id)) n.children.forEach(walk) } walk('os'); return out }
function lineWidths(el) { const range = document.createRange(); range.selectNodeContents(el); const rows = new Map(); for (const r of range.getClientRects()) { const key = Math.round(r.top); rows.set(key, (rows.get(key) || 0) + r.width) } return [...rows.values()] }
function measureLabel(text, level, hasChildren) {
  const minW = Math.ceil((level === 0 ? 116 : 112) * UI);
  const el = document.createElement('div'); el.className = 'node ' + levelClass(level); el.style.visibility = 'hidden'; el.style.left = '-10000px'; el.style.top = '0'; el.style.width = 'max-content'; el.style.maxWidth = 'none'; el.style.minWidth = '0';
  const label = document.createElement('span'); label.style.flex = '1'; label.style.minWidth = '0'; label.style.whiteSpace = 'nowrap'; label.textContent = text; el.appendChild(label);
  if (hasChildren) { const fold = document.createElement('span'); fold.className = 'fold'; fold.textContent = '−'; el.appendChild(fold) }
  document.body.appendChild(el);
  const applyW = width => { el.style.width = width + 'px'; el.style.maxWidth = width + 'px'; el.style.minWidth = '0' };
  const single = el.offsetWidth;
  label.style.whiteSpace = 'normal';
  const fits = width => { applyW(width); const lines = lineWidths(label); return lines.length <= 2 && label.scrollWidth <= label.clientWidth + 1 };
  if (text.length <= 15) {
    let w = Math.max(minW, single); applyW(w);
    while (lineWidths(label).length > 1) { w += 4; applyW(w) }
    const h = el.offsetHeight; el.remove(); return { w, h };
  }
  let lo = 0, hi = single;
  while (lo < hi) { const mid = Math.floor((lo + hi) / 2); if (fits(mid)) hi = mid; else lo = mid + 1 }
  applyW(lo);
  if (lineWidths(label).length < 2) { applyW(Math.max(minW, single)); lo = Math.max(minW, single) }
  else {
    for (let guard = 0; guard < 6; guard++) {
      const lines = lineWidths(label); if (lines.length !== 2) break;
      const slack = label.clientWidth - Math.max(...lines); if (slack <= 1) break;
      const next = Math.ceil(parseFloat(el.style.width) - slack); if (!fits(next)) { applyW(lo); break } lo = next;
    }
  }
  const h = el.offsetHeight; el.remove(); return { w: lo, h };
}
function layout() {
  const visible = visibleNodes(); positions = {}; const gapY = 12 * UI, gapX = 52 * UI, deepGapX = gapX * 1.32;
  function calcHeight(id) { const n = node(id), kids = collapsed.has(id) ? [] : n.children.map(x => node(x)).filter(x => x && visible.includes(x)); const m = measureLabel(n.label, n.level, n.children.length > 0); if (!kids.length) { n._h = m.h; return m.h } let total = kids.reduce((s, k) => s + calcHeight(k.id), 0) + gapY * (kids.length - 1); n._h = Math.max(m.h, total); return n._h }
  calcHeight('os');
  function place(id, x, top) { const n = node(id), m = measureLabel(n.label, n.level, n.children.length > 0); let y = top + (n._h - m.h) / 2; positions[id] = { x, y, w: m.w, h: m.h }; let kids = collapsed.has(id) ? [] : n.children.map(k => node(k)).filter(k => k && visible.includes(k)); let total = kids.reduce((s, k) => s + k._h, 0) + gapY * Math.max(0, kids.length - 1); let cy = top + (n._h - total) / 2; const step = n.level >= 1 ? deepGapX : gapX; kids.forEach(k => { place(k.id, x + m.w + step, cy); cy += k._h + gapY }) }
  place('os', 0, 0);
  let maxX = 0, maxY = 0; Object.values(positions).forEach(p => { maxX = Math.max(maxX, p.x + p.w); maxY = Math.max(maxY, p.y + p.h) });
  world.style.width = (maxX + 80 * UI) + 'px'; world.style.height = (maxY + 80 * UI) + 'px'; $('#connectors').setAttribute('width', maxX + 80 * UI); $('#connectors').setAttribute('height', maxY + 80 * UI);
  renderNodes(visible); renderLines(visible); applyTransform();
}
function renderNodes(visible) {
  const holder = $('#nodes'); holder.innerHTML = '';
  visible.forEach(n => {
    const p = positions[n.id], el = document.createElement('div'); el.className = 'node ' + levelClass(n.level) + (n.id === selected ? ' selected' : ''); el.dataset.id = n.id; el.dataset.status = n.status || 'not-started'; el.style.left = p.x + 'px'; el.style.top = p.y + 'px'; el.style.width = p.w + 'px'; el.style.minWidth = p.w + 'px';
    if (n.customColor) { const colors = { forest: ['#344b3a', '#fff', 'transparent'], sage: ['#71866a', '#fff', 'transparent'], light: ['#a2b398', '#fff', 'transparent'], pale: ['#e8eee4', '#344638', '#e0e7dc'], mist: ['#f7f8f4', '#3a463c', '#d7e0d2'], paper: ['#fffefa', '#445046', '#c5d0c0'] }; const c = colors[n.customColor]; if (c) { el.style.background = c[0]; el.style.color = c[1]; el.style.borderColor = c[2] } }
    const label = document.createElement('span'); label.textContent = examMode && n.level >= 2 ? '　　　　　　　　　' : n.label; label.style.flex = '1'; label.style.minWidth = '0'; el.appendChild(label);
    if (n.children.length) { const fold = document.createElement('span'); fold.className = 'fold'; fold.textContent = collapsed.has(n.id) ? '＋' : '−'; el.appendChild(fold) }
    el.addEventListener('click', e => { e.stopPropagation(); selectNode(n.id) });
    el.addEventListener('dblclick', e => { e.stopPropagation(); selectNode(n.id); const inp = $('#labelInput'); if (inp) { inp.focus(); inp.select() } });
    holder.appendChild(el);
  });
  const q = $('#searchInput').value.trim().toLowerCase(); if (q) { holder.querySelectorAll('.node').forEach(el => { const n = node(el.dataset.id); el.style.opacity = n.label.toLowerCase().includes(q) ? '1' : '.22'; el.style.filter = n.label.toLowerCase().includes(q) ? 'none' : 'grayscale(.5)' }) }
}
function renderLines(visible) {
  const svg = $('#connectors'); svg.innerHTML = ''; const ns = 'http://www.w3.org/2000/svg';
  visible.forEach(n => { if (!n.parent) return; const a = positions[n.parent], b = positions[n.id]; if (!a || !b) return; const x1 = a.x + a.w, y1 = a.y + a.h / 2, x2 = b.x, y2 = b.y + b.h / 2, mx = x1 + (x2 - x1) * .52; const path = document.createElementNS(ns, 'path'); path.setAttribute('d', `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`); path.setAttribute('fill', 'none'); path.setAttribute('stroke', n.parent === selected || n.id === selected ? '#879b7c' : '#c5cec0'); path.setAttribute('stroke-width', n.parent === selected || n.id === selected ? 2.2 * UI : 1.7 * UI); path.setAttribute('stroke-linecap', 'round'); svg.appendChild(path) });
}
function applyTransform() { world.style.transform = `translate(${pan.x}px,${pan.y}px) scale(${zoom})`; $('#zoomReadout').textContent = Math.round(zoom * 100) + '%' }
function centerMap() { const shell = $('#canvasShell').getBoundingClientRect(); const maxX = Math.max(...Object.values(positions).map(p => p.x + p.w)); const maxY = Math.max(...Object.values(positions).map(p => p.y + p.h)); pan.x = Math.max(22 * UI, (shell.width - maxX * zoom) / 2); pan.y = Math.max(30 * UI, (shell.height - maxY * zoom) / 2); applyTransform() }
function fitMap() { const shell = $('#canvasShell').getBoundingClientRect(); const maxX = Math.max(...Object.values(positions).map(p => p.x + p.w)) + 40 * UI; const maxY = Math.max(...Object.values(positions).map(p => p.y + p.h)) + 40 * UI; zoom = Math.min((shell.width - 60 * UI) / maxX, (shell.height - 70 * UI) / maxY, 1); zoom = Math.max(.35, zoom); centerMap() }
function selectNode(id) { selected = id; renderNodes(visibleNodes()); renderLines(visibleNodes()); renderInspector(); if (innerWidth <= 760) $('#inspector').classList.add('mobile-open') }
function renderInspector() {
  const n = node(selected), box = $('#inspectorContent'); if (!n) { box.innerHTML = '<div class="empty-inspector">노드를 선택해 줘.</div>'; return }
  $('#nodePath').textContent = n.level === 0 ? '최상위 노드' : `Level ${n.level} · ${n.parent ? node(n.parent).label : ''}`;
  box.innerHTML = `<label class="field-label" for="labelInput">개념 이름</label><input id="labelInput" class="field" maxlength="100" value="${escapeHtml(n.label)}"><label class="field-label" for="noteInput">설명 / 메모</label><textarea id="noteInput" class="field" placeholder="이 개념에 대한 설명을 적어 봐.">${escapeHtml(n.note || '')}</textarea>
 </div><span class="field-label">노드 스타일</span><div class="color-row"><button class="swatch ${n.level === 0 ? 'active' : ''}" data-color="forest" style="background:#344b3a" title="포레스트"></button><button class="swatch ${n.level === 1 ? 'active' : ''}" data-color="sage" style="background:#71866a" title="세이지"></button><button class="swatch ${n.level === 2 ? 'active' : ''}" data-color="light" style="background:#a2b398" title="라이트 세이지"></button><button class="swatch ${n.level === 3 ? 'active' : ''}" data-color="pale" style="background:#e8eee4" title="페일 그린"></button><button class="swatch ${n.level === 4 ? 'active' : ''}" data-color="mist" style="background:#f7f8f4;border-color:#d7e0d2" title="미스트"></button><button class="swatch ${n.level === 5 ? 'active' : ''}" data-color="paper" style="background:#fffefa;border-color:#c5d0c0" title="페이퍼"></button></div><span class="field-label">빠른 작업</span><div class="inspector-actions"><button class="soft-btn" id="addChildInline">＋ 하위 노드</button><button class="soft-btn" id="toggleInline">${collapsed.has(n.id) ? '⌄ 펼치기' : '⌃ 접기'}</button><button class="soft-btn delete-btn" id="deleteNode">삭제</button><button class="soft-btn" id="duplicateNode">복제</button></div>`;
  $('#labelInput').addEventListener('input', e => { n.label = e.target.value; renderNodes(visibleNodes()); renderLines(visibleNodes()); $('#nodePath').textContent = n.level === 0 ? '최상위 노드' : `Level ${n.level} · ${n.parent ? node(n.parent).label : ''}`; markUnsaved() });
  $('#labelInput').addEventListener('change', () => { snapshot(); layout(); persist() });
  $('#noteInput').addEventListener('input', e => { n.note = e.target.value; markUnsaved() });
  $('#noteInput').addEventListener('change', () => { snapshot(); persist() });
  box.querySelectorAll('.swatch').forEach(b => b.addEventListener('click', () => { snapshot(); n.customColor = b.dataset.color; box.querySelectorAll('.swatch').forEach(x => x.classList.toggle('active', x === b)); showToast('노드 스타일을 변경했어.'); layout(); renderInspector(); persist() }));
  box.querySelectorAll('[data-status-choice]').forEach(b => b.addEventListener('click', () => { snapshot(); n.status = b.dataset.statusChoice; layout(); renderInspector(); persist(); showToast('학습 상태를 저장했어.') }));
  $('#addChildInline').onclick = addChild;
  $('#toggleInline').onclick = toggleCollapse;
  $('#deleteNode').onclick = deleteNode;
  $('#duplicateNode').onclick = duplicateNode;
}
function escapeHtml(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])) }
function markUnsaved() { $('#saveText').textContent = '변경사항 있음'; clearTimeout(markUnsaved.timer); markUnsaved.timer = setTimeout(persist, 500) }
function showToast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => t.classList.remove('show'), 1800) }
function addChild() { const parent = node(selected); if (!parent) return; if (parent.level >= MAX_LEVEL) { showToast('노드는 5단계까지만 추가할 수 있어.'); return } snapshot(); const id = 'n' + Date.now(); const n = { id, label: '새 개념', parent: parent.id, level: parent.level + 1, children: [], note: '' }; data.push(n); parent.children.push(id); collapsed.delete(parent.id); selected = id; layout(); renderInspector(); setTimeout(() => { const i = $('#labelInput'); i.focus(); i.select() }, 30); persist(); showToast('하위 노드를 추가했어.') }
function addSibling() { const current = node(selected); if (!current || !current.parent) { showToast('최상위 노드에는 같은 단계 노드를 추가할 수 없어.'); return } snapshot(); const parent = node(current.parent), id = 'n' + Date.now(); const n = { id, label: '새 개념', parent: parent.id, level: current.level, children: [], note: '', status: 'not-started' }; data.push(n); parent.children.push(id); collapsed.delete(parent.id); selected = id; layout(); renderInspector(); setTimeout(() => { const i = $('#labelInput'); i.focus(); i.select() }, 30); persist(); showToast('같은 단계에 노드를 추가했어.') }
function toggleCollapse() { const n = node(selected); if (!n.children.length) { showToast('접거나 펼칠 하위 노드가 없어.'); return } snapshot(); if (collapsed.has(n.id)) collapsed.delete(n.id); else collapsed.add(n.id); layout(); renderInspector() }
function deleteNode() { const n = node(selected); if (!n || !n.parent) { showToast('최상위 노드는 삭제할 수 없어.'); return } snapshot(); const p = node(n.parent); p.children = p.children.filter(id => id !== n.id); const remove = new Set(); function collect(id) { remove.add(id); node(id)?.children.forEach(collect) } collect(n.id); data = data.filter(x => !remove.has(x.id)); collapsed.forEach(id => { if (remove.has(id)) collapsed.delete(id) }); selected = p.id; layout(); renderInspector(); persist(); showToast('노드를 삭제했어.') }
function duplicateNode() { const n = node(selected); if (!n.parent) { showToast('최상위 노드는 복제할 수 없어.'); return } snapshot(); const p = node(n.parent), id = 'n' + Date.now(); const copy = { ...n, id, label: n.label + ' (복사)', parent: p.id, children: [], note: n.note }; data.push(copy); p.children.push(id); selected = id; layout(); renderInspector(); persist(); showToast('노드를 복제했어.') }
function undo() { if (!history.length) { showToast('되돌릴 작업이 없어.'); return } future.push(JSON.stringify({ data, collapsed: [...collapsed] })); const s = JSON.parse(history.pop()); data = s.data; collapsed = new Set(s.collapsed); if (!node(selected)) selected = 'chap1'; layout(); renderInspector(); persist(); showToast('실행을 취소했어.') }
function redo() { if (!future.length) { showToast('다시 실행할 작업이 없어.'); return } history.push(JSON.stringify({ data, collapsed: [...collapsed] })); const s = JSON.parse(future.pop()); data = s.data; collapsed = new Set(s.collapsed); layout(); renderInspector(); persist(); showToast('다시 실행했어.') }
$('#addNodeBtn').onclick = addChild; $('#addSiblingBtn').onclick = addSibling; $('#collapseBtn').onclick = toggleCollapse; $('#zoomIn').onclick = () => { zoom = Math.min(1.5, zoom + .1); applyTransform() }; $('#zoomOut').onclick = () => { zoom = Math.max(.35, zoom - .1); applyTransform() }; $('#fitBtn').onclick = fitMap; $('#centerBtn').onclick = centerMap; $('#undoBtn').onclick = undo; $('#redoBtn').onclick = redo; $('#panelBtn').onclick = () => $('#inspector').classList.toggle('mobile-open'); $('#closeInspector').onclick = () => $('#inspector').classList.remove('mobile-open');
$('#searchInput').addEventListener('input', () => renderNodes(visibleNodes()));
viewport.addEventListener('pointerdown', e => { if (e.target.closest('.node')) return; dragging = true; dragStart = { x: e.clientX - pan.x, y: e.clientY - pan.y }; viewport.classList.add('dragging'); viewport.setPointerCapture(e.pointerId) });
viewport.addEventListener('pointermove', e => { if (!dragging) return; pan.x = e.clientX - dragStart.x; pan.y = e.clientY - dragStart.y; applyTransform() });
viewport.addEventListener('pointerup', () => { dragging = false; viewport.classList.remove('dragging') });
viewport.addEventListener('wheel', e => { e.preventDefault(); const rect = viewport.getBoundingClientRect(), px = e.clientX - rect.left, py = e.clientY - rect.top, old = zoom; zoom = Math.max(.35, Math.min(1.5, zoom * (e.deltaY < 0 ? 1.08 : .92))); pan.x = px - (px - pan.x) * (zoom / old); pan.y = py - (py - pan.y) * (zoom / old); applyTransform() }, { passive: false });
$('#exportBtn').onclick = () => { const payload = { version: 2, title: 'Operating Systems', nodes: data, collapsed: [...collapsed], exportedAt: new Date().toISOString() }; const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'operating-systems-mindmap.json'; a.click(); URL.revokeObjectURL(a.href); showToast('마인드맵 데이터를 내보냈어.') };
const backdrop = $('#modalBackdrop');
$('#shareBtn').onclick = async () => { const payload = { v: 2, title: 'Operating Systems', data, collapsed: [...collapsed] }; const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload)))); const shareUrl = location.href.split('#')[0] + '#map=' + encoded; backdrop.classList.add('open'); $('#modalTitle').textContent = '공유 링크 만들기'; $('#modalDesc').textContent = location.protocol === 'file:' ? '현재는 로컬 파일로 열려 있어. 공유 링크를 다른 사람도 열 수 있게 하려면 먼저 웹 호스팅에 배포해야 해. 배포 후에는 이 링크에 마인드맵 데이터가 포함돼.' : '이 링크에는 현재 마인드맵 데이터가 포함돼 있어. 링크를 가진 사람은 같은 내용을 열 수 있어.'; $('#modalInput').value = shareUrl; $('#modalInput').readOnly = true; $('#modalConfirm').textContent = '링크 복사'; $('#modalConfirm').onclick = async () => { try { await navigator.clipboard.writeText(shareUrl); showToast('공유 링크를 복사했어.') } catch (e) { $('#modalInput').select(); document.execCommand('copy'); showToast('공유 링크를 복사했어.') } backdrop.classList.remove('open') }; $('#modalInput').style.display = 'none'; let link = $('#shareUrlDisplay'); if (!link) { link = document.createElement('div'); link.id = 'shareUrlDisplay'; link.className = 'share-url'; $('#modalInput').insertAdjacentElement('beforebegin', link) } link.textContent = shareUrl; link.style.display = 'block'; };
$('#modalCancel').onclick = () => backdrop.classList.remove('open'); backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.classList.remove('open') });
$('#importBtn').onclick = () => $('#importFile').click();
$('#importFile').addEventListener('change', async e => { const file = e.target.files[0]; if (!file) return; try { const obj = JSON.parse(await file.text()); const incoming = obj.data || obj.nodes; if (!Array.isArray(incoming) || !incoming.some(n => n.id === 'os' || n.id === 'root')) throw new Error('형식'); snapshot(); data = incoming.map(n => ({ ...n, children: Array.isArray(n.children) ? n.children : [], status: n.status || 'not-started' })); collapsed = new Set(obj.collapsed || []); normalizeLevels(); selected = node('chap1') ? 'chap1' : data[0].id; layout(); renderInspector(); persist(); showToast('마인드맵을 가져왔어.') } catch (err) { showToast('올바른 마인드맵 JSON 파일이 아니야.') } e.target.value = '' });
function loadSharedHash() { try { if (location.hash.startsWith('#map=')) { const obj = JSON.parse(decodeURIComponent(escape(atob(location.hash.slice(5))))); if (Array.isArray(obj.data) && obj.data.some(n => n.id === 'os')) { data = obj.data; collapsed = new Set(obj.collapsed || []); selected = 'chap1'; persist(); history.replaceState(null, '', location.pathname + location.search); showToast('공유된 마인드맵을 불러왔어.') } } } catch (e) { showToast('공유 링크를 읽을 수 없어.') } }
window.addEventListener('resize', () => { layout(); fitMap() });
document.addEventListener('keydown', e => { if (e.target.matches('input,textarea')) { if (e.key === 'Escape') e.target.blur(); return } if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undo() } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redo() } else if (e.key === 'Delete' || e.key === 'Backspace') { deleteNode() } else if (e.key === 'Escape') { $('#inspector').classList.remove('mobile-open') } });
loadSaved(); loadSharedHash(); normalizeLevels(); data.forEach(n => { if (!n.status) n.status = 'not-started' }); layout(); renderInspector(); persist(); setTimeout(fitMap, 100); document.fonts.ready.then(() => { layout(); fitMap() });
