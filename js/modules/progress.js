// ============================================================
// EnglishMaster — modules/progress.js
// Dashboard and progress tracking
// ============================================================

const Progress = {
  render(container) {
    const gam = Storage.getGamification();
    const prog = Storage.getProgress();
    const user = Storage.getUser();
    const weekly = Storage.getWeeklyStudy();
    const accuracy = Storage.getAccuracy();
    const level = Gamification.xpToLevel(gam.xp);
    const nextLevelXP = Gamification.xpForNextLevel(level);
    const xpPct = Gamification.xpProgress(gam.xp, level);

    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">📈 Mi Progreso</h1>
        <p class="page-subtitle">Visualiza tu evolución y mantén la motivación</p>
      </div>

      <!-- XP & Level Card -->
      <div class="card card-gradient mb-xl card-enter-1" style="padding:2rem">
        <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap">
          <div>
            <div style="font-size:3rem">${Gamification.getLevelEmoji(level)}</div>
          </div>
          <div style="flex:1">
            <div style="font-size:0.875rem;opacity:0.8;margin-bottom:0.25rem">Nivel ${level} — ${Gamification.getLevelTitle(level)}</div>
            <div style="font-family:var(--font-heading);font-size:2rem;font-weight:900;line-height:1">${formatNumber(gam.xp)} XP</div>
            <div style="margin-top:0.75rem">
              <div style="display:flex;justify-content:space-between;font-size:0.8125rem;opacity:0.8;margin-bottom:0.25rem">
                <span>Progreso hacia Nivel ${level + 1}</span>
                <span>${xpPct}%</span>
              </div>
              <div class="progress-bar progress-bar-lg" style="background:rgba(255,255,255,0.2)">
                <div class="progress-fill" style="width:${xpPct}%;background:rgba(255,255,255,0.9)"></div>
              </div>
            </div>
          </div>
          <div style="text-align:right">
            <div style="font-family:var(--font-heading);font-size:2rem;font-weight:900">🔥 ${gam.streak}</div>
            <div style="font-size:0.875rem;opacity:0.8">días de racha</div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid-4 mb-xl">
        <div class="stat-card card-enter-1">
          <div class="stat-icon">⏱️</div>
          <div class="stat-value">${formatMinutes(prog.totalMinutes)}</div>
          <div class="stat-label">Tiempo estudiado</div>
        </div>
        <div class="stat-card card-enter-2">
          <div class="stat-icon">📖</div>
          <div class="stat-value">${prog.wordsLearned.length}</div>
          <div class="stat-label">Palabras aprendidas</div>
        </div>
        <div class="stat-card card-enter-3">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">${accuracy}%</div>
          <div class="stat-label">Precisión</div>
        </div>
        <div class="stat-card card-enter-4">
          <div class="stat-icon">✏️</div>
          <div class="stat-value">${gam.totalExercises}</div>
          <div class="stat-label">Ejercicios</div>
        </div>
      </div>

      <!-- Weekly study chart -->
      <div class="card card-glass mb-xl card-enter-2">
        <div class="card-header">
          <div class="card-title">📅 Estudio esta semana</div>
          <span class="badge badge-primary">${weekly.reduce((a, d) => a + d.minutes, 0)} min total</span>
        </div>
        <canvas id="weekly-chart" width="600" height="200" style="width:100%;max-width:100%"></canvas>
      </div>

      <!-- Accuracy breakdown -->
      <div class="grid-2 mb-xl">
        <div class="card card-glass card-enter-3">
          <div class="card-title mb-lg">✅ Respuestas correctas vs incorrectas</div>
          <canvas id="accuracy-chart" width="300" height="180" style="width:100%"></canvas>
          <div style="display:flex;gap:1rem;margin-top:1rem;font-size:0.875rem">
            <span style="color:var(--color-accent)">✅ ${gam.correctAnswers} correctas</span>
            <span style="color:var(--color-danger)">❌ ${gam.wrongAnswers} incorrectas</span>
          </div>
        </div>
        <div class="card card-glass card-enter-4">
          <div class="card-title mb-lg">📊 Tu nivel MCER</div>
          <div style="text-align:center;padding:1rem">
            <div style="font-size:4rem;font-weight:900;font-family:var(--font-heading)">${user.cefrLevel}</div>
            <div style="color:var(--text-muted)">${CEFR_NAMES[user.cefrLevel] || 'Sin evaluar'}</div>
          </div>
          <div class="level-map" style="padding-left:1.5rem">
            ${CEFR_LEVELS.map(l => {
              const isCurrent = l === user.cefrLevel;
              const levelIdx = CEFR_LEVELS.indexOf(l);
              const userIdx = CEFR_LEVELS.indexOf(user.cefrLevel);
              const done = levelIdx < userIdx;
              return `<div class="map-node ${done ? 'completed' : isCurrent ? 'current' : ''}">
                <div class="map-node-card" style="padding:0.5rem 0.75rem">
                  <span class="level-pill level-${l}">${l}</span>
                  <span style="font-size:0.8125rem;color:var(--text-muted)">${CEFR_NAMES[l]}</span>
                  <span>${done ? '✅' : isCurrent ? '👈' : '🔒'}</span>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Error history -->
      ${prog.errors.length > 0 ? `
      <div class="card card-glass mb-xl">
        <div class="card-header">
          <div class="card-title">⚠️ Errores frecuentes — Área de mejora</div>
          <span class="badge badge-danger">${prog.errors.length} errores</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.5rem;max-height:240px;overflow-y:auto">
          ${[...prog.errors].reverse().slice(0, 10).map(e => `
            <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem;background:var(--bg-elevated);border-radius:var(--radius-sm)">
              <span style="font-size:1rem">❌</span>
              <div>
                <div style="font-size:0.875rem;font-weight:600">${e.type}</div>
                <div style="font-size:0.8125rem;color:var(--text-muted);font-style:italic">"${e.detail}"</div>
              </div>
              <span style="margin-left:auto;font-size:0.75rem;color:var(--text-muted)">${e.date}</span>
            </div>`).join('')}
        </div>
        <button class="btn btn-outline btn-sm mt-md" onclick="App.navigate('exercises')">✏️ Practicar estas áreas</button>
      </div>` : ''}

      <!-- Achievements -->
      <div class="card card-glass mb-xl">
        <div class="card-header">
          <div class="card-title">🏆 Logros</div>
          <span class="badge badge-warning">${gam.achievements.length} / ${Gamification.getAllAchievements().length}</span>
        </div>
        <div class="achievement-grid">
          ${Gamification.getAllAchievements().map(ach => {
            const unlocked = gam.achievements.includes(ach.id);
            return `
              <div class="achievement-badge ${unlocked ? 'unlocked' : 'locked'}" data-tooltip="${ach.desc}">
                <span class="badge-emoji">${ach.emoji}</span>
                <div class="badge-name">${ach.name}</div>
                <div class="badge-desc">${ach.desc}</div>
                ${unlocked ? '<div style="font-size:0.6875rem;color:var(--color-warning);margin-top:2px">✓ Desbloqueado</div>' : ''}
              </div>`;
          }).join('')}
        </div>
      </div>`;

    // Draw charts after DOM is ready
    requestAnimationFrame(() => {
      // Weekly study chart
      const weeklyCanvas = document.getElementById('weekly-chart');
      if (weeklyCanvas) {
        const data = weekly.map(d => d.minutes);
        const labels = weekly.map(d => d.day);
        drawBarChart(weeklyCanvas, data, labels, '#6366f1');
      }

      // Accuracy chart
      const accCanvas = document.getElementById('accuracy-chart');
      if (accCanvas) {
        const data = [gam.correctAnswers || 0, gam.wrongAnswers || 0];
        drawBarChart(accCanvas, data, ['Correctas', 'Incorrectas'], '#10b981');
      }
    });
  },
};

// ---- Dashboard Page ----
const Dashboard = {
  render(container) {
    const user = Storage.getUser();
    const gam = Storage.getGamification();
    const prog = Storage.getProgress();
    const weekly = Storage.getWeeklyStudy();
    const todaySession = weekly[weekly.length - 1];
    const level = Gamification.xpToLevel(gam.xp);
    const accuracy = Storage.getAccuracy();

    const greetings = ['¡Buenos días', '¡Buenas tardes', '¡Buenas noches'];
    const hour = new Date().getHours();
    const greeting = hour < 12 ? greetings[0] : hour < 20 ? greetings[1] : greetings[2];

    container.innerHTML = `
      <!-- Hero -->
      <div class="dashboard-hero card-enter-1">
        <div class="hero-greeting">${greeting}, ${user.name || 'Estudiante'}! 👋</div>
        <div class="hero-name">Ready to learn English?</div>
        <div class="hero-level-info">
          <span class="level-pill level-${user.cefrLevel}">${user.cefrLevel} — ${CEFR_NAMES[user.cefrLevel]}</span>
          <span class="badge badge-primary">Nivel ${level} · ${Gamification.getLevelTitle(level)}</span>
          <span class="badge badge-warning">🔥 ${gam.streak} días</span>
          ${!user.assessmentDone ? '<span class="badge badge-danger">⚠️ Haz el test de nivel</span>' : ''}
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid-4 mb-xl">
        ${[
          { icon:'🎯', label:'Test de Nivel', page:'assessment', color:'primary', detail: user.assessmentDone ? `Nivel: ${user.cefrLevel}` : '¡Empieza aquí!' },
          { icon:'📚', label:'Lecciones', page:'lessons', color:'accent', detail:`${prog.grammarTopicsViewed.length} temas vistos` },
          { icon:'✏️', label:'Ejercicios', page:'exercises', color:'warning', detail:`${gam.totalExercises} completados` },
          { icon:'🎮', label:'Juegos', page:'games', color:'danger', detail:`${prog.gamesPlayed.length} jugados` },
        ].map((item, i) => `
          <div class="stat-card card-enter-${i+1}" style="cursor:pointer;--after-color:var(--color-${item.color})" onclick="App.navigate('${item.page}')">
            <div class="stat-icon">${item.icon}</div>
            <div class="stat-label" style="font-size:1rem;font-weight:700;color:var(--text-primary)">${item.label}</div>
            <div class="stat-label">${item.detail}</div>
          </div>`).join('')}
      </div>

      <!-- Today's stats -->
      <div class="grid-2 mb-xl">
        <div class="card card-glass card-enter-2">
          <div class="card-header">
            <div class="card-title">📊 Estadísticas</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:0.75rem">
            <div style="display:flex;justify-content:space-between">
              <span class="text-muted">XP total</span>
              <strong>${formatNumber(gam.xp)} XP</strong>
            </div>
            <div style="display:flex;justify-content:space-between">
              <span class="text-muted">Palabras aprendidas</span>
              <strong>${prog.wordsLearned.length}</strong>
            </div>
            <div style="display:flex;justify-content:space-between">
              <span class="text-muted">Precisión</span>
              <strong style="color:${accuracy >= 70 ? 'var(--color-accent)' : 'var(--color-warning)'}">${accuracy}%</strong>
            </div>
            <div style="display:flex;justify-content:space-between">
              <span class="text-muted">Tiempo total</span>
              <strong>${formatMinutes(prog.totalMinutes)}</strong>
            </div>
            <div class="divider"></div>
            <div style="display:flex;justify-content:space-between">
              <span class="text-muted">Hoy</span>
              <strong>${todaySession?.minutes || 0} min</strong>
            </div>
          </div>
        </div>

        <div class="card card-glass card-enter-3">
          <div class="card-header">
            <div class="card-title">🗺️ Plan de estudio</div>
          </div>
          ${user.studyPlan ? `
            <div style="display:flex;flex-direction:column;gap:0.5rem">
              ${user.studyPlan.map(item => `
                <div class="plan-card" onclick="App.navigate('${item.page}')">
                  <div class="plan-icon" style="background:${item.color}22;color:${item.color};width:36px;height:36px;font-size:1.25rem">${item.icon}</div>
                  <div class="plan-info">
                    <div style="font-size:0.875rem;font-weight:700">${item.title}</div>
                    <div style="font-size:0.75rem;color:var(--text-muted)">${item.detail}</div>
                  </div>
                  <span class="plan-arrow" style="font-size:1rem">→</span>
                </div>`).join('')}
            </div>
          ` : `
            <div class="empty-state" style="padding:1rem">
              <div class="empty-state-icon" style="font-size:2rem">🎯</div>
              <p style="font-size:0.875rem">Completa el <strong>Test de Nivel</strong> para obtener un plan personalizado.</p>
              <button class="btn btn-primary btn-sm mt-md" onclick="App.navigate('assessment')">Hacer el test →</button>
            </div>`}
        </div>
      </div>

      <!-- Weekly activity -->
      <div class="card card-glass mb-xl card-enter-4">
        <div class="card-header">
          <div class="card-title">📅 Actividad semanal</div>
        </div>
        <div style="display:flex;gap:0.5rem;align-items:flex-end;height:80px">
          ${weekly.map(d => {
            const maxMins = Math.max(...weekly.map(w => w.minutes), 1);
            const h = Math.max(4, (d.minutes / maxMins) * 64);
            const isToday = d.date === todayStr();
            return `
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
                <div style="width:100%;height:${h}px;background:${isToday ? 'var(--grad-primary)' : 'var(--color-primary-light)'};border-radius:4px 4px 0 0;transition:height 1s ease"></div>
                <div style="font-size:0.7rem;color:var(--text-muted)">${d.day}</div>
              </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Achievements preview -->
      <div class="card card-glass card-enter-5">
        <div class="card-header">
          <div class="card-title">🏆 Logros recientes</div>
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('progress')">Ver todos →</button>
        </div>
        ${gam.achievements.length === 0 ? `
          <div class="empty-state" style="padding:1rem">
            <p style="font-size:0.875rem">¡Completa tu primer ejercicio o lección para desbloquear logros!</p>
          </div>` :
          `<div style="display:flex;gap:0.75rem;flex-wrap:wrap">
            ${gam.achievements.slice(-6).map(id => {
              const ach = Gamification.getAllAchievements().find(a => a.id === id);
              return ach ? `
                <div class="achievement-badge unlocked" style="width:auto;padding:0.5rem 1rem;display:flex;align-items:center;gap:0.5rem">
                  <span>${ach.emoji}</span>
                  <span style="font-size:0.8125rem;font-weight:700">${ach.name}</span>
                </div>` : '';
            }).join('')}
          </div>`}
      </div>`;
  },
};
