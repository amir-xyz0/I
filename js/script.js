document.addEventListener('DOMContentLoaded', () => {
    // ===== منوی همبرگر =====
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');
    const header = document.getElementById('mainHeader');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
    });

    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    // ===== اسکرول نرم =====
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    });

    // ===== عناصر فشرده‌ساز =====
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewPanel = document.getElementById('previewPanel');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const progressBar = document.getElementById('progressBar');
    const originalImage = document.getElementById('originalImage');
    const compressedImage = document.getElementById('compressedImage');
    const originalSize = document.getElementById('originalSize');
    const compressedSize = document.getElementById('compressedSize');
    const savedPercent = document.getElementById('savedPercent');
    const qualityStatus = document.getElementById('qualityStatus');
    const processTime = document.getElementById('processTime');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');

    let compressedBlob = null;
    let originalFile = null;
    let originalFileName = '';
    let startTime = 0;
    let history = JSON.parse(localStorage.getItem('compressionHistory') || '[]');

    // ===== رویدادهای آپلود =====
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // ===== تابع بارگذاری پیشرفت =====
    function simulateProgress(duration) {
        return new Promise((resolve) => {
            let start = 0;
            const interval = 30;
            const step = 100 / (duration / interval);
            
            const timer = setInterval(() => {
                start += step;
                if (start >= 100) {
                    clearInterval(timer);
                    progressBar.style.width = '100%';
                    resolve();
                } else {
                    progressBar.style.width = Math.min(start, 99) + '%';
                }
            }, interval);
        });
    }

    // ===== پردازش اصلی با لودینگ =====
    async function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('لطفاً فقط فایل تصویری انتخاب کنید.');
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            alert('حجم تصویر نباید بیشتر از ۲۰ مگابایت باشد.');
            return;
        }

        originalFile = file;
        originalFileName = file.name.replace(/\.[^.]+$/, '');
        startTime = performance.now();

        // نمایش تصویر اصلی
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // نمایش لودینگ با انیمیشن
        loadingOverlay.style.display = 'flex';
        progressBar.style.width = '0%';
        previewPanel.style.display = 'none';

        // شبیه‌سازی بارگذاری (۲-۳ ثانیه)
        const loadPromise = simulateProgress(2500);

        try {
            // فشرده‌سازی واقعی
            const compressionPromise = (async () => {
                const options = {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: 2048,
                    useWebWorker: true,
                    quality: 0.95,
                    fileType: 'image/webp',
                    alwaysKeepResolution: true,
                    preserveExif: false,
                };

                const compressed = await imageCompression(file, options);
                
                // مرحله دوم برای کاهش بیشتر
                const finalOptions = {
                    maxSizeMB: 0.6,
                    maxWidthOrHeight: 2048,
                    useWebWorker: true,
                    quality: 0.92,
                    fileType: 'image/webp',
                    alwaysKeepResolution: true,
                };

                const finalCompressed = await imageCompression(
                    new File([compressed], 'temp.webp', { type: 'image/webp' }),
                    finalOptions
                );

                return finalCompressed.size < compressed.size ? finalCompressed : compressed;
            })();

            // اجرای همزمان لودینگ و فشرده‌سازی
            const [compressed] = await Promise.all([
                compressionPromise,
                loadPromise
            ]);

            compressedBlob = compressed;

            // نمایش تصویر فشرده
            const compressedReader = new FileReader();
            compressedReader.onload = (e) => {
                compressedImage.src = e.target.result;
            };
            compressedReader.readAsDataURL(compressedBlob);

            // محاسبه آمار
            const origSizeKB = (file.size / 1024).toFixed(1);
            const compSizeKB = (compressedBlob.size / 1024).toFixed(1);
            const saved = ((1 - compressedBlob.size / file.size) * 100).toFixed(1);
            const elapsed = (performance.now() - startTime).toFixed(0);

            originalSize.textContent = `${origSizeKB} KB`;
            compressedSize.textContent = `${compSizeKB} KB`;
            savedPercent.textContent = `${saved}%`;
            qualityStatus.textContent = saved > 70 ? 'عالی' : saved > 50 ? 'خوب' : 'مطلوب';
            processTime.textContent = `${elapsed}ms`;

            // ذخیره در تاریخچه
            const historyItem = {
                id: Date.now(),
                name: originalFileName,
                originalSize: origSizeKB,
                compressedSize: compSizeKB,
                saved: saved,
                date: new Date().toLocaleString('fa-IR'),
                preview: originalImage.src
            };
            history.unshift(historyItem);
            if (history.length > 50) history.pop();
            localStorage.setItem('compressionHistory', JSON.stringify(history));

            // نمایش نتایج
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                previewPanel.style.display = 'block';
                previewPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);

        } catch (error) {
            console.error('خطا:', error);
            loadingOverlay.style.display = 'none';
            alert('خطا در پردازش تصویر. لطفاً دوباره امتحان کنید.');
        }
    }

    // ===== دانلود =====
    downloadBtn.addEventListener('click', () => {
        if (!compressedBlob) {
            alert('ابتدا یک تصویر را فشرده کنید.');
            return;
        }

        const extension = compressedBlob.type.split('/')[1] || 'jpg';
        const downloadName = `${originalFileName}-فشرده.${extension}`;

        const link = document.createElement('a');
        link.href = URL.createObjectURL(compressedBlob);
        link.download = downloadName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 5000);
    });

    // ===== ریست =====
    resetBtn.addEventListener('click', () => {
        previewPanel.style.display = 'none';
        loadingOverlay.style.display = 'none';
        compressedBlob = null;
        originalFile = null;
        fileInput.value = '';
        originalImage.src = '';
        compressedImage.src = '';
        uploadArea.classList.remove('dragover');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
