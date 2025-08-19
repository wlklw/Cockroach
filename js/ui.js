// js/ui.js

const $modal = document.getElementById('modal');
const $modalTitle = document.getElementById('modal-title');
const $modalSubtitle = document.getElementById('modal-subtitle');
const $modalImage = document.getElementById('modal-image');
const $modalInfo = document.getElementById('modal-info');
const $modalActions = document.getElementById('modal-actions');
const $closeModal = document.getElementById('close-modal');

function starSVG(fill){
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="${fill? '#f3c96a':'#3a4653'}" d="M12 17.3l-6.1 3.6 1.6-6.9L2 8.9l7-.6L12 1.9l3 6.4 7 .6-5.5 5.1 1.6 6.9z"/></svg>`
}

function getStockText(stock, count) {
  switch(stock) {
    case 'in-stock': return '現貨充足';
    case 'low-stock': return `僅剩 ${count} 隻`;
    case 'out-of-stock': return '缺貨中';
    default: return '現貨充足';
  }
}

function getBuyButtonInfo(stock) {
  switch(stock) {
    case 'out-of-stock': 
      return { text: '聯繫我們', class: 'btn contact', href: 'mailto:bumbuseximius@gmail.com?subject=詢問缺貨商品' };
    default: 
      return { text: '我想購買', class: 'btn add-to-cart', href: 'https://myship.7-11.com.tw/general/detail/GM2508133179359' };
  }
}

function showModal(item) {
    $modalTitle.textContent = item.latin;
    $modalSubtitle.textContent = item.cn;

    if (item.img) {
        $modalImage.src = item.img;
        $modalImage.alt = item.cn;
        $modalImage.style.display = 'block';
        $modalImage.onerror = function() { this.style.display = 'none'; };
    } else {
        $modalImage.style.display = 'none';
    }

    $modalInfo.innerHTML = `
        <div class="info-row"><div class="info-label">產地</div><div class="info-value">${item.origin}</div></div>
        <div class="info-row"><div class="info-label">特徵</div><div class="info-value">${item.features}</div></div>
        <div class="info-row"><div class="info-label">習性</div><div class="info-value">${item.habit}</div></div>
        <div class="info-row"><div class="info-label">溫濕度</div><div class="info-value">${item.temp}</div></div>
        <div class="info-row"><div class="info-label">食性</div><div class="info-value">${item.diet}</div></div>
        <div class="info-row"><div class="info-label">飼養難度</div><div class="info-value modal-difficulty"><span class="stars" aria-label="飼養難度 ${'★'.repeat(item.diff)}${'☆'.repeat(5-item.diff)}">${Array.from({length:5},(_,i)=>starSVG(i<item.diff)).join('')}</span></div></div>
        <div class="info-row"><div class="info-label">標籤</div><div class="info-value"><div class="modal-tags">${item.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}</div></div></div>
        <div class="info-row"><div class="info-label">重點提示</div><div class="info-value">${item.info}</div></div>
    `;

    const buyInfo = getBuyButtonInfo(item.stock);
    const stockBadgeText = getStockText(item.stock, item.stockCount);
    
    $modalActions.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; flex: 1;"><div class="stock-badge ${item.stock}" style="position: static; padding: 8px 12px;">${stockBadgeText}</div></div>
        <a href="${buyInfo.href}" class="${buyInfo.class}" target="_blank" rel="noopener">${buyInfo.text}</a>
    `;

    $modal.classList.add('show');
    $modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    $modal.classList.remove('show');
    $modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

export function initModalEventListeners() {
    $closeModal.addEventListener('click', hideModal);
    $modal.addEventListener('click', (e) => {
        if (e.target === $modal) { hideModal(); }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && $modal.classList.contains('show')) { hideModal(); }
    });
}

export function makeCard(item){
    const tpl = document.getElementById('card-tpl');
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.dataset.genus = item.genus;
    node.dataset.tags = item.tags.join(',');

    const thumb = node.querySelector('.thumb');
    if (item.img) {
        const img = document.createElement('img');
        img.dataset.src = item.img;
        img.alt = item.cn;
        img.className = 'lazy-image';
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:18px 18px 0 0;';
        img.onerror = function() { this.style.display = 'none'; thumb.innerHTML = '<div class="ph">圖片載入失敗</div>'; };
        img.onload = function() { this.classList.add('loaded'); };
        thumb.innerHTML = '<div class="lazy-placeholder">載入中...</div>';
        thumb.appendChild(img);
        
        const stockBadge = document.createElement('div');
        stockBadge.className = `stock-badge ${item.stock}`;
        stockBadge.textContent = getStockText(item.stock, item.stockCount);
        thumb.appendChild(stockBadge);
    }
  
    node.querySelector('.latin').textContent = `${item.latin}`;
    node.querySelector('.cn').textContent = item.cn;
    node.querySelector('.temp').textContent = `溫濕度：${item.temp}`;
    node.querySelector('.diet').textContent = `食性：${item.diet}`;
    node.querySelector('.diff').innerHTML = `難度：<span class="stars" aria-label="飼養難度 ${'★'.repeat(item.diff)}${'☆'.repeat(5-item.diff)}">${Array.from({length:5},(_,i)=>starSVG(i<item.diff)).join('')}</span>`;

    let priceText = (item.price === undefined || item.price === null) 
        ? '請洽詢' 
        : (item.pack ? `$${item.price}（${item.pack}隻一組）` : `$${item.price}`);
    const priceRow = document.createElement('div');
    priceRow.className = 'row price';
    priceRow.innerHTML = `價格：${priceText}`;
    node.querySelector('.card-body').insertBefore(priceRow, node.querySelector('.buy'));

    if (window.innerWidth <= 720) {
        node.style.cursor = 'pointer';
        node.addEventListener('click', (e) => {
            if (!e.target.closest('.btn')) {
                e.preventDefault();
                showModal(item);
            }
        });
    }

    const btnInfo = node.querySelector('.buy .btn');
    btnInfo.addEventListener('click', e=>{
        e.preventDefault();
        e.stopPropagation();
        showModal(item);
    });

    return node;
}
