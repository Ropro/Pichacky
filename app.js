const MONTHS_CS = [
  "Leden",
  "Únor",
  "Březen",
  "Duben",
  "Květen",
  "Červen",
  "Červenec",
  "Srpen",
  "Září",
  "Říjen",
  "Listopad",
  "Prosinec",
];
const DAYS_CS = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];

let timerInterval = null;
let displayMonth = null; // { year, month }

// ─── WEATHER & NAME DAYS ──────────────────────────────────────────
const CZECH_HOLIDAYS_2026 = {
  "01-01": "Nový rok",
  "04-18": "Velký pátek",
  "04-20": "Velikonoční pondělí",
  "05-01": "Svátek práce",
  "05-08": "Den vítězství",
  "07-05": "Den slovanských věrozvěstů Cyrila a Metoděje",
  "07-06": "Den upálení mistra Jana Husa",
  "09-28": "Den české státnosti",
  "10-28": "Den vzniku samostatného československého státu",
  "11-17": "Den boje za svobodu a demokracii",
  "12-24": "Štědrý den",
  "12-25": "1. svátek vánoční",
  "12-26": "2. svátek vánoční"
};
// Mapa českých jmen svátků (zjednodušená - hlavní jména)
const CZECH_NAME_DAYS = {
  "01-01": "Nový rok",
  "01-02": "Karina",
  "01-03": "Radmila",
  "01-04": "Diana",
  "01-05": "Dalimil",
  "01-06": "Tři králové",
  "01-07": "Vilma",
  "01-08": "Čestmír",
  "01-09": "Vladan",
  "01-10": "Břetislav",
  "01-11": "Bohdana",
  "01-12": "Pravoslav",
  "01-13": "Edita",
  "01-14": "Radovan",
  "01-15": "Alice",
  "01-16": "Ctirad",
  "01-17": "Drahoslav",
  "01-18": "Vladislav",
  "01-19": "Doubravka",
  "01-20": "Ilona",
  "01-21": "Běla",
  "01-22": "Slavomír",
  "01-23": "Zdeněk",
  "01-24": "Milena",
  "01-25": "Miloš",
  "01-26": "Zora",
  "01-27": "Ingrid",
  "01-28": "Otýlie",
  "01-29": "Zdislava",
  "01-30": "Robin",
  "01-31": "Marika",
  "02-01": "Hynek",
  "02-02": "Nela",
  "02-03": "Blažej",
  "02-04": "Jarmila",
  "02-05": "Dobromila",
  "02-06": "Vanda",
  "02-07": "Veronika",
  "02-08": "Milada",
  "02-09": "Apolena",
  "02-10": "Mojmír",
  "02-11": "Božena",
  "02-12": "Slavěna",
  "02-13": "Věnceslav",
  "02-14": "Valentýn",
  "02-15": "Jiřina",
  "02-16": "Ljuba",
  "02-17": "Miloslava",
  "02-18": "Gizela",
  "02-19": "Patrik",
  "02-20": "Oldřich",
  "02-21": "Lenka",
  "02-22": "Petr",
  "02-23": "Svatopluk",
  "02-24": "Matěj",
  "02-25": "Liliana",
  "02-26": "Dorota",
  "02-27": "Alexandr",
  "02-28": "Lumír",
  "02-29": "Horymír",
  "03-01": "Bedřich",
  "03-02": "Anežka",
  "03-03": "Kamil",
  "03-04": "Stela",
  "03-05": "Kazimír",
  "03-06": "Miroslav",
  "03-07": "Tomáš",
  "03-08": "Gabriela",
  "03-09": "Františka",
  "03-10": "Viktorie",
  "03-11": "Anděla",
  "03-12": "Řehoř",
  "03-13": "Růžena",
  "03-14": "Rút",
  "03-15": "Ida",
  "03-16": "Elena",
  "03-17": "Vlastimil",
  "03-18": "Eduard",
  "03-19": "Josef",
  "03-20": "Světlana",
  "03-21": "Radek",
  "03-22": "Leona",
  "03-23": "Ivona",
  "03-24": "Gabriel",
  "03-25": "Marián",
  "03-26": "Emanuel",
  "03-27": "Dita",
  "03-28": "Soňa",
  "03-29": "Taťána",
  "03-30": "Arnošt",
  "03-31": "Kvido",
  "04-01": "Hugo",
  "04-02": "Erika",
  "04-03": "Richard",
  "04-04": "Ivana",
  "04-05": "Miroslava",
  "04-06": "Vendula",
  "04-07": "Heřman",
  "04-08": "Ema",
  "04-09": "Dušan",
  "04-10": "Darja",
  "04-11": "Izabela",
  "04-12": "Julius",
  "04-13": "Aleš",
  "04-14": "Vincenc",
  "04-15": "Anastázie",
  "04-16": "Irena",
  "04-17": "Rudolf",
  "04-18": "Valérie",
  "04-19": "Rostislav",
  "04-20": "Marcela",
  "04-21": "Alexandra",
  "04-22": "Evženie",
  "04-23": "Vojtěch",
  "04-24": "Jiří",
  "04-25": "Marek",
  "04-26": "Oto",
  "04-27": "Jaroslav",
  "04-28": "Vlastislav",
  "04-29": "Robert",
  "04-30": "Blahoslav",
  "05-01": "Svátek práce",
  "05-02": "Zikmund",
  "05-03": "Alexej",
  "05-04": "Květoslav",
  "05-05": "Klaudie",
  "05-06": "Radoslav",
  "05-07": "Stanislav",
  "05-08": "Den vítězství",
  "05-09": "Ctibor",
  "05-10": "Blažena",
  "05-11": "Svatava",
  "05-12": "Pankrác",
  "05-13": "Servác",
  "05-14": "Bonifác",
  "05-15": "Žofie",
  "05-16": "Přemysl",
  "05-17": "Aneta",
  "05-18": "Nataša",
  "05-19": "Ivo",
  "05-20": "Zbyšek",
  "05-21": "Monika",
  "05-22": "Emil",
  "05-23": "Vladimír",
  "05-24": "Jana",
  "05-25": "Viola",
  "05-26": "Filip",
  "05-27": "Valdemar",
  "05-28": "Vilém",
  "05-29": "Maxmilián",
  "05-30": "Ferdinand",
  "05-31": "Kamila",
  "06-01": "Laura",
  "06-02": "Jarmil",
  "06-03": "Tamara",
  "06-04": "Dalibor",
  "06-05": "Dobroslav",
  "06-06": "Norbert",
  "06-07": "Iveta",
  "06-08": "Medard",
  "06-09": "Stanislava",
  "06-10": "Gita",
  "06-11": "Bruno",
  "06-12": "Antonie",
  "06-13": "Antonín",
  "06-14": "Roland",
  "06-15": "Vít",
  "06-16": "Zbyněk",
  "06-17": "Adolf",
  "06-18": "Milan",
  "06-19": "Leoš",
  "06-20": "Květa",
  "06-21": "Alois",
  "06-22": "Pavla",
  "06-23": "Zdeňka",
  "06-24": "Jan",
  "06-25": "Ivan",
  "06-26": "Adriana",
  "06-27": "Ladislav",
  "06-28": "Lubomír",
  "06-29": "Petr a Pavel",
  "06-30": "Šárka",
  "07-01": "Jaroslava",
  "07-02": "Patricie",
  "07-03": "Radomír",
  "07-04": "Prokop",
  "07-05": "Cyril a Metoděj",
  "07-06": "Jan Hus",
  "07-07": "Bohuslava",
  "07-08": "Nora",
  "07-09": "Drahoslava",
  "07-10": "Libuše",
  "07-11": "Olga",
  "07-12": "Bořek",
  "07-13": "Markéta",
  "07-14": "Karolína",
  "07-15": "Jindřich",
  "07-16": "Luboš",
  "07-17": "Martina",
  "07-18": "Drahomíra",
  "07-19": "Čeněk",
  "07-20": "Ilja",
  "07-21": "Vítězslav",
  "07-22": "Magdaléna",
  "07-23": "Libor",
  "07-24": "Kristýna",
  "07-25": "Jakub",
  "07-26": "Anna",
  "07-27": "Věroslav",
  "07-28": "Viktor",
  "07-29": "Marta",
  "07-30": "Bořivoj",
  "07-31": "Ignác",
  "08-01": "Oskar",
  "08-02": "Gustav",
  "08-03": "Miluše",
  "08-04": "Dominik",
  "08-05": "Kristián",
  "08-06": "Oldřiška",
  "08-07": "Lada",
  "08-08": "Soběslav",
  "08-09": "Roman",
  "08-10": "Vavřinec",
  "08-11": "Zuzana",
  "08-12": "Klára",
  "08-13": "Alena",
  "08-14": "Alan",
  "08-15": "Hana",
  "08-16": "Jáchym",
  "08-17": "Petra",
  "08-18": "Helena",
  "08-19": "Ludvík",
  "08-20": "Bernard",
  "08-21": "Johana",
  "08-22": "Bohuslav",
  "08-23": "Sandra",
  "08-24": "Bartoloměj",
  "08-25": "Radim",
  "08-26": "Luděk",
  "08-27": "Otakar",
  "08-28": "Augustýn",
  "08-29": "Evelína",
  "08-30": "Vladěna",
  "08-31": "Pavel",
  "09-01": "Linda",
  "09-02": "Adéla",
  "09-03": "Bronislav",
  "09-04": "Jindřiška",
  "09-05": "Boris",
  "09-06": "Boleslav",
  "09-07": "Regína",
  "09-08": "Mariana",
  "09-09": "Daniela",
  "09-10": "Irma",
  "09-11": "Deník",
  "09-12": "Marie",
  "09-13": "Lubor",
  "09-14": "Radka",
  "09-15": "Jolana",
  "09-16": "Ludmila",
  "09-17": "Naděžda",
  "09-18": "Kryštof",
  "09-19": "Zita",
  "09-20": "Oleg",
  "09-21": "Matouš",
  "09-22": "Darina",
  "09-23": "Berta",
  "09-24": "Jaromír",
  "09-25": "Zlata",
  "09-26": "Andrea",
  "09-27": "Jonáš",
  "09-28": "Václav",
  "09-29": "Michal",
  "09-30": "Jeroným",
  "10-01": "Igor",
  "10-02": "Olívie",
  "10-03": "Bohumil",
  "10-04": "František",
  "10-05": "Eliška",
  "10-06": "Hanuš",
  "10-07": "Justýna",
  "10-08": "Věra",
  "10-09": "Štefan",
  "10-10": "Marina",
  "10-11": "Andrej",
  "10-12": "Marcel",
  "10-13": "Renáta",
  "10-14": "Agáta",
  "10-15": "Tereza",
  "10-16": "Havel",
  "10-17": "Hedvika",
  "10-18": "Lukáš",
  "10-19": "Michaela",
  "10-20": "Vendelín",
  "10-21": "Brigita",
  "10-22": "Sabina",
  "10-23": "Teodor",
  "10-24": "Nina",
  "10-25": "Beáta",
  "10-26": "Erik",
  "10-27": "Šarlota",
  "10-28": "Vojtěch",
  "10-29": "Drahoslav",
  "10-30": "Simona",
  "10-31": "Lucie",
  "11-01": "Tibor",
  "11-02": "Otakar",
  "11-03": "Martin",
  "11-04": "Sýkora",
  "11-05": "Ema",
  "11-06": "Karolína",
  "11-07": "Lenka",
  "11-08": "Laura",
  "11-09": "Stanislav",
  "11-10": "Svatopluk",
  "11-11": "Bartoloměj",
  "11-12": "Josef",
  "11-13": "Albína",
  "11-14": "Adolf",
  "11-15": "Leopold",
  "11-16": "Otmar",
  "11-17": "Mahulena",
  "11-18": "Romana",
  "11-19": "Alžběta",
  "11-20": "Nikola",
  "11-21": "Marie",
  "11-22": "Cecílie",
  "11-23": "Klement",
  "11-24": "Emílie",
  "11-25": "Kateřina",
  "11-26": "Artur",
  "11-27": "Xenie",
  "11-28": "René",
  "11-29": "Zina",
  "11-30": "Ondřej",
  "12-01": "Iva",
  "12-02": "Blanka",
  "12-03": "Svatoslav",
  "12-04": "Barbora",
  "12-05": "Jitka",
  "12-06": "Mikuláš",
  "12-07": "Ambrož",
  "12-08": "Květoslava",
  "12-09": "Vratislav",
  "12-10": "Julie",
  "12-11": "Dana",
  "12-12": "Simona",
  "12-13": "Lucie",
  "12-14": "Lýdie",
  "12-15": "Radana",
  "12-16": "Albína",
  "12-17": "Daniel",
  "12-18": "Miloslav",
  "12-19": "Ester",
  "12-20": "Dagmar",
  "12-21": "Natálie",
  "12-22": "Šimon",
  "12-23": "Vlasta",
  "12-24": "Adam a Eva",
  "12-25": "Štědrý den",
  "12-26": "Štěpán",
  "12-27": "Žaneta",
  "12-28": "Bohumila",
  "12-29": "Judita",
  "12-30": "David",
  "12-31": "Silvestr"
};

async function loadWeather() {
  try {
    // Jednoduchý fetch z wttr.in
    const response = await fetch('https://wttr.in/Praha?format=%t');
    if (response.ok) {
      const temp = await response.text();
      document.getElementById("weather-info").textContent = `Praha: ${temp.trim()}`;
    } else {
      document.getElementById("weather-info").textContent = "Počasí nedostupné";
    }
  } catch (error) {
    console.log('Weather error:', error);
    document.getElementById("weather-info").textContent = "Počasí nedostupné";
  }
}

function loadNameDays() {
  // Pro testování použijeme pevně 3.4.2026
  const today = new Date(2026, 3, 3); // Rok, měsíc (0-based), den
  console.log('Today date object:', today);
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateKey = `${month}-${day}`;

  console.log('Loading name days for:', dateKey);

  // Zkontrolujeme státní svátek
  const stateHoliday = CZECH_HOLIDAYS_2026[dateKey];
  let holidayText = stateHoliday ? `🇨🇿 ${stateHoliday}` : "";

  // Přidáme jména svátků
  const nameDay = CZECH_NAME_DAYS[dateKey];
  console.log('Name day found:', nameDay);
  if (nameDay) {
    const nameDayText = `🎂 Dnešní svátek má: ${nameDay}`;
    holidayText = holidayText ? `${holidayText} • ${nameDayText}` : nameDayText;
  }

  console.log('Final holiday text:', holidayText);
  document.getElementById("holiday-info").textContent = holidayText;
}

function checkHoliday() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateKey = `${month}-${day}`;

  const holiday = CZECH_HOLIDAYS_2026[dateKey];
  return holiday ? `🇨🇿 ${holiday}` : null;
}

// ─── DEBUG MODE ───────────────────────────────────────────────────
function isDebugEnabled() {
  return localStorage.getItem("pichacky_debug") === "true";
}

window.enableDebug = () => {
  localStorage.setItem("pichacky_debug", "true");
  console.log("✅ Debug mode aktivován. Stránka se obnoví...");
  location.reload();
};

window.disableDebug = () => {
  localStorage.removeItem("pichacky_debug");
  console.log("❌ Debug mode deaktivován. Stránka se obnoví...");
  location.reload();
};

// ─── DATA MODEL ───────────────────────────────────────────────────
// settings: { hourlyRate, workSite, breakMinutes }
// session: { startTime: ISO string } | null
// records: [ { date, site, start, end, breakMin, netMinutes, earnings } ]

function loadSettings() {
  return JSON.parse(
    localStorage.getItem("pichacky_settings") ||
      '{"hourlyRate":0,"workSite":"","breakMinutes":0}',
  );
}

function saveSettingsData(s) {
  localStorage.setItem("pichacky_settings", JSON.stringify(s));
}

function loadSession() {
  const s = localStorage.getItem("pichacky_session");
  return s ? JSON.parse(s) : null;
}

function saveSession(s) {
  if (s) localStorage.setItem("pichacky_session", JSON.stringify(s));
  else localStorage.removeItem("pichacky_session");
}

function loadRecords() {
  return JSON.parse(localStorage.getItem("pichacky_records") || "[]");
}

function saveRecords(r) {
  localStorage.setItem("pichacky_records", JSON.stringify(r));
}

// ─── INIT ─────────────────────────────────────────────────────────
function init() {
  const now = new Date();
  displayMonth = { year: now.getFullYear(), month: now.getMonth() };

  // Load settings
  const settings = loadSettings();
  document.getElementById("hourly-rate").value =
    settings.hourlyRate || "";
  document.getElementById("work-site").value = settings.workSite || "";
  setBreakDisplay(settings.breakMinutes || 0);

  // Check for open session
  const session = loadSession();
  if (session) {
    activateSession(session);
  }

  startClock();
  renderMonth();
  updateTodaySummary();

  // Load weather and check holiday
  console.log('Calling loadWeather and loadNameDays');
  loadWeather();
  loadNameDays();

  // Modal event listeners
  document.getElementById("edit-modal").addEventListener("click", (e) => {
    if (e.target.id === "edit-modal") closeEditModal();
  });

  document
    .getElementById("modal-end")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") saveEditModal();
    });
}

// ─── CLOCK ────────────────────────────────────────────────────────
function startClock() {
  function tick() {
    const now = new Date();
    document.getElementById("live-time").textContent = formatTime(now);
    document.getElementById("live-date").textContent =
      DAYS_CS[now.getDay()] +
      " " +
      now.getDate() +
      ". " +
      (now.getMonth() + 1) +
      ". " +
      now.getFullYear();
    if (loadSession()) updateElapsed();
  }
  tick();
  setInterval(tick, 1000);

  // Update weather every 30 minutes
  setInterval(loadWeather, 30 * 60 * 1000);
}

function updateElapsed() {
  const session = loadSession();
  if (!session) return;
  const elapsed = Date.now() - new Date(session.startTime).getTime();
  document.getElementById("timer-display").textContent =
    formatDuration(elapsed);
}

// ─── SETTINGS ─────────────────────────────────────────────────────
function saveSettings() {
  const settings = {
    hourlyRate:
      parseFloat(document.getElementById("hourly-rate").value) || 0,
    workSite: document.getElementById("work-site").value.trim(),
    breakMinutes: loadSettings().breakMinutes,
  };
  saveSettingsData(settings);
  document.getElementById("header-site").textContent = settings.workSite
    ? "— " + settings.workSite
    : "";
  updateTodaySummary();
  renderMonth();
}

function setBreak(minutes, btn) {
  document
    .querySelectorAll(".break-btn")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
  const settings = loadSettings();
  settings.breakMinutes = minutes;
  saveSettingsData(settings);
  const session = loadSession();
  if (session) {
    session.breakMinutes = minutes;
    saveSession(session);
  }
  updateTodaySummary();
  renderMonth();
}

function setBreakDisplay(minutes) {
  const btns = document.querySelectorAll(".break-btn");
  btns.forEach((b) => b.classList.remove("selected"));
  if (minutes === 0) btns[0].classList.add("selected");
  else if (minutes === 30) btns[1].classList.add("selected");
  else if (minutes === 60) btns[2].classList.add("selected");
}

// ─── WORK START / END ─────────────────────────────────────────────
function startWork() {
  const now = new Date();
  const settings = loadSettings();
  const session = {
    startTime: now.toISOString(),
    site: settings.workSite,
    breakMinutes: settings.breakMinutes,
  };
  saveSession(session);
  activateSession(session);
  showToast("Směna zahájena v " + formatTime(now));
}

function activateSession(session) {
  document.getElementById("btn-start").disabled = true;
  document.getElementById("btn-end").classList.add("enabled");
  document.getElementById("status-badge").classList.add("active");
  document.getElementById("status-text").textContent = "V práci";
  document.getElementById("timer-display").classList.add("active");
  document.getElementById("timer-subtitle").textContent =
    "Příchod: " + formatTime(new Date(session.startTime));
  document.getElementById("today-section").style.display = "";
  document.getElementById("stat-start").textContent = formatTime(
    new Date(session.startTime),
  );
  if (isDebugEnabled()) {
    document.getElementById("debug-row").style.display = "";
  }
  updateElapsed();
}

function endWork() {
  const session = loadSession();
  if (!session) return;
  finalizeSession(session, new Date());
}

function finalizeSession(session, endTime) {
  const settings = loadSettings();
  const startTime = new Date(session.startTime);
  const breakMin =
    session.breakMinutes !== undefined
      ? session.breakMinutes
      : settings.breakMinutes;
  const grossMinutes = (endTime - startTime) / 60000;
  const netMinutes = Math.max(0, grossMinutes - breakMin);
  const earnings = (netMinutes / 60) * settings.hourlyRate;

  const record = {
    id: Date.now(),
    date: toDateStr(startTime),
    site: session.site || settings.workSite || "",
    start: formatTime(startTime),
    end: formatTime(endTime),
    breakMin: breakMin,
    netMinutes: Math.round(netMinutes),
    earnings: Math.round(earnings),
    hourlyRate: settings.hourlyRate,
  };

  const records = loadRecords();
  records.push(record);
  saveRecords(records);
  saveSession(null);

  // Reset UI
  deactivateSession(endTime, record);
  showToast(
    "Směna ukončena — " + minutesToHM(record.netMinutes) + " odpracováno",
  );
  renderMonth();
}

function deactivateSession(endTime, record) {
  document.getElementById("btn-start").disabled = false;
  document.getElementById("btn-end").classList.remove("enabled");
  document.getElementById("status-badge").classList.remove("active");
  document.getElementById("status-text").textContent = "Mimo práci";
  document.getElementById("timer-display").classList.remove("active");
  document.getElementById("timer-subtitle").textContent =
    "Dnešní odpracovaný čas";
  document.getElementById("debug-row").style.display = "none";
  updateTodaySummary();
}

function updateTodaySummary() {
  const todayStr = toDateStr(new Date());
  const records = loadRecords().filter((r) => r.date === todayStr);
  if (records.length === 0) return;

  document.getElementById("today-section").style.display = "";

  const totalMin = records.reduce((s, r) => s + r.netMinutes, 0);
  const totalEarnings = records.reduce((s, r) => s + r.earnings, 0);
  const totalBreak = records.reduce((s, r) => s + r.breakMin, 0);

  document.getElementById("stat-start").textContent = records[0].start;
  document.getElementById("stat-end").textContent =
    records[records.length - 1].end;
  document.getElementById("stat-break").textContent = totalBreak + " min";
  document.getElementById("stat-hours").textContent =
    minutesToHM(totalMin);
  document.getElementById("stat-earnings").textContent =
    totalEarnings.toLocaleString("cs-CZ") + " Kč";

  const session = loadSession();
  if (!session) {
    document.getElementById("timer-display").textContent =
      minutesToHMS(totalMin);
    document.getElementById("timer-subtitle").textContent =
      "Dnešní odpracovaný čas";
  }
}

// ─── DEBUG ────────────────────────────────────────────────────────
function debugAdjustTime(seconds) {
  const session = loadSession();
  if (!session) return;
  const startTime = new Date(session.startTime);
  startTime.setSeconds(startTime.getSeconds() - seconds);
  session.startTime = startTime.toISOString();
  saveSession(session);
  activateSession(session);
  showToast(
    "Debug: čas posunut o " +
      (seconds > 0 ? "+" : "") +
      Math.round(seconds / 60) +
      " min",
  );
}

// ─── NIGHT SHIFT ──────────────────────────────────────────────────
function addNightShift() {
  const settings = loadSettings();
  const todayStr = toDateStr(new Date());

  const record = {
    id: Date.now(),
    date: todayStr,
    site: "Odstávka TKB",
    start: "22:00",
    end: "05:00",
    breakMin: 0,
    netMinutes: 420,
    earnings: Math.round(7 * settings.hourlyRate),
    hourlyRate: settings.hourlyRate,
  };

  const records = loadRecords();
  records.push(record);
  saveRecords(records);

  showToast("Noční směna přidána — 7:00 odpracováno");
  updateTodaySummary();
  renderMonth();
}

// ─── RENDER MONTH ─────────────────────────────────────────────────
function renderMonth() {
  const { year, month } = displayMonth;
  document.getElementById("month-label").textContent =
    MONTHS_CS[month] + " " + year;

  const monthStr = year + "-" + String(month + 1).padStart(2, "0");
  const records = loadRecords().filter((r) =>
    r.date.startsWith(monthStr),
  );
  records.sort((a, b) => a.date.localeCompare(b.date));

  const settings = loadSettings();
  const totalMin = records.reduce((s, r) => s + r.netMinutes, 0);
  const totalEarnings = records.reduce((s, r) => s + r.earnings, 0);
  const uniqueDays = [...new Set(records.map((r) => r.date))].length;

  document.getElementById("total-hours").textContent =
    minutesToHM(totalMin);
  document.getElementById("total-days").textContent =
    uniqueDays +
    (uniqueDays === 1 ? " den" : uniqueDays < 5 ? " dny" : " dní");
  document.getElementById("total-earnings").textContent =
    totalEarnings.toLocaleString("cs-CZ") + " Kč";
  document.getElementById("total-rate-info").textContent =
    settings.hourlyRate ? settings.hourlyRate + " Kč/hod" : "";

  // Site breakdown
  const sites = {};
  records.forEach((r) => {
    const s = r.site || "(bez názvu)";
    sites[s] = (sites[s] || 0) + r.netMinutes;
  });
  const siteKeys = Object.keys(sites);

  if (siteKeys.length > 1) {
    document.getElementById("site-breakdown-card").style.display = "";
    const bd = document.getElementById("site-breakdown");
    bd.innerHTML = "";
    siteKeys
      .sort((a, b) => sites[b] - sites[a])
      .forEach((s) => {
        const pct = totalMin > 0 ? (sites[s] / totalMin) * 100 : 0;
        bd.innerHTML += `
  <div class="site-row">
    <div class="site-row-name">${escHtml(s)}</div>
    <div class="site-row-bar-wrap"><div class="site-row-bar" style="width:${pct.toFixed(1)}%"></div></div>
    <div class="site-row-hours">${minutesToHM(sites[s])}</div>
  </div>`;
      });
  } else {
    document.getElementById("site-breakdown-card").style.display = "none";
  }

  // Table
  const tbody = document.getElementById("records-tbody");
  if (records.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><div class="icon">📋</div><p>Žádné záznamy v tomto měsíci</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = records
    .map((r) => {
      const d = new Date(r.date + "T00:00:00");
      const dayName = DAYS_CS[d.getDay()];
      const dayNum = d.getDate() + ". " + (d.getMonth() + 1) + ".";
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const editBtn = isDebugEnabled()
        ? `<button class="action-btn edit-btn" onclick="openEditModal(${r.id})">✏️ Edit</button>`
        : "";
      const deleteBtn = `<button class="action-btn delete-btn" onclick="deleteRecord(${r.id})">🗑️ Del</button>`;
      return `<tr style="${isWeekend ? "opacity:0.5" : ""}">
<td class="label">${dayName} ${dayNum}</td>
<td class="site-tag"><span class="site-pill">${escHtml(r.site || "—")}</span></td>
<td>${r.start}</td>
<td>${r.end}</td>
<td class="label">${r.breakMin > 0 ? r.breakMin + " min" : "—"}</td>
<td class="hours-cell">${minutesToHM(r.netMinutes)}</td>
<td class="earnings-cell">${r.earnings.toLocaleString("cs-CZ")} Kč</td>
<td style="text-align: center; font-size: 12px;">${editBtn}${deleteBtn}</td>
</tr>`;
    })
    .join("");
}

function changeMonth(dir) {
  displayMonth.month += dir;
  if (displayMonth.month < 0) {
    displayMonth.month = 11;
    displayMonth.year--;
  }
  if (displayMonth.month > 11) {
    displayMonth.month = 0;
    displayMonth.year++;
  }
  renderMonth();
}

// ─── HELPERS ──────────────────────────────────────────────────────
function formatTime(d) {
  return (
    String(d.getHours()).padStart(2, "0") +
    ":" +
    String(d.getMinutes()).padStart(2, "0")
  );
}

function toDateStr(d) {
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

function formatDuration(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return (
    String(h).padStart(2, "0") +
    ":" +
    String(m).padStart(2, "0") +
    ":" +
    String(sec).padStart(2, "0")
  );
}

function minutesToHM(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h + ":" + String(m).padStart(2, "0");
}

function minutesToHMS(min) {
  return (
    String(Math.floor(min / 60)).padStart(2, "0") +
    ":" +
    String(min % 60).padStart(2, "0") +
    ":00"
  );
}

function escHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

// ─── EDIT & DELETE ────────────────────────────────────────────────
let editingRecordId = null;

function openEditModal(recordId) {
  editingRecordId = recordId;
  const records = loadRecords();
  const record = records.find((r) => r.id === recordId);
  if (!record) return;

  document.getElementById("modal-start").value = record.start;
  document.getElementById("modal-end").value = record.end;
  document.getElementById("modal-site").value = record.site || "";
  document.getElementById("modal-break").value = record.breakMin || 0;
  document.getElementById("edit-modal").classList.add("show");
}

function closeEditModal() {
  document.getElementById("edit-modal").classList.remove("show");
  editingRecordId = null;
}

function saveEditModal() {
  if (!editingRecordId) return;

  const start = document.getElementById("modal-start").value.trim();
  const end = document.getElementById("modal-end").value.trim();
  const site = document.getElementById("modal-site").value.trim();
  const breakMin = parseInt(
    document.getElementById("modal-break").value || "0",
  );

  // Validace formátu HH:MM
  if (!/^\d{2}:\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(end)) {
    showToast("❌ Chybný formát času (použij HH:MM)");
    return;
  }

  const records = loadRecords();
  const record = records.find((r) => r.id === editingRecordId);
  if (!record) return;

  // Přepočet hodin
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  let grossMinutes = endH * 60 + endM - (startH * 60 + startM);

  // Pokud je čas přes půlnoc (např. 22:00 do 05:00)
  if (grossMinutes < 0) {
    grossMinutes += 24 * 60;
  }

  const netMinutes = Math.max(0, grossMinutes - breakMin);
  const settings = loadSettings();
  const earnings = Math.round((netMinutes / 60) * settings.hourlyRate);

  record.start = start;
  record.end = end;
  record.site = site;
  record.breakMin = breakMin;
  record.netMinutes = netMinutes;
  record.earnings = earnings;

  saveRecords(records);
  closeEditModal();
  showToast("✅ Záznam upraven");
  renderMonth();
}

function deleteRecord(recordId) {
  if (!confirm("Opravdu smazat tento záznam?")) return;

  const records = loadRecords();
  const idx = records.findIndex((r) => r.id === recordId);
  if (idx === -1) return;

  records.splice(idx, 1);
  saveRecords(records);
  showToast("🗑️ Záznam smazán");
  updateTodaySummary();
  renderMonth();
}

init();