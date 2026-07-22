// ===== مدیریت تاریخچه =====
let historyData = JSON.parse(localStorage.getItem('compHistory') || '[]');

function saveHistory() {
    localStorage.setItem('compHistory', JSON.stringify(historyData));
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
                    <img src="${item.preview}" alt="${item.name}" />
                </div>
                <div class="history-info">
                    <h4>${item.name}</h4>
                    <div class="history-meta">
                        <span>⬇ ${item.origSize} KB</span>
                        <span>⬆ ${item.compSize} KB</span>
                        <span class="saved">-${item.saved}%</span>
                        <span>${item.date}</span>
                    </div>
                </div>
                <button class="history-delete" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

    // حذف تکی
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
    if (confirm('همه تاریخچه پاک شود؟')) {
        historyData = [];
        saveHistory();
        renderHistory();
    }
});

// ===== افزودن آیتم جدید =====
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
