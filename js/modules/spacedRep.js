// ============================================================
// EnglishMaster — modules/spacedRep.js
// SM-2 Spaced Repetition Algorithm for vocabulary
// ============================================================

const SpacedRep = {
  // SM-2 algorithm
  // quality: 0-5 (0=blackout, 3=correct with difficulty, 5=perfect)
  review(wordId, quality) {
    let card = Storage.getSRCard(wordId);

    if (!card) {
      card = { interval: 1, easeFactor: 2.5, reviews: 0, due: todayStr() };
    }

    card.reviews++;

    if (quality < 3) {
      // Failed — reset
      card.interval = 1;
    } else {
      // Passed
      if (card.reviews === 1) {
        card.interval = 1;
      } else if (card.reviews === 2) {
        card.interval = 6;
      } else {
        card.interval = Math.round(card.interval * card.easeFactor);
      }

      // Update ease factor
      card.easeFactor = Math.max(1.3,
        card.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
      );
    }

    // Set next due date
    const due = new Date();
    due.setDate(due.getDate() + card.interval);
    card.due = due.toISOString().slice(0, 10);

    Storage.setSRCard(wordId, card);
    return card;
  },

  // Get words due for review
  getDueWords() {
    const dueCards = Storage.getDueCards();
    return dueCards.map(card => {
      const word = VOCABULARY.find(w => w.id === card.id);
      return word ? { ...word, srCard: card } : null;
    }).filter(Boolean);
  },

  // Initialize a word for SR
  initWord(wordId) {
    if (!Storage.getSRCard(wordId)) {
      Storage.setSRCard(wordId, {
        interval: 1,
        easeFactor: 2.5,
        reviews: 0,
        due: todayStr(),
      });
    }
  },

  // Render flashcard session
  renderSession(container, words, onComplete) {
    if (!words || words.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <p>¡No hay tarjetas pendientes hoy!</p>
          <p class="text-muted mt-md">Vuelve mañana para repasar.</p>
        </div>`;
      return;
    }

    let currentIndex = 0;
    let sessionResults = [];
    let isFlipped = false;

    const render = () => {
      if (currentIndex >= words.length) {
        // Session complete
        const correct = sessionResults.filter(r => r.quality >= 3).length;
        container.innerHTML = `
          <div class="text-center animate-scale-in">
            <div style="font-size:4rem;margin-bottom:1rem">🎉</div>
            <h2 class="page-title">¡Sesión completada!</h2>
            <p class="text-muted mb-lg">${correct}/${words.length} palabras dominadas</p>
            <div class="score-circle" style="margin:0 auto 1.5rem">
              <span class="score-number">${Math.round(correct/words.length*100)}%</span>
              <span class="score-label">precisión</span>
            </div>
            <button class="btn btn-primary" id="sr-again-btn">Otra ronda</button>
          </div>`;
        document.getElementById('sr-again-btn')?.addEventListener('click', () => {
          currentIndex = 0;
          sessionResults = [];
          render();
        });
        if (onComplete) onComplete(correct, words.length);
        return;
      }

      const word = words[currentIndex];
      isFlipped = false;

      container.innerHTML = `
        <div class="animate-fade-in">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
            <span class="badge badge-primary">${currentIndex + 1} / ${words.length}</span>
            <span class="badge badge-info">${TOPIC_LABELS[word.topic] || word.topic}</span>
            <span class="level-pill level-${word.level}">${word.level}</span>
          </div>

          <div class="flashcard-container" id="flashcard">
            <div class="flashcard" id="flashcard-inner">
              <div class="flashcard-front">
                <span class="flashcard-word">${word.word}</span>
                <span class="flashcard-phonetic">${word.phonetic}</span>
                <span class="flashcard-hint" style="margin-top:2rem;opacity:0.6">Toca para ver la traducción</span>
              </div>
              <div class="flashcard-back">
                <span class="flashcard-translation">${word.translation}</span>
                <div class="flashcard-example" style="margin-top:1rem;font-size:0.875rem;opacity:0.85;text-align:center">
                  <div>${word.example}</div>
                  <div style="margin-top:4px;opacity:0.7;font-style:italic">${word.exampleEs}</div>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;justify-content:center;gap:0.5rem;margin:1rem 0">
            <button class="btn btn-ghost btn-sm" id="sr-speak-btn">🔊 Pronunciar</button>
          </div>

          <div id="sr-quality-btns" class="hidden" style="display:none">
            <p class="text-center text-muted" style="margin-bottom:0.75rem;font-size:0.875rem">¿Qué tan bien la recordaste?</p>
            <div style="display:flex;gap:0.75rem;justify-content:center">
              <button class="btn btn-danger btn-sm" data-q="1">😖 Difícil</button>
              <button class="btn btn-ghost btn-sm" data-q="3">😊 Regular</button>
              <button class="btn btn-accent btn-sm" data-q="5">🌟 Fácil</button>
            </div>
          </div>
        </div>`;

      const card = document.getElementById('flashcard');
      const inner = document.getElementById('flashcard-inner');
      const speakBtn = document.getElementById('sr-speak-btn');
      const qualityBtns = document.getElementById('sr-quality-btns');

      card.addEventListener('click', () => {
        if (!isFlipped) {
          inner.classList.add('flipped');
          isFlipped = true;
          qualityBtns.style.display = 'block';
          qualityBtns.classList.remove('hidden');
          Speech.speak(word.word);
        }
      });

      speakBtn.addEventListener('click', () => Speech.speak(word.word));

      $$('[data-q]', container).forEach(btn => {
        btn.addEventListener('click', () => {
          const quality = parseInt(btn.getAttribute('data-q'));
          SpacedRep.review(word.id, quality);
          sessionResults.push({ wordId: word.id, quality });

          if (quality >= 3) {
            Storage.logWordLearned(word.id);
            Gamification.addXP(quality === 5 ? 15 : 10, 'spaced_rep');
          }

          currentIndex++;
          render();
        });
      });
    };

    render();
  },
};
