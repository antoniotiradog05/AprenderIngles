// ============================================================
// EnglishMaster — data/grammar.js
// Complete grammar rules database (all tenses, conditionals, etc.)
// ============================================================

const GRAMMAR_DATA = {

  // ======================================
  // PRESENT TENSES
  // ======================================
  present_simple: {
    id: 'present_simple',
    title: 'Present Simple',
    titleEs: 'Presente Simple',
    level: 'A1',
    category: 'tenses',
    emoji: '📅',
    description: 'El presente simple se usa para hablar de hábitos, rutinas, hechos generales y verdades universales.',
    structure: [
      { form: 'Affirmative', formula: 'Subject + verb (+ -s/-es for he/she/it)', example: 'She works every day.' },
      { form: 'Negative', formula: "Subject + don't/doesn't + verb", example: "He doesn't like coffee." },
      { form: 'Question', formula: 'Do/Does + subject + verb?', example: 'Do you speak English?' },
    ],
    uses: [
      { desc: 'Hábitos y rutinas', example: 'I brush my teeth twice a day.', exampleEs: 'Me cepillo los dientes dos veces al día.' },
      { desc: 'Verdades universales', example: 'The Earth revolves around the Sun.', exampleEs: 'La Tierra gira alrededor del Sol.' },
      { desc: 'Hechos permanentes', example: 'She lives in Madrid.', exampleEs: 'Ella vive en Madrid.' },
      { desc: 'Instrucciones / reglas', example: 'You turn left at the traffic lights.', exampleEs: 'Giras a la izquierda en el semáforo.' },
    ],
    signals: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'every day/week/year', 'on Mondays'],
    tips: ['Añade -s/-es a verbos en 3ª persona del singular (he/she/it): work → works, watch → watches', 'Los verbos go, do, have son irregulares: goes, does, has'],
    commonErrors: [
      { wrong: 'She work in a hospital.', right: 'She works in a hospital.', rule: 'Recuerda añadir -s con he/she/it.' },
      { wrong: 'He don\'t like pizza.', right: "He doesn't like pizza.", rule: 'Con he/she/it usa "doesn\'t" en negativa.' },
    ]
  },

  present_continuous: {
    id: 'present_continuous',
    title: 'Present Continuous',
    titleEs: 'Presente Continuo',
    level: 'A1',
    category: 'tenses',
    emoji: '🔄',
    description: 'El presente continuo describe acciones que ocurren ahora mismo o en este período de tiempo.',
    structure: [
      { form: 'Affirmative', formula: 'Subject + am/is/are + verb-ing', example: 'They are watching TV.' },
      { form: 'Negative', formula: "Subject + am/is/are + not + verb-ing", example: "I'm not working right now." },
      { form: 'Question', formula: 'Am/Is/Are + subject + verb-ing?', example: 'Are you listening to me?' },
    ],
    uses: [
      { desc: 'Acción en este momento', example: 'She is reading a book.', exampleEs: 'Ella está leyendo un libro.' },
      { desc: 'Tendencias actuales', example: 'More people are working from home.', exampleEs: 'Más personas trabajan desde casa.' },
      { desc: 'Planes futuros confirmados', example: "I'm meeting John tomorrow.", exampleEs: 'Mañana quedo con John.' },
    ],
    signals: ['now', 'right now', 'at the moment', 'currently', 'today', 'this week', 'look!', 'listen!'],
    tips: ['Stative verbs (like, know, want, love) NO se usan normalmente en continuo.', 'Reglas de spelling: run → running, make → making, sit → sitting'],
    commonErrors: [
      { wrong: 'I am knowing the answer.', right: 'I know the answer.', rule: '"Know" es un stative verb. No se usa en continuo.' },
      { wrong: 'She is study English.', right: 'She is studying English.', rule: 'Recuerda añadir -ing al verbo.' },
    ]
  },

  present_perfect: {
    id: 'present_perfect',
    title: 'Present Perfect',
    titleEs: 'Presente Perfecto',
    level: 'B1',
    category: 'tenses',
    emoji: '✅',
    description: 'El presente perfecto conecta el pasado con el presente. Se usa para experiencias, resultados y acciones recientes.',
    structure: [
      { form: 'Affirmative', formula: 'Subject + have/has + past participle', example: "I've visited Paris three times." },
      { form: 'Negative', formula: "Subject + haven't/hasn't + past participle", example: "She hasn't finished yet." },
      { form: 'Question', formula: 'Have/Has + subject + past participle?', example: 'Have you ever tried sushi?' },
    ],
    uses: [
      { desc: 'Experiencias de vida', example: 'I have never been to Japan.', exampleEs: 'Nunca he estado en Japón.' },
      { desc: 'Resultado actual', example: 'She has lost her keys (= and cannot open the door now).', exampleEs: 'Ha perdido sus llaves (= y ahora no puede abrir la puerta).' },
      { desc: 'Acción reciente con relevancia presente', example: 'I have just arrived.', exampleEs: 'Acabo de llegar.' },
      { desc: 'Con for / since', example: "He's lived here for 10 years / since 2014.", exampleEs: 'Ha vivido aquí durante 10 años / desde 2014.' },
    ],
    signals: ['ever', 'never', 'already', 'yet', 'just', 'recently', 'lately', 'for', 'since', 'so far', 'up to now'],
    tips: ['FOR + periodo de tiempo: for two years, for a long time', 'SINCE + punto en el tiempo: since Monday, since 2010', 'Yet: en negativas y preguntas. Already: en afirmativas.'],
    commonErrors: [
      { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', rule: 'Con expresiones de tiempo pasado concreto (yesterday, last week), usa Past Simple.' },
      { wrong: 'She has never went abroad.', right: 'She has never been abroad.', rule: '"Gone" se usa cuando alguien fue y no ha vuelto; "been" indica haber visitado.' },
    ]
  },

  // ======================================
  // PAST TENSES
  // ======================================
  past_simple: {
    id: 'past_simple',
    title: 'Past Simple',
    titleEs: 'Pasado Simple',
    level: 'A2',
    category: 'tenses',
    emoji: '⏮️',
    description: 'El pasado simple describe acciones completadas en un momento específico del pasado.',
    structure: [
      { form: 'Affirmative (regular)', formula: 'Subject + verb + -ed', example: 'She worked yesterday.' },
      { form: 'Affirmative (irregular)', formula: 'Subject + irregular form', example: 'I went to the store.' },
      { form: 'Negative', formula: "Subject + didn't + infinitive", example: "He didn't come to school." },
      { form: 'Question', formula: 'Did + subject + infinitive?', example: 'Did they win the match?' },
    ],
    uses: [
      { desc: 'Acción completada en el pasado', example: 'She graduated in 2020.', exampleEs: 'Ella se graduó en 2020.' },
      { desc: 'Serie de acciones pasadas', example: 'He woke up, showered and left.', exampleEs: 'Se despertó, se duchó y se fue.' },
    ],
    signals: ['yesterday', 'last week/month/year', 'ago', 'in 2010', 'when I was young', 'then', 'after that'],
    tips: ['Verbos irregulares más comunes: go→went, have→had, be→was/were, see→saw, come→came, take→took, give→gave, make→made'],
    commonErrors: [
      { wrong: 'She didn\'t went to school.', right: "She didn't go to school.", rule: 'Después de "didn\'t" usa el infinitivo, no el pasado.' },
      { wrong: 'I am born in Spain.', right: 'I was born in Spain.', rule: '"Born" usa el pasado del verbo to be.' },
    ]
  },

  past_continuous: {
    id: 'past_continuous',
    title: 'Past Continuous',
    titleEs: 'Pasado Continuo',
    level: 'B1',
    category: 'tenses',
    emoji: '🎞️',
    description: 'El pasado continuo describe una acción en progreso en un momento específico del pasado, o que fue interrumpida.',
    structure: [
      { form: 'Affirmative', formula: 'Subject + was/were + verb-ing', example: 'I was sleeping at 10 pm.' },
      { form: 'Negative', formula: "Subject + was/were + not + verb-ing", example: "They weren't watching TV." },
      { form: 'Question', formula: 'Was/Were + subject + verb-ing?', example: 'Was she studying when you called?' },
    ],
    uses: [
      { desc: 'Acción en progreso interrumpida por otra', example: 'I was cooking when the phone rang.', exampleEs: 'Estaba cocinando cuando sonó el teléfono.' },
      { desc: 'Dos acciones simultáneas en el pasado', example: 'While she was reading, he was watching TV.', exampleEs: 'Mientras ella leía, él veía la televisión.' },
    ],
    signals: ['while', 'when', 'at that moment', 'at 8 o\'clock yesterday', 'all morning'],
    tips: ['Combina con Past Simple: "was/were + -ing" (acción larga) + "did" (acción corta).'],
    commonErrors: []
  },

  past_perfect: {
    id: 'past_perfect',
    title: 'Past Perfect',
    titleEs: 'Pasado Perfecto (Pluscuamperfecto)',
    level: 'B1',
    category: 'tenses',
    emoji: '⏭️',
    description: 'El past perfect indica que una acción ocurrió ANTES que otra acción pasada.',
    structure: [
      { form: 'Affirmative', formula: 'Subject + had + past participle', example: 'She had already left when I arrived.' },
      { form: 'Negative', formula: "Subject + hadn't + past participle", example: "He hadn't eaten before the meeting." },
      { form: 'Question', formula: 'Had + subject + past participle?', example: 'Had they finished before you came?' },
    ],
    uses: [
      { desc: 'Acción anterior a otra acción pasada', example: 'When I got home, the party had already ended.', exampleEs: 'Cuando llegué a casa, la fiesta ya había terminado.' },
    ],
    signals: ['already', 'before', 'after', 'when', 'by the time', 'never ... before'],
    tips: ['Piénsalo como el "pasado del pasado": la acción más antigua en la narración.'],
    commonErrors: []
  },

  // ======================================
  // FUTURE TENSES
  // ======================================
  future_will: {
    id: 'future_will',
    title: 'Future with WILL',
    titleEs: 'Futuro con WILL',
    level: 'A2',
    category: 'tenses',
    emoji: '🔮',
    description: 'Se usa "will" para predicciones, decisiones espontáneas, promesas y ofrecimientos.',
    structure: [
      { form: 'Affirmative', formula: "Subject + will + infinitive", example: "She'll call you tomorrow." },
      { form: 'Negative', formula: "Subject + won't + infinitive", example: "I won't be late." },
      { form: 'Question', formula: 'Will + subject + infinitive?', example: 'Will you help me?' },
    ],
    uses: [
      { desc: 'Decisión espontánea', example: "I'll answer the phone!", exampleEs: '¡Yo cojo el teléfono!' },
      { desc: 'Predicción sin evidencia', example: 'I think it will rain.', exampleEs: 'Creo que lloverá.' },
      { desc: 'Promesas / ofrecimientos', example: "I'll help you with that.", exampleEs: 'Te ayudaré con eso.' },
    ],
    signals: ['tomorrow', 'next week/year', 'in the future', 'I think...', 'I believe...', 'probably', 'I promise'],
    tips: [],
    commonErrors: [
      { wrong: "I will to go.", right: "I will go.", rule: 'Después de "will" usa el infinitivo SIN "to".' }
    ]
  },

  going_to: {
    id: 'going_to',
    title: 'Future with GOING TO',
    titleEs: 'Futuro con GOING TO',
    level: 'A2',
    category: 'tenses',
    emoji: '📋',
    description: '"Going to" se usa para planes ya decididos y predicciones con evidencia presente.',
    structure: [
      { form: 'Affirmative', formula: "Subject + am/is/are + going to + infinitive", example: "We're going to visit Paris next month." },
      { form: 'Negative', formula: "Subject + am/is/are + not + going to + infinitive", example: "She's not going to come." },
      { form: 'Question', formula: 'Am/Is/Are + subject + going to + infinitive?', example: 'Are you going to study tonight?' },
    ],
    uses: [
      { desc: 'Plan o intención previos', example: "I'm going to start a diet next Monday.", exampleEs: 'Voy a empezar una dieta el próximo lunes.' },
      { desc: 'Predicción con evidencia', example: 'Look at those clouds — it\'s going to rain.', exampleEs: 'Mira esas nubes — va a llover.' },
    ],
    signals: ['tonight', 'next week', 'soon', 'already decided', 'I can see that...'],
    tips: ['Diferencia clave: WILL = decisión en el momento / GOING TO = plan previo o evidencia.'],
    commonErrors: []
  },

  // ======================================
  // CONDITIONALS
  // ======================================
  conditional_zero: {
    id: 'conditional_zero',
    title: 'Zero Conditional',
    titleEs: 'Condicional Cero',
    level: 'A2',
    category: 'conditionals',
    emoji: '0️⃣',
    description: 'Se usa para verdades generales y hechos científicos o siempre ciertos.',
    structure: [
      { form: 'Structure', formula: 'If + Present Simple, + Present Simple', example: 'If you heat water to 100°C, it boils.' },
    ],
    uses: [
      { desc: 'Verdades científicas', example: 'If you mix blue and yellow, you get green.', exampleEs: 'Si mezclas azul y amarillo, obtienes verde.' },
      { desc: 'Hechos generales', example: 'If it rains, the streets get wet.', exampleEs: 'Si llueve, las calles se mojan.' },
    ],
    signals: ['if', 'when (in general)'],
    tips: ['Puedes usar "when" en lugar de "if": When water reaches 100°C, it boils.'],
    commonErrors: []
  },

  conditional_first: {
    id: 'conditional_first',
    title: 'First Conditional',
    titleEs: 'Primer Condicional',
    level: 'A2',
    category: 'conditionals',
    emoji: '1️⃣',
    description: 'Situaciones reales o probables en el futuro.',
    structure: [
      { form: 'Structure', formula: 'If + Present Simple, + will + infinitive', example: "If it rains, we'll stay home." },
    ],
    uses: [
      { desc: 'Situación futura probable', example: "If you study hard, you'll pass the exam.", exampleEs: 'Si estudias mucho, aprobarás el examen.' },
      { desc: 'Advertencia / consecuencia', example: "If you touch that, you'll get burned.", exampleEs: 'Si tocas eso, te quemarás.' },
    ],
    signals: ['if...will', 'as long as', 'provided that', 'unless'],
    tips: ['UNLESS = if not: "Unless you hurry, we\'ll be late" = "If you don\'t hurry, we\'ll be late."'],
    commonErrors: [
      { wrong: "If it will rain, we'll stay home.", right: "If it rains, we'll stay home.", rule: 'En la cláusula "if", usa presente, nunca "will".' }
    ]
  },

  conditional_second: {
    id: 'conditional_second',
    title: 'Second Conditional',
    titleEs: 'Segundo Condicional',
    level: 'B1',
    category: 'conditionals',
    emoji: '2️⃣',
    description: 'Situaciones imaginarias, hipotéticas o contrarias a la realidad presente.',
    structure: [
      { form: 'Structure', formula: 'If + Past Simple, + would + infinitive', example: "If I won the lottery, I'd travel the world." },
    ],
    uses: [
      { desc: 'Situación hipotética', example: "If I were you, I'd apologize.", exampleEs: 'Si fuera tú, me disculparía.' },
      { desc: 'Sueños / deseos', example: "If she spoke Spanish, she'd get the job.", exampleEs: 'Si ella hablara español, conseguiría el trabajo.' },
    ],
    signals: ['if I were...', 'would', 'imagine if...', 'what if...'],
    tips: ['Usa "were" (no "was") con todas las personas en el 2nd conditional formal: "If I were rich..."'],
    commonErrors: [
      { wrong: "If I would have money, I'd travel.", right: "If I had money, I'd travel.", rule: 'No uses "would" en la cláusula "if".' }
    ]
  },

  conditional_third: {
    id: 'conditional_third',
    title: 'Third Conditional',
    titleEs: 'Tercer Condicional',
    level: 'B2',
    category: 'conditionals',
    emoji: '3️⃣',
    description: 'Situaciones hipotéticas en el pasado (algo que no ocurrió pero podría haber ocurrido).',
    structure: [
      { form: 'Structure', formula: 'If + Past Perfect, + would have + past participle', example: "If I had studied, I would have passed." },
    ],
    uses: [
      { desc: 'Lamento / especulación sobre el pasado', example: "If she had left earlier, she wouldn't have missed the flight.", exampleEs: 'Si hubiera salido antes, no habría perdido el vuelo.' },
    ],
    signals: ['if...had + PP', 'would have', 'might have', 'could have'],
    tips: ['Contracción habitual: "I\'d have gone" = "I would have gone"', 'Mixed conditional: condición en 3rd + resultado en 2nd (o viceversa).'],
    commonErrors: [
      { wrong: "If I would have known, I'd have helped.", right: "If I had known, I would have helped.", rule: 'En la cláusula "if" usa Past Perfect, no "would have".' }
    ]
  },

  // ======================================
  // PASSIVE VOICE
  // ======================================
  passive_voice: {
    id: 'passive_voice',
    title: 'Passive Voice',
    titleEs: 'Voz Pasiva',
    level: 'B1',
    category: 'grammar',
    emoji: '🔁',
    description: 'La voz pasiva pone énfasis en la acción o en el objeto de la acción, no en quien la realiza.',
    structure: [
      { form: 'Present Simple Passive', formula: 'am/is/are + past participle', example: 'English is spoken all over the world.' },
      { form: 'Past Simple Passive', formula: 'was/were + past participle', example: 'The novel was written by Hemingway.' },
      { form: 'Future Passive', formula: 'will be + past participle', example: 'The results will be announced tomorrow.' },
      { form: 'Present Perfect Passive', formula: 'have/has been + past participle', example: "The contract has been signed." },
    ],
    uses: [
      { desc: 'Énfasis en la acción (no en el agente)', example: 'The window was broken.', exampleEs: 'La ventana fue rota.' },
      { desc: 'El agente es desconocido', example: "My bike was stolen.", exampleEs: 'Mi bicicleta fue robada.' },
      { desc: 'Textos formales / científicos', example: 'The experiment was conducted in 2020.', exampleEs: 'El experimento fue llevado a cabo en 2020.' },
    ],
    signals: ['by', 'is/are made', 'was/were built', 'has been done'],
    tips: ['Para indicar el agente (quien hace la acción), usa "by": The letter was written by Mary.'],
    commonErrors: []
  },

  // ======================================
  // MODALS
  // ======================================
  modal_verbs: {
    id: 'modal_verbs',
    title: 'Modal Verbs',
    titleEs: 'Verbos Modales',
    level: 'A2',
    category: 'grammar',
    emoji: '🎛️',
    description: 'Los verbos modales expresan posibilidad, necesidad, habilidad, permiso y obligación.',
    structure: [
      { form: 'Structure', formula: 'Subject + modal + infinitive (without to)', example: 'You must study hard.' },
    ],
    uses: [
      { desc: 'CAN — habilidad / posibilidad', example: 'She can speak three languages.', exampleEs: 'Ella puede hablar tres idiomas.' },
      { desc: 'COULD — posibilidad pasada / petición cortés', example: "Could you help me, please?", exampleEs: '¿Podría ayudarme, por favor?' },
      { desc: 'MUST — obligación fuerte', example: 'You must wear a seatbelt.', exampleEs: 'Debes llevar el cinturón.' },
      { desc: "HAVE TO — obligación externa", example: 'I have to work on Saturdays.', exampleEs: 'Tengo que trabajar los sábados.' },
      { desc: 'SHOULD — consejo', example: 'You should see a doctor.', exampleEs: 'Deberías ir al médico.' },
      { desc: 'MIGHT / MAY — posibilidad', example: 'It might rain tonight.', exampleEs: 'Podría llover esta noche.' },
      { desc: "WOULD — condicional / petición cortés", example: "Would you like some tea?", exampleEs: '¿Te gustaría tomar té?' },
      { desc: "NEED TO — necesidad", example: "I need to finish this report.", exampleEs: 'Necesito terminar este informe.' },
    ],
    tips: [
      'Los modales NO llevan -s en 3ª persona: She can (NOT she cans)',
      'Después de un modal siempre va el infinitivo sin to (excepto "ought to", "have to", "need to")',
      'MUST NOT (prohibición) ≠ DON\'T HAVE TO (no es necesario)'
    ],
    commonErrors: [
      { wrong: 'She can to swim.', right: 'She can swim.', rule: 'Tras un modal, el verbo va sin "to".' },
      { wrong: 'You must to leave now.', right: 'You must leave now.', rule: '"Must" no lleva "to".' }
    ]
  },

  // ======================================
  // ARTICLES
  // ======================================
  articles: {
    id: 'articles',
    title: 'Articles (a, an, the)',
    titleEs: 'Artículos (a, an, the)',
    level: 'A1',
    category: 'grammar',
    emoji: '📝',
    description: 'Los artículos determinan si un sustantivo es específico (the) o general (a/an).',
    structure: [
      { form: 'A (indefinite)', formula: 'A + consonant sound', example: 'a dog, a university (sounds like "you")' },
      { form: 'AN (indefinite)', formula: 'AN + vowel sound', example: 'an apple, an hour (silent "h")' },
      { form: 'THE (definite)', formula: 'THE + any noun', example: 'the car I bought, the Moon' },
    ],
    uses: [
      { desc: 'A/AN: primera mención', example: 'I saw a dog.', exampleEs: 'Vi un perro.' },
      { desc: 'THE: mención posterior (ya conocido)', example: 'The dog was black.', exampleEs: 'El perro era negro.' },
      { desc: 'THE: único en su tipo', example: 'The sun rises in the east.', exampleEs: 'El sol sale por el este.' },
      { desc: 'Sin artículo (zero article)', example: 'Life is beautiful. I love music.', exampleEs: 'La vida es hermosa. Me encanta la música.' },
    ],
    tips: [
      'No uses artículo con: nombres propios, países (excepto "the UK, the USA"), deportes, asignaturas',
      'Usa THE con: océanos, ríos, montañas (grupos), periódicos, instrumentos musicales'
    ],
    commonErrors: [
      { wrong: 'She is the best student in a class.', right: 'She is the best student in the class.', rule: 'Usa "the" cuando ya se sabe a qué clase nos referimos.' }
    ]
  },

  // ======================================
  // REPORTED SPEECH
  // ======================================
  reported_speech: {
    id: 'reported_speech',
    title: 'Reported Speech',
    titleEs: 'Estilo Indirecto',
    level: 'B1',
    category: 'grammar',
    emoji: '💬',
    description: 'El estilo indirecto reporta lo que alguien dijo, pensó o preguntó (sin comillas).',
    structure: [
      { form: 'Statements', formula: 'said (that) + backshifted tense', example: '"I am tired." → He said he was tired.' },
      { form: 'Questions', formula: 'asked + if/whether / question word + subject + verb', example: '"Are you ready?" → She asked if I was ready.' },
      { form: 'Commands', formula: 'told/asked + object + to + infinitive', example: '"Close the door." → He told me to close the door.' },
    ],
    uses: [
      { desc: 'Backshift: Present Simple → Past Simple', example: '"I work here." → He said he worked there.', exampleEs: '' },
      { desc: 'Backshift: Past Simple → Past Perfect', example: '"I went." → She said she had gone.', exampleEs: '' },
      { desc: 'Backshift: will → would', example: '"I will help." → He said he would help.', exampleEs: '' },
    ],
    tips: ['También cambian: now→then, today→that day, here→there, tomorrow→the next day, yesterday→the day before'],
    commonErrors: [
      { wrong: 'She said me she was tired.', right: 'She told me she was tired.', rule: '"Say" no lleva objeto de persona. "Tell" sí: tell me, tell him.' }
    ]
  },

  // ======================================
  // RELATIVE CLAUSES
  // ======================================
  relative_clauses: {
    id: 'relative_clauses',
    title: 'Relative Clauses',
    titleEs: 'Oraciones de Relativo',
    level: 'B1',
    category: 'grammar',
    emoji: '🔗',
    description: 'Las oraciones de relativo añaden información sobre una persona, lugar o cosa.',
    structure: [
      { form: 'Defining (no comma)', formula: 'who/which/that + clause', example: 'The woman who called is my sister.' },
      { form: 'Non-defining (with comma)', formula: ', who/which, + clause', example: 'My sister, who lives in London, is a doctor.' },
    ],
    uses: [
      { desc: 'WHO — para personas', example: 'The man who fixed my car was very helpful.', exampleEs: 'El hombre que arregló mi coche fue muy útil.' },
      { desc: 'WHICH — para cosas', example: 'The book which I bought is excellent.', exampleEs: 'El libro que compré es excelente.' },
      { desc: 'WHOSE — posesión', example: 'The student whose essay won is from Spain.', exampleEs: 'El estudiante cuyo ensayo ganó es de España.' },
      { desc: 'WHERE — para lugares', example: 'The restaurant where we met is closed now.', exampleEs: 'El restaurante donde nos conocimos está cerrado.' },
    ],
    tips: ['En oraciones de relativo definitorias, puedes omitir "that/which/who" si es el objeto: "The book (that) I read..."'],
    commonErrors: []
  },

  // ======================================
  // WISH & IF ONLY
  // ======================================
  wish_if_only: {
    id: 'wish_if_only',
    title: 'Wish & If Only',
    titleEs: 'Deseos y Regretos (Wish / If Only)',
    level: 'B2',
    category: 'grammar',
    emoji: '💭',
    description: 'Se usan "wish" e "if only" para expresar deseos de cambio o arrepentimientos sobre situaciones presentes, futuras o pasadas.',
    structure: [
      { form: 'Present/Future Desire', formula: 'wish/if only + Past Simple/Continuous', example: 'I wish I had more free time.' },
      { form: 'Past Regret', formula: 'wish/if only + Past Perfect', example: 'I wish I hadn\'t eaten so much cake.' },
      { form: 'Annoyance / Desired Action', formula: 'wish/if only + would + infinitive', example: 'I wish it would stop raining.' },
    ],
    uses: [
      { desc: 'Deseo en el presente (imposible o poco probable)', example: 'If only I spoke French.', exampleEs: 'Ojalá hablara francés.' },
      { desc: 'Lamento sobre el pasado', example: 'I wish I had studied harder for the exam.', exampleEs: 'Ojalá hubiera estudiado más para el examen.' },
      { desc: 'Queja sobre un comportamiento molesto', example: 'I wish you wouldn\'t interrupt me.', exampleEs: 'Ojalá no me interrumpieras.' },
    ],
    tips: ['"If only" es más enfático y dramático que "wish".', 'Como en el segundo condicional, se prefiere "were" a "was" con todas las personas: "I wish I were taller."'],
    commonErrors: [
      { wrong: 'I wish I will pass the exam tomorrow.', right: 'I hope I pass the exam tomorrow.', rule: 'Usa "hope" para cosas posibles en el futuro y "wish" para deseos imposibles o hipotéticos.' }
    ]
  },

  // ======================================
  // MIXED CONDITIONALS
  // ======================================
  mixed_conditionals: {
    id: 'mixed_conditionals',
    title: 'Mixed Conditionals',
    titleEs: 'Condicionales Mixtos',
    level: 'B2',
    category: 'conditionals',
    emoji: '🔀',
    description: 'Los condicionales mixtos combinan elementos del segundo y tercer condicional cuando el tiempo de la condición difiere del tiempo del resultado.',
    structure: [
      { form: 'Past Condition → Present Result', formula: 'If + Past Perfect, + would + infinitive', example: 'If I had won the lottery, I would be rich now.' },
      { form: 'Present Condition → Past Result', formula: 'If + Past Simple, + would have + past participle', example: 'If I were taller, I would have made the basketball team.' },
    ],
    uses: [
      { desc: 'Condición pasada con efecto en el presente', example: 'If I had taken that job, I would live in London today.', exampleEs: 'Si hubiera aceptado ese trabajo, hoy viviría en Londres.' },
      { desc: 'Condición general/presente con efecto pasado', example: 'If they were smart, they wouldn\'t have bought that house.', exampleEs: 'Si fueran listos, no habrían comprado esa casa.' },
    ],
    tips: ['Identifica bien los marcadores temporales como "now", "today" o "yesterday" para saber qué parte va en pasado y cuál en presente.'],
    commonErrors: [
      { wrong: 'If I would have studied, I would be a doctor now.', right: 'If I had studied, I would be a doctor now.', rule: 'Nunca uses "would" en la cláusula del "If".' }
    ]
  },

  // ======================================
  // ADVANCED INVERSION
  // ======================================
  inversion: {
    id: 'inversion',
    title: 'Inversion',
    titleEs: 'Inversión Gramatical',
    level: 'C1',
    category: 'grammar',
    emoji: '🔄',
    description: 'La inversión cambia el orden del sujeto y el verbo auxiliar, usualmente después de adverbios negativos o restrictivos, para dar énfasis y formalidad.',
    structure: [
      { form: 'Structure', formula: 'Negative Adverbial + Auxiliary Verb + Subject + Main Verb', example: 'Seldom have I seen such a beautiful place.' },
    ],
    uses: [
      { desc: 'Después de adverbios negativos/restrictivos', example: 'Hardly had I arrived when the phone rang.', exampleEs: 'Apenas había llegado cuando sonó el teléfono.' },
      { desc: 'Bajo ninguna circunstancia', example: 'Under no circumstances should you open this door.', exampleEs: 'Bajo ninguna circunstancia debes abrir esta puerta.' },
      { desc: 'No solo... sino también', example: 'Not only did he win, but he also broke the record.', exampleEs: 'No solo ganó, sino que también rompió el récord.' },
    ],
    signals: ['seldom', 'rarely', 'never', 'hardly', 'scarcely', 'no sooner', 'under no circumstances', 'not only', 'little did I know'],
    tips: ['Si la frase original no tiene auxiliar, debes usar do/does/did: "I realized..." → "Little did I realize..."'],
    commonErrors: [
      { wrong: 'Never I have seen such chaos.', right: 'Never have I seen such chaos.', rule: 'El verbo auxiliar debe preceder al sujeto tras el adverbio negativo.' }
    ]
  },

  // ======================================
  // THE SUBJUNCTIVE
  // ======================================
  subjunctive: {
    id: 'subjunctive',
    title: 'The Subjunctive Mood',
    titleEs: 'El Modo Subjuntivo',
    level: 'C1',
    category: 'grammar',
    emoji: '🎭',
    description: 'El subjuntivo en inglés se usa para expresar demandas, sugerencias, consejos o necesidades de manera formal, usando la forma base del verbo.',
    structure: [
      { form: 'Form', formula: 'Subject + Verb/Adjective (of demand) + THAT + Subject + Base Verb (no -s, no past)', example: 'It is vital that he be present.' },
    ],
    uses: [
      { desc: 'Después de verbos de demanda/sugerencia', example: 'I insist that she accept the offer.', exampleEs: 'Insisto en que acepte la oferta.' },
      { desc: 'Después de adjetivos de importancia', example: 'It is important that they not make any noise.', exampleEs: 'Es importante que no hagan ruido.' },
    ],
    signals: ['insist', 'suggest', 'recommend', 'demand', 'propose', 'essential', 'important', 'vital', 'imperative'],
    tips: ['El verbo "to be" en subjuntivo siempre es "be" para todas las personas: "that I be", "that he be".', 'La forma negativa simplemente añade "not" antes del verbo: "that he not go".'],
    commonErrors: [
      { wrong: 'I suggest that he goes to the doctor.', right: 'I suggest that he go to the doctor.', rule: 'Usa la forma base del verbo (infinitivo sin "to"), no añadas -s para la tercera persona.' }
    ]
  },

  // ======================================
  // CLEFT SENTENCES
  // ======================================
  cleft_sentences: {
    id: 'cleft_sentences',
    title: 'Cleft Sentences',
    titleEs: 'Oraciones de Hendidura (Cleft Sentences)',
    level: 'C2',
    category: 'grammar',
    emoji: '⚡',
    description: 'Las cleft sentences dividen una oración simple en dos partes para dar un énfasis especial a un elemento específico.',
    structure: [
      { form: 'IT Cleft', formula: 'It + be + emphasized element + relative clause', example: 'It was John who stole the cookie.' },
      { form: 'WHAT Cleft', formula: 'What + clause + be + emphasized element', example: 'What we need is more investment.' },
    ],
    uses: [
      { desc: 'Para corregir o enfatizar la persona/cosa', example: 'It was my sister who called you, not me.', exampleEs: 'Fue mi hermana quien te llamó, no yo.' },
      { desc: 'Para enfatizar la acción o necesidad', example: 'What I want is to sleep for ten hours.', exampleEs: 'Lo que quiero es dormir durante diez horas.' },
    ],
    tips: ['Ayuda a desviar la atención al sujeto o al objeto directo en la frase.', 'También se pueden usar estructuras con "all": "All I want is a quiet evening."'],
    commonErrors: [
      { wrong: 'What we need are more details.', right: 'What we need is more details.', rule: 'El verbo principal después de la cláusula "what" suele ir en singular (is/was).' }
    ]
  },

};

// Get all grammar topics
function getAllGrammarTopics() {
  return Object.values(GRAMMAR_DATA);
}

// Get by level
function getGrammarByLevel(level) {
  return Object.values(GRAMMAR_DATA).filter(g => g.level === level);
}

// Get by category
function getGrammarByCategory(cat) {
  return Object.values(GRAMMAR_DATA).filter(g => g.category === cat);
}

// Get single topic
function getGrammarTopic(id) {
  return GRAMMAR_DATA[id] || null;
}

// CEFR levels sorted
const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const CEFR_NAMES = {
  A1: 'Principiante', A2: 'Básico', B1: 'Intermedio',
  B2: 'Intermedio Alto', C1: 'Avanzado', C2: 'Maestro'
};
