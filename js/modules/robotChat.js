// ============================================================
// EnglishMaster — modules/robotChat.js
// Rule-based conversational robot with grammar correction
// ============================================================

const RobotChat = {
  name: 'MAX',
  avatar: '🤖',
  _sessionMsgCount: 0,
  _currentTopic: null,
  _userName: '',

  // ============================================================
  // Knowledge base: patterns + responses
  // ============================================================
  _responses: [
    // Greetings
    { patterns: [/^(hello|hi|hey|hola|good morning|good afternoon|good evening)/i], responses: ['Hello! 😊 How are you today?', 'Hi there! Great to see you! How\'s your day going?', 'Hey! I\'m MAX, your English practice robot! Ready to chat? 🤖'], topic: 'greeting' },
    { patterns: [/how are you|how do you do|how\'s it going/i], responses: ["I'm doing great, thanks for asking! How about you?", "I'm fantastic! Always happy to help you practice English. How are you?", "Great, as always! What would you like to talk about today?"], topic: 'greeting' },
    { patterns: [/i('m| am) (fine|good|great|well|okay|ok|alright)/i], responses: ['That\'s wonderful! 😊 What shall we talk about?', 'Great to hear! Tell me, what did you do today?', 'Fantastic! Have you been practicing your English today?'], topic: 'daily_life' },
    { patterns: [/i('m| am) (tired|exhausted|sleepy)/i], responses: ['Oh no! You should get some rest after our chat. 😴 What made you tired?', 'That\'s understandable! Maybe some coffee would help? ☕ What have you been doing?'], topic: 'emotions' },
    { patterns: [/i('m| am) (happy|excited|great|wonderful|fantastic)/i], responses: ['That\'s amazing! 🎉 What are you so happy about?', 'Wonderful! Your positive energy is contagious! What\'s making you feel that way?'], topic: 'emotions' },

    // Personal info
    { patterns: [/my name is|i('m| am) called|call me/i], responses: ['Nice to meet you! That\'s a great name. Where are you from?', 'Lovely name! How long have you been studying English?', 'Great! I\'ll remember that. What\'s your favorite thing about learning English?'], topic: 'personal' },
    { patterns: [/i('m| am) from|i live in|i come from/i], responses: ['How interesting! What\'s it like there?', 'Cool! I\'ve always wanted to know more about that place. What do you like about it?', 'Great! Is English spoken widely in your country?'], topic: 'travel' },
    { patterns: [/i (work|study|learn)/i], responses: ['That sounds interesting! Tell me more about it.', 'How do you find it? Is it challenging?', 'Wonderful! Do you use English in your work or studies?'], topic: 'work' },

    // Hobbies and interests
    { patterns: [/i (like|love|enjoy|prefer) (music|movies|films|sports|reading|gaming|cooking|traveling)/i], responses: ['That\'s awesome! What\'s your favorite {{match}}?', 'Great taste! I love that too! Who is your favorite?', 'Interesting! How long have you been into {{match}}?'], topic: 'hobbies' },
    { patterns: [/my favorite/i], responses: ['That\'s a great choice! Why do you like it?', 'Interesting! Tell me more about that.', 'I can see why! What do you like most about it?'], topic: 'hobbies' },

    // English learning
    { patterns: [/english is (hard|difficult|challenging)/i], responses: ['I understand! English can be tricky. Which part do you find most difficult?', 'Don\'t worry! With practice, it becomes easier. What specifically challenges you?', 'That\'s normal. What area would you like to practice right now?'], topic: 'learning' },
    { patterns: [/english is (easy|fun|interesting|cool)/i], responses: ['Great attitude! That will help you learn faster! 🚀', 'I agree! Which part of English do you enjoy most?', 'Wonderful perspective! Keep that enthusiasm and you\'ll master it!'], topic: 'learning' },
    { patterns: [/(how do you say|what does .+ mean|translate)/i], responses: ['That\'s a great question! Let me help. Which word are you asking about?', 'I\'d be happy to help with vocabulary! What word or phrase do you need?'], topic: 'vocabulary' },
    { patterns: [/i want to (improve|practice|learn|study)/i], responses: ['Excellent! Practice is the key to mastery. Let\'s practice together! What topic shall we focus on?', 'That\'s the spirit! Regular practice makes perfect. What would you like to practice?'], topic: 'learning' },

    // Travel
    { patterns: [/(have you ever|did you ever) (been|go|visit)/i], responses: ['As a robot, I can\'t travel physically, but I know a LOT about places! Where are you thinking of going?', 'I haven\'t been anywhere physically, but I\'d love to hear about your travels! Have you traveled much?'], topic: 'travel' },
    { patterns: [/(i went|i visited|i traveled)/i], responses: ['How exciting! What did you do there?', 'That sounds wonderful! What was your favorite thing about it?', 'Interesting! Would you recommend it to others?'], topic: 'travel' },

    // Food
    { patterns: [/(food|eat|restaurant|cooking|meal|breakfast|lunch|dinner)/i], responses: ['Yum! 🍽️ What\'s your favorite food?', 'I love talking about food! Do you enjoy cooking?', 'Food is such a great topic! What\'s a typical meal in your country?'], topic: 'food' },

    // Weather
    { patterns: [/(weather|rain|sunny|snow|hot|cold|temperature)/i], responses: ['Talking about the weather is very British! ☂️ What\'s the weather like where you are?', 'The weather can really affect your mood! Do you prefer warm or cold weather?'], topic: 'weather' },

    // Work / school
    { patterns: [/(job|work|office|boss|colleague|meeting)/i], responses: ['Work is an important topic! Do you use English at work?', 'Interesting! What kind of work do you do?', 'How\'s work going? Is it keeping you busy?'], topic: 'work' },
    { patterns: [/(school|university|college|class|teacher|professor)/i], responses: ['Education is so important! What are you studying?', 'That\'s great! Do you enjoy your studies?', 'Learning is a lifelong journey! What\'s your favorite subject?'], topic: 'education' },

    // Technology
    { patterns: [/(technology|computer|internet|app|phone|AI|robot)/i], responses: ['As a robot, I\'m a big fan of technology! 🤖 What technology do you use most?', 'Technology is amazing! How has it changed your daily life?', 'I love talking about technology! Do you prefer Android or iPhone? 😄'], topic: 'technology' },

    // Gratitude / farewell
    { patterns: [/thank you|thanks|gracias/i], responses: ['You\'re very welcome! 😊 Keep practicing!', 'My pleasure! That\'s what I\'m here for!', 'Happy to help! Your English is improving! 🌟'], topic: 'gratitude' },
    { patterns: [/(bye|goodbye|see you|farewell|hasta luego)/i], responses: ['Goodbye! Keep practicing your English! 👋', 'See you later! Don\'t forget to study! 📚', 'Bye bye! You\'re doing great with your English! Come back soon! 🤖'], topic: 'farewell' },

    // Grammar questions
    { patterns: [/(what is|what\'s) (the difference|between) (will and going to|will and gonna)/i], responses: ['Great grammar question! "WILL" is used for spontaneous decisions and predictions: "It will rain." "GOING TO" is for planned intentions: "I\'m going to study tonight." Does that help?'], topic: 'grammar' },
    { patterns: [/(what is|explain) (present perfect|past perfect|conditional)/i], responses: ['Excellent grammar question! The Present Perfect connects past and present: "I have studied English for 5 years." Would you like an example to practice?'], topic: 'grammar' },
    { patterns: [/(when do I use|how do I use) (the|a|an)/i], responses: ['Great question about articles! Use "A/AN" for first mention or general nouns ("a dog"), and "THE" for specific, already-mentioned nouns ("the dog I saw"). Need more examples?'], topic: 'grammar' },

    // Catch-all
    { patterns: [/(.*)/], responses: [
      "That's interesting! Can you tell me more?",
      "I see! Let's keep the conversation in English — it's great practice! What else is on your mind?",
      "Hmm, interesting point. What do you think about it?",
      "I'd love to hear more about that! Can you expand?",
      "Fascinating! How does that make you feel?",
      "That's a great topic! Tell me more.",
    ], topic: 'general' },
  ],

  // ============================================================
  // Grammar checker
  // ============================================================
  _grammarChecks: [
    { pattern: /\b(i)\b(?! am| was| will| have| had| would| can| could| should| must)/i, fix: 'I', rule: 'El pronombre "I" siempre va en mayúscula.' },
    { pattern: /\b(he|she|it) (don't|dont)\b/i, fix: 'doesn\'t', rule: '"He/She/It" usa "doesn\'t" (no "don\'t") en negativas.' },
    { pattern: /\bdid(n't)? (went|came|saw|ate|drank|slept|ran|spoke|had|got|made|took|gave|bought)\b/i, fix: 'base form of verb', rule: 'Después de "did/didn\'t" usa el infinitivo, no el pasado.' },
    { pattern: /\bmore (better|worse|faster|bigger|smaller|happier)\b/i, fix: 'just the comparative', rule: 'No uses "more" con comparativos de una sílaba: "better" no "more better".' },
    { pattern: /\bvery (unique|perfect|impossible|dead|impossible|infinite)\b/i, fix: 'remove "very"', rule: '"Unique", "perfect", "impossible" son absolutos — no necesitan "very".' },
    { pattern: /\b(i are|you is|he are|she are|they is|we is)\b/i, fix: 'correct form of "to be"', rule: 'Error en el verbo "to be": I am, you are, he/she/it is, we/they are.' },
    { pattern: /\b(yesterday|last \w+|ago) .+ (have|has) \w+ed\b/i, fix: 'Past Simple', rule: 'Con expresiones de tiempo pasado concreto (yesterday, last week), usa Past Simple, no Present Perfect.' },
    { pattern: /\b(i) (can to|must to|will to|should to|would to)\b/i, fix: 'remove "to" after modal', rule: 'Los verbos modales (can, must, will, should, would) NO llevan "to".' },
  ],

  checkGrammar(text) {
    for (const check of this._grammarChecks) {
      if (check.pattern.test(text)) {
        return { hasError: true, rule: check.rule, fix: check.fix };
      }
    }
    return { hasError: false };
  },

  // ============================================================
  // Get response
  // ============================================================
  _getResponse(userMsg) {
    for (const item of this._responses) {
      for (const pattern of item.patterns) {
        if (pattern.test(userMsg)) {
          const responses = item.responses;
          let response = responses[Math.floor(Math.random() * responses.length)];
          // Replace {{match}} with matched group if needed
          const match = userMsg.match(pattern);
          if (match && match[1]) response = response.replace('{{match}}', match[1]);
          this._currentTopic = item.topic;
          return response;
        }
      }
    }
    return "That's interesting! Can you tell me more about it?";
  },

  // ============================================================
  // Suggestions based on topic
  // ============================================================
  _getSuggestions() {
    const topicSuggestions = {
      greeting: ['I\'m doing well, thanks!', 'I want to practice English', 'Tell me a fun fact'],
      daily_life: ['I usually wake up at 7', 'What do you like to do?', 'Let\'s talk about hobbies'],
      emotions: ['What makes you happy?', 'I love learning English', 'Tell me something interesting'],
      personal: ['I\'m from Spain', 'I work as a teacher', 'I\'ve been studying for 2 years'],
      hobbies: ['I love playing football', 'My favorite music is jazz', 'I enjoy cooking'],
      travel: ['I want to visit London', 'Have you been to Spain?', 'My favorite country is Italy'],
      food: ['My favorite food is pizza', 'I love cooking pasta', 'What is traditional English food?'],
      learning: ['What should I practice?', 'English grammar is hard', 'Help me with my pronunciation'],
      grammar: ['Explain the Present Perfect', 'What is a conditional?', 'When do I use articles?'],
      general: ['Tell me something new', 'Let\'s practice grammar', 'What\'s your favorite topic?'],
    };

    const suggestions = topicSuggestions[this._currentTopic] || topicSuggestions.general;
    return shuffle(suggestions).slice(0, 3);
  },

  // ============================================================
  // Render
  // ============================================================
  render(container) {
    this._userName = Storage.getUser().name || 'Student';
    const history = Storage.getChatHistory();

    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">🤖 Chat con MAX</h1>
        <p class="page-subtitle">Practica inglés conversacional con tu robot IA</p>
      </div>

      <div class="chat-container">
        <div class="chat-header">
          <div class="robot-avatar">🤖</div>
          <div>
            <div class="chat-robot-name">MAX — English Practice Robot</div>
            <div class="chat-robot-status">
              <span class="status-dot"></span>
              Online — Listo para practicar
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" id="clear-chat-btn" style="margin-left:auto;color:rgba(255,255,255,0.7)">🗑️</button>
        </div>

        <div class="chat-messages" id="chat-messages">
          ${history.length === 0 ? this._renderWelcome() : history.map(m => this._renderMessage(m.role, m.text)).join('')}
        </div>

        <div class="chat-suggestions" id="chat-suggestions">
          ${this._getSuggestions().map(s => `<button class="suggestion-chip">${s}</button>`).join('')}
        </div>

        <div class="chat-input-area">
          <input class="chat-input" type="text" id="chat-input" placeholder="Type in English..." autocomplete="off" />
          <button class="chat-send-btn" id="chat-send-btn">➤</button>
        </div>
      </div>`;

    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const messagesEl = document.getElementById('chat-messages');

    const sendMessage = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      this._handleSend(text, messagesEl, container);
    };

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

    $$('.suggestion-chip', container).forEach(chip => {
      chip.addEventListener('click', () => {
        chatInput.value = chip.textContent;
        sendMessage();
      });
    });

    document.getElementById('clear-chat-btn').addEventListener('click', () => {
      Storage.clearChatHistory();
      this.render(container);
    });

    // Scroll to bottom
    messagesEl.scrollTop = messagesEl.scrollHeight;
  },

  _renderWelcome() {
    const userName = Storage.getUser().name || 'there';
    const welcomes = [
      `Hi ${userName}! 👋 I'm MAX, your English practice robot! Let's have a conversation in English. Don't worry about making mistakes — I'll help you!`,
      `Hello, ${userName}! 🤖 I'm MAX! I'm here to help you practice your English. Just chat with me naturally and I'll give you feedback on your grammar!`,
    ];
    const msg = welcomes[Math.floor(Math.random() * welcomes.length)];
    Storage.addChatMessage('bot', msg);
    return this._renderMessage('bot', msg);
  },

  _renderMessage(role, text, correction = null) {
    const isBot = role === 'bot';
    const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return `
      <div class="chat-msg ${role}">
        <div class="msg-avatar">${isBot ? '🤖' : '🧑'}</div>
        <div>
          <div class="msg-bubble">
            ${text}
            ${isBot ? `<button class="btn btn-ghost btn-sm btn-icon" style="margin-left:0.5rem;opacity:0.6;vertical-align:middle" onclick="Speech.speak('${text.replace(/'/g, "\\'").replace(/"/g, '\\"').substring(0,200)}')">🔊</button>` : ''}
          </div>
          ${correction ? `<div class="msg-correction">⚠️ ${correction}</div>` : ''}
          <div class="msg-time">${time}</div>
        </div>
      </div>`;
  },

  _handleSend(userText, messagesEl, container) {
    // Render user message
    const grammarCheck = this.checkGrammar(userText);
    const correction = grammarCheck.hasError ? `Corrección: ${grammarCheck.rule}` : null;

    messagesEl.insertAdjacentHTML('beforeend', this._renderMessage('user', userText, correction));
    Storage.addChatMessage('user', userText);

    // Typing indicator
    const typingId = 'typing-' + Date.now();
    messagesEl.insertAdjacentHTML('beforeend', `
      <div class="chat-msg bot" id="${typingId}">
        <div class="msg-avatar">🤖</div>
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>`);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    // Delay for realistic feel
    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      document.getElementById(typingId)?.remove();

      const response = this._getResponse(userText);
      messagesEl.insertAdjacentHTML('beforeend', this._renderMessage('bot', response));
      Storage.addChatMessage('bot', response);
      messagesEl.scrollTop = messagesEl.scrollHeight;

      // Update suggestions
      const suggestionsEl = document.getElementById('chat-suggestions');
      if (suggestionsEl) {
        suggestionsEl.innerHTML = this._getSuggestions().map(s =>
          `<button class="suggestion-chip">${s}</button>`
        ).join('');
        $$('.suggestion-chip', suggestionsEl).forEach(chip => {
          chip.addEventListener('click', () => {
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
              chatInput.value = chip.textContent;
              chatInput.focus();
            }
          });
        });
      }

      this._sessionMsgCount++;
      Gamification.check();

      // XP for chatting
      Gamification.addXP(5, 'chat');

    }, delay);
  },
};

// Dictionary Page
const DictionaryPage = {
  render(container) {
    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">🔍 Diccionario</h1>
        <p class="page-subtitle">Busca palabras y descubre su significado, uso y pronunciación</p>
      </div>

      <div class="card card-glass mb-xl" style="max-width:600px;margin:0 auto 2rem">
        <div style="display:flex;gap:0.75rem">
          <input class="input-field" type="text" id="dict-input" placeholder="Busca una palabra en inglés o español..." />
          <button class="btn btn-primary" id="dict-search-btn">Buscar</button>
        </div>
      </div>

      <div id="dict-results"></div>

      <div id="dict-suggestions">
        <h3 style="font-family:var(--font-heading);font-weight:800;margin-bottom:1rem">💡 Palabras del día</h3>
        <div class="grid-3">
          ${getRandomWords(3).map(w => `
            <div class="card card-hover" style="cursor:pointer" data-dict-word="${w.word}">
              <div style="font-family:var(--font-heading);font-size:1.125rem;font-weight:800">${w.word}</div>
              <div style="font-size:0.8125rem;color:var(--text-muted)">${w.phonetic}</div>
              <div style="color:var(--color-accent);font-weight:600;margin-top:0.5rem">${w.translation}</div>
              <span class="level-pill level-${w.level} mt-sm">${w.level}</span>
            </div>`).join('')}
        </div>
      </div>`;

    const searchFn = () => {
      const q = document.getElementById('dict-input').value.trim();
      if (!q) return;
      this._search(q, document.getElementById('dict-results'));
    };

    document.getElementById('dict-search-btn').addEventListener('click', searchFn);
    document.getElementById('dict-input').addEventListener('keydown', e => { if (e.key === 'Enter') searchFn(); });

    $$('[data-dict-word]', container).forEach(card => {
      card.addEventListener('click', () => {
        document.getElementById('dict-input').value = card.dataset.dictWord;
        this._search(card.dataset.dictWord, document.getElementById('dict-results'));
      });
    });
  },

  _search(query, resultsEl) {
    const results = searchDictionary(query);
    document.getElementById('dict-suggestions')?.remove();

    if (results.length === 0) {
      resultsEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <p>No se encontraron resultados para "<strong>${query}</strong>"</p>
          <p class="text-muted mt-sm">Prueba con otra palabra o verifica la ortografía.</p>
        </div>`;
      return;
    }

    resultsEl.innerHTML = results.map(w => `
      <div class="dict-result mb-lg animate-slide-up">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem">
          <div>
            <div class="dict-word">${w.word}</div>
            <div class="dict-phonetic">${w.phonetic}</div>
            <div class="dict-translation">${w.translation}</div>
            <div class="dict-pos">${TOPIC_LABELS[w.topic] || w.topic} · ${w.level}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;align-items:flex-end">
            <span class="level-pill level-${w.level}">${w.level}</span>
            <button class="btn btn-primary btn-sm" onclick="Speech.speak('${w.word}')">🔊 Pronunciar</button>
          </div>
        </div>
        <div class="dict-section-title">Ejemplo en inglés</div>
        <div class="dict-example" style="display:flex;align-items:center;justify-content:space-between">
          <span>${w.example}</span>
          <button class="btn btn-ghost btn-sm btn-icon" onclick="Speech.speak('${w.example.replace(/'/g,"\\'")}')">🔊</button>
        </div>
        <div class="dict-example" style="border-left-color:var(--color-accent);color:var(--text-muted)">🇪🇸 ${w.exampleEs}</div>
        <div class="divider"></div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
          <button class="btn btn-accent btn-sm" onclick="Storage.logWordLearned('${w.id}');showToast('✅','Marcada','${w.word} añadida a tu vocabulario')">✅ Aprendida</button>
          <button class="btn btn-outline btn-sm" onclick="SpacedRep.initWord('${w.id}');showToast('🎴','Repaso','${w.word} añadida al repaso espaciado')">🎴 Añadir a repaso</button>
        </div>
      </div>`).join('');
  },
};
