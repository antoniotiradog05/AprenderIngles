// ============================================================
// EnglishMaster — data/exercises.js
// Exercise sets for all levels and types
// ============================================================

const EXERCISES = [

  // ====================================================
  // FILL IN THE BLANK
  // ====================================================
  {
    id: 'ex001', type: 'fill_blank', level: 'A1', topic: 'present_simple',
    title: 'Present Simple — To Be',
    instruction: 'Complete the sentence with the correct form of "to be".',
    template: 'My name ___ Maria.',
    answer: 'is',
    hint: 'My name = 3rd person singular',
    explanation: 'With "my name" (3rd person singular), we use IS.',
    rule: 'to be: I am, you are, he/she/it IS, we/they are.',
    xp: 10
  },
  {
    id: 'ex002', type: 'fill_blank', level: 'A1', topic: 'present_simple',
    title: 'Present Simple — To Have',
    instruction: 'Fill in the blank with the correct form.',
    template: 'He ___ two dogs and a cat.',
    answer: 'has',
    hint: 'He = 3rd person singular',
    explanation: 'With "he" (3rd person singular), "have" becomes "has".',
    rule: 'to have: I/you/we/they HAVE, he/she/it HAS.',
    xp: 10
  },
  {
    id: 'ex003', type: 'fill_blank', level: 'A2', topic: 'present_continuous',
    title: 'Present Continuous',
    instruction: 'Complete with the Present Continuous form.',
    template: 'They ___ (watch) a movie right now.',
    answer: 'are watching',
    hint: 'They + be + -ing',
    explanation: 'They are watching — "right now" = present continuous.',
    rule: 'Present Continuous: am/is/are + verb-ing.',
    xp: 15
  },
  {
    id: 'ex004', type: 'fill_blank', level: 'A2', topic: 'past_simple',
    title: 'Past Simple — Irregular',
    instruction: 'Fill in with the correct past simple form.',
    template: 'Yesterday, she ___ (go) to the market.',
    answer: 'went',
    hint: "go is irregular",
    explanation: '"Go" is irregular. Past simple of "go" is "went".',
    rule: 'Irregular verbs: go → went, see → saw, eat → ate.',
    xp: 15
  },
  {
    id: 'ex005', type: 'fill_blank', level: 'B1', topic: 'present_perfect',
    title: 'Present Perfect with FOR',
    instruction: 'Complete with the correct form.',
    template: 'I ___ (study) English for three years.',
    answer: 'have studied',
    hint: 'I + have + past participle',
    explanation: 'With "for" indicating duration up to now, use Present Perfect: have studied.',
    rule: 'Present Perfect + for: action started in past, continuing now.',
    xp: 20
  },
  {
    id: 'ex006', type: 'fill_blank', level: 'B1', topic: 'conditionals',
    title: 'Second Conditional',
    instruction: 'Complete the conditional sentence.',
    template: 'If I ___ (be) rich, I would travel the world.',
    answer: 'were',
    hint: 'Second Conditional uses Past Simple — "were" for all persons',
    explanation: 'Second Conditional: If + Past Simple (use "were" for all persons in formal English).',
    rule: 'Second Conditional: If I were... / If she were... (not "was" in formal English).',
    xp: 20
  },
  {
    id: 'ex007', type: 'fill_blank', level: 'B2', topic: 'passive_voice',
    title: 'Passive Voice — Past Simple',
    instruction: 'Rewrite using the passive voice.',
    template: 'The architect designed this building. → This building ___ ___ by the architect.',
    answer: 'was designed',
    hint: 'Past Simple Passive: was/were + past participle',
    explanation: 'Past Simple Passive: was designed (by the architect).',
    rule: 'Passive Voice: be (conjugated) + past participle.',
    xp: 25
  },
  {
    id: 'ex008', type: 'fill_blank', level: 'B1', topic: 'modal_verbs',
    title: 'Modal Verbs — Advice',
    instruction: 'Choose the correct modal to give advice.',
    template: 'You look tired. You ___ get some rest.',
    answer: 'should',
    hint: 'Which modal expresses advice/recommendation?',
    explanation: '"Should" is used to give advice or recommendations.',
    rule: 'should = advice/recommendation; must = strong obligation; can = ability.',
    xp: 20
  },

  // ====================================================
  // MULTIPLE CHOICE
  // ====================================================
  {
    id: 'ex009', type: 'multiple_choice', level: 'A1', topic: 'present_simple',
    title: 'Verbo TO BE — Negativa',
    instruction: 'Choose the correct negative form.',
    sentence: 'We ___ from France.',
    options: ["isn't", "aren't", "am not", "weren't"],
    correct: 1,
    explanation: '"We" is plural, so the negative of "to be" is "aren\'t".',
    rule: 'to be negative: I\'m not, you/we/they aren\'t, he/she/it isn\'t.',
    xp: 10
  },
  {
    id: 'ex010', type: 'multiple_choice', level: 'A2', topic: 'articles',
    title: 'Articles — A or AN',
    instruction: 'Select the correct article.',
    sentence: '___ honest politician is hard to find.',
    options: ['A', 'An', 'The', 'No article'],
    correct: 1,
    explanation: '"Honest" starts with a vowel SOUND /ɒ/ (the H is silent), so use "an".',
    rule: 'Use AN before vowel SOUNDS: an hour, an honest person, an umbrella.',
    xp: 15
  },
  {
    id: 'ex011', type: 'multiple_choice', level: 'B1', topic: 'present_perfect',
    title: 'Present Perfect vs. Past Simple',
    instruction: 'Choose the correct tense.',
    sentence: 'I ___ the new Marvel movie last night.',
    options: ['have seen', 'saw', 'see', 'had seen'],
    correct: 1,
    explanation: '"Last night" is a specific time in the past → Past Simple: saw.',
    rule: 'Use Past Simple with specific past time: yesterday, last night, in 2020, ago.',
    xp: 20
  },
  {
    id: 'ex012', type: 'multiple_choice', level: 'B1', topic: 'reported_speech',
    title: 'Reported Speech',
    instruction: 'Convert to reported speech.',
    sentence: 'He said: "I am studying for the exam." → He said he ___ for the exam.',
    options: ['is studying', 'was studying', 'studied', 'had studied'],
    correct: 1,
    explanation: 'Backshift in reported speech: Present Continuous → Past Continuous.',
    rule: 'Reported Speech backshift: am/is/are + -ing → was/were + -ing.',
    xp: 20
  },
  {
    id: 'ex013', type: 'multiple_choice', level: 'B2', topic: 'conditionals',
    title: 'Third Conditional',
    instruction: 'Choose the correct Third Conditional form.',
    sentence: 'If she ___ harder, she would have passed the exam.',
    options: ['studied', 'had studied', 'would study', 'has studied'],
    correct: 1,
    explanation: 'Third Conditional: If + Past Perfect (had studied), would have + pp.',
    rule: 'Third Conditional: If + had + pp, would have + pp.',
    xp: 25
  },
  {
    id: 'ex014', type: 'multiple_choice', level: 'A2', topic: 'modal_verbs',
    title: 'Modal Verbs — Permission',
    instruction: 'Which modal expresses permission politely?',
    sentence: '___ I use your phone, please?',
    options: ['Must', 'Should', 'Could', 'Would'],
    correct: 2,
    explanation: '"Could" is used for polite requests and asking permission.',
    rule: 'Polite permission: Could I...? / May I...? (not "Can I" in very formal situations).',
    xp: 15
  },
  {
    id: 'ex015', type: 'multiple_choice', level: 'C1', topic: 'inversion',
    title: 'Formal Inversion',
    instruction: 'Complete with the correct inverted structure.',
    sentence: '___ did I realize how important the meeting was.',
    options: ['Only then', 'When then', 'That only', 'By now'],
    correct: 0,
    explanation: '"Only then" triggers inversion: "Only then did I realize..."',
    rule: 'Inversion after negative/restrictive adverbials: Not only, Only then, Rarely, Never...',
    xp: 35
  },

  // ====================================================
  // ERROR CORRECTION
  // ====================================================
  {
    id: 'ex016', type: 'error_correction', level: 'A1', topic: 'present_simple',
    title: 'Corrige el error',
    instruction: 'Find and explain the error in this sentence.',
    sentence: 'She don\'t like spicy food.',
    correctSentence: "She doesn't like spicy food.",
    errorWord: "don't",
    correctWord: "doesn't",
    explanation: 'With she/he/it, the negative is "doesn\'t", not "don\'t".',
    rule: "Negative 3rd person singular: doesn't (not don't).",
    xp: 15
  },
  {
    id: 'ex017', type: 'error_correction', level: 'A2', topic: 'past_simple',
    title: 'Corrige el error',
    instruction: 'Find the grammar error.',
    sentence: 'I didn\'t went to school yesterday.',
    correctSentence: "I didn't go to school yesterday.",
    errorWord: "went",
    correctWord: "go",
    explanation: 'After "didn\'t", use the base infinitive (go), not the past form (went).',
    rule: "After did/didn't, use the base form of the verb.",
    xp: 15
  },
  {
    id: 'ex018', type: 'error_correction', level: 'B1', topic: 'conditionals',
    title: 'Corrige el error',
    instruction: 'Identify and correct the error.',
    sentence: 'If I would be you, I would apologize.',
    correctSentence: 'If I were you, I would apologize.',
    errorWord: 'would be',
    correctWord: 'were',
    explanation: '"Would" never appears in the "if" clause of a conditional.',
    rule: 'Second Conditional: If + Past Simple (NEVER "would" in the if-clause).',
    xp: 20
  },
  {
    id: 'ex019', type: 'error_correction', level: 'B2', topic: 'adjectives_adverbs',
    title: 'Corrige el error',
    instruction: 'Correct the adverb/adjective error.',
    sentence: 'He drives very careful.',
    correctSentence: 'He drives very carefully.',
    errorWord: 'careful',
    correctWord: 'carefully',
    explanation: '"Drives" is a verb — you need an adverb to modify it: carefully (not careful).',
    rule: 'Adverbs modify verbs: He drives carefully. She speaks fluently.',
    xp: 25
  },

  // ====================================================
  // TRANSLATION
  // ====================================================
  {
    id: 'ex020', type: 'translation', level: 'A1', topic: 'present_simple',
    title: 'Traducción: Español → Inglés',
    instruction: 'Translate this sentence into English.',
    sentenceEs: 'Ella tiene tres hermanos.',
    correctTranslation: 'She has three brothers.',
    alternatives: ['She has got three brothers.'],
    explanation: '"Tiene" → "has" (3rd person singular). "Hermanos" → "brothers".',
    rule: 'to have: she HAS. Brothers = hermanos.',
    xp: 15
  },
  {
    id: 'ex021', type: 'translation', level: 'A2', topic: 'past_simple',
    title: 'Traducción: Español → Inglés',
    instruction: 'Translate this sentence into English.',
    sentenceEs: 'El año pasado fui a Londres.',
    correctTranslation: 'Last year I went to London.',
    alternatives: ['I went to London last year.'],
    explanation: '"Fui" → "went" (past of go). "El año pasado" → "last year".',
    rule: 'Past Simple: go → went. "El año pasado" = last year.',
    xp: 15
  },
  {
    id: 'ex022', type: 'translation', level: 'B1', topic: 'present_perfect',
    title: 'Traducción: Español → Inglés',
    instruction: 'Translate this sentence into English.',
    sentenceEs: 'Nunca he comido comida japonesa.',
    correctTranslation: "I have never eaten Japanese food.",
    alternatives: ["I've never eaten Japanese food."],
    explanation: '"Nunca he..." → "I have never..." (Present Perfect with "never").',
    rule: "Present Perfect: have/has + past participle. eat → eaten.",
    xp: 20
  },

  // ====================================================
  // SENTENCE ORDERING
  // ====================================================
  {
    id: 'ex023', type: 'sentence_order', level: 'A1', topic: 'present_simple',
    title: 'Ordena la frase',
    instruction: 'Put the words in the correct order.',
    words: ['like', 'don\'t', 'I', 'mornings', 'rainy'],
    correctOrder: [2, 1, 0, 3, 4],
    correctSentence: "I don't like rainy mornings.",
    explanation: 'Order: Subject (I) + auxiliary negative (don\'t) + verb (like) + object (rainy mornings).',
    rule: 'Sentence order: Subject + Verb + Object.',
    xp: 15
  },
  {
    id: 'ex024', type: 'sentence_order', level: 'A2', topic: 'present_continuous',
    title: 'Ordena la frase',
    instruction: 'Rearrange the words to make a correct sentence.',
    words: ['studying', 'she', 'at', 'moment', 'is', 'the'],
    correctOrder: [1, 4, 0, 5, 2, 3],
    correctSentence: 'She is studying at the moment.',
    explanation: 'Present Continuous: Subject (She) + is + studying + time expression.',
    rule: 'Present Continuous word order: Subject + is/are + verb-ing.',
    xp: 15
  },
  {
    id: 'ex025', type: 'sentence_order', level: 'B1', topic: 'conditionals',
    title: 'Ordena la frase',
    instruction: 'Put the conditional sentence in order.',
    words: ["hadn't", 'we', 'the', 'if', 'missed', 'have', 'bus', 'we', "wouldn't", 'had'],
    correctOrder: [3, 1, 9, 4, 6, 1, 8, 5, 0, 2],
    correctSentence: "If we had missed the bus, we wouldn't have had the accident.",
    explanation: 'Third Conditional: If + Past Perfect, would + have + pp.',
    rule: 'Third Conditional structure.',
    xp: 25
  },
  // ====================================================
  // MORE FILL IN THE BLANK
  // ====================================================
  {
    id: 'ex026', type: 'fill_blank', level: 'A2', topic: 'comparatives',
    title: 'Comparatives',
    instruction: 'Complete with the comparative form.',
    template: 'This book is ___ (interesting) than the film.',
    answer: 'more interesting',
    hint: 'Long adjectives: more + adjective',
    explanation: '"Interesting" has 3 syllables, so we use "more interesting".',
    rule: 'Short adj: adj + -er (bigger). Long adj: more + adj (more interesting).',
    xp: 15
  },
  {
    id: 'ex027', type: 'fill_blank', level: 'B1', topic: 'passive_voice',
    title: 'Passive Voice — Present Simple',
    instruction: 'Rewrite using the passive voice.',
    template: 'They make this cheese in France. → This cheese ___ in France.',
    answer: 'is made',
    hint: 'Present Simple Passive: is/are + past participle',
    explanation: 'Present Simple Passive: is made. "This cheese" is singular → is.',
    rule: 'Passive Present Simple: is/are + past participle.',
    xp: 20
  },
  {
    id: 'ex028', type: 'fill_blank', level: 'B2', topic: 'gerund_infinitive',
    title: 'Gerund or Infinitive?',
    instruction: 'Fill in with the correct form.',
    template: 'She suggested ___ (go) to the cinema.',
    answer: 'going',
    hint: '"Suggest" is followed by gerund (-ing)',
    explanation: '"Suggest" takes the gerund. "Suggest to go" is incorrect.',
    rule: 'Verbs + gerund: suggest, avoid, enjoy, finish, mind, consider.',
    xp: 25
  },
  {
    id: 'ex029', type: 'fill_blank', level: 'B1', topic: 'present_perfect',
    title: 'Present Perfect Negative',
    instruction: 'Complete the sentence correctly.',
    template: 'He ___ (not / eat) anything since this morning.',
    answer: "hasn't eaten",
    hint: 'He = 3rd person → has + not + past participle',
    explanation: 'Negative Present Perfect with "since": hasn\'t eaten.',
    rule: 'Present Perfect negative: have/has + not + past participle.',
    xp: 20
  },
  {
    id: 'ex030', type: 'fill_blank', level: 'A2', topic: 'prepositions',
    title: 'Prepositions of Time',
    instruction: 'Complete with the correct preposition.',
    template: 'The meeting is ___ Monday ___ 3 pm.',
    answer: 'on / at',
    hint: 'Days → ON; clock times → AT',
    explanation: 'ON Monday (day), AT 3 pm (specific time).',
    rule: 'AT times (at 5pm). ON days (on Monday). IN months/years (in June).',
    xp: 15
  },
  {
    id: 'ex031', type: 'fill_blank', level: 'A1', topic: 'possessives',
    title: 'Possessive Adjectives',
    instruction: 'Fill in with the correct possessive adjective.',
    template: 'They have a dog. ___ dog is very friendly.',
    answer: 'Their',
    hint: 'They → Their',
    explanation: '"Their" is the possessive adjective for "they".',
    rule: 'Possessives: my, your, his, her, its, our, THEIR.',
    xp: 10
  },
  {
    id: 'ex032', type: 'fill_blank', level: 'C1', topic: 'subjunctive',
    title: 'Subjunctive Mood',
    instruction: 'Complete with the correct subjunctive form.',
    template: 'The committee recommended that he ___ (submit) the report.',
    answer: 'submit',
    hint: 'Formal subjunctive: base form for all persons',
    explanation: 'The formal subjunctive uses the base form: "submit" (not "submits").',
    rule: 'Subjunctive: recommend/suggest/insist + that + subject + base form.',
    xp: 35
  },
  {
    id: 'ex033', type: 'fill_blank', level: 'B2', topic: 'reported_speech',
    title: 'Reported Orders',
    instruction: 'Convert the direct order to reported speech.',
    template: '"Clean your room!" → She told me ___ my room.',
    answer: 'to clean',
    hint: 'Reported orders: told + person + to + infinitive',
    explanation: 'Reported commands: tell + someone + to + infinitive.',
    rule: 'Reported orders: She told him to + infinitive.',
    xp: 25
  },

  // ====================================================
  // MORE MULTIPLE CHOICE
  // ====================================================
  {
    id: 'ex034', type: 'multiple_choice', level: 'A2', topic: 'past_simple',
    title: 'Past Simple — Regular Verbs',
    instruction: 'Which is the correct past simple form?',
    sentence: 'We ___ football yesterday afternoon.',
    options: ['play', 'played', 'have played', 'were playing'],
    correct: 1,
    explanation: '"Yesterday" signals Past Simple. Regular: play → played.',
    rule: 'Past Simple regular verbs: verb + -ed. play → played.',
    xp: 15
  },
  {
    id: 'ex035', type: 'multiple_choice', level: 'B1', topic: 'modal_verbs',
    title: 'Modal Verbs — Deduction',
    instruction: 'Choose the modal that expresses logical deduction.',
    sentence: 'He knows everything about the topic. He ___ be an expert.',
    options: ['can', 'must', 'should', 'would'],
    correct: 1,
    explanation: '"Must" expresses strong deduction/certainty.',
    rule: 'must = deduction (certain). might/could = possibility (not certain).',
    xp: 20
  },
  {
    id: 'ex036', type: 'multiple_choice', level: 'B2', topic: 'wish',
    title: 'I WISH + Verb Form',
    instruction: 'Choose the correct form after "wish".',
    sentence: 'I wish I ___ speak Italian fluently.',
    options: ['can', 'could', 'would', 'will'],
    correct: 1,
    explanation: '"Wish + could" expresses desire about a present ability (unreal).',
    rule: 'I wish + Past Simple/could: express unreal desire about the present.',
    xp: 25
  },
  {
    id: 'ex037', type: 'multiple_choice', level: 'A1', topic: 'adverbs_frequency',
    title: 'Adverbs of Frequency',
    instruction: 'Choose the correct word order.',
    sentence: 'She ___ watches TV before bed.',
    options: ['always she', 'always', 'she always', 'her always'],
    correct: 1,
    explanation: 'Adverbs of frequency go BEFORE the main verb: "always watches".',
    rule: 'Position: Subject + adverb of frequency + main verb.',
    xp: 10
  },
  {
    id: 'ex038', type: 'multiple_choice', level: 'B1', topic: 'gerund_infinitive',
    title: 'Gerund vs. Infinitive',
    instruction: 'Choose the correct form.',
    sentence: 'I would love ___ to Paris someday.',
    options: ['going', 'to go', 'go', 'gone'],
    correct: 1,
    explanation: '"Would love" is followed by the infinitive: "to go".',
    rule: 'want, would like/love, hope, decide, plan → infinitive (to go).',
    xp: 20
  },
  {
    id: 'ex039', type: 'multiple_choice', level: 'B2', topic: 'passive_voice',
    title: 'Passive — Future',
    instruction: 'Choose the correct future passive form.',
    sentence: 'The new bridge ___ next year.',
    options: ['will build', 'will be built', 'is being built', 'has been built'],
    correct: 1,
    explanation: 'Future Passive: will + be + past participle.',
    rule: 'Future Passive: will be + past participle.',
    xp: 25
  },
  {
    id: 'ex040', type: 'multiple_choice', level: 'A2', topic: 'question_tags',
    title: 'Question Tags',
    instruction: 'Choose the correct question tag.',
    sentence: "She's from Argentina, ___?",
    options: ["is she", "isn't she", "she isn't", "does she"],
    correct: 1,
    explanation: 'Positive statement + negative tag: "She is" → "isn\'t she?"',
    rule: 'Positive statement → negative tag. Negative statement → positive tag.',
    xp: 15
  },
  {
    id: 'ex041', type: 'multiple_choice', level: 'A2', topic: 'prepositions',
    title: 'Prepositions of Place',
    instruction: 'Choose the correct preposition.',
    sentence: 'The cat is hiding ___ the table.',
    options: ['in', 'on', 'under', 'at'],
    correct: 2,
    explanation: 'UNDER = below. The cat is below the table.',
    rule: 'ON = on top. IN = inside. UNDER = below. NEXT TO = beside.',
    xp: 10
  },
  {
    id: 'ex042', type: 'multiple_choice', level: 'C1', topic: 'discourse_markers',
    title: 'Discourse Markers',
    instruction: 'Choose the correct discourse marker.',
    sentence: 'The film was long; ___, it was very entertaining.',
    options: ['however', 'therefore', 'moreover', 'consequently'],
    correct: 0,
    explanation: '"However" shows contrast: long BUT entertaining.',
    rule: 'however = contrast. therefore/consequently = result. moreover = addition.',
    xp: 35
  },
  {
    id: 'ex043', type: 'multiple_choice', level: 'B1', topic: 'conditionals',
    title: 'First Conditional',
    instruction: 'Choose the correct First Conditional form.',
    sentence: 'If it ___ tomorrow, we will cancel the trip.',
    options: ['rains', 'will rain', 'rained', 'would rain'],
    correct: 0,
    explanation: 'First Conditional: If + Present Simple, will + infinitive.',
    rule: 'First Conditional (real future): If + Present Simple, will + verb.',
    xp: 20
  },

  // ====================================================
  // MORE ERROR CORRECTION
  // ====================================================
  {
    id: 'ex044', type: 'error_correction', level: 'A2', topic: 'present_perfect',
    title: 'Corrige el error',
    instruction: 'Find the tense error.',
    sentence: 'I have seen that film last week.',
    correctSentence: 'I saw that film last week.',
    errorWord: 'have seen',
    correctWord: 'saw',
    explanation: '"Last week" is a specific past time → Past Simple.',
    rule: 'NOT use Present Perfect with specific past times (yesterday, last week, in 2020).',
    xp: 20
  },
  {
    id: 'ex045', type: 'error_correction', level: 'A1', topic: 'plural',
    title: 'Corrige el error',
    instruction: 'Find the error in the plural form.',
    sentence: 'There are three childs in the park.',
    correctSentence: 'There are three children in the park.',
    errorWord: 'childs',
    correctWord: 'children',
    explanation: '"Child" is irregular. The plural is "children".',
    rule: 'Irregular plurals: child → children, man → men, woman → women.',
    xp: 15
  },
  {
    id: 'ex046', type: 'error_correction', level: 'B1', topic: 'modal_verbs',
    title: 'Corrige el error',
    instruction: 'Find the error with the modal verb.',
    sentence: 'You must to finish your homework.',
    correctSentence: 'You must finish your homework.',
    errorWord: 'must to',
    correctWord: 'must',
    explanation: 'Modal verbs are NEVER followed by "to".',
    rule: 'Modal verbs + base infinitive (no "to"): must go, can swim, should eat.',
    xp: 20
  },
  {
    id: 'ex047', type: 'error_correction', level: 'B2', topic: 'comparative',
    title: 'Corrige el error',
    instruction: 'Find the comparative error.',
    sentence: 'She is more taller than her sister.',
    correctSentence: 'She is taller than her sister.',
    errorWord: 'more taller',
    correctWord: 'taller',
    explanation: 'Never use "more" with short comparative forms.',
    rule: 'Correct: taller, bigger, faster (NOT more taller, more bigger).',
    xp: 20
  },
  {
    id: 'ex048', type: 'error_correction', level: 'B1', topic: 'gerund',
    title: 'Corrige el error',
    instruction: 'Find and correct the error.',
    sentence: 'I enjoy to swim in the sea.',
    correctSentence: 'I enjoy swimming in the sea.',
    errorWord: 'to swim',
    correctWord: 'swimming',
    explanation: '"Enjoy" always takes a gerund (-ing).',
    rule: 'Enjoy + gerund: I enjoy swimming. NOT "enjoy to swim".',
    xp: 20
  },

  // ====================================================
  // MORE TRANSLATIONS
  // ====================================================
  {
    id: 'ex049', type: 'translation', level: 'A2', topic: 'present_continuous',
    title: 'Traducción: Español → Inglés',
    instruction: 'Translate into English.',
    sentenceEs: '¿Qué estás haciendo ahora mismo?',
    correctTranslation: 'What are you doing right now?',
    alternatives: ['What are you doing at the moment?'],
    explanation: '"Estás haciendo" = "are doing". "Ahora mismo" = "right now".',
    rule: 'Present Continuous: am/is/are + verb-ing for actions happening now.',
    xp: 15
  },
  {
    id: 'ex050', type: 'translation', level: 'B1', topic: 'conditionals',
    title: 'Traducción: Español → Inglés',
    instruction: 'Translate this Second Conditional sentence.',
    sentenceEs: 'Si tuviera más tiempo, aprendería a tocar la guitarra.',
    correctTranslation: 'If I had more time, I would learn to play the guitar.',
    alternatives: ["If I had more time, I'd learn to play the guitar."],
    explanation: 'Second Conditional: If + Past Simple, would + infinitive.',
    rule: 'Second Conditional (unreal present): If + past, would + infinitive.',
    xp: 20
  },
  {
    id: 'ex051', type: 'translation', level: 'B2', topic: 'passive_voice',
    title: 'Traducción: Español → Inglés',
    instruction: 'Translate using the passive voice.',
    sentenceEs: 'Esta novela fue escrita por García Márquez.',
    correctTranslation: 'This novel was written by García Márquez.',
    alternatives: [],
    explanation: 'Past Simple Passive: was + past participle of "write" = "written".',
    rule: 'Passive Past Simple: was/were + past participle.',
    xp: 25
  },
  {
    id: 'ex052', type: 'translation', level: 'A1', topic: 'greetings',
    title: 'Traducción: Español → Inglés',
    instruction: 'Translate this greeting.',
    sentenceEs: 'Buenos días, ¿cómo estás?',
    correctTranslation: 'Good morning, how are you?',
    alternatives: ['Good morning! How are you?'],
    explanation: '"Buenos días" = Good morning. "¿Cómo estás?" = How are you?',
    rule: 'Greetings: Good morning / Good afternoon / Good evening / Good night.',
    xp: 10
  },
  {
    id: 'ex053', type: 'translation', level: 'B1', topic: 'present_perfect',
    title: 'Traducción: Español → Inglés',
    instruction: 'Translate using the Present Perfect.',
    sentenceEs: '¿Has estado alguna vez en Nueva York?',
    correctTranslation: 'Have you ever been to New York?',
    alternatives: [],
    explanation: '"¿Has estado alguna vez...?" = "Have you ever been to...?"',
    rule: 'Present Perfect with "ever" for life experiences.',
    xp: 20
  },

  // ====================================================
  // MORE SENTENCE ORDERING
  // ====================================================
  {
    id: 'ex054', type: 'sentence_order', level: 'A2', topic: 'past_simple',
    title: 'Ordena la frase',
    instruction: 'Put these words in the correct order.',
    words: ['did', 'you', 'weekend', 'last', 'what', 'do'],
    correctOrder: [4, 0, 1, 5, 2, 3],
    correctSentence: 'What did you do last weekend?',
    explanation: 'Wh- question Past Simple: Wh- + did + subject + base verb.',
    rule: 'Past Simple questions: What + did + subject + base form?',
    xp: 15
  },
  {
    id: 'ex055', type: 'sentence_order', level: 'B1', topic: 'present_perfect',
    title: 'Ordena la frase',
    instruction: 'Rearrange to make a correct Present Perfect sentence.',
    words: ['been', 'have', 'never', 'to', 'Japan', 'I'],
    correctOrder: [5, 1, 2, 0, 3, 4],
    correctSentence: 'I have never been to Japan.',
    explanation: 'Present Perfect with "never": Subject + have + never + past participle.',
    rule: 'Present Perfect with never: I have never been to...',
    xp: 20
  },
  {
    id: 'ex056', type: 'sentence_order', level: 'B2', topic: 'relative_clauses',
    title: 'Ordena la frase',
    instruction: 'Put the relative clause sentence in order.',
    words: ['the', 'man', 'who', 'I', 'met', 'yesterday', 'was', 'very', 'kind'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    correctSentence: 'The man who I met yesterday was very kind.',
    explanation: '"The man" + "who" (relative pronoun) + relative clause.',
    rule: 'Relative clauses: who (people), which (things), that (both).',
    xp: 25
  },
];

// Get exercises by type
function getExercisesByType(type) {
  return EXERCISES.filter(e => e.type === type);
}

// Get exercises by level
function getExercisesByLevel(level) {
  return EXERCISES.filter(e => e.level === level);
}

// Get random exercises for practice session
function getExerciseSession(level, count = 10) {
  const byLevel = getExercisesByLevel(level);
  const higher = EXERCISES.filter(e => {
    const levels = ['A1','A2','B1','B2','C1','C2'];
    return levels.indexOf(e.level) <= levels.indexOf(level) + 1;
  });
  const pool = byLevel.length >= count ? byLevel : higher;
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
}

// Exercise type labels
const EXERCISE_TYPE_LABELS = {
  fill_blank: '✏️ Completar huecos',
  multiple_choice: '🎯 Opción múltiple',
  error_correction: '🔍 Corregir errores',
  translation: '🌐 Traducción',
  sentence_order: '🔀 Ordenar frases',
};
