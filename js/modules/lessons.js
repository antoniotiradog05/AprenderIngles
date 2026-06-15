// ============================================================
// EnglishMaster — modules/lessons.js
// Lesson content renderer
// ============================================================

const Lessons = {
  render(container) {
    const user = Storage.getUser();
    const viewed = Storage.getProgress().grammarTopicsViewed;
    const topics = getAllGrammarTopics();

    // Group by category
    const byCategory = {};
    topics.forEach(t => {
      if (!byCategory[t.category]) byCategory[t.category] = [];
      byCategory[t.category].push(t);
    });

    const categoryLabels = { tenses: '⏰ Tiempos Verbales', conditionals: '🔀 Condicionales', grammar: '📝 Gramática Esencial' };

    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">📚 Lecciones</h1>
        <p class="page-subtitle">Aprende gramática con explicaciones claras y ejemplos reales</p>
      </div>

      <div class="tabs" id="lesson-tabs">
        <button class="tab-btn active" data-level="all">Todos</button>
        ${CEFR_LEVELS.map(l => `<button class="tab-btn" data-level="${l}">${l} — ${CEFR_NAMES[l]}</button>`).join('')}
      </div>

      <div id="lessons-list"></div>`;

    const renderList = (filterLevel) => {
      const list = document.getElementById('lessons-list');
      const filtered = filterLevel === 'all' ? topics : topics.filter(t => t.level === filterLevel);

      if (filtered.length === 0) {
        list.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📚</div><p>No hay lecciones para este nivel todavía.</p></div>`;
        return;
      }

      list.innerHTML = `<div class="grid-auto">
        ${filtered.map((t, i) => {
          const done = viewed.includes(t.id);
          return `
            <div class="card card-hover card-enter-${(i % 6) + 1}" style="cursor:pointer" data-topic="${t.id}">
              <div class="card-header">
                <div>
                  <span class="card-icon" style="${done ? 'background:var(--color-accent-light)' : ''}">${done ? '✅' : t.emoji}</span>
                </div>
                <span class="level-pill level-${t.level}">${t.level}</span>
              </div>
              <div class="card-title" style="margin-top:0.75rem">${t.title}</div>
              <div style="font-size:0.8125rem;color:var(--text-muted);margin-top:0.5rem">${t.titleEs}</div>
              <div style="margin-top:0.75rem">
                <span class="badge ${t.category === 'tenses' ? 'badge-primary' : t.category === 'conditionals' ? 'badge-warning' : 'badge-info'}">
                  ${categoryLabels[t.category] || t.category}
                </span>
              </div>
              ${done ? '<div style="font-size:0.75rem;color:var(--color-accent);margin-top:0.5rem">✓ Completada</div>' : ''}
            </div>`;
        }).join('')}
      </div>`;

      $$('[data-topic]', list).forEach(card => {
        card.addEventListener('click', () => {
          this._renderTopic(container, card.dataset.topic);
        });
      });
    };

    renderList('all');

    $$('.tab-btn', container).forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.tab-btn', container).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderList(btn.dataset.level);
      });
    });
  },

  _renderTopic(container, topicId) {
    const topic = getGrammarTopic(topicId);
    if (!topic) return;

    Storage.logGrammarViewed(topicId);
    Gamification.addXP(25, 'lesson');
    Gamification.unlock('first_lesson');
    Gamification.check();

    container.innerHTML = `
      <div class="animate-slide-right">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <button class="btn btn-ghost btn-sm" id="back-lessons-btn">← Volver</button>
          <span class="level-pill level-${topic.level}">${topic.level}</span>
          <span class="badge badge-primary">${topic.category}</span>
        </div>

        <div class="lesson-content">
          <div class="page-header">
            <h1 class="page-title">${topic.emoji} ${topic.title}</h1>
            <p class="page-subtitle">${topic.titleEs}</p>
          </div>

          <div class="card card-glass mb-lg">
            <p style="font-size:0.9375rem;color:var(--text-secondary);line-height:1.7">${topic.description}</p>
          </div>

          <div class="lesson-section">
            <h3>📐 Estructura</h3>
            ${topic.structure.map(s => `
              <div class="rule-box mb-md">
                <div style="font-weight:700;margin-bottom:0.5rem;color:var(--color-primary)">${s.form}</div>
                <div style="font-family:monospace;background:var(--bg-elevated);padding:0.5rem 0.75rem;border-radius:var(--radius-sm);margin-bottom:0.5rem;font-size:0.9rem">${s.formula}</div>
                <div class="example-box" style="margin:0">
                  <span class="example-icon">✏️</span>
                  <div>
                    <div class="example-en">${s.example}</div>
                  </div>
                  <button class="btn btn-ghost btn-sm btn-icon" onclick="Speech.speak('${s.example.replace(/'/g,"\\'")}')">🔊</button>
                </div>
              </div>`).join('')}
          </div>

          <div class="lesson-section">
            <h3>💡 Usos</h3>
            ${topic.uses.map(u => `
              <div class="example-box mb-md">
                <span class="example-icon">✅</span>
                <div style="flex:1">
                  <div style="font-size:0.875rem;color:var(--text-muted);margin-bottom:0.25rem">${u.desc}</div>
                  <div class="example-en">${u.example}</div>
                  ${u.exampleEs ? `<div class="example-es">${u.exampleEs}</div>` : ''}
                </div>
                <button class="btn btn-ghost btn-sm btn-icon" onclick="Speech.speak('${u.example.replace(/'/g,"\\'")}')">🔊</button>
              </div>`).join('')}
          </div>

          ${topic.signals && topic.signals.length ? `
          <div class="lesson-section">
            <h3>⏰ Palabras señal</h3>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
              ${topic.signals.map(s => `<span class="badge badge-warning">${s}</span>`).join('')}
            </div>
          </div>` : ''}

          ${topic.tips && topic.tips.length ? `
          <div class="lesson-section">
            <h3>🧠 Consejos y trucos</h3>
            ${topic.tips.map(t => `
              <div style="background:var(--color-accent-light);border:1px solid var(--color-accent);border-radius:var(--radius-sm);padding:0.75rem 1rem;margin-bottom:0.5rem;font-size:0.875rem;color:var(--text-secondary)">
                💡 ${t}
              </div>`).join('')}
          </div>` : ''}

          ${topic.commonErrors && topic.commonErrors.length ? `
          <div class="lesson-section">
            <h3>⚠️ Errores comunes</h3>
            ${topic.commonErrors.map(e => `
              <div class="card" style="margin-bottom:0.75rem;border-color:var(--color-danger)">
                <div style="display:flex;align-items:flex-start;gap:1rem">
                  <div style="flex:1">
                    <div style="color:var(--color-danger);font-size:0.875rem;text-decoration:line-through;margin-bottom:0.25rem">❌ ${e.wrong}</div>
                    <div style="color:var(--color-accent);font-size:0.875rem;margin-bottom:0.5rem">✅ ${e.right}</div>
                    <div style="font-size:0.8125rem;color:var(--text-muted)">📌 ${e.rule}</div>
                  </div>
                </div>
              </div>`).join('')}
          </div>` : ''}

          <div class="divider"></div>

          <div style="display:flex;gap:1rem;flex-wrap:wrap">
            <button class="btn btn-primary" id="practice-topic-btn">✏️ Practicar este tema</button>
            <button class="btn btn-ghost" id="back-lessons-btn2">← Ver todas las lecciones</button>
          </div>
        </div>
      </div>`;

    document.getElementById('back-lessons-btn').addEventListener('click', () => this.render(container));
    document.getElementById('back-lessons-btn2').addEventListener('click', () => this.render(container));
    document.getElementById('practice-topic-btn').addEventListener('click', () => {
      App.navigate('exercises', { topic: topic.id });
    });
  },
};
