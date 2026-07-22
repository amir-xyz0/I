document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('historyList');
    const emptyHistory = document.getElementById('emptyHistory');
    const clearBtn = document.getElementById('clearHistory');

    let history = JSON.parse(localStorage.getItem('compressionHistory') || '[]');

    function renderHistory() {
        if (history.length === 0) {
            historyList.innerHTML = '';
            emptyHistory.style.display = 'block';
            return;
        }
        emptyHistory.style.display = 'none';

        historyList.innerHTML = history.map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-preview">
                    <img src="${item.preview}" alt="${item.name}" />
                </div>
                <div class="history-info">
                    <h4>${item.name}</h4>
                    <div class="history-stats">
                        <span><i class="fas fa-arrow-down"></i> ${item.originalSize} KB</span>
                        <span><i class="fas fa-arrow-up"></i> ${item.compressedSize} KB</span>
                        <span class="saved-badge">-${item.saved}%</span>
                    </div>
                    <span class="history-date"><i class="far fa-clock"></i> ${item.date}</span>
                </div>
                <button class="history-delete" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        // رویداد حذف تکی
        document.querySelectorAll('.history-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                history = history.filter(item => item.id !== id);
                localStorage.setItem('compressionHistory', JSON.stringify(history));
                renderHistory();
            });
        });
    }

    // پاک کردن همه
    clearBtn.addEventListener('click', () => {
        if (confirm('آیا مطمئن هستید که همه تاریخچه پاک شود؟')) {
            history = [];
            localStorage.setItem('compressionHistory', JSON.stringify(history));
            renderHistory();
        }
    });

    renderHistory();
});
