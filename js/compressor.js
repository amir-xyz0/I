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
    originalName = file.name.replace(/\.[^.]+$/, '');
    startTime = performance.now();

    // نمایش اصلی
    const reader = new FileReader();
    reader.onload = (e) => { origImg.src = e.target.result; };
    reader.readAsDataURL(file);

    // نمایش لودینگ
    loadingBox.style.display = 'flex';
    progressFill.style.width = '0%';
    resultBox.style.display = 'none';

    const progressPromise = updateProgress(1800);

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

        // نمایش فشرده
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
        }, 200);

    } catch (err) {
        console.error(err);
        loadingBox.style.display = 'none';
        alert('خطا در فشرده‌سازی. دوباره امتحان کنید.');
    }
}

// ===== دانلود =====
downloadBtn.addEventListener('click', () => {
    if (!compressedBlob) { alert('ابتدا تصویر را فشرده کنید.'); return; }
    const ext = compressedBlob.type.split('/')[1] || 'jpg';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(compressedBlob);
    link.download = originalName + '-فشرده.' + ext;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 4000);
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
