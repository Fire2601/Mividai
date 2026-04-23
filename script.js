const questions = [
  {
    text: "Quand tu te sens le plus aligné(e), c’est quand…",
    answers: [
      { text: "J’aide quelqu’un ou j’apporte du soutien", type: "humaniste" },
      { text: "Je comprends quelque chose en profondeur", type: "analytique" },
      { text: "Je ressens un lien fort avec mon intuition", type: "spirituel" },
      { text: "Je crée quelque chose de nouveau", type: "creatif" }
    ]
  },
  {
    text: "Ce qui te motive le plus dans la vie, c’est…",
    answers: [
      { text: "Être utile aux autres", type: "humaniste" },
      { text: "Trouver des solutions intelligentes", type: "analytique" },
      { text: "Donner du sens à mon existence", type: "spirituel" },
      { text: "Exprimer ma singularité", type: "creatif" }
    ]
  },
  {
    text: "Ton plus grand atout naturel est…",
    answers: [
      { text: "Mon empathie", type: "humaniste" },
      { text: "Ma logique", type: "analytique" },
      { text: "Mon intuition", type: "spirituel" },
      { text: "Mon imagination", type: "creatif" }
    ]
  },
  {
    text: "Quand tu dois prendre une décision importante…",
    answers: [
      { text: "Je pense à l’impact sur les autres", type: "humaniste" },
      { text: "J’analyse les avantages et les risques", type: "analytique" },
      { text: "J’écoute mon ressenti profond", type: "spirituel" },
      { text: "Je suis mon inspiration du moment", type: "creatif" }
    ]
  }
];

let currentQuestion = 0;

let score = {
  humaniste: 0,
  analytique: 0,
  spirituel: 0,
  creatif: 0
};

const profiles = {
  humaniste: {
    title: "L’Humaniste",
    secondaryTitle: "Énergie de cœur",
    emoji: "💖",
    description: "Tu es profondément tourné(e) vers les autres, le lien humain et l’envie de contribuer positivement au monde.",
    strengths: [
      "Tu sais écouter et comprendre les autres.",
      "Tu accordes beaucoup d’importance au sens et aux relations.",
      "Tu as un vrai potentiel d’impact humain."
    ],
    blocks: [
      "Tu peux parfois t’oublier au profit des autres.",
      "Tu hésites parfois à prendre pleinement ta place.",
      "Tu peux te disperser émotionnellement."
    ],
    advice: "Ta mission passe par la contribution, l’accompagnement et la création de liens authentiques."
  },
  analytique: {
    title: "L’Analytique",
    secondaryTitle: "Énergie de clarté",
    emoji: "🧠",
    description: "Tu avances avec logique, structure et clarté. Tu aimes comprendre avant d’agir.",
    strengths: [
      "Tu analyses bien les situations.",
      "Tu sais organiser et résoudre.",
      "Tu prends du recul avec lucidité."
    ],
    blocks: [
      "Tu peux trop mentaliser.",
      "Tu peux douter avant d’agir.",
      "Tu peux manquer de lâcher-prise."
    ],
    advice: "Ta mission est de comprendre, structurer et apporter de la clarté autour de toi."
  },
  spirituel: {
    title: "Le Spirituel",
    secondaryTitle: "Énergie d’intuition",
    emoji: "✨",
    description: "Tu es connecté(e) à l’intuition, à la profondeur et au sens invisible des choses.",
    strengths: [
      "Tu ressens profondément.",
      "Tu captes ce que d’autres ne voient pas.",
      "Tu cherches du sens dans ton chemin."
    ],
    blocks: [
      "Tu peux trop rester dans l’introspection.",
      "Tu peux avoir du mal à passer à l’action.",
      "Tu peux te sentir à part."
    ],
    advice: "Ta mission est de guider, éveiller et transmettre de la profondeur."
  },
  creatif: {
    title: "Le Créatif",
    secondaryTitle: "Énergie d’expression",
    emoji: "🎨",
    description: "Tu es animé(e) par l’expression, l’inspiration et les nouvelles idées.",
    strengths: [
      "Tu imagines facilement.",
      "Tu ressens le beau et l’original.",
      "Tu apportes de la nouveauté."
    ],
    blocks: [
      "Tu peux manquer de structure.",
      "Tu peux commencer beaucoup de choses sans finir.",
      "Tu peux douter de la valeur de tes idées."
    ],
    advice: "Ta mission est de créer, inspirer et ouvrir de nouvelles voies."
  }
};

const combinations = {
  "humaniste-spirituel": "Tu as une forte sensibilité humaine et intérieure. Tu peux aider, guider ou apaiser autour de toi.",
  "spirituel-humaniste": "Tu allies profondeur intérieure et amour des autres. Tu peux être un repère très apaisant.",
  "humaniste-analytique": "Tu combines le cœur et la logique. Tu peux aider les autres de façon concrète et structurée.",
  "analytique-humaniste": "Tu réfléchis avec précision tout en gardant une vraie sensibilité humaine.",
  "creatif-spirituel": "Tu crées avec intuition et profondeur.",
  "spirituel-creatif": "Tu ressens profondément et tu sais transformer cela en expression originale.",
  "analytique-creatif": "Tu combines structure et imagination.",
  "creatif-analytique": "Tu imagines puis tu organises."
};
const projectIdeas = {
  humaniste: [
    "Créer un projet d’accompagnement (coaching, aide, mentorat)",
    "S’engager dans une association ou une cause humaine",
    "Lancer un contenu pour aider les autres (blog, podcast, vidéos)"
  ],
  analytique: [
    "Créer un système ou outil pour résoudre un problème",
    "Lancer un projet basé sur la logique (app, organisation, stratégie)",
    "Analyser un domaine et proposer des solutions concrètes"
  ],
  spirituel: [
    "Partager du contenu sur le développement personnel ou la spiritualité",
    "Accompagner les autres dans leur réflexion ou leur évolution",
    "Créer un espace de réflexion (communauté, cercle, contenu)"
  ],
  creatif: [
    "Créer du contenu artistique ou inspirant (vidéo, design, écriture)",
    "Lancer un projet créatif personnel",
    "Explorer une activité qui te permet de t’exprimer librement"
  ]
};

function showQuestion() {
  const quiz = document.getElementById("quiz");
  const progressBar = document.getElementById("progressBar");
  const question = questions[currentQuestion];

  if (!quiz || !question) return;

  quiz.innerHTML = `
    <div class="question">${question.text}</div>
    ${question.answers
      .map(
        (answer) =>
          `<button class="btn" onclick="selectAnswer('${answer.type}')">${answer.text}</button>`
      )
      .join("")}
  `;

  if (progressBar) {
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = progress + "%";
  }
}

function selectAnswer(type) {
  score[type]++;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

  function showResult() {
  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);

  const mainType = sorted[0][0];
  const secondaryType = sorted[1][0];

  const mainProfile = profiles[mainType];
  const secondaryProfile = profiles[secondaryType];
  const comboKey = `${mainType}-${secondaryType}`;
  const comboText =
    combinations[comboKey] || "Tu possèdes une combinaison unique qui mérite d’être approfondie.";

  const ideas = projectIdeas[mainType] || [];

  const resultData = {
    mainType: mainType,
    secondaryType: secondaryType,
    title: mainProfile.title,
    secondaryTitle: secondaryProfile.title,
    emoji: mainProfile.emoji,
    description: mainProfile.description,
    strengths: mainProfile.strengths,
    blocks: mainProfile.blocks,
    advice: mainProfile.advice,
    comboText: comboText,
    ideas: ideas
  };

 localStorage.setItem("mividai_result", JSON.stringify(resultData));
  window.location.href = "results.html";
} localStorage.setItem("mividai_result", JSON.stringify(resultData));
  window.location.href = "results.html";
}
