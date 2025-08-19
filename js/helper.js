// js/helper.js
import { DATA } from './data.js';
import { showModal } from './ui.js';

let helperData = {
    experience: null,
    budget: null,
    currentStep: 1
};

function getRecommendations() {
    let filtered = DATA.filter(item => item.stock === 'in-stock');
    
    // 根據經驗篩選
    if (helperData.experience === 'beginner') {
        filtered = filtered.filter(item => item.diff <= 2);
    } else if (helperData.experience === 'some') {
        filtered = filtered.filter(item => item.diff <= 3);
    }
    
    // 根據預算篩選
    if (helperData.budget === 'low') {
        filtered = filtered.filter(item => item.price && item.price < 500);
    } else if (helperData.budget === 'medium') {
        filtered = filtered.filter(item => item.price && item.price >= 500 && item.price <= 1000);
    } else if (helperData.budget === 'high') {
        filtered = filtered.filter(item => item.price && item.price > 1000);
    }
    
    // 排序：難度低的優先，價格低的優先
    return filtered.sort((a, b) => {
        if (a.diff !== b.diff) return a.diff - b.diff;
        if (a.price && b.price) return a.price - b.price;
        return 0;
    }).slice(0, 3);
}

function renderRecommendations() {
    const recommendations = getRecommendations();
    const container = document.getElementById('helper-recommendations');
    
    if (recommendations.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--muted);">抱歉，沒有符合條件的現貨商品。建議調整篩選條件或聯繫我們了解更多選項。</p>';
        return;
    }
    
    container.innerHTML = recommendations.map(item => {
        const priceText = item.pack ? `$${item.price}（${item.pack}隻一組）` : `$${item.price}`;
        const difficultyStars = '★'.repeat(item.diff) + '☆'.repeat(5 - item.diff);
        
        return `
            <div class="recommendation-card" onclick="showItemFromHelper('${item.latin}')">
                <div class="rec-info">
                    <h4>${item.cn}</h4>
                    <p>${item.latin} | 難度：${difficultyStars}</p>
                </div>
                <div class="rec-price">${priceText}</div>
            </div>
        `;
    }).join('');
}

function showHelper() {
    document.getElementById('helper-modal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeHelper() {
    document.getElementById('helper-modal').classList.remove('show');
    document.body.style.overflow = '';
    resetHelper();
}

function resetHelper() {
    helperData = { experience: null, budget: null, currentStep: 1 };
    showStep(1);
    document.querySelectorAll('.helper-option').forEach(opt => opt.classList.remove('selected'));
}

function showStep(step) {
    document.querySelectorAll('.helper-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`helper-step-${step}`).classList.add('active');
    
    const prevBtn = document.getElementById('helper-prev');
    const nextBtn = document.getElementById('helper-next');
    const navContainer = document.getElementById('helper-navigation');
    
    if (step === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = helperData.experience ? 'block' : 'none';
        navContainer.style.display = 'flex';
    } else if (step === 2) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = helperData.budget ? 'block' : 'none';
        navContainer.style.display = 'flex';
    } else {
        navContainer.style.display = 'none';
    }
    
    helperData.currentStep = step;
}

function selectHelperOption(step, value, element) {
    // 清除同步驟其他選項
    element.parentElement.querySelectorAll('.helper-option').forEach(opt => 
        opt.classList.remove('selected')
    );
    element.classList.add('selected');
    
    if (step === 1) {
        helperData.experience = value;
    } else if (step === 2) {
        helperData.budget = value;
    }
    
    // 顯示下一步按鈕
    const nextBtn = document.getElementById('helper-next');
    if (nextBtn) nextBtn.style.display = 'block';
}

function helperNextStep() {
    if (helperData.currentStep === 1 && helperData.experience) {
        showStep(2);
    } else if (helperData.currentStep === 2 && helperData.budget) {
        renderRecommendations();
        showStep('results');
    }
}

function helperPrevStep() {
    if (helperData.currentStep === 2) {
        showStep(1);
    }
}

function restartHelper() {
    resetHelper();
}

function showItemFromHelper(latin) {
    const item = DATA.find(x => x.latin === latin);
    if (item) {
        closeHelper();
        setTimeout(() => {
            showModal(item);
        }, 300);
    }
}

// 初始化函數
export function initHelper() {
    // 添加 CSS
    const style = document.createElement('style');
    style.textContent = helperCSS;
    document.head.appendChild(style);
    
    // 添加 HTML
    document.body.insertAdjacentHTML('beforeend', helperHTML);
    
    // 綁定全域函數（為了 onclick 事件）
    window.showHelper = showHelper;
    window.closeHelper = closeHelper;
    window.selectHelperOption = selectHelperOption;
    window.helperNextStep = helperNextStep;
    window.helperPrevStep = helperPrevStep;
    window.restartHelper = restartHelper;
    window.showItemFromHelper = showItemFromHelper;
    
    // ESC 鍵關閉
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('helper-modal').classList.contains('show')) {
            closeHelper();
        }
    });
    
    // 點擊背景關閉
    document.getElementById('helper-modal').addEventListener('click', (e) => {
        if (e.target.id === 'helper-modal') {
            closeHelper();
        }
    });
}

// CSS 樣式
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

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.helper-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--ring);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.helper-header h3 {
  margin: 0;
  color: var(--text);
  font-size: 18px;
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

.helper-step h4 {
  color: var(--text);
  font-size: 16px;
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
  flex-shrink: 0;
}

.helper-content {
  flex: 1;
}

.helper-content h4 {
  margin: 0 0 4px 0;
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
}

.helper-content p {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.4;
}

.helper-nav {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: 20px;
}

.helper-nav .btn {
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--ring);
  background: var(--panel);
  color: var(--text);
  transition: all 0.2s;
}

.helper-nav .btn:hover {
  background: var(--accent);
  border-color: var(--brand);
}

.helper-nav .btn.primary {
  background: var(--brand);
  color: #07110e;
  border-color: var(--brand);
}

.helper-nav .btn.primary:hover {
  background: #1ea374;
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
  cursor: pointer;
  transition: all 0.2s;
}

.recommendation-card:hover {
  border-color: var(--brand);
  background: var(--accent);
}

.rec-info {
  flex: 1;
}

.rec-info h4 {
  margin: 0 0 4px 0;
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
}

.rec-info p {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
  line-height: 1.3;
}

.rec-price {
  background: var(--brand);
  color: #07110e;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  margin-left: 12px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--muted);
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: var(--text);
}
`;

// HTML 模板
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
      <div class="helper-step" id="helper-step-results">
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
