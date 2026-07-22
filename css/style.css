/* ============================================================
   ریست و متغیرها
   ============================================================ */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --bg: #f2f6fa;
    --white: #ffffff;
    --dark: #0f1e2b;
    --primary: #1a4b6b;
    --primary-light: #2d7a9b;
    --accent: #3b9bc7;
    --shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    --radius: 14px;
    --transition: 0.2s ease;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    background: var(--bg);
    color: var(--dark);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    line-height: 1.6;
}

/* ============================================================
   اسکرول بار
   ============================================================ */
::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-track {
    background: #e4ecf2;
}
::-webkit-scrollbar-thumb {
    background: var(--primary-light);
    border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
}

/* ============================================================
   هدر
   ============================================================ */
.header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding: 0.5rem 0;
    transition: box-shadow 0.3s;
}

.header.scrolled {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
}

.header-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 1.15rem;
    color: var(--dark);
    text-decoration: none;
}

.logo i {
    font-size: 1.3rem;
    color: var(--primary-light);
}

.logo span {
    background: linear-gradient(135deg, var(--primary), var(--primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.nav-list {
    display: flex;
    list-style: none;
    gap: 0.2rem;
}

.nav-list a {
    padding: 0.35rem 0.9rem;
    border-radius: 30px;
    text-decoration: none;
    color: #2d4a5a;
    font-size: 0.85rem;
    font-weight: 500;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.nav-list a:hover {
    background: rgba(45, 122, 155, 0.08);
    color: var(--primary-light);
}

.nav-list a.active {
    background: rgba(45, 122, 155, 0.12);
    color: var(--primary-light);
}

.hamburger {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
}

.hamburger span {
    width: 22px;
    height: 2.5px;
    background: var(--dark);
    border-radius: 4px;
    transition: var(--transition);
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(4px, 4px);
}
.hamburger.active span:nth-child(2) {
    opacity: 0;
}
.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(4px, -4px);
}

@media (max-width: 700px) {
    .hamburger {
        display: flex;
    }
    .nav {
        position: fixed;
        top: 58px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(14px);
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        transform: translateY(-120%);
        transition: var(--transition);
        opacity: 0;
        pointer-events: none;
    }
    .nav.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
    }
    .nav-list {
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
    }
    .nav-list a {
        width: 100%;
        justify-content: center;
        padding: 0.6rem;
        font-size: 0.95rem;
    }
}

/* ============================================================
   محتوای اصلی
   ============================================================ */
.main {
    flex: 1;
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    padding: 1.2rem 1.5rem 2rem;
}

.page {
    display: none;
    animation: fadeUp 0.35s ease;
}
.page.active {
    display: block;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ============================================================
   هیرو
   ============================================================ */
.hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0 1.5rem;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.hero-content {
    flex: 1;
    min-width: 220px;
}

.hero-badge {
    display: inline-block;
    background: rgba(45, 122, 155, 0.08);
    color: var(--primary-light);
    padding: 0.1rem 0.8rem;
    border-radius: 30px;
    font-size: 0.7rem;
    font-weight: 600;
    border: 1px solid rgba(45, 122, 155, 0.1);
    margin-bottom: 0.3rem;
}

.hero h1 {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.2;
    background: linear-gradient(135deg, var(--dark), var(--primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero .subtitle {
    color: #3d5e6e;
    font-size: 0.95rem;
    margin: 0.3rem 0 0.8rem;
}

.hero .subtitle strong {
    color: var(--primary);
}

.hero-features {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.hero-features span {
    font-size: 0.8rem;
    color: #3d5e6e;
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

.hero-features i {
    color: var(--primary-light);
    font-size: 0.7rem;
}

.hero-visual {
    flex: 0 0 160px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.floating-icons {
    display: flex;
    gap: 1.2rem;
    font-size: 2rem;
    color: var(--accent);
}

.floating-icons i {
    animation: float 3s ease-in-out infinite;
}
.floating-icons i:nth-child(2) {
    animation-delay: 0.4s;
}
.floating-icons i:nth-child(3) {
    animation-delay: 0.8s;
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-8px);
    }
}

@media (max-width: 600px) {
    .hero h1 {
        font-size: 1.5rem;
    }
    .hero-features {
        gap: 0.5rem;
    }
    .hero-features span {
        font-size: 0.7rem;
    }
    .hero-visual {
        flex: 0 0 auto;
    }
    .floating-icons {
        font-size: 1.5rem;
        gap: 0.8rem;
    }
}

/* ============================================================
   باکس آپلود
   ============================================================ */
.compressor-wrapper {
    max-width: 780px;
    margin: 0 auto;
}

.upload-box {
    background: var(--white);
    border-radius: var(--radius);
    padding: 2rem 1.5rem;
    text-align: center;
    border: 2px dashed rgba(45, 122, 155, 0.2);
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow);
    position: relative;
}

.upload-box:hover {
    border-color: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
}

.upload-box.dragover {
    border-color: var(--primary-light);
    background: rgba(45, 122, 155, 0.03);
    transform: scale(1.01);
}

.upload-icon {
    font-size: 2.2rem;
    color: var(--primary-light);
    margin-bottom: 0.3rem;
}

.upload-box h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--dark);
}

.upload-box p {
    font-size: 0.85rem;
    color: #6a8a98;
    margin-top: 0.1rem;
}

.upload-box .hint {
    display: block;
    font-size: 0.75rem;
    color: #8aa8b8;
    margin-top: 0.3rem;
}

.upload-box .hint i {
    color: var(--primary-light);
}

.upload-box input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
}

/* ============================================================
   لودینگ (سریع و سبک)
   ============================================================ */
.loading-box {
    display: none;
    flex-direction: column;
    align-items: center;
    background: var(--white);
    border-radius: var(--radius);
    padding: 2rem 1.5rem;
    box-shadow: var(--shadow);
    margin-top: 1rem;
    animation: fadeUp 0.25s ease;
}

.spinner {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid #e4ecf2;
    border-top-color: var(--primary-light);
    animation: spin 0.6s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-box .loading-text {
    margin-top: 0.6rem;
    font-weight: 500;
    color: var(--dark);
    font-size: 0.9rem;
}

.progress-track {
    width: 70%;
    max-width: 240px;
    height: 3px;
    background: #e4ecf2;
    border-radius: 3px;
    margin-top: 0.5rem;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--primary-light), var(--accent));
    border-radius: 3px;
    transition: width 0.2s ease;
}

/* ============================================================
   نتیجه
   ============================================================ */
.result-box {
    display: none;
    margin-top: 1rem;
    animation: fadeUp 0.35s ease;
}

.result-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
}

.result-card {
    background: var(--white);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    border: 1px solid rgba(0, 0, 0, 0.03);
    transition: var(--transition);
}

.result-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.05);
}

.result-card.highlight {
    border-color: rgba(45, 122, 155, 0.12);
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #3d5e6e;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.tag {
    background: #eef3f7;
    padding: 0.05rem 0.6rem;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
}

.tag.success {
    background: rgba(45, 155, 120, 0.1);
    color: #1a8a6a;
}

.result-image {
    padding: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 120px;
    background: #f8fbfd;
}

.result-image img {
    max-width: 100%;
    max-height: 180px;
    border-radius: 8px;
    object-fit: contain;
}

.result-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    margin: 0.8rem 0;
}

.result-stats div {
    background: var(--white);
    border-radius: 10px;
    padding: 0.5rem;
    text-align: center;
    box-shadow: var(--shadow);
    border: 1px solid rgba(0, 0, 0, 0.02);
}

.result-stats span {
    display: block;
    font-size: 0.6rem;
    color: #6a8a98;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

.result-stats strong {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--dark);
    margin-top: 0.05rem;
}

.result-actions {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn-primary,
.btn-secondary,
.btn-danger {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1.4rem;
    border: none;
    border-radius: 30px;
    font-weight: 600;
    font-size: 0.8rem;
    cursor: pointer;
    transition: var(--transition);
    font-family: inherit;
}

.btn-primary {
    background: var(--primary);
    color: #fff;
    box-shadow: 0 3px 12px rgba(26, 75, 107, 0.18);
}

.btn-primary:hover {
    background: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(26, 75, 107, 0.22);
}

.btn-secondary {
    background: #eef3f7;
    color: var(--dark);
}

.btn-secondary:hover {
    background: #e2e9ef;
    transform: translateY(-2px);
}

.btn-danger {
    background: #fee2e2;
    color: #dc2626;
}

.btn-danger:hover {
    background: #fecaca;
    transform: translateY(-2px);
}

@media (max-width: 600px) {
    .result-grid {
        grid-template-columns: 1fr;
    }
    .result-stats {
        grid-template-columns: 1fr;
    }
    .result-actions {
        flex-direction: column;
    }
    .result-actions button {
        width: 100%;
        justify-content: center;
    }
    .upload-box {
        padding: 1.5rem 1rem;
    }
}

/* ============================================================
   تاریخچه
   ============================================================ */
.page-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.6rem;
}

.page-head h2 {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--dark);
}

.history-container {
    display: grid;
    gap: 0.6rem;
}

.history-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background: var(--white);
    border-radius: 12px;
    padding: 0.6rem 1rem;
    box-shadow: var(--shadow);
    border: 1px solid rgba(0, 0, 0, 0.02);
    transition: var(--transition);
    position: relative;
}

.history-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
}

.history-preview {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    background: #f0f5fa;
}

.history-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.history-info {
    flex: 1;
    min-width: 0;
}

.history-info h4 {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--dark);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.history-meta {
    display: flex;
    gap: 0.6rem;
    font-size: 0.65rem;
    color: #6a8a98;
    flex-wrap: wrap;
}

.history-meta .saved {
    color: #1a8a6a;
    font-weight: 600;
}

.history-delete {
    background: none;
    border: none;
    color: #b0c4d0;
    cursor: pointer;
    padding: 0.2rem 0.4rem;
    border-radius: 50%;
    transition: var(--transition);
    font-size: 0.8rem;
}

.history-delete:hover {
    color: #dc2626;
    background: rgba(220, 38, 38, 0.06);
}

.empty-state {
    text-align: center;
    padding: 2.5rem 1.5rem;
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
}

.empty-state i {
    font-size: 2.8rem;
    color: #cbd8e3;
}

.empty-state h3 {
    margin: 0.5rem 0 0.2rem;
    color: var(--dark);
}

.empty-state p {
    color: #6a8a98;
    font-size: 0.85rem;
}

.empty-state .btn-primary {
    margin-top: 0.8rem;
}

/* ============================================================
   درباره
   ============================================================ */
.about-box {
    max-width: 600px;
    margin: 0 auto;
    background: var(--white);
    border-radius: var(--radius);
    padding: 1.8rem;
    box-shadow: var(--shadow);
}

.about-box h2 {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 0.6rem;
}

.about-box p {
    color: #3d5e6e;
    line-height: 1.8;
    font-size: 0.9rem;
}

.about-box p+p {
    margin-top: 0.6rem;
}

.about-tags {
    display: flex;
    gap: 0.6rem;
    margin-top: 1rem;
    flex-wrap: wrap;
}

.about-tags span {
    background: #eef3f7;
    padding: 0.15rem 0.8rem;
    border-radius: 30px;
    font-size: 0.75rem;
    color: var(--dark);
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

/* ============================================================
   فوتر
   ============================================================ */
.footer {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    padding: 1rem 0;
    margin-top: 1.5rem;
}

.footer-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.6rem;
}

.footer p {
    font-size: 0.75rem;
    color: #4a6a7a;
}

.footer-links {
    display: flex;
    gap: 1rem;
}

.footer-links a {
    text-decoration: none;
    color: #4a6a7a;
    font-size: 0.75rem;
    transition: var(--transition);
}

.footer-links a:hover {
    color: var(--primary-light);
}

@media (max-width: 600px) {
    .main {
        padding: 0.8rem 1rem 1.5rem;
    }
    .footer-container {
        flex-direction: column;
        text-align: center;
    }
    .about-box {
        padding: 1.2rem;
    }
}
