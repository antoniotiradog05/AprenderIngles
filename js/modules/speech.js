// ============================================================
// EnglishMaster — modules/speech.js
// Web Speech API: TTS + STT
// ============================================================

const Speech = {
  supported: false,
  recognitionSupported: false,
  voices: [],
  preferredVoice: null,
  _recognition: null,
  _isListening: false,

  init() {
    this.supported = 'speechSynthesis' in window;
    this.recognitionSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    if (this.supported) {
      // Load voices
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
        this._selectVoice();
      };
      // Trigger immediate load
      this.voices = window.speechSynthesis.getVoices();
      if (this.voices.length) this._selectVoice();
    }
  },

  _selectVoice() {
    const enVoices = this.voices.filter(v => v.lang.startsWith('en'));
    this.preferredVoice = enVoices.find(v => v.name.includes('Google US English')) ||
                          enVoices.find(v => v.lang === 'en-US' && !v.localService) ||
                          enVoices.find(v => v.lang === 'en-GB') ||
                          enVoices.find(v => v.lang.startsWith('en')) ||
                          null;
  },

  // ---- Text-to-Speech ----
  speak(text, options = {}) {
    if (!this.supported) return Promise.resolve();
    window.speechSynthesis.cancel();

    return new Promise((resolve) => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = options.rate || Storage.getSettings().speechRate || 0.9;
      utter.pitch = options.pitch || 1;
      utter.volume = 1;
      if (this.preferredVoice) utter.voice = this.preferredVoice;
      utter.onend = resolve;
      utter.onerror = resolve;
      window.speechSynthesis.speak(utter);
    });
  },

  stop() {
    if (this.supported) window.speechSynthesis.cancel();
  },

  // ---- Speech Recognition ----
  startListening(onResult, onError) {
    if (!this.recognitionSupported) {
      if (onError) onError('Tu navegador no soporta reconocimiento de voz. Prueba con Chrome.');
      return;
    }

    const SRClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SRClass();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = true;

    this._recognition = rec;
    this._isListening = true;

    rec.onresult = (e) => {
      let interim = '';
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      if (onResult) onResult({ interim, final, isFinal: !!final });
    };

    rec.onerror = (e) => {
      this._isListening = false;
      const msgs = {
        'no-speech': 'No se detectó ningún sonido.',
        'audio-capture': 'No se puede acceder al micrófono.',
        'not-allowed': 'Permiso de micrófono denegado.',
        'network': 'Error de red.',
      };
      if (onError) onError(msgs[e.error] || 'Error de reconocimiento de voz.');
    };

    rec.onend = () => {
      this._isListening = false;
    };

    rec.start();
  },

  stopListening() {
    if (this._recognition && this._isListening) {
      this._recognition.stop();
      this._isListening = false;
    }
  },

  isListening() { return this._isListening; },

  // ---- Pronunciation scoring (basic) ----
  scorePronunciation(spoken, target) {
    if (!spoken || !target) return 0;
    const s = spoken.toLowerCase().replace(/[^a-z\s]/g, '');
    const t = target.toLowerCase().replace(/[^a-z\s]/g, '');
    if (s === t) return 100;

    const sWords = s.split(/\s+/);
    const tWords = t.split(/\s+/);
    const matches = sWords.filter(w => tWords.includes(w)).length;
    return Math.round((matches / Math.max(sWords.length, tWords.length)) * 100);
  },

  // ---- Pronunciation feedback ----
  pronunciationFeedback(score) {
    if (score >= 90) return { emoji: '🌟', text: '¡Excelente pronunciación!', color: 'accent' };
    if (score >= 70) return { emoji: '👍', text: '¡Buena pronunciación!', color: 'accent' };
    if (score >= 50) return { emoji: '😊', text: 'Pronunciación aceptable. ¡Sigue practicando!', color: 'warning' };
    if (score >= 30) return { emoji: '💪', text: 'Necesitas más práctica.', color: 'warning' };
    return { emoji: '🎯', text: 'Inténtalo de nuevo más despacio.', color: 'danger' };
  },
};

// ---- Speak button helper ----
function createSpeakBtn(text, small = true) {
  const btn = el('button', `btn btn-ghost ${small ? 'btn-sm' : ''} btn-icon`, '🔊');
  btn.title = 'Escuchar pronunciación';
  btn.setAttribute('data-tooltip', 'Pronunciar');
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    Speech.speak(text);
    btn.textContent = '🔉';
    setTimeout(() => btn.textContent = '🔊', 2000);
  });
  return btn;
}
