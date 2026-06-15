// ============================================================
// EnglishMaster — modules/exercises.js
// Exercise engine with multiple types and instant feedback
// ============================================================

const ExercisesModule = {
  _sessionExercises: [],
  _currentIdx: 0,
  _sessionCorrect: 0,
  _sessionStart: null,

  render(container, opts = {}) {
    const user = Storage.getUser();
    this._renderMenu(container, user.cefrLevel, opts);
  },

  _renderMenu(container, userLevel, opts = {}) {
    const types = Object.entries(EXERCISE_TYPE_LABELS);

    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">✏️ Ejercicios</h1>
        <p class="page-subtitle">Pon a prueba tu inglés con ejercicios variados</p>
      </div>

      <div class="grid-2 mb-lg" style="gap:1rem">
        <div class="stat-card card-enter-1">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">${Storage.getGamification().totalExercises}</div>
          <div class="stat-label">Ejercicios completados</div>
        </div>
        <div class="stat-card card-enter-2" style="--after-color:var(--color-accent)">
          <div class="stat-icon">📊</div>
          <div class="stat-value">${Storage.getAccuracy()}%</div>
          <div class="stat-label">Precisión global</div>
        </div>
      </div>

      <div class="tabs mb-lg" id="ex-level-tabs">
        ${CEFR_LEVELS.map(l => `<button class="tab-btn ${l === userLevel ? 'active' : ''}" data-level="${l}">${l}</button>`).join('')}
      </div>

      <div class="card card-glass mb-lg">
        <div class="card-header">
          <div class="card-title">🚀 Sesión de práctica</div>
          <span class="badge badge-primary" id="ex-level-badge">${userLevel}</span>
        </div>
        <p class="text-muted mb-md">10 ejercicios variados adaptados a tu nivel</p>
        <button class="btn btn-primary btn-lg" id="start-session-btn">¡Empezar sesión! →</button>
      </div>

      <h3 style="font-family:var(--font-heading);font-weight:800;margin-bottom:1rem">Por tipo</h3>
      <div class="grid-auto">
        ${types.map(([type, label], i) => {
          const count = getExercisesByType(type).length;
          return `
            <div class="card card-hover card-enter-${i+1}" style="cursor:pointer" data-type="${type}">
              <div style="font-size:2rem;margin-bottom:0.75rem">${label.split(' ')[0]}</div>
              <div class="card-title">${label.slice(3)}</div>
              <div style="font-size:0.8125rem;color:var(--text-muted);margin-top:0.5rem">${count} ejercicios</div>
            </div>`;
        }).join('')}
      </div>`;

    let selectedLevel = userLevel;

    $$('.tab-btn', container).forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.tab-btn', container).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedLevel = btn.dataset.level;
        const badge = document.getElementById('ex-level-badge');
        if (badge) badge.textContent = selectedLevel;
      });
    });

    document.getElementById('start-session-btn').addEventListener('click', () => {
      this._startSession(container, selectedLevel);
    });

    $$('[data-type]', container).forEach(card => {
      card.addEventListener('click', () => {
        const exercises = getExercisesByType(card.dataset.type);
        const levelFiltered = exercises.filter(e => CEFR_LEVELS.indexOf(e.level) <= CEFR_LEVELS.indexOf(selectedLevel) + 1);
        this._startSession(container, selectedLevel, levelFiltered.length ? levelFiltered : exercises);
      });
    });
  },

  _startSession(container, level, exercises = null) {
    this._sessionExercises = exercises || shuffle(getExerciseSession(level, 10));
    this._currentIdx = 0;
    this._sessionCorrect = 0;
    this._sessionStart = Date.now();
    this._renderExercise(container);
  },

  _renderExercise(container) {
    if (this._currentIdx >= this._sessionExercises.length) {
      this._renderSessionEnd(container);
      return;
    }

    const ex = this._sessionExercises[this._currentIdx];
    const progress = Math.round((this._currentIdx / this._sessionExercises.length) * 100);

    let questionHTML = '';
    switch (ex.type) {
      case 'fill_blank': questionHTML = this._renderFillBlank(ex); break;
      case 'multiple_choice': questionHTML = this._renderMultipleChoice(ex); break;
      case 'error_correction': questionHTML = this._renderErrorCorrection(ex); break;
      case 'translation': questionHTML = this._renderTranslation(ex); break;
      case 'sentence_order': questionHTML = this._renderSentenceOrder(ex); break;
      default: questionHTML = this._renderMultipleChoice(ex);
    }

    container.innerHTML = `
      <div class="animate-slide-right">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;gap:1rem">
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem">
              <span style="font-size:0.875rem;color:var(--text-muted)">Ejercicio ${this._currentIdx+1} / ${this._sessionExercises.length}</span>
              <div style="display:flex;gap:0.5rem">
                <span class="level-pill level-${ex.level}">${ex.level}</span>
                <span class="badge badge-primary">${EXERCISE_TYPE_LABELS[ex.type] || ex.type}</span>
              </div>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
          </div>
        </div>

        <div class="card card-glass" style="max-width:680px;margin:0 auto">
          <h3 style="font-family:var(--font-heading);font-size:1.0625rem;font-weight:800;margin-bottom:0.5rem">${ex.title}</h3>
          <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:1.5rem">${ex.instruction}</p>

          ${questionHTML}

          <div id="ex-feedback"></div>
          <div id="ex-next-area" class="hidden" style="margin-top:1rem">
            <button class="btn btn-primary btn-full" id="ex-next-btn">
              ${this._currentIdx + 1 < this._sessionExercises.length ? 'Siguiente →' : 'Ver resultados →'}
            </button>
          </div>
        </div>
      </div>`;

    // Wire up exercise type
    this._wireExercise(ex, container);
  },

  _renderFillBlank(ex) {
    return `
      <div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:1rem 1.25rem;margin-bottom:1.5rem;font-size:1.0625rem;font-style:italic">
        "${ex.template}"
      </div>
      <div style="display:flex;gap:0.75rem">
        <input type="text" class="input-field" id="fill-answer" placeholder="Escribe tu respuesta..." autocomplete="off" autocorrect="off" spellcheck="false" />
        <button class="btn btn-primary" id="fill-check-btn">✓ Comprobar</button>
      </div>`;
  },

  _renderMultipleChoice(ex) {
    return `
      ${ex.sentence ? `<div style="background:var(--bg-elevated);border-radius:var(--radius-md);padding:1rem;margin-bottom:1.5rem;font-size:1.0625rem">${ex.sentence}</div>` : ''}
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        ${ex.options.map((opt, i) => `
          <button class="option-btn" data-index="${i}">
            <span class="option-letter">${'ABCD'[i]}</span>
            <span>${opt}</span>
          </button>`).join('')}
      </div>`;
  },

  _renderErrorCorrection(ex) {
    return `
      <div style="background:var(--color-danger-light);border:2px solid var(--color-danger);border-radius:var(--radius-md);padding:1rem 1.25rem;margin-bottom:1.5rem;font-size:1.0625rem">
        ❌ "${ex.sentence}"
      </div>
      <div style="display:flex;gap:0.75rem">
        <input type="text" class="input-field" id="error-answer" placeholder="Escribe la frase corregida..." autocomplete="off" autocorrect="off" spellcheck="false" />
        <button class="btn btn-primary" id="error-check-btn">✓</button>
      </div>`;
  },

  _renderTranslation(ex) {
    return `
      <div style="background:var(--color-primary-light);border:1px solid var(--color-primary-glow);border-radius:var(--radius-md);padding:1rem 1.25rem;margin-bottom:1.5rem;font-size:1.125rem;font-weight:600">
        🇪🇸 "${ex.sentenceEs}"
      </div>
      <div style="display:flex;gap:0.75rem">
        <input type="text" class="input-field" id="translation-answer" placeholder="Translate to English..." autocomplete="off" autocorrect="off" spellcheck="false" />
        <button class="btn btn-primary" id="translation-check-btn">✓</button>
      </div>`;
  },

  _renderSentenceOrder(ex) {
    const shuffledWords = shuffle([...ex.words.map((w, i) => ({ w, i }))]);
    return `
      <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:1rem">Haz clic en las palabras en el orden correcto:</p>
      <div id="selected-words" style="min-height:48px;background:var(--bg-elevated);border-radius:var(--radius-md);padding:0.75rem;margin-bottom:1rem;display:flex;flex-wrap:wrap;gap:0.5rem;border:2px solid var(--border-color)">
        <span style="color:var(--text-muted);font-size:0.875rem" id="selected-placeholder">Toca las palabras para ordenarlas...</span>
      </div>
      <div id="word-bank" style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem">
        ${shuffledWords.map(({w, i}) => `
          <button class="badge badge-primary" style="cursor:pointer;padding:8px 14px;font-size:0.9375rem" data-word="${w}" data-idx="${i}">${w}</button>
        `).join('')}
      </div>
      <div style="display:flex;gap:0.75rem">
        <button class="btn btn-ghost btn-sm" id="order-clear-btn">🗑️ Limpiar</button>
        <button class="btn btn-primary" id="order-check-btn">✓ Comprobar</button>
      </div>`;
  },

  _wireExercise(ex, container) {
    const nextArea = document.getElementById('ex-next-area');
    const feedback = document.getElementById('ex-feedback');

    const showFeedback = (correct) => {
      const msg = correct
        ? `<div class="feedback-correct celebrate"><div class="feedback-icon">✅</div><div class="feedback-text"><div class="feedback-title">¡Correcto! +${ex.xp} XP</div><div class="feedback-detail">${ex.explanation}</div><div class="feedback-rule">📚 ${ex.rule}</div></div></div>`
        : `<div class="feedback-wrong wrong-answer"><div class="feedback-icon">❌</div><div class="feedback-text"><div class="feedback-title">Incorrecto</div><div class="feedback-detail">${ex.explanation}</div><div class="feedback-rule">✅ Respuesta: <strong>${ex.answer || ex.correctSentence || ex.correctTranslation || ''}</strong></div><div class="feedback-rule">📚 ${ex.rule}</div></div></div>`;
      feedback.innerHTML = msg;
      nextArea.classList.remove('hidden');
      nextArea.style.display = 'block';

      Storage.logExercise(ex.id, correct);
      if (correct) {
        this._sessionCorrect++;
        Gamification.addXP(ex.xp, 'exercise');
        Gamification.onCorrectAnswer();
        Gamification.unlock('first_exercise');
      } else {
        Storage.logError(ex.type, ex.template || ex.sentence || ex.sentenceEs || '');
        Gamification.onWrongAnswer();
      }
      Gamification.check();

      document.getElementById('ex-next-btn').addEventListener('click', () => {
        this._currentIdx++;
        this._renderExercise(container);
      });
    };

    // Fill blank
    if (ex.type === 'fill_blank') {
      const checkFn = () => {
        const val = document.getElementById('fill-answer').value.trim().toLowerCase();
        const correct = val === ex.answer.toLowerCase();
        document.getElementById('fill-answer').disabled = true;
        document.getElementById('fill-check-btn').disabled = true;
        showFeedback(correct);
      };
      document.getElementById('fill-check-btn').addEventListener('click', checkFn);
      document.getElementById('fill-answer').addEventListener('keydown', e => { if (e.key === 'Enter') checkFn(); });
    }

    // Multiple choice
    if (ex.type === 'multiple_choice') {
      $$('.option-btn', container).forEach(btn => {
        btn.addEventListener('click', () => {
          $$('.option-btn', container).forEach(b => b.disabled = true);
          const idx = parseInt(btn.dataset.index);
          const correct = idx === ex.correct;
          btn.classList.add(correct ? 'correct' : 'wrong');
          if (!correct) {
            const correctBtn = container.querySelector(`[data-index="${ex.correct}"]`);
            if (correctBtn) correctBtn.classList.add('correct');
          }
          showFeedback(correct);
        });
      });
    }

    // Error correction
    if (ex.type === 'error_correction') {
      const checkFn = () => {
        const val = document.getElementById('error-answer').value.trim().toLowerCase();
        const correct = val === ex.correctSentence.toLowerCase() ||
          val.includes(ex.correctWord.toLowerCase());
        document.getElementById('error-answer').disabled = true;
        document.getElementById('error-check-btn').disabled = true;
        showFeedback(correct);
      };
      document.getElementById('error-check-btn').addEventListener('click', checkFn);
      document.getElementById('error-answer').addEventListener('keydown', e => { if (e.key === 'Enter') checkFn(); });
    }

    // Translation
    if (ex.type === 'translation') {
      const checkFn = () => {
        const val = document.getElementById('translation-answer').value.trim().toLowerCase();
        const correct = val === ex.correctTranslation.toLowerCase() ||
          (ex.alternatives && ex.alternatives.some(a => a.toLowerCase() === val));
        document.getElementById('translation-answer').disabled = true;
        document.getElementById('translation-check-btn').disabled = true;
        showFeedback(correct);
      };
      document.getElementById('translation-check-btn').addEventListener('click', checkFn);
      document.getElementById('translation-answer').addEventListener('keydown', e => { if (e.key === 'Enter') checkFn(); });
    }

    // Sentence order
    if (ex.type === 'sentence_order') {
      let selectedWords = [];

      const updateDisplay = () => {
        const sel = document.getElementById('selected-words');
        const placeholder = document.getElementById('selected-placeholder');
        if (selectedWords.length === 0) {
          if (placeholder) placeholder.style.display = 'inline';
          sel.innerHTML = '<span style="color:var(--text-muted);font-size:0.875rem" id="selected-placeholder">Toca las palabras para ordenarlas...</span>';
        } else {
          sel.innerHTML = selectedWords.map((w, i) =>
            `<button class="badge badge-accent" style="padding:8px 14px;font-size:0.9375rem;cursor:pointer" data-sel-idx="${i}">${w}</button>`
          ).join('');
          $$('[data-sel-idx]', sel).forEach(btn => {
            btn.addEventListener('click', () => {
              const idx = parseInt(btn.dataset.selIdx);
              const word = selectedWords[idx];
              selectedWords.splice(idx, 1);
              // Re-show in bank
              const bank = document.getElementById('word-bank');
              if (bank) {
                const bankBtn = bank.querySelector(`[data-word="${word}"][style*="display:none"]`) ||
                                bank.querySelector(`[data-word="${word}"].hidden`);
                if (bankBtn) {
                  bankBtn.style.display = '';
                  bankBtn.classList.remove('hidden');
                }
              }
              updateDisplay();
            });
          });
        }
      };

      $$('[data-word]', container).forEach(btn => {
        btn.addEventListener('click', () => {
          selectedWords.push(btn.dataset.word);
          btn.style.display = 'none';
          updateDisplay();
        });
      });

      document.getElementById('order-clear-btn').addEventListener('click', () => {
        selectedWords = [];
        $$('[data-word]', container).forEach(btn => btn.style.display = '');
        updateDisplay();
      });

      document.getElementById('order-check-btn').addEventListener('click', () => {
        const userSentence = selectedWords.join(' ').toLowerCase().replace(/['"]/g, '');
        const correctSentence = ex.correctSentence.toLowerCase().replace(/['"]/g, '');
        const correct = userSentence === correctSentence ||
          userSentence.replace(/[,!?.]/g,'') === correctSentence.replace(/[,!?.]/g,'');
        document.getElementById('order-check-btn').disabled = true;
        document.getElementById('order-clear-btn').disabled = true;
        $$('[data-word]', container).forEach(b => b.disabled = true);
        showFeedback(correct);
      });
    }
  },

  _renderSessionEnd(container) {
    const total = this._sessionExercises.length;
    const correct = this._sessionCorrect;
    const pct = Math.round((correct / total) * 100);
    const timeTaken = Math.round((Date.now() - this._sessionStart) / 60000);
    if (timeTaken > 0) Storage.logStudySession(timeTaken, correct * 15);

    container.innerHTML = `
      <div class="text-center animate-scale-in" style="max-width:500px;margin:0 auto">
        <div style="font-size:4rem;margin-bottom:1rem">${pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '💪'}</div>
        <h2 class="page-title">¡Sesión completada!</h2>
        <p class="text-muted mb-lg">Duración: ${timeTaken || 1} minuto(s)</p>

        <div class="score-display">
          <div class="score-circle" style="${pct>=80?'background:var(--grad-accent)':pct>=60?'':'background:var(--grad-warning)'}">
            <span class="score-number">${pct}%</span>
            <span class="score-label">precisión</span>
          </div>
          <div style="text-align:left">
            <div style="margin-bottom:0.5rem">✅ <strong>${correct}</strong> correctas</div>
            <div style="margin-bottom:0.5rem">❌ <strong>${total - correct}</strong> incorrectas</div>
            <div>⭐ <strong>+${correct * 15}</strong> XP ganados</div>
          </div>
        </div>

        ${pct >= 80 ? '<p style="color:var(--color-accent);font-weight:700;margin-bottom:1rem">🎉 ¡Excelente trabajo!</p>' : ''}
        ${pct < 60 ? '<p style="color:var(--color-warning);font-weight:600;margin-bottom:1rem">💪 ¡Sigue practicando, mejoras cada día!</p>' : ''}

        <div style="display:flex;flex-direction:column;gap:0.75rem">
          <button class="btn btn-primary btn-full" onclick="ExercisesModule.render(document.getElementById('page-container'))">
            🔄 Nueva sesión
          </button>
          <button class="btn btn-ghost btn-full" onclick="App.navigate('lessons')">
            📚 Repasar lecciones
          </button>
        </div>
      </div>`;

    if (pct === 100) confetti();
  },
};

// Vocabulary page
const VocabularyPage = {
  render(container) {
    const topics = [...new Set(VOCABULARY.map(w => w.topic))];
    const dueWords = SpacedRep.getDueWords();

    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">📖 Vocabulario</h1>
        <p class="page-subtitle">Aprende y repasa palabras con spaced repetition</p>
      </div>

      ${dueWords.length > 0 ? `
        <div class="card" style="background:var(--color-warning-light);border-color:var(--color-warning);margin-bottom:1.5rem">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div>
              <div style="font-weight:700;color:var(--color-warning)">🔔 ${dueWords.length} tarjeta(s) para repasar hoy</div>
              <div style="font-size:0.875rem;color:var(--text-muted);margin-top:0.25rem">¡El repaso espaciado mejora tu memorización!</div>
            </div>
            <button class="btn btn-primary btn-sm" id="start-sr-btn">Repasar →</button>
          </div>
        </div>` : ''}

      <div class="tabs mb-lg" id="vocab-tabs">
        <button class="tab-btn active" data-filter="all">Todas</button>
        ${CEFR_LEVELS.map(l => `<button class="tab-btn" data-level="${l}">${l}</button>`).join('')}
      </div>

      <div id="vocab-search-bar" style="margin-bottom:1rem">
        <input class="input-field" type="text" id="vocab-search" placeholder="🔍 Buscar palabra..." />
      </div>

      <div id="vocab-grid" class="grid-auto"></div>`;

    const renderWords = (words) => {
      const grid = document.getElementById('vocab-grid');
      const learned = Storage.getProgress().wordsLearned;
      grid.innerHTML = words.map((w, i) => `
        <div class="card card-hover card-enter-${(i%6)+1}" style="cursor:pointer" data-word-id="${w.id}">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="font-family:var(--font-heading);font-size:1.125rem;font-weight:800">${w.word}</div>
              <div style="font-size:0.8125rem;color:var(--text-muted);margin-top:2px">${w.phonetic}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
              <span class="level-pill level-${w.level}">${w.level}</span>
              ${learned.includes(w.id) ? '<span style="font-size:0.7rem;color:var(--color-accent)">✓ Aprendida</span>' : ''}
            </div>
          </div>
          <div style="margin-top:0.75rem;font-weight:600;color:var(--color-accent)">${w.translation}</div>
          <div style="font-size:0.8125rem;color:var(--text-muted);margin-top:0.5rem;font-style:italic">"${w.example}"</div>
          <div style="margin-top:0.75rem;display:flex;justify-content:space-between;align-items:center">
            <span class="badge badge-info">${TOPIC_LABELS[w.topic] || w.topic}</span>
            <button class="btn btn-ghost btn-sm btn-icon speak-btn" data-text="${w.word}">🔊</button>
          </div>
        </div>`).join('');

      $$('.speak-btn', grid).forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          Speech.speak(btn.dataset.text);
        });
      });

      $$('[data-word-id]', grid).forEach(card => {
        card.addEventListener('click', () => {
          const word = VOCABULARY.find(w => w.id === card.dataset.wordId);
          if (word) this._showWordModal(word);
        });
      });
    };

    let currentWords = [...VOCABULARY];
    renderWords(currentWords);

    // Tabs
    $$('.tab-btn', container).forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.tab-btn', container).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const level = btn.dataset.level;
        currentWords = level ? VOCABULARY.filter(w => w.level === level) : [...VOCABULARY];
        renderWords(currentWords);
      });
    });

    // Search
    const searchInput = document.getElementById('vocab-search');
    searchInput?.addEventListener('input', debounce(() => {
      const q = searchInput.value.trim().toLowerCase();
      const filtered = q ? currentWords.filter(w =>
        w.word.toLowerCase().includes(q) || w.translation.toLowerCase().includes(q)
      ) : currentWords;
      renderWords(filtered);
    }, 250));

    // SR button
    document.getElementById('start-sr-btn')?.addEventListener('click', () => {
      const srContainer = document.getElementById('vocab-grid');
      srContainer.innerHTML = '';
      SpacedRep.renderSession(srContainer, dueWords, (correct, total) => {
        Gamification.addXP(correct * 15, 'spaced_rep');
        Gamification.check();
        setTimeout(() => this.render(container), 2000);
      });
    });
  },

  _showWordModal(word) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-card animate-scale-in" style="max-width:480px">
        <button class="modal-close" id="word-modal-close">✕</button>
        <div class="dict-result" style="background:none;border:none;padding:0">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem">
            <div>
              <div class="dict-word">${word.word}</div>
              <div class="dict-phonetic">${word.phonetic}</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:0.5rem">
              <span class="level-pill level-${word.level}">${word.level}</span>
              <button class="btn btn-primary btn-sm" id="modal-speak-btn">🔊 Escuchar</button>
            </div>
          </div>
          <div class="dict-translation">${word.translation}</div>
          <div class="dict-pos">${TOPIC_LABELS[word.topic] || word.topic}</div>
          <div class="dict-section-title">Ejemplo</div>
          <div class="dict-example">${word.example}</div>
          <div class="dict-example" style="border-left-color:var(--color-accent);color:var(--text-muted);font-style:italic">${word.exampleEs}</div>
          <div class="divider"></div>
          <div style="display:flex;gap:0.75rem">
            <button class="btn btn-accent btn-sm" id="modal-learn-btn">✅ Marcar aprendida</button>
            <button class="btn btn-primary btn-sm" id="modal-sr-btn">🎴 Añadir a repaso</button>
          </div>
        </div>
      </div>`;

    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.getElementById('word-modal-close').addEventListener('click', () => modal.remove());
    document.getElementById('modal-speak-btn').addEventListener('click', () => Speech.speak(word.word));
    document.getElementById('modal-learn-btn').addEventListener('click', () => {
      Storage.logWordLearned(word.id);
      Gamification.check();
      modal.remove();
    });
    document.getElementById('modal-sr-btn').addEventListener('click', () => {
      SpacedRep.initWord(word.id);
      showToast('🎴', 'Añadida a repaso', `"${word.word}" se repasará mañana`);
      modal.remove();
    });
  },
};
