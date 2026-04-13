let currentQuestion = 0;
let score = {
  humaniste: 0,
  analytique: 0,
  spirituel: 0,
  creatif: 0
};

const questions = [
  {
    text: "Quand te sens-tu le plus vivant(e) ?",
    answers: [
      { text: "Aider les autres", type: "humaniste" },
      { text: "Comprendre des choses complexes", type: "analytique" },
      { text: "Créer quelque chose", type: "creatif" },
      { text: "Réfléchir au sens de la vie", type: "spirituel" }
    ]
  },
  {
    text: "Dans un travail idéal, tu préfères :",
    answers: [
      { text: "Aider", type: "humaniste" },
      { text: "Analyser", type: "analytique" },
      { text: "Créer", type: "creatif" },
      { text: "Comprendre l’humain", type: "spirituel" }
    ]
  },
  {
    text: "Ce qui est le plus important pour toi :",
    answers: [
      { text: "Les autres", type: "humaniste" },
      { text: "La logique", type: "analytique" },
      { text: "L’expression", type: "creatif" },
      { text: "Le sens profond", type: "spirituel" }
    ]
  }
];

function startQuiz() {
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "";

  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  let q = questions[currentQuestion];

  let html = `<h2>${q.text}</h2>`;

  q.answers.forEach(answer => {
    html += `
      <button onclick="selectAnswer('${answer.type}')">
        ${answer.text}
      </button>
    `;
  });

  quiz.innerHTML = html;
}

function selectAnswer(type) {
  score[type]++;
  currentQuestion++;
  showQuestion();
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");

  let resultType = Object.keys(score).reduce((a, b) =>
    score[a] > score[b] ? a : b
  );

  let message = "";

  if (resultType === "humaniste") {
    message = "Tu es une personne tournée vers l’aide et les relations humaines.";
  } else if (resultType === "analytique") {
    message = "Tu es guidé(e) par la logique et la compréhension.";
  } else if (resultType === "creatif") {
    message = "Tu es une âme créative qui a besoin d’expression.";
  } else {
    message = "Tu es en quête de sens profond et de vérité intérieure.";
  }

  const result = document.getElementById("result");
  result.classList.remove("hidden");
  result.innerHTML = `
    <h2>Ton profil de mission de vie</h2>
    <p>${message}</p>
  `;
}