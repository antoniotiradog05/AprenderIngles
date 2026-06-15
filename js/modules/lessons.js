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
          Comprender la relación temporal entre los diferentes tiempos verbales es fundamental. Haz clic en cualquier tiempo de la línea para estudiar su uso, ver su **gráfico temporal** y compararlo de forma directa con otros tiempos.
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

      <!-- INTERACTIVE COMPARISON SANDBOX SELECTOR -->
      <div class="card card-glass mb-lg animate-fade-in" style="padding: 1.5rem;">
        <h4 style="margin:0 0 0.5rem 0; display:flex; align-items:center; gap:0.5rem;">⚖️ Comparador Libre de Tiempos Verbales</h4>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:1.25rem;">Compara dos tiempos verbales cualesquiera de forma libre para ver sus diagramas y contrastarlos:</p>
        
        <div style="display:flex; gap:1rem; flex-wrap:wrap; align-items:center; margin-bottom:1rem;">
          <select id="compare-select-1" class="input-field" style="max-width: 250px; padding: 8px var(--space-md);">
            <option value="present_simple">Present Simple</option>
            <option value="present_continuous">Present Continuous</option>
            <option value="present_perfect">Present Perfect</option>
            <option value="past_simple" selected>Past Simple</option>
            <option value="past_continuous">Past Continuous</option>
            <option value="past_perfect">Past Perfect</option>
            <option value="future_will">Future (Will)</option>
            <option value="going_to">Future (Going to)</option>
          </select>
          <span style="font-weight:bold; color:var(--text-muted);">vs.</span>
          <select id="compare-select-2" class="input-field" style="max-width: 250px; padding: 8px var(--space-md);">
            <option value="present_simple">Present Simple</option>
            <option value="present_continuous">Present Continuous</option>
            <option value="present_perfect" selected>Present Perfect</option>
            <option value="past_simple">Past Simple</option>
            <option value="past_continuous">Past Continuous</option>
            <option value="past_perfect">Past Perfect</option>
            <option value="future_will">Future (Will)</option>
            <option value="going_to">Future (Going to)</option>
          </select>
          <button class="btn btn-primary btn-sm" id="trigger-free-compare-btn">Comparar Tiempos</button>
        </div>
        
        <div id="free-comparison-output"></div>
      </div>

      <div id="timeline-tense-details" class="card card-glass animate-fade-in" style="min-height: 200px; display:none; padding: 1.5rem; border-left: 5px solid var(--color-primary); margin-bottom: 2rem;">
        <!-- Tense details loaded dynamically -->
      </div>
    `;

    // Free comparison triggering logic
    const select1 = document.getElementById('compare-select-1');
    const select2 = document.getElementById('compare-select-2');
    const freeCompareBtn = document.getElementById('trigger-free-compare-btn');
    const freeCompareOutput = document.getElementById('free-comparison-output');

    const updateFreeCompare = () => {
      const tA = select1.value;
      const tB = select2.value;

      if (tA === tB) {
        freeCompareOutput.innerHTML = `<div style="padding:1rem; color:var(--color-danger); font-size:0.85rem; font-weight:600;">⚠️ Por favor, selecciona dos tiempos verbales diferentes para comparar.</div>`;
        return;
      }

      const svgA = this._getTenseSVG(tA);
      const svgB = this._getTenseSVG(tB);
      
      const detailsA = getGrammarTopic(tA);
      const detailsB = getGrammarTopic(tB);

      let textComparison = this._showSideBySideComparison(tA, tB);

      freeCompareOutput.innerHTML = `
        <div class="animate-fade-in" style="margin-top: 1.5rem; display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem;">
          <div style="border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-md); background: rgba(0,0,0,0.02)">
            <h5 style="margin:0 0 0.5rem 0; font-size: 0.9rem; color: var(--color-primary); font-weight: 800;">${detailsA.title}</h5>
            <div style="transform: scale(0.9); transform-origin: top left; margin-bottom:-0.75rem;">${svgA}</div>
            <p style="font-size:0.8rem; color:var(--text-secondary); margin: 0.5rem 0 0 0; line-height: 1.4;">${detailsA.description}</p>
          </div>
          <div style="border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-md); background: rgba(0,0,0,0.02)">
            <h5 style="margin:0 0 0.5rem 0; font-size: 0.9rem; color: var(--color-accent); font-weight: 800;">${detailsB.title}</h5>
            <div style="transform: scale(0.9); transform-origin: top left; margin-bottom:-0.75rem;">${svgB}</div>
            <p style="font-size:0.8rem; color:var(--text-secondary); margin: 0.5rem 0 0 0; line-height: 1.4;">${detailsB.description}</p>
          </div>
        </div>
        <div style="margin-top: 1rem;">
          ${textComparison}
        </div>
      `;
    };

    freeCompareBtn.addEventListener('click', updateFreeCompare);
    updateFreeCompare(); // Render initial free comparison

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

        // Filter list of tenses to compare with
        const availableComparisons = [
          { key: 'past_simple-present_perfect', label: 'Past Simple vs. Present Perfect' },
          { key: 'past_simple-past_continuous', label: 'Past Simple vs. Past Continuous' },
          { key: 'present_simple-present_continuous', label: 'Present Simple vs. Present Continuous' },
          { key: 'future_will-going_to', label: 'Future (Will) vs. Future (Going to)' }
        ].filter(c => c.key.includes(tenseKey));

        detailsContainer.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom: 1rem;">
            <div>
              <h3 style="margin:0; color:${accentColor};">${topic.emoji} ${topic.title}</h3>
              <p style="margin:2px 0 0 0; font-size:0.875rem; color:var(--text-muted)">${topic.titleEs}</p>
            </div>
            <span class="level-pill level-${topic.level}">${topic.level}</span>
          </div>

          <!-- DYNAMIC GRAPHIC SVG TIMELINE -->
          <div style="margin-bottom: 1.5rem;">
            <h4 style="margin:0 0 0.5rem 0; font-size:0.875rem;">Representación Gráfica Temporal:</h4>
            ${this._getTenseSVG(tenseKey)}
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
          <div style="margin-bottom:1.5rem;">
            <h4 style="margin:0 0 0.5rem 0; font-size:0.875rem;">Palabras Señal (Signal Words)</h4>
            <div style="display:flex; flex-wrap:wrap; gap:0.25rem;">
              ${topic.signals.map(s => `<span class="badge badge-warning" style="font-size:0.65rem; padding:2px 6px;">${s}</span>`).join('')}
            </div>
          </div>` : ''}

          <!-- SIDE BY SIDE COMPARISON SELECTOR -->
          ${availableComparisons.length ? `
          <div style="border-top:1px solid var(--border-color); padding-top:1.5rem; margin-top:1.5rem;">
            <h4 style="margin:0 0 0.75rem 0; font-size:0.875rem;">🔍 Comparación Rápida con otros Tiempos:</h4>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom: 1rem;">
              ${availableComparisons.map(c => `
                <button class="btn btn-ghost btn-sm tense-compare-action-btn" data-comp-key="${c.key}" style="font-size:0.75rem;">Comparar: ${c.label}</button>
              `).join('')}
            </div>
            <div id="side-by-side-comparison-box"></div>
          </div>` : ''}

          <div style="margin-top:2rem; display:flex; gap:1rem; border-top:1px solid var(--border-color); padding-top:1.5rem;">
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

        // Add side-by-side comparison action handlers
        const compBox = document.getElementById('side-by-side-comparison-box');
        tabContent.querySelectorAll('.tense-compare-action-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const key = btn.dataset.compKey;
            const parts = key.split('-');
            compBox.innerHTML = this._showSideBySideComparison(parts[0], parts[1]);
            
            // Toggle active styling
            tabContent.querySelectorAll('.tense-compare-action-btn').forEach(b => b.classList.remove('btn-primary'));
            btn.classList.add('btn-primary');
          });
        });

        // Automatically activate first comparison if available
        const firstCompBtn = tabContent.querySelector('.tense-compare-action-btn');
        if (firstCompBtn) firstCompBtn.click();
      });
    });

    // Auto click first item
    if (items.length > 0) items[2].click(); // Click Past Simple as a good central starting point
  },

  _getTenseSVG(tenseKey) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f3f4f6' : '#1f2937';
    const textMuted = isDark ? '#9ca3af' : '#6b7280';
    const gridColor = isDark ? '#374151' : '#e5e7eb';
    
    let graphic = '';
    
    switch (tenseKey) {
      case 'past_simple':
        graphic = `
          <line x1="20" y1="50" x2="380" y2="50" stroke="${gridColor}" stroke-width="3" stroke-dasharray="4" />
          <polygon points="380,45 390,50 380,55" fill="${gridColor}" />
          <line x1="250" y1="40" x2="250" y2="60" stroke="${textColor}" stroke-width="3" />
          <text x="250" y="80" fill="${textColor}" font-size="11" font-weight="bold" text-anchor="middle">NOW (Ahora)</text>
          
          <circle cx="120" cy="50" r="8" fill="var(--color-primary)" />
          <line x1="120" y1="50" x2="120" y2="25" stroke="var(--color-primary)" stroke-width="2" />
          <text x="120" y="20" fill="var(--color-primary)" font-size="11" font-weight="bold" text-anchor="middle">Acción terminada (X)</text>
        `;
        break;
      case 'past_continuous':
        graphic = `
          <line x1="20" y1="50" x2="380" y2="50" stroke="${gridColor}" stroke-width="3" stroke-dasharray="4" />
          <polygon points="380,45 390,50 380,55" fill="${gridColor}" />
          <line x1="250" y1="40" x2="250" y2="60" stroke="${textColor}" stroke-width="3" />
          <text x="250" y="80" fill="${textColor}" font-size="11" font-weight="bold" text-anchor="middle">NOW (Ahora)</text>
          
          <rect x="70" y="42" width="100" height="16" rx="8" fill="var(--color-primary-light)" stroke="var(--color-primary)" stroke-width="2" />
          <text x="120" y="32" fill="var(--color-primary)" font-size="11" font-weight="bold" text-anchor="middle">Acción en progreso</text>
        `;
        break;
      case 'past_perfect':
        graphic = `
          <line x1="20" y1="50" x2="380" y2="50" stroke="${gridColor}" stroke-width="3" stroke-dasharray="4" />
          <polygon points="380,45 390,50 380,55" fill="${gridColor}" />
          <line x1="280" y1="40" x2="280" y2="60" stroke="${textColor}" stroke-width="3" />
          <text x="280" y="80" fill="${textColor}" font-size="11" font-weight="bold" text-anchor="middle">NOW (Ahora)</text>
          
          <circle cx="80" cy="50" r="8" fill="var(--color-primary)" />
          <text x="80" y="25" fill="var(--color-primary)" font-size="10" font-weight="bold" text-anchor="middle">1. Past Perfect</text>
          <text x="80" y="38" fill="var(--color-primary)" font-size="9" text-anchor="middle">(Había ocurrido)</text>
          
          <circle cx="180" cy="50" r="8" fill="var(--color-accent)" />
          <text x="180" y="25" fill="var(--color-accent)" font-size="10" font-weight="bold" text-anchor="middle">2. Past Simple</text>
          <text x="180" y="38" fill="var(--color-accent)" font-size="9" text-anchor="middle">(Ocurrió después)</text>
          
          <path d="M 95 50 L 165 50" stroke="${textMuted}" stroke-width="1.5" stroke-dasharray="3" />
        `;
        break;
      case 'present_simple':
        graphic = `
          <line x1="20" y1="50" x2="380" y2="50" stroke="${gridColor}" stroke-width="3" stroke-dasharray="4" />
          <polygon points="380,45 390,50 380,55" fill="${gridColor}" />
          <line x1="200" y1="40" x2="200" y2="60" stroke="${textColor}" stroke-width="3" />
          <text x="200" y="80" fill="${textColor}" font-size="11" font-weight="bold" text-anchor="middle">NOW (Ahora)</text>
          
          <circle cx="80" cy="50" r="5" fill="var(--color-accent)" />
          <circle cx="140" cy="50" r="5" fill="var(--color-accent)" />
          <circle cx="200" cy="50" r="6" fill="var(--color-accent)" />
          <circle cx="260" cy="50" r="5" fill="var(--color-accent)" />
          <circle cx="320" cy="50" r="5" fill="var(--color-accent)" />
          
          <text x="200" y="25" fill="var(--color-accent)" font-size="11" font-weight="bold" text-anchor="middle">Rutina / Hábito repetido</text>
        `;
        break;
      case 'present_continuous':
        graphic = `
          <line x1="20" y1="50" x2="380" y2="50" stroke="${gridColor}" stroke-width="3" stroke-dasharray="4" />
          <polygon points="380,45 390,50 380,55" fill="${gridColor}" />
          <line x1="200" y1="40" x2="200" y2="60" stroke="${textColor}" stroke-width="3" />
          <text x="200" y="80" fill="${textColor}" font-size="11" font-weight="bold" text-anchor="middle">NOW (Ahora)</text>
          
          <circle cx="200" cy="50" r="16" fill="var(--color-accent-light)" opacity="0.5" stroke="var(--color-accent)" stroke-width="1.5" />
          <circle cx="200" cy="50" r="6" fill="var(--color-accent)" />
          <text x="200" y="25" fill="var(--color-accent)" font-size="11" font-weight="bold" text-anchor="middle">En este mismo instante</text>
        `;
        break;
      case 'present_perfect':
        graphic = `
          <line x1="20" y1="50" x2="380" y2="50" stroke="${gridColor}" stroke-width="3" stroke-dasharray="4" />
          <polygon points="380,45 390,50 380,55" fill="${gridColor}" />
          <line x1="280" y1="40" x2="280" y2="60" stroke="${textColor}" stroke-width="3" />
          <text x="280" y="80" fill="${textColor}" font-size="11" font-weight="bold" text-anchor="middle">NOW (Ahora)</text>
          
          <path d="M 80,50 Q 180,15 280,50" fill="none" stroke="var(--color-accent)" stroke-width="3" />
          <circle cx="80" cy="50" r="6" fill="var(--color-accent)" />
          <circle cx="280" cy="50" r="6" fill="var(--color-accent)" />
          <text x="180" y="20" fill="var(--color-accent)" font-size="10" font-weight="bold" text-anchor="middle">Conexión Pasado → Presente</text>
        `;
        break;
      case 'future_will':
        graphic = `
          <line x1="20" y1="50" x2="380" y2="50" stroke="${gridColor}" stroke-width="3" stroke-dasharray="4" />
          <polygon points="380,45 390,50 380,55" fill="${gridColor}" />
          <line x1="120" y1="40" x2="120" y2="60" stroke="${textColor}" stroke-width="3" />
          <text x="120" y="80" fill="${textColor}" font-size="11" font-weight="bold" text-anchor="middle">NOW (Ahora)</text>
          
          <circle cx="280" cy="50" r="8" fill="var(--color-warning)" />
          <text x="280" y="25" fill="var(--color-warning)" font-size="11" font-weight="bold" text-anchor="middle">Futuro (Predicción/Decisión)</text>
        `;
        break;
      case 'going_to':
        graphic = `
          <line x1="20" y1="50" x2="380" y2="50" stroke="${gridColor}" stroke-dasharray="4" stroke-width="3" />
          <polygon points="380,45 390,50 380,55" fill="${gridColor}" />
          <line x1="120" y1="40" x2="120" y2="60" stroke="${textColor}" stroke-width="3" />
          <text x="120" y="80" fill="${textColor}" font-size="11" font-weight="bold" text-anchor="middle">NOW (Ahora)</text>
          
          <path d="M 120,50 Q 200,20 280,50" fill="none" stroke="var(--color-warning)" stroke-width="3" stroke-dasharray="3" />
          <circle cx="120" cy="50" r="6" fill="var(--color-warning)" />
          <circle cx="280" cy="50" r="8" fill="var(--color-warning)" />
          <text x="200" y="20" fill="var(--color-warning)" font-size="10" font-weight="bold" text-anchor="middle">Plan previo o intención</text>
        `;
        break;
      default:
        graphic = `
          <line x1="20" y1="50" x2="380" y2="50" stroke="${gridColor}" stroke-width="3" />
          <circle cx="200" cy="50" r="8" fill="var(--color-primary)" />
        `;
    }
    
    return `
      <svg width="100%" height="100" viewBox="0 0 400 100" style="background:var(--bg-elevated); border-radius:var(--radius-md); border:1px solid var(--border-color); margin-bottom: 1.5rem;">
        ${graphic}
      </svg>
    `;
  },

  _showSideBySideComparison(tenseA, tenseB) {
    const comparisons = {
      'past_simple-present_perfect': {
        title: 'Past Simple vs. Present Perfect',
        tenseA: 'Past Simple',
        tenseB: 'Present Perfect',
        diff: 'El **Past Simple** se usa para acciones terminadas en un tiempo específico del pasado. El **Present Perfect** conecta el pasado con el presente y el tiempo no es específico.',
        exA: 'I lived in London for two years. (Ya no vivo allí, está terminado).',
        exB: 'I have lived in London for two years. (Empezó en el pasado y sigo viviendo allí ahora).',
        signalA: 'yesterday, ago, last year, in 2015',
        signalB: 'ever, never, just, already, yet, for, since'
      },
      'past_simple-past_continuous': {
        title: 'Past Simple vs. Past Continuous',
        tenseA: 'Past Simple',
        tenseB: 'Past Continuous',
        diff: 'El **Past Simple** describe una acción corta completada. El **Past Continuous** describe una acción más larga que estaba en progreso en el pasado.',
        exA: 'I fell asleep. (Acción corta e instantánea).',
        exB: 'I was watching a movie. (Acción continua y en progreso en el pasado).',
        signalA: 'when, suddenly',
        signalB: 'while, as, all afternoon'
      },
      'present_simple-present_continuous': {
        title: 'Present Simple vs. Present Continuous',
        tenseA: 'Present Simple',
        tenseB: 'Present Continuous',
        diff: 'El **Present Simple** se usa para hábitos permanentes, rutinas y verdades generales. El **Present Continuous** se usa para acciones temporales que están ocurriendo ahora mismo.',
        exA: 'I speak English. (Habilidad permanente).',
        exB: 'I am speaking English right now. (Acción ocurriendo en este instante).',
        signalA: 'always, usually, every day, sometimes',
        signalB: 'now, at the moment, currently, today'
      },
      'future_will-going_to': {
        title: 'Future (Will) vs. Future (Going to)',
        tenseA: 'Future with Will',
        tenseB: 'Future with Going to',
        diff: 'Se usa **Will** para decisiones espontáneas o predicciones generales. Se usa **Going to** para planes previos organizados o predicciones con evidencia física visible.',
        exA: 'The phone is ringing. I will answer it! (Decisión espontánea).',
        exB: 'Look at those dark clouds. It is going to rain! (Evidencia física).',
        signalA: 'probably, I think, I promise, perhaps',
        signalB: 'already decided, look at that!'
      }
    };

    const key1 = `${tenseA}-${tenseB}`;
    const key2 = `${tenseB}-${tenseA}`;
    const comp = comparisons[key1] || comparisons[key2] || null;

    if (!comp) return '<p style="color:var(--text-secondary);font-size:0.875rem;">Selecciona otro tiempo verbal para compararlo de forma directa.</p>';

    return `
      <div style="background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; margin-top:1.5rem; animation: fadeIn var(--transition-normal) ease;">
        <h4 style="margin:0 0 0.5rem 0; color:var(--color-primary); font-size:0.95rem;">🔍 Comparación Directa: ${comp.title}</h4>
        <p style="font-size:0.85rem; line-height:1.5; color:var(--text-secondary); margin-bottom:1rem;">${comp.diff}</p>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; font-size:0.8rem;">
          <div style="background:var(--bg-card); padding:0.75rem; border-radius:var(--radius-sm); border-left:3px solid var(--color-primary);">
            <strong style="color:var(--color-primary);">${comp.tenseA}</strong>
            <div style="margin-top:0.25rem;"><strong>Ejemplo:</strong> "${comp.exA}"</div>
            <div style="margin-top:0.25rem; color:var(--text-muted);"><strong>Señales:</strong> ${comp.signalA}</div>
          </div>
          
          <div style="background:var(--bg-card); padding:0.75rem; border-radius:var(--radius-sm); border-left:3px solid var(--color-accent);">
            <strong style="color:var(--color-accent);">${comp.tenseB}</strong>
            <div style="margin-top:0.25rem;"><strong>Ejemplo:</strong> "${comp.exB}"</div>
            <div style="margin-top:0.25rem; color:var(--text-muted);"><strong>Señales:</strong> ${comp.signalB}</div>
          </div>
        </div>
      </div>
    `;
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
  _formatFormulaToBlocks(formula) {
    const parts = formula.split('+');
    return `<div style="display:flex; flex-wrap:wrap; gap:0.35rem; align-items:center; margin-top:0.4rem; margin-bottom:0.4rem;">
      ${parts.map((p, idx) => {
        let clean = p.trim();
        let bg = 'var(--bg-elevated)';
        let color = 'var(--text-secondary)';
        let border = 'var(--border-color)';
        
        if (/subject/i.test(clean)) {
          bg = 'rgba(59, 130, 246, 0.12)';
          color = '#2563eb';
          border = 'rgba(59, 130, 246, 0.3)';
        } else if (/verb|work|eat|go|write|speak|finished/i.test(clean)) {
          bg = 'rgba(239, 68, 68, 0.12)';
          color = '#dc2626';
          border = 'rgba(239, 68, 68, 0.3)';
        } else if (/not|don't|doesn't|haven't|hasn't|won't|didn't|hadn't/i.test(clean)) {
          bg = 'rgba(244, 63, 94, 0.12)';
          color = '#e11d48';
          border = 'rgba(244, 63, 94, 0.3)';
        } else if (/am\/is\/are|was\/were|have\/has|had|will|would|be/i.test(clean)) {
          bg = 'rgba(16, 185, 129, 0.12)';
          color = '#059669';
          border = 'rgba(16, 185, 129, 0.3)';
        }
        
        const plusSign = idx > 0 ? '<span style="color:var(--text-muted); font-weight:bold; margin:0 0.1rem;">+</span>' : '';
        return `${plusSign}<span style="background:${bg}; color:${color}; border:1px solid ${border}; padding: 4px 10px; border-radius: var(--radius-sm); font-size:0.75rem; font-family:monospace; font-weight:700; display:inline-block; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">${clean}</span>`;
      }).join('')}
    </div>`;
  },

  _renderTopic(container, topicId) {
    const topic = getGrammarTopic(topicId);
    if (!topic) return;

    Storage.logGrammarViewed(topicId);
    Gamification.addXP(25, 'lesson');
    Gamification.unlock('first_lesson');
    Gamification.check();

    // Map form names to visual styles
    const formStyles = {
      'Affirmative': { title: 'Afirmativo (+)', color: 'var(--color-accent)', bg: 'rgba(16, 185, 129, 0.03)', border: 'var(--color-accent)' },
      'Negative': { title: 'Negativo (-)', color: 'var(--color-danger)', bg: 'rgba(244, 63, 94, 0.03)', border: 'var(--color-danger)' },
      'Question': { title: 'Pregunta (?)', color: 'var(--color-primary)', bg: 'rgba(99, 102, 241, 0.03)', border: 'var(--color-primary)' },
      'Structure': { title: 'Estructura Principal', color: 'var(--color-primary)', bg: 'var(--bg-card)', border: 'var(--color-primary)' }
    };

    container.innerHTML = `
      <div class="animate-slide-right">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <button class="btn btn-ghost btn-sm" id="back-lessons-btn">← Volver</button>
          <span class="level-pill level-${topic.level}">${topic.level}</span>
          <span class="badge badge-primary">${topic.category === 'tenses' ? '⏰ Tiempos Verbales' : topic.category === 'conditionals' ? '🔀 Condicionales' : '📝 Gramática'}</span>
        </div>

        <div class="lesson-content">
          
          <!-- VISUAL HEADER BANNERS -->
          <div class="card card-gradient mb-lg" style="padding: 2rem; position:relative; overflow:hidden; border-radius: var(--radius-xl);">
            <div style="font-size: 3.5rem; position:absolute; right:1.5rem; bottom:-0.5rem; opacity:0.15; font-family:var(--font-heading);">${topic.emoji}</div>
            <h1 class="page-title" style="color:white; margin:0; font-size:1.85rem;">${topic.emoji} ${topic.title}</h1>
            <p class="page-subtitle" style="color:rgba(255,255,255,0.85); margin-top:0.25rem; font-size: 1.05rem;">${topic.titleEs}</p>
            <p style="margin-top: 1rem; font-size:0.925rem; color:rgba(255,255,255,0.9); line-height:1.6; max-width: 80%;">${topic.description}</p>
          </div>

          <!-- STRUCTURE SECTION WITH VISUAL BLOCK DIAGRAMS -->
          <div class="lesson-section" style="margin-bottom: 2rem;">
            <h3 style="display:flex; align-items:center; gap:0.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1rem;">📐 Fórmulas y Construcción</h3>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
              ${topic.structure.map(s => {
                const style = formStyles[s.form] || formStyles['Structure'];
                return `
                  <div class="card animate-fade-in" style="background:${style.bg}; border: 1.5px solid ${style.border}; padding: 1.25rem; border-radius: var(--radius-lg); position:relative;">
                    <div style="font-weight:800; font-size:0.9rem; margin-bottom:0.5rem; color:${style.color}; text-transform:uppercase; letter-spacing:0.5px;">${style.title}</div>
                    
                    <div style="margin-bottom:0.75rem;">
                      <span style="font-size:0.7rem; color:var(--text-muted); display:block; margin-bottom:0.15rem; font-weight:600;">FÓRMULA:</span>
                      ${this._formatFormulaToBlocks(s.formula)}
                    </div>
                    
                    <div style="border-top:1px solid var(--border-color); padding-top:0.75rem; margin-top:0.75rem;">
                      <span style="font-size:0.7rem; color:var(--text-muted); display:block; margin-bottom:0.25rem; font-weight:600;">EJEMPLO:</span>
                      <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-elevated); padding:0.5rem 0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
                        <span class="example-en" style="font-weight:700; font-size:0.95rem; color:var(--text-primary); font-family:var(--font-heading);">${s.example}</span>
                        <button class="btn btn-ghost btn-sm btn-icon" style="padding:4px; font-size:0.75rem;" onclick="Speech.speak('${s.example.replace(/'/g,"\\'")}')">🔊</button>
                      </div>
                    </div>
                  </div>`;
              }).join('')}
            </div>
          </div>

          <!-- GAMIFIED INTERACTIVE SENTENCE BUILDER SANDBOX -->
          <div class="lesson-section" style="margin-bottom: 2rem;">
            <h3 style="display:flex; align-items:center; gap:0.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1rem;">🧪 Laboratorio: Construye tu Frase</h3>
            <div class="card card-glass" style="padding: 1.5rem;">
              <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0; margin-bottom: 1rem;">
                ¡Pon a prueba tu aprendizaje! Pulsa sobre los bloques de colores disponibles abajo para encajarlos y construir una frase correcta en <strong>${topic.title}</strong>:
              </p>
              
              <!-- Selected blocks area -->
              <div style="min-height: 55px; background:var(--bg-elevated); border:2px dashed var(--border-color); border-radius:var(--radius-md); padding:0.75rem; display:flex; flex-wrap:wrap; gap:0.5rem; align-items:center; margin-bottom: 1rem;" id="sandbox-selected-area">
                <span style="color:var(--text-muted); font-size:0.8rem;" id="sandbox-placeholder-text">Haz clic en los bloques de abajo para empezar a formar tu frase...</span>
              </div>
              
              <!-- Available blocks area -->
              <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom: 1.5rem;" id="sandbox-available-area"></div>
              
              <div style="display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
                <button class="btn btn-primary btn-sm" id="sandbox-check-btn">Comprobar Frase</button>
                <button class="btn btn-ghost btn-sm" id="sandbox-reset-btn">Reiniciar</button>
                <span id="sandbox-feedback" style="font-size:0.875rem; font-weight:700;"></span>
              </div>
            </div>
          </div>

          <!-- USOS CON COLORES E ICONOS -->
          <div class="lesson-section" style="margin-bottom: 2rem;">
            <h3 style="display:flex; align-items:center; gap:0.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1rem;">💡 Cuándo y Cómo se usa</h3>
            <div style="display:flex; flex-direction:column; gap:0.75rem;">
              ${topic.uses.map(u => `
                <div class="card card-hover" style="border-left: 4px solid var(--color-primary); padding: 1rem 1.25rem; display:flex; justify-content:space-between; align-items:center; gap: 1rem;">
                  <div style="flex:1">
                    <span style="font-size:0.725rem; color:var(--color-primary); font-weight:700; text-transform:uppercase; letter-spacing:0.5px; display:inline-block; margin-bottom:0.25rem;">📌 ${u.desc}</span>
                    <div class="example-en" style="font-size:1.1rem; font-weight:700; color:var(--text-primary); font-family:var(--font-heading);">${u.example}</div>
                    ${u.exampleEs ? `<div class="example-es" style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.15rem; font-style:italic;">${u.exampleEs}</div>` : ''}
                  </div>
                  <button class="btn btn-ghost btn-sm btn-icon" style="flex-shrink:0;" onclick="Speech.speak('${u.example.replace(/'/g,"\\'")}')">🔊</button>
                </div>`).join('')}
            </div>
          </div>

          <!-- SIGNAL WORDS VISUAL PILLS -->
          ${topic.signals && topic.signals.length ? `
          <div class="lesson-section" style="margin-bottom: 2rem;">
            <h3 style="display:flex; align-items:center; gap:0.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1rem;">⏰ Palabras clave (Time Markers)</h3>
            <div style="background:var(--bg-card); border:1px solid var(--border-color); padding: 1.25rem; border-radius:var(--radius-lg);">
              <p style="font-size:0.8rem; color:var(--text-secondary); margin:0 0 0.75rem 0;">Estas palabras o expresiones suelen indicar el uso de este tiempo verbal:</p>
              <div style="display:flex;flex-wrap:wrap;gap:0.4rem">
                ${topic.signals.map(s => `<span class="badge badge-warning" style="font-size:0.8rem; padding: 5px 12px; font-weight:700; box-shadow:0 1px 3px rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.25);">${s}</span>`).join('')}
              </div>
            </div>
          </div>` : ''}

          <!-- TIPS & TRICKS VISUAL CARDS -->
          ${topic.tips && topic.tips.length ? `
          <div class="lesson-section" style="margin-bottom: 2rem;">
            <h3 style="display:flex; align-items:center; gap:0.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1rem;">🧠 Trucos de Estudio</h3>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
              ${topic.tips.map(t => `
                <div style="background:var(--color-accent-light); border:1px solid var(--color-accent); border-radius:var(--radius-lg); padding: 1.25rem; display:flex; gap:0.75rem; align-items:start; box-shadow:0 2px 8px rgba(16,185,129,0.05);">
                  <span style="font-size:1.5rem; line-height:1;">💡</span>
                  <span style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5; font-weight:500;">${t}</span>
                </div>`).join('')}
            </div>
          </div>` : ''}

          <!-- COMMON ERRORS CALLOUTS -->
          ${topic.commonErrors && topic.commonErrors.length ? `
          <div class="lesson-section" style="margin-bottom: 2rem;">
            <h3 style="display:flex; align-items:center; gap:0.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1rem;">⚠️ Evita errores comunes</h3>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
              ${topic.commonErrors.map(e => `
                <div class="card" style="border: 1.5px solid var(--color-danger); background:rgba(244,63,94,0.02); padding: 1.25rem; border-radius: var(--radius-lg); display:flex; flex-direction:column; justify-content:space-between;">
                  <div>
                    <div style="color:var(--color-danger); font-size:0.9rem; text-decoration:line-through; margin-bottom:0.25rem; font-weight:800; display:flex; align-items:center; gap:0.5rem;"><span>❌</span> ${e.wrong}</div>
                    <div style="color:var(--color-accent); font-size:0.925rem; margin-bottom:0.75rem; font-weight:800; display:flex; align-items:center; gap:0.5rem;"><span>✅</span> ${e.right}</div>
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-secondary); background:var(--bg-elevated); padding: 6px 10px; border-radius: var(--radius-sm); border:1px solid var(--border-color); line-height:1.4;">
                    <strong>Explicación:</strong> ${e.rule}
                  </div>
                </div>`).join('')}
            </div>
          </div>` : ''}

          <div class="divider" style="margin: 2rem 0; border-color: var(--border-color);"></div>

          <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-bottom: 2rem;">
            <button class="btn btn-primary" id="practice-topic-btn">✏️ Practicar este tema</button>
            <button class="btn btn-ghost" id="back-lessons-btn2">← Volver al Centro de Estudio</button>
          </div>
        </div>
      </div>`;

    this._initSentenceBuilder(topic);

    document.getElementById('back-lessons-btn').addEventListener('click', () => this.render(container));
    document.getElementById('back-lessons-btn2').addEventListener('click', () => this.render(container));
    document.getElementById('practice-topic-btn').addEventListener('click', () => {
      App.navigate('exercises', { topic: topic.id });
    });
  },

  // ---- 4. INTERACTIVE SENTENCE BUILDER SANDBOX LOGIC ----
  _initSentenceBuilder(topic) {
    // Generate sandbox data depending on grammar topic
    let blocks = ['I', 'She', 'They', 'English', 'pizza', 'working', 'goes', 'went', 'have', 'yesterday', 'now', 'is', 'are', 'not', 'study'];
    let valids = [];

    const db = {
      present_simple: {
        blocks: ['I', 'She', 'works', 'work', 'doesn\'t work', 'every day', 'in a hospital', 'like', 'likes', 'pizza'],
        valids: [
          'She works in a hospital', 'I work every day', 'She doesn\'t work every day',
          'I like pizza', 'She likes pizza', 'She works every day', 'I work in a hospital'
        ]
      },
      present_continuous: {
        blocks: ['I', 'She', 'They', 'am', 'is', 'are', 'studying', 'working', 'now', 'at the moment', 'not'],
        valids: [
          'I am studying now', 'I am working now', 'She is studying now', 'She is working now',
          'They are studying now', 'They are working now', 'They are studying at the moment', 'She is studying at the moment'
        ]
      },
      present_perfect: {
        blocks: ['I', 'He', 'have', 'has', 'finished', 'worked', 'already', 'just', 'since 2020', 'here'],
        valids: [
          'I have finished', 'He has finished', 'I have worked here', 'He has worked here',
          'I have worked since 2020', 'He has worked since 2020', 'I have just finished', 'He has just finished'
        ]
      },
      past_simple: {
        blocks: ['I', 'She', 'went', 'worked', 'didn\'t', 'go', 'work', 'yesterday', 'last week', 'to London'],
        valids: [
          'I went to London yesterday', 'She went to London yesterday', 'I worked yesterday', 'She worked yesterday',
          'I didn\'t work yesterday', 'She didn\'t work yesterday', 'I didn\'t go to London last week'
        ]
      },
      future_will: {
        blocks: ['I', 'She', 'will', 'won\'t', 'help', 'you', 'tomorrow', 'probably', 'rain'],
        valids: [
          'I will help you', 'I will help you tomorrow', 'She will help you', 'She will help you tomorrow',
          'I won\'t help you tomorrow', 'It will probably rain'
        ]
      }
    };

    const config = db[topic.id] || {
      blocks: ['Subject', 'verb', 'object', 'adverb', 'not', 'have', 'will', 'is', 'goes', 'went'],
      valids: ['Subject verb object']
    };

    blocks = config.blocks;
    valids = config.valids;

    const availableArea = document.getElementById('sandbox-available-area');
    const selectedArea = document.getElementById('sandbox-selected-area');
    const placeholder = document.getElementById('sandbox-placeholder-text');
    const checkBtn = document.getElementById('sandbox-check-btn');
    const resetBtn = document.getElementById('sandbox-reset-btn');
    const feedback = document.getElementById('sandbox-feedback');

    let selectedList = [];

    const renderSelected = () => {
      if (selectedList.length === 0) {
        placeholder.style.display = 'inline';
        // Remove active block children
        const children = Array.from(selectedArea.children);
        children.forEach(c => {
          if (c.id !== 'sandbox-placeholder-text') selectedArea.removeChild(c);
        });
        return;
      }
      placeholder.style.display = 'none';

      // Keep only placeholder in DOM, remove others to redraw
      const children = Array.from(selectedArea.children);
      children.forEach(c => {
        if (c.id !== 'sandbox-placeholder-text') selectedArea.removeChild(c);
      });

      selectedList.forEach((word, idx) => {
        const span = document.createElement('span');
        span.className = 'badge badge-primary animate-fade-in';
        span.style.cursor = 'pointer';
        span.style.padding = '6px 12px';
        span.style.fontSize = '0.825rem';
        span.textContent = word;
        span.addEventListener('click', () => {
          selectedList.splice(idx, 1);
          renderSelected();
          feedback.textContent = '';
        });
        selectedArea.appendChild(span);
      });
    };

    const renderAvailable = () => {
      availableArea.innerHTML = '';
      blocks.forEach(word => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-ghost btn-sm';
        btn.style.borderRadius = 'var(--radius-full)';
        btn.style.fontSize = '0.775rem';
        btn.style.fontWeight = 'bold';
        btn.textContent = word;
        btn.addEventListener('click', () => {
          selectedList.push(word);
          renderSelected();
          feedback.textContent = '';
        });
        availableArea.appendChild(btn);
      });
    };

    resetBtn.addEventListener('click', () => {
      selectedList = [];
      renderSelected();
      feedback.textContent = '';
    });

    checkBtn.addEventListener('click', () => {
      if (selectedList.length === 0) {
        feedback.style.color = 'var(--color-danger)';
        feedback.textContent = '❌ ¡Agrega algunos bloques primero!';
        return;
      }

      const sentence = selectedList.join(' ');
      // Direct matching or lowercase checking
      const isCorrect = valids.some(v => v.toLowerCase().replace(/[^a-zA-Z0-9\s']/g, '') === sentence.toLowerCase().replace(/[^a-zA-Z0-9\s']/g, ''));

      if (isCorrect) {
        feedback.style.color = 'var(--color-accent)';
        feedback.textContent = '🎉 ¡Excelente! Es una estructura correcta para este tema. (+10 XP)';
        Gamification.addXP(10, 'sandbox');
      } else {
        feedback.style.color = 'var(--color-danger)';
        feedback.textContent = '❌ Esa frase no coincide con las estructuras correctas enseñadas. ¡Intenta de nuevo!';
      }
    });

    renderAvailable();
    renderSelected();
  }
};
