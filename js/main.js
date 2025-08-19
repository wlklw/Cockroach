// js/main.js
import { DATA, genusOrder } from './data.js';
import { makeCard, initModalEventListeners } from './ui.js';

const $grid = document.getElementById('grid');
const $count = document.getElementById('count');
const $tabs = document.querySelector('.genus-tabs');
const $q = document.getElementById('q');
const $difficulty = document.getElementById('difficulty');
const $priceFilter = document.getElementById('price-filter');
const $chips = Array.from(document.querySelectorAll('.chip'));

function render(genusFilter, query, diffFilter, tagSet, priceValue) {
    $grid.innerHTML = '';
    let list = [...DATA];

    if (genusFilter && genusFilter !== "ALL") {
        list = list.filter(x => x.genus === genusFilter);
    }

    if (query) {
        const q = query.trim().toLowerCase();
        list = list.filter(x => `${x.latin} ${x.cn} ${x.features} ${x.habit} ${x.origin}`.toLowerCase().includes(q));
    }

    if (diffFilter) {
        list = list.filter(x => x.diff === Number(diffFilter));
    }

    if (tagSet && tagSet.size) {
        list = list.filter(x => x.tags && x.tags.some(t => tagSet.has(t)));
    }

    if (priceValue) {
        list = list.filter(x => {
            if (priceValue === "contact") return x.price === undefined || x.price === null;
            if (x.price === undefined || x.price === null) return false;
            if (priceValue === "0-500") return x.price < 500;
            if (priceValue === "500-1000") return x.price >= 500 && x.price <= 1000;
            if (priceValue === "1000-2000") return x.price >= 1000 && x.price <= 2000;
            if (priceValue === "2000+") return x.price > 2000;
            return true;
        });
    }

    list.forEach(item => $grid.appendChild(makeCard(item)));
    $count.textContent = `${list.length} 筆`;
    document.getElementById('section-title').textContent = genusFilter && genusFilter !== "ALL" ? `${genusFilter} 屬` : '全部物種';
}

function buildTabs(){
    const uniq = Array.from(new Set(DATA.map(x=>x.genus)));
    const ordered = genusOrder.filter(g=>uniq.includes(g)).concat(uniq.filter(g=>!genusOrder.includes(g)));
    const all = document.createElement('button');
    all.className='tab active';
    all.role='tab';
    all.textContent='全部';
    all.dataset.genus='ALL';
    $tabs.appendChild(all);
    ordered.forEach(g=>{
        const b = document.createElement('button');
        b.className='tab';
        b.role='tab';
        b.dataset.genus=g;
        b.textContent=g;
        $tabs.appendChild(b);
    });
}

function updateStats() {
    document.getElementById('species-count').textContent = DATA.length;
    document.getElementById('genus-count').textContent = new Set(DATA.map(x => x.genus)).size;
    document.getElementById('in-stock-count').textContent = DATA.filter(x => x.stock === 'in-stock').length;
}

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const placeholder = img.previousElementSibling;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    if (placeholder && placeholder.classList.contains('lazy-placeholder')) {
                        placeholder.remove();
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px 0px', threshold: 0.01 });

        const observeLazyImages = () => document.querySelectorAll('.lazy-image[data-src]').forEach(img => imageObserver.observe(img));
        const gridObserver = new MutationObserver(observeLazyImages);
        gridObserver.observe($grid, { childList: true, subtree: true });
        observeLazyImages();
    } else {
        setTimeout(() => {
            document.querySelectorAll('.lazy-image[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            });
        }, 100);
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initFilters(){
    const activeTags = new Set();
    let activeGenus = 'ALL';

    function sync(){
        render(activeGenus, $q.value, $difficulty.value, activeTags, $priceFilter.value);
        document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.genus === activeGenus));
        document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', activeTags.has(c.dataset.tag)));
        const hash = `#g=${encodeURIComponent(activeGenus)}&q=${encodeURIComponent($q.value)}&d=${$difficulty.value}&t=${encodeURIComponent([...activeTags].join(','))}`;
        history.replaceState(null,'',hash);
    }

    $tabs.addEventListener('click', e => {
        const t = e.target.closest('.tab');
        if (t) { activeGenus = t.dataset.genus; sync(); }
    });

    const debouncedSync = debounce(sync, 300);
    $q.addEventListener('input', debouncedSync);
    $difficulty.addEventListener('change', sync);
    $priceFilter.addEventListener('change', sync);

    $chips.forEach(c => {
        c.addEventListener('click', () => {
            const k = c.dataset.tag;
            activeTags.has(k) ? activeTags.delete(k) : activeTags.add(k);
            sync();
        });
    });

    const params = new URLSearchParams(location.hash.replace(/^#/,''));
    if(params.get('g')) activeGenus = decodeURIComponent(params.get('g'));
    if(params.get('q')) $q.value = decodeURIComponent(params.get('q'));
    if(params.get('d')) $difficulty.value = params.get('d');
    if(params.get('t')) decodeURIComponent(params.get('t')).split(',').filter(Boolean).forEach(x => activeTags.add(x));
    
    sync();
}

function init() {
    document.getElementById('year').textContent = new Date().getFullYear();
    buildTabs();
    updateStats();
    initFilters();
    initModalEventListeners();
    initLazyLoading();
}

document.addEventListener('DOMContentLoaded', init);
