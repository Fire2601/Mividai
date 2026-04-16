console.log("script chargé !");
let currentQuestion = 0;
let score = {
  humaniste: 0,
  analytique: 0,
  spirituel: 0,
  creatif: 0
};

function startQuiz() {
  currentQuestion = 0;
  score = {
    humaniste: 0,
    analytique: 0,
    spirituel: 0,
    creatif: 0 };

  document.getElementById("startButton").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
}

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
    <button class="btn" onclick="startQuiz()">Recommencer</button>
  `;
}
window.onload = function() {
  const quiz = document.getElementById("quiz");

  if (!quiz) {
    document.body.innerHTML = "ERREUR : quiz introuvable";
  } else {
    document.body.innerHTML = "OK : quiz trouvé";
  }
};
alert("script lancé !");
