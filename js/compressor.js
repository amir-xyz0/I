// ===== عناصر =====
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

// ===== رویدادهای آپلود =====
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

// ===== پیشرفت =====
function updateProgress(duration) {
    return new Promise((resolve) => {
        let current = 0;
        const step = 100 / (duration / 30);
        const timer = setInterval(() => {
            current += step;
            if (current >= 100) {
                clearInterval(timer);
                progressFill.style.width = '100%';
                resolve();
            } else {
                progressFill.style.width = Math.min(current, 99) + '%';
            }
        }, 30);
    });
}

// ===== پردازش =====
async function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('فایل تصویری انتخاب کنید.');
        return;
    }
    if (file.size > 20 * 1024 * 1024) {
        alert('حداکثر حجم ۲۰ مگابایت است.');
        return;
    }

    originalFile = file;
    originalName = file.name
