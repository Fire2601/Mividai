let currentQuestion = 0;
let score = {
  humaniste: 0,
  analytique: 0,
  spirituel: 0,
  creatif: 0
};

function showQuestion() {
  const quiz = document.getElementById("quiz");
  const q = questions[currentQuestion];

  if (!q) {
    return showResult();
  }

  quiz.classList.remove("show");

  setTimeout(() => {
    quiz.innerHTML = `
      <div class="question">${q.text}</div>
      ${q.answers.map(a => 
        `<button class="btn" onclick="selectAnswer('${a.type}')">${a.text}</button>`
      ).join("")}
    `;

    quiz.classList.add("fade");
    setTimeout(() => quiz.classList.add("show"), 50);

  }, 200);
}

function selectAnswer(type) {
  score[type]++;
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    return showResult();
  }

  showQuestion();
}

function updateProgress() {
  // Optionnel : ajout d'une barre de progression plus tard
}

function showResult() {
  const quiz = document.getElementById("quiz");

  const sortedProfiles = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const mainType = sortedProfiles[0][0];
  const secondaryType = sortedProfiles[1][0];

  const profiles = {
    humaniste: {
      title: "L’Humaniste",
      emoji: "💖",
      description: "Tu es profondément tourné(e) vers les autres, le lien humain et l’envie de contribuer positivement au monde.",
      strengths: [
        "Tu sais écouter et comprendre les autres",
        "Tu accordes de l’importance au sens et aux relations",
        "Tu as un vrai potentiel d’impact humain"
      ],
      blocks: [
        "Tu peux parfois t’oublier au profit des autres",
        "Tu hésites parfois à prendre ta place",
        "Tu peux te disperser émotionnellement"
      ],
      advice: "Ta mission passe par la contribution, l’accompagnement et la création de liens authentiques."
    },

    analytique: {
      title: "L’Analytique",
      emoji: "🧠",
      description: "Tu es guidé(e) par la logique, la compréhension et le besoin de structurer les choses avec clarté.",
      strengths: [
        "Tu réfléchis avec profondeur",
        "Tu sais analyser et organiser",
        "Tu peux transformer des idées en stratégies solides"
      ],
      blocks: [
        "Tu peux trop réfléchir avant d’agir",
        "Tu recherches parfois trop de contrôle",
        "Le doute peut ralentir tes décisions"
      ],
      advice: "Ta mission passe par la clarté, la stratégie, la compréhension et la construction de solutions durables."
    },

    spirituel: {
      title: "Le Spirituel",
      emoji: "✨",
      description: "Tu es en quête de sens, d’alignement intérieur et de vérité profonde dans ta vie.",
      strengths: [
        "Tu as une forte intuition",
        "Tu ressens profondément les choses",
        "Tu es attiré(e) par l’authenticité et la transformation"
      ],
      blocks: [
        "Tu peux te sentir perdu(e) quand tout manque de sens",
        "Tu peux douter de ta direction",
        "Tu peux rester dans l’introspection sans passer à l’action"
      ],
      advice: "Ta mission passe par l’alignement, la profondeur, la conscience et la transmission de sens."
    },

    creatif: {
      title: "Le Créatif",
      emoji: "🎨",
      description: "Tu es animé(e) par l’élan, l’expression, l’innovation et le besoin de construire quelque chose d’unique.",
      strengths: [
        "Tu as des idées et de l’élan",
        "Tu sais imaginer d’autres possibles",
        "Tu peux inspirer et créer du mouvement"
      ],
      blocks: [
        "Tu peux te disperser facilement",
        "Tu peux te lasser si le cadre est trop rigide",
        "Tu peux manquer de structure pour aller au bout"
      ],
      advice: "Ta mission passe par la création, l’expression, l’innovation et la mise en mouvement."
    }
  };

  const combinations = {
    "humaniste-analytique": "Tu combines sens humain et clarté mentale. Tu peux exceller dans l’accompagnement, le conseil ou les projets à impact.",
    "analytique-humaniste": "Tu es structuré(e), réfléchi(e) et profondément utile aux autres. Tu as un profil de bâtisseur au service d’une cause.",
    "creatif-spirituel": "Tu as une énergie visionnaire. Tu peux créer des projets porteurs de sens, inspirants et profondément originaux.",
    "spirituel-creatif": "Tu avances par intuition et inspiration. Ton potentiel est fort quand tu relies profondeur intérieure et expression concrète.",
    "analytique-creatif": "Tu peux transformer tes idées en projets solides. Tu as un vrai potentiel d’innovation structurée.",
    "creatif-analytique": "Tu es imaginatif(ve), mais aussi capable de donner une forme concrète à tes idées.",
    "humaniste-spirituel": "Tu as une forte sensibilité humaine et intérieure. Tu peux aider, guider ou apaiser autour de toi.",
    "spirituel-humaniste": "Tu cherches du sens tout en restant connecté(e) aux autres. Tu as un potentiel de présence, d’écoute et d’élévation.",
    "humaniste-creatif": "Tu peux créer pour toucher, aider ou inspirer. Ton expression a une vraie valeur humaine.",
    "creatif-humaniste": "Tu mets ton imagination au service des autres. Tu peux porter des projets inspirants et utiles.",
    "analytique-spirituel": "Tu cherches à comprendre en profondeur. Tu peux relier logique et quête de sens avec beaucoup de justesse.",
    "spirituel-analytique": "Tu combines intuition et réflexion. Tu peux devenir un profil rare, à la fois profond et clair."
  };

  const mainProfile = profiles[mainType];
  const secondaryProfile = profiles[secondaryType];
  const comboKey = `${mainType}-${secondaryType}`;
  const comboText = combinations[comboKey] || "Tu possèdes une combinaison unique qui mérite d’être approfondie.";

  quiz.innerHTML = `
    <div class="result-card">
      <h2>${mainProfile.emoji} Ton profil de mission de vie</h2>
      
      <p><strong>Profil principal :</strong> ${mainProfile.title}</p>
      <p><strong>Énergie secondaire :</strong> ${secondaryProfile.title}</p>

      <p>${mainProfile.description}</p>

      <h3>🌟 Tes forces naturelles</h3>
      <ul>
        ${mainProfile.strengths.map(item => `<li>${item}</li>`).join("")}
      </ul>

      <h3>⚠️ Ce qui peut te freiner</h3>
      <ul>
        ${mainProfile.blocks.map(item => `<li>${item}</li>`).join("")}
      </ul>

      <h3>🧭 Lecture MividAI</h3>
      <p>${comboText}</p>

      <h3>🚀 Ton conseil</h3>
      <p>${mainProfile.advice}</p>

      <button class="btn" onclick="location.reload()">Recommencer</button>
    </div>
  `;

  document.getElementById("progressBar").style.width = "100%";
}

  const result = document.getElementById("result");
  result.classList.remove("hidden");
  result.innerHTML = `
    <h2>Ton profil de mission de vie</h2>
    <p>${message}</p>
    <button class="btn" onclick="startQuiz()">Recommencer</button>
  `;
}