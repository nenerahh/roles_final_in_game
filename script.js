const revealBtn = document.getElementById('revealBtn');
const codeInput = document.getElementById('code');
const roleOutput = document.getElementById('role_output');

const CHARACTERS = {
  "ADN1": {
    name: "Iron Chancellor",
    sabotage: "Altered key treaty clause",
    knowledge: "Knows who opposed treaty secretly; fears being overthrown",
    overheard: [
      "Overheard the Diplomat negotiating secretly with an external faction.",
      "Saw the General arguing with the Industrialist about military clauses.",
      "Noticed the Revolutionary whispering about overthrowing council decisions."
    ],
    suspects: ["Spy", "Diplomat", "Visionary"],
    goal: "Consolidate control over the council and influence treaty outcomes"
  },
  "A0K2": {
    name: "Diplomat",
    sabotage: "Removed compromise language",
    knowledge: "Knows external deals and potential traitors",
    overheard: [
      "Heard the Iron Chancellor complaining about losing influence.",
      "Overheard the Spy sharing information with an unknown delegate."
    ],
    suspects: ["Revolutionary", "Historian"],
    goal: "Broker deals successfully without being exposed"
  },
  "ASV3": {
    name: "General",
    sabotage: "Hid military failures",
    knowledge: "Knows who ignored orders and who may have sabotaged clauses",
    overheard: [
      "Overheard the Industrialist asking for military contracts.",
      "Saw the Iron Chancellor giving secret instructions to the Spy."
    ],
    suspects: ["Spy", "Visionary"],
    goal: "Protect military interests and assert authority"
  },
  "ANN4": {
    name: "Visionary",
    sabotage: "Withheld visionary clause",
    knowledge: "Knows likely outcomes of treaty points and who will oppose",
    overheard: [
      "Heard the Idealist refuse to compromise on moral points.",
      "Saw the Revolutionary plotting quietly with the Poet."
    ],
    suspects: ["Diplomat", "Iron Chancellor"],
    goal: "Shape the council’s long-term strategy"
  },
  "AN5": {
    name: "Historian",
    sabotage: "None",
    knowledge: "Knows past council betrayals and hidden alliances",
    overheard: [
      "Overheard the Secretary mention missing treaty pages.",
      "Knows the Industrialist profited from previous wars."
    ],
    suspects: ["Archivist", "Iron Chancellor"],
    goal: "Uncover lies and preserve council truth"
  },
  "N16": {
    name: "Priest",
    sabotage: "None",
    knowledge: "Knows who broke ethical codes or hid lies",
    overheard: [
      "Heard the Iron Chancellor lying about support for peace clauses.",
      "Observed the General making morally questionable decisions."
    ],
    suspects: ["Iron Chancellor", "Diplomat"],
    goal: "Guide moral reasoning in the council"
  },
  "DQQ1": {
    name: "Industrialist",
    sabotage: "Encouraged clause benefiting own industries",
    knowledge: "Knows financial motives of other delegates",
    overheard: [
      "Overheard the Visionary talking about clauses that limit industry.",
      "Saw the Diplomat planning secret trade deals."
    ],
    suspects: ["Diplomat", "Iron Chancellor"],
    goal: "Secure economic advantage for own enterprises"
  },
  "A8": {
    name: "Spy",
    sabotage: "Planted false info in treaty",
    knowledge: "Knows secret alliances, sabotage plans, and loyalties",
    overheard: [
      "Overheard the Iron Chancellor instructing someone to alter a clause.",
      "Saw the Revolutionary meeting privately with the Poet."
    ],
    suspects: ["Diplomat", "Revolutionary"],
    goal: "Gather intelligence and manipulate outcomes"
  },
  "3LEN3": {
    name: "Revolutionary",
    sabotage: "Spread misinformation",
    knowledge: "Knows who secretly opposes council authority",
    overheard: [
      "Heard the Idealist refuse to compromise.",
      "Overheard whispers about the Iron Chancellor’s hidden plans."
    ],
    suspects: ["Iron Chancellor", "Spy"],
    goal: "Foment change and gain allies"
  },
  "3OO0": {
    name: "Poet",
    sabotage: "Hidden messages in document",
    knowledge: "Knows coded hints about sabotage",
    overheard: [
      "Overheard the Spy giving secret instructions.",
      "Noticed the Historian observing missing papers."
    ],
    suspects: ["Spy", "Revolutionary"],
    goal: "Encode truths and reveal hidden motives"
  },
  "OO12": {
    name: "Idealist",
    sabotage: "Refused to sign certain points",
    knowledge: "Knows who will never compromise",
    overheard: [
      "Heard the Visionary plotting to influence future clauses.",
      "Saw the Diplomat talking secretly with external factions."
    ],
    suspects: ["Diplomat", "Visionary"],
    goal: "Uphold principles above all"
  },
  "M4R1": {
    name: "Heir",
    sabotage: "None",
    knowledge: "Knows hidden family ties and alliances",
    overheard: [
      "Overheard the Iron Chancellor questioning loyalty of delegates.",
      "Noticed the Revolutionary plotting quietly."
    ],
    suspects: ["Iron Chancellor", "Revolutionary"],
    goal: "Observe succession dynamics and protect lineage"
  },
  "TM11": {
    name: "Scientist",
    sabotage: "Altered technical clause",
    knowledge: "Knows secret inventions or leverage points",
    overheard: [
      "Heard the Industrialist trying to secure contracts.",
      "Overheard the Spy discussing hidden info."
    ],
    suspects: ["Industrialist", "Spy"],
    goal: "Influence technological and strategic outcomes"
  },
  "AN4N0": {
    name: "Envoy",
    sabotage: "None",
    knowledge: "Knows external pressures and reporting delegates",
    overheard: [
      "Overheard the Diplomat planning secret deals.",
      "Noticed the Iron Chancellor manipulating votes."
    ],
    suspects: ["Diplomat", "Iron Chancellor"],
    goal: "Represent external factions and negotiate alliances"
  },
  "IKR0": {
    name: "Journalist",
    sabotage: "Exaggerated reports",
    knowledge: "Knows leaks and what’s documented about sabotage",
    overheard: [
      "Heard the Secretary mention missing treaty fragments.",
      "Overheard the Revolutionary talking about misinformation."
    ],
    suspects: ["Spy", "Secretary"],
    goal: "Document events and uncover hidden truths"
  },
  "MI00": {
    name: "Guard",
    sabotage: "Ignored suspicious behavior",
    knowledge: "Knows unusual delegate movements",
    overheard: [
      "Saw the Iron Chancellor meet secretly with the Spy.",
      "Noticed the Industrialist entering the archives at odd hours."
    ],
    suspects: ["Iron Chancellor", "Industrialist"],
    goal: "Maintain order and observe suspicious activity"
  },
  "MN10": {
    name: "Secretary",
    sabotage: "Misplaced treaty fragment",
    knowledge: "Knows official minutes and hidden notes",
    overheard: [
      "Overheard the Journalist discussing leaks.",
      "Noticed the Archivist moving fragments suspiciously."
    ],
    suspects: ["Archivist", "Spy"],
    goal: "Keep accurate records and observe council conduct"
  },
  "N4T4LI": {
    name: "Assistant Envoy",
    sabotage: "None",
    knowledge: "Knows whispered alliances and subtle interactions",
    overheard: [
      "Overheard the Diplomat negotiating secretly.",
      "Saw the Revolutionary talking with the Poet in private."
    ],
    suspects: ["Diplomat", "Revolutionary"],
    goal: "Assist negotiations and gather information"
  },
  "T1N4": {
    name: "Archivist",
    sabotage: "Lost fragment of treaty",
    knowledge: "Knows fragments of destroyed treaty and who handled them",
    overheard: [
      "Saw the Secretary misplacing treaty papers.",
      "Overheard the Iron Chancellor giving instructions about certain clauses."
    ],
    suspects: ["Secretary", "Iron Chancellor"],
    goal: "Preserve historical documents and guide reconstruction"
  },
  "RZ1": {
    name: "Servant",
    sabotage: "Allowed key paper to disappear",
    knowledge: "Knows overheard conversations and secret movements",
    overheard: [
      "Overheard the Spy giving orders.",
      "Noticed the Revolutionary sneaking notes to the Poet."
    ],
    suspects: ["Spy", "Revolutionary"],
    goal: "Serve council and quietly witness events"
  }
};

function revealRole() {
  const code = codeInput.value.trim().toUpperCase();

  if (CHARACTERS[code]) {
    const role = CHARACTERS[code];

    // Build overheard list
    let overheardHTML = "";
    if (role.overheard && role.overheard.length > 0) {
      overheardHTML = "<strong>Overheard / Intel:</strong><ul>";
      role.overheard.forEach(item => {
        overheardHTML += `<li>${item}</li>`;
      });
      overheardHTML += "</ul>";
    }

    // Build output
    roleOutput.innerHTML = `
      <strong>Role:</strong> ${role.name} <br>
      <strong>Sabotage:</strong> ${role.sabotage} <br>
      <strong>Knowledge:</strong> ${role.knowledge} <br>
      ${overheardHTML}
      <strong>Suspects:</strong> ${role.suspects.join(", ")} <br>
      <strong>Goal:</strong> ${role.goal}
    `;

    roleOutput.style.color = "#b30000";
    roleOutput.style.fontWeight = "bold";

  } else {
    roleOutput.textContent = "Invalid code. Please try again.";
    roleOutput.style.color = "#ff4d4d";
    roleOutput.style.fontWeight = "normal";
  }
}

revealBtn.addEventListener('click', revealRole);

codeInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    revealRole();
  }
});
