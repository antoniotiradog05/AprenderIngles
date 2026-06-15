# 🇬🇧 EnglishMaster — Aprende Inglés

<div align="center">

![EnglishMaster](https://img.shields.io/badge/EnglishMaster-v1.0-6366f1?style=for-the-badge&logo=language&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CEFR](https://img.shields.io/badge/CEFR-A1--C2-10b981?style=for-the-badge)

**Una aplicación web completa para aprender inglés de forma efectiva y divertida**

[🚀 Demo](#demo) • [✨ Características](#características) • [📚 Contenido](#contenido) • [🎮 Juegos](#juegos) • [⚙️ Instalación](#instalación)

</div>

---

## 📸 Vista General

EnglishMaster es una **Single Page Application (SPA)** para aprender inglés con contenido adaptativo según el nivel MCER (A1–C2). Diseñada con una interfaz moderna, oscura y gamificada para maximizar la motivación y el aprendizaje.

---

## ✨ Características Principales

### 🎯 Evaluación Inicial
- **Test de nivel adaptativo** con preguntas de gramática, vocabulario y comprensión
- Clasificación según el **Marco Común Europeo de Referencia (MCER)**: A1, A2, B1, B2, C1, C2
- **Plan de estudio personalizado** basado en el resultado

### 📚 Lecciones de Gramática
- Reglas gramaticales completas con estructura, ejemplos y notas
- Cobertura total: **tiempos verbales, condicionales, voz pasiva, reported speech, modal verbs**, y mucho más
- Sistema de **señales de tiempo** (time signals) y **errores comunes** explicados

### ✏️ Ejercicios Interactivos (56+)
| Tipo | Descripción |
|------|-------------|
| 📝 Completar huecos | Rellena espacios con la forma correcta |
| 🎯 Opción múltiple | Elige entre 4 opciones |
| 🔍 Corrección de errores | Detecta y corrige el error gramatical |
| 🌐 Traducción | Traduce de español a inglés |
| 🔀 Ordenar frases | Coloca las palabras en orden correcto |

### 📖 Vocabulario (300+ palabras)
- Palabras clasificadas por nivel (A1–C2) y tema
- **Phonetics** (transcripción fonética IPA)
- Ejemplos de uso en contexto + traducción
- **Phrasal verbs** e **idioms** con explicación
- Pronunciación con Web Speech API 🔊

### 🧠 Spaced Repetition (SM-2)
- Algoritmo **SM-2** científicamente probado
- Flashcards interactivas con flip animation
- Sistema de calificación (Difícil / Regular / Fácil)
- Revisión programada automáticamente

### 🤖 Chat con MAX (Robot)
- Robot conversacional basado en **reglas y patrones**
- Detecta y corrige **errores gramaticales** automáticamente
- Sugerencias de respuesta contextual
- Síntesis de voz para escuchar las respuestas

### 🎮 Mini-Juegos (4)
| Juego | Descripción |
|-------|-------------|
| 😰 Ahorcado | Adivina la palabra letra a letra |
| 🃏 Memoria | Empareja palabras con sus traducciones |
| ⚡ Quiz Cronometrado | Responde contra el reloj (máx. puntuación por rapidez) |
| 📖 Completa la Historia | Rellena huecos en una historia coherente |

### 📈 Dashboard y Progreso
- Estadísticas en tiempo real: XP, racha, palabras aprendidas, precisión
- **Gráficos de barras** de estudio semanal
- Historial de errores para identificar áreas débiles
- Sistema de **logros desbloqueables** (20+)

### 🏆 Gamificación
- **Sistema de XP y niveles** (1–11): Novato → Gran Maestro
- **Racha de días** con notificación si se rompe
- **20+ logros** con emoji y descripción
- Animación de **confeti** al completar retos

---

## 📚 Contenido Incluido

### Gramática (temas completos)
- Present Simple, Present Continuous, Past Simple
- Present Perfect (simple y continuous)
- Past Perfect, Future Simple, Future Continuous
- Conditional 1, 2, 3 y Mixto
- Passive Voice (todos los tiempos)
- Reported Speech (statements, questions, orders)
- Modal Verbs (can, could, must, should, might, would)
- Gerund vs Infinitive
- Relative Clauses (defining y non-defining)
- Inversion (C1/C2)

### Vocabulario por categoría
- 🍎 Comida y bebida
- 🏠 Hogar y muebles
- 💼 Trabajo y negocios
- 🌍 Viajes y lugares
- 😊 Emociones y sentimientos
- 🌿 Naturaleza
- 💻 Tecnología
- 📚 Educación
- 🏃 Deportes y actividades
- 🔗 Phrasal verbs (30+)
- 💬 Idioms y expresiones (20+)
- 🎓 Vocabulario académico (B2/C1)

---

## 🎮 Juegos

### 😰 Ahorcado
- Palabras del vocabulario según tu nivel
- 6 intentos incorrectos permitidos
- Pista contextual en español
- +40 XP por victoria

### 🃏 Memoria
- 8 pares palabra ↔ traducción
- Sistema de coincidencia animado
- Contador de movimientos
- +60 XP al completar

### ⚡ Quiz Cronometrado
- 10 preguntas adaptadas al nivel
- 15 segundos por pregunta
- **Puntuación extra** por responder rápido
- Rankings de puntuación

### 📖 Completa la Historia
- Historias contextuales con huecos
- Niveles A2 y B1 disponibles
- Feedback completo de cada respuesta

---

## ⚙️ Instalación y Uso

```bash
# 1. Clona el repositorio
git clone https://github.com/antoniotiradog05/AprenderIngles.git

# 2. Abre el archivo index.html en tu navegador
# No requiere servidor ni instalación de dependencias
```

> ⚡ **Sin dependencias** — Solo HTML5, CSS3 y JavaScript vanilla.
> Abre `index.html` directamente en Chrome, Firefox, Edge o Safari.

---

## 🗂️ Estructura del Proyecto

```
AprenderIngles/
├── index.html              # SPA principal
├── css/
│   ├── main.css            # Variables, tipografía, base
│   ├── components.css      # Componentes UI
│   └── animations.css      # Keyframe animations
└── js/
    ├── app.js              # Router SPA + inicialización
    ├── utils.js            # Helpers, charts, animaciones
    ├── data/
    │   ├── grammar.js      # Base de datos de gramática
    │   ├── vocabulary.js   # 300+ palabras con IPA
    │   ├── assessment.js   # Test de nivel MCER
    │   └── exercises.js    # 56+ ejercicios variados
    └── modules/
        ├── storage.js      # localStorage abstraction
        ├── gamification.js # XP, niveles, logros
        ├── assessment.js   # Motor del test de nivel
        ├── lessons.js      # Renderizador de lecciones
        ├── exercises.js    # Motor de ejercicios + vocabulario
        ├── spacedRep.js    # Algoritmo SM-2 flashcards
        ├── games.js        # 4 mini-juegos
        ├── robotChat.js    # Robot MAX + diccionario
        └── progress.js     # Dashboard + estadísticas
```

---

## 🔧 Tecnologías

| Tecnología | Uso |
|-----------|-----|
| HTML5 | Estructura SPA |
| CSS3 | Diseño, animaciones, glassmorphism |
| Vanilla JavaScript | Toda la lógica de la app |
| localStorage | Persistencia de datos del usuario |
| Web Speech API | Pronunciación TTS (text-to-speech) |
| Canvas 2D | Gráficos de progreso |

---

## 🌟 Screenshots

> El diseño incluye modo oscuro/claro, sidebar de navegación, sistema de XP visible, efectos glassmorphism y animaciones suaves.

---

## 🤝 Contribuciones

¿Quieres añadir más contenido o mejorar la app?

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/mi-mejora`
3. Haz commit: `git commit -m "feat: añadir X"`
4. Push: `git push origin feature/mi-mejora`
5. Abre un Pull Request

---

## 📄 Licencia

MIT License — Libre para uso personal y educativo.

---

<div align="center">

Hecho con ❤️ para aprender inglés de forma efectiva

⭐ **Si te gusta el proyecto, dale una estrella!** ⭐

</div>
