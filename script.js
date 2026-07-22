document.addEventListener('DOMContentLoaded', () => {
    // ===== منوی همبرگر =====
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // بستن منو با کلیک روی لینک
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    // ===== عناصر فشرده‌ساز =====
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewPanel = document.getElementById('previewPanel');
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

    // ===== پردازش اصلی =====
    async function handleFile(file) {
        // اعتبارسنجی
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

        // فشرده‌سازی پیشرفته
        try {
            // مرحله ۱: فشرده‌سازی با کیفیت بالا
            const options = {
                maxSizeMB: 0.8,
                maxWidthOrHeight: 2048,
                useWebWorker: true,
                quality: 0.95,
                initialQuality: 0.95,
                fileType: 'image/webp',
                alwaysKeepResolution: true,
                preserveExif: false,
            };

            const compressed = await imageCompression(file, options);
            compressedBlob = compressed;

            // مرحله ۲: فشرده‌سازی مجدد با کیفیت نهایی (برای کاهش بیشتر)
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

            // اگر حجم نهایی کمتر بود، جایگزین کن
            if (finalCompressed.size < compressed.size) {
                compressedBlob = finalCompressed;
            }

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
            qualityStatus.textContent = `${saved > 80 ? 'عالی' : saved > 60 ? 'خوب' : 'مطلوب'}`;
            processTime.textContent = `${elapsed}ms`;

            previewPanel.style.display = 'block';
            previewPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error('خطا در فشرده‌سازی:', error);
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
        compressedBlob = null;
        originalFile = null;
        fileInput.value = '';
        originalImage.src = '';
        compressedImage.src = '';
        uploadArea.classList.remove('dragover');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
