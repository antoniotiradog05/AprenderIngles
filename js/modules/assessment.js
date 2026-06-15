// ============================================================
// EnglishMaster — modules/assessment.js
// Placement test engine and result UI
// ============================================================

const Assessment = {
  questions: [],
  currentIdx: 0,
  answers: [],
  skillScores: { grammar: [], vocabulary: [], reading: [] },
  startTime: null,

  render(container) {
    const user = Storage.getUser();
    if (user.assessmentDone) {
      this._renderAlreadyDone(container);
    } else {
      this._renderIntro(container);
    }
  },

  _renderAlreadyDone(container) {
    const user = Storage.getUser();
    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">🎯 Test de Nivel</h1>
        <p class="page-subtitle">Tu nivel actual: <span class="level-pill level-${user.cefrLevel}">${user.cefrLevel} — ${CEFR_NAMES[user.cefrLevel]}</span></p>
      </div>
      <div class="card card-glass animate-slide-up mb-lg">
        <div class="card-header">
          <div>
            <div class="card-title">Resultado de tu evaluación</div>
            <p class="text-muted mt-sm">Ya completaste el test de nivel.</p>
          </div>
          <div style="font-size:3rem">${LEVEL_EMOJIS[CEFR_LEVELS.indexOf(user.cefrLevel)]||'🎓'}</div>
        </div>
        ${this._renderLevelInfo(user.cefrLevel)}
        <div class="divider"></div>
        <div style="display:flex;gap:1rem;flex-wrap:wrap">
          <button class="btn btn-outline" id="retake-btn">🔄 Repetir test</button>
          <button class="btn btn-primary" id="go-lessons-btn">📚 Ir a Lecciones</button>
        </div>
      </div>`;

    document.getElementById('retake-btn').addEventListener('click', () => {
      Storage.setUser({ assessmentDone: false });
      this._renderIntro(container);
    });
    document.getElementById('go-lessons-btn').addEventListener('click', () => App.navigate('lessons'));
  },

  _renderIntro(container) {
    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">🎯 Test de Nivel</h1>
        <p class="page-subtitle">Descubre tu nivel real de inglés (A1–C2)</p>
      </div>
      <div class="card card-glass animate-slide-up" style="max-width:640px;margin:0 auto;text-align:center">
        <div style="font-size:5rem;margin-bottom:1.5rem">🎯</div>
        <h2 style="font-family:var(--font-heading);font-size:1.75rem;font-weight:900;margin-bottom:1rem">Evaluación Inicial</h2>
        <p class="text-muted mb-lg">Responde ${ASSESSMENT_CONFIG.totalQuestions} preguntas sobre gramática, vocabulario y comprensión lectora. El test dura aproximadamente <strong>10-15 minutos</strong>.</p>
        <div class="grid-3 mb-lg" style="gap:0.75rem">
          <div class="card card-primary" style="padding:1rem;text-align:center">
            <div style="font-size:1.5rem">📝</div>
            <div style="font-size:0.8125rem;font-weight:600;margin-top:0.5rem">Gramática</div>
          </div>
          <div class="card" style="background:var(--color-accent-light);border-color:var(--color-accent);padding:1rem;text-align:center">
            <div style="font-size:1.5rem">📖</div>
            <div style="font-size:0.8125rem;font-weight:600;margin-top:0.5rem">Vocabulario</div>
          </div>
          <div class="card" style="background:var(--color-info-light);border-color:var(--color-info);padding:1rem;text-align:center">
            <div style="font-size:1.5rem">🔍</div>
            <div style="font-size:0.8125rem;font-weight:600;margin-top:0.5rem">Comprensión</div>
          </div>
        </div>
        <button class="btn btn-primary btn-lg btn-full" id="start-assessment-btn">
          ¡Comenzar el Test! →
        </button>
      </div>`;

    document.getElementById('start-assessment-btn').addEventListener('click', () => {
      this._startTest(container);
    });
  },

  _startTest(container) {
    this.questions = getAssessmentQuestions(ASSESSMENT_CONFIG.totalQuestions);
    this.currentIdx = 0;
    this.answers = [];
    this.skillScores = { grammar: [], vocabulary: [], reading: [] };
    this.startTime = Date.now();
    this._renderQuestion(container);
  },

  _renderQuestion(container) {
    if (this.currentIdx >= this.questions.length) {
      this._renderResults(container);
      return;
    }

    const q = this.questions[this.currentIdx];
    const progress = Math.round((this.currentIdx / this.questions.length) * 100);

    container.innerHTML = `
      <div class="animate-slide-right">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;gap:1rem">
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem">
              <span style="font-size:0.875rem;color:var(--text-muted)">Pregunta ${this.currentIdx + 1} de ${this.questions.length}</span>
              <span class="level-pill level-${q.level}">${q.level}</span>
            </div>
            <div class="progress-bar progress-bar-lg">
              <div class="progress-fill" style="width:${progress}%"></div>
            </div>
          </div>
        </div>

        <div class="card card-glass" style="max-width:680px;margin:0 auto">
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1.5rem">
            <span class="badge badge-${q.skill === 'grammar' ? 'primary' : q.skill === 'vocabulary' ? 'accent' : 'info'}">
              ${q.skill === 'grammar' ? '📝 Gramática' : q.skill === 'vocabulary' ? '📖 Vocabulario' : '🔍 Comprensión'}
            </span>
          </div>

          <h3 style="font-size:1.0625rem;font-weight:600;margin-bottom:1.5rem;line-height:1.5">${q.question}</h3>

          <div id="options-container" style="display:flex;flex-direction:column;gap:0.75rem">
            ${q.options.map((opt, i) => `
              <button class="option-btn" data-index="${i}" id="opt-${i}">
                <span class="option-letter">${'ABCD'[i]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>

          <div id="feedback-area" style="margin-top:1.5rem"></div>

          <div id="next-btn-area" class="hidden" style="margin-top:1rem">
            <button class="btn btn-primary btn-full" id="next-q-btn">
              ${this.currentIdx + 1 < this.questions.length ? 'Siguiente pregunta →' : 'Ver resultados →'}
            </button>
          </div>
        </div>
      </div>`;

    $$('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => this._handleAnswer(btn.dataset.index * 1, container));
    });
  },

  _handleAnswer(selectedIdx, container) {
    const q = this.questions[this.currentIdx];
    const correct = selectedIdx === q.correct;
    this.answers.push({ questionId: q.id, selected: selectedIdx, correct });
    this.skillScores[q.skill]?.push(correct ? 1 : 0);

    // Disable all options
    $$('.option-btn').forEach(btn => btn.disabled = true);

    // Mark correct/wrong
    const selectedBtn = document.getElementById(`opt-${selectedIdx}`);
    const correctBtn = document.getElementById(`opt-${q.correct}`);
    if (selectedBtn) selectedBtn.classList.add(correct ? 'correct' : 'wrong');
    if (!correct && correctBtn) correctBtn.classList.add('correct');

    // Show feedback
    const feedbackArea = document.getElementById('feedback-area');
    feedbackArea.innerHTML = `
      <div class="${correct ? 'feedback-correct' : 'feedback-wrong'} ${correct ? 'celebrate' : 'wrong-answer'}">
        <div class="feedback-icon">${correct ? '✅' : '❌'}</div>
        <div class="feedback-text">
          <div class="feedback-title">${correct ? '¡Correcto!' : 'Incorrecto'}</div>
          <div class="feedback-detail">${q.explanation}</div>
          <div class="feedback-rule">📚 Regla: ${q.rule}</div>
        </div>
      </div>`;

    // Show next button
    const nextArea = document.getElementById('next-btn-area');
    nextArea.classList.remove('hidden');
    nextArea.style.display = 'block';

    document.getElementById('next-q-btn').addEventListener('click', () => {
      this.currentIdx++;
      this._renderQuestion(container);
    });

    if (correct) Gamification.onCorrectAnswer();
    else Gamification.onWrongAnswer();
  },

  _renderResults(container) {
    const correctCount = this.answers.filter(a => a.correct).length;
    const total = this.answers.length;
    const level = determineCEFRLevel(correctCount, total);
    const timeTaken = Math.round((Date.now() - this.startTime) / 60000);

    // Skill breakdowns
    const grammarScore = this._pct(this.skillScores.grammar);
    const vocabScore = this._pct(this.skillScores.vocabulary);
    const readingScore = this._pct(this.skillScores.reading);

    // Save result
    Storage.setUser({ cefrLevel: level, assessmentDone: true });
    Storage.getProgress().levelHistory.push({ level, date: todayStr() });
    Storage.save();
    Gamification.addXP(150, 'assessment');
    Gamification.unlock('assessment_done');

    const studyPlan = this._generateStudyPlan(level);
    Storage.setUser({ studyPlan });

    container.innerHTML = `
      <div class="animate-fade-in" style="max-width:720px;margin:0 auto">
        <div class="text-center mb-lg">
          <div style="font-size:5rem;animation:logoBounce 1s ease infinite alternate">🎉</div>
          <h1 class="page-title mt-md">¡Test Completado!</h1>
          <p class="text-muted">Completado en ${timeTaken} minutos</p>
        </div>

        <div class="card card-gradient mb-lg text-center" style="padding:2rem">
          <p style="opacity:0.8;margin-bottom:0.5rem">Tu nivel MCER es</p>
          <div style="font-family:var(--font-heading);font-size:3.5rem;font-weight:900;line-height:1">${level}</div>
          <div style="font-size:1.25rem;font-weight:700;margin-top:0.5rem;opacity:0.9">${CEFR_NAMES[level]}</div>
          <div style="margin-top:1rem;opacity:0.7">${correctCount} de ${total} correctas</div>
        </div>

        <div class="card card-glass mb-lg">
          <div class="card-header">
            <div class="card-title">📊 Desglose por habilidad</div>
          </div>
          <div class="skill-bar-group">
            <div class="skill-bar-item">
              <span class="skill-bar-label">📝 Gramática</span>
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${grammarScore}%;background:var(--grad-primary)"></div></div>
              <span class="skill-bar-value">${grammarScore}%</span>
            </div>
            <div class="skill-bar-item">
              <span class="skill-bar-label">📖 Vocabulario</span>
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${vocabScore}%;background:var(--grad-accent)"></div></div>
              <span class="skill-bar-value">${vocabScore}%</span>
            </div>
            <div class="skill-bar-item">
              <span class="skill-bar-label">🔍 Comprensión</span>
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${readingScore}%;background:linear-gradient(135deg,#38bdf8,#6366f1)"></div></div>
              <span class="skill-bar-value">${readingScore}%</span>
            </div>
          </div>
        </div>

        <div class="card card-glass mb-lg">
          <div class="card-header">
            <div class="card-title">🗺️ Tu plan de estudio personalizado</div>
          </div>
          ${this._renderLevelInfo(level)}
          <div class="divider"></div>
          <div style="display:flex;flex-direction:column;gap:0.75rem">
            ${studyPlan.map(item => `
              <div class="plan-card" onclick="App.navigate('${item.page}')">
                <div class="plan-icon" style="background:${item.color}22;color:${item.color}">${item.icon}</div>
                <div class="plan-info">
                  <div class="plan-title">${item.title}</div>
                  <div class="plan-detail">${item.detail}</div>
                </div>
                <span class="plan-arrow">→</span>
              </div>`).join('')}
          </div>
        </div>

        <button class="btn btn-primary btn-lg btn-full" onclick="App.navigate('dashboard')">
          🚀 ¡Empezar a estudiar!
        </button>
      </div>`;

    confetti();
    Gamification.refreshNav();
  },

  _pct(arr) {
    if (!arr.length) return 0;
    return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length * 100);
  },

  _renderLevelInfo(level) {
    const descs = {
      A1: 'Conoces palabras y expresiones básicas. Tu objetivo: construir frases simples y vocabulario esencial.',
      A2: 'Puedes comunicarte en situaciones cotidianas. Tu objetivo: dominar el presente, pasado simple y vocabulario frecuente.',
      B1: 'Tienes una base sólida. Tu objetivo: los tiempos perfectos, condicionales y vocabulario intermedio.',
      B2: 'Nivel intermedio-alto. Tu objetivo: gramática avanzada, vocabulario académico y fluidez.',
      C1: 'Nivel avanzado. Tu objetivo: perfeccionar matices, expresiones idiomáticas y registro formal.',
      C2: '¡Nivel maestro! Tu objetivo: mantener y expandir tu dominio del inglés avanzado.'
    };
    return `<p style="color:var(--text-secondary);font-size:0.9375rem;padding:0.75rem;background:var(--bg-elevated);border-radius:var(--radius-sm);margin-top:0.5rem">${descs[level]}</p>`;
  },

  _generateStudyPlan(level) {
    const plans = {
      A1: [
        { icon:'📚', title:'Lecciones A1: Principiante', detail:'Empieza con verbos to be y to have', page:'lessons', color:'#6366f1' },
        { icon:'📖', title:'Vocabulario básico', detail:'Aprende las 100 palabras más comunes', page:'vocabulary', color:'#10b981' },
        { icon:'✏️', title:'Ejercicios de gramática', detail:'Practica el presente simple', page:'exercises', color:'#f59e0b' },
      ],
      A2: [
        { icon:'📚', title:'Lecciones A2: Básico', detail:'Pasado simple e irregular verbs', page:'lessons', color:'#6366f1' },
        { icon:'🎴', title:'Repaso con flashcards', detail:'Vocabulario A1 y A2', page:'vocabulary', color:'#10b981' },
        { icon:'✏️', title:'Ejercicios mixtos', detail:'Practicar tiempos verbales', page:'exercises', color:'#f59e0b' },
      ],
      B1: [
        { icon:'📚', title:'Lecciones B1: Intermedio', detail:'Present Perfect y condicionales', page:'lessons', color:'#6366f1' },
        { icon:'🎮', title:'Juegos de vocabulario', detail:'Memoriza vocabulario clave', page:'games', color:'#10b981' },
        { icon:'🤖', title:'Práctica conversacional', detail:'Habla con el robot en inglés', page:'chat', color:'#f43f5e' },
      ],
      B2: [
        { icon:'📚', title:'Lecciones B2: Intermedio-Alto', detail:'Voz pasiva, reported speech', page:'lessons', color:'#6366f1' },
        { icon:'✏️', title:'Corrección de errores', detail:'Ejercicios avanzados de gramática', page:'exercises', color:'#f59e0b' },
        { icon:'🤖', title:'Chat avanzado', detail:'Practica conversación fluida', page:'chat', color:'#f43f5e' },
      ],
      C1: [
        { icon:'📚', title:'Lecciones C1: Avanzado', detail:'Inversión, subjuntivo, matices', page:'lessons', color:'#6366f1' },
        { icon:'📖', title:'Vocabulario avanzado', detail:'Expresiones idiomáticas y collocations', page:'vocabulary', color:'#10b981' },
        { icon:'🤖', title:'Debate en inglés', detail:'Practica argumentación con el robot', page:'chat', color:'#f43f5e' },
      ],
      C2: [
        { icon:'📚', title:'Nivel maestro C2', detail:'Estilística y registro formal', page:'lessons', color:'#6366f1' },
        { icon:'📖', title:'Vocabulario C1-C2', detail:'Matices y precisión léxica', page:'vocabulary', color:'#10b981' },
        { icon:'🎮', title:'Quiz cronometrado', detail:'Mantén la velocidad y precisión', page:'games', color:'#f59e0b' },
      ],
    };
    return plans[level] || plans['A1'];
  },
};
