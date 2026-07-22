// ===== مقداردهی اولیه =====
document.addEventListener('DOMContentLoaded', function() {
    // صفحه پیش‌فرض: خانه
    showPage('home');

    // رندر تاریخچه
    renderHistory();

    // اگر در صفحه history هستیم، رندر کنیم
    // (توسط navigation مدیریت میشه)
});
