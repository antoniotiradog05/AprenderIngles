// ============================================================
// EnglishMaster — app.js
// SPA router, init, global state
// ============================================================

const App = {
  currentPage: 'dashboard',
  _sessionStart: null,

  // ---- Initialization ----
  init() {
    // Init modules
    Storage.init();
    Gamification.init();
    Speech.init();

    // Animate splash
    this._handleSplash();
  },

  _handleSplash() {
    setTimeout(() => {
      document.getElementById('splash-screen').style.opacity = '0';
      document.getElementById('splash-screen').style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('app').classList.remove('hidden');
        this._postInit();
      }, 500);
    }, 2200);
  },

  _postInit() {
    // Apply saved theme
    const theme = Storage.getSettings().theme || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    this._updateThemeBtn(theme);

    // Update streak
    Gamification.updateStreak();

    // Refresh nav
    Gamification.refreshNav();

    // Wire UI
    this._wireNav();
    this._wireTheme();
    this._wireSidebar();

    // Check onboarding
    const user = Storage.getUser();
    if (!user.name) {
      this._showOnboarding();
    } else {
      this._startSession();
      this.navigate('dashboard');
    }
  },

  _showOnboarding() {
    const modal = document.getElementById('onboarding-modal');
    modal.classList.remove('hidden');

    document.getElementById('onboard-next-1').addEventListener('click', () => {
      const nameInput = document.getElementById('onboard-name');
      const name = nameInput.value.trim() || 'Estudiante';
      Storage.setUser({ name });
      modal.classList.add('hidden');
      this._startSession();
      this.navigate('assessment');
      Gamification.refreshNav();
    });

    document.getElementById('onboard-name').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('onboard-next-1').click();
    });
  },

  _startSession() {
    this._sessionStart = Date.now();
    Gamification.check();
    addRippleToAll();
  },

  // ---- Navigation ----
  navigate(page, opts = {}) {
    this.currentPage = page;
    const container = document.getElementById('page-container');

    // Update active nav item
    $$('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });

    // Update topbar title
    const pageTitles = {
      dashboard: '🏠 Dashboard',
      assessment: '🎯 Test de Nivel',
      lessons: '📚 Lecciones',
      exercises: '✏️ Ejercicios',
      vocabulary: '📖 Vocabulario',
      games: '🎮 Juegos',
      chat: '🤖 Chat con Robot',
      progress: '📈 Mi Progreso',
      dictionary: '🔍 Diccionario',
    };
    const topbarTitle = document.getElementById('topbar-title');
    if (topbarTitle) topbarTitle.textContent = pageTitles[page] || page;

    // Close sidebar on mobile
    this._closeSidebar();

    // Render page
    container.innerHTML = '';
    fadeInPage(container);

    switch (page) {
      case 'dashboard':   Dashboard.render(container); break;
      case 'assessment':  Assessment.render(container); break;
      case 'lessons':     Lessons.render(container); break;
      case 'exercises':   ExercisesModule.render(container, opts); break;
      case 'vocabulary':  VocabularyPage.render(container); break;
      case 'games':       Games.render(container); break;
      case 'chat':        RobotChat.render(container); break;
      case 'progress':    Progress.render(container); break;
      case 'dictionary':  DictionaryPage.render(container); break;
      default:            Dashboard.render(container);
    }

    // Log study time on navigation
    this._logStudyTime();
    addRippleToAll();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  _logStudyTime() {
    if (this._sessionStart) {
      const elapsed = Math.floor((Date.now() - this._sessionStart) / 60000);
      if (elapsed >= 1) {
        Storage.logStudySession(elapsed, 0);
        this._sessionStart = Date.now();
      }
    }
  },

  // ---- Nav wiring ----
  _wireNav() {
    $$('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        if (page) this.navigate(page);
      });
    });
  },

  // ---- Theme ----
  _wireTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      Storage.setSetting('theme', next);
      this._updateThemeBtn(next);
    });
  },

  _updateThemeBtn(theme) {
    const btn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    if (btn && icon) {
      if (theme === 'dark') {
        icon.textContent = '☀️';
        btn.childNodes[1].textContent = ' Modo Claro';
      } else {
        icon.textContent = '🌙';
        btn.childNodes[1].textContent = ' Modo Oscuro';
      }
    }
  },

  // ---- Sidebar ----
  _wireSidebar() {
    const menuBtn = document.getElementById('menu-toggle');
    const sidebarCloseBtn = document.getElementById('sidebar-toggle');

    menuBtn?.addEventListener('click', () => this._openSidebar());
    sidebarCloseBtn?.addEventListener('click', () => this._closeSidebar());

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => this._closeSidebar());
  },

  _openSidebar() {
    document.getElementById('sidebar')?.classList.add('open');
    document.getElementById('sidebar-overlay')?.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  _closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('active');
    document.body.style.overflow = '';
  },
};

// ---- Auto-save on page unload ----
window.addEventListener('beforeunload', () => {
  App._logStudyTime();
  Storage.save();
});

// ---- Keyboard shortcut: Escape closes modals ----
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    $$('.modal-overlay:not(.hidden)').forEach(m => m.classList.add('hidden'));
  }
});

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
