/**
 * ============================================================
 * ImageCompressor — اسکریپت کامل
 * ============================================================
 */

// ============================================================
//  مدیریت ناوبری
// ============================================================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-list a[data-page="${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');

    document.getElementById('mainNav').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');

    if (pageId === 'history') renderHistory();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== همبرگر =====
document.getElementById('hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('mainNav').classList.toggle('open');
});

// ===== لینک‌های منو =====
document.querySelectorAll('.nav-list a[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(link.dataset.page);
    });
});

// ===== هدر در اسکرول =====
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    header.classList.toggle('scrolled', window.scrollY > 30);
});

// ============================================================
//  فشرده‌ساز
// ============================================================
const uploadBox = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const loadingBox = document.getElementById('loadingBox');
const progressFill = document.getElementById('progressFill');
const resultBox = document.getElementById('resultBox');
const origImg = document.getElementById('origImg');
const compImg = document.getElementById('compImg');
const origSize = document.getElementById('origSize');
const compSize = document.getElementById('compSize');
const savedStat = document.getElementById('savedStat');
const qualityStat = document.getElementById('qualityStat');
const timeStat = document.getElementById('timeStat');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');

let compressedBlob = null;
let originalFile = null;
let originalName = '';
let startTime = 0;

// ===== کشیدن و رها کردن =====
uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragover');
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) handleFile(e.target.files[0]);
});

// ===== به‌روزرسانی پیشرفت =====
function updateProgress(duration) {
    return new Promise((resolve) => {
        let current = 0;
        const step = 100 / (duration / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= 100) {
                clearInterval(timer);
                progressFill.style.width = '100%';
                resolve();
            } else {
                progressFill.style.width = Math.min(current, 99) + '%';
            }
        }, 16);
    });
}

// ===== پردازش اصلی =====
async function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('لطفاً یک فایل تصویری معتبر انتخاب کنید.');
        return;
    }
    if (file.size > 20 * 1024 * 1024) {
        alert('حداکثر حجم مجاز ۲۰ مگابایت است.');
        return;
    }

    originalFile = file;
    originalName = file.name.replace(/\.[^.]+$/, '');
    startTime = performance.now();

    // نمایش تصویر اصلی
    const reader = new FileReader();
    reader.onload = (e) => { origImg.src = e.target.result; };
    reader.readAsDataURL(file);

    // نمایش لودینگ
    loadingBox.style.display = 'flex';
    progressFill.style.width = '0%';
    resultBox.style.display = 'none';

    // لودینگ سریع (کمتر از ۱ ثانیه)
    const progressPromise = updateProgress(700);

    try {
        const compressPromise = (async () => {
            const opt1 = {
                maxSizeMB: 0.8,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                quality: 0.92,
                fileType: 'image/webp',
                alwaysKeepResolution: true,
                preserveExif: false
            };
            const step1 = await imageCompression(file, opt1);

            const opt2 = {
                maxSizeMB: 0.6,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                quality: 0.88,
                fileType: 'image/webp',
                alwaysKeepResolution: true
            };
            const step2 = await imageCompression(
                new File([step1], 'temp.webp', { type: 'image/webp' }),
                opt2
            );
            return step2.size < step1.size ? step2 : step1;
        })();

        const [compressed] = await Promise.all([compressPromise, progressPromise]);
        compressedBlob = compressed;

        // نمایش تصویر فشرده
        const cr = new FileReader();
        cr.onload = (e) => { compImg.src = e.target.result; };
        cr.readAsDataURL(compressedBlob);

        // آمار
        const orig = (file.size / 1024).toFixed(1);
        const comp = (compressedBlob.size / 1024).toFixed(1);
        const saved = ((1 - compressedBlob.size / file.size) * 100).toFixed(1);
        const elapsed = (performance.now() - startTime).toFixed(0);

        origSize.textContent = orig + ' KB';
        compSize.textContent = comp + ' KB';
        savedStat.textContent = saved + '%';
        qualityStat.textContent = saved > 70 ? 'عالی' : saved > 50 ? 'خوب' : 'مطلوب';
        timeStat.textContent = elapsed + 'ms';

        // ذخیره تاریخچه
        addHistoryItem(originalName, orig, comp, saved, origImg.src);

        // نمایش نتیجه
        setTimeout(() => {
            loadingBox.style.display = 'none';
            resultBox.style.display = 'block';
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);

    } catch (err) {
        console.error('خطا در فشرده‌سازی:', err);
        loadingBox.style.display = 'none';
        alert('خطا در پردازش تصویر. لطفاً دوباره امتحان کنید.');
    }
}

// ===== دانلود =====
downloadBtn.addEventListener('click', () => {
    if (!compressedBlob) {
        alert('ابتدا یک تصویر را بهینه‌سازی کنید.');
        return;
    }
    const ext = compressedBlob.type.split('/')[1] || 'jpg';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(compressedBlob);
    link.download = originalName + '-بهینه‌شده.' + ext;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 3000);
});

// ===== ریست =====
resetBtn.addEventListener('click', () => {
    resultBox.style.display = 'none';
    loadingBox.style.display = 'none';
    compressedBlob = null;
    originalFile = null;
    fileInput.value = '';
    origImg.src = '';
    compImg.src = '';
    uploadBox.classList.remove('dragover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
//  تاریخچه
// ============================================================
let historyData = JSON.parse(localStorage.getItem('compHistory') || '[]');

function saveHistory() {
    localStorage.setItem('compHistory', JSON.stringify(historyData));
}

function addHistoryItem(name, origSize, compSize, saved, preview) {
    historyData.unshift({
        id: Date.now(),
        name,
        origSize,
        compSize,
        saved,
        date: new Date().toLocaleString('fa-IR'),
        preview
    });
    if (historyData.length > 50) historyData.pop();
    saveHistory();
}

function renderHistory() {
    const container = document.getElementById('historyContainer');
    const empty = document.getElementById('emptyHistory');

    if (historyData.length === 0) {
        container.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';

    container.innerHTML = historyData.map(item => `
        <div class="history-item" data-id="${item.id}">
            <div class="history-preview">
                <img src="${item.preview}" alt="${item.name}" loading="lazy" />
            </div>
            <div class="history-info">
                <h4>${item.name}</h4>
                <div class="history-meta">
                    <span>📉 ${item.origSize} KB</span>
                    <span>📈 ${item.compSize} KB</span>
                    <span class="saved">-${item.saved}%</span>
                    <span>🕐 ${item.date}</span>
                </div>
            </div>
            <button class="history-delete" data-id="${item.id}" aria-label="حذف">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');

    document.querySelectorAll('.history-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            historyData = historyData.filter(item => item.id !== id);
            saveHistory();
            renderHistory();
        });
    });
}

// ===== پاک کردن همه =====
document.getElementById('clearAllBtn').addEventListener('click', function() {
    if (confirm('آیا از پاک کردن تمام تاریخچه اطمینان دارید؟')) {
        historyData = [];
        saveHistory();
        renderHistory();
    }
});

// ============================================================
//  مقداردهی اولیه
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
    renderHistory();
});
