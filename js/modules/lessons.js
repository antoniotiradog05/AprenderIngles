// ============================================================
// EnglishMaster — modules/lessons.js
// Lesson content renderer + Tense Conjugator & Timeline
// ============================================================

const Lessons = {
  currentTab: 'topics', // 'topics', 'timeline', 'conjugator'

  render(container) {
    container.innerHTML = `
      <div class="page-header animate-fade-in">
        <h1 class="page-title">📚 Centro de Estudio de Gramática</h1>
        <p class="page-subtitle">Aprende, compara tiempos verbales y conjuga cualquier verbo en inglés</p>
      </div>

      <div class="tabs" id="lessons-main-tabs" style="margin-bottom: 2rem;">
        <button class="tab-btn ${this.currentTab === 'topics' ? 'active' : ''}" data-tab="topics">📚 Temas de Gramática</button>
        <button class="tab-btn ${this.currentTab === 'timeline' ? 'active' : ''}" data-tab="timeline">⏰ Línea de Tiempo de Tiempos</button>
        <button class="tab-btn ${this.currentTab === 'conjugator' ? 'active' : ''}" data-tab="conjugator">🔄 Conjugador de Verbos</button>
      </div>

      <div id="lessons-tab-content" class="animate-fade-in"></div>
    `;

    // Tab switcher
    $$('#lessons-main-tabs .tab-btn', container).forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#lessons-main-tabs .tab-btn', container).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.dataset.tab;
        this._renderActiveTab(container);
      });
    });

    this._renderActiveTab(container);
  },

  _renderActiveTab(container) {
    const tabContent = document.getElementById('lessons-tab-content');
    if (!tabContent) return;

    tabContent.innerHTML = '';

    if (this.currentTab === 'topics') {
      this._renderTopicsTab(tabContent, container);
    } else if (this.currentTab === 'timeline') {
      this._renderTimelineTab(tabContent);
    } else if (this.currentTab === 'conjugator') {
      this._renderConjugatorTab(tabContent);
    }
  },

  // ---- 1. TOPICS LIST TAB ----
  _renderTopicsTab(tabContent, mainContainer) {
    const viewed = Storage.getProgress().grammarTopicsViewed;
    const topics = getAllGrammarTopics();
    const categoryLabels = { tenses: '⏰ Tiempos Verbales', conditionals: '🔀 Condicionales', grammar: '📝 Gramática Esencial' };

    tabContent.innerHTML = `
      <div class="tabs" id="lesson-level-tabs" style="background: var(--bg-card); padding: 0.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem;">
        <button class="tab-btn active" data-level="all">Todos</button>
        ${CEFR_LEVELS.map(l => `<button class="tab-btn" data-level="${l}">${l} — ${CEFR_NAMES[l]}</button>`).join('')}
      </div>
      <div id="lessons-list"></div>
    `;

    const renderList = (filterLevel) => {
      const list = document.getElementById('lessons-list');
      if (!list) return;

      const filtered = filterLevel === 'all' ? topics : topics.filter(t => t.level === filterLevel);

      if (filtered.length === 0) {
        list.innerHTML = `
          <div class="empty-state card card-glass" style="padding: 3rem; text-align: center;">
            <div class="empty-state-icon" style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
            <p style="color: var(--text-secondary)">No hay lecciones cargadas para este nivel todavía.</p>
          </div>`;
        return;
      }

      list.innerHTML = `
        <div class="grid-auto">
          ${filtered.map((t, i) => {
            const done = viewed.includes(t.id);
            return `
              <div class="card card-hover card-enter-${(i % 6) + 1}" style="cursor:pointer; display:flex; flex-direction:column; justify-content:space-between; min-height: 180px;" data-topic="${t.id}">
                <div>
                  <div class="card-header" style="margin-bottom: 0.75rem;">
                    <span class="card-icon" style="${done ? 'background:var(--color-accent-light)' : ''}; width: 36px; height: 36px; font-size: 1.25rem;">${done ? '✅' : t.emoji}</span>
                    <span class="level-pill level-${t.level}" style="font-size: 0.7rem; padding: 2px 8px;">${t.level}</span>
                  </div>
                  <div class="card-title" style="font-size: 1rem; margin-top: 0.5rem">${t.title}</div>
                  <div style="font-size: 0.8rem; color:var(--text-muted); margin-top: 0.25rem">${t.titleEs}</div>
                </div>
                <div style="margin-top: 1rem; display:flex; justify-content:space-between; align-items:center;">
                  <span class="badge ${t.category === 'tenses' ? 'badge-primary' : t.category === 'conditionals' ? 'badge-warning' : 'badge-info'}" style="font-size: 0.65rem; padding: 2px 8px;">
                    ${categoryLabels[t.category] || t.category}
                  </span>
                  ${done ? '<span style="font-size:0.75rem; color:var(--color-accent); font-weight:600;">Completado</span>' : ''}
                </div>
              </div>`;
          }).join('')}
        </div>`;

      $$('[data-topic]', list).forEach(card => {
        card.addEventListener('click', () => {
          this._renderTopic(mainContainer, card.dataset.topic);
        });
      });
    };

    renderList('all');

    $$('#lesson-level-tabs .tab-btn', tabContent).forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#lesson-level-tabs .tab-btn', tabContent).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderList(btn.dataset.level);
      });
    });
  },

  // ---- 2. TIMELINE TAB ----
  _renderTimelineTab(tabContent) {
    tabContent.innerHTML = `
      <div class="card card-glass mb-lg animate-fade-in" style="padding: 1.5rem;">
        <h3 style="margin-top: 0;">⏰ Comparación Visual de Tiempos Verbales</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.5rem;">
          Comprender la relación temporal entre los diferentes tiempos verbales es fundamental. Haz clic en cualquier tiempo de la línea para estudiar su uso, fórmula y cómo se compara con los demás.
        </p>
      </div>

      <div class="timeline-visual-container" style="overflow-x: auto; padding: 2rem 0; margin-bottom: 2rem;">
        <div style="display: flex; min-width: 900px; gap: 2rem; position: relative;">
          
          <!-- PASADO -->
          <div style="flex: 1; display:flex; flex-direction:column; gap: 1rem; background: rgba(99, 102, 241, 0.05); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
            <div style="text-align: center; font-weight: 800; color: var(--color-primary); border-bottom: 2px solid var(--color-primary); padding-bottom: 0.5rem; margin-bottom: 0.5rem; font-size: 0.875rem;">PASADO</div>
            
            <div class="card card-hover timeline-item" data-tense="past_perfect" style="cursor: pointer; padding: 1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                <strong style="color: var(--color-primary); font-size: 0.875rem;">Past Perfect</strong>
                <span class="level-pill level-B1" style="font-size: 0.6rem; padding: 1px 6px;">B1</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; background: var(--bg-elevated); padding: 2px 6px; border-radius: 4px; display:inline-block; margin-bottom: 0.5rem;">had + Past Participle</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary)">Acciones completadas ANTES de otro momento en el pasado. ("El pasado del pasado").</div>
            </div>

            <div class="card card-hover timeline-item" data-tense="past_continuous" style="cursor: pointer; padding: 1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                <strong style="color: var(--color-primary); font-size: 0.875rem;">Past Continuous</strong>
                <span class="level-pill level-B1" style="font-size: 0.6rem; padding: 1px 6px;">B1</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; background: var(--bg-elevated); padding: 2px 6px; border-radius: 4px; display:inline-block; margin-bottom: 0.5rem;">was/were + verb-ing</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary)">Acciones en progreso en un momento concreto del pasado o interrumpidas.</div>
            </div>

            <div class="card card-hover timeline-item" data-tense="past_simple" style="cursor: pointer; padding: 1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                <strong style="color: var(--color-primary); font-size: 0.875rem;">Past Simple</strong>
                <span class="level-pill level-A2" style="font-size: 0.6rem; padding: 1px 6px;">A2</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; background: var(--bg-elevated); padding: 2px 6px; border-radius: 4px; display:inline-block; margin-bottom: 0.5rem;">verb + ed / irregular</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary)">Acciones terminadas y cerradas en un momento específico del pasado.</div>
            </div>
          </div>

          <!-- PRESENTE -->
          <div style="flex: 1; display:flex; flex-direction:column; gap: 1rem; background: rgba(16, 185, 129, 0.05); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
            <div style="text-align: center; font-weight: 800; color: var(--color-accent); border-bottom: 2px solid var(--color-accent); padding-bottom: 0.5rem; margin-bottom: 0.5rem; font-size: 0.875rem;">PRESENTE</div>
            
            <div class="card card-hover timeline-item" data-tense="present_perfect" style="cursor: pointer; padding: 1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                <strong style="color: var(--color-accent); font-size: 0.875rem;">Present Perfect</strong>
                <span class="level-pill level-B1" style="font-size: 0.6rem; padding: 1px 6px;">B1</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; background: var(--bg-elevated); padding: 2px 6px; border-radius: 4px; display:inline-block; margin-bottom: 0.5rem;">have/has + Past Participle</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary)">Acciones pasadas con relevancia en el presente. Conecta pasado y presente.</div>
            </div>

            <div class="card card-hover timeline-item" data-tense="present_simple" style="cursor: pointer; padding: 1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                <strong style="color: var(--color-accent); font-size: 0.875rem;">Present Simple</strong>
                <span class="level-pill level-A1" style="font-size: 0.6rem; padding: 1px 6px;">A1</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; background: var(--bg-elevated); padding: 2px 6px; border-radius: 4px; display:inline-block; margin-bottom: 0.5rem;">verb (+ -s/es)</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary)">Hechos generales, verdades universales, rutinas y hábitos constantes.</div>
            </div>

            <div class="card card-hover timeline-item" data-tense="present_continuous" style="cursor: pointer; padding: 1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                <strong style="color: var(--color-accent); font-size: 0.875rem;">Present Continuous</strong>
                <span class="level-pill level-A1" style="font-size: 0.6rem; padding: 1px 6px;">A1</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; background: var(--bg-elevated); padding: 2px 6px; border-radius: 4px; display:inline-block; margin-bottom: 0.5rem;">am/is/are + verb-ing</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary)">Acciones que ocurren ahora mismo o de forma temporal en este periodo.</div>
            </div>
          </div>

          <!-- FUTURO -->
          <div style="flex: 1; display:flex; flex-direction:column; gap: 1rem; background: rgba(245, 158, 11, 0.05); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
            <div style="text-align: center; font-weight: 800; color: var(--color-warning); border-bottom: 2px solid var(--color-warning); padding-bottom: 0.5rem; margin-bottom: 0.5rem; font-size: 0.875rem;">FUTURO</div>
            
            <div class="card card-hover timeline-item" data-tense="going_to" style="cursor: pointer; padding: 1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                <strong style="color: var(--color-warning); font-size: 0.875rem;">Future (Going to)</strong>
                <span class="level-pill level-A2" style="font-size: 0.6rem; padding: 1px 6px;">A2</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; background: var(--bg-elevated); padding: 2px 6px; border-radius: 4px; display:inline-block; margin-bottom: 0.5rem;">am/is/are going to + verb</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary)">Planes decididos previamente o predicciones con evidencia clara en el presente.</div>
            </div>

            <div class="card card-hover timeline-item" data-tense="future_will" style="cursor: pointer; padding: 1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                <strong style="color: var(--color-warning); font-size: 0.875rem;">Future (Will)</strong>
                <span class="level-pill level-A2" style="font-size: 0.6rem; padding: 1px 6px;">A2</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; background: var(--bg-elevated); padding: 2px 6px; border-radius: 4px; display:inline-block; margin-bottom: 0.5rem;">will + verb</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary)">Predicciones generales, decisiones espontáneas, promesas y ofrecimientos.</div>
            </div>
          </div>

        </div>
      </div>

      <div id="timeline-tense-details" class="card card-glass animate-fade-in" style="min-height: 200px; display:none; padding: 1.5rem; border-left: 5px solid var(--color-primary);">
        <!-- Tense details loaded dynamically -->
      </div>
    `;

    // Timeline item click listeners
    const detailsContainer = document.getElementById('timeline-tense-details');
    const items = tabContent.querySelectorAll('.timeline-item');

    items.forEach(item => {
      item.addEventListener('click', () => {
        // Highlight active item
        items.forEach(it => {
          it.style.borderColor = 'var(--border-color)';
          it.style.boxShadow = 'none';
        });

        const tenseKey = item.dataset.tense;
        const topic = getGrammarTopic(tenseKey);
        if (!topic) return;

        let accentColor = 'var(--color-primary)';
        if (tenseKey.startsWith('present')) accentColor = 'var(--color-accent)';
        if (tenseKey.startsWith('future') || tenseKey === 'going_to') accentColor = 'var(--color-warning)';

        item.style.borderColor = accentColor;
        item.style.boxShadow = `0 0 10px ${accentColor}40`;

        detailsContainer.style.display = 'block';
        detailsContainer.style.borderLeftColor = accentColor;
        detailsContainer.style.animation = 'none';
        void detailsContainer.offsetWidth; // Trigger reflow
        detailsContainer.style.animation = 'fadeIn var(--transition-normal) ease';

        detailsContainer.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom: 1rem;">
            <div>
              <h3 style="margin:0; color:${accentColor};">${topic.emoji} ${topic.title}</h3>
              <p style="margin:2px 0 0 0; font-size:0.875rem; color:var(--text-muted)">${topic.titleEs}</p>
            </div>
            <span class="level-pill level-${topic.level}">${topic.level}</span>
          </div>

          <p style="font-size:0.9rem; line-height:1.6; color:var(--text-secondary); margin-bottom: 1rem;">${topic.description}</p>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <h4 style="margin:0 0 0.5rem 0; font-size:0.875rem;">Estructura Afirmativa</h4>
              <code style="display:block; background:var(--bg-elevated); padding: 0.5rem; border-radius: 4px; font-size:0.8rem; border:1px solid var(--border-color);">
                ${topic.structure.find(s => s.form === 'Affirmative' || s.form === 'Structure')?.formula || ''}
              </code>
            </div>
            <div>
              <h4 style="margin:0 0 0.5rem 0; font-size:0.875rem;">Ejemplo Principal</h4>
              <div style="background:var(--bg-elevated); padding: 0.5rem; border-radius: 4px; font-size:0.8rem; border:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
                <span>${topic.structure[0]?.example || ''}</span>
                <button class="btn btn-ghost btn-sm btn-icon" style="padding: 2px; font-size: 0.75rem;" onclick="Speech.speak('${topic.structure[0]?.example.replace(/'/g, "\\'")}')">🔊</button>
              </div>
            </div>
          </div>

          <div style="margin-bottom:1rem;">
            <h4 style="margin:0 0 0.5rem 0; font-size:0.875rem;">Usos Clave</h4>
            <ul style="margin:0; padding-left:1.25rem; font-size:0.85rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:0.25rem;">
              ${topic.uses.map(u => `<li><strong>${u.desc}:</strong> "${u.example}" <em>(${u.exampleEs})</em></li>`).join('')}
            </ul>
          </div>

          ${topic.signals && topic.signals.length ? `
          <div style="margin-bottom:1rem;">
            <h4 style="margin:0 0 0.5rem 0; font-size:0.875rem;">Palabras Señal (Signal Words)</h4>
            <div style="display:flex; flex-wrap:wrap; gap:0.25rem;">
              ${topic.signals.map(s => `<span class="badge badge-warning" style="font-size:0.65rem; padding:2px 6px;">${s}</span>`).join('')}
            </div>
          </div>` : ''}

          <div style="margin-top:1.5rem; display:flex; gap:1rem;">
            <button class="btn btn-primary btn-sm" id="timeline-go-to-lesson">📚 Ver Lección Completa</button>
            <button class="btn btn-ghost btn-sm" id="timeline-go-to-practice">✏️ Practicar</button>
          </div>
        `;

        document.getElementById('timeline-go-to-lesson').addEventListener('click', () => {
          this._renderTopic(document.getElementById('page-container'), topic.id);
        });
        document.getElementById('timeline-go-to-practice').addEventListener('click', () => {
          App.navigate('exercises', { topic: topic.id });
        });
      });
    });

    // Auto click first item
    if (items.length > 0) items[2].click(); // Click Past Simple as a good central starting point
  },

  // ---- 3. CONJUGATOR TAB ----
  _renderConjugatorTab(tabContent) {
    tabContent.innerHTML = `
      <div class="card card-glass mb-lg animate-fade-in" style="padding: 1.5rem;">
        <h3 style="margin-top: 0;">🔄 Conjugador Interactivo de Verbos</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
          Escribe cualquier verbo en inglés (regular o irregular) y observa instantáneamente cómo se conjuga en los 8 tiempos verbales clave. Incluye audio TTS para estudiar la pronunciación.
        </p>

        <div style="display:flex; gap:0.75rem; max-width: 500px; margin-bottom: 1rem;">
          <input type="text" id="conjugator-input" class="input-field" placeholder="Escribe un verbo (ej. eat, study, work, write...)" value="work" style="flex:1;">
          <button class="btn btn-primary" id="conjugator-btn">Conjugarlo</button>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; font-size:0.8rem; color: var(--text-muted);">
          <span>Sugerencias rápidas:</span>
          ${['go', 'eat', 'study', 'work', 'write', 'speak', 'run', 'have', 'do'].map(v => `
            <a href="#" class="conjugator-sug" style="color:var(--color-primary); text-decoration:none; font-weight:600;">${v}</a>
          `).join(' • ')}
        </div>
      </div>

      <div id="conjugator-results" class="animate-fade-in" style="display:none;">
        <h3 id="conjugator-results-title" style="margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;"></h3>
        <div class="grid-auto" id="conjugator-cards-grid"></div>
      </div>
    `;

    const input = document.getElementById('conjugator-input');
    const btn = document.getElementById('conjugator-btn');

    const runConjugator = () => {
      const verb = input.value.trim();
      if (!verb) return;
      this._conjugateVerb(verb);
    };

    btn.addEventListener('click', runConjugator);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') runConjugator();
    });

    tabContent.querySelectorAll('.conjugator-sug').forEach(sug => {
      sug.addEventListener('click', (e) => {
        e.preventDefault();
        input.value = sug.textContent;
        runConjugator();
      });
    });

    // Run first default conjugation
    runConjugator();
  },

  _conjugateVerb(verb) {
    const resultsContainer = document.getElementById('conjugator-results');
    const title = document.getElementById('conjugator-results-title');
    const grid = document.getElementById('conjugator-cards-grid');

    if (!resultsContainer || !title || !grid) return;

    const vForms = this._getVerbForms(verb);

    title.innerHTML = `Conjugación de: <span style="color: var(--color-primary); text-transform: uppercase;">${vForms.base}</span> <span style="font-size:0.9rem; font-weight:normal; color: var(--text-secondary); margin-left:1rem;">(Pasado: <strong>${vForms.past}</strong> / Participle: <strong>${vForms.pp}</strong> / Gerundio: <strong>${vForms.ing}</strong>)</span>`;

    const tenses = [
      {
        name: 'Present Simple',
        desc: 'Rutinas, hábitos, hechos generales.',
        formula: 'Subject + verb (+ -s/-es for he/she/it)',
        conjugations: this._getPresentSimpleConjugations(vForms)
      },
      {
        name: 'Present Continuous',
        desc: 'Acciones sucediendo ahora mismo.',
        formula: 'Subject + am/is/are + verb-ing',
        conjugations: this._getPresentContinuousConjugations(vForms)
      },
      {
        name: 'Present Perfect',
        desc: 'Experiencias de vida, pasado relevante hoy.',
        formula: 'Subject + have/has + past participle',
        conjugations: this._getPresentPerfectConjugations(vForms)
      },
      {
        name: 'Past Simple',
        desc: 'Acción completada en un momento pasado.',
        formula: 'Subject + past form / -ed',
        conjugations: this._getPastSimpleConjugations(vForms)
      },
      {
        name: 'Past Continuous',
        desc: 'Acción en progreso en un momento del pasado.',
        formula: 'Subject + was/were + verb-ing',
        conjugations: this._getPastContinuousConjugations(vForms)
      },
      {
        name: 'Past Perfect',
        desc: 'Acción anterior a otra acción pasada.',
        formula: 'Subject + had + past participle',
        conjugations: this._getPastPerfectConjugations(vForms)
      },
      {
        name: 'Future Will',
        desc: 'Predicciones, decisiones espontáneas.',
        formula: 'Subject + will + verb (base)',
        conjugations: this._getFutureWillConjugations(vForms)
      },
      {
        name: 'Future Going To',
        desc: 'Planes premeditados, predicciones con evidencia.',
        formula: 'Subject + am/is/are + going to + verb (base)',
        conjugations: this._getGoingToConjugations(vForms)
      }
    ];

    grid.innerHTML = tenses.map((tense, idx) => `
      <div class="card card-hover animate-fade-in card-enter-${(idx % 6) + 1}" style="padding: 1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom: 0.5rem;">
          <h4 style="margin:0; color:var(--color-primary); font-size:1.05rem;">${tense.name}</h4>
          <button class="btn btn-ghost btn-sm btn-icon" style="padding: 4px; font-size: 0.75rem;" onclick="Lessons._speakConjugations('${tense.name}', '${vForms.base}')" title="Escuchar todas las conjugaciones">🔊</button>
        </div>
        <p style="font-size:0.75rem; color:var(--text-muted); margin:0 0 0.75rem 0;">${tense.desc}</p>
        <div style="font-size:0.7rem; font-family:monospace; background:var(--bg-elevated); padding: 4px 8px; border-radius:4px; margin-bottom:0.75rem; border:1px solid var(--border-color); color: var(--text-secondary);">${tense.formula}</div>
        
        <div style="font-size:0.8rem; display:flex; flex-direction:column; gap:4px;">
          ${tense.conjugations.map(c => `
            <div style="display:flex; justify-content:space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 2px;">
              <span style="color:var(--text-muted); font-weight:600; min-width: 45px;">${c.subject}</span>
              <span style="color:var(--text-primary); font-family: monospace; text-align:right;">${c.form}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    resultsContainer.style.display = 'block';
  },

  _speakConjugations(tenseName, verbBase) {
    const vForms = this._getVerbForms(verbBase);
    let conjugations = [];
    if (tenseName === 'Present Simple') conjugations = this._getPresentSimpleConjugations(vForms);
    else if (tenseName === 'Present Continuous') conjugations = this._getPresentContinuousConjugations(vForms);
    else if (tenseName === 'Present Perfect') conjugations = this._getPresentPerfectConjugations(vForms);
    else if (tenseName === 'Past Simple') conjugations = this._getPastSimpleConjugations(vForms);
    else if (tenseName === 'Past Continuous') conjugations = this._getPastContinuousConjugations(vForms);
    else if (tenseName === 'Past Perfect') conjugations = this._getPastPerfectConjugations(vForms);
    else if (tenseName === 'Future Will') conjugations = this._getFutureWillConjugations(vForms);
    else if (tenseName === 'Future Going To') conjugations = this._getGoingToConjugations(vForms);

    // Speak first, third and last pronouns to not be too tedious, or construct a natural reading flow
    const textToSpeak = `${tenseName} for verb ${verbBase}. ` + conjugations.map(c => `${c.subject} ${c.form}`).join('. ');
    Speech.speak(textToSpeak);
  },

  // ---- CONJUGATION GENERATION LOGIC ----
  _getVerbForms(verb) {
    const CONJUGATIONS_DB = {
      be: { past: { I:'was', you:'were', he:'was', she:'was', it:'was', we:'were', they:'were' }, pp: 'been', ing: 'being', s: 'is' },
      go: { past: 'went', pp: 'gone', ing: 'going', s: 'goes' },
      eat: { past: 'ate', pp: 'eaten', ing: 'eating', s: 'eats' },
      run: { past: 'ran', pp: 'run', ing: 'running', s: 'runs' },
      write: { past: 'wrote', pp: 'written', ing: 'writing', s: 'writes' },
      see: { past: 'saw', pp: 'seen', ing: 'seeing', s: 'sees' },
      have: { past: 'had', pp: 'had', ing: 'having', s: 'has' },
      do: { past: 'did', pp: 'done', ing: 'doing', s: 'does' },
      drink: { past: 'drank', pp: 'drunk', ing: 'drinking', s: 'drinks' },
      speak: { past: 'spoke', pp: 'spoken', ing: 'speaking', s: 'speaks' },
      buy: { past: 'bought', pp: 'bought', ing: 'buying', s: 'buys' },
      take: { past: 'took', pp: 'taken', ing: 'taking', s: 'takes' },
      make: { past: 'made', pp: 'made', ing: 'making', s: 'makes' },
      read: { past: 'read', pp: 'read', ing: 'reading', s: 'reads' },
      give: { past: 'gave', pp: 'given', ing: 'giving', s: 'gives' },
      study: { past: 'studied', pp: 'studied', ing: 'studying', s: 'studies' }
    };

    const v = verb.toLowerCase().trim();
    if (CONJUGATIONS_DB[v]) {
      const entry = CONJUGATIONS_DB[v];
      return {
        base: v,
        past: entry.past,
        pp: entry.pp,
        ing: entry.ing,
        s: entry.s
      };
    }

    // Default regular verb rules
    let past = v + 'ed';
    let s = v + 's';
    let ing = v + 'ing';

    if (v.endsWith('e')) {
      past = v + 'd';
      ing = v.slice(0, -1) + 'ing';
    } else if (v.endsWith('y')) {
      const vowelBefore = ['a', 'e', 'i', 'o', 'u'].includes(v[v.length - 2]);
      if (!vowelBefore) {
        past = v.slice(0, -1) + 'ied';
        s = v.slice(0, -1) + 'ies';
      }
    } else if (v.endsWith('ch') || v.endsWith('sh') || v.endsWith('x') || v.endsWith('s') || v.endsWith('z') || v.endsWith('o')) {
      s = v + 'es';
    }

    // Simple CVC double consonant rule for ing (like swim -> swimming, plan -> planning)
    const isCVC = v.length >= 3 && 
                  !['a','e','i','o','u'].includes(v[v.length-1]) && 
                  ['a','e','i','o','u'].includes(v[v.length-2]) && 
                  !['a','e','i','o','u'].includes(v[v.length-3]) &&
                  !['w','x','y'].includes(v[v.length-1]);
    if (isCVC) {
      ing = v + v[v.length-1] + 'ing';
      past = v + v[v.length-1] + 'ed';
    }

    return { base: v, past, pp: past, ing, s };
  },

  _getPresentSimpleConjugations(vForms) {
    if (vForms.base === 'be') {
      return [
        { subject: 'I', form: 'am' },
        { subject: 'You', form: 'are' },
        { subject: 'He/She', form: 'is' },
        { subject: 'We', form: 'are' },
        { subject: 'They', form: 'are' }
      ];
    }
    return [
      { subject: 'I', form: vForms.base },
      { subject: 'You', form: vForms.base },
      { subject: 'He/She', form: vForms.s },
      { subject: 'We', form: vForms.base },
      { subject: 'They', form: vForms.base }
    ];
  },

  _getPresentContinuousConjugations(vForms) {
    return [
      { subject: 'I', form: `am ${vForms.ing}` },
      { subject: 'You', form: `are ${vForms.ing}` },
      { subject: 'He/She', form: `is ${vForms.ing}` },
      { subject: 'We', form: `are ${vForms.ing}` },
      { subject: 'They', form: `are ${vForms.ing}` }
    ];
  },

  _getPresentPerfectConjugations(vForms) {
    const pp = vForms.base === 'be' ? 'been' : vForms.pp;
    return [
      { subject: 'I', form: `have ${pp}` },
      { subject: 'You', form: `have ${pp}` },
      { subject: 'He/She', form: `has ${pp}` },
      { subject: 'We', form: `have ${pp}` },
      { subject: 'They', form: `have ${pp}` }
    ];
  },

  _getPastSimpleConjugations(vForms) {
    if (vForms.base === 'be') {
      return [
        { subject: 'I', form: 'was' },
        { subject: 'You', form: 'were' },
        { subject: 'He/She', form: 'was' },
        { subject: 'We', form: 'were' },
        { subject: 'They', form: 'were' }
      ];
    }
    const past = typeof vForms.past === 'object' ? vForms.past.I : vForms.past;
    return [
      { subject: 'I', form: past },
      { subject: 'You', form: past },
      { subject: 'He/She', form: past },
      { subject: 'We', form: past },
      { subject: 'They', form: past }
    ];
  },

  _getPastContinuousConjugations(vForms) {
    return [
      { subject: 'I', form: `was ${vForms.ing}` },
      { subject: 'You', form: `were ${vForms.ing}` },
      { subject: 'He/She', form: `was ${vForms.ing}` },
      { subject: 'We', form: `were ${vForms.ing}` },
      { subject: 'They', form: `were ${vForms.ing}` }
    ];
  },

  _getPastPerfectConjugations(vForms) {
    const pp = vForms.base === 'be' ? 'been' : vForms.pp;
    return [
      { subject: 'I', form: `had ${pp}` },
      { subject: 'You', form: `had ${pp}` },
      { subject: 'He/She', form: `had ${pp}` },
      { subject: 'We', form: `had ${pp}` },
      { subject: 'They', form: `had ${pp}` }
    ];
  },

  _getFutureWillConjugations(vForms) {
    return [
      { subject: 'I', form: `will ${vForms.base}` },
      { subject: 'You', form: `will ${vForms.base}` },
      { subject: 'He/She', form: `will ${vForms.base}` },
      { subject: 'We', form: `will ${vForms.base}` },
      { subject: 'They', form: `will ${vForms.base}` }
    ];
  },

  _getGoingToConjugations(vForms) {
    return [
      { subject: 'I', form: `am going to ${vForms.base}` },
      { subject: 'You', form: `are going to ${vForms.base}` },
      { subject: 'He/She', form: `is going to ${vForms.base}` },
      { subject: 'We', form: `are going to ${vForms.base}` },
      { subject: 'They', form: `are going to ${vForms.base}` }
    ];
  },

  // ---- SINGLE TOPIC DETAILED VIEW ----
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
              <div class="rule-box mb-md" style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-md);">
                <div style="font-weight:700;margin-bottom:0.5rem;color:var(--color-primary)">${s.form}</div>
                <div style="font-family:monospace;background:var(--bg-elevated);padding:0.5rem 0.75rem;border-radius:var(--radius-sm);margin-bottom:0.5rem;font-size:0.9rem;border:1px dashed var(--border-color);">${s.formula}</div>
                <div class="example-box" style="margin:0; display:flex; justify-content:space-between; align-items:center;">
                  <div style="display:flex; gap:0.5rem; align-items:center;">
                    <span class="example-icon">✏️</span>
                    <span class="example-en" style="font-weight:600; font-size:0.95rem;">${s.example}</span>
                  </div>
                  <button class="btn btn-ghost btn-sm btn-icon" onclick="Speech.speak('${s.example.replace(/'/g,"\\'")}')">🔊</button>
                </div>
              </div>`).join('')}
          </div>

          <div class="lesson-section">
            <h3>💡 Usos y Ejemplos</h3>
            ${topic.uses.map(u => `
              <div class="example-box mb-md" style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-md); display:flex; justify-content:space-between; align-items:center; gap: 1rem;">
                <div style="flex:1">
                  <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.25rem;text-transform:uppercase;font-weight:700;letter-spacing:0.5px;">${u.desc}</div>
                  <div class="example-en" style="font-size:1.05rem; font-weight:600; color:var(--text-primary);">${u.example}</div>
                  ${u.exampleEs ? `<div class="example-es" style="font-size:0.875rem; color:var(--text-secondary); margin-top:2px;">${u.exampleEs}</div>` : ''}
                </div>
                <button class="btn btn-ghost btn-sm btn-icon" onclick="Speech.speak('${u.example.replace(/'/g,"\\'")}')">🔊</button>
              </div>`).join('')}
          </div>

          ${topic.signals && topic.signals.length ? `
          <div class="lesson-section">
            <h3>⏰ Palabras señal (Signal Words)</h3>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
              ${topic.signals.map(s => `<span class="badge badge-warning" style="font-size:0.8rem; padding: 4px 10px;">${s}</span>`).join('')}
            </div>
          </div>` : ''}

          ${topic.tips && topic.tips.length ? `
          <div class="lesson-section">
            <h3>🧠 Consejos y trucos de estudio</h3>
            ${topic.tips.map(t => `
              <div style="background:var(--color-accent-light);border:1px solid var(--color-accent);border-radius:var(--radius-md);padding:0.75rem 1rem;margin-bottom:0.5rem;font-size:0.875rem;color:var(--text-secondary);display:flex;gap:0.5rem;align-items:start;">
                <span>💡</span>
                <span>${t}</span>
              </div>`).join('')}
          </div>` : ''}

          ${topic.commonErrors && topic.commonErrors.length ? `
          <div class="lesson-section">
            <h3>⚠️ Evita estos errores comunes</h3>
            ${topic.commonErrors.map(e => `
              <div class="card" style="margin-bottom:0.75rem;border-color:var(--color-danger); background:rgba(244,63,94,0.02)">
                <div style="display:flex;align-items:flex-start;gap:1rem">
                  <div style="flex:1">
                    <div style="color:var(--color-danger);font-size:0.9rem;text-decoration:line-through;margin-bottom:0.25rem;font-weight:600;">❌ ${e.wrong}</div>
                    <div style="color:var(--color-accent);font-size:0.9rem;margin-bottom:0.5rem;font-weight:600;">✅ ${e.right}</div>
                    <div style="font-size:0.8125rem;color:var(--text-muted)">📌 <strong>Regla:</strong> ${e.rule}</div>
                  </div>
                </div>
              </div>`).join('')}
          </div>` : ''}

          <div class="divider" style="margin: 2rem 0;"></div>

          <div style="display:flex;gap:1rem;flex-wrap:wrap">
            <button class="btn btn-primary" id="practice-topic-btn">✏️ Practicar este tema</button>
            <button class="btn btn-ghost" id="back-lessons-btn2">← Volver al Centro de Estudio</button>
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
