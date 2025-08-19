// 年份顯示
document.getElementById("year").textContent = new Date().getFullYear();

const $grid = document.getElementById("grid");
const $count = document.getElementById("count");
const $speciesCount = document.getElementById("species-count");
const $genusCount = document.getElementById("genus-count");
const $inStockCount = document.getElementById("in-stock-count");

// 渲染卡片
function renderCards(data) {
  $grid.innerHTML = "";
  data.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="thumb"><img src="${item.img}" alt="${item.cn}" loading="lazy"></div>
      <div class="card-body">
        <div class="latin">${item.latin}</div>
        <div class="cn">${item.cn}</div>
        <div class="row">價格：${item.price ? "$" + item.price : "需詢價"}</div>
      </div>
    `;
    $grid.appendChild(card);
  });

  $count.textContent = `${data.length} 筆`;
  $speciesCount.textContent = data.length;

  // 統計屬數 & 現貨數
  const genusSet = new Set(data.map(d => d.genus));
  $genusCount.textContent = genusSet.size;
  $inStockCount.textContent = data.filter(d => d.stock === "in-stock").length;
}

// 從 JSON 載入資料
fetch("species.json")
  .then(res => res.json())
  .then(data => {
    renderCards(data);
  })
  .catch(err => console.error("讀取失敗", err));
