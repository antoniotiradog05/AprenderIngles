// ============================================================
// EnglishMaster — modules/games.js
// Mini-games: Hangman, Memory, Quiz, Story Builder
// ============================================================

const Games = {
  render(container) {
    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">🎮 Juegos</h1>
        <p class="page-subtitle">Aprende inglés jugando — ¡diversión y aprendizaje combinados!</p>
      </div>

      <div class="grid-2 mb-xl">
        ${[
          { id:'hangman', emoji:'😰', title:'Ahorcado', desc:'Adivina la palabra letra a letra', difficulty:'Fácil', color:'var(--color-primary)' },
          { id:'memory', emoji:'🃏', title:'Memoria', desc:'Empareja palabras con sus traducciones', difficulty:'Medio', color:'var(--color-accent)' },
          { id:'quiz', emoji:'⚡', title:'Quiz Cronometrado', desc:'Responde preguntas contra el reloj', difficulty:'Difícil', color:'var(--color-warning)' },
          { id:'story', emoji:'📖', title:'Completa la Historia', desc:'Rellena los huecos en una historia', difficulty:'Variado', color:'var(--color-danger)' },
        ].map((g, i) => `
          <div class="game-card card-enter-${i+1}" data-game="${g.id}">
            <span class="game-emoji">${g.emoji}</span>
            <div class="game-title">${g.title}</div>
            <div class="game-desc">${g.desc}</div>
            <span class="badge badge-primary game-difficulty">${g.difficulty}</span>
          </div>`).join('')}
      </div>

      <div class="card card-glass">
        <div class="card-header">
          <div class="card-title">🏆 Mejores puntuaciones</div>
        </div>
        ${this._renderLeaderboard()}
      </div>`;

    $$('[data-game]', container).forEach(card => {
      card.addEventListener('click', () => {
        const game = card.dataset.game;
        switch (game) {
          case 'hangman': this._playHangman(container); break;
          case 'memory': this._playMemory(container); break;
          case 'quiz': this._playQuiz(container); break;
          case 'story': this._playStory(container); break;
        }
      });
    });
  },

  _renderLeaderboard() {
    const games = Storage.getProgress().gamesPlayed;
    if (!games.length) return '<p class="text-muted">Juega tu primer juego para ver tu puntuación.</p>';
    const recent = [...games].reverse().slice(0, 5);
    return `<div style="display:flex;flex-direction:column;gap:0.5rem">
      ${recent.map((g, i) => `
        <div style="display:flex;align-items:center;gap:1rem;padding:0.75rem;background:var(--bg-elevated);border-radius:var(--radius-sm)">
          <span style="font-size:1.25rem">${['🥇','🥈','🥉','4️⃣','5️⃣'][i]}</span>
          <span style="flex:1">${g.game}</span>
          <span class="badge badge-primary">${g.score} pts</span>
          <span style="font-size:0.75rem;color:var(--text-muted)">${g.date}</span>
        </div>`).join('')}
    </div>`;
  },

  // ============================================================
  // HANGMAN
  // ============================================================
  _playHangman(container) {
    const wordPool = getRandomWords(10, Storage.getUser().cefrLevel);
    const word = pickRandom(wordPool);
    const letters = word.word.replace(/\s/g, '').toUpperCase().split('');
    const uniqueLetters = [...new Set(letters)];
    let guessed = [];
    let wrong = 0;
    const maxWrong = 6;

    const hangmanStates = [
      `  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========`,
      `  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========`,
      `  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========`,
      `  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========`,
      `  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========`,
      `  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========`,
      `  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========`,
    ];

    const render = () => {
      const wordDisplay = word.word.toUpperCase().split('').map(ch => {
        if (ch === ' ') return '<span class="letter-box" style="border:none;width:20px"> </span>';
        return `<span class="letter-box">${guessed.includes(ch) ? ch : ''}</span>`;
      }).join('');

      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const gameOver = wrong >= maxWrong;
      const won = uniqueLetters.every(l => guessed.includes(l));

      container.innerHTML = `
        <div class="animate-slide-right">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
            <button class="btn btn-ghost btn-sm" id="hangman-back">← Juegos</button>
            <span class="badge badge-${gameOver ? 'danger' : won ? 'accent' : 'primary'}">
              ${gameOver ? '💀 Perdiste' : won ? '🎉 ¡Ganaste!' : `❤️ ${maxWrong - wrong} vidas`}
            </span>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem">
            <div class="card">
              <pre class="hangman-figure">${hangmanStates[wrong]}</pre>
            </div>
            <div class="card">
              <p class="text-muted mb-md" style="font-size:0.875rem">Categoría: <strong>${TOPIC_LABELS[word.topic] || word.topic}</strong></p>
              <p class="text-muted mb-md" style="font-size:0.875rem">Pista: <em>${word.exampleEs}</em></p>
              <div class="word-display">${wordDisplay}</div>
            </div>
          </div>

          ${(!gameOver && !won) ? `
          <div class="keyboard-grid">
            ${alphabet.map(l => {
              const isGuessed = guessed.includes(l);
              const isRight = letters.includes(l) && isGuessed;
              const isWrong = !letters.includes(l) && isGuessed;
              return `<button class="key-btn ${isRight ? 'correct' : isWrong ? 'wrong' : ''}"
                data-letter="${l}" ${isGuessed ? 'disabled' : ''}>${l}</button>`;
            }).join('')}
          </div>` : ''}

          ${gameOver ? `
            <div class="feedback-wrong text-center" style="margin-top:1rem">
              <div class="feedback-icon">💀</div>
              <div class="feedback-text">
                <div class="feedback-title">¡Game Over!</div>
                <div>La palabra era: <strong>${word.word}</strong> — ${word.translation}</div>
              </div>
            </div>
            <button class="btn btn-primary mt-lg btn-full" id="hangman-retry">🔄 Jugar de nuevo</button>` : ''}

          ${won ? `
            <div class="feedback-correct text-center celebrate" style="margin-top:1rem">
              <div class="feedback-icon">🎉</div>
              <div class="feedback-text">
                <div class="feedback-title">¡Excelente! +40 XP</div>
                <div>${word.word} = ${word.translation}</div>
              </div>
            </div>
            <button class="btn btn-primary mt-lg btn-full" id="hangman-next">➡️ Siguiente palabra</button>` : ''}
        </div>`;

      document.getElementById('hangman-back')?.addEventListener('click', () => this.render(container));
      document.getElementById('hangman-retry')?.addEventListener('click', () => this._playHangman(container));
      document.getElementById('hangman-next')?.addEventListener('click', () => {
        Gamification.addXP(40, 'hangman');
        Storage.logGame('Ahorcado', uniqueLetters.length - wrong);
        Gamification.onGamePlayed('hangman');
        this._playHangman(container);
      });

      $$('[data-letter]:not(:disabled)', container).forEach(btn => {
        btn.addEventListener('click', () => {
          const letter = btn.getAttribute('data-letter');
          guessed.push(letter);
          if (!letters.includes(letter)) wrong++;
          render();
          if (!letters.includes(letter)) Speech.speak(letter.toLowerCase());
          else Speech.speak(word.word);
        });
      });
    };

    render();
    Gamification.unlock('first_game');
  },

  // ============================================================
  // MEMORY MATCH
  // ============================================================
  _playMemory(container) {
    const level = Storage.getUser().cefrLevel;
    const words = getRandomWords(8, level);
    const pairs = words.flatMap(w => [
      { id: w.id + '_en', text: w.word, matchId: w.id },
      { id: w.id + '_es', text: w.translation, matchId: w.id },
    ]);
    const cards = shuffle(pairs);
    let flipped = [];
    let matched = [];
    let moves = 0;

    const render = () => {
      const allMatched = matched.length === words.length;
      container.innerHTML = `
        <div class="animate-slide-right">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
            <button class="btn btn-ghost btn-sm" id="memory-back">← Juegos</button>
            <div style="display:flex;gap:1rem">
              <span class="badge badge-primary">Movimientos: ${moves}</span>
              <span class="badge badge-accent">Parejas: ${matched.length}/${words.length}</span>
            </div>
          </div>

          <div class="memory-grid">
            ${cards.map(card => {
              const isFlipped = flipped.find(f => f.id === card.id) || matched.includes(card.matchId);
              const isMatched = matched.includes(card.matchId);
              return `
                <div class="memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}" data-card-id="${card.id}">
                  <div class="memory-card-inner">
                    <div class="memory-card-front">🇬🇧</div>
                    <div class="memory-card-back">${card.text}</div>
                  </div>
                </div>`;
            }).join('')}
          </div>

          ${allMatched ? `
            <div class="feedback-correct celebrate text-center" style="margin-top:1.5rem">
              <div class="feedback-icon">🎉</div>
              <div class="feedback-text">
                <div class="feedback-title">¡Completado! +60 XP</div>
                <div>En ${moves} movimientos</div>
              </div>
            </div>
            <button class="btn btn-primary btn-full mt-lg" id="memory-again">🔄 Jugar de nuevo</button>` : ''}
        </div>`;

      document.getElementById('memory-back')?.addEventListener('click', () => this.render(container));
      document.getElementById('memory-again')?.addEventListener('click', () => {
        Gamification.addXP(60, 'memory');
        Storage.logGame('Memoria', moves);
        Gamification.onGamePlayed('memory');
        this._playMemory(container);
      });

      $$('.memory-card:not(.matched)', container).forEach(card => {
        card.addEventListener('click', () => {
          const cardId = card.dataset.cardId;
          const cardData = cards.find(c => c.id === cardId);
          if (!cardData || flipped.find(f => f.id === cardId) || flipped.length === 2) return;

          flipped.push(cardData);
          moves++;
          render();

          if (flipped.length === 2) {
            if (flipped[0].matchId === flipped[1].matchId) {
              matched.push(flipped[0].matchId);
              flipped = [];
              if (matched.length === words.length) {
                confetti();
              }
              setTimeout(render, 300);
            } else {
              setTimeout(() => {
                flipped = [];
                render();
              }, 900);
            }
          }
        });
      });

      if (allMatched) {
        confetti();
        Gamification.unlock('memory_master');
      }
    };

    render();
    Gamification.unlock('first_game');
  },

  // ============================================================
  // TIMED QUIZ
  // ============================================================
  _playQuiz(container) {
    const level = Storage.getUser().cefrLevel;
    const questions = shuffle(ASSESSMENT_QUESTIONS.filter(q =>
      CEFR_LEVELS.indexOf(q.level) <= CEFR_LEVELS.indexOf(level) + 1
    )).slice(0, 10);

    let currentQ = 0;
    let score = 0;
    let timeLeft = 15;
    let timer = null;
    let answered = false;

    const renderQ = () => {
      if (currentQ >= questions.length) {
        renderEnd();
        return;
      }

      const q = questions[currentQ];
      answered = false;
      clearInterval(timer);
      timeLeft = 15;

      container.innerHTML = `
        <div class="animate-slide-right">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
            <button class="btn btn-ghost btn-sm" id="quiz-back">← Salir</button>
            <div class="badge badge-primary">Pregunta ${currentQ+1}/${questions.length}</div>
            <div class="badge badge-warning">⭐ ${score} pts</div>
          </div>

          <div class="card card-glass" style="max-width:620px;margin:0 auto">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;gap:1.5rem">
              <span class="level-pill level-${q.level}">${q.level}</span>
              <div style="display:flex;flex-direction:column;gap:4px;flex:1;max-width:240px">
                <div style="display:flex;justify-content:space-between;font-size:0.75rem;font-weight:800">
                  <span class="text-muted">Tiempo Restante</span>
                  <span id="timer-text" style="color:var(--color-primary);font-weight:900">${timeLeft}s</span>
                </div>
                <div class="progress-bar" style="height:6px;background:var(--border-color)">
                  <div class="progress-fill" id="timer-bar" style="width:100%;background:var(--color-primary);transition:width 1s linear"></div>
                </div>
              </div>
            </div>

            <h3 style="font-size:1.15rem;font-weight:700;margin-bottom:1.5rem;line-height:1.4">${q.question}</h3>

            <div style="display:flex;flex-direction:column;gap:0.75rem">
              ${q.options.map((opt, i) => `
                <button class="option-btn" data-index="${i}">
                  <span class="option-letter">${'ABCD'[i]}</span>
                  <span>${opt}</span>
                </button>`).join('')}
            </div>
          </div>
        </div>`;

      document.getElementById('quiz-back')?.addEventListener('click', () => {
        clearInterval(timer);
        this.render(container);
      });

      // Timer
      const timerText = document.getElementById('timer-text');
      const timerBar = document.getElementById('timer-bar');
      timer = setInterval(() => {
        timeLeft--;
        if (timerText) timerText.textContent = `${timeLeft}s`;
        if (timerBar) {
          const pct = (timeLeft / 15) * 100;
          timerBar.style.width = `${pct}%`;
          if (timeLeft <= 5) {
            timerBar.style.background = 'var(--color-danger)';
            timerText.style.color = 'var(--color-danger)';
          }
        }
        if (timeLeft <= 0) {
          clearInterval(timer);
          if (!answered) {
            answered = true;
            $$('.option-btn').forEach(b => b.disabled = true);
            const cb = document.querySelector(`[data-index="${q.correct}"]`);
            if (cb) cb.classList.add('correct');
            setTimeout(() => { currentQ++; renderQ(); }, 1200);
          }
        }
      }, 1000);

      $$('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          clearInterval(timer);
          $$('.option-btn').forEach(b => b.disabled = true);
          const idx = parseInt(btn.dataset.index);
          const correct = idx === q.correct;
          btn.classList.add(correct ? 'correct' : 'wrong');
          if (!correct) {
            const cb = document.querySelector(`[data-index="${q.correct}"]`);
            if (cb) cb.classList.add('correct');
          }
          if (correct) {
            score += Math.max(10, timeLeft * 5);
            Gamification.onCorrectAnswer();
          } else {
            Gamification.onWrongAnswer();
          }
          setTimeout(() => { currentQ++; renderQ(); }, 900);
        });
      });
    };

    const renderEnd = () => {
      clearInterval(timer);
      Gamification.addXP(Math.round(score / 2), 'quiz');
      Storage.logGame('Quiz Cronometrado', score);
      Gamification.onGamePlayed('quiz');
      Gamification.unlock('speedster');

      container.innerHTML = `
        <div class="text-center animate-scale-in" style="max-width:440px;margin:0 auto">
          <div style="font-size:4rem">⚡</div>
          <h2 class="page-title">Quiz completado</h2>
          <div class="score-display">
            <div class="score-circle">
              <span class="score-number">${score}</span>
              <span class="score-label">puntos</span>
            </div>
            <div style="text-align:left">
              <div>⭐ +${Math.round(score/2)} XP</div>
              <div class="mt-sm">📊 ${questions.length} preguntas</div>
            </div>
          </div>
          <div style="display:flex;gap:0.75rem;flex-direction:column;margin-top:1rem">
            <button class="btn btn-primary btn-full" id="quiz-again">🔄 Jugar de nuevo</button>
            <button class="btn btn-ghost btn-full" id="quiz-games">← Todos los juegos</button>
          </div>
        </div>`;

      document.getElementById('quiz-again').addEventListener('click', () => this._playQuiz(container));
      document.getElementById('quiz-games').addEventListener('click', () => this.render(container));
      if (score > 100) confetti();
    };

    renderQ();
    Gamification.unlock('first_game');
  },

  // ============================================================
  // STORY BUILDER
  // ============================================================
  _playStory(container) {
    const stories = [
      {
        title: "A Day at the Office",
        level: 'A2',
        text: "Yesterday, John _1_ (wake) up at 7 am. He _2_ (have) breakfast and _3_ (go) to work. At the office, he _4_ (meet) his boss, who _5_ (be) very happy with his report.",
        blanks: [
          { n: 1, answer: 'woke', hint: 'Past of "wake"', options: ['waked', 'woke', 'woke up', 'waken'] },
          { n: 2, answer: 'had', hint: 'Past of "have"', options: ['have', 'had', 'haved', 'was having'] },
          { n: 3, answer: 'went', hint: 'Past of "go"', options: ['goed', 'goes', 'went', 'gone'] },
          { n: 4, answer: 'met', hint: 'Past of "meet"', options: ['meeted', 'met', 'meet', 'meeting'] },
          { n: 5, answer: 'was', hint: '"boss" = 3rd person singular, past of "be"', options: ['were', 'is', 'was', 'be'] },
        ]
      },
      {
        title: "The Lost Traveller",
        level: 'B1',
        text: "Maria _1_ (travel) to London for the first time. She _2_ (not / be) there before, so she _3_ (feel) a bit nervous. By the time she _4_ (arrive), it _5_ (already / start) raining.",
        blanks: [
          { n: 1, answer: 'was travelling', hint: 'Past action in progress', options: ['travelled', 'was travelling', 'had travelled', 'has travelled'] },
          { n: 2, answer: "hadn't been", hint: 'Past Perfect negative', options: ["didn't be", "wasn't", "hadn't been", "hasn't been"] },
          { n: 3, answer: 'felt', hint: 'Past Simple of "feel"', options: ['feeled', 'felt', 'feels', 'feeling'] },
          { n: 4, answer: 'arrived', hint: 'Past Simple', options: ['arrives', 'arrived', 'was arriving', 'has arrived'] },
          { n: 5, answer: 'had already started', hint: 'Past Perfect — happened before arriving', options: ['already started', 'was already starting', 'had already started', 'has already started'] },
        ]
      },
    ];

    const story = pickRandom(stories);
    const userAnswers = new Array(story.blanks.length).fill(null);

    const render = () => {
      let displayText = story.text;
      story.blanks.forEach((b, i) => {
        const ans = userAnswers[i];
        displayText = displayText.replace(
          `_${b.n}_`,
          ans ? `<span style="background:rgba(16,185,129,0.15);color:var(--color-accent);padding:2px 10px;border-radius:6px;border:1px solid rgba(16,185,129,0.3);font-family:var(--font-heading);font-weight:800;font-size:0.95rem;margin:0 4px">${ans}</span>` : `<span style="background:var(--color-primary-light);color:var(--color-primary);padding:2px 10px;border-radius:6px;border:1px solid var(--color-primary-glow);font-family:var(--font-heading);font-weight:800;font-size:0.95rem;margin:0 4px">[${b.n}]</span>`
        );
      });

      const allAnswered = userAnswers.every(a => a !== null);
      const score = allAnswered ? userAnswers.filter((a, i) => a === story.blanks[i].answer).length : 0;

      container.innerHTML = `
        <div class="animate-slide-right">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
            <button class="btn btn-ghost btn-sm" id="story-back">← Juegos</button>
            <span class="level-pill level-${story.level}">${story.level}</span>
          </div>

          <div class="card card-glass mb-lg">
            <div class="card-title mb-md">📖 ${story.title}</div>
            <p style="font-size:1rem;line-height:1.9">${displayText}</p>
          </div>

          ${!allAnswered ? `
          <div style="display:flex;flex-direction:column;gap:1rem">
            ${story.blanks.map((b, i) => userAnswers[i] ? '' : `
              <div class="card">
                <div style="font-weight:600;margin-bottom:0.75rem">Hueco [${b.n}] — Pista: <em>${b.hint}</em></div>
                <div style="display:flex;flex-direction:column;gap:0.5rem">
                  ${b.options.map(opt => `
                    <button class="option-btn" data-blank="${i}" data-opt="${opt}">
                      <span>${opt}</span>
                    </button>`).join('')}
                </div>
              </div>`).join('')}
          </div>` : `
          <div class="${score === story.blanks.length ? 'feedback-correct celebrate' : 'feedback-wrong'}">
            <div class="feedback-icon">${score === story.blanks.length ? '🌟' : '💪'}</div>
            <div class="feedback-text">
              <div class="feedback-title">${score}/${story.blanks.length} correctas</div>
              ${story.blanks.map((b, i) => `
                <div style="font-size:0.875rem;margin-top:0.5rem">
                  [${b.n}] ${userAnswers[i] === b.answer ? '✅' : '❌'} ${b.answer}
                </div>`).join('')}
            </div>
          </div>
          <div style="display:flex;gap:0.75rem;margin-top:1rem">
            <button class="btn btn-primary" id="story-new">Nueva historia</button>
            <button class="btn btn-ghost" id="story-back2">← Juegos</button>
          </div>`}
        </div>`;

      document.getElementById('story-back')?.addEventListener('click', () => this.render(container));
      document.getElementById('story-back2')?.addEventListener('click', () => this.render(container));
      document.getElementById('story-new')?.addEventListener('click', () => {
        Gamification.addXP(score * 20, 'story');
        Storage.logGame('Historia', score);
        this._playStory(container);
      });

      $$('[data-blank]', container).forEach(btn => {
        btn.addEventListener('click', () => {
          const blankIdx = parseInt(btn.dataset.blank);
          userAnswers[blankIdx] = btn.dataset.opt;
          render();
        });
      });

      if (allAnswered && score === story.blanks.length) confetti();
    };

    render();
    Gamification.unlock('first_game');
  },
};
