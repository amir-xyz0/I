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
