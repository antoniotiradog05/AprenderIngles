// ============================================================
// EnglishMaster — modules/storage.js
// localStorage abstraction with versioning and auto-save
// ============================================================

const STORAGE_KEY = 'englishmaster_v2';

const DEFAULT_STATE = {
  version: 2,
  user: {
    name: '',
    avatar: '🎓',
    joinDate: todayStr(),
    cefrLevel: 'A1',
    assessmentDone: false,
    studyPlan: null,
  },
  gamification: {
    xp: 0,
    level: 1,
    streak: 0,
    lastStudyDate: null,
    achievements: [],
    totalExercises: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  },
  progress: {
    studySessions: [],       // [{date, minutes, xp}]
    wordsLearned: [],        // [wordId]
    grammarTopicsViewed: [], // [topicId]
    exerciseHistory: [],     // [{exerciseId, correct, date}]
    gamesPlayed: [],         // [{game, score, date}]
    errors: [],              // [{type, detail, date}]
    levelHistory: [],        // [{level, date}]
    totalMinutes: 0,
  },
  spacedRep: {
    cards: {},  // {wordId: {interval, easeFactor, due, reviews}}
  },
  chat: {
    history: [], // [{role, text, timestamp}]
  },
  settings: {
    theme: 'dark',
    speechRate: 0.9,
    notifications: true,
  }
};

const Storage = {
  state: null,
  _autoSaveTimer: null,

  init() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        // Deep merge with defaults for new keys
        this.state = this._deepMerge(DEFAULT_STATE, saved);
      } else {
        this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      }
    } catch (e) {
      console.warn('Storage init error, using defaults', e);
      this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    this._startAutoSave();
    return this.state;
  },

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  },

  _startAutoSave() {
    clearInterval(this._autoSaveTimer);
    this._autoSaveTimer = setInterval(() => this.save(), 30000);
  },

  _deepMerge(defaults, saved) {
    const result = JSON.parse(JSON.stringify(defaults));
    for (const key in saved) {
      if (saved[key] !== null && typeof saved[key] === 'object' && !Array.isArray(saved[key])) {
        result[key] = this._deepMerge(result[key] || {}, saved[key]);
      } else {
        result[key] = saved[key];
      }
    }
    return result;
  },

  // ---- User ----
  getUser() { return this.state.user; },
  setUser(data) { Object.assign(this.state.user, data); this.save(); },

  // ---- Gamification ----
  getGamification() { return this.state.gamification; },
  setGamification(data) { Object.assign(this.state.gamification, data); this.save(); },

  addXP(amount) {
    this.state.gamification.xp += amount;
    this.save();
    return this.state.gamification.xp;
  },

  updateStreak() {
    const gam = this.state.gamification;
    const today = todayStr();
    if (gam.lastStudyDate === today) return gam.streak;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().slice(0, 10);
    if (gam.lastStudyDate === yStr) {
      gam.streak += 1;
    } else if (gam.lastStudyDate !== today) {
      gam.streak = 1;
    }
    gam.lastStudyDate = today;
    this.save();
    return gam.streak;
  },

  addAchievement(id) {
    if (!this.state.gamification.achievements.includes(id)) {
      this.state.gamification.achievements.push(id);
      this.save();
      return true;
    }
    return false;
  },

  hasAchievement(id) {
    return this.state.gamification.achievements.includes(id);
  },

  // ---- Progress ----
  getProgress() { return this.state.progress; },

  logStudySession(minutes, xp) {
    this.state.progress.studySessions.push({ date: todayStr(), minutes, xp });
    this.state.progress.totalMinutes += minutes;
    if (this.state.progress.studySessions.length > 90) {
      this.state.progress.studySessions.shift();
    }
    this.save();
  },

  logWordLearned(wordId) {
    if (!this.state.progress.wordsLearned.includes(wordId)) {
      this.state.progress.wordsLearned.push(wordId);
      this.save();
    }
  },

  logExercise(exerciseId, correct) {
    this.state.progress.exerciseHistory.push({ exerciseId, correct, date: todayStr() });
    if (correct) {
      this.state.gamification.correctAnswers++;
    } else {
      this.state.gamification.wrongAnswers++;
    }
    this.state.gamification.totalExercises++;
    if (this.state.progress.exerciseHistory.length > 200) {
      this.state.progress.exerciseHistory.shift();
    }
    this.save();
  },

  logError(type, detail) {
    this.state.progress.errors.push({ type, detail, date: todayStr() });
    if (this.state.progress.errors.length > 100) {
      this.state.progress.errors.shift();
    }
    this.save();
  },

  logGrammarViewed(topicId) {
    if (!this.state.progress.grammarTopicsViewed.includes(topicId)) {
      this.state.progress.grammarTopicsViewed.push(topicId);
      this.save();
    }
  },

  logGame(gameName, score) {
    this.state.progress.gamesPlayed.push({ game: gameName, score, date: todayStr() });
    if (this.state.progress.gamesPlayed.length > 100) {
      this.state.progress.gamesPlayed.shift();
    }
    this.save();
  },

  getWeeklyStudy() {
    const sessions = this.state.progress.studySessions;
    const result = [];
    const days = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const mins = sessions.filter(s => s.date === dateStr).reduce((acc, s) => acc + s.minutes, 0);
      result.push({ date: dateStr, day: days[d.getDay()], minutes: mins });
    }
    return result;
  },

  getAccuracy() {
    const g = this.state.gamification;
    if (g.totalExercises === 0) return 0;
    return Math.round((g.correctAnswers / g.totalExercises) * 100);
  },

  // ---- Spaced Repetition ----
  getSRCard(wordId) {
    return this.state.spacedRep.cards[wordId] || null;
  },

  setSRCard(wordId, data) {
    this.state.spacedRep.cards[wordId] = data;
    this.save();
  },

  getDueCards() {
    const today = todayStr();
    return Object.entries(this.state.spacedRep.cards)
      .filter(([, card]) => card.due <= today)
      .map(([id, card]) => ({ id, ...card }));
  },

  // ---- Chat ----
  getChatHistory() { return this.state.chat.history; },
  addChatMessage(role, text) {
    this.state.chat.history.push({ role, text, timestamp: Date.now() });
    if (this.state.chat.history.length > 100) {
      this.state.chat.history.shift();
    }
    this.save();
  },
  clearChatHistory() { this.state.chat.history = []; this.save(); },

  // ---- Settings ----
  getSettings() { return this.state.settings; },
  setSetting(key, value) { this.state.settings[key] = value; this.save(); },

  // ---- Reset ----
  reset() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
  },

  // ---- Export / Import ----
  exportData() {
    return JSON.stringify(this.state, null, 2);
  },

  importData(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      this.state = this._deepMerge(DEFAULT_STATE, data);
      this.save();
      return true;
    } catch (e) {
      return false;
    }
  },
};
