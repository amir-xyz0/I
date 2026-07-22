document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const originalImage = document.getElementById('originalImage');
    const originalSize = document.getElementById('originalSize');
    const compressedSize = document.getElementById('compressedSize');
    const savedPercent = document.getElementById('savedPercent');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');

    let compressedBlob = null;
    let originalFile = null;
    let originalFileName = '';

    // ===== کشیدن و رها کردن =====
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#0b2b3c';
        uploadArea.style.background = 'rgba(11,43,60,0.04)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#b6ccd8';
        uploadArea.style.background = 'rgba(255,255,255,0.5)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#b6ccd8';
        uploadArea.style.background = 'rgba(255,255,255,0.5)';
        const files = e.dataTransfer.files;
        if (files.length > 0) handleFile(files[0]);
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    // ===== پردازش فایل =====
    async function handleFile(file) {
        // اعتبارسنجی
        if (!file.type.startsWith('image/')) {
            alert('❌ لطفاً فقط فایل تصویری انتخاب کنید.');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('❌ حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد.');
            return;
        }

        originalFile = file;
        originalFileName = file.name.replace(/\.[^.]+$/, ''); // حذف پسوند

        // نمایش تصویر اصلی
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // فشرده‌سازی
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                quality: 1, // بدون افت کیفیت
            };

            const compressed = await imageCompression(file, options);
            compressedBlob = compressed;

            // نمایش آمار
            const origSizeKB = (file.size / 1024).toFixed(1);
            const compSizeKB = (compressed.size / 1024).toFixed(1);
            const saved = ((1 - compressed.size / file.size) * 100).toFixed(1);

            originalSize.textContent = `${origSizeKB} KB`;
            compressedSize.textContent = `${compSizeKB} KB`;
            savedPercent.textContent = `${saved}%`;

            preview.style.display = 'block';
            preview.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error(error);
            alert('⚠️ خطا در فشرده‌سازی. لطفاً تصویر دیگری امتحان کنید.');
        }
    }

    // ===== دانلود =====
    downloadBtn.addEventListener('click', () => {
        if (!compressedBlob) {
            alert('⚠️ ابتدا یک تصویر را فشرده کنید.');
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

        // آزادسازی حافظه
        setTimeout(() => URL.revokeObjectURL(link.href), 5000);
    });

    // ===== ریست =====
    resetBtn.addEventListener('click', () => {
        preview.style.display = 'none';
        compressedBlob = null;
        originalFile = null;
        fileInput.value = '';
        originalImage.src = '';
        uploadArea.style.borderColor = '#b6ccd8';
        uploadArea.style.background = 'rgba(255,255,255,0.5)';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
