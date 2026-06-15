// ============================================================
// EnglishMaster — modules/gamification.js
// XP, levels, streaks, achievements
// ============================================================

const XP_THRESHOLDS = [0,100,250,500,900,1500,2400,3700,5500,8000,12000];
const LEVEL_TITLES = ['Novato','Principiante','Aprendiz','Estudiante','Intermedio','Avanzado','Experto','Maestro','Gurú','Leyenda','Gran Maestro'];
const LEVEL_EMOJIS = ['🌱','📖','✏️','🎯','💪','🧠','🔥','⭐','🏆','👑','🌟'];

const ACHIEVEMENTS = [
  { id:'first_lesson', emoji:'📚', name:'¡Primera lección!', desc:'Completa tu primera lección', xp:50 },
  { id:'first_exercise', emoji:'✏️', name:'¡A practicar!', desc:'Completa tu primer ejercicio', xp:30 },
  { id:'first_game', emoji:'🎮', name:'¡A jugar!', desc:'Juega tu primer minijuego', xp:30 },
  { id:'streak_3', emoji:'🔥', name:'Racha de 3 días', desc:'Estudia 3 días seguidos', xp:75 },
  { id:'streak_7', emoji:'🔥🔥', name:'Semana de fuego', desc:'Estudia 7 días seguidos', xp:200 },
  { id:'streak_30', emoji:'🔥🔥🔥', name:'Mes de campeón', desc:'Estudia 30 días seguidos', xp:1000 },
  { id:'words_10', emoji:'📖', name:'Vocabulario básico', desc:'Aprende 10 palabras', xp:50 },
  { id:'words_50', emoji:'📚', name:'Vocabulario sólido', desc:'Aprende 50 palabras', xp:150 },
  { id:'words_100', emoji:'🧠', name:'Vocabulario amplio', desc:'Aprende 100 palabras', xp:500 },
  { id:'exercises_10', emoji:'🎯', name:'10 ejercicios', desc:'Completa 10 ejercicios', xp:100 },
  { id:'exercises_50', emoji:'💪', name:'50 ejercicios', desc:'Completa 50 ejercicios', xp:300 },
  { id:'exercises_100', emoji:'⚡', name:'100 ejercicios', desc:'Completa 100 ejercicios', xp:600 },
  { id:'perfect_score', emoji:'⭐', name:'¡Perfecto!', desc:'10 respuestas correctas seguidas', xp:100 },
  { id:'assessment_done', emoji:'🎯', name:'Test completado', desc:'Completa el test de nivel inicial', xp:100 },
  { id:'grammar_5', emoji:'📝', name:'Gramático', desc:'Estudia 5 temas de gramática', xp:100 },
  { id:'chat_10', emoji:'🤖', name:'Conversador', desc:'Envía 10 mensajes al robot', xp:75 },
  { id:'night_owl', emoji:'🦉', name:'Búho nocturno', desc:'Estudia después de las 22:00', xp:50 },
  { id:'level_5', emoji:'🏅', name:'Nivel 5', desc:'Alcanza el nivel 5', xp:200 },
  { id:'level_10', emoji:'🏆', name:'Nivel 10', desc:'Alcanza el nivel 10', xp:500 },
  { id:'speedster', emoji:'⚡', name:'Velocista', desc:'Completa un quiz cronometrado', xp:80 },
  { id:'hangman_win', emoji:'😅', name:'Ahorcado experto', desc:'Gana al ahorcado 5 veces', xp:100 },
  { id:'memory_master', emoji:'🃏', name:'Maestro de memoria', desc:'Gana al juego de memoria', xp:80 },
];

const Gamification = {
  _consecutiveCorrect: 0,
  _hangmanWins: 0,

  init() {},

  // ---- XP & Level ----
  addXP(amount, source = '') {
    const totalXP = Storage.addXP(amount);
    const newLevel = this.xpToLevel(totalXP);
    const oldLevel = Storage.getGamification().level;

    if (newLevel > oldLevel) {
      Storage.setGamification({ level: newLevel });
      this._onLevelUp(newLevel);
    }

    showXPPopup(amount);
    this._updateNavXP();
    this._checkLevelAchievements(newLevel);
    return totalXP;
  },

  xpToLevel(xp) {
    for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= XP_THRESHOLDS[i]) return i + 1;
    }
    return 1;
  },

  xpForNextLevel(currentLevel) {
    return XP_THRESHOLDS[currentLevel] || XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  },

  xpProgress(xp, level) {
    const min = XP_THRESHOLDS[level - 1] || 0;
    const max = XP_THRESHOLDS[level] || XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
    return Math.min(100, Math.round(((xp - min) / (max - min)) * 100));
  },

  getLevelTitle(level) { return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)]; },
  getLevelEmoji(level) { return LEVEL_EMOJIS[Math.min(level - 1, LEVEL_EMOJIS.length - 1)]; },

  _onLevelUp(level) {
    showToast(this.getLevelEmoji(level), `¡Nivel ${level} alcanzado!`, `Eres un ${this.getLevelTitle(level)}`);
    confetti();
  },

  // ---- Streak ----
  updateStreak() {
    const streak = Storage.updateStreak();
    this._updateNavStreak(streak);
    this._checkStreakAchievements(streak);
    return streak;
  },

  // ---- Achievements ----
  unlock(id) {
    const unlocked = Storage.addAchievement(id);
    if (unlocked) {
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (ach) {
        showToast(ach.emoji, '¡Logro desbloqueado!', ach.name);
        this.addXP(ach.xp, 'achievement');
      }
    }
    return unlocked;
  },

  has(id) { return Storage.hasAchievement(id); },

  check() {
    const gam = Storage.getGamification();
    const prog = Storage.getProgress();

    // Words
    if (prog.wordsLearned.length >= 10) this.unlock('words_10');
    if (prog.wordsLearned.length >= 50) this.unlock('words_50');
    if (prog.wordsLearned.length >= 100) this.unlock('words_100');

    // Exercises
    if (gam.totalExercises >= 10) this.unlock('exercises_10');
    if (gam.totalExercises >= 50) this.unlock('exercises_50');
    if (gam.totalExercises >= 100) this.unlock('exercises_100');

    // Grammar
    if (prog.grammarTopicsViewed.length >= 5) this.unlock('grammar_5');

    // Chat
    const chatCount = Storage.getChatHistory().filter(m => m.role === 'user').length;
    if (chatCount >= 10) this.unlock('chat_10');

    // Night owl
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 4) this.unlock('night_owl');
  },

  onCorrectAnswer() {
    this._consecutiveCorrect++;
    if (this._consecutiveCorrect >= 10) {
      this.unlock('perfect_score');
      this._consecutiveCorrect = 0;
    }
  },

  onWrongAnswer() {
    this._consecutiveCorrect = 0;
  },

  onGamePlayed(game) {
    this.unlock('first_game');
    if (game === 'quiz') this.unlock('speedster');
    if (game === 'memory') this.unlock('memory_master');
    if (game === 'hangman') {
      this._hangmanWins++;
      if (this._hangmanWins >= 5) this.unlock('hangman_win');
    }
  },

  _checkStreakAchievements(streak) {
    if (streak >= 3) this.unlock('streak_3');
    if (streak >= 7) this.unlock('streak_7');
    if (streak >= 30) this.unlock('streak_30');
  },

  _checkLevelAchievements(level) {
    if (level >= 5) this.unlock('level_5');
    if (level >= 10) this.unlock('level_10');
  },

  // ---- UI Update ----
  _updateNavXP() {
    const gam = Storage.getGamification();
    const xpStr = formatNumber(gam.xp) + ' XP';
    const xpEl = document.getElementById('nav-xp');
    const tbXP = document.getElementById('topbar-xp-val');
    if (xpEl) xpEl.textContent = xpStr;
    if (tbXP) tbXP.textContent = xpStr;
  },

  _updateNavStreak(streak) {
    const navStreak = document.getElementById('nav-streak');
    const tbStreak = document.getElementById('topbar-streak-val');
    if (navStreak) navStreak.textContent = streak;
    if (tbStreak) tbStreak.textContent = streak;
  },

  refreshNav() {
    const gam = Storage.getGamification();
    const user = Storage.getUser();
    this._updateNavXP();
    this._updateNavStreak(gam.streak);
    const navLvl = document.getElementById('nav-level');
    const navName = document.getElementById('nav-username');
    if (navLvl) navLvl.textContent = `${user.cefrLevel} · ${this.getLevelTitle(gam.level)}`;
    if (navName) navName.textContent = user.name || 'Estudiante';
  },

  getAllAchievements() { return ACHIEVEMENTS; },
};
