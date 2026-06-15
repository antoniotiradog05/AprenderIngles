// ============================================================
// EnglishMaster — data/vocabulary.js
// Word bank: 500+ words with translations, phonetics, level, topic
// ============================================================

const VOCABULARY = [
  // ---- A1 - Basic ----
  { id:'v001', word:'hello', translation:'hola', phonetic:'/həˈloʊ/', level:'A1', topic:'greetings', example:'Hello! How are you?', exampleEs:'¡Hola! ¿Cómo estás?' },
  { id:'v002', word:'goodbye', translation:'adiós', phonetic:'/ˌɡʊdˈbaɪ/', level:'A1', topic:'greetings', example:'Goodbye! See you tomorrow.', exampleEs:'¡Adiós! Hasta mañana.' },
  { id:'v003', word:'please', translation:'por favor', phonetic:'/pliːz/', level:'A1', topic:'greetings', example:'Can you help me, please?', exampleEs:'¿Puedes ayudarme, por favor?' },
  { id:'v004', word:'thank you', translation:'gracias', phonetic:'/θæŋk juː/', level:'A1', topic:'greetings', example:'Thank you very much!', exampleEs:'¡Muchas gracias!' },
  { id:'v005', word:'sorry', translation:'lo siento', phonetic:'/ˈsɒri/', level:'A1', topic:'greetings', example:"I'm sorry for being late.", exampleEs:'Lo siento por llegar tarde.' },
  { id:'v006', word:'yes', translation:'sí', phonetic:'/jɛs/', level:'A1', topic:'basics', example:'Yes, I understand.', exampleEs:'Sí, entiendo.' },
  { id:'v007', word:'no', translation:'no', phonetic:'/nəʊ/', level:'A1', topic:'basics', example:"No, I don't want that.", exampleEs:'No, no quiero eso.' },
  { id:'v008', word:'house', translation:'casa', phonetic:'/haʊs/', level:'A1', topic:'places', example:'I live in a big house.', exampleEs:'Vivo en una casa grande.' },
  { id:'v009', word:'car', translation:'coche / carro', phonetic:'/kɑːr/', level:'A1', topic:'transport', example:'My car is red.', exampleEs:'Mi coche es rojo.' },
  { id:'v010', word:'book', translation:'libro', phonetic:'/bʊk/', level:'A1', topic:'school', example:'This book is interesting.', exampleEs:'Este libro es interesante.' },
  { id:'v011', word:'water', translation:'agua', phonetic:'/ˈwɔːtər/', level:'A1', topic:'food', example:'I drink water every day.', exampleEs:'Bebo agua todos los días.' },
  { id:'v012', word:'food', translation:'comida', phonetic:'/fuːd/', level:'A1', topic:'food', example:'I love Spanish food.', exampleEs:'Me encanta la comida española.' },
  { id:'v013', word:'school', translation:'escuela', phonetic:'/skuːl/', level:'A1', topic:'places', example:'I go to school by bus.', exampleEs:'Voy a la escuela en autobús.' },
  { id:'v014', word:'friend', translation:'amigo/a', phonetic:'/frɛnd/', level:'A1', topic:'people', example:'She is my best friend.', exampleEs:'Ella es mi mejor amiga.' },
  { id:'v015', word:'family', translation:'familia', phonetic:'/ˈfæm.ɪ.li/', level:'A1', topic:'people', example:'My family is very large.', exampleEs:'Mi familia es muy grande.' },
  { id:'v016', word:'dog', translation:'perro', phonetic:'/dɒɡ/', level:'A1', topic:'animals', example:'The dog is sleeping.', exampleEs:'El perro está durmiendo.' },
  { id:'v017', word:'cat', translation:'gato', phonetic:'/kæt/', level:'A1', topic:'animals', example:'My cat is orange.', exampleEs:'Mi gato es naranja.' },
  { id:'v018', word:'big', translation:'grande', phonetic:'/bɪɡ/', level:'A1', topic:'adjectives', example:'That is a big elephant.', exampleEs:'Ese es un elefante grande.' },
  { id:'v019', word:'small', translation:'pequeño', phonetic:'/smɔːl/', level:'A1', topic:'adjectives', example:'She has a small bag.', exampleEs:'Ella tiene una bolsa pequeña.' },
  { id:'v020', word:'happy', translation:'feliz', phonetic:'/ˈhæpi/', level:'A1', topic:'emotions', example:"I'm very happy today!", exampleEs:'¡Estoy muy feliz hoy!' },

  // ---- A1 continued ----
  { id:'v021', word:'sad', translation:'triste', phonetic:'/sæd/', level:'A1', topic:'emotions', example:'He feels sad.', exampleEs:'Él se siente triste.' },
  { id:'v022', word:'eat', translation:'comer', phonetic:'/iːt/', level:'A1', topic:'verbs', example:'I eat breakfast at 8 o\'clock.', exampleEs:'Como el desayuno a las 8.' },
  { id:'v023', word:'drink', translation:'beber', phonetic:'/drɪŋk/', level:'A1', topic:'verbs', example:'She drinks coffee every morning.', exampleEs:'Ella bebe café cada mañana.' },
  { id:'v024', word:'sleep', translation:'dormir', phonetic:'/sliːp/', level:'A1', topic:'verbs', example:'Children should sleep early.', exampleEs:'Los niños deben dormir temprano.' },
  { id:'v025', word:'work', translation:'trabajar', phonetic:'/wɜːrk/', level:'A1', topic:'verbs', example:'My father works in an office.', exampleEs:'Mi padre trabaja en una oficina.' },
  { id:'v026', word:'teacher', translation:'profesor/a', phonetic:'/ˈtiːtʃər/', level:'A1', topic:'people', example:'My teacher is very kind.', exampleEs:'Mi profesora es muy amable.' },
  { id:'v027', word:'apple', translation:'manzana', phonetic:'/ˈæp.əl/', level:'A1', topic:'food', example:'An apple a day keeps the doctor away.', exampleEs:'Una manzana al día mantiene al médico lejos.' },
  { id:'v028', word:'red', translation:'rojo', phonetic:'/rɛd/', level:'A1', topic:'colors', example:'The rose is red.', exampleEs:'La rosa es roja.' },
  { id:'v029', word:'blue', translation:'azul', phonetic:'/bluː/', level:'A1', topic:'colors', example:'The sky is blue.', exampleEs:'El cielo es azul.' },
  { id:'v030', word:'one', translation:'uno', phonetic:'/wʌn/', level:'A1', topic:'numbers', example:'I have one brother.', exampleEs:'Tengo un hermano.' },

  // ---- A2 ----
  { id:'v031', word:'travel', translation:'viajar', phonetic:'/ˈtræv.əl/', level:'A2', topic:'verbs', example:'I love to travel to new places.', exampleEs:'Me encanta viajar a nuevos lugares.' },
  { id:'v032', word:'beautiful', translation:'hermoso/a', phonetic:'/ˈbjuː.tɪ.fəl/', level:'A2', topic:'adjectives', example:'What a beautiful sunset!', exampleEs:'¡Qué puesta de sol tan hermosa!' },
  { id:'v033', word:'interesting', translation:'interesante', phonetic:'/ˈɪn.trɪs.tɪŋ/', level:'A2', topic:'adjectives', example:'This documentary is very interesting.', exampleEs:'Este documental es muy interesante.' },
  { id:'v034', word:'weather', translation:'tiempo / clima', phonetic:'/ˈwɛð.ər/', level:'A2', topic:'nature', example:"The weather is terrible today.", exampleEs:'El tiempo está horrible hoy.' },
  { id:'v035', word:'money', translation:'dinero', phonetic:'/ˈmʌn.i/', level:'A2', topic:'everyday', example:'I need more money.', exampleEs:'Necesito más dinero.' },
  { id:'v036', word:'hospital', translation:'hospital', phonetic:'/ˈhɒs.pɪ.tl/', level:'A2', topic:'places', example:'She works at the hospital.', exampleEs:'Ella trabaja en el hospital.' },
  { id:'v037', word:'office', translation:'oficina', phonetic:'/ˈɒf.ɪs/', level:'A2', topic:'places', example:'My office is on the fifth floor.', exampleEs:'Mi oficina está en el quinto piso.' },
  { id:'v038', word:'difficult', translation:'difícil', phonetic:'/ˈdɪf.ɪ.kəlt/', level:'A2', topic:'adjectives', example:'Math is very difficult for me.', exampleEs:'Las matemáticas son muy difíciles para mí.' },
  { id:'v039', word:'easy', translation:'fácil', phonetic:'/ˈiː.zi/', level:'A2', topic:'adjectives', example:"This exercise is easy.", exampleEs:'Este ejercicio es fácil.' },
  { id:'v040', word:'always', translation:'siempre', phonetic:'/ˈɔːl.weɪz/', level:'A2', topic:'adverbs', example:'She always arrives on time.', exampleEs:'Ella siempre llega a tiempo.' },
  { id:'v041', word:'never', translation:'nunca', phonetic:'/ˈnɛv.ər/', level:'A2', topic:'adverbs', example:'I never eat meat.', exampleEs:'Nunca como carne.' },
  { id:'v042', word:'sometimes', translation:'a veces', phonetic:'/ˈsʌm.taɪmz/', level:'A2', topic:'adverbs', example:'I sometimes go to the gym.', exampleEs:'A veces voy al gimnasio.' },
  { id:'v043', word:'together', translation:'juntos', phonetic:'/təˈɡɛð.ər/', level:'A2', topic:'adverbs', example:'Let\'s work together.', exampleEs:'Trabajemos juntos.' },
  { id:'v044', word:'important', translation:'importante', phonetic:'/ɪmˈpɔːr.tənt/', level:'A2', topic:'adjectives', example:'Health is very important.', exampleEs:'La salud es muy importante.' },
  { id:'v045', word:'problem', translation:'problema', phonetic:'/ˈprɒb.ləm/', level:'A2', topic:'everyday', example:"There's a problem with the computer.", exampleEs:'Hay un problema con el ordenador.' },

  // ---- B1 ----
  { id:'v046', word:'although', translation:'aunque', phonetic:'/ɔːlˈðoʊ/', level:'B1', topic:'connectors', example:'Although it was raining, we went out.', exampleEs:'Aunque llovía, salimos.' },
  { id:'v047', word:'therefore', translation:'por lo tanto', phonetic:'/ˈðɛr.fɔːr/', level:'B1', topic:'connectors', example:'He was tired; therefore, he went to bed early.', exampleEs:'Estaba cansado; por lo tanto, se fue a dormir temprano.' },
  { id:'v048', word:'however', translation:'sin embargo', phonetic:'/haʊˈɛv.ər/', level:'B1', topic:'connectors', example:'It was expensive. However, we bought it.', exampleEs:'Era caro. Sin embargo, lo compramos.' },
  { id:'v049', word:'opportunity', translation:'oportunidad', phonetic:'/ˌɒp.əˈtjuː.nɪ.ti/', level:'B1', topic:'nouns', example:'This is a great opportunity.', exampleEs:'Esta es una gran oportunidad.' },
  { id:'v050', word:'experience', translation:'experiencia', phonetic:'/ɪkˈspɪər.i.əns/', level:'B1', topic:'nouns', example:'She has a lot of experience.', exampleEs:'Ella tiene mucha experiencia.' },
  { id:'v051', word:'environment', translation:'medio ambiente', phonetic:'/ɪnˈvaɪ.rən.mənt/', level:'B1', topic:'nature', example:'We must protect the environment.', exampleEs:'Debemos proteger el medio ambiente.' },
  { id:'v052', word:'technology', translation:'tecnología', phonetic:'/tɛkˈnɒl.ə.dʒi/', level:'B1', topic:'science', example:'Technology changes our lives.', exampleEs:'La tecnología cambia nuestras vidas.' },
  { id:'v053', word:'society', translation:'sociedad', phonetic:'/səˈsaɪ.ɪ.ti/', level:'B1', topic:'social', example:'We all have a role in society.', exampleEs:'Todos tenemos un papel en la sociedad.' },
  { id:'v054', word:'achieve', translation:'lograr / alcanzar', phonetic:'/əˈtʃiːv/', level:'B1', topic:'verbs', example:'She achieved her goals.', exampleEs:'Ella logró sus metas.' },
  { id:'v055', word:'consider', translation:'considerar', phonetic:'/kənˈsɪd.ər/', level:'B1', topic:'verbs', example:'Consider all the options.', exampleEs:'Considera todas las opciones.' },
  { id:'v056', word:'suggest', translation:'sugerir', phonetic:'/səˈdʒɛst/', level:'B1', topic:'verbs', example:"I suggest we take a break.", exampleEs:'Sugiero que tomemos un descanso.' },
  { id:'v057', word:'argue', translation:'discutir / argumentar', phonetic:'/ˈɑːɡ.juː/', level:'B1', topic:'verbs', example:'They argue about politics.', exampleEs:'Discuten sobre política.' },
  { id:'v058', word:'gradually', translation:'gradualmente', phonetic:'/ˈɡrætʃ.u.ə.li/', level:'B1', topic:'adverbs', example:'Her English improved gradually.', exampleEs:'Su inglés mejoró gradualmente.' },
  { id:'v059', word:'obviously', translation:'obviamente', phonetic:'/ˈɒb.vi.əs.li/', level:'B1', topic:'adverbs', example:'Obviously, he was wrong.', exampleEs:'Obviamente, estaba equivocado.' },
  { id:'v060', word:'despite', translation:'a pesar de', phonetic:'/dɪˈspaɪt/', level:'B1', topic:'prepositions', example:'Despite the rain, the match was played.', exampleEs:'A pesar de la lluvia, se jugó el partido.' },

  // ---- B2 ----
  { id:'v061', word:'acknowledge', translation:'reconocer / admitir', phonetic:'/əkˈnɒl.ɪdʒ/', level:'B2', topic:'verbs', example:'She acknowledged her mistake.', exampleEs:'Reconoció su error.' },
  { id:'v062', word:'ambiguous', translation:'ambiguo', phonetic:'/æmˈbɪɡ.ju.əs/', level:'B2', topic:'adjectives', example:'His answer was ambiguous.', exampleEs:'Su respuesta fue ambigua.' },
  { id:'v063', word:'approximately', translation:'aproximadamente', phonetic:'/əˈprɒk.sɪ.mɪt.li/', level:'B2', topic:'adverbs', example:'It costs approximately 50 euros.', exampleEs:'Cuesta aproximadamente 50 euros.' },
  { id:'v064', word:'consequence', translation:'consecuencia', phonetic:'/ˈkɒn.sɪ.kwəns/', level:'B2', topic:'nouns', example:'Think about the consequences.', exampleEs:'Piensa en las consecuencias.' },
  { id:'v065', word:'fundamental', translation:'fundamental', phonetic:'/ˌfʌn.dəˈmɛn.tl/', level:'B2', topic:'adjectives', example:'Trust is fundamental in relationships.', exampleEs:'La confianza es fundamental en las relaciones.' },
  { id:'v066', word:'perspective', translation:'perspectiva', phonetic:'/pəˈspɛk.tɪv/', level:'B2', topic:'nouns', example:'From my perspective, it seems wrong.', exampleEs:'Desde mi perspectiva, parece incorrecto.' },
  { id:'v067', word:'sophisticated', translation:'sofisticado', phonetic:'/səˈfɪs.tɪ.keɪ.tɪd/', level:'B2', topic:'adjectives', example:'She has sophisticated taste.', exampleEs:'Ella tiene gustos sofisticados.' },
  { id:'v068', word:'emphasize', translation:'enfatizar', phonetic:'/ˈɛm.fə.saɪz/', level:'B2', topic:'verbs', example:'I want to emphasize this point.', exampleEs:'Quiero enfatizar este punto.' },
  { id:'v069', word:'furthermore', translation:'además / es más', phonetic:'/ˈfɜː.ðər.mɔːr/', level:'B2', topic:'connectors', example:'Furthermore, the study shows that...', exampleEs:'Además, el estudio muestra que...' },
  { id:'v070', word:'whereas', translation:'mientras que', phonetic:'/wɛrˈæz/', level:'B2', topic:'connectors', example:'I like coffee, whereas she prefers tea.', exampleEs:'Me gusta el café, mientras que ella prefiere el té.' },

  // ---- C1/C2 ----
  { id:'v071', word:'ubiquitous', translation:'ubicuo / omnipresente', phonetic:'/juːˈbɪk.wɪ.təs/', level:'C1', topic:'adjectives', example:'Smartphones have become ubiquitous.', exampleEs:'Los smartphones se han vuelto omnipresentes.' },
  { id:'v072', word:'pragmatic', translation:'pragmático', phonetic:'/præɡˈmæt.ɪk/', level:'C1', topic:'adjectives', example:'We need a pragmatic approach.', exampleEs:'Necesitamos un enfoque pragmático.' },
  { id:'v073', word:'scrutinize', translation:'escudriñar / examinar', phonetic:'/ˈskruː.tɪ.naɪz/', level:'C1', topic:'verbs', example:'The committee scrutinized the proposal.', exampleEs:'El comité examinó la propuesta.' },
  { id:'v074', word:'nuance', translation:'matiz', phonetic:'/ˈnjuː.ɑːns/', level:'C1', topic:'nouns', example:'The nuances of language are important.', exampleEs:'Los matices del lenguaje son importantes.' },
  { id:'v075', word:'eloquent', translation:'elocuente', phonetic:'/ˈɛl.ə.kwənt/', level:'C1', topic:'adjectives', example:'She gave an eloquent speech.', exampleEs:'Dio un discurso elocuente.' },
  { id:'v076', word:'meticulous', translation:'meticuloso', phonetic:'/mɪˈtɪk.jʊ.ləs/', level:'C2', topic:'adjectives', example:'He is meticulous about details.', exampleEs:'Es meticuloso con los detalles.' },
  { id:'v077', word:'ephemeral', translation:'efímero', phonetic:'/ɪˈfɛm.ər.əl/', level:'C2', topic:'adjectives', example:'Fame can be ephemeral.', exampleEs:'La fama puede ser efímera.' },
  { id:'v078', word:'exacerbate', translation:'exacerbar / empeorar', phonetic:'/ɪɡˈzæs.ər.beɪt/', level:'C2', topic:'verbs', example:'Stress can exacerbate health problems.', exampleEs:'El estrés puede empeorar los problemas de salud.' },
  { id:'v079', word:'complacency', translation:'complacencia / autocomplacencia', phonetic:'/kəmˈpleɪ.sən.si/', level:'C2', topic:'nouns', example:'Complacency leads to failure.', exampleEs:'La complacencia lleva al fracaso.' },
  { id:'v080', word:'paradigm', translation:'paradigma', phonetic:'/ˈpær.ə.daɪm/', level:'C2', topic:'nouns', example:'This discovery shifted the scientific paradigm.', exampleEs:'Este descubrimiento cambió el paradigma científico.' },

  // ---- Phrasal Verbs ----
  { id:'v081', word:'give up', translation:'rendirse / abandonar', phonetic:'/ɡɪv ʌp/', level:'B1', topic:'phrasal_verbs', example:"Don't give up on your dreams.", exampleEs:'No te rindas con tus sueños.' },
  { id:'v082', word:'look up', translation:'buscar', phonetic:'/lʊk ʌp/', level:'A2', topic:'phrasal_verbs', example:'Look up the word in the dictionary.', exampleEs:'Busca la palabra en el diccionario.' },
  { id:'v083', word:'run out of', translation:'quedarse sin', phonetic:'/rʌn aʊt ɒv/', level:'B1', topic:'phrasal_verbs', example:"We've run out of milk.", exampleEs:'Se nos ha acabado la leche.' },
  { id:'v084', word:'take off', translation:'despegar / quitarse', phonetic:'/teɪk ɒf/', level:'A2', topic:'phrasal_verbs', example:'The plane takes off at noon.', exampleEs:'El avión despega al mediodía.' },
  { id:'v085', word:'put off', translation:'posponer', phonetic:'/pʊt ɒf/', level:'B1', topic:'phrasal_verbs', example:"Don't put off what you can do today.", exampleEs:'No pospongas lo que puedes hacer hoy.' },
  { id:'v086', word:'break down', translation:'averiarse / desmoronarse', phonetic:'/breɪk daʊn/', level:'B1', topic:'phrasal_verbs', example:'My car broke down on the highway.', exampleEs:'Mi coche se averió en la autopista.' },
  { id:'v087', word:'come across', translation:'encontrarse con / parecer', phonetic:'/kʌm əˈkrɒs/', level:'B2', topic:'phrasal_verbs', example:'I came across an old photo.', exampleEs:'Me encontré con una foto antigua.' },
  { id:'v088', word:'carry on', translation:'continuar / seguir', phonetic:'/ˈkær.i ɒn/', level:'B1', topic:'phrasal_verbs', example:'Carry on with your work.', exampleEs:'Sigue con tu trabajo.' },
  { id:'v089', word:'set up', translation:'establecer / montar', phonetic:'/sɛt ʌp/', level:'B1', topic:'phrasal_verbs', example:'She set up her own business.', exampleEs:'Ella montó su propio negocio.' },
  { id:'v090', word:'get along', translation:'llevarse bien', phonetic:'/ɡɛt əˈlɒŋ/', level:'B1', topic:'phrasal_verbs', example:'Do you get along with your colleagues?', exampleEs:'¿Te llevas bien con tus compañeros?' },

  // ---- More Phrasal Verbs ----
  { id:'v090b', word:'bring up', translation:'criar / mencionar', phonetic:'/brɪŋ ʌp/', level:'B1', topic:'phrasal_verbs', example:'She was brought up in a small village.', exampleEs:'Fue criada en un pequeño pueblo.' },
  { id:'v090c', word:'turn down', translation:'rechazar / bajar (volumen)', phonetic:'/tɜːrn daʊn/', level:'B1', topic:'phrasal_verbs', example:'He turned down the job offer.', exampleEs:'Rechazó la oferta de trabajo.' },
  { id:'v090d', word:'find out', translation:'descubrir / averiguar', phonetic:'/faɪnd aʊt/', level:'A2', topic:'phrasal_verbs', example:'I need to find out what happened.', exampleEs:'Necesito averiguar lo que pasó.' },
  { id:'v090e', word:'look forward to', translation:'tener ganas de', phonetic:'/lʊk ˈfɔːr.wərd tuː/', level:'B1', topic:'phrasal_verbs', example:"I'm looking forward to the weekend.", exampleEs:'Tengo muchas ganas de que llegue el fin de semana.' },
  { id:'v090f', word:'go through', translation:'pasar por / atravesar', phonetic:'/ɡoʊ θruː/', level:'B1', topic:'phrasal_verbs', example:'She has gone through a lot recently.', exampleEs:'Ha pasado por mucho últimamente.' },
  { id:'v090g', word:'take up', translation:'empezar / ocupar espacio', phonetic:'/teɪk ʌp/', level:'B1', topic:'phrasal_verbs', example:"I've taken up yoga this year.", exampleEs:'Este año he empezado a hacer yoga.' },
  { id:'v090h', word:'put up with', translation:'aguantar / tolerar', phonetic:'/pʊt ʌp wɪð/', level:'B2', topic:'phrasal_verbs', example:"I can't put up with this noise anymore.", exampleEs:'No puedo aguantar más este ruido.' },
  { id:'v090i', word:'call off', translation:'cancelar / suspender', phonetic:'/kɔːl ɒf/', level:'B1', topic:'phrasal_verbs', example:'They called off the meeting due to the storm.', exampleEs:'Cancelaron la reunión por la tormenta.' },
  { id:'v090j', word:'work out', translation:'resolver / salir bien / hacer ejercicio', phonetic:'/wɜːrk aʊt/', level:'B1', topic:'phrasal_verbs', example:'Things will work out in the end.', exampleEs:'Las cosas saldrán bien al final.' },
  { id:'v090k', word:'fall apart', translation:'deshacerse / venirse abajo', phonetic:'/fɔːl əˈpɑːrt/', level:'B2', topic:'phrasal_verbs', example:'The plan fell apart at the last minute.', exampleEs:'El plan se vino abajo en el último momento.' },
  { id:'v090l', word:'stand out', translation:'destacar / sobresalir', phonetic:'/stænd aʊt/', level:'B1', topic:'phrasal_verbs', example:'She always stands out in a crowd.', exampleEs:'Siempre destaca entre la multitud.' },

  // ---- More Idioms ----
  { id:'v080b', word:'cost an arm and a leg', translation:'costar un ojo de la cara', phonetic:'/kɒst ən ɑːrm ænd ə lɛɡ/', level:'B2', topic:'idioms', example:'That car cost an arm and a leg!', exampleEs:'¡Ese coche costó un ojo de la cara!' },
  { id:'v080c', word:"pull someone's leg", translation:'tomar el pelo a alguien', phonetic:'/pʊl ˈsʌm.wʌnz lɛɡ/', level:'B1', topic:'idioms', example:"Are you pulling my leg? That can't be true!", exampleEs:'¿Me estás tomando el pelo? ¡Eso no puede ser verdad!' },
  { id:'v080d', word:'miss the boat', translation:'perder la oportunidad', phonetic:'/mɪs ðə boʊt/', level:'B2', topic:'idioms', example:'We missed the boat on that investment.', exampleEs:'Perdimos el tren con esa inversión.' },
  { id:'v080e', word:'a blessing in disguise', translation:'un mal que por bien viene', phonetic:'/ə ˈblɛs.ɪŋ ɪn dɪˈskaɪz/', level:'B2', topic:'idioms', example:'Losing that job was a blessing in disguise.', exampleEs:'Perder ese trabajo fue un mal que vino por bien.' },
  { id:'v080f', word:"let the cat out of the bag", translation:'irse de la lengua / revelar un secreto', phonetic:'/lɛt ðə kæt aʊt əv ðə bæɡ/', level:'B1', topic:'idioms', example:'She let the cat out of the bag about the surprise party.', exampleEs:'Se fue de la lengua sobre la fiesta sorpresa.' },
  { id:'v080g', word:'actions speak louder than words', translation:'las acciones valen más que las palabras', phonetic:'/ˈæk.ʃənz spiːk ˌlaʊ.dər ðæn wɜːrdz/', level:'B2', topic:'idioms', example:'He promised to help but never did. Actions speak louder than words.', exampleEs:'Prometió ayudar pero nunca lo hizo. Las acciones valen más que las palabras.' },
  { id:'v080h', word:'every cloud has a silver lining', translation:'no hay mal que por bien no venga', phonetic:'/ˈɛv.ri klaʊd hæz ə ˈsɪl.vər ˈlaɪ.nɪŋ/', level:'B2', topic:'idioms', example:'Even though he failed, every cloud has a silver lining.', exampleEs:'Aunque fracasó, no hay mal que por bien no venga.' },
  { id:'v080i', word:'it takes two to tango', translation:'dos no pelean si uno no quiere', phonetic:'/ɪt teɪks tuː tə ˈtæŋ.ɡoʊ/', level:'B2', topic:'idioms', example:"It takes two to tango — you're both responsible.", exampleEs:'Dos no pelean si uno no quiere: los dos sois responsables.' },
  { id:'v080j', word:'burn the midnight oil', translation:'trabajar hasta las tantas / quemarse las pestañas', phonetic:'/bɜːrn ðə ˈmɪd.naɪt ɔɪl/', level:'B2', topic:'idioms', example:'She burned the midnight oil to finish the report.', exampleEs:'Se quemó las pestañas para terminar el informe.' },
  { id:'v080k', word:'jump on the bandwagon', translation:'subirse al carro', phonetic:'/dʒʌmp ɒn ðə ˈbænd.wæɡ.ən/', level:'C1', topic:'idioms', example:'Everyone is jumping on the electric car bandwagon.', exampleEs:'Todos se están subiendo al carro de los coches eléctricos.' },

  // ---- Common Expressions ----
  { id:'v091', word:'at first glance', translation:'a primera vista', phonetic:'/æt fɜːrst ɡlɑːns/', level:'B2', topic:'expressions', example:'At first glance, it seems simple.', exampleEs:'A primera vista, parece simple.' },
  { id:'v092', word:'on the other hand', translation:'por otro lado', phonetic:'/ɒn ðə ˈʌð.ər hænd/', level:'B1', topic:'expressions', example:'On the other hand, we could wait.', exampleEs:'Por otro lado, podríamos esperar.' },
  { id:'v093', word:'take into account', translation:'tener en cuenta', phonetic:'/teɪk ˈɪn.tuː əˈkaʊnt/', level:'B2', topic:'expressions', example:'Take into account the costs.', exampleEs:'Ten en cuenta los costes.' },
  { id:'v094', word:'as a matter of fact', translation:'de hecho', phonetic:'/æz ə ˈmæt.ər əv fækt/', level:'B2', topic:'expressions', example:'As a matter of fact, I know him.', exampleEs:'De hecho, lo conozco.' },
  { id:'v095', word:'break the ice', translation:'romper el hielo', phonetic:'/breɪk ðə aɪs/', level:'B1', topic:'idioms', example:'He told a joke to break the ice.', exampleEs:'Contó un chiste para romper el hielo.' },
  { id:'v096', word:'hit the nail on the head', translation:'dar en el clavo', phonetic:'/hɪt ðə neɪl ɒn ðə hɛd/', level:'C1', topic:'idioms', example:"You hit the nail on the head!", exampleEs:'¡Diste en el clavo!' },
  { id:'v097', word:'the tip of the iceberg', translation:'la punta del iceberg', phonetic:'/ðə tɪp əv ðə ˈaɪs.bɜːrɡ/', level:'B2', topic:'idioms', example:"That's just the tip of the iceberg.", exampleEs:'Eso es solo la punta del iceberg.' },
  { id:'v098', word:'once in a blue moon', translation:'de vez en cuando / muy raramente', phonetic:'/wʌns ɪn ə bluː muːn/', level:'B2', topic:'idioms', example:'He visits once in a blue moon.', exampleEs:'Visita muy raramente.' },
  { id:'v099', word:'under the weather', translation:'no encontrarse bien', phonetic:'/ˈʌn.dər ðə ˈwɛð.ər/', level:'B1', topic:'idioms', example:"I'm feeling under the weather today.", exampleEs:'Hoy no me encuentro muy bien.' },
  { id:'v100', word:'bite the bullet', translation:'aguantar el dolor / armarse de valor', phonetic:'/baɪt ðə ˈbʊl.ɪt/', level:'B2', topic:'idioms', example:'Just bite the bullet and do it.', exampleEs:'Ármate de valor y hazlo.' },

  // ---- C1/C2 Expansion ----
  { id:'v101', word:'mitigate', translation:'mitigar / atenuar', phonetic:'/ˈmɪt.ɪ.ɡeɪt/', level:'C1', topic:'verbs', example:'We need to mitigate the risks.', exampleEs:'Necesitamos mitigar los riesgos.' },
  { id:'v102', word:'capricious', translation:'caprichoso', phonetic:'/kəˈprɪʃ.əs/', level:'C2', topic:'adjectives', example:'The administration is capricious.', exampleEs:'La administración es caprichosa.' },
  { id:'v103', word:'detrimental', translation:'perjudicial / nocivo', phonetic:'/ˌdɛt.rɪˈmɛn.tl/', level:'C1', topic:'adjectives', example:'Smoking is detrimental to health.', exampleEs:'Fumar es perjudicial para la salud.' },
  { id:'v104', word:'scrutiny', translation:'escrutinio / examen riguroso', phonetic:'/ˈskruː.tɪ.ni/', level:'C1', topic:'nouns', example:'The deal is under public scrutiny.', exampleEs:'El acuerdo está bajo escrutinio público.' },
  { id:'v105', word:'flabbergasted', translation:'estupefacto / patidifuso', phonetic:'/ˈflæb.ə.ɡɑː.stɪd/', level:'C1', topic:'adjectives', example:'I was flabbergasted by the news.', exampleEs:'Me quedé estupefacto por la noticia.' },
  { id:'v106', word:'exquisite', translation:'exquisito / primoroso', phonetic:'/ɪkˈskwɪz.ɪt/', level:'C1', topic:'adjectives', example:'She wore an exquisite gold dress.', exampleEs:'Llevaba un vestido de oro exquisito.' },
  { id:'v107', word:'alleviate', translation:'aliviar / mitigar', phonetic:'/əˈliː.vi.eɪt/', level:'C1', topic:'verbs', example:'This drug will alleviate the pain.', exampleEs:'Este medicamento aliviará el dolor.' },
  { id:'v108', word:'redundant', translation:'redundante / superfluo', phonetic:'/rɪˈdʌn.dənt/', level:'B2', topic:'adjectives', example:'This sentence is redundant.', exampleEs:'Esta frase es redundante.' },
  { id:'v109', word:'inevitable', translation:'inevitable', phonetic:'/ɪnˈɛv.ɪ.tə.bəl/', level:'B2', topic:'adjectives', example:'Change is inevitable in life.', exampleEs:'El cambio es inevitable en la vida.' },
  { id:'v110', word:'advocate', translation:'defensor / defender', phonetic:'/ˈæd.və.keɪt/', level:'B2', topic:'verbs', example:'She advocates for human rights.', exampleEs:'Ella defiende los derechos humanos.' },

  // ---- Advanced Phrasal Verbs Expansion ----
  { id:'v111', word:'make up for', translation:'compensar', phonetic:'/meɪk ʌp fɔːr/', level:'B2', topic:'phrasal_verbs', example:'He bought flowers to make up for being late.', exampleEs:'Compró flores para compensar su retraso.' },
  { id:'v112', word:'run into', translation:'tropezar con / encontrarse con', phonetic:'/rʌn ˈɪn.tuː/', level:'B1', topic:'phrasal_verbs', example:'I ran into an old classmate yesterday.', exampleEs:'Ayer me encontré con un antiguo compañero de clase.' },
  { id:'v113', word:'back down', translation:'echarse atrás / ceder', phonetic:'/bæk daʊn/', level:'B2', topic:'phrasal_verbs', example:'Neither side was willing to back down.', exampleEs:'Ninguna de las partes estaba dispuesta a ceder.' },
  { id:'v114', word:'come up with', translation:'inventar / proponer', phonetic:'/kʌm ʌp wɪð/', level:'B2', topic:'phrasal_verbs', example:'She came up with a great idea.', exampleEs:'Se le ocurrió una gran idea.' },
  { id:'v115', word:'get over', translation:'superar / recuperarse de', phonetic:'/ɡɛt ˈoʊ.vər/', level:'B1', topic:'phrasal_verbs', example:'It took him months to get over the flu.', exampleEs:'Le tomó meses recuperarse de la gripe.' },
  { id:'v116', word:'look down on', translation:'despreciar / mirar por encima del hombro', phonetic:'/lʊk daʊn ɒn/', level:'B2', topic:'phrasal_verbs', example:"Don't look down on people who are poor.", exampleEs:'No desprecies a la gente pobre.' },
  { id:'v117', word:'end up', translation:'acabar / terminar (haciendo algo)', phonetic:'/ɛnd ʌp/', level:'B1', topic:'phrasal_verbs', example:'We ended up staying at home.', exampleEs:'Acabamos quedándonos en casa.' },
  { id:'v118', word:'keep up with', translation:'mantenerse al día con / seguir el ritmo de', phonetic:'/kiːp ʌp wɪð/', level:'B2', topic:'phrasal_verbs', example:'Technology changes too fast to keep up with.', exampleEs:'La tecnología cambia demasiado rápido para mantenerse al día.' },
  { id:'v119', word:'give in', translation:'rendirse / ceder', phonetic:'/ɡɪv ɪn/', level:'B1', topic:'phrasal_verbs', example:'The rebels finally gave in.', exampleEs:'Los rebeldes finalmente se rindieron.' },
  { id:'v120', word:'bring about', translation:'provocar / causar', phonetic:'/brɪŋ əˈbaʊt/', level:'B2', topic:'phrasal_verbs', example:'The new law brought about many changes.', exampleEs:'La nueva ley provocó muchos cambios.' },

  // ---- Advanced Idioms & Expressions Expansion ----
  { id:'v121', word:'spill the beans', translation:'irse de la lengua / revelar un secreto', phonetic:'/spɪl ðə biːnz/', level:'B2', topic:'idioms', example:'Who spilled the beans about the project?', exampleEs:'¿Quién se fue de la lengua sobre el proyecto?' },
  { id:'v122', word:'burn bridges', translation:'romper lazos / quemar naves', phonetic:'/bɜːrn ˈbrɪdʒ.ɪz/', level:'B2', topic:'idioms', example:"Don't burn your bridges when leaving a job.", exampleEs:'No rompas lazos al dejar un trabajo.' },
  { id:'v123', word:'cry over spilled milk', translation:'lamentarse por lo ya hecho', phonetic:'/kraɪ ˈoʊ.vər spɪld mɪlk/', level:'B1', topic:'idioms', example:"It's done; there's no use crying over spilled milk.", exampleEs:'Ya está hecho; de nada sirve lamentarse por lo pasado.' },
  { id:'v124', word:'barking up the wrong tree', translation:'buscar en el lugar equivocado / equivocarse de cabo a rabo', phonetic:'/ˈbɑːr.kɪŋ ʌp ðə rɒŋ triː/', level:'B2', topic:'idioms', example:'If you think I did it, you are barking up the wrong tree.', exampleEs:'Si crees que yo lo hice, te estás equivocando por completo.' },
  { id:'v125', word:'piece of cake', translation:'pan comido / facilísimo', phonetic:'/piːs əv keɪk/', level:'A2', topic:'idioms', example:'The exam was a piece of cake!', exampleEs:'¡El examen fue pan comido!' },
  { id:'v126', word:'take it with a grain of salt', translation:'tomar algo con pinzas / no creerse todo', phonetic:'/teɪk ɪt wɪð ə ɡreɪn əv sɔːlt/', level:'B2', topic:'idioms', example:'You must take his stories with a grain of salt.', exampleEs:'Debes tomar sus historias con pinzas.' },
  { id:'v127', word:'through thick and thin', translation:'en las buenas y en las malas', phonetic:'/θruː θɪk ænd θɪn/', level:'B2', topic:'idioms', example:'They stayed together through thick and thin.', exampleEs:'Siguieron juntos en las buenas y en las malas.' },
  { id:'v128', word:'best of both worlds', translation:'lo mejor de ambos mundos', phonetic:'/bɛst əv boʊθ wɜːrldz/', level:'B2', topic:'idioms', example:'Living in the country and working in the city is the best of both worlds.', exampleEs:'Vivir en el campo y trabajar en la ciudad es lo mejor de ambos mundos.' },
  { id:'v129', word:'cost a fortune', translation:'costar una fortuna', phonetic:'/kɒst ə ˈfɔːr.tʃuːn/', level:'B1', topic:'expressions', example:'This ring must have cost a fortune.', exampleEs:'Este anillo debe haber costado una fortuna.' },
  { id:'v130', word:'in the long run', translation:'a la larga', phonetic:'/ɪn ðə lɒŋ rʌn/', level:'B1', topic:'expressions', example:'It will save us money in the long run.', exampleEs:'A la larga nos ahorrará dinero.' },
  { id:'v131', word:'make matters worse', translation:'para colmo / empeorar las cosas', phonetic:'/meɪk ˈmæt.ərz wɜːrs/', level:'B2', topic:'expressions', example:'To make matters worse, it started to pour.', exampleEs:'Para colmo, empezó a llover a cántaros.' },
  { id:'v132', word:'on the tip of my tongue', translation:'en la punta de la lengua', phonetic:'/ɒn ðə tɪp əv maɪ tʌŋ/', level:'B1', topic:'idioms', example:"His name is on the tip of my tongue.", exampleEs:'Su nombre lo tengo en la punta de la lengua.' },
  { id:'v133', word:'out of the blue', translation:'de repente / de la nada', phonetic:'/aʊt əv ðə bluː/', level:'B1', topic:'idioms', example:'She called me out of the blue.', exampleEs:'Me llamó de la nada.' },
  { id:'v134', word:'read between the lines', translation:'leer entre líneas', phonetic:'/riːd bɪˈtwiːn ðə laɪnz/', level:'B2', topic:'idioms', example:'You need to read between the lines to find the truth.', exampleEs:'Tienes que leer entre líneas para descubrir la verdad.' },
  { id:'v135', word:'safe and sound', translation:'sano y salvo', phonetic:'/seɪf ænd saʊnd/', level:'B1', topic:'idioms', example:'They arrived home safe and sound.', exampleEs:'Llegaron a casa sanos y salvos.' },
  // ---- C1/C2 & Phrasal Verbs expansion ----
  { id:'v136', word:'subsequent', translation:'subsecuente / posterior', phonetic:'/ˈsʌb.sɪ.kwənt/', level:'C1', topic:'adjectives', example:'Subsequent events proved him right.', exampleEs:'Los eventos posteriores demostraron que tenía razón.' },
  { id:'v137', word:'conspicuous', translation:'conspicuo / llamativo / visible', phonetic:'/kənˈspɪk.ju.əs/', level:'C2', topic:'adjectives', example:'He was conspicuous by his absence.', exampleEs:'Llamó la atención por su ausencia.' },
  { id:'v138', word:'scrutinise', translation:'escudriñar / examinar a fondo', phonetic:'/ˈskruː.tɪ.naɪz/', level:'C1', topic:'verbs', example:'Customers were cautioned to scrutinise their bills.', exampleEs:'Se advirtió a los clientes que examinaran a fondo sus facturas.' },
  { id:'v139', word:'pervasive', translation:'penetrante / omnipresente', phonetic:'/pəˈveɪ.sɪv/', level:'C1', topic:'adjectives', example:'The influence of social media is pervasive.', exampleEs:'La influencia de las redes sociales es omnipresente.' },
  { id:'v140', word:'reluctance', translation:'renuencia / desgana', phonetic:'/rɪˈlʌk.təns/', level:'B2', topic:'nouns', example:'She agreed with some reluctance.', exampleEs:'Aceptó con cierta renuencia.' },
  { id:'v141', word:'turn out', translation:'resultar / acudir', phonetic:'/tɜːrn aʊt/', level:'B1', topic:'phrasal_verbs', example:'It turned out to be a beautiful day.', exampleEs:'Resultó ser un día hermoso.' },
  { id:'v142', word:'keep on', translation:'seguir / continuar', phonetic:'/kiːp ɒn/', level:'A2', topic:'phrasal_verbs', example:'Keep on running until you reach the line.', exampleEs:'Sigue corriendo hasta llegar a la línea.' },
  { id:'v143', word:'put out', translation:'apagar (fuego) / molestar', phonetic:'/pʊt aʊt/', level:'B1', topic:'phrasal_verbs', example:'Firefighters managed to put out the fire.', exampleEs:'Los bomberos lograron apagar el fuego.' },
  { id:'v144', word:'take over', translation:'hacerse cargo / asumir el control', phonetic:'/teɪk ˈoʊ.vər/', level:'B2', topic:'phrasal_verbs', example:'The deputy manager will take over next week.', exampleEs:'El subgerente se hará cargo la próxima semana.' },
  { id:'v145', word:'pass out', translation:'desmayarse / perder el conocimiento', phonetic:'/pɑːs aʊt/', level:'B1', topic:'phrasal_verbs', example:'It was so hot that I almost passed out.', exampleEs:'Hacía tanto calor que casi me desmayo.' },
  { id:'v146', word:'look after', translation:'cuidar de', phonetic:'/lʊk ˈæf.tər/', level:'A2', topic:'phrasal_verbs', example:'Who is looking after the baby?', exampleEs:'¿Quién está cuidando del bebé?' },
  { id:'v147', word:'run into', translation:'tropezar con / encontrarse con', phonetic:'/rʌn ˈɪn.tuː/', level:'B1', topic:'phrasal_verbs', example:'I ran into my former teacher at the supermarket.', exampleEs:'Me encontré con mi ex profesor en el supermercado.' },
  { id:'v148', word:'break in', translation:'entrar a robar / interrumpir', phonetic:'/breɪk ɪn/', level:'B1', topic:'phrasal_verbs', example:'Thieves broke in while they were asleep.', exampleEs:'Los ladrones entraron a robar mientras dormían.' },
  { id:'v149', word:'get over', translation:'superar / recuperarse de', phonetic:'/ɡɛt ˈoʊ.vər/', level:'B1', topic:'phrasal_verbs', example:'It took her a long time to get over the breakup.', exampleEs:'Le tomó mucho tiempo superar la ruptura.' },
  { id:'v150', word:'show off', translation:'presumir / alardear', phonetic:'/ʃoʊ ɒf/', level:'B1', topic:'phrasal_verbs', example:'He bought that sports car just to show off.', exampleEs:'Compró ese coche deportivo solo para presumir.' },
  { id:'v151', word:'lay off', translation:'despedir (por reducción de plantilla)', phonetic:'/leɪ ɒf/', level:'B2', topic:'phrasal_verbs', example:'The company laid off 200 workers.', exampleEs:'La empresa despidió a 200 trabajadores.' },
  { id:'v152', word:'pull through', translation:'salir adelante / recuperarse (de enfermedad)', phonetic:'/pʊl θruː/', level:'B2', topic:'phrasal_verbs', example:'The doctor is confident that he will pull through.', exampleEs:'El médico confía en que saldrá adelante.' },
  { id:'v153', word:'point out', translation:'señalar / hacer notar', phonetic:'/pɔɪnt aʊt/', level:'B1', topic:'phrasal_verbs', example:'He pointed out the spelling mistakes.', exampleEs:'Señaló las faltas de ortografía.' },
  { id:'v154', word:'make up', translation:'inventar / hacer las paces / maquillarse', phonetic:'/meɪk ʌp/', level:'B1', topic:'phrasal_verbs', example:'They argumented but they quickly made up.', exampleEs:'Discutieron pero rápidamente hicieron las paces.' },
  { id:'v155', word:'drop off', translation:'quedarse dormido / dejar (a alguien/algo)', phonetic:'/drɒp ɒf/', level:'A2', topic:'phrasal_verbs', example:'I fell asleep and dropped off on the sofa.', exampleEs:'Me quedé dormido en el sofá.' },
  { id:'v156', word:'adversity', translation:'adversidad / desgracia', phonetic:'/ədˈvɜː.sə.ti/', level:'C1', topic:'nouns', example:'He showed courage in the face of adversity.', exampleEs:'Mostró valentía ante la adversidad.' },
  { id:'v157', word:'scrutiny', translation:'escrutinio / examen detallado', phonetic:'/ˈskruː.tɪ.ni/', level:'C1', topic:'nouns', example:'The proposal was subject to close scrutiny.', exampleEs:'La propuesta fue sometida a un examen detallado.' },
  { id:'v158', word:'coherent', translation:'coherente', phonetic:'/koʊˈhɪr.ənt/', level:'B2', topic:'adjectives', example:'He made a coherent argument.', exampleEs:'Hizo un argumento coherente.' },
  { id:'v159', word:'cognitive', translation:'cognitivo', phonetic:'/ˈkɒɡ.nɪ.tɪv/', level:'B2', topic:'science', example:'Cognitive development begins in early childhood.', exampleEs:'El desarrollo cognitivo comienza en la infancia temprana.' },
  { id:'v160', word:'deviate', translation:'desviarse', phonetic:'/ˈdiː.vi.eɪt/', level:'C1', topic:'verbs', example:'Do not deviate from the plan.', exampleEs:'No te desvies del plan.' },
  { id:'v161', word:'distinction', translation:'distinción / diferencia', phonetic:'/dɪˈstɪŋk.ʃən/', level:'B2', topic:'nouns', example:'There is a clear distinction between the two.', exampleEs:'Hay una clara distinción entre ambos.' },
  { id:'v162', word:'fluctuate', translation:'fluctuar', phonetic:'/ˈflʌk.tʃu.eɪt/', level:'B2', topic:'verbs', example:'Prices fluctuate depending on demand.', exampleEs:'Los precios fluctúan según la demanda.' },
  { id:'v163', word:'implicate', translation:'implicar / involucrar', phonetic:'/ˈɪm.plɪ.keɪt/', level:'C1', topic:'verbs', example:'He was implicated in the scandal.', exampleEs:'Estuvo implicado en el escándalo.' },
  { id:'v164', word:'induce', translation:'inducir / provocar', phonetic:'/ɪnˈdjuːs/', level:'C1', topic:'verbs', example:'Nothing would induce me to go there.', exampleEs:'Nada me induciría a ir allí.' },
  { id:'v165', word:'lucrative', translation:'lucrativo / rentable', phonetic:'/ˈluː.krə.tɪv/', level:'C1', topic:'adjectives', example:'He runs a lucrative business.', exampleEs:'Dirige un negocio lucrativo.' },
  { id:'v166', word:'manipulate', translation:'manipular', phonetic:'/məˈnɪp.jə.leɪt/', level:'B2', topic:'verbs', example:'She knows how to manipulate people.', exampleEs:'Sabe cómo manipular a la gente.' },
  { id:'v167', word:'passive', translation:'pasivo', phonetic:'/ˈpæs.ɪv/', level:'B2', topic:'adjectives', example:'He plays a passive role in the group.', exampleEs:'Juega un papel pasivo en el grupo.' },
  { id:'v168', word:'preliminary', translation:'preliminar / previo', phonetic:'/prɪˈlɪm.ɪ.nər.i/', level:'B2', topic:'adjectives', example:'The preliminary results are encouraging.', exampleEs:'Los resultados preliminares son alentadores.' },
  { id:'v169', word:'qualitative', translation:'cualitativo', phonetic:'/ˈkwɒl.ɪ.tə.tɪv/', level:'C1', topic:'science', example:'We did qualitative research on users.', exampleEs:'Hicimos una investigación cualitativa de los usuarios.' },
  { id:'v170', word:'refine', translation:'refinar / perfeccionar', phonetic:'/rɪˈfaɪn/', level:'B2', topic:'verbs', example:'We need to refine our marketing strategy.', exampleEs:'Necesitamos perfeccionar nuestra estrategia de marketing.' },
  { id:'v171', word:'revolution', translation:'revolución', phonetic:'/ˌrɛv.əˈluː.ʃən/', level:'B1', topic:'social', example:'The industrial revolution changed everything.', exampleEs:'La revolución industrial lo cambió todo.' },
  { id:'v172', word:'scenario', translation:'escenario / caso hipotético', phonetic:'/sɪˈnɑː.ri.oʊ/', level:'B2', topic:'nouns', example:'Let\'s consider the worst-case scenario.', exampleEs:'Consideremos el peor de los casos.' },
  { id:'v173', word:'subordinate', translation:'subordinado', phonetic:'/səˈbɔː.dɪ.nət/', level:'C1', topic:'people', example:'He treats his subordinates with respect.', exampleEs:'Trata a sus subordinados con respeto.' },
  { id:'v174', word:'trigger', translation:'desencadenar / provocar / gatillo', phonetic:'/ˈtrɪɡ.ər/', level:'B2', topic:'verbs', example:'Allergies can trigger asthma attacks.', exampleEs:'Las alergias pueden desencadenar ataques de asma.' },
  { id:'v175', word:'unified', translation:'unificado', phonetic:'/ˈjuː.nɪ.faɪd/', level:'B2', topic:'adjectives', example:'They presented a unified front.', exampleEs:'Presentaron un frente unificado.' },
  { id:'v176', word:'validate', translation:'validar', phonetic:'/ˈvæl.ɪ.deɪt/', level:'B2', topic:'verbs', example:'The data validates our theory.', exampleEs:'Los datos validan nuestra teoría.' },
  { id:'v177', word:'analogy', translation:'analogía', phonetic:'/əˈnæl.ə.dʒi/', level:'C1', topic:'nouns', example:'He drew an analogy between the brain and a computer.', exampleEs:'Trazó una analogía entre el cerebro y un ordenador.' },
  { id:'v178', word:'anticipate', translation:'anticipar / prever', phonetic:'/ænˈtɪs.ɪ.peɪt/', level:'B2', topic:'verbs', example:'We anticipate a large crowd tonight.', exampleEs:'Prevemos una gran multitud esta noche.' },
  { id:'v179', word:'coherent', translation:'coherente', phonetic:'/koʊˈhɪr.ənt/', level:'B2', topic:'adjectives', example:'She made a coherent speech.', exampleEs:'Hizo un discurso coherente.' },
  { id:'v180', word:'controversial', translation:'polémico / controvertido', phonetic:'/ˌkɒn.trəˈvɜː.ʃəl/', level:'B2', topic:'adjectives', example:'It was a controversial decision.', exampleEs:'Fue una decisión polémica.' },
  { id:'v181', word:'empirical', translation:'empírico', phonetic:'/ɪmˈpɪr.ɪ.kəl/', level:'C1', topic:'science', example:'We need empirical evidence before acting.', exampleEs:'Necesitamos evidencia empírica antes de actuar.' },
  { id:'v182', word:'inherent', translation:'inherente', phonetic:'/ɪnˈhɪər.ənt/', level:'C1', topic:'adjectives', example:'There are inherent risks in this plan.', exampleEs:'Hay riesgos inherentes en este plan.' },
  { id:'v183', word:'justification', translation:'justificación', phonetic:'/ˌdʒʌs.tɪ.fɪˈkeɪ.ʃən/', level:'B2', topic:'nouns', example:'There is no justification for violence.', exampleEs:'No hay justificación para la violencia.' },
  { id:'v184', word:'offset', translation:'compensar / contrarrestar', phonetic:'/ˈɒf.sɛt/', level:'C1', topic:'verbs', example:'Gains in one area offset losses in another.', exampleEs:'Las ganancias en un área compensan las pérdidas en otra.' },
  { id:'v185', word:'persistence', translation:'persistencia / perseverancia', phonetic:'/pəˈsɪs.təns/', level:'B2', topic:'nouns', example:'His persistence finally paid off.', exampleEs:'Su perseverancia finalmente dio sus frutos.' },
  { id:'v186', word:'phenomenon', translation:'fenómeno', phonetic:'/fəˈnɒm.ɪ.nən/', level:'C1', topic:'nouns', example:'This is a rare natural phenomenon.', exampleEs:'Este es un fenómeno natural poco común.' },
  { id:'v187', word:'reluctant', translation:'renuente / reacio', phonetic:'/rɪˈlʌk.tənt/', level:'B2', topic:'adjectives', example:'He was reluctant to admit his mistake.', exampleEs:'Se mostró reacio a admitir su error.' },
  { id:'v188', word:'unprecedented', translation:'sin precedentes', phonetic:'/ʌnˈprɛs.ɪ.dɛn.tɪd/', level:'C1', topic:'adjectives', example:'The region is experiencing unprecedented growth.', exampleEs:'La región está experimentando un crecimiento sin precedentes.' },
  { id:'v189', word:'back to square one', translation:'volver a empezar / volver a la casilla de salida', phonetic:'/bæk tuː skwɛər wʌn/', level:'B2', topic:'idioms', example:'The deal failed, so we are back to square one.', exampleEs:'El trato fracasó, así que volvemos a empezar.' },
  { id:'v190', word:'burn the candle at both ends', translation:'acostarse tarde y levantarse temprano / agotarse', phonetic:'/bɜːrn ðə ˈkæn.dəl æt boʊθ ɛndz/', level:'B2', topic:'idioms', example:'Working two jobs is burning the candle at both ends.', exampleEs:'Trabajar en dos empleos es acostarse tarde y levantarse temprano.' },
  { id:'v191', word:'cut to the chase', translation:'ir al grano', phonetic:'/kʌt tuː ðə tʃeɪs/', level:'B2', topic:'idioms', example:'Stop talking about the weather and cut to the chase.', exampleEs:'Deja de hablar del tiempo y ve al grano.' },
  { id:'v192', word:'face the music', translation:'dar la cara / afrontar las consecuencias', phonetic:'/feɪs ðə ˈmjuː.zɪk/', level:'B2', topic:'idioms', example:'You broke the window; now you must face the music.', exampleEs:'Rompiste la ventana; ahora debes afrontar las consecuencias.' },
  { id:'v193', word:'get out of hand', translation:'irse de las manos', phonetic:'/ɡɛt aʊt əv hænd/', level:'B1', topic:'idioms', example:'The party got out of hand quickly.', exampleEs:'La fiesta se fue de las manos rápidamente.' },
  { id:'v194', word:'hit the sack', translation:'irse a la cama / ir a dormir', phonetic:'/hɪt ðə sæk/', level:'B1', topic:'idioms', example:"I'm exhausted, time to hit the sack.", exampleEs:'Estoy agotado, hora de ir a dormir.' },
  { id:'v195', word:'on the fence', translation:'indeciso / nadar entre dos aguas', phonetic:'/ɒn ðə fɛns/', level:'B2', topic:'idioms', example:"I'm still on the fence about going.", exampleEs:'Todavía estoy indeciso sobre ir.' },
  { id:'v196', word:'steal someone\'s thunder', translation:'quitar el protagonismo a alguien', phonetic:'/stiːl ˈsʌm.wʌnz ˈθʌn.dər/', level:'B2', topic:'idioms', example:'She stole my thunder by announcing her pregnancy at my party.', exampleEs:'Me quitó el protagonismo al anunciar su embarazo en mi fiesta.' },
  { id:'v197', word:'take with a pinch of salt', translation:'tomar con pinzas', phonetic:'/teɪk wɪð ə pɪntʃ əv sɔːlt/', level:'B2', topic:'idioms', example:'Take everything he says with a pinch of salt.', exampleEs:'Toma todo lo que dice con pinzas.' },
  { id:'v198', word:'turn a blind eye', translation:'hacer la vista gorda', phonetic:'/tɜːrn ə blaɪnd aɪ/', level:'B2', topic:'idioms', example:'The teacher turned a blind eye to the cheating.', exampleEs:'El profesor hizo la vista gorda con la copia.' },
  { id:'v199', word:'up in the air', translation:'en el aire / indeciso', phonetic:'/ʌp ɪn ði ɛər/', level:'B2', topic:'idioms', example:'Our travel plans are still up in the air.', exampleEs:'Nuestros planes de viaje siguen en el aire.' },
  { id:'v200', word:'break a leg', translation:'buena suerte (en teatro)', phonetic:'/breɪk ə lɛɡ/', level:'B1', topic:'idioms', example:'Break a leg in your performance tonight!', exampleEs:'¡Mucha suerte en tu actuación de esta noche!' },
];

// Topic labels
const TOPIC_LABELS = {
  greetings: 'Saludos', basics: 'Básico', places: 'Lugares', transport: 'Transporte',
  school: 'Escuela', food: 'Comida', people: 'Personas', animals: 'Animales',
  adjectives: 'Adjetivos', emotions: 'Emociones', verbs: 'Verbos', colors: 'Colores',
  numbers: 'Números', nature: 'Naturaleza', everyday: 'Cotidiano', connectors: 'Conectores',
  adverbs: 'Adverbios', prepositions: 'Preposiciones', nouns: 'Sustantivos',
  science: 'Ciencia', social: 'Social', phrasal_verbs: 'Phrasal Verbs',
  expressions: 'Expresiones', idioms: 'Modismos'
};

// Get vocab by level
function getVocabByLevel(level) {
  return VOCABULARY.filter(w => w.level === level);
}

// Get vocab by topic
function getVocabByTopic(topic) {
  return VOCABULARY.filter(w => w.topic === topic);
}

// Get random words
function getRandomWords(count, level = null) {
  let pool = level ? getVocabByLevel(level) : VOCABULARY;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Search dictionary
function searchDictionary(query) {
  const q = query.toLowerCase().trim();
  return VOCABULARY.filter(w =>
    w.word.toLowerCase().includes(q) ||
    w.translation.toLowerCase().includes(q)
  );
}
