const STORAGE_KEY = "dysc-v1";

const UNIT_CATEGORIES = [
  {
    id: "cab",
    title: "Inside the Cab",
    items: [
      "Dashboard warning lights – none illuminated after start-up",
      "Tachograph – functioning correctly",
      "Steering – free play within limits, no jamming",
      "Horn – working",
      "Brakes – air builds up to correct pressure, low-pressure warning sounds, service brake pedal firm with no excessive travel, parking brake holds",
      "Footwell – clear, nothing obstructing pedals",
      "Seatbelt – present, undamaged, locks",
      "Mirrors – clean, secure, correctly adjusted",
      "Windscreen / wipers / washers – no cracks, wipers not perished"
    ]
  },
  {
    id: "walkaround",
    title: "Walkaround – Exterior",
    items: [
      "Tyres & wheels – tread ≥ 1 mm, correct pressure, no cuts/bulges/exposed cords, wheel nuts tight, no debris between twins",
      "Lights – position, brake, indicators, fog, rear fog, plate lights all working",
      "Markers & reflectors – present, undamaged",
      "Body security – no loose panels, doors secure, nothing likely to fall off",
      "Sideguards & rear under-run protection – fitted, secure, not damaged",
      "Spray suppression – fitted and secure where required",
      "Fluids – engine oil, coolant, AdBlue, hydraulic (if applicable) – no leaks, levels correct",
      "Exhaust – not loose, no visible damage",
      "Air tanks & brake lines – no audible leaks, hoses not damaged",
      "Registration plates – clean, readable, secure",
      "Height marker – correct and visible in cab (if over 3 m)",
      "No visible damage"
    ]
  }
];

const TRAILER_CATEGORIES = [
  {
    id: "coupling",
    title: "Coupling & Landing Gear",
    items: [
      "Kingpin / drawbar – correct size, fully engaged, lock in place",
      "Landing legs – operate freely, no cracks, warning signs legible",
      "Air lines (red = emergency, yellow = service) – no kinks, clips secure"
    ]
  },
  {
    id: "wheels",
    title: "Wheels & Tyres",
    items: [
      "Tyres – tread ≥ 1 mm, correct pressure, no cuts/bulges/cords, correct size/type",
      "Wheel nuts – tight, no missing or sheared",
      "No debris between twin wheels"
    ]
  },
  {
    id: "braking",
    title: "Braking",
    items: [
      "Service brake – operates correctly (tested from cab)",
      "Emergency brake – engages when air line disconnected",
      "ABS/EBS indicators – no fault lights on dashboard",
      "Brake lines/hoses – no visible damage or leaks"
    ]
  },
  {
    id: "lights",
    title: "Lights & Electrical",
    items: [
      "Lamps – position, brake, indicators, rear fog, plate lights all working",
      "Markers & reflectors – present, undamaged",
      "Electrical connections – secure, wiring insulated, no damage"
    ]
  },
  {
    id: "body",
    title: "Body & Structure",
    items: [
      "Doors / curtains / tail lift – secure, operate correctly, no hydraulic leaks",
      "Chassis – no visible cracks, heavy corrosion, or poor repairs",
      "Suspension – no visible damage or insecure components",
      "Sideguards & rear under-run – fitted and secure",
      "Load security – cargo properly strapped, blocked, braced; load evenly distributed",
      "Curtain straps and buckles – present, secure, not damaged",
      "Internal straps, nets and track rails – present, secure, and suitable for the load"
    ]
  }
];

const TRAILER_TYPES = [
  {
    id: "curtain",
    label: "Curtain sider",
    items: [
      "Curtains – undamaged, no tears, tensioned correctly",
      "Curtain straps and buckles – present, secure, not damaged",
      "Curtain poles and rollers – present and running freely",
      "Roof and rear doors – secure and shut",
      "Internal straps, nets and track rails – present, secure, and suitable for the load",
      "Load security – cargo strapped, blocked or braced, and evenly distributed",
      "Sideguards and rear under-run – fitted and secure"
    ]
  },
  {
    id: "box",
    label: "Box van",
    items: [
      "Body panels – secure, no loose sheets, nothing likely to fall off",
      "Rear doors or shutter – shut, locks work, seals intact",
      "Tail lift – stowed and secure, no hydraulic leaks, if fitted",
      "Internal straps, nets and track rails – present, secure, and suitable for the load",
      "Load security – cargo strapped, blocked or braced, and evenly distributed",
      "Sideguards and rear under-run – fitted and secure"
    ]
  },
  {
    id: "fridge",
    label: "Refrigerated",
    items: [
      "Fridge unit – secure, no fuel or refrigerant leaks, starts and runs",
      "Temperature display – working, setpoint suitable for the load",
      "Doors and seals – shut, seals intact, locks work",
      "Internal airflow – not blocked by the load",
      "Drain tubes – clear and in place",
      "Load security – cargo strapped or braced for the temperature-controlled load",
      "Sideguards and rear under-run – fitted and secure"
    ]
  },
  {
    id: "flatbed",
    label: "Flatbed",
    items: [
      "Deck, headboard and side boards – secure, not cracked or loose",
      "Lashing points – present and not damaged",
      "Straps, chains and tensioners – suitable, undamaged, and tight",
      "Load security – cargo strapped, chained or chained and tensioned, evenly distributed",
      "Sideguards and rear under-run – fitted and secure where required"
    ]
  },
  {
    id: "lowloader",
    label: "Low loader",
    items: [
      "Deck, neck and ramps or beaver tail – secure, not cracked",
      "Ramps – stowed and locked for travel, no hydraulic leaks",
      "Winch – secure, cable undamaged, if fitted",
      "Lashing points – present and not damaged",
      "Load security – machinery or load chained and tensioned, overhang marked if required",
      "Marker boards – fitted if the load overhangs"
    ]
  },
  {
    id: "skeletal",
    label: "Skeletal",
    items: [
      "Twist locks – all present, they operate, and they lock",
      "Frame and bolsters – no cracks, twists, or loose parts",
      "Container location points – not damaged",
      "Rear under-run – fitted and secure"
    ]
  },
  {
    id: "skeletal-container",
    label: "Skeletal with chassis (container)",
    items: [
      "Twist locks – locked into the container corner castings",
      "Container – seated square, not leaning, corner castings undamaged",
      "Container doors and seals – shut and secure",
      "CSC plate – present and in date",
      "Container body – no holes, severe dents, or loose parts",
      "Rear under-run – fitted and secure"
    ]
  },
  {
    id: "tipper",
    label: "Tipper",
    items: [
      "Body – secure, no cracks or holes, sits down for travel",
      "Body locks or clamps – engaged for travel",
      "Tailgate – shut and latched",
      "Hydraulic ram and pipes – no leaks, ram secure",
      "Sideguards and rear under-run – fitted and secure"
    ]
  },
  {
    id: "moving-floor",
    label: "Moving floor",
    items: [
      "Floor slats – present, not jammed or badly worn",
      "Floor drive and hydraulics – no leaks, guards in place",
      "Rear doors – shut and secure",
      "Load security – load suitable for a moving floor and evenly loaded",
      "Sideguards and rear under-run – fitted and secure"
    ]
  },
  {
    id: "tanker",
    label: "Tanker",
    items: [
      "Tank shell – no leaks, cracks, or fresh damage",
      "Manlids – closed and secure",
      "Valves, caps and hoses – shut, capped, and stowed",
      "Walkway and ladder – secure",
      "Earthing point – present and usable",
      "Hazard panels – fitted and correct, if required",
      "Compartments – outlets closed"
    ]
  }
];

function trailerTypeById(id) {
  return TRAILER_TYPES.find((type) => type.id === id) || null;
}

function trailerTypeName(trailer) {
  const type = trailerTypeById(trailer && trailer.type);
  const label = (type && type.label) || (trailer && trailer.typeLabel) || "";
  return label ? t(label) : "";
}

function trailerSummary(trailer) {
  const number = String((trailer && trailer.number) || "").trim();
  const typeName = trailerTypeName(trailer);
  if (number && typeName) return `${number} · ${typeName}`;
  return number || typeName;
}

function categoriesForTrailerType(type) {
  return [
    ...TRAILER_CATEGORIES.filter((cat) => cat.id !== "body"),
    { id: "body", title: type.label, items: type.items }
  ];
}

function trailerHasSnapshot(trailer) {
  return (trailer && trailer.categories || []).some((cat) => cat && Array.isArray(cat.items) && cat.items.length && cat.title);
}

function trailerCategories(trailer) {
  if (trailerHasSnapshot(trailer)) {
    return trailer.categories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      items: cat.items
    }));
  }
  const type = trailerTypeById(trailer && trailer.type);
  if (type) return categoriesForTrailerType(type);
  return TRAILER_CATEGORIES;
}

const RIGID_CATEGORIES = [
  {
    id: "cab",
    title: "Inside the Cab",
    items: [
      "Dashboard warning lights – none illuminated after start-up",
      "Tachograph – functioning correctly",
      "Speed limiter – no fault showing",
      "Steering – free play within limits, no jamming",
      "Horn – working",
      "Brakes – warning works, service brake firm with no excessive travel, parking brake holds",
      "Footwell – clear, nothing obstructing pedals",
      "Seatbelt – present, undamaged, locks",
      "Mirrors – clean, secure, correctly adjusted",
      "Windscreen / wipers / washers – no cracks, wipers not perished"
    ]
  },
  {
    id: "walkaround",
    title: "Walkaround – Exterior",
    items: [
      "Tyres & wheels – tread ≥ 1 mm, correct pressure, no cuts/bulges/exposed cords, wheel nuts tight, no debris between twin wheels where fitted",
      "Lights – position, brake, indicators, fog, rear fog, plate lights all working",
      "Markers & reflectors – present, undamaged",
      "Registration plates – clean, readable, secure",
      "Fluids – engine oil, coolant, AdBlue, fuel – no leaks, caps secure",
      "Exhaust – not loose, no visible damage",
      "Brake lines & hoses – no visible damage or leaks",
      "Mudguards – secure. Spray suppression where fitted",
      "Cab doors, steps & handles – secure, doors shut",
      "No visible damage"
    ]
  },
  {
    id: "body",
    title: "Body & Load",
    items: [
      "Body – panels, doors, curtains or sides secure, nothing likely to fall off",
      "Tail lift – stowed and secure, no hydraulic leaks, if fitted",
      "Sideguards & rear under-run – fitted and secure where required",
      "Chassis & suspension – no cracks, heavy corrosion, or loose parts",
      "Load security – cargo strapped, blocked or braced, and evenly distributed",
      "Height marker – correct and visible in the cab if the vehicle is over 3 m"
    ]
  }
];

const C2_CATEGORIES = [
  {
    id: "cab",
    title: "Inside the Cab",
    items: [
      "Dashboard warning lights – none illuminated after start-up, including ABS/EBS",
      "Tachograph – functioning correctly",
      "Speed limiter – no fault showing",
      "Steering – free play within limits, no jamming",
      "Horn – working",
      "Brakes – air builds up to correct pressure, low-pressure warning sounds, service brake pedal firm with no excessive travel, parking brake holds",
      "Footwell – clear, nothing obstructing pedals",
      "Seatbelt – present, undamaged, locks",
      "Mirrors – clean, secure, correctly adjusted",
      "Windscreen / wipers / washers – no cracks, wipers not perished"
    ]
  },
  {
    id: "walkaround",
    title: "Walkaround – Exterior",
    items: [
      "Tyres & wheels – tread ≥ 1 mm, correct pressure, no cuts/bulges/exposed cords, wheel nuts tight, no debris between twin wheels",
      "Lights – position, brake, indicators, fog, rear fog, plate lights all working",
      "Markers & reflectors – present, undamaged",
      "Registration plates – clean, readable, secure",
      "Spray suppression – fitted and secure",
      "Sideguards & rear under-run – fitted, secure, not damaged",
      "Fluids – engine oil, coolant, AdBlue, hydraulic – no leaks, levels correct",
      "Exhaust – not loose, no visible damage",
      "Air tanks & brake lines – no audible leaks, hoses not damaged",
      "Cab doors, steps & handles – secure, doors shut",
      "No visible damage"
    ]
  },
  {
    id: "body",
    title: "Body & Load",
    items: [
      "Doors, curtains or sides, and tail lift – secure, operate correctly, no hydraulic leaks",
      "Chassis – no visible cracks, heavy corrosion, or poor repairs",
      "Suspension – no visible damage or insecure components",
      "Load security – cargo strapped, blocked or braced, and evenly distributed",
      "Height marker – correct and visible in the cab if the vehicle is over 3 m"
    ]
  }
];

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { profile: null, records: [] };
  } catch {
    return { profile: null, records: [] };
  }
}

function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

const KM_PER_MILE = 1.609344;

function knownLanguage(code) {
  return typeof DYSCLANGS !== "undefined" && DYSCLANGS.some((lang) => lang.id === code);
}

function settings() {
  const raw = state.store.settings || {};
  state.store.settings = {
    mileage: raw.mileage !== false,
    height: raw.height !== false,
    unit: raw.unit === "miles" ? "miles" : "km",
    heightUnit: raw.heightUnit === "m" ? "m" : "ft",
    theme: raw.theme === "light" ? "light" : "dark",
    language: knownLanguage(raw.language) ? raw.language : "en",
    pdfLanguage: knownLanguage(raw.pdfLanguage) ? raw.pdfLanguage : "en"
  };
  return state.store.settings;
}

let stringLanguage = null;

function currentLanguage() {
  return stringLanguage || settings().language;
}

function pdfLanguage() {
  return settings().pdfLanguage;
}

function usingLanguage(code, fn) {
  const previous = stringLanguage;
  stringLanguage = knownLanguage(code) ? code : "en";
  try {
    return fn();
  } finally {
    stringLanguage = previous;
  }
}

function t(key, vars) {
  const pack = (typeof DYSCSTRINGS !== "undefined" && DYSCSTRINGS[currentLanguage()]) || {};
  let text = Object.prototype.hasOwnProperty.call(pack, key) && pack[key] ? pack[key] : key;
  if (vars) {
    Object.keys(vars).forEach((name) => {
      text = String(text).replaceAll(`{${name}}`, String(vars[name]));
    });
  }
  return text;
}

function pluralCategory(n) {
  try {
    return new Intl.PluralRules(currentLanguage()).select(n);
  } catch {
    return n === 1 ? "one" : "other";
  }
}

function tCount(key, n) {
  const packs = (typeof DYSCPLURALS !== "undefined" && (DYSCPLURALS[currentLanguage()] || DYSCPLURALS.en)) || {};
  const entry = packs[key] || (DYSCPLURALS.en && DYSCPLURALS.en[key]) || { other: key };
  const template = entry[pluralCategory(n)] || entry.other || entry.one || key;
  return String(template).replaceAll("{n}", String(n));
}

function monthNames() {
  if (typeof DYSCMONTHS === "undefined") {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  }
  return DYSCMONTHS[currentLanguage()] || DYSCMONTHS.en;
}

function applyLanguage() {
  const code = currentLanguage();
  const lang = (typeof DYSCLANGS !== "undefined" && DYSCLANGS.find((item) => item.id === code)) || { id: "en", html: "en", dir: "ltr" };
  document.documentElement.lang = lang.html || lang.id;
  document.documentElement.dir = lang.dir === "rtl" ? "rtl" : "ltr";
  document.title = t("HGV walkaround");
}

function captureProfileFields() {
  const form = document.getElementById("profile-form");
  if (!form) return;
  const data = new FormData(form);
  state.profileDraft = {
    name: String(data.get("name") || ""),
    company: String(data.get("company") || ""),
    unitReg: String(data.get("unitReg") || "")
  };
}

function setLanguage(code) {
  if (!knownLanguage(code)) return;
  captureProfileFields();
  const current = settings();
  const changed = current.language !== code;
  if (changed) {
    current.language = code;
    saveStore(state.store);
  }
  applyLanguage();
  const closeList = state.choosingLanguage;
  state.choosingLanguage = false;
  if (changed || closeList) render();
}

function setPdfLanguage(code) {
  if (!knownLanguage(code)) return;
  const current = settings();
  if (current.pdfLanguage !== code) {
    current.pdfLanguage = code;
    saveStore(state.store);
  }
  state.choosingLanguage = false;
  render();
}

function renderLanguagePicker(kind) {
  const pdf = kind === "pdf";
  const current = pdf ? settings().pdfLanguage : settings().language;
  const attr = pdf ? "data-set-pdf-lang" : "data-set-lang";
  return `
    <div class="lang-picker">
      ${DYSCLANGS.map((lang) => `
        <button type="button" class="lang-option ${lang.id === current ? "selected" : ""}" ${attr}="${lang.id}" aria-pressed="${lang.id === current ? "true" : "false"}">
          <span class="lang-flag" aria-hidden="true">${lang.flag}</span>
          <span>${escapeHtml(lang.name)}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function bindLanguagePicker() {
  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.setLang));
  });
}

function bindPdfLanguagePicker() {
  document.querySelectorAll("[data-set-pdf-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setPdfLanguage(btn.dataset.setPdfLang));
  });
}

function pdfLabels() {
  const lang = (typeof DYSCLANGS !== "undefined" && DYSCLANGS.find((item) => item.id === currentLanguage())) || { dir: "ltr" };
  return {
    app: t("HGV walkaround"),
    problems: t("YOU HAVE PROBLEMS REPORTED"),
    clear: t("NO PROBLEM 😊"),
    height: t("Height"),
    problem: t("PROBLEM"),
    ok: t("OK"),
    photos: t("Photos"),
    vehicle: t("Vehicle"),
    unit: t("Unit"),
    trailer: t("Trailer"),
    unitLine: t("Unit {n}"),
    trailerLine: t("Trailer {n}"),
    notRecorded: t("Not recorded"),
    startMileage: t("Start mileage"),
    endMileage: t("End mileage"),
    km: t("km"),
    dir: lang.dir === "rtl" ? "rtl" : "ltr"
  };
}

function mileageEnabled() {
  return settings().mileage !== false;
}

function heightEnabled() {
  return settings().height !== false;
}

function mileageUnitWord() {
  return settings().unit === "miles" ? t("miles") : t("km");
}

function convertMileageValue(value, fromUnit, toUnit) {
  const text = String(value ?? "").trim();
  if (!text || fromUnit === toUnit) return text;
  const number = Number(text.replace(/,/g, ""));
  if (!Number.isFinite(number)) return text;
  const converted = fromUnit === "km" ? number / KM_PER_MILE : number * KM_PER_MILE;
  return String(Math.round(converted));
}

function convertAllMileage(fromUnit, toUnit) {
  const convert = (value) => convertMileageValue(value, fromUnit, toUnit);
  for (const record of state.store.records || []) {
    record.startMileage = convert(record.startMileage);
    record.endMileage = convert(record.endMileage);
  }
  if (state.form) {
    state.form.startMileage = convert(state.form.startMileage);
    state.form.endMileage = convert(state.form.endMileage);
  }
}

function applyTheme() {
  const theme = settings().theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f3f5f8" : "#0b1220");
  const native = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.nativeApp;
  if (native) native.postMessage({ action: "theme", theme });
}

function setFlag(name) {
  const current = settings();
  current[name] = !current[name];
  saveStore(state.store);
  render();
}

function setTheme(theme) {
  if (theme !== "dark" && theme !== "light") return;
  const current = settings();
  if (current.theme === theme) return;
  current.theme = theme;
  saveStore(state.store);
  applyTheme();
  render();
}

function setMileageUnit(unit) {
  if (unit !== "km" && unit !== "miles") return;
  const current = settings();
  if (current.unit === unit) return;
  convertAllMileage(current.unit, unit);
  current.unit = unit;
  saveStore(state.store);
  render();
}

const METRES_PER_FOOT = 0.3048;
const METRES_PER_INCH = 0.0254;

function heightUnit() {
  return settings().heightUnit === "m" ? "m" : "ft";
}

function parseNonNegative(value) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  const number = Number(text);
  if (!Number.isFinite(number) || number < 0) return null;
  return number;
}

function readMetres(value) {
  let text = String(value ?? "").replace(/,/g, ".").replace(/[^\d.]/g, "");
  const dot = text.indexOf(".");
  if (dot !== -1) text = text.slice(0, dot + 1) + text.slice(dot + 1).replaceAll(".", "");
  return text;
}

function commitMetres(value) {
  const text = readMetres(value);
  if (!text || text === ".") return "";
  const number = Number(text);
  if (!Number.isFinite(number)) return "";
  return number.toFixed(2);
}

function feetInchesToMetres(feet, inches) {
  const feetNumber = parseNonNegative(feet);
  const inchesNumber = parseNonNegative(inches);
  if (feetNumber === null && inchesNumber === null) return "";
  const metres = (feetNumber || 0) * METRES_PER_FOOT + (inchesNumber || 0) * METRES_PER_INCH;
  return metres.toFixed(2);
}

function metresToFeetInches(metres) {
  const metresNumber = parseNonNegative(metres);
  if (metresNumber === null) return { heightFeet: "", heightInches: "" };
  let totalInches = Math.round(metresNumber / METRES_PER_INCH);
  if (totalInches < 0) totalInches = 0;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { heightFeet: String(feet), heightInches: String(inches) };
}

function heightOwnerStored(owner) {
  return Boolean(owner) && (
    Object.prototype.hasOwnProperty.call(owner, "heightFeet")
    || Object.prototype.hasOwnProperty.call(owner, "heightInches")
    || Object.prototype.hasOwnProperty.call(owner, "heightMetres")
  );
}

function convertHeightOwner(owner, fromUnit, toUnit) {
  if (!heightOwnerStored(owner) || fromUnit === toUnit) return;
  if (fromUnit === "ft") {
    owner.heightMetres = feetInchesToMetres(owner.heightFeet, owner.heightInches);
    owner.heightFeet = "";
    owner.heightInches = "";
    return;
  }
  const next = metresToFeetInches(owner.heightMetres);
  owner.heightFeet = next.heightFeet;
  owner.heightInches = next.heightInches;
  owner.heightMetres = "";
}

function convertAllHeights(fromUnit, toUnit) {
  const seen = new Set();
  const convertOwner = (owner) => {
    if (!owner || seen.has(owner)) return;
    seen.add(owner);
    convertHeightOwner(owner, fromUnit, toUnit);
  };
  const profile = state.store.profile;
  if (profile && profile.heights) {
    Object.values(profile.heights).forEach(convertOwner);
  }
  for (const record of state.store.records || []) {
    (record.units || []).forEach(convertOwner);
    (record.trailers || []).forEach(convertOwner);
  }
  if (state.form) {
    (state.form.units || []).forEach(convertOwner);
    (state.form.trailers || []).forEach(convertOwner);
  }
}

function setHeightUnit(unit) {
  if (unit !== "ft" && unit !== "m") return;
  const current = settings();
  if (current.heightUnit === unit) return;
  convertAllHeights(current.heightUnit, unit);
  current.heightUnit = unit;
  saveStore(state.store);
  render();
}

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function emptyChecks(categories) {
  return categories.map((cat) => ({
    id: cat.id,
    checks: cat.items.map(() => false),
    problems: cat.items.map(() => ""),
    itemPhotos: cat.items.map(() => []),
    photos: []
  }));
}

function ensureItemPhotos(cat, count) {
  if (!cat) return [];
  if (!Array.isArray(cat.itemPhotos)) cat.itemPhotos = [];
  while (cat.itemPhotos.length < count) cat.itemPhotos.push([]);
  for (let i = 0; i < cat.itemPhotos.length; i++) {
    if (!Array.isArray(cat.itemPhotos[i])) cat.itemPhotos[i] = [];
  }
  return cat.itemPhotos;
}

function itemPhotoCount(cat) {
  return (cat && cat.itemPhotos || []).reduce((sum, list) => {
    return sum + (Array.isArray(list) ? list.filter(Boolean).length : 0);
  }, 0);
}

function categoryPhotoCount(cat) {
  return ((cat && cat.photos) || []).filter(Boolean).length + itemPhotoCount(cat);
}

function itemProblems(cat) {
  return cat.problems || [];
}

function itemComplete(cat, index) {
  return Boolean(cat.checks[index]) || Boolean(String(itemProblems(cat)[index] || "").trim());
}

function categoryIncomplete(cat) {
  return cat.checks.some((_, i) => !itemComplete(cat, i));
}

function trailerStarted(trailer) {
  if (!trailer) return false;
  if (String(trailer.number || "").trim()) return true;
  return (trailer.categories || []).some((cat) => {
    if ((cat.photos || []).some((src) => src)) return true;
    if ((cat.itemPhotos || []).some((list) => Array.isArray(list) && list.some((src) => src))) return true;
    if ((cat.checks || []).some(Boolean)) return true;
    return (cat.problems || []).some((note) => String(note || "").trim());
  });
}

function recordedTrailers(trailers) {
  return (trailers || []).filter(trailerStarted);
}

function newTrailer(typeId) {
  const type = trailerTypeById(typeId);
  const source = type ? categoriesForTrailerType(type) : TRAILER_CATEGORIES;
  return {
    id: uid(),
    type: type ? type.id : "",
    typeLabel: type ? type.label : "",
    number: "",
    heightFeet: "",
    heightInches: "",
    heightMetres: "",
    categories: source.map((cat) => ({
      id: cat.id,
      title: cat.title,
      items: cat.items.slice(),
      checks: cat.items.map(() => false),
      problems: cat.items.map(() => ""),
      itemPhotos: cat.items.map(() => []),
      photos: []
    }))
  };
}

const state = {
  screen: "boot",
  store: loadStore(),
  selectedUnitId: null,
  form: null,
  showErrors: false,
  errorMessage: "",
  historyMonth: "",
  viewingRecordId: null,
  viewingUnitIndex: 0,
  viewingTrailerIndex: 0,
  pendingDeleteId: null,
  updatingRecordId: null,
  addingKind: null,
  addingId: null,
  pickingTrailerType: false,
  choosingLanguage: false,
  profileDraft: null,
  collapsedCategories: new Set()
};

function isCeClassLabel(value) {
  const text = String(value || "").trim();
  return text === "C&E (class 1)" || text === "class 1" || text.startsWith("C&E");
}

function classLabel(value) {
  if (value === "c1") return t("C1 (medium lorries)");
  if (value === "c2") return t("C2 (rigid)");
  return "";
}

function profileClass(profile) {
  const value = profile && profile.vehicleClass;
  if (value === "c1" || value === "c2" || value === "ce") return value;
  return "";
}

function classOf(record) {
  const value = record && (record.vehicleClass || record.vehicleType);
  if (value === "c1" || value === "rigid") return "c1";
  if (value === "c2") return "c2";
  if (value === "ce" || value === "articulated") return "ce";
  return "ce";
}

function isSingle(record) {
  const value = classOf(record);
  return value === "c1" || value === "c2";
}

function vehicleTypeLabel(record) {
  const label = classLabel(classOf(record));
  return isCeClassLabel(label) ? "" : label;
}

function categoriesForUnit(record) {
  const value = classOf(record);
  if (value === "c1") return RIGID_CATEGORIES;
  if (value === "c2") return C2_CATEGORIES;
  return UNIT_CATEGORIES;
}

function startNewCheck(unitId) {
  const profile = state.store.profile;
  const unit = profile.units.find((u) => u.id === unitId) || profile.units[0];
  state.selectedUnitId = unit.id;
  state.showErrors = false;
  state.errorMessage = "";
  state.promptMileage = false;
  state.updatingRecordId = null;
  state.editingExisting = false;
  state.addingKind = null;
  state.addingId = null;
  state.pickingTrailerType = false;
  state.collapsedCategories = new Set();
  state.form = {
    vehicleType: "ce",
    date: "",
    startTime: "",
    startMileage: "",
    endMileage: "",
    units: [
      {
        id: unit.id,
        reg: unit.reg,
        categories: emptyChecks(UNIT_CATEGORIES)
      }
    ],
    trailers: []
  };
  state.screen = "checks";
}

function startSingleCheck(vehicleClass) {
  const profile = state.store.profile;
  const reg = profile.units && profile.units[0] ? profile.units[0].reg : "";
  const known = heightEnabled() ? heightForReg(reg) : null;
  state.selectedUnitId = null;
  state.showErrors = false;
  state.errorMessage = "";
  state.promptMileage = false;
  state.updatingRecordId = null;
  state.editingExisting = false;
  state.addingKind = null;
  state.addingId = null;
  state.pickingTrailerType = false;
  state.collapsedCategories = new Set();
  state.form = {
    vehicleType: vehicleClass,
    date: "",
    startTime: "",
    startMileage: "",
    endMileage: "",
    units: [
      {
        id: uid(),
        reg,
        heightFeet: known ? known.heightFeet : "",
        heightInches: known ? known.heightInches : "",
        heightMetres: known ? known.heightMetres : "",
        categories: emptyChecks(categoriesForUnit({ vehicleType: vehicleClass }))
      }
    ],
    trailers: []
  };
  state.screen = "checks";
}

function render() {
  const app = document.getElementById("app");
  if (!state.store.profile || state.editingProfile) {
    app.innerHTML = renderProfile();
    bindProfile();
    return;
  }
  if (state.screen === "boot" || state.screen === "home") {
    app.innerHTML = renderHome();
    bindHome();
    return;
  }
  if (state.screen === "select") {
    app.innerHTML = renderSelectUnit();
    bindSelectUnit();
    return;
  }
  if (state.screen === "checks") {
    if (state.pickingTrailerType) {
      app.innerHTML = renderTrailerTypePicker();
      bindTrailerTypePicker();
      return;
    }
    app.innerHTML = renderChecks();
    bindChecks();
    return;
  }
  if (state.screen === "save") {
    app.innerHTML = renderSave();
    bindSave();
    return;
  }
  if (state.screen === "history") {
    app.innerHTML = renderHistory();
    bindHistory();
    return;
  }
  if (state.screen === "settings") {
    if (state.choosingLanguage) {
      app.innerHTML = renderLanguageScreen();
      bindLanguageScreen();
      return;
    }
    app.innerHTML = renderSettings();
    bindSettings();
  }
}

function renderProfile() {
  const existing = state.editingProfile || state.store.profile;
  const draft = state.profileDraft;
  const editing = Boolean(state.editingProfile);
  const title = editing ? t("Edit setup") : t("Set up once");
  const name = draft ? draft.name : (existing?.name || "");
  const company = draft ? draft.company : (existing?.company || "");
  const reg = draft ? draft.unitReg : (existing?.units?.[0]?.reg || "");
  const heading = editing ? `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(t("HGV walkaround"))}</p>
        <h1>${escapeHtml(title)}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-profile">${escapeHtml(t("Back"))}</button>
    </div>
  ` : `
    <p class="eyebrow">${escapeHtml(t("HGV walkaround"))}</p>
    <h1>${escapeHtml(title)}</h1>
  `;
  return `
    ${editing ? "" : renderLanguagePicker()}
    ${heading}
    <form id="profile-form">
      <div class="card stack">
        <label>${escapeHtml(t("Name"))}
          <input name="name" type="text" required autocomplete="name" value="${escapeHtml(name)}" />
        </label>
        <label>${escapeHtml(t("Company name"))}
          <input name="company" type="text" required value="${escapeHtml(company)}" />
        </label>
        <label>${escapeHtml(t("Unit reg"))}
          <input name="unitReg" type="text" required style="text-transform:uppercase" value="${escapeHtml(reg)}" />
        </label>
        <button class="btn-primary" type="submit">${escapeHtml(state.editingProfile ? t("Save changes") : t("Save and continue"))}</button>
      </div>
    </form>
    ${installHint()}
  `;
}

function bindProfile() {
  bindLanguagePicker();
  const back = document.getElementById("back-profile");
  if (back) {
    back.addEventListener("click", () => {
      state.editingProfile = null;
      state.profileDraft = null;
      state.screen = "home";
      render();
    });
  }
  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const reg = String(data.get("unitReg")).trim().toUpperCase();
    const existing = state.editingProfile || state.store.profile;
    const units = existing?.units?.length ? existing.units.map((unit, i) => (
      i === 0 ? { ...unit, reg } : unit
    )) : [{ id: uid(), reg }];
    const profile = {
      name: String(data.get("name")).trim(),
      company: String(data.get("company")).trim(),
      units
    };
    if (existing && existing.heights) profile.heights = existing.heights;
    state.store.profile = profile;
    state.editingProfile = null;
    state.profileDraft = null;
    saveStore(state.store);
    state.screen = "home";
    render();
  });
}

function renderHome() {
  const { profile, records } = state.store;
  const reg = profile.units && profile.units[0] ? profile.units[0].reg : "";
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(t("HGV walkaround"))}</p>
        <h1>${escapeHtml(t("Daily walkaround"))}</h1>
      </div>
    </div>
    <div class="card">
      <p><strong>${escapeHtml(profile.name)}</strong></p>
      <p class="muted">${escapeHtml(profile.company)}</p>
      <p>${escapeHtml(t("Unit"))}: ${escapeHtml(reg)}</p>
    </div>
    <div class="btn-row">
      <button class="btn-primary" type="button" id="start-checks">${escapeHtml(t("Start checks"))}</button>
      <button class="btn-secondary" type="button" id="view-saved">${escapeHtml(t("View saved checks"))}</button>
      <button class="btn-secondary" type="button" id="edit-profile">${escapeHtml(t("Edit setup"))}</button>
      <button class="btn-secondary" type="button" id="open-settings">${escapeHtml(t("Settings"))}</button>
    </div>
    ${records.length ? `<p class="muted">${escapeHtml(tCount("savedOnDevice", records.length))}</p>` : ""}
  `;
}

function bindHome() {
  document.getElementById("start-checks").addEventListener("click", () => {
    const units = state.store.profile.units || [];
    startNewCheck(units[0] && units[0].id);
    render();
  });
  document.getElementById("edit-profile").addEventListener("click", () => {
    state.editingProfile = state.store.profile;
    render();
  });
  document.getElementById("view-saved").addEventListener("click", () => {
    state.screen = "history";
    state.historyMonth = "";
    state.viewingRecordId = null;
    state.pendingDeleteId = null;
    render();
  });
  document.getElementById("open-settings").addEventListener("click", () => {
    state.choosingLanguage = false;
    state.screen = "settings";
    render();
  });
}

function renderSelectUnit() {
  const { profile, records } = state.store;
  const units = profile.units.map((unit) => `
    <label>
      <input type="radio" name="unit" value="${unit.id}" ${unit.id === (state.selectedUnitId || profile.units[0].id) ? "checked" : ""} />
      <span>${escapeHtml(unit.reg)}</span>
    </label>
  `).join("");

  return `
    <div class="topbar">
      <div>
        <h1>${escapeHtml(t("Select your unit"))}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-home">${escapeHtml(t("Back"))}</button>
    </div>
    <div class="card">
      <p><strong>${escapeHtml(profile.name)}</strong></p>
      <p class="muted">${escapeHtml(profile.company)}</p>
    </div>
    <form id="select-form" class="card">
      <div class="unit-choice">${units}</div>
      <div class="btn-row">
        <button class="btn-primary" type="submit">${escapeHtml(t("Start checks"))}</button>
        <button class="btn-secondary" type="button" id="edit-profile">${escapeHtml(t("Edit setup"))}</button>
        <button class="btn-secondary" type="button" id="view-saved">${escapeHtml(t("View saved checks"))}</button>
        <button class="btn-secondary" type="button" id="open-settings">${escapeHtml(t("Settings"))}</button>
      </div>
    </form>
    ${records.length ? `<p class="muted">${escapeHtml(tCount("savedOnDevice", records.length))}</p>` : ""}
  `;
}

function bindSelectUnit() {
  document.getElementById("back-home").addEventListener("click", () => {
    state.screen = "home";
    render();
  });
  document.getElementById("select-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = new FormData(e.target).get("unit");
    startNewCheck(id);
    render();
  });
  document.getElementById("edit-profile").addEventListener("click", () => {
    state.editingProfile = state.store.profile;
    render();
  });
  document.getElementById("view-saved").addEventListener("click", () => {
    state.screen = "history";
    state.historyMonth = "";
    state.viewingRecordId = null;
    state.pendingDeleteId = null;
    render();
  });
  document.getElementById("open-settings").addEventListener("click", () => {
    state.choosingLanguage = false;
    state.screen = "settings";
    render();
  });
}

function renderLanguageScreen() {
  const pdf = state.choosingLanguage === "pdf";
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(t("HGV walkaround"))}</p>
        <h1>${escapeHtml(pdf ? t("Export PDF language") : t("Language"))}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-settings">${escapeHtml(t("Back"))}</button>
    </div>
    ${renderLanguagePicker(pdf ? "pdf" : "ui")}
  `;
}

function bindLanguageScreen() {
  document.getElementById("back-settings").addEventListener("click", () => {
    state.choosingLanguage = false;
    render();
  });
  bindLanguagePicker();
  bindPdfLanguagePicker();
}

function renderSettings() {
  const current = settings();
  const toggle = (id, on, label) => `
    <button class="switch ${on ? "on" : ""}" type="button" role="switch" id="${id}" aria-label="${label}" aria-checked="${on ? "true" : "false"}">${on ? escapeHtml(t("On")) : escapeHtml(t("Off"))}</button>
  `;
  const choice = (name, value, selected, label) => `
    <label>
      <input type="radio" name="${name}" value="${value}" ${selected === value ? "checked" : ""} />
      <span>${label}</span>
    </label>
  `;
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(t("HGV walkaround"))}</p>
        <h1>${escapeHtml(t("Settings"))}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-home">${escapeHtml(t("Back"))}</button>
    </div>
    <button type="button" class="lang-open" id="open-language">
      <span class="lang-flags" aria-hidden="true">🇬🇧 🇵🇱 🇷🇴 🇮🇳</span>
      <span>${escapeHtml(t("Language"))}</span>
    </button>
    <button type="button" class="lang-open" id="open-pdf-language">
      <span class="lang-flags" aria-hidden="true">🇬🇧 🇵🇱 🇷🇴 🇮🇳</span>
      <span class="pdf-lang-label">
        <svg class="export-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 15V3M8 7l4-4 4 4" />
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
        </svg>
        <span>${escapeHtml(t("Export PDF language"))} · ${escapeHtml((DYSCLANGS.find((lang) => lang.id === current.pdfLanguage) || { name: "English" }).name)}</span>
      </span>
    </button>
    <div class="card stack">
      <div class="setting-row">
        <div>
          <strong>${escapeHtml(t("Mileage"))}</strong>
          <p class="muted">${escapeHtml(t("Start and end mileage"))}</p>
        </div>
        ${toggle("toggle-mileage", current.mileage, t("Mileage"))}
      </div>
      <div class="setting-row">
        <div>
          <strong>${escapeHtml(t("Height"))}</strong>
          <p class="muted">${escapeHtml(t("Vehicle and trailer height"))}</p>
        </div>
        ${toggle("toggle-height", current.height, t("Height"))}
      </div>
    </div>
    <div class="card stack">
      <strong>${escapeHtml(t("Mileage units"))}</strong>
      <div class="unit-choice">
        ${choice("mileage-unit", "km", current.unit, escapeHtml(t("Kilometres")))}
        ${choice("mileage-unit", "miles", current.unit, escapeHtml(t("Miles")))}
      </div>
      <p class="muted">${escapeHtml(t("Switching converts mileage already saved and rounds to a whole number."))}</p>
    </div>
    <div class="card stack">
      <strong>${escapeHtml(t("Height units"))}</strong>
      <div class="unit-choice">
        ${choice("height-unit", "ft", current.heightUnit, escapeHtml(t("Feet and inches")))}
        ${choice("height-unit", "m", current.heightUnit, escapeHtml(t("Metres")))}
      </div>
      <p class="muted">${escapeHtml(t("Switching converts height already saved. Metres round to 2 decimal places. Switching back rounds to the nearest inch, so the height can change by an inch."))}</p>
    </div>
    <div class="card stack">
      <strong>${escapeHtml(t("Background"))}</strong>
      <div class="unit-choice">
        ${choice("theme", "dark", current.theme, escapeHtml(t("Dark")))}
        ${choice("theme", "light", current.theme, escapeHtml(t("Light")))}
      </div>
    </div>
  `;
}

function bindSettings() {
  document.getElementById("back-home").addEventListener("click", () => {
    state.screen = "home";
    render();
  });
  document.getElementById("toggle-mileage").addEventListener("click", () => setFlag("mileage"));
  document.getElementById("toggle-height").addEventListener("click", () => setFlag("height"));
  document.querySelectorAll('input[name="mileage-unit"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) setMileageUnit(input.value);
    });
  });
  document.querySelectorAll('input[name="height-unit"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) setHeightUnit(input.value);
    });
  });
  document.querySelectorAll('input[name="theme"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) setTheme(input.value);
    });
  });
  document.getElementById("open-language").addEventListener("click", () => {
    state.choosingLanguage = "ui";
    render();
  });
  document.getElementById("open-pdf-language").addEventListener("click", () => {
    state.choosingLanguage = "pdf";
    render();
  });
}

function heightEntryHtml(kind, id, owner, invalid, hidden) {
  const hide = hidden ? "hidden" : "";
  const vehicleAttr = kind === "vehicle" ? `data-vehicle-height="${id}"` : "";
  if (heightUnit() === "m") {
    return `
      <div class="height-row single" ${vehicleAttr} ${hide}>
        <label>${escapeHtml(t("Height (metres)"))}
          <input data-${kind}-metres="${id}" type="text" inputmode="decimal" placeholder="${escapeHtml(t("m"))}" value="${escapeHtml(owner.heightMetres || "")}" class="${invalid ? "invalid" : ""}" />
        </label>
      </div>
    `;
  }
  const feetInvalid = invalid && !String(owner.heightFeet || "").trim();
  const inchesInvalid = invalid && String(owner.heightInches ?? "").trim() === "";
  return `
    <div class="height-row" ${vehicleAttr} ${hide}>
      <label>${escapeHtml(t("Height (feet)"))}
        <input data-${kind}-feet="${id}" type="text" inputmode="numeric" placeholder="${escapeHtml(t("ft"))}" value="${escapeHtml(owner.heightFeet || "")}" class="${feetInvalid ? "invalid" : ""}" />
      </label>
      <label>${escapeHtml(t("Height (inches)"))}
        <input data-${kind}-inches="${id}" type="text" inputmode="numeric" placeholder="${escapeHtml(t("in"))}" value="${escapeHtml(owner.heightInches || "")}" class="${inchesInvalid ? "invalid" : ""}" />
      </label>
    </div>
  `;
}

function renderTrailerTypePicker() {
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(t("HGV walkaround"))}</p>
        <h1>${escapeHtml(t("Trailer type"))}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-trailer-type">${escapeHtml(t("Back"))}</button>
    </div>
    <p class="muted">${escapeHtml(t("Choose the trailer type."))}</p>
    <div class="lang-picker">
      ${TRAILER_TYPES.map((type) => `
        <button type="button" class="lang-option" data-trailer-type="${type.id}">
          <span>${escapeHtml(t(type.label))}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function cancelTrailerTypePick() {
  state.pickingTrailerType = false;
  if (state.addingKind === "trailer" && !state.addingId) {
    state.updatingRecordId = null;
    state.addingKind = null;
    state.addingId = null;
    state.form = null;
    state.screen = "history";
  }
  render();
}

function chooseTrailerType(typeId) {
  if (!trailerTypeById(typeId) || !state.form) return;
  const trailer = newTrailer(typeId);
  state.form.trailers.push(trailer);
  state.pickingTrailerType = false;
  if (state.addingKind === "trailer") state.addingId = trailer.id;
  render();
  const input = document.querySelector(`[data-trailer-number="${trailer.id}"]`);
  if (input) {
    input.scrollIntoView({ behavior: "smooth", block: "center" });
    input.focus();
  }
}

function bindTrailerTypePicker() {
  document.getElementById("back-trailer-type").addEventListener("click", () => cancelTrailerTypePick());
  document.querySelectorAll("[data-trailer-type]").forEach((btn) => {
    btn.addEventListener("click", () => chooseTrailerType(btn.dataset.trailerType));
  });
}

function renderChecks() {
  const error = state.showErrors && state.errorMessage
    ? `<div class="error-banner">${escapeHtml(t(state.errorMessage))}</div>`
    : "";

  const visibleUnits = state.addingKind === "unit"
    ? state.form.units.filter((unit) => unit.id === state.addingId)
    : state.addingKind === "trailer"
      ? []
      : state.form.units;
  const visibleTrailers = state.addingKind === "trailer"
    ? state.form.trailers.filter((trailer) => trailer.id === state.addingId)
    : state.addingKind === "unit"
      ? []
      : state.form.trailers;

  const rigid = isSingle(state.form);
  const unitCategories = categoriesForUnit(state.form);
  const unitsHtml = visibleUnits.map((unit) => {
    const unitIndex = state.form.units.findIndex((u) => u.id === unit.id);
    const knownHeight = rigid && heightEnabled() ? heightForReg(unit.reg) : null;
    if (knownHeight) {
      unit.heightFeet = knownHeight.heightFeet;
      unit.heightInches = knownHeight.heightInches;
      unit.heightMetres = knownHeight.heightMetres;
    }
    const heightMissing = rigid && heightEnabled() && !knownHeight && !heightComplete(unit);
    const heightFields = rigid && heightEnabled() ? `
      <p class="muted" data-vehicle-height-known="${unit.id}" ${knownHeight ? "" : "hidden"}>${escapeHtml(t("Height: {value}", { value: formatHeight(knownHeight || unit) }))}</p>
      ${heightEntryHtml("vehicle", unit.id, unit, state.showErrors && heightMissing, knownHeight)}
    ` : "";
    const unitTitle = state.form.units.length > 1
      ? t("Unit {n} (prime mover)", { n: unitIndex + 1 })
      : t("Unit (prime mover)");
    return `
    <section class="card">
      <div class="topbar">
        <h2>${escapeHtml(rigid ? t("Vehicle") : unitTitle)}</h2>
        ${!rigid && !state.addingKind && state.form.units.length > 1 ? `<button type="button" class="btn-danger" data-remove-unit="${unit.id}">${escapeHtml(t("Remove"))}</button>` : ""}
      </div>
      <label>${escapeHtml(rigid ? t("Vehicle reg") : t("Unit reg"))}
        <input data-unit-reg="${unit.id}" type="text" value="${escapeHtml(unit.reg)}" style="text-transform:uppercase" class="${state.showErrors && !unit.reg.trim() ? "invalid" : ""}" />
      </label>
      ${heightFields}
      ${unitCategories.map((cat, catIndex) => renderCategory(unit.categories[catIndex], cat, `unit:${unit.id}:${cat.id}`)).join("")}
    </section>
  `;
  }).join("");

  const trailersHtml = visibleTrailers.map((trailer) => {
    const typeName = trailerTypeName(trailer);
    const trailerIndex = state.form.trailers.findIndex((item) => item.id === trailer.id) + 1;
    return `
    <section class="card">
      <div class="topbar">
        <h2>${escapeHtml(t("Trailer {n}", { n: trailerIndex }))}${typeName ? ` · ${escapeHtml(typeName)}` : ""}</h2>
        ${!state.addingKind ? `<button type="button" class="btn-danger" data-remove-trailer="${trailer.id}">${escapeHtml(t("Remove"))}</button>` : ""}
      </div>
      <label>${escapeHtml(t("Trailer number"))}
        <input data-trailer-number="${trailer.id}" type="text" value="${escapeHtml(trailer.number)}" class="${state.showErrors && !trailer.number.trim() ? "invalid" : ""}" />
      </label>
      ${heightEnabled() ? heightEntryHtml("trailer", trailer.id, trailer, false, false) : ""}
      ${trailerCategories(trailer).map((cat, catIndex) => renderCategory(trailer.categories[catIndex], cat, `trailer:${trailer.id}:${cat.id}`, true)).join("")}
    </section>
  `;
  }).join("");

  return `
    <div class="topbar">
      <div>
        ${vehicleTypeLabel(state.form) ? `<p class="eyebrow">${escapeHtml(vehicleTypeLabel(state.form))}</p>` : ""}
        <h1>${escapeHtml(state.updatingRecordId ? (state.addingKind && !state.editingExisting ? t("Add to saved check") : t("Edit this check")) : t("Daily walkaround"))}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-select">${escapeHtml(t("Back"))}</button>
    </div>
    ${error}
    ${state.addingKind ? "" : `<div class="card stack">
      <label>${escapeHtml(t("Date"))}
        <input id="check-date" type="date" value="${state.form.date}" class="${state.showErrors && !state.form.date ? "invalid" : ""}" />
      </label>
      <label>${escapeHtml(t("Time of check"))}
        <input id="check-time" type="time" value="${state.form.startTime}" class="${state.showErrors && !state.form.startTime ? "invalid" : ""}" />
      </label>
      ${mileageEnabled() ? `<label>${escapeHtml(t("Start mileage ({unit})", { unit: mileageUnitWord() }))}
        <input id="start-mileage" type="text" inputmode="decimal" placeholder="${escapeHtml(t("Optional"))}" value="${escapeHtml(state.form.startMileage)}" class="${state.promptMileage && !String(state.form.startMileage || "").trim() ? "invalid" : ""}" />
      </label>` : ""}
    </div>`}
    ${unitsHtml}
    ${!rigid && !state.addingKind && !state.form.trailers.length ? `<button type="button" class="btn-secondary add-trailer" id="add-trailer">${escapeHtml(t("Add trailer"))}</button>` : ""}
    ${trailersHtml}
    <div class="action-bar">
      ${state.promptMileage ? `
        <p class="mileage-note">${escapeHtml(t("Start mileage is missing. Add it above, or continue without it."))}</p>
        <button class="btn-green" type="button" id="continue-without-mileage">${escapeHtml(t("Continue"))}</button>
      ` : `
        <button class="btn-primary" type="button" id="continue-save">${escapeHtml(t("Continue"))}</button>
      `}
    </div>
  `;
}

function allItemsChecked(cat) {
  return cat.checks.length > 0 && cat.checks.every(Boolean);
}

function renderCategory(saved, cat, key, enforceErrors = true) {
  if (!saved.checks) saved.checks = [];
  while (saved.checks.length < cat.items.length) saved.checks.push(false);
  if (!saved.problems) saved.problems = [];
  while (saved.problems.length < cat.items.length) saved.problems.push("");
  const itemPhotos = ensureItemPhotos(saved, cat.items.length);
  const showItemErrors = state.showErrors && enforceErrors;
  const invalid = showItemErrors && categoryIncomplete(saved);
  const allChecked = allItemsChecked(saved);
  const collapsed = allChecked && state.collapsedCategories.has(key);
  const items = cat.items.map((label, i) => {
    const note = saved.problems[i] || "";
    const shots = itemPhotos[i].filter(Boolean);
    const reported = Boolean(note.trim()) || shots.length > 0;
    const open = reported || Boolean(saved.problemsOpen && saved.problemsOpen[i]);
    const photos = shots.map((src, photoIndex) => `
      <div class="photo-wrap">
        <img src="${src}" alt="${escapeHtml(t("Problem photo"))}" />
        <button type="button" data-remove-item-photo="${key}:${i}:${photoIndex}" aria-label="${escapeHtml(t("Remove photo"))}">×</button>
      </div>
    `).join("");
    return `
    <div class="check-block ${reported ? "has-problem" : ""} ${showItemErrors && !itemComplete(saved, i) ? "error" : ""}">
      <div class="check-item ${saved.checks[i] ? "checked" : ""}" data-check="${key}:${i}" role="checkbox" aria-checked="${saved.checks[i] ? "true" : "false"}">
        <span class="box"></span>
        <span>${escapeHtml(t(label))}</span>
      </div>
      <button type="button" class="btn-problem" data-toggle-problem="${key}:${i}">${escapeHtml(reported ? t("Remove problem") : t("Report problem"))}</button>
      <textarea class="problem-text ${open ? "" : "hidden"}" data-problem="${key}:${i}" rows="3" placeholder="${escapeHtml(t("Describe the problem"))}">${escapeHtml(note)}</textarea>
      ${open ? `
        <label class="file-btn">${escapeHtml(t("Take photo of problem"))}
          <input type="file" accept="image/*" capture="environment" data-item-photo="${key}:${i}" />
        </label>
        ${photos ? `<div class="photos">${photos}</div>` : ""}
      ` : ""}
    </div>
  `;
  }).join("");

  const photos = (saved.photos || []).map((src, i) => `
    <div class="photo-wrap">
      <img src="${src}" alt="${escapeHtml(t("Problem photo"))}" />
      <button type="button" data-remove-photo="${key}:${i}" aria-label="${escapeHtml(t("Remove photo"))}">×</button>
    </div>
  `).join("");

  return `
    <div class="category ${collapsed ? "collapsed" : ""} ${invalid ? "error" : ""}" data-category="${key}">
      <div class="category-head">
        <h3 data-category-title="${key}"${collapsed ? ' role="button" tabindex="0" aria-expanded="false"' : ""}>${escapeHtml(t(cat.title))}</h3>
        <div class="check-item select-all ${allChecked ? "checked" : ""}" data-select-all="${key}" role="checkbox" aria-checked="${allChecked ? "true" : "false"}">
          <span class="box"></span>
          <span>${escapeHtml(t("Select all"))}</span>
        </div>
      </div>
      ${items}
      ${photos ? `<div class="photos">${photos}</div>` : ""}
    </div>
  `;
}

function syncSelectAll(categoryEl, cat) {
  if (!categoryEl) return;
  const selectAll = categoryEl.querySelector("[data-select-all]");
  if (selectAll) {
    const on = allItemsChecked(cat);
    selectAll.classList.toggle("checked", on);
    selectAll.setAttribute("aria-checked", on ? "true" : "false");
  }
  if (state.showErrors) categoryEl.classList.toggle("error", categoryIncomplete(cat));
}

function setCategoryCollapsed(categoryEl, collapsed) {
  if (!categoryEl) return;
  categoryEl.classList.toggle("collapsed", collapsed);
  const title = categoryEl.querySelector("[data-category-title]");
  if (!title) return;
  if (collapsed) {
    title.setAttribute("role", "button");
    title.tabIndex = 0;
    title.setAttribute("aria-expanded", "false");
  } else {
    title.removeAttribute("role");
    title.removeAttribute("tabindex");
    title.removeAttribute("aria-expanded");
  }
}

function expandCategory(categoryEl) {
  if (!categoryEl || !categoryEl.classList.contains("collapsed")) return;
  const key = categoryEl.getAttribute("data-category");
  if (key) state.collapsedCategories.delete(key);
  setCategoryCollapsed(categoryEl, false);
}

function scrollToNextSection(categoryEl) {
  const sections = [...document.querySelectorAll("[data-category]")];
  const next = sections[sections.indexOf(categoryEl) + 1];
  if (next) {
    next.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const button = document.getElementById("continue-save") || document.getElementById("continue-without-mileage");
  if (!button) return;
  const scroller = document.scrollingElement || document.documentElement;
  scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
}

function bindChecks() {
  document.getElementById("back-select").addEventListener("click", () => {
    if (state.updatingRecordId) {
      state.updatingRecordId = null;
      state.addingKind = null;
      state.addingId = null;
      state.form = null;
      state.screen = "history";
    } else {
      state.screen = "home";
    }
    render();
  });
  const dateInput = document.getElementById("check-date");
  const timeInput = document.getElementById("check-time");
  const startMileageInput = document.getElementById("start-mileage");
  if (dateInput && timeInput) {
    ["change", "input", "blur"].forEach((evt) => {
      dateInput.addEventListener(evt, () => { state.form.date = dateInput.value; });
      timeInput.addEventListener(evt, () => { state.form.startTime = timeInput.value; });
    });
  }
  if (startMileageInput) {
    const saveMileage = () => {
      state.form.startMileage = startMileageInput.value;
      if (state.promptMileage) {
        startMileageInput.classList.toggle("invalid", !startMileageInput.value.trim());
      }
    };
    ["change", "input", "blur"].forEach((evt) => {
      startMileageInput.addEventListener(evt, saveMileage);
    });
  }
  document.querySelectorAll("[data-unit-reg]").forEach((input) => {
    let matched = isSingle(state.form) && Boolean(heightForReg(input.value));
    input.addEventListener("input", () => {
      const unit = state.form.units.find((u) => u.id === input.dataset.unitReg);
      unit.reg = input.value.toUpperCase();
      input.classList.toggle("invalid", state.showErrors && !unit.reg.trim());
      if (!isSingle(state.form) || !heightEnabled()) return;
      const known = heightForReg(unit.reg);
      const fields = document.querySelector(`[data-vehicle-height="${unit.id}"]`);
      const note = document.querySelector(`[data-vehicle-height-known="${unit.id}"]`);
      if (known) {
        unit.heightFeet = known.heightFeet;
        unit.heightInches = known.heightInches;
        unit.heightMetres = known.heightMetres;
        if (fields) fields.hidden = true;
        if (note) {
          note.hidden = false;
          note.textContent = t("Height: {value}", { value: formatHeight(known) });
        }
      } else {
        if (matched) {
          unit.heightFeet = "";
          unit.heightInches = "";
          unit.heightMetres = "";
          const feet = document.querySelector(`[data-vehicle-feet="${unit.id}"]`);
          const inches = document.querySelector(`[data-vehicle-inches="${unit.id}"]`);
          const metres = document.querySelector(`[data-vehicle-metres="${unit.id}"]`);
          if (feet) feet.value = "";
          if (inches) inches.value = "";
          if (metres) metres.value = "";
        }
        if (fields) fields.hidden = false;
        if (note) note.hidden = true;
      }
      matched = Boolean(known);
    });
  });
  document.querySelectorAll("[data-vehicle-feet]").forEach((input) => {
    input.addEventListener("input", () => {
      const unit = state.form.units.find((u) => u.id === input.dataset.vehicleFeet);
      unit.heightFeet = input.value.replace(/[^\d]/g, "");
      if (unit.heightFeet !== input.value) input.value = unit.heightFeet;
      input.classList.toggle("invalid", state.showErrors && !unit.heightFeet.trim());
    });
  });
  document.querySelectorAll("[data-vehicle-inches]").forEach((input) => {
    input.addEventListener("input", () => {
      const unit = state.form.units.find((u) => u.id === input.dataset.vehicleInches);
      let inches = input.value.replace(/[^\d]/g, "");
      if (inches !== "" && Number(inches) > 11) inches = "11";
      unit.heightInches = inches;
      if (inches !== input.value) input.value = inches;
      input.classList.toggle("invalid", state.showErrors && inches.trim() === "");
    });
  });
  document.querySelectorAll("[data-trailer-number]").forEach((input) => {
    input.addEventListener("input", () => {
      const trailer = state.form.trailers.find((t) => t.id === input.dataset.trailerNumber);
      trailer.number = input.value;
      input.classList.toggle("invalid", state.showErrors && !input.value.trim());
    });
  });
  document.querySelectorAll("[data-trailer-feet]").forEach((input) => {
    input.addEventListener("input", () => {
      const trailer = state.form.trailers.find((t) => t.id === input.dataset.trailerFeet);
      trailer.heightFeet = input.value.replace(/[^\d]/g, "");
      if (trailer.heightFeet !== input.value) input.value = trailer.heightFeet;
    });
  });
  document.querySelectorAll("[data-trailer-inches]").forEach((input) => {
    input.addEventListener("input", () => {
      const trailer = state.form.trailers.find((t) => t.id === input.dataset.trailerInches);
      let inches = input.value.replace(/[^\d]/g, "");
      if (inches !== "" && Number(inches) > 11) inches = "11";
      trailer.heightInches = inches;
      if (inches !== input.value) input.value = inches;
    });
  });
  bindMetresFields("[data-vehicle-metres]", "vehicleMetres", (id) => state.form.units.find((unit) => unit.id === id), true);
  bindMetresFields("[data-trailer-metres]", "trailerMetres", (id) => state.form.trailers.find((trailer) => trailer.id === id), false);
  document.querySelectorAll("[data-check]").forEach((row) => {
    row.addEventListener("click", () => {
      if (window.__dyscDragging) return;
      const [kind, id, catId, index] = row.dataset.check.split(":");
      const owner = kind === "unit"
        ? state.form.units.find((u) => u.id === id)
        : state.form.trailers.find((t) => t.id === id);
      const cat = owner.categories.find((c) => c.id === catId);
      const next = !cat.checks[Number(index)];
      cat.checks[Number(index)] = next;
      row.classList.toggle("checked", next);
      row.setAttribute("aria-checked", next ? "true" : "false");
      const block = row.closest(".check-block");
      if (block && state.showErrors) {
        block.classList.toggle("error", !itemComplete(cat, Number(index)));
      }
      syncSelectAll(row.closest(".category"), cat);
      if (!next) {
        state.collapsedCategories.delete(`${kind}:${id}:${catId}`);
        expandCategory(row.closest(".category"));
      }
    });
  });
  document.querySelectorAll("[data-category]").forEach((categoryEl) => {
    categoryEl.addEventListener("click", (e) => {
      if (window.__dyscDragging) return;
      if (e.target.closest("[data-select-all], [data-check], button, textarea, input, label")) return;
      expandCategory(categoryEl);
    });
  });
  document.querySelectorAll("[data-category-title]").forEach((title) => {
    title.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const categoryEl = title.closest(".category");
      if (!categoryEl || !categoryEl.classList.contains("collapsed")) return;
      e.preventDefault();
      expandCategory(categoryEl);
    });
  });
  document.querySelectorAll("[data-select-all]").forEach((row) => {
    row.addEventListener("click", () => {
      if (window.__dyscDragging) return;
      const [kind, id, catId] = row.dataset.selectAll.split(":");
      const owner = kind === "unit"
        ? state.form.units.find((u) => u.id === id)
        : state.form.trailers.find((t) => t.id === id);
      const cat = owner.categories.find((c) => c.id === catId);
      const next = !allItemsChecked(cat);
      cat.checks = cat.checks.map(() => next);
      const categoryEl = row.closest(".category");
      categoryEl.querySelectorAll("[data-check]").forEach((item, i) => {
        item.classList.toggle("checked", next);
        item.setAttribute("aria-checked", next ? "true" : "false");
        const block = item.closest(".check-block");
        if (block && state.showErrors) {
          block.classList.toggle("error", !itemComplete(cat, i));
        }
      });
      syncSelectAll(categoryEl, cat);
      const key = row.dataset.selectAll;
      if (next && allItemsChecked(cat)) {
        state.collapsedCategories.add(key);
        setCategoryCollapsed(categoryEl, true);
        scrollToNextSection(categoryEl);
      } else {
        state.collapsedCategories.delete(key);
        setCategoryCollapsed(categoryEl, false);
      }
    });
  });
  document.querySelectorAll("[data-toggle-problem]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const [kind, id, catId, index] = btn.dataset.toggleProblem.split(":");
      const owner = kind === "unit"
        ? state.form.units.find((u) => u.id === id)
        : state.form.trailers.find((t) => t.id === id);
      const cat = owner.categories.find((c) => c.id === catId);
      if (!cat.problems) cat.problems = cat.checks.map(() => "");
      if (!cat.problemsOpen) cat.problemsOpen = cat.checks.map(() => false);
      const i = Number(index);
      ensureItemPhotos(cat, cat.checks.length);
      const hasNote = Boolean(String(cat.problems[i] || "").trim());
      const hasPhotos = cat.itemPhotos[i].some((src) => src);
      if (hasNote || hasPhotos) {
        cat.problems[i] = "";
        cat.problemsOpen[i] = false;
        cat.itemPhotos[i] = [];
      } else {
        cat.problemsOpen[i] = !cat.problemsOpen[i];
      }
      render();
      const field = document.querySelector(`[data-problem="${btn.dataset.toggleProblem}"]`);
      if (field && !field.classList.contains("hidden")) field.focus();
    });
  });
  document.querySelectorAll("[data-problem]").forEach((field) => {
    field.addEventListener("input", () => {
      const [kind, id, catId, index] = field.dataset.problem.split(":");
      const owner = kind === "unit"
        ? state.form.units.find((u) => u.id === id)
        : state.form.trailers.find((t) => t.id === id);
      const cat = owner.categories.find((c) => c.id === catId);
      if (!cat.problems) cat.problems = cat.checks.map(() => "");
      cat.problems[Number(index)] = field.value;
      const block = field.closest(".check-block");
      if (block) {
        block.classList.toggle("has-problem", Boolean(field.value.trim()));
        if (state.showErrors) block.classList.toggle("error", !itemComplete(cat, Number(index)));
      }
    });
    field.addEventListener("click", (e) => e.stopPropagation());
  });
  document.querySelectorAll("[data-item-photo]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const dataUrl = await compressImage(file);
      const [kind, id, catId, index] = input.dataset.itemPhoto.split(":");
      const owner = kind === "unit"
        ? state.form.units.find((u) => u.id === id)
        : state.form.trailers.find((t) => t.id === id);
      const cat = owner.categories.find((c) => c.id === catId);
      const i = Number(index);
      ensureItemPhotos(cat, Math.max(cat.checks.length, i + 1));
      cat.itemPhotos[i].push(dataUrl);
      render();
    });
  });
  document.querySelectorAll("[data-remove-item-photo]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const [kind, id, catId, index, photoIndex] = btn.dataset.removeItemPhoto.split(":");
      const owner = kind === "unit"
        ? state.form.units.find((u) => u.id === id)
        : state.form.trailers.find((t) => t.id === id);
      const cat = owner.categories.find((c) => c.id === catId);
      const list = cat && cat.itemPhotos && cat.itemPhotos[Number(index)];
      if (Array.isArray(list)) list.splice(Number(photoIndex), 1);
      render();
    });
  });
  document.querySelectorAll("[data-remove-photo]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const [kind, id, catId, index] = btn.dataset.removePhoto.split(":");
      const owner = kind === "unit"
        ? state.form.units.find((u) => u.id === id)
        : state.form.trailers.find((t) => t.id === id);
      owner.categories.find((c) => c.id === catId).photos.splice(Number(index), 1);
      render();
    });
  });
  document.querySelectorAll("[data-remove-trailer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.form.trailers = state.form.trailers.filter((t) => t.id !== btn.dataset.removeTrailer);
      render();
    });
  });
  const addTrailer = document.getElementById("add-trailer");
  if (addTrailer) {
    addTrailer.addEventListener("click", () => {
      state.pickingTrailerType = true;
      render();
    });
  }
  document.querySelectorAll("[data-remove-unit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.form.units.length < 2) return;
      state.form.units = state.form.units.filter((u) => u.id !== btn.dataset.removeUnit);
      render();
    });
  });
  const continueSave = document.getElementById("continue-save");
  if (continueSave) continueSave.addEventListener("click", () => {
    const result = validateForm();
    if (!result.ok) {
      state.showErrors = true;
      state.errorMessage = result.message;
      render();
      const firstError = document.querySelector(".error, input.invalid");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    state.showErrors = false;
    state.errorMessage = "";
    if (!state.addingKind && mileageMissing()) {
      state.promptMileage = true;
      render();
      const field = document.getElementById("start-mileage");
      if (field) {
        field.scrollIntoView({ behavior: "smooth", block: "center" });
        field.focus();
      }
      return;
    }
    goToSave();
  });
  const continueWithoutMileage = document.getElementById("continue-without-mileage");
  if (continueWithoutMileage) {
    continueWithoutMileage.addEventListener("click", () => {
      const result = validateForm();
      if (!result.ok) {
        state.showErrors = true;
        state.errorMessage = result.message;
        render();
        const firstError = document.querySelector(".error, input.invalid");
        if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      goToSave();
    });
  }
}

function goToSave() {
  state.promptMileage = false;
  state.showErrors = false;
  state.errorMessage = "";
  state.screen = "save";
  render();
}

function mileageMissing() {
  if (!mileageEnabled()) return false;
  return !String(state.form.startMileage || "").trim();
}

function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return String(value || "");
  return `${Number(match[3])} ${monthNames()[Number(match[2]) - 1]} ${match[1]}`;
}

function monthKey(value) {
  const match = /^(\d{4})-(\d{2})/.exec(String(value || ""));
  return match ? `${match[1]}-${match[2]}` : "";
}

function formatMonth(value) {
  const key = monthKey(value);
  const match = /^(\d{4})-(\d{2})$/.exec(key);
  if (!match) return "";
  return `${monthNames()[Number(match[2]) - 1]} ${match[1]}`;
}

function compareRecords(a, b, newestFirst) {
  const dir = newestFirst ? -1 : 1;
  const date = String(a.date || "").localeCompare(String(b.date || ""));
  if (date) return date * dir;
  const time = String(a.startTime || "").localeCompare(String(b.startTime || ""));
  if (time) return time * dir;
  return String(a.savedAt || "").localeCompare(String(b.savedAt || "")) * dir;
}

function recordsInMonth(key, newestFirst) {
  return state.store.records
    .filter((record) => monthKey(record.date) === key)
    .sort((a, b) => compareRecords(a, b, newestFirst));
}

function monthFolders() {
  const counts = new Map();
  for (const record of state.store.records) {
    const key = monthKey(record.date);
    if (!key) continue;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts.keys()]
    .sort((a, b) => b.localeCompare(a))
    .map((key) => ({ key, count: counts.get(key), label: formatMonth(key) }));
}

function checkHasProblems(record) {
  const owners = [...(record.units || []), ...(record.trailers || [])];
  return owners.some((owner) => (owner.categories || []).some((cat) => {
    if ((cat.problems || []).some((note) => String(note || "").trim())) return true;
    return (cat.items || []).some((item) => String(item.problem || "").trim());
  }));
}

function problemBanner(record) {
  return checkHasProblems(record)
    ? `<p class="status-problem">${escapeHtml(t("YOU HAVE PROBLEMS REPORTED"))}</p>`
    : `<p class="status-clear">${escapeHtml(t("NO PROBLEM 😊"))}</p>`;
}

function formatHeight(owner) {
  if (heightUnit() === "m") {
    let metres = String(owner?.heightMetres ?? "").trim();
    if (parseNonNegative(metres) === null) {
      const feet = String(owner?.heightFeet ?? "").trim();
      const inches = String(owner?.heightInches ?? "").trim();
      if (feet || inches) metres = feetInchesToMetres(feet, inches);
    }
    if (parseNonNegative(metres) === null) return owner?.height || "";
    return `${Number(metres).toFixed(2)} ${t("m")}`;
  }
  let feet = String(owner?.heightFeet ?? "").trim();
  let inches = String(owner?.heightInches ?? "").trim();
  if (!feet && !inches && parseNonNegative(owner?.heightMetres) !== null) {
    const next = metresToFeetInches(owner.heightMetres);
    feet = next.heightFeet;
    inches = next.heightInches;
  }
  if (!feet && !inches) return owner?.height || "";
  const parts = [];
  if (feet) parts.push(`${feet} ${t("ft")}`);
  if (inches) parts.push(`${inches} ${t("in")}`);
  return parts.join(" ");
}

function bindMetresFields(selector, dataKey, findOwner, required) {
  document.querySelectorAll(selector).forEach((input) => {
    const apply = (value) => {
      const owner = findOwner(input.dataset[dataKey]);
      if (owner) owner.heightMetres = value;
    };
    input.addEventListener("input", () => {
      const next = readMetres(input.value);
      if (next !== input.value) input.value = next;
      apply(next);
      if (required) input.classList.toggle("invalid", state.showErrors && next.trim() === "");
    });
    input.addEventListener("blur", () => {
      const next = commitMetres(input.value);
      input.value = next;
      apply(next);
      if (required) input.classList.toggle("invalid", state.showErrors && next === "");
    });
  });
}

function shownHeight(owner) {
  if (!heightEnabled()) return "";
  return formatHeight(owner);
}

function normalReg(value) {
  return String(value || "").replace(/\s+/g, "").toUpperCase();
}

function heightSnapshot(owner) {
  return {
    heightFeet: String(owner?.heightFeet ?? "").trim(),
    heightInches: String(owner?.heightInches ?? "").trim(),
    heightMetres: String(owner?.heightMetres ?? "").trim()
  };
}

function heightComplete(owner) {
  if (heightUnit() === "m") {
    if (parseNonNegative(owner?.heightMetres) !== null) return true;
    const feet = String(owner?.heightFeet ?? "").trim();
    const inches = String(owner?.heightInches ?? "").trim();
    return Boolean(feet || inches) && parseNonNegative(feetInchesToMetres(feet, inches)) !== null;
  }
  if (String(owner?.heightFeet ?? "").trim() && String(owner?.heightInches ?? "").trim() !== "") return true;
  if (parseNonNegative(owner?.heightMetres) === null) return false;
  const next = metresToFeetInches(owner.heightMetres);
  return Boolean(next.heightFeet) && next.heightInches !== "";
}

function heightForReg(reg) {
  const key = normalReg(reg);
  if (!key) return null;
  const profile = state.store.profile;
  const saved = profile && profile.heights && profile.heights[key];
  if (saved && heightComplete(saved)) return heightSnapshot(saved);
  for (const record of state.store.records || []) {
    if (!isSingle(record)) continue;
    for (const unit of record.units || []) {
      if (normalReg(unit.reg) === key && heightComplete(unit)) return heightSnapshot(unit);
    }
  }
  return null;
}

function rememberVehicleHeight(unit) {
  const key = normalReg(unit && unit.reg);
  if (!key || !heightComplete(unit)) return;
  const profile = state.store.profile;
  if (!profile.heights) profile.heights = {};
  const snapshot = heightSnapshot(unit);
  if (heightUnit() === "m") snapshot.heightMetres = commitMetres(snapshot.heightMetres);
  profile.heights[key] = snapshot;
  unit.heightMetres = snapshot.heightMetres;
}

function mileageLine(label, value) {
  const text = String(value || "").trim();
  return `${t(label)}: ${text ? `${text} ${mileageUnitWord()}` : t("Not recorded")}`;
}

function shareMileageLines(record) {
  if (!mileageEnabled()) return [];
  return [
    mileageLine("Start mileage", record.startMileage),
    mileageLine("End mileage", record.endMileage)
  ];
}

function validateForm() {
  if (!state.form.date) return { ok: false, message: "Enter the date before continuing." };
  if (!state.form.startTime) return { ok: false, message: "Enter the time of check before continuing." };
  const rigid = isSingle(state.form);
  for (const unit of state.form.units) {
    if (!unit.reg.trim()) {
      return { ok: false, message: rigid ? "Enter the vehicle registration." : "Enter a unit reg for every tractor unit." };
    }
    if (heightEnabled() && rigid && !heightForReg(unit.reg) && !heightComplete(unit)) {
      return {
        ok: false,
        message: heightUnit() === "m"
          ? "Enter the vehicle height in metres."
          : "Enter the vehicle height in feet and inches."
      };
    }
    if (unit.categories.some(categoryIncomplete)) {
      return {
        ok: false,
        message: rigid
          ? "Tick each item, or report a problem, before continuing. Incomplete items are marked in red."
          : "Tick each tractor unit item, or report a problem, before continuing. Incomplete items are marked in red."
      };
    }
  }
  if (!rigid) {
    for (const trailer of state.form.trailers) {
      if (!trailer.number.trim()) return { ok: false, message: "Enter a trailer number for every trailer." };
      if (trailer.categories.some(categoryIncomplete)) {
        return { ok: false, message: "Tick each trailer item, or report a problem, before continuing. Incomplete items are marked in red." };
      }
    }
  }
  return { ok: true };
}

function renderSave() {
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(t("HGV walkaround"))}</p>
        <h1>${escapeHtml(state.updatingRecordId ? t("Update this check") : t("Save this check"))}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-checks">${escapeHtml(t("Back"))}</button>
    </div>
    <div class="card">
      ${problemBanner(state.form)}
      <p><strong>${escapeHtml(state.store.profile.name)}</strong> · ${escapeHtml(state.store.profile.company)}</p>
      <p>${escapeHtml(t("Date: {date}", { date: formatDate(state.form.date) }))}</p>
      <p>${escapeHtml(t("Time of check: {time}", { time: state.form.startTime }))}</p>
      ${mileageEnabled() ? `<p>${escapeHtml(mileageLine("Start mileage", state.form.startMileage))}</p>` : ""}
      ${vehicleTypeLabel(state.form) ? `<p>${escapeHtml(vehicleTypeLabel(state.form))}</p>` : ""}
      ${isSingle(state.form)
        ? `<p>${escapeHtml(t("Vehicle: {value}", { value: state.form.units.map((u) => u.reg).join(", ") }))}${shownHeight(state.form.units[0]) ? ` · ${escapeHtml(shownHeight(state.form.units[0]))}` : ""}</p>`
        : `<p>${escapeHtml(t("Units: {value}", { value: state.form.units.map((u) => u.reg).join(", ") }))}</p>
      ${recordedTrailers(state.form.trailers).length ? `<p>${escapeHtml(t("Trailers: {value}", { value: recordedTrailers(state.form.trailers).map((trailer) => trailerSummary(trailer)).join(", ") }))}</p>` : ""}`}
    </div>
    <div class="action-bar">
      <button class="btn-green" type="button" id="save-data">${escapeHtml(state.updatingRecordId ? t("Update save") : t("Save data"))}</button>
    </div>
  `;
}

function bindSave() {
  document.getElementById("back-checks").addEventListener("click", () => {
    state.screen = "checks";
    render();
  });
  document.getElementById("save-data").addEventListener("click", () => {
    const profile = state.store.profile;
    if (isSingle(state.form)) {
      const unit = state.form.units[0];
      const reg = unit.reg.trim().toUpperCase();
      unit.reg = reg;
      if (profile.units[0]) profile.units[0].reg = reg;
      else profile.units.push({ id: unit.id, reg });
      if (heightEnabled()) rememberVehicleHeight(unit);
    } else {
      for (const unit of state.form.units) {
        if (!profile.units.some((u) => u.reg === unit.reg.trim().toUpperCase())) {
          profile.units.push({ id: unit.id, reg: unit.reg.trim().toUpperCase() });
        }
      }
    }
    const payload = {
      savedAt: new Date().toISOString(),
      vehicleType: classOf(state.form),
      date: state.form.date,
      startTime: state.form.startTime,
      startMileage: String(state.form.startMileage || "").trim(),
      endMileage: String(state.form.endMileage || "").trim(),
      driver: profile.name,
      company: profile.company,
      units: state.form.units,
      trailers: isSingle(state.form) ? [] : recordedTrailers(state.form.trailers)
    };
    if (state.updatingRecordId) {
      const index = state.store.records.findIndex((r) => r.id === state.updatingRecordId);
      if (index >= 0) {
        state.store.records[index] = { ...state.store.records[index], ...payload };
        state.viewingRecordId = state.store.records[index].id;
        state.viewingUnitIndex = state.addingKind === "unit" ? Math.max(0, payload.units.length - 1) : state.viewingUnitIndex;
        state.viewingTrailerIndex = state.addingKind === "trailer" ? Math.max(0, payload.trailers.length - 1) : state.viewingTrailerIndex;
      }
      state.updatingRecordId = null;
      state.addingKind = null;
      state.addingId = null;
    } else {
      const created = { id: uid(), ...payload };
      state.store.records.unshift(created);
      state.viewingRecordId = created.id;
      state.viewingUnitIndex = 0;
      state.viewingTrailerIndex = 0;
    }
    saveStore(state.store);
    state.historyMonth = monthKey(state.form.date);
    state.screen = "history";
    render();
  });
}

function renderHistoryTop(title, eyebrow, nested) {
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(eyebrow)}</p>
        <h1>${escapeHtml(title)}</h1>
      </div>
      <div class="topbar-actions">
        ${nested ? `<button class="btn-secondary" type="button" id="history-back">${escapeHtml(t("Back"))}</button>` : ""}
        <button class="btn-secondary" type="button" id="back-home">${escapeHtml(t("Home"))}</button>
      </div>
    </div>
  `;
}

function renderSavedRow(record) {
  const regs = (record.units || []).map((unit) => escapeHtml(unit.reg)).join(", ");
  const trailers = isSingle(record) ? "" : (record.trailers || []).map((trailer) => escapeHtml(trailerSummary(trailer))).filter(Boolean).join(", ");
  const typeLabel = vehicleTypeLabel(record);
  const details = [typeLabel ? escapeHtml(typeLabel) : "", regs, trailers].filter(Boolean).join(" · ");
  return `
    <div class="saved-row">
      <button type="button" data-open-record="${record.id}">
        ${escapeHtml(record.startTime)}${details ? ` · ${details}` : ""}
      </button>
      <button type="button" class="btn-secondary" data-edit-record="${record.id}">${escapeHtml(t("Edit"))}</button>
      <button type="button" class="btn-delete-save" data-delete-record="${record.id}">${escapeHtml(state.pendingDeleteId === record.id ? t("Tap again to delete") : t("Delete"))}</button>
    </div>
  `;
}

function renderHistoryMonths() {
  const folders = monthFolders();
  const list = folders.length
    ? `<div class="month-list">${folders.map((folder) => `
        <button type="button" class="month-folder" data-open-month="${folder.key}">
          <strong>${escapeHtml(folder.label)}</strong>
          <span>${escapeHtml(tCount("folderCount", folder.count))}</span>
        </button>
      `).join("")}</div>`
    : `<p class="muted">${escapeHtml(t("No saved checks yet."))}</p>`;
  return `
    ${renderHistoryTop(t("Saved checks"), t("HGV walkaround"), false)}
    ${list}
  `;
}

function renderHistoryMonth(key) {
  const label = formatMonth(key);
  const records = recordsInMonth(key, true);
  const groups = [];
  records.forEach((record) => {
    const last = groups[groups.length - 1];
    if (!last || last.date !== record.date) groups.push({ date: record.date, records: [record] });
    else last.records.push(record);
  });
  const days = groups.map((group) => `
    <div class="card stack">
      <h2 class="day-heading">${escapeHtml(formatDate(group.date))}</h2>
      <div class="saved-list stack">${group.records.map(renderSavedRow).join("")}</div>
    </div>
  `).join("");
  return `
    ${renderHistoryTop(label, t("Saved checks"), true)}
    <button class="btn-primary share-month" type="button" id="share-month">${escapeHtml(t("Send {label}", { label }))}</button>
    <p id="send-status" class="muted hidden"></p>
    ${days}
  `;
}

function renderHistory() {
  const record = state.store.records.find((item) => item.id === state.viewingRecordId);
  if (state.viewingRecordId && !record) state.viewingRecordId = null;
  if (record) {
    const key = monthKey(record.date);
    if (key) state.historyMonth = key;
    return `
      ${renderHistoryTop(t("Saved checks"), formatMonth(record.date) || t("Saved checks"), true)}
      ${renderRecord(record)}
    `;
  }
  if (state.historyMonth && recordsInMonth(state.historyMonth, true).length) {
    return renderHistoryMonth(state.historyMonth);
  }
  state.historyMonth = "";
  return renderHistoryMonths();
}

function renderRecord(record) {
  const rigid = isSingle(record);
  const unitCategories = categoriesForUnit(record);
  const unitMenus = record.units.map((unit, i) => {
    const photos = unit.categories.flatMap((c) => c.photos || []);
    const hasProblem = unit.categories.some((c) => (c.problems || []).some((note) => String(note || "").trim()));
    const height = rigid && shownHeight(unit) ? ` · ${escapeHtml(shownHeight(unit))}` : "";
    return `
      <details class="log-drop">
        <summary>${escapeHtml(rigid ? t("Vehicle") : t("Unit {n}", { n: i + 1 }))}: ${escapeHtml(unit.reg || t("No reg"))}${height}${hasProblem ? ` · ${escapeHtml(t("Problem"))}` : ""}</summary>
        <div class="record">
          ${unitCategories.map((cat, catIndex) => categoryLog(cat, unit.categories[catIndex])).join("")}
          ${photos.length ? `<div class="photos">${photos.map((src) => `<img src="${src}" alt="${escapeHtml(t("Saved photo"))}">`).join("")}</div>` : ""}
        </div>
      </details>
    `;
  }).join("");

  const trailerMenus = (record.trailers || []).map((trailer, i) => {
    const photos = trailer.categories.flatMap((c) => c.photos || []);
    const hasProblem = trailer.categories.some((c) => (c.problems || []).some((note) => String(note || "").trim()));
    const typeName = trailerTypeName(trailer);
    return `
      <details class="log-drop">
        <summary>${escapeHtml(t("Trailer {n}", { n: i + 1 }))}: ${escapeHtml(trailer.number || t("No number"))}${typeName ? ` · ${escapeHtml(typeName)}` : ""}${shownHeight(trailer) ? ` · ${escapeHtml(shownHeight(trailer))}` : ""}${hasProblem ? ` · ${escapeHtml(t("Problem"))}` : ""}</summary>
        <div class="record">
          ${trailerCategories(trailer).map((cat, catIndex) => categoryLog(cat, trailer.categories[catIndex])).join("")}
          ${photos.length ? `<div class="photos">${photos.map((src) => `<img src="${src}" alt="${escapeHtml(t("Saved photo"))}">`).join("")}</div>` : ""}
        </div>
      </details>
    `;
  }).join("");

  return `
    <div class="card">
      ${problemBanner(record)}
      <h2>${escapeHtml(formatDate(record.date))} · ${escapeHtml(record.startTime)}</h2>
      ${vehicleTypeLabel(record) ? `<p>${escapeHtml(vehicleTypeLabel(record))}</p>` : ""}
      <p>${escapeHtml(record.driver)} · ${escapeHtml(record.company)}</p>
      ${mileageEnabled() ? `<p>${escapeHtml(mileageLine("Start mileage", record.startMileage))}</p>
      <label class="saved-end-mileage ${String(record.startMileage || "").trim() && !String(record.endMileage || "").trim() ? "needs-end" : ""}">${escapeHtml(t("End mileage ({unit})", { unit: mileageUnitWord() }))}
        <input id="saved-end-mileage" type="text" inputmode="decimal" placeholder="${escapeHtml(t("Add end mileage"))}" value="${escapeHtml(record.endMileage || "")}" />
      </label>` : ""}
      <div class="record-actions">
        <button type="button" class="btn-primary" id="edit-check">${escapeHtml(t("Edit this check"))}</button>
        <button type="button" class="btn-primary" id="copy-pdf">${escapeHtml(t("Share PDF"))}</button>
      </div>
      <p id="send-status" class="muted hidden"></p>
      <button type="button" class="btn-delete-save" data-delete-record="${record.id}">${escapeHtml(state.pendingDeleteId === record.id ? t("Tap again to delete") : t("Delete this save"))}</button>
      <div class="stack" style="margin:16px 0 8px">
        ${unitMenus}
        ${trailerMenus}
      </div>
      ${rigid ? "" : `<div class="btn-row" style="margin-top:12px">
        <button type="button" class="btn-secondary" id="add-unit-to-save">${escapeHtml(t("Add unit"))}</button>
        <button type="button" class="btn-secondary" id="add-trailer-to-save">${escapeHtml(t("Add trailer"))}</button>
      </div>`}
    </div>
  `;
}

function categoryLog(cat, saved) {
  if (!saved) return "";
  const problems = saved.problems || [];
  const itemPhotos = saved.itemPhotos || [];
  const lines = cat.items.map((item, i) => {
    const note = String(problems[i] || "").trim();
    const shots = Array.isArray(itemPhotos[i]) ? itemPhotos[i].filter(Boolean) : [];
    const photoHtml = shots.length
      ? `<div class="photos">${shots.map((src) => `<img src="${src}" alt="${escapeHtml(t("Saved photo"))}">`).join("")}</div>`
      : "";
    if (note || shots.length) {
      const noteHtml = note ? `<div class="log-note">${escapeHtml(note)}</div>` : "";
      return `<div class="log-item log-problem"><strong>${escapeHtml(t("Problem"))}</strong> — ${escapeHtml(t(item))}${noteHtml}${photoHtml}</div>`;
    }
    return `<div class="log-item">${saved.checks[i] ? escapeHtml(t("OK")) : "—"} — ${escapeHtml(t(item))}</div>`;
  }).join("");
  const count = categoryPhotoCount(saved);
  const photoNote = count ? `<div class="muted">${escapeHtml(t("Photos"))}: ${count}</div>` : "";
  return `<h4>${escapeHtml(t(cat.title))}</h4>${lines}${photoNote}`;
}

function deleteRecord(id) {
  if (!id) return;
  if (state.pendingDeleteId !== id) {
    state.pendingDeleteId = id;
    render();
    return;
  }
  const removed = state.store.records.find((record) => record.id === id);
  state.pendingDeleteId = null;
  state.store.records = state.store.records.filter((record) => record.id !== id);
  saveStore(state.store);
  if (state.viewingRecordId === id) {
    state.viewingRecordId = null;
    state.viewingUnitIndex = 0;
    state.viewingTrailerIndex = 0;
  }
  const month = state.historyMonth || monthKey(removed && removed.date);
  if (month && !state.store.records.some((record) => monthKey(record.date) === month)) {
    state.historyMonth = "";
  }
  render();
}

function bindHistory() {
  document.getElementById("back-home").addEventListener("click", () => {
    state.screen = "home";
    state.historyMonth = "";
    state.viewingRecordId = null;
    state.pendingDeleteId = null;
    render();
  });
  const historyBack = document.getElementById("history-back");
  if (historyBack) {
    historyBack.addEventListener("click", () => {
      state.pendingDeleteId = null;
      if (state.viewingRecordId) {
        state.viewingRecordId = null;
        state.viewingUnitIndex = 0;
        state.viewingTrailerIndex = 0;
      } else {
        state.historyMonth = "";
      }
      render();
    });
  }
  document.querySelectorAll("[data-open-month]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.historyMonth = btn.dataset.openMonth;
      state.viewingRecordId = null;
      state.pendingDeleteId = null;
      state.viewingUnitIndex = 0;
      state.viewingTrailerIndex = 0;
      render();
    });
  });
  document.querySelectorAll("[data-open-record]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const record = state.store.records.find((item) => item.id === btn.dataset.openRecord);
      state.viewingRecordId = btn.dataset.openRecord;
      if (record) state.historyMonth = monthKey(record.date) || state.historyMonth;
      state.viewingUnitIndex = 0;
      state.viewingTrailerIndex = 0;
      state.pendingDeleteId = null;
      render();
    });
  });
  document.querySelectorAll("[data-edit-record]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const record = state.store.records.find((item) => item.id === btn.dataset.editRecord);
      state.viewingRecordId = btn.dataset.editRecord;
      if (record) state.historyMonth = monthKey(record.date) || state.historyMonth;
      startEditRecord();
    });
  });
  const editCheck = document.getElementById("edit-check");
  if (editCheck) editCheck.addEventListener("click", () => startEditRecord());
  document.querySelectorAll("[data-delete-record]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      deleteRecord(btn.dataset.deleteRecord);
    });
  });
  const addUnitToSave = document.getElementById("add-unit-to-save");
  if (addUnitToSave) {
    addUnitToSave.addEventListener("click", () => startAddToSave("unit"));
  }
  const addTrailerToSave = document.getElementById("add-trailer-to-save");
  if (addTrailerToSave) {
    addTrailerToSave.addEventListener("click", () => startAddToSave("trailer"));
  }
  const copyPdf = document.getElementById("copy-pdf");
  if (copyPdf) copyPdf.addEventListener("click", () => copyRecordPdf());
  const shareMonth = document.getElementById("share-month");
  if (shareMonth) shareMonth.addEventListener("click", () => copyMonthPdf());
  const savedEndMileage = document.getElementById("saved-end-mileage");
  if (savedEndMileage) {
    savedEndMileage.addEventListener("input", () => {
      const record = state.store.records.find((r) => r.id === state.viewingRecordId);
      if (!record) return;
      record.endMileage = savedEndMileage.value.trim();
      const needsEnd = Boolean(String(record.startMileage || "").trim()) && !record.endMileage;
      savedEndMileage.closest("label").classList.toggle("needs-end", needsEnd);
      saveStore(state.store);
    });
  }
}

function recordForShare(record) {
  const sections = (owner, categories) => categories.map((cat, i) => {
    const saved = owner.categories[i] || { checks: [], problems: [], photos: [] };
    return {
      title: t(cat.title),
      items: cat.items.map((label, n) => ({
        label: t(label),
        ok: Boolean(saved.checks[n]),
        problem: String((saved.problems || [])[n] || "").trim()
      })),
      photoCount: categoryPhotoCount(saved)
    };
  });
  const rigid = isSingle(record);
  return {
    date: formatDate(record.date),
    vehicleType: classOf(record),
    vehicleLabel: vehicleTypeLabel(record),
    startTime: record.startTime,
    startMileage: record.startMileage || "",
    endMileage: record.endMileage || "",
    mileageLines: shareMileageLines(record),
    labels: pdfLabels(),
    driver: record.driver,
    company: record.company,
    units: record.units.map((unit) => ({
      title: unit.reg || (rigid ? t("Vehicle") : t("Unit")),
      height: heightEnabled() && rigid ? formatHeight(unit) : "",
      categories: sections(unit, categoriesForUnit(record))
    })),
    trailers: rigid ? [] : (record.trailers || []).map((trailer) => ({
      title: trailerSummary(trailer) || t("Trailer"),
      height: heightEnabled() ? formatHeight(trailer) : "",
      categories: sections(trailer, trailerCategories(trailer))
    }))
  };
}

function setSendStatus(message) {
  const status = document.getElementById("send-status");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("hidden", !message);
}

function nativeApp() {
  return window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.nativeApp;
}

async function sharePdfBytes(bytes, fileName, title) {
  try {
    const file = new File([bytes], fileName, { type: "application/pdf" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: title || fileName });
      setSendStatus("");
      return;
    }
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    setSendStatus(t("PDF saved. Attach that file wherever you want to send it."));
  } catch (error) {
    if (error && error.name === "AbortError") return;
    setSendStatus(t("Could not share the PDF."));
  }
}

async function copyRecordPdf() {
  const record = state.store.records.find((item) => item.id === state.viewingRecordId);
  if (!record) return;
  const native = nativeApp();
  const prepared = usingLanguage(pdfLanguage(), () => {
    const payload = recordForShare(record);
    const fileName = pdfFileName(payload);
    return {
      payload,
      fileName,
      bytes: native ? null : buildCheckPdf(payload)
    };
  });
  if (native) {
    native.postMessage({ action: "copyPdf", record: prepared.payload });
    setSendStatus(t("Choose WhatsApp or another app. The PDF is sent as a file, not pasted."));
    return;
  }
  await sharePdfBytes(prepared.bytes, prepared.fileName, prepared.fileName);
}

function monthPdfFileName(label) {
  const fallback = t("Saved checks");
  const clean = String(label || fallback).replace(/[\\/:*?"<>|]/g, "-").trim() || fallback;
  return `${clean}.pdf`;
}

async function copyMonthPdf() {
  const key = state.historyMonth;
  const native = nativeApp();
  const prepared = usingLanguage(pdfLanguage(), () => {
    const label = formatMonth(key);
    const records = recordsInMonth(key, false).map(recordForShare);
    if (!label || !records.length) return null;
    const fileName = monthPdfFileName(label);
    return {
      label,
      records,
      fileName,
      bytes: native ? null : buildMonthPdf(records, label)
    };
  });
  if (!prepared) return;
  if (native) {
    native.postMessage({ action: "copyMonthPdf", title: prepared.label, fileName: prepared.fileName, records: prepared.records });
    setSendStatus(t("Choose WhatsApp or another app. The PDF is sent as a file, not pasted."));
    return;
  }
  await sharePdfBytes(prepared.bytes, prepared.fileName, prepared.label);
}

function pdfFileName(record) {
  const reg = (record.units[0] && record.units[0].title) || "check";
  return `safety-check-${record.date || "record"}-${reg}.pdf`.replace(/[^\w.-]+/g, "-");
}

function checkPdfLines(record) {
  const lines = [t("HGV walkaround")];
  const vehicleLabel = String(record.vehicleLabel || "").trim();
  if (vehicleLabel && !isCeClassLabel(vehicleLabel)) lines.push(vehicleLabel);
  lines.push(
    `${record.date || ""}  ${record.startTime || ""}`,
    `${record.driver || ""}  ·  ${record.company || ""}`,
    checkHasProblems(record) ? t("YOU HAVE PROBLEMS REPORTED") : t("NO PROBLEM 😊")
  );
  const mileageLines = Array.isArray(record.mileageLines)
    ? record.mileageLines
    : shareMileageLines(record);
  mileageLines.forEach((line) => {
    if (String(line || "").trim()) lines.push(line);
  });
  lines.push("");
  const addOwner = (heading, owner) => {
    lines.push(heading + ": " + (owner.title || ""));
    if (owner.height) lines.push(t("Height") + ": " + owner.height);
    owner.categories.forEach((cat) => {
      lines.push(cat.title);
      cat.items.forEach((item) => {
        if (item.problem) lines.push(t("PROBLEM") + " — " + item.label, item.problem);
        else lines.push((item.ok ? t("OK") : "—") + " — " + item.label);
      });
      if (cat.photoCount) lines.push(t("Photos") + ": " + cat.photoCount);
    });
    lines.push("");
  };
  const rigid = isSingle(record);
  record.units.forEach((unit, i) => addOwner(rigid ? t("Vehicle") : t("Unit {n}", { n: i + 1 }), unit));
  if (!rigid) record.trailers.forEach((trailer, i) => addOwner(t("Trailer {n}", { n: i + 1 }), trailer));
  return lines;
}

function pdfPlain(value) {
  return String(value)
    .replaceAll("–", "-")
    .replaceAll("—", "-")
    .replaceAll("·", "|")
    .replaceAll("≥", ">=")
    .replaceAll("≤", "<=")
    .replace(/[^\n\x20-\x7E]/g, "");
}

function pdfEscape(value) {
  return pdfPlain(value).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function pdfPageStream(lines) {
  const escaped = lines.map((line) => pdfEscape(line));
  if (!escaped.length) return "BT ET";
  return `BT /F1 11 Tf 48 780 Td 14 TL (${escaped.join(") ' (")}) Tj ET`;
}

function buildTextPdf(lines, title) {
  const perPage = 46;
  const chunks = [];
  const source = lines.length ? lines : [""];
  for (let i = 0; i < source.length; i += perPage) chunks.push(source.slice(i, i + perPage));
  const pageCount = chunks.length;
  const fontObj = 3 + pageCount * 2;
  const infoObj = fontObj + 1;
  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n",
    `2 0 obj << /Type /Pages /Count ${pageCount} /Kids [${chunks.map((_, index) => `${3 + index} 0 R`).join(" ")}] >> endobj\n`
  ];
  chunks.forEach((_, index) => {
    const pageObj = 3 + index;
    const contentObj = 3 + pageCount + index;
    objects.push(`${pageObj} 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents ${contentObj} 0 R /Resources << /Font << /F1 ${fontObj} 0 R >> >> >> endobj\n`);
  });
  chunks.forEach((chunk, index) => {
    const body = pdfPageStream(chunk);
    objects.push(`${3 + pageCount + index} 0 obj << /Length ${body.length} >> stream\n${body}\nendstream endobj\n`);
  });
  objects.push(`${fontObj} 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n`);
  objects.push(`${infoObj} 0 obj << /Title (${pdfEscape(title || "")}) >> endobj\n`);
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj) => {
    offsets.push(pdf.length);
    pdf += obj;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R /Info ${infoObj} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new TextEncoder().encode(pdf);
}

function buildCheckPdf(record) {
  const lines = checkPdfLines(record);
  return buildTextPdf(lines, lines[2] || t("HGV walkaround"));
}

function buildMonthPdf(records, title) {
  const lines = [title, ""];
  records.forEach((record, index) => {
    if (index) lines.push("");
    lines.push(...checkPdfLines(record));
  });
  return buildTextPdf(lines, title);
}

function loadRecordForm(record) {
  state.updatingRecordId = record.id;
  state.showErrors = false;
  state.errorMessage = "";
  state.promptMileage = false;
  state.collapsedCategories = new Set();
  state.form = {
    vehicleType: classOf(record),
    date: record.date,
    startTime: record.startTime,
    startMileage: record.startMileage || "",
    endMileage: record.endMileage || "",
    units: JSON.parse(JSON.stringify(record.units)),
    trailers: JSON.parse(JSON.stringify((record.trailers || []).filter(trailerStarted)))
  };
}

function startEditRecord() {
  const record = state.store.records.find((r) => r.id === state.viewingRecordId);
  if (!record) return;
  loadRecordForm(record);
  state.editingExisting = true;
  state.addingKind = null;
  state.addingId = null;
  state.pickingTrailerType = false;
  state.screen = "checks";
  render();
}

function startAddToSave(kind) {
  const record = state.store.records.find((r) => r.id === state.viewingRecordId);
  if (!record || isSingle(record)) return;
  loadRecordForm(record);
  state.editingExisting = false;
  state.pickingTrailerType = false;
  if (kind === "unit") {
    const extra = { id: uid(), reg: "", categories: emptyChecks(UNIT_CATEGORIES) };
    state.form.units.push(extra);
    state.addingKind = "unit";
    state.addingId = extra.id;
    state.screen = "checks";
    render();
    const focus = document.querySelector(`[data-unit-reg="${state.addingId}"]`);
    if (focus) {
      focus.scrollIntoView({ behavior: "smooth", block: "center" });
      focus.focus();
    }
    return;
  }
  state.addingKind = "trailer";
  state.addingId = null;
  state.pickingTrailerType = true;
  state.screen = "checks";
  render();
}

function isStandaloneApp() {
  return window.navigator.standalone === true
    || window.matchMedia("(display-mode: standalone)").matches
    || window.location.protocol === "file:"
    || window.location.protocol === "dysc:"
    || Boolean(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.nativeApp);
}

function installHint() {
  if (isStandaloneApp()) return "";
  return `<p class="install-hint">${escapeHtml(t("iPhone: Safari → Share → Add to Home Screen."))}<br>${escapeHtml(t("Android: Chrome → menu (⋮) → Add to Home screen / Install app."))}</p>`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        try {
          const max = 1000;
          const scale = Math.min(1, max / Math.max(img.width, img.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale) || 1;
          canvas.height = Math.round(img.height * scale) || 1;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        } catch {
          resolve(reader.result);
        }
      };
      img.onerror = () => resolve(reader.result);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function enableDragScroll() {
  const scroller = () => document.scrollingElement || document.documentElement;
  let tracking = false;
  let dragged = false;
  let startY = 0;
  let startTop = 0;

  const yOf = (e) => (e.touches ? e.touches[0].clientY : e.clientY);

  const editableTarget = (target) => {
    const el = target && target.nodeType === 1 ? target : target && target.parentElement;
    return el && el.closest("input, textarea, select, label");
  };

  const down = (e) => {
    if (editableTarget(e.target)) return;
    const el = e.target && e.target.nodeType === 1 ? e.target : e.target && e.target.parentElement;
    if (el && el.closest("button, summary, details, .file-btn, .action-bar, .btn-problem, .btn-delete-save")) return;
    tracking = true;
    dragged = false;
    startY = yOf(e);
    startTop = scroller().scrollTop;
  };

  const move = (e) => {
    if (!tracking) return;
    if (e.type === "mousemove" && !(e.buttons & 1)) return;
    const dy = startY - yOf(e);
    if (Math.abs(dy) < 8) return;
    dragged = true;
    window.__dyscDragging = true;
    scroller().scrollTop = startTop + dy;
    if (e.cancelable) e.preventDefault();
  };

  const up = () => {
    tracking = false;
    setTimeout(() => {
      window.__dyscDragging = false;
      dragged = false;
    }, 80);
  };

  document.addEventListener("mousedown", down);
  document.addEventListener("mousemove", move);
  window.addEventListener("mouseup", up);
  document.addEventListener("touchstart", down, { passive: true });
  document.addEventListener("touchmove", move, { passive: false });
  document.addEventListener("touchend", up);
  document.addEventListener("click", (e) => {
    if (editableTarget(e.target)) return;
    if (!window.__dyscDragging && !dragged) return;
    e.preventDefault();
    e.stopPropagation();
  }, true);
}

applyTheme();
applyLanguage();
enableDragScroll();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
render();
