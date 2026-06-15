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
  // ============================================================
  // Render
  // ============================================================
  render(container) {
    this._userName = Storage.getUser().name || 'Student';
    const history = Storage.getChatHistory();
    const gam = Storage.getGamification();

    if (!this._currentTopic) this._currentTopic = 'general';

    const topics = [
      { id: 'general', label: '💬 General' },
      { id: 'food', label: '🍔 Comida' },
      { id: 'travel', label: '✈️ Viajes' },
      { id: 'work', label: '💼 Trabajo' },
      { id: 'hobbies', label: '🎮 Hobbies' },
      { id: 'weather', label: '🌦️ Clima' },
      { id: 'technology', label: '🤖 Tech' },
      { id: 'grammar', label: '📚 Gramática' }
    ];

    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">🤖 Chat con MAX</h1>
        <p class="page-subtitle">Practica tu inglés conversacional en tiempo real con MAX</p>
      </div>

      <div class="chat-layout">
        <!-- Main Chat Box -->
        <div class="chat-container">
          <div class="chat-header">
            <div class="robot-avatar">🤖</div>
            <div>
              <div class="chat-robot-name">MAX — English Practice Robot</div>
              <div class="chat-robot-status">
                <span class="status-dot"></span>
                Online — Sistema Operativo Activo
              </div>
            </div>
            <button class="btn btn-ghost btn-sm" id="clear-chat-btn" style="margin-left:auto;color:rgba(255,255,255,0.7)">🗑️ Limpiar</button>
          </div>

          <!-- Quick Topic Header Selector -->
          <div class="chat-topic-header">
            <span class="chat-topic-label">Tema:</span>
            ${topics.map(t => `<button class="chat-topic-chip ${this._currentTopic === t.id ? 'active' : ''}" data-topic-id="${t.id}">${t.label}</button>`).join('')}
          </div>

          <div class="chat-messages" id="chat-messages">
            ${history.length === 0 ? this._renderWelcome() : history.map(m => this._renderMessage(m.role, m.text)).join('')}
          </div>

          <div class="chat-suggestions" id="chat-suggestions">
            ${this._getSuggestions().map(s => `<button class="suggestion-chip">${s}</button>`).join('')}
          </div>

          <div class="chat-input-area">
            <input class="chat-input" type="text" id="chat-input" placeholder="Escribe en inglés..." autocomplete="off" />
            <button class="chat-send-btn" id="chat-send-btn">➤</button>
          </div>
        </div>

        <!-- Robot Diagnostic Sidebar -->
        <div class="robot-diagnostic-panel">
          <div class="diagnostic-header">
            <span>⚙️ MÓDULO MAX DIAGS</span>
            <span style="font-size:0.65rem;background:var(--color-primary-light);padding:2px 6px;border-radius:4px">v1.4.2</span>
          </div>

          <!-- Console log terminal -->
          <div class="diagnostic-screen" id="diagnostic-screen">
            &gt; MAX BOOT SYSTEM OK...<br>
            &gt; VOCABULARY ENGINE LOADED.<br>
            &gt; GRAMMAR COMPILER ACTIVE.<br>
            &gt; WAITING FOR USER INPUT...
          </div>

          <div class="diagnostic-item">
            <div class="diagnostic-label-row">
              <span>Uso del Procesador</span>
              <span id="diag-cpu-val">12%</span>
            </div>
            <div class="diagnostic-bar">
              <div class="diagnostic-fill" id="diag-cpu-bar" style="width: 12%; background: var(--color-primary)"></div>
            </div>
          </div>

          <div class="diagnostic-item">
            <div class="diagnostic-label-row">
              <span>Batería del Núcleo</span>
              <span>98%</span>
            </div>
            <div class="diagnostic-bar">
              <div class="diagnostic-fill" style="width: 98%; background: var(--color-accent)"></div>
            </div>
          </div>

          <div class="diagnostic-item" style="margin-top: 0.5rem;">
            <div class="diagnostic-header" style="border-bottom:none;padding-bottom:0">📈 ESTADÍSTICAS</div>
            <div class="diagnostic-stat-row">
              <span class="diagnostic-stat-label">Mensajes Sesión</span>
              <span class="diagnostic-stat-val" id="diag-msg-count">${this._sessionMsgCount}</span>
            </div>
            <div class="diagnostic-stat-row">
              <span class="diagnostic-stat-label">Latencia</span>
              <span class="diagnostic-stat-val" id="diag-latency">0ms</span>
            </div>
            <div class="diagnostic-stat-row">
              <span class="diagnostic-stat-label">XP Acumulada</span>
              <span class="diagnostic-stat-val">${gam.xp} XP</span>
            </div>
            <div class="diagnostic-stat-row">
              <span class="diagnostic-stat-label">Correcciones</span>
              <span class="diagnostic-stat-val" id="diag-corrections-count">0</span>
            </div>
          </div>
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

    // Handle topic chips
    $$('.chat-topic-chip', container).forEach(chip => {
      chip.addEventListener('click', () => {
        $$('.chat-topic-chip', container).forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this._currentTopic = chip.dataset.topicId;
        
        // Refresh suggestions and log terminal
        const suggs = this._getSuggestions();
        const suggsEl = document.getElementById('chat-suggestions');
        if (suggsEl) {
          suggsEl.innerHTML = suggs.map(s => `<button class="suggestion-chip">${s}</button>`).join('');
          $$('.suggestion-chip', suggsEl).forEach(sChip => {
            sChip.addEventListener('click', () => {
              chatInput.value = sChip.textContent;
              sendMessage();
            });
          });
        }
        
        this._logTerminal(`TOPIC CHANGED TO: ${this._currentTopic.toUpperCase()}`);
        this._logTerminal(`SUGGESTIONS REFRESHED.`);
        
        // Robot reacts with a prompt response
        const starterPrompts = {
          general: "Tell me something new! What's on your mind?",
          food: "I love talking about food! What is your favorite dish?",
          travel: "If you could fly anywhere today, where would you go?",
          work: "What kind of job do you have, or what do you study?",
          hobbies: "What do you like to do in your free time?",
          weather: "How is the weather where you live right now?",
          technology: "What app or device do you use the most?",
          grammar: "Do you have any questions about English grammar?"
        };
        
        const botMsg = starterPrompts[this._currentTopic] || "What would you like to talk about?";
        messagesEl.insertAdjacentHTML('beforeend', this._renderMessage('bot', botMsg));
        Storage.addChatMessage('bot', botMsg);
        messagesEl.scrollTop = messagesEl.scrollHeight;
      });
    });

    // Wire suggestions
    $$('.suggestion-chip', container).forEach(chip => {
      chip.addEventListener('click', () => {
        chatInput.value = chip.textContent;
        sendMessage();
      });
    });

    document.getElementById('clear-chat-btn').addEventListener('click', () => {
      Storage.clearChatHistory();
      this._sessionMsgCount = 0;
      this.render(container);
    });

    // Scroll to bottom
    messagesEl.scrollTop = messagesEl.scrollHeight;
  },

  _logTerminal(text) {
    const screen = document.getElementById('diagnostic-screen');
    if (screen) {
      screen.innerHTML += `<br>&gt; ${text}`;
      screen.scrollTop = screen.scrollHeight;
    }
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
            ${isBot ? `<button class="btn btn-ghost btn-sm btn-icon" style="margin-left:0.5rem;padding:4px;opacity:0.6;vertical-align:middle" onclick="Speech.speak('${text.replace(/'/g, "\\'").replace(/"/g, '\\"').substring(0,200)}')">🔊</button>` : ''}
          </div>
          ${correction ? `<div class="msg-correction">⚠️ ${correction}</div>` : ''}
          <div class="msg-time">${time}</div>
        </div>
      </div>`;
  },

  _handleSend(userText, messagesEl, container) {
    this._logTerminal(`INPUT: "${truncate(userText, 25)}"`);
    this._logTerminal(`COMPLEXITY: ${userText.split(' ').length} WORDS`);
    
    // CPU Spike animation
    const cpuBar = document.getElementById('diag-cpu-bar');
    const cpuVal = document.getElementById('diag-cpu-val');
    if (cpuBar && cpuVal) {
      cpuBar.style.width = '85%';
      cpuBar.style.backgroundColor = 'var(--color-danger)';
      cpuVal.textContent = '85%';
    }

    const start = performance.now();
    const grammarCheck = this.checkGrammar(userText);
    const correction = grammarCheck.hasError ? `Corrección: ${grammarCheck.rule}` : null;

    if (grammarCheck.hasError) {
      this._logTerminal(`GRAMMAR STACK: ERROR FOUND`);
      const corrCountEl = document.getElementById('diag-corrections-count');
      if (corrCountEl) {
        corrCountEl.textContent = parseInt(corrCountEl.textContent) + 1;
      }
    } else {
      this._logTerminal(`GRAMMAR STACK: OK`);
    }

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

      // Update CPU back to normal
      if (cpuBar && cpuVal) {
        const normCpu = Math.floor(10 + Math.random() * 15);
        cpuBar.style.width = `${normCpu}%`;
        cpuBar.style.backgroundColor = 'var(--color-primary)';
        cpuVal.textContent = `${normCpu}%`;
      }

      // Latency calculation
      const end = performance.now();
      const latencyVal = document.getElementById('diag-latency');
      if (latencyVal) {
        latencyVal.textContent = `${Math.round(end - start + delay)}ms`;
      }

      this._logTerminal(`RESPONSE COMPILED OK.`);

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
      const countEl = document.getElementById('diag-msg-count');
      if (countEl) countEl.textContent = this._sessionMsgCount;

      Gamification.check();
      Gamification.addXP(5, 'chat');

    }, delay);
  },
};

// Dictionary Page
const DictionaryPage = {
  render(container) {
    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">🔍 Diccionario de Aprendizaje</h1>
        <p class="page-subtitle">Busca palabras, aprende su pronunciación y añádelas a tu mazo de repaso</p>
      </div>

      <div class="card card-glass mb-xl animate-fade-in" style="max-width:650px;margin:0 auto 2.5rem;padding:1.5rem;border-color:var(--color-primary-glow)">
        <div style="display:flex;gap:0.75rem;align-items:center">
          <div style="position:relative;flex:1">
            <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:1.1rem;opacity:0.6">🔍</span>
            <input class="input-field" type="text" id="dict-input" placeholder="Escribe una palabra en inglés o español..." style="padding-left:40px" />
          </div>
          <button class="btn btn-primary" id="dict-search-btn" style="padding:12px 24px">Buscar</button>
        </div>
      </div>

      <div id="dict-results"></div>

      <div id="dict-suggestions" class="animate-slide-up" style="animation-delay:0.1s">
        <h3 style="font-family:var(--font-heading);font-weight:900;margin-bottom:1.2rem;display:flex;align-items:center;gap:0.5rem">
          <span>💡 Palabras sugeridas para hoy</span>
        </h3>
        <div class="grid-3">
          ${getRandomWords(3).map(w => `
            <div class="card card-hover card-glass" style="cursor:pointer;border-left:4px solid ${levelColor(w.level)}" data-dict-word="${w.word}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start">
                <div style="font-family:var(--font-heading);font-size:1.2rem;font-weight:800;color:var(--text-primary)">${w.word}</div>
                <span class="level-pill level-${w.level}" style="font-size:0.65rem;padding:2px 6px">${w.level}</span>
              </div>
              <div style="font-size:0.8rem;color:var(--text-muted);font-style:italic;margin-top:2px">${w.phonetic}</div>
              <div style="color:var(--color-primary);font-weight:700;margin-top:0.75rem;font-size:0.95rem">${w.translation}</div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:8px">${TOPIC_LABELS[w.topic] || w.topic}</div>
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
        <div class="empty-state card card-glass animate-scale-in" style="max-width:500px;margin:0 auto;padding:3rem">
          <div class="empty-state-icon" style="font-size:3rem">🔍</div>
          <p style="font-size:1.1rem;font-weight:700;margin-top:1rem">No se encontraron resultados para "<strong>${query}</strong>"</p>
          <p class="text-muted mt-sm" style="font-size:0.875rem">Prueba con otra palabra o verifica la ortografía.</p>
        </div>`;
      return;
    }

    resultsEl.innerHTML = results.map(w => `
      <div class="card card-glass mb-lg animate-slide-up" style="border-left: 5px solid ${levelColor(w.level)}; padding: 1.5rem 2rem; position: relative">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1.5rem;flex-wrap:wrap">
          <div>
            <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap">
              <span style="font-family:var(--font-heading);font-size:2rem;font-weight:900;color:var(--text-primary);letter-spacing:-0.5px">${w.word}</span>
              <span class="level-pill level-${w.level}">${w.level}</span>
            </div>
            <div style="font-size:0.95rem;color:var(--text-muted);font-style:italic;margin-top:2px">${w.phonetic}</div>
            <div style="font-size:1.2rem;font-weight:700;color:var(--color-primary);margin-top:0.75rem">${w.translation}</div>
            <div style="font-size:0.8125rem;color:var(--text-muted);margin-top:4px">Categoría: <strong>${TOPIC_LABELS[w.topic] || w.topic}</strong></div>
          </div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;align-items:flex-end">
            <button class="btn btn-primary btn-sm" onclick="Speech.speak('${w.word.replace(/'/g, "\\'")}')" style="box-shadow:none">🔊 Escuchar</button>
          </div>
        </div>

        <div style="margin-top:1.5rem;background:var(--bg-base);padding:1rem 1.25rem;border-radius:var(--radius-md);border:1px solid var(--border-color)">
          <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);font-weight:800;margin-bottom:0.5rem">Ejemplo en Contexto</div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem">
            <span style="font-size:1rem;color:var(--text-primary);line-height:1.5">"${w.example}"</span>
            <button class="btn btn-ghost btn-sm btn-icon" onclick="Speech.speak('${w.example.replace(/'/g,"\\'")}')">🔊</button>
          </div>
          <div style="margin-top:0.5rem;color:var(--color-accent);font-size:0.9rem;border-top:1px dashed var(--border-color);padding-top:0.5rem">
            🇪🇸 ${w.exampleEs}
          </div>
        </div>

        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1.5rem;border-top:1px solid var(--border-color);padding-top:1.25rem">
          <button class="btn btn-accent btn-sm" onclick="Storage.logWordLearned('${w.id}');showToast('✅','Marcada','${w.word} añadida a tu vocabulario')">✅ Marcar como Aprendida</button>
          <button class="btn btn-outline btn-sm" onclick="SpacedRep.initWord('${w.id}');showToast('🎴','Repaso','${w.word} añadida al repaso espaciado')">🎴 Añadir a Repaso Diario</button>
        </div>
      </div>`).join('');
  },
};
