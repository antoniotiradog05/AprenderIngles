// ============================================================
// EnglishMaster — data/assessment.js
// Placement test questions (A1-C2 adaptive)
// ============================================================

const ASSESSMENT_QUESTIONS = [
  // ---- A1 Level Questions ----
  {
    id: 'q001', level: 'A1', skill: 'grammar', difficulty: 1,
    question: 'Complete: "She ___ a teacher."',
    options: ['am', 'is', 'are', 'be'],
    correct: 1,
    explanation: '"She" (3rd person singular) uses "is" as the verb to be.',
    rule: 'Present Simple of "to be": I am, you are, he/she/it IS, we/they are.'
  },
  {
    id: 'q002', level: 'A1', skill: 'vocabulary', difficulty: 1,
    question: 'What is the translation of "book"?',
    options: ['mesa', 'libro', 'silla', 'lápiz'],
    correct: 1,
    explanation: '"Book" means "libro" in Spanish.',
    rule: 'Basic vocabulary: book = libro.'
  },
  {
    id: 'q003', level: 'A1', skill: 'grammar', difficulty: 1,
    question: 'Choose the correct sentence:',
    options: ['I has a cat.', 'I have a cat.', 'I am have a cat.', 'I haves a cat.'],
    correct: 1,
    explanation: 'With "I", use "have" (not "has", which is for he/she/it).',
    rule: 'Present Simple of "to have": I/you/we/they HAVE, he/she/it HAS.'
  },
  {
    id: 'q004', level: 'A1', skill: 'grammar', difficulty: 1,
    question: 'How do you say "¿Cómo estás?" in English?',
    options: ['What is your name?', 'Where are you from?', 'How are you?', 'How old are you?'],
    correct: 2,
    explanation: '"¿Cómo estás?" = "How are you?" in English.',
    rule: 'Basic greetings: How are you? = ¿Cómo estás?'
  },
  {
    id: 'q005', level: 'A1', skill: 'grammar', difficulty: 1,
    question: 'Complete: "They ___ from Spain."',
    options: ['is', 'am', 'are', 'be'],
    correct: 2,
    explanation: '"They" is plural, so we use "are".',
    rule: 'Present Simple of "to be": they ARE.'
  },
  {
    id: 'q006', level: 'A1', skill: 'vocabulary', difficulty: 1,
    question: 'Which one is a color?',
    options: ['happy', 'blue', 'run', 'table'],
    correct: 1,
    explanation: '"Blue" is a color (azul). The others are: happy (adjective), run (verb), table (noun).',
    rule: 'Basic vocabulary: blue = azul.'
  },
  {
    id: 'q007', level: 'A1', skill: 'grammar', difficulty: 1,
    question: 'Make it negative: "I like coffee."',
    options: ["I don't like coffee.", "I am not like coffee.", "I no like coffee.", "I doesn't like coffee."],
    correct: 0,
    explanation: 'Use "don\'t" (do not) to make negatives with "I, you, we, they".',
    rule: "Negative Present Simple: I don't, you don't, we don't, they don't."
  },
  {
    id: 'q008', level: 'A1', skill: 'vocabulary', difficulty: 1,
    question: 'What does "happy" mean in Spanish?',
    options: ['triste', 'cansado', 'feliz', 'enojado'],
    correct: 2,
    explanation: '"Happy" = "feliz" in Spanish.',
    rule: 'Emotions vocabulary: happy = feliz.'
  },

  // ---- A2 Level Questions ----
  {
    id: 'q009', level: 'A2', skill: 'grammar', difficulty: 2,
    question: 'Choose the correct form: "He ___ TV right now."',
    options: ['watch', 'watches', 'is watching', 'watched'],
    correct: 2,
    explanation: '"Right now" indicates an action happening at this moment, so we use Present Continuous.',
    rule: 'Present Continuous: Subject + am/is/are + verb-ing.'
  },
  {
    id: 'q010', level: 'A2', skill: 'grammar', difficulty: 2,
    question: 'Complete: "I ___ to school by bus yesterday."',
    options: ['go', 'goes', 'went', 'am going'],
    correct: 2,
    explanation: '"Yesterday" signals Past Simple. The past of "go" is "went" (irregular).',
    rule: 'Past Simple: irregular verb "go" → "went".'
  },
  {
    id: 'q011', level: 'A2', skill: 'grammar', difficulty: 2,
    question: 'Which sentence is correct?',
    options: [
      'If it will rain, I will stay home.',
      'If it rains, I will stay home.',
      'If it rained, I will stay home.',
      'If it rain, I will stay home.'
    ],
    correct: 1,
    explanation: 'In the First Conditional, use Present Simple in the "if" clause, not "will".',
    rule: 'First Conditional: If + Present Simple, will + infinitive.'
  },
  {
    id: 'q012', level: 'A2', skill: 'vocabulary', difficulty: 2,
    question: 'What does the phrasal verb "look up" mean?',
    options: ['mirar hacia arriba', 'buscar (información)', 'cuidar', 'visitar'],
    correct: 1,
    explanation: '"Look up" means to search for information, e.g. in a dictionary or online.',
    rule: 'Phrasal verb: look up = buscar (información).'
  },
  {
    id: 'q013', level: 'A2', skill: 'grammar', difficulty: 2,
    question: 'Choose the correct article: "___ uniform is required."',
    options: ['A', 'An', 'The', 'No article'],
    correct: 0,
    explanation: '"Uniform" starts with a consonant SOUND (/j/, like "you"), so we use "a", not "an".',
    rule: 'A vs. An: use "a" before consonant SOUNDS (a uniform, a university).'
  },
  {
    id: 'q014', level: 'A2', skill: 'grammar', difficulty: 2,
    question: '"She ___ here since 2015." Choose the correct verb form.',
    options: ['lives', 'lived', 'has lived', 'is living'],
    correct: 2,
    explanation: '"Since 2015" with an ongoing situation → Present Perfect.',
    rule: 'Present Perfect + since/for: for situations that started in the past and continue now.'
  },
  {
    id: 'q015', level: 'A2', skill: 'reading', difficulty: 2,
    question: 'Read: "John is 25. He works at a bank. He doesn\'t like his job." What does John think about his job?',
    options: ['He loves it.', "He doesn't enjoy it.", 'He is excited about it.', 'He wants to stay longer.'],
    correct: 1,
    explanation: '"He doesn\'t like his job" = He doesn\'t enjoy it.',
    rule: 'Reading comprehension: "doesn\'t like" = "doesn\'t enjoy".'
  },

  // ---- B1 Level Questions ----
  {
    id: 'q016', level: 'B1', skill: 'grammar', difficulty: 3,
    question: 'Complete: "By the time she arrived, we ___ dinner."',
    options: ['finished', 'have finished', 'had finished', 'were finishing'],
    correct: 2,
    explanation: '"By the time" + past event → Past Perfect for the earlier completed action.',
    rule: 'Past Perfect: action completed BEFORE another past action.'
  },
  {
    id: 'q017', level: 'B1', skill: 'grammar', difficulty: 3,
    question: 'Choose the correct passive form: "The letter ___ yesterday."',
    options: ['wrote', 'was written', 'has been written', 'is written'],
    correct: 1,
    explanation: '"Yesterday" → Past Simple Passive: was/were + past participle.',
    rule: 'Passive Voice Past Simple: was/were + past participle.'
  },
  {
    id: 'q018', level: 'B1', skill: 'grammar', difficulty: 3,
    question: '"If I ___ you, I would apologize." Complete correctly.',
    options: ['am', 'was', 'were', 'would be'],
    correct: 2,
    explanation: 'Second Conditional uses "were" for all persons in formal/correct English.',
    rule: 'Second Conditional: If + Past Simple (were), would + infinitive.'
  },
  {
    id: 'q019', level: 'B1', skill: 'vocabulary', difficulty: 3,
    question: 'What does "although" mean?',
    options: ['además', 'por lo tanto', 'aunque', 'sin embargo'],
    correct: 2,
    explanation: '"Although" = "aunque" — introduces a concession or contrast.',
    rule: 'Connectors of contrast: although, even though, despite.'
  },
  {
    id: 'q020', level: 'B1', skill: 'grammar', difficulty: 3,
    question: 'Choose the correct reported speech: He said: "I can swim."',
    options: [
      'He said he can swim.',
      'He said he could swim.',
      'He said he swims.',
      'He said he will swim.'
    ],
    correct: 1,
    explanation: 'In reported speech, "can" backshifts to "could".',
    rule: 'Reported Speech: can → could, will → would, is → was.'
  },
  {
    id: 'q021', level: 'B1', skill: 'grammar', difficulty: 3,
    question: 'Which is correct: "She ___ (not) come because she was ill."',
    options: ["couldn't", "can't", "mustn't", "shouldn't"],
    correct: 0,
    explanation: '"Couldn\'t" (past of "can\'t") expresses inability or impossibility in the past.',
    rule: 'Modal past: can → could. Negative: couldn\'t.'
  },
  {
    id: 'q022', level: 'B1', skill: 'vocabulary', difficulty: 3,
    question: 'What does "run out of" mean?',
    options: ['salir corriendo', 'quedarse sin', 'terminar algo', 'esconderse'],
    correct: 1,
    explanation: '"Run out of" means to have no more of something: "We ran out of milk" = Se nos acabó la leche.',
    rule: 'Phrasal verb: run out of = quedarse sin.'
  },
  {
    id: 'q023', level: 'B1', skill: 'reading', difficulty: 3,
    question: 'Read: "Despite the heavy rain, the outdoor concert was a huge success." What can we infer?',
    options: [
      'The concert was cancelled.',
      'The rain did not prevent the concert from succeeding.',
      'Nobody attended the concert.',
      'The concert was moved indoors.'
    ],
    correct: 1,
    explanation: '"Despite" introduces a contrast: the rain happened, but the concert succeeded anyway.',
    rule: 'Reading inference: "despite" = a pesar de — contrast between two facts.'
  },

  // ---- B2 Level Questions ----
  {
    id: 'q024', level: 'B2', skill: 'grammar', difficulty: 4,
    question: 'Choose the correct form: "She wishes she ___ more time."',
    options: ['has', 'had', 'would have', 'has had'],
    correct: 1,
    explanation: '"Wish" for present/future regrets uses Past Simple: "I wish I had..."',
    rule: 'Wish + Past Simple: expresses a wish about the present that is not true.'
  },
  {
    id: 'q025', level: 'B2', skill: 'grammar', difficulty: 4,
    question: 'Identify the error: "The team are playing good today."',
    options: ['The team', 'are playing', 'good', 'today'],
    correct: 2,
    explanation: '"Good" is an adjective. With verbs of manner (playing), use the adverb "well".',
    rule: 'Good (adjective) vs. Well (adverb): She plays well. She is a good player.'
  },
  {
    id: 'q026', level: 'B2', skill: 'grammar', difficulty: 4,
    question: '"Had I known about the problem, I ___ earlier." Complete.',
    options: ['would arrive', 'would have arrived', 'had arrived', 'arrived'],
    correct: 1,
    explanation: 'Inverted Third Conditional: "Had I known" = "If I had known" → would have + past participle.',
    rule: 'Formal inversion: "Had I known..." = Third Conditional without "if".'
  },
  {
    id: 'q027', level: 'B2', skill: 'vocabulary', difficulty: 4,
    question: 'Choose the correct word: "The report was ___ reviewed before publication."',
    options: ['meticulous', 'meticulously', 'meticule', 'meticulousness'],
    correct: 1,
    explanation: 'An adverb is needed to modify the verb "reviewed". "Meticulously" is the adverb form.',
    rule: 'Word formation: meticulous (adj) → meticulously (adv).'
  },
  {
    id: 'q028', level: 'B2', skill: 'grammar', difficulty: 4,
    question: 'Complete with the correct relative pronoun: "The city ___ he was born has changed a lot."',
    options: ['who', 'which', 'where', 'whose'],
    correct: 2,
    explanation: '"Where" is used for places in relative clauses.',
    rule: 'Relative pronouns: who (people), which (things), where (places), whose (possession).'
  },
  {
    id: 'q029', level: 'B2', skill: 'reading', difficulty: 4,
    question: 'Read: "The proposal was met with considerable skepticism by most board members, who questioned its feasibility." What does "skepticism" imply?',
    options: [
      'Great enthusiasm',
      'Doubt and lack of trust',
      'Strong support',
      'Partial agreement'
    ],
    correct: 1,
    explanation: '"Skepticism" means doubt — the board members doubted the proposal\'s feasibility.',
    rule: 'Vocabulary in context: skepticism = escepticismo / duda.'
  },

  // ---- C1 Level Questions ----
  {
    id: 'q030', level: 'C1', skill: 'grammar', difficulty: 5,
    question: 'Choose the correct form: "She ___ arrived earlier, but she got caught in traffic."',
    options: ['should have', 'should', 'ought', 'must have'],
    correct: 0,
    explanation: '"Should have + past participle" expresses criticism or regret about a past action.',
    rule: 'Modal perfect: should have + pp = criticism/regret. Must have = logical deduction.'
  },
  {
    id: 'q031', level: 'C1', skill: 'grammar', difficulty: 5,
    question: '"Not only ___ she late, but she also forgot her documents." Complete.',
    options: ['was', 'she was', 'has she been', 'she had been'],
    correct: 0,
    explanation: 'After "not only" at the start of a sentence, inversion is required: Not only was she...',
    rule: 'Inversion: "Not only was she...", "Rarely does he...", "Hardly had I..."'
  },
  {
    id: 'q032', level: 'C1', skill: 'vocabulary', difficulty: 5,
    question: 'What does "ubiquitous" mean?',
    options: ['rare / unusual', 'present everywhere', 'confusing / unclear', 'temporary'],
    correct: 1,
    explanation: '"Ubiquitous" means found or appearing everywhere at the same time.',
    rule: 'Advanced vocabulary: ubiquitous = omnipresente, ubicuo.'
  },
  {
    id: 'q033', level: 'C1', skill: 'grammar', difficulty: 5,
    question: 'Identify the correct use of the subjunctive: ',
    options: [
      'It is essential that he leaves now.',
      'It is essential that he leave now.',
      'It is essential that he will leave now.',
      'It is essential that he left now.'
    ],
    correct: 1,
    explanation: 'After "It is essential/important/necessary that...", use the base form of the verb (subjunctive).',
    rule: 'Subjunctive: It is essential/vital/important/necessary that + subject + base form.'
  },

  // ---- C2 Level Questions ----
  {
    id: 'q034', level: 'C2', skill: 'grammar', difficulty: 6,
    question: '"___ the committee reached a decision, the project can begin." Which option is correct?',
    options: ['Until', 'Once', 'Unless', 'Despite'],
    correct: 1,
    explanation: '"Once" means "as soon as" — after the decision is made, the project can start.',
    rule: 'Connectors: once = tan pronto como / una vez que.'
  },
  {
    id: 'q035', level: 'C2', skill: 'vocabulary', difficulty: 6,
    question: 'Which word best replaces "make worse" in a formal text?',
    options: ['intensify', 'exacerbate', 'amplify', 'accelerate'],
    correct: 1,
    explanation: '"Exacerbate" specifically means to make a problem or bad situation worse.',
    rule: 'Advanced synonym: exacerbate = agravar, empeorar.'
  },
  {
    id: 'q036', level: 'C2', skill: 'reading', difficulty: 6,
    question: 'Read: "The author\'s use of chiasmus creates a memorable rhetorical effect." What does "chiasmus" most likely refer to?',
    options: [
      'A long, complex sentence',
      'A reversal of words in parallel phrases',
      'A type of metaphor',
      'An exaggerated comparison'
    ],
    correct: 1,
    explanation: '"Chiasmus" is a rhetorical device where words/concepts are reversed: "Ask not what your country can do for you, ask what you can do for your country."',
    rule: 'Literary devices: chiasmus = inversión paralela de palabras.'
  },
  {
    id: 'q037', level: 'C2', skill: 'grammar', difficulty: 6,
    question: '"The data ___ to support the hypothesis." Which is the most natural formal phrasing?',
    options: ['seems', 'appear', 'appears', 'is appearing'],
    correct: 2,
    explanation: '"Data" in formal/academic British English can be treated as plural (appear) or singular (appears) — both are accepted, but "appears" is increasingly common.',
    rule: '"Data" can be singular or plural in formal English. "Appears" is now widely accepted.'
  },
  {
    id: 'q038', level: 'C2', skill: 'vocabulary', difficulty: 6,
    question: 'Choose the most precise word: "Her smile was ___ — it conveyed sadness beneath apparent happiness."',
    options: ['bittersweet', 'ambiguous', 'melancholy', 'wistful'],
    correct: 3,
    explanation: '"Wistful" precisely describes a feeling of vague longing or regret, often shown through a pensive smile.',
    rule: 'Nuanced vocabulary: wistful = nostálgico, melancólico con añoranza.'
  },
];

// Assessment configuration
const ASSESSMENT_CONFIG = {
  totalQuestions: 20,
  startDifficulty: 2,
  maxDifficulty: 6,
  minDifficulty: 1,
  correctBonus: 1,
  wrongPenalty: 1,
  skillAreas: ['grammar', 'vocabulary', 'reading'],
};

// Level determination based on score
function determineCEFRLevel(score, total) {
  const pct = score / total;
  if (pct >= 0.95) return 'C2';
  if (pct >= 0.82) return 'C1';
  if (pct >= 0.68) return 'B2';
  if (pct >= 0.52) return 'B1';
  if (pct >= 0.35) return 'A2';
  return 'A1';
}

// Get questions for assessment session
function getAssessmentQuestions(count = 20) {
  // Spread across skills and levels
  const selected = [];
  const skills = ['grammar', 'vocabulary', 'reading'];
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  // Pick ~2 per skill per level up to count
  for (const level of levels) {
    for (const skill of skills) {
      const pool = ASSESSMENT_QUESTIONS.filter(q => q.level === level && q.skill === skill);
      if (pool.length > 0) {
        selected.push(pool[Math.floor(Math.random() * pool.length)]);
      }
      if (selected.length >= count) break;
    }
    if (selected.length >= count) break;
  }

  // Fill remainder randomly
  while (selected.length < count) {
    const remaining = ASSESSMENT_QUESTIONS.filter(q => !selected.find(s => s.id === q.id));
    if (remaining.length === 0) break;
    selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
  }

  return selected.slice(0, count).sort(() => Math.random() - 0.5);
}
