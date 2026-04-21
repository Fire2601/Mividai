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
  let sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
  let primary = sorted[0][0];
  let secondary = sorted[1][0];

  let profile = profiles[primary];
  let comboKey = `${primary}-${secondary}`;
  let comboText = combinations[comboKey] || "";

  let resultHTML = `
    <h2>${profile.title}</h2>
    <p><strong>Description :</strong> ${profile.description}</p>
    <p><strong>Mission :</strong> ${profile.mission}</p>
    <p><strong>Forces :</strong> ${profile.forces.join(", ")}</p>
    <p><strong>Attention :</strong> ${profile.weakness}</p>

    <hr>

    <h3>Ta combinaison unique</h3>
    <p>${comboText}</p>
  `;

  localStorage.setItem("mividai_result", resultHTML);
  window.location.href = "results.html";
}


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
function calculateLifePath(dateString) {
  if (!dateString) return null;

  const digits = dateString.replace(/-/g, "").split("").map(Number);

  let sum = digits.reduce((a, b) => a + b, 0);

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").map(Number).reduce((a, b) => a + b, 0);
  }

  return sum;
}
const birthdate = localStorage.getItem("birthdate");
const lifePath = calculateLifePath(birthdate);
const lifePathMeaning = {
  1: "Tu es un(e) leader naturel(le), fait(e) pour initier et avancer.",
  2: "Tu es fait(e) pour collaborer, ressentir et créer de l’harmonie.",
  3: "Tu es une énergie d’expression, de créativité et de communication.",
  4: "Tu es un(e) bâtisseur(se), structuré(e) et orienté(e) vers la stabilité.",
  5: "Tu es fait(e) pour explorer, évoluer et vivre la liberté.",
  6: "Tu es porté(e) par le soin, la responsabilité et l’amour des autres.",
  7: "Tu es en quête de vérité, de profondeur et de compréhension.",
  8: "Tu es lié(e) à la réussite, au pouvoir et à la matérialisation.",
  9: "Tu es tourné(e) vers l’humain, la transmission et l’impact global.",
  11: "Tu es une énergie intuitive et inspirante, connectée à plus grand.",
  22: "Tu es un grand bâtisseur, capable de concrétiser des visions puissantes.",
  33: "Tu es un guide, avec une forte dimension d’aide et de transmission."
};
const profiles = {
  humaniste: {
    title: "L’Humaniste",
    description: "Tu es profondément tourné vers les autres...",
    mission: "Ta mission est d’aider, accompagner et améliorer la vie des gens.",
    forces: ["Empathie", "Générosité", "Écoute"],
    weakness: "Tu peux parfois t’oublier toi-même."
  },
  analytique: {
    title: "L’Analytique",
    description: "Tu es logique et structuré...",
    mission: "Ta mission est de comprendre, structurer et résoudre.",
    forces: ["Logique", "Clarté", "Organisation"],
    weakness: "Tu peux sur-analyser."
  },
  spirituel: {
    title: "Le Spirituel",
    description: "Tu es connecté à quelque chose de plus grand...",
    mission: "Ta mission est de guider et éveiller.",
    forces: ["Intuition", "Vision", "Profondeur"],
    weakness: "Tu peux te perdre dans tes pensées."
  },
  creatif: {
    title: "Le Créatif",
    description: "Tu es guidé par l’expression...",
    mission: "Ta mission est de créer et inspirer.",
    forces: ["Imagination", "Originalité", "Énergie"],
    weakness: "Tu peux manquer de structure."
  }
};

const combinations = {
  "humaniste-analytique": "Tu combines cœur et logique...",
  "analytique-humaniste": "Tu structures pour aider...",
  "creatif-spirituel": "Tu crées avec intuition...",
  "spirituel-creatif": "Tu ressens puis tu exprimes...",
  "analytique-creatif": "Tu construis des idées innovantes...",
  "creatif-analytique": "Tu imagines puis tu organises...",
  "humaniste-spirituel": "Tu aides avec une profonde sensibilité...",
  "spirituel-humaniste": "Tu guides avec amour..."
};


function showQuestion() {
  const quiz = document.getElementById("quiz");
  const question = questions[currentQuestion];

  quiz.innerHTML = `
    <h2>${question.text}</h2>
    ${question.answers.map(answer =>
      `<button class="btn" onclick="selectAnswer('${answer.type}')">${answer.text}</button>`
    ).join("")}
  `;

  updateProgress();
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

function updateProgress() {
  const progressBar = document.getElementById("progressBar");
  const progress = (currentQuestion / questions.length) * 100;
  progressBar.style.width = progress + "%";
}

function showResult() {
  let sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);

  let primary = sorted[0][0];
  let secondary = sorted[1][0];

  let profile = profiles[primary];
  let comboKey = `${primary}-${secondary}`;
  let comboText = combinations[comboKey] || "Tu as une combinaison unique et équilibrée.";

  let resultHTML = `
    <h2>${profile.title}</h2>
    <p><strong>Description :</strong> ${profile.description}</p>
    <p><strong>Mission :</strong> ${profile.mission}</p>
    <p><strong>Forces :</strong> ${profile.forces.join(", ")}</p>
    <p><strong>Point d’attention :</strong> ${profile.weakness}</p>

    <hr>

    <h3>Ta combinaison unique</h3>
    <p>${comboText}</p>
  `;

  localStorage.setItem("mividai_result", resultHTML);
  window.location.href = "results.html";
}
