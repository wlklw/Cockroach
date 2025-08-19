
    let DATA = [];

     const genusOrder = [
      "Therea","Gyna","Princisia","Elliptorhina","Aeluropoda","Pseudoglomeris","Eucorydia","Macropanesthia"
    ];

    const $grid = document.getElementById('grid');
    const $count = document.getElementById('count');
    const $tabs = document.querySelector('.genus-tabs');
    const $q = document.getElementById('q');
    const $difficulty = document.getElementById('difficulty');
    const $chips = Array.from(document.querySelectorAll('.chip'));

    // Modal 元素
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

    // 獲取庫存狀態顯示文字
    function getStockText(stock, count) {
      switch(stock) {
        case 'in-stock': return '現貨充足';
        case 'low-stock': return `僅剩 ${count} 隻`;
        case 'out-of-stock': return '缺貨中';
        default: return '現貨充足';
      }
    }

    // 獲取購買按鈕文字和樣式
    function getBuyButtonInfo(stock) {
      switch(stock) {
        case 'out-of-stock': 
          return { text: '聯繫我們', class: 'btn contact', href: 'mailto:bumbuseximius@gmail.com?subject=詢問缺貨商品' };
        default: 
          return { text: '我想購買', class: 'btn add-to-cart', href: 'https://myship.7-11.com.tw/general/detail/GM2508133179359' };
      }
    }

// 選購小幫手
const helperCSS = `
.helper-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 2000;
  overflow-y: auto;
}

.helper-modal.show {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.helper-container {
  background: var(--card);
  border: 1px solid var(--ring);
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.3s ease;
}

.helper-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--ring);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.helper-body {
  padding: 20px 24px;
}

.helper-step {
  display: none;
}

.helper-step.active {
  display: block;
  animation: slideIn 0.3s ease;
}

.helper-option {
  background: var(--panel);
  border: 2px solid var(--ring);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.helper-option:hover {
  border-color: var(--brand);
  background: var(--accent);
}

.helper-option.selected {
  border-color: var(--brand);
  background: rgba(33, 196, 140, 0.1);
}

.helper-icon {
  font-size: 24px;
  width: 40px;
  text-align: center;
}

.helper-content h4 {
  margin: 0 0 4px 0;
  color: var(--text);
}

.helper-content p {
  margin: 0;
  font-size: 14px;
  color: var(--muted);
}

.helper-nav {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: 20px;
}

.recommendation-card {
  background: var(--panel);
  border-radius: 10px;
  padding: 12px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--ring);
}

.rec-info h4 {
  margin: 0 0 4px 0;
  color: var(--text);
}

.rec-info p {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

.rec-price {
  background: var(--brand);
  color: #07110e;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}
`;

// 2. 選購小幫手的 HTML 結構
const helperHTML = `
<div id="helper-modal" class="helper-modal">
  <div class="helper-container">
    <div class="helper-header">
      <h3>🔍 選購小幫手</h3>
      <button class="close-btn" onclick="closeHelper()">&times;</button>
    </div>
    <div class="helper-body">
      <!-- Step 1 -->
      <div class="helper-step active" id="helper-step-1">
        <h4 style="margin-bottom: 16px;">您的飼養經驗如何？</h4>
        <div class="helper-option" data-value="beginner" onclick="selectHelperOption(1, 'beginner', this)">
          <div class="helper-icon">🌱</div>
          <div class="helper-content">
            <h4>完全新手</h4>
            <p>第一次飼養蜚蠊，希望簡單好照顧</p>
          </div>
        </div>
        <div class="helper-option" data-value="some" onclick="selectHelperOption(1, 'some', this)">
          <div class="helper-icon">🌿</div>
          <div class="helper-content">
            <h4>有點經驗</h4>
            <p>養過其他昆蟲，想嘗試新品種</p>
          </div>
        </div>
        <div class="helper-option" data-value="experienced" onclick="selectHelperOption(1, 'experienced', this)">
          <div class="helper-icon">🌳</div>
          <div class="helper-content">
            <h4>經驗豐富</h4>
            <p>想挑戰更特別的品種</p>
          </div>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="helper-step" id="helper-step-2">
        <h4 style="margin-bottom: 16px;">您的預算範圍？</h4>
        <div class="helper-option" data-value="low" onclick="selectHelperOption(2, 'low', this)">
          <div class="helper-icon">💰</div>
          <div class="helper-content">
            <h4>$500 以下</h4>
            <p>想先試試看，不要太貴</p>
          </div>
        </div>
        <div class="helper-option" data-value="medium" onclick="selectHelperOption(2, 'medium', this)">
          <div class="helper-icon">💳</div>
          <div class="helper-content">
            <h4>$500 - $1000</h4>
            <p>可以接受中等價位的品種</p>
          </div>
        </div>
        <div class="helper-option" data-value="high" onclick="selectHelperOption(2, 'high', this)">
          <div class="helper-icon">💎</div>
          <div class="helper-content">
            <h4>$1000 以上</h4>
            <p>想要特殊或稀有的品種</p>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="helper-step" id="helper-results">
        <h4 style="margin-bottom: 16px;">為您推薦</h4>
        <div id="helper-recommendations"></div>
        <div class="helper-nav">
          <button class="btn" onclick="restartHelper()">🔄 重新選擇</button>
          <button class="btn primary" onclick="closeHelper()">✨ 開始選購</button>
        </div>
      </div>

      <!-- Navigation -->
      <div class="helper-nav" id="helper-navigation">
        <button class="btn" onclick="helperPrevStep()" id="helper-prev" style="display: none;">← 上一步</button>
        <button class="btn primary" onclick="helperNextStep()" id="helper-next" style="display: none;">下一步 →</button>
      </div>
    </div>
  </div>
</div>
`;

// 3. JavaScript 邏輯
let helperStep = 1;
let helperAnswers = {};

// 推薦資料（對應你網站的實際商品）
const helperRecommendations = {
  'beginner-low': [
    { latin: 'Therea bernhardti', cn: '多米諾骨牌蜚蠊', price: 450, reason: '新手最愛！超好養' },
    { latin: 'Gyna caffrorum', cn: '卡佛爾瓷蠊', price: 300, reason: '最便宜的入門選擇' }
  ],
  'beginner-medium': [
    { latin: 'Therea regularis', cn: '多米諾橘骨牌蜚蠊', price: 700, reason: '顏色更漂亮' },
    { latin: 'Gyna centurio', cn: '百夫長瓷蠊', price: 400, reason: '雌雄差異明顯' }
  ],
  'some-medium': [
    { latin: 'Therea olegrandjeani', cn: '問號蜚蠊', price: 450, reason: '特殊問號花紋' }
  ],
  'experienced-high': [
    { latin: 'Pseudoglomeris magnifica', cn: '越南金屬蜚蠊', price: null, reason: '華麗金屬光澤，進階挑戰' }
  ]
};

function showHelper() {
  document.getElementById('helper-modal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeHelper() {
  document.getElementById('helper-modal').classList.remove('show');
  document.body.style.overflow = '';
}

function selectHelperOption(step, value, element) {
  // 清除同步驟的其他選擇
  element.parentNode.querySelectorAll('.helper-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  // 選中當前選項
  element.classList.add('selected');
  helperAnswers[step] = value;
  
  // 顯示下一步按鈕
  document.getElementById('helper-next').style.display = 'block';
}

function helperNextStep() {
  if (helperStep < 2) {
    document.getElementById(`helper-step-${helperStep}`).classList.remove('active');
    helperStep++;
    document.getElementById(`helper-step-${helperStep}`).classList.add('active');
    
    document.getElementById('helper-prev').style.display = 'block';
    document.getElementById('helper-next').style.display = 'none';
  } else {
    // 顯示結果
    showHelperResults();
  }
}

function helperPrevStep() {
  if (helperStep > 1) {
    document.getElementById(`helper-step-${helperStep}`).classList.remove('active');
    helperStep--;
    document.getElementById(`helper-step-${helperStep}`).classList.add('active');
    
    if (helperStep === 1) {
      document.getElementById('helper-prev').style.display = 'none';
    }
  }
}

function showHelperResults() {
  document.getElementById(`helper-step-${helperStep}`).classList.remove('active');
  document.getElementById('helper-results').classList.add('active');
  document.getElementById('helper-navigation').style.display = 'none';
  
  // 生成推薦
  const key = `${helperAnswers[1]}-${helperAnswers[2]}`;
  const recs = helperRecommendations[key] || helperRecommendations['beginner-low'];
  
  const html = recs.map(rec => `
    <div class="recommendation-card" onclick="selectSpecies('${rec.latin}')">
      <div class="rec-info">
        <h4>${rec.cn}</h4>
        <p>${rec.latin} | ${rec.reason}</p>
      </div>
      <div class="rec-price">${rec.price ? '$' + rec.price : '詢價'}</div>
    </div>
  `).join('');
  
  document.getElementById('helper-recommendations').innerHTML = html;
}

function selectSpecies(latin) {
  // 關閉 helper，並在主頁面搜尋該物種
  closeHelper();
  document.getElementById('q').value = latin;
  document.getElementById('q').dispatchEvent(new Event('input')); // 觸發搜尋
  
  // 滾動到結果區域
  document.getElementById('grid').scrollIntoView({ behavior: 'smooth' });
}

function restartHelper() {
  helperStep = 1;
  helperAnswers = {};
  
  document.querySelectorAll('.helper-step').forEach(step => step.classList.remove('active'));
  document.getElementById('helper-step-1').classList.add('active');
  
  document.getElementById('helper-navigation').style.display = 'flex';
  document.getElementById('helper-prev').style.display = 'none';
  document.getElementById('helper-next').style.display = 'none';
  
  document.querySelectorAll('.helper-option').forEach(opt => opt.classList.remove('selected'));
}
    
    // 🔍 新增：在這裡插入搜尋建議功能
    function initSearchSuggestions() {
  const searchInput = document.getElementById('q');
  const suggestionsDiv = document.getElementById('search-suggestions');
  let selectedIndex = -1;
  
  // 建立搜尋索引
  const searchIndex = DATA.flatMap(item => [
    { text: item.latin, type: 'latin', item },
    { text: item.cn, type: 'chinese', item },
    { text: item.genus, type: 'genus', item },
    ...item.tags.map(tag => ({ text: tag, type: 'tag', item }))
  ]);
  
  // ⭐ 添加實際的搜尋功能
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length < 2) {
      suggestionsDiv.style.display = 'none';
      return;
    }
    
    const matches = searchIndex
      .filter(item => item.text.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
    
    if (matches.length > 0) {
      suggestionsDiv.innerHTML = matches.map(match => 
        `<div class="suggestion-item">${highlightMatch(match.text, query)}</div>`
      ).join('');
      suggestionsDiv.style.display = 'block';
    } else {
      suggestionsDiv.style.display = 'none';
    }
  });
  
  // 點擊外部關閉建議
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      suggestionsDiv.style.display = 'none';
    }
  });
}
      
// 監聽價格篩選
$priceFilter = document.getElementById('price-filter');
$priceFilter.addEventListener('change', updateGrid);

function filterByPrice(items) {
  const value = $priceFilter.value;
  if (!value) return items;
  if (value === 'contact') {
    return items.filter(x => x.price === undefined);
  }
  if (value.endsWith('+')) {
    const min = parseInt(value.replace('+', ''), 10);
    return items.filter(x => x.price !== undefined && x.price >= min);
  }
  const [min, max] = value.split('-').map(Number);
  return items.filter(x => x.price !== undefined && x.price >= min && x.price <= max);
}

// 更新卡片顯示
function updateGrid() {
  let filtered = DATA;
  // ...原本的 genus、難度、搜尋等過濾
  // 加上價格過濾
  filtered = filterByPrice(filtered);
  // ...剩下的渲染卡片
}
    
    function highlightMatch(text, query) {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
    }
    
    function updateSelection(items) {
      items.forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndex);
      });
    }
    
    function showModal(item) {
      $modalTitle.textContent = item.latin;
      $modalSubtitle.textContent = item.cn;

      // 設置圖片
      if (item.img) {
        $modalImage.src = item.img;
        $modalImage.alt = item.cn;
        $modalImage.style.display = 'block';
        $modalImage.onerror = function() {
          this.style.display = 'none';
        };
      } else {
        $modalImage.style.display = 'none';
      }

      // 生成詳細資訊
      $modalInfo.innerHTML = `
        <div class="info-row">
          <div class="info-label">產地</div>
          <div class="info-value">${item.origin}</div>
        </div>
        <div class="info-row">
          <div class="info-label">特徵</div>
          <div class="info-value">${item.features}</div>
        </div>
        <div class="info-row">
          <div class="info-label">習性</div>
          <div class="info-value">${item.habit}</div>
        </div>
        <div class="info-row">
          <div class="info-label">溫濕度</div>
          <div class="info-value">${item.temp}</div>
        </div>
        <div class="info-row">
          <div class="info-label">食性</div>
          <div class="info-value">${item.diet}</div>
        </div>
        <div class="info-row">
          <div class="info-label">飼養難度</div>
          <div class="info-value modal-difficulty">
            <span class="stars" aria-label="飼養難度 ${'★'.repeat(item.diff)}${'☆'.repeat(5-item.diff)}">
              ${Array.from({length:5},(_,i)=>starSVG(i<item.diff)).join('')}
            </span>
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">標籤</div>
          <div class="info-value">
            <div class="modal-tags">
              ${item.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">重點提示</div>
          <div class="info-value">${item.info}</div>
        </div>
      `;

      // 生成購買按鈕
      const buyInfo = getBuyButtonInfo(item.stock);
      const stockBadgeText = getStockText(item.stock, item.stockCount);
      
      $modalActions.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
          <div class="stock-badge ${item.stock}" style="position: static; padding: 8px 12px;">
            ${stockBadgeText}
          </div>
        </div>
        <a href="${buyInfo.href}" class="${buyInfo.class}" target="_blank" rel="noopener">
          ${buyInfo.text}
        </a>
      `;

      // 顯示 Modal
      $modal.classList.add('show');
      $modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // 防止背景滾動
    }

    function hideModal() {
      $modal.classList.remove('show');
      $modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // 恢復背景滾動
    }

    // Modal 事件監聽器
    $closeModal.addEventListener('click', hideModal);
    $modal.addEventListener('click', (e) => {
      if (e.target === $modal) { // 點擊背景關閉
        hideModal();
      }
    });

    // ESC 鍵關閉 Modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && $modal.classList.contains('show')) {
        hideModal();
      }
    });

    function makeCard(item){
  const tpl = document.getElementById('card-tpl');
  const node = tpl.content.firstElementChild.cloneNode(true);
  node.dataset.genus = item.genus;
  node.dataset.tags = item.tags.join(',');

  const thumb = node.querySelector('.thumb');
  if (item.img) {
    const img = document.createElement('img');
    img.dataset.src = item.img; // 使用 data-src 而不是 src
    img.alt = item.cn;
    img.className = 'lazy-image';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:18px 18px 0 0;';

    img.onerror = function() {
      this.style.display = 'none';
      thumb.innerHTML = '<div class="ph">圖片載入失敗</div>';
    };

    img.onload = function() {
      this.classList.add('loaded');
    };

    thumb.innerHTML = '<div class="lazy-placeholder">載入中...</div>';
    thumb.appendChild(img);
    
    const stockBadge = document.createElement('div');
    stockBadge.className = `stock-badge ${item.stock}`;
    stockBadge.textContent = getStockText(item.stock, item.stockCount);
    thumb.appendChild(stockBadge);
  }
  
  node.querySelector('.latin').textContent = `${item.latin}`;
  node.querySelector('.cn').textContent = item.cn;
  const meta = node.querySelector('.meta');
  meta.innerHTML = '';
  node.querySelector('.temp').textContent = `溫濕度：${item.temp}`;
  node.querySelector('.diet').textContent = `食性：${item.diet}`;

  const diffRow = node.querySelector('.diff');
  diffRow.innerHTML = `難度：<span class="stars" aria-label="飼養難度 ${'★'.repeat(item.diff)}${'☆'.repeat(5-item.diff)}">${Array.from({length:5},(_,i)=>starSVG(i<item.diff)).join('')}</span>`;

  // === 價格顯示統一寫法 ===
  let priceText;
  if (item.price === undefined || item.price === null) {
    priceText = '請洽詢';
  } else if (item.pack) {
    priceText = `$${item.price}（${item.pack}隻一組）`;
  } else {
    priceText = `$${item.price}`;
  }
  const priceRow = document.createElement('div');
  priceRow.className = 'row price';
  priceRow.innerHTML = `<span class="price-label">價格</span> <span class="price-value">${priceText}</span>`;
  const cardBody = node.querySelector('.card-body');
  const buySection = node.querySelector('.buy');
  cardBody.insertBefore(priceRow, buySection);

  // 手機版整張卡片點擊
  const isMobile = window.innerWidth <= 720;
  if (isMobile) {
    node.style.cursor = 'pointer';
    node.addEventListener('click', (e) => {
      // 如果點擊的不是按鈕，就開啟 Modal
      if (!e.target.closest('.btn')) {
        e.preventDefault();
        showModal(item);
      }
    });
  }

  // 詳細介紹按鈕
  const btnInfo = node.querySelector('.buy .btn');
  btnInfo.href = `#${item.genus}-${item.species}`;
  btnInfo.addEventListener('click', e=>{
    e.preventDefault();
    e.stopPropagation(); // 防止觸發卡片點擊
    showModal(item);
  });

  // 最後只 return 一次
  return node;
}

    function render(genusFilter, query, diffFilter, tagSet) {
  $grid.innerHTML = '';
  let list = [...DATA];

  // 屬別篩選
  if (genusFilter && genusFilter !== "ALL") {
    list = list.filter(x => x.genus === genusFilter);
  }

  // 關鍵字搜尋
  if (query) {
    const q = query.trim().toLowerCase();
    list = list.filter(x =>
      `${x.latin} ${x.cn} ${x.features} ${x.habit} ${x.origin}`.toLowerCase().includes(q)
    );
  }

  // 難度篩選
  if (diffFilter) {
    list = list.filter(x => x.diff === Number(diffFilter));
  }

  // Tag 篩選
  if (tagSet && tagSet.size) {
    list = list.filter(x => x.tags && x.tags.some(t => tagSet.has(t)));
  }

  // 價格篩選（整合於此）
  const priceFilter = document.getElementById('price-filter').value;
  if (priceFilter) {
    list = list.filter(x => {
      if (priceFilter === "0-500") {
        return typeof x.price === "number" && x.price < 500;
      }
      if (priceFilter === "500-1000") {
        return typeof x.price === "number" && x.price >= 500 && x.price <= 1000;
      }
      if (priceFilter === "1000-2000") {
        return typeof x.price === "number" && x.price >= 1000 && x.price <= 2000;
      }
      if (priceFilter === "2000+") {
        return typeof x.price === "number" && x.price > 2000;
      }
      if (priceFilter === "contact") {
        return x.price === undefined || x.price === null;
      }
      return true; // "不限"選項
    });
  }

  // 渲染卡片
  list.forEach(item => $grid.appendChild(makeCard(item)));
  $count.textContent = `${list.length} 筆`;
  const title = document.getElementById('section-title');
  title.textContent = genusFilter && genusFilter !== "ALL" ? `${genusFilter} 屬` : '全部物種';
}

    function buildTabs(){
      const uniq = Array.from(new Set(DATA.map(x=>x.genus)));
      const ordered = genusOrder.filter(g=>uniq.includes(g)).concat(uniq.filter(g=>!genusOrder.includes(g)));
      const all = document.createElement('button'); all.className='tab active'; all.role='tab'; all.textContent='全部'; all.dataset.genus='ALL';
      $tabs.appendChild(all);
      ordered.forEach(g=>{
        const b = document.createElement('button');
        b.className='tab'; b.role='tab'; b.dataset.genus=g; b.textContent=g;
        $tabs.appendChild(b);
      });
    }

    function updateStats() {
      // 更新統計數據
      const totalSpecies = DATA.length;
      const totalGenus = new Set(DATA.map(x => x.genus)).size;
      const inStockCount = DATA.filter(x => x.stock === 'in-stock').length;
      
      document.getElementById('species-count').textContent = totalSpecies;
      document.getElementById('genus-count').textContent = totalGenus;
      document.getElementById('in-stock-count').textContent = inStockCount;
    }

    // 3. 新增懶加載觀察器
function initLazyLoading() {
  // 檢查瀏覽器支援
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const placeholder = img.previousElementSibling;
          
          // 載入真實圖片
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          
          // 移除 placeholder
          if (placeholder && placeholder.classList.contains('lazy-placeholder')) {
            placeholder.remove();
          }
          
          // 停止觀察這張圖片
          observer.unobserve(img);
        }
      });
    }, {
      // 提前 50px 開始載入
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // 觀察所有懶加載圖片
    function observeLazyImages() {
      document.querySelectorAll('.lazy-image[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // 當新卡片被創建時重新觀察
    const gridObserver = new MutationObserver(() => {
      observeLazyImages();
    });

    gridObserver.observe(document.getElementById('grid'), {
      childList: true,
      subtree: true
    });

    // 初始觀察
    observeLazyImages();
  } else {
    // 降級處理：直接載入所有圖片
    setTimeout(() => {
      document.querySelectorAll('.lazy-image[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
      });
    }, 100);
  }
}

// 4. 手機版觸控手勢支援
function initTouchGestures() {
  let touchStartX = 0;
  let touchStartY = 0;
  
  // 卡片滑動手勢 (左滑快速查看詳情)
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  
  document.addEventListener('touchend', (e) => {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // 檢查是否為水平滑動且在卡片上
    const card = e.target.closest('.card');
    if (card && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) { // 左滑
        // 觸發詳細查看
        const genus = card.dataset.genus;
        const tags = card.dataset.tags;
        const item = DATA.find(x => x.genus === genus && x.tags.join(',') === tags);
        if (item) showModal(item);
      }
    }
    
    touchStartX = 0;
    touchStartY = 0;
  }, { passive: true });
}

    function initFilters(){
  const activeTags = new Set();
  let activeGenus = 'ALL';

  function sync(){
    render(activeGenus, $q.value, $difficulty.value, activeTags);
    document.querySelectorAll('.tab').forEach(t=>{
      t.classList.toggle('active', t.dataset.genus===activeGenus);
    });
    document.querySelectorAll('.chip').forEach(c=>{
      c.classList.toggle('active', activeTags.has(c.dataset.tag));
    });
    const hash = `#g=${encodeURIComponent(activeGenus)}&q=${encodeURIComponent($q.value)}&d=${$difficulty.value}&t=${encodeURIComponent([...activeTags].join(','))}`;
    history.replaceState(null,'',hash);
  }

  // 標籤點擊
  $tabs.addEventListener('click', e=>{
    const t = e.target.closest('.tab');
    if (t) {
      activeGenus = t.dataset.genus;
      sync();
    }
  });

  // 搜尋 input debounce
  const debouncedSync = debounce(sync, 300);
  $q.addEventListener('input', debouncedSync);

  // 難度選擇
  $difficulty.addEventListener('change', sync);

  // tag chip 點擊與鍵盤
  $chips.forEach(c=>{
    c.addEventListener('click', ()=>{
      const k = c.dataset.tag;
      activeTags.has(k) ? activeTags.delete(k) : activeTags.add(k);
      sync();
    });
    c.addEventListener('keydown', (ev)=>{
      if(ev.key==='Enter' || ev.key===' '){
        ev.preventDefault();
        c.click();
      }
    });
  });

  // restore from hash
  const params = new URLSearchParams(location.hash.replace(/^#/,''));
  const g = params.get('g'), q = params.get('q'), d = params.get('d'), t = params.get('t');
  if(g){ activeGenus = decodeURIComponent(g); }
  if(q){ $q.value = decodeURIComponent(q); }
  if(d){ $difficulty.value = d; }
  if(t){ decodeURIComponent(t).split(',').filter(Boolean).forEach(x=>activeTags.add(x)); }

  sync();
}

    function init(){
  document.getElementById('year').textContent = new Date().getFullYear();
  buildTabs();
  updateStats();
  initFilters();
  initSearchSuggestions();
  
  // 新增功能
  initLazyLoading();
  initTouchGestures();
  initMobileFilters(); // 手機版篩選器
  initHelper();
  
  // 手機版提示
  if (window.innerWidth <= 720) {
    console.log('💡 手機版提示：左滑卡片可快速查看詳情，點擊卡片查看完整資訊');
  }
}
    // 6. 手機版篩選器改進
function initMobileFilters() {
  if (window.innerWidth <= 720) {
    // 篩選器收合功能
    const toolbar = document.querySelector('.toolbar');
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '篩選 ▼';
    toggleBtn.className = 'filter-toggle btn';
    toggleBtn.style.cssText = 'margin-bottom: 8px; width: 100%;';
    
    let isExpanded = false;
    toggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      toolbar.style.display = isExpanded ? 'flex' : 'none';
      toggleBtn.textContent = isExpanded ? '收起 ▲' : '篩選 ▼';
    });
    
    toolbar.parentNode.insertBefore(toggleBtn, toolbar);
    toolbar.style.display = 'none'; // 預設收合
  }
}

// 7. 性能優化 - 防抖搜尋
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

    function initHelper() {
  // 注入 CSS
  const style = document.createElement('style');
  style.textContent = helperCSS;
  document.head.appendChild(style);
  
  // 注入 HTML
  document.body.insertAdjacentHTML('beforeend', helperHTML);
  
  // 在工具欄加入觸發按鈕
  const toolbar = document.querySelector('.toolbar');
  const helperBtn = document.createElement('button');
  helperBtn.className = 'btn primary';
  helperBtn.innerHTML = '🔍 選購小幫手';
  helperBtn.onclick = showHelper;
  toolbar.appendChild(helperBtn);
}
    
    fetch('species.json').then(r=>r.json()).then(json=>{ DATA = json; init(); }).catch(err=>console.error('載入 species.json 失敗', err));

    // 動態更新庫存狀態
    function updateStock(genus, species, newStock, newCount) {
      const item = DATA.find(item => item.genus === genus && item.species === species);
      if (item) {
        item.stock = newStock;
        item.stockCount = newCount;
        // 重新渲染該物種的卡片
        initFilters(); // 觸發重新渲染
        updateStats(); // 更新統計數據
        console.log(`${item.cn} 庫存已更新為：${getStockText(newStock, newCount)}`);
      }
    }

    // 平滑滾動到錨點
    document.addEventListener('DOMContentLoaded', function() {
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href.startsWith('#') && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        });
      });
    });

  

/* --- SCRIPT SPLIT --- */


    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  