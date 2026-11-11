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
    timeFormat: raw.timeFormat === "12" ? "12" : "24",
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
    employeeNumber: String(data.get("employeeNumber") || ""),
    unitReg: String(data.get("unitReg") || ""),
    unitMode: String(data.get("unitMode") || "")
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
    name: t("Name"),
    company: t("Company name"),
    employee: t("Employee number"),
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
  const native = nativeApp();
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

function timeClock() {
  return settings().timeFormat === "12" ? "12" : "24";
}

function clockParts(value) {
  const match = String(value || "").trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return { hour, minute };
}

function formatTime(value) {
  const parts = clockParts(value);
  if (!parts) return String(value || "");
  const minute = String(parts.minute).padStart(2, "0");
  if (timeClock() === "24") return `${String(parts.hour).padStart(2, "0")}:${minute}`;
  const suffix = parts.hour >= 12 ? t("pm") : t("am");
  const hour = parts.hour % 12 || 12;
  return `${hour}:${minute} (${suffix})`;
}

function readCheckTime() {
  const hourEl = document.getElementById("check-hour");
  const minuteEl = document.getElementById("check-minute");
  if (!hourEl || !minuteEl || !state.form) return;
  if (!hourEl.value || !minuteEl.value) {
    state.form.startTime = "";
    return;
  }
  let hour = Number(hourEl.value);
  const minute = String(Number(minuteEl.value)).padStart(2, "0");
  if (timeClock() === "12") {
    const period = document.getElementById("check-period");
    if (!period || !period.value) {
      state.form.startTime = "";
      return;
    }
    hour %= 12;
    if (period.value === "pm") hour += 12;
  }
  state.form.startTime = `${String(hour).padStart(2, "0")}:${minute}`;
}

function timeEntryHtml(value, invalid) {
  const parts = clockParts(value);
  const minute = parts ? String(parts.minute).padStart(2, "0") : "";
  const blank = `<option value=""></option>`;
  const numbered = (count, selected, start, pad) => {
    let html = blank;
    for (let n = start; n < start + count; n += 1) {
      const label = pad ? String(n).padStart(2, "0") : String(n);
      const stored = pad ? label : String(n);
      html += `<option value="${stored}" ${String(selected) === stored ? "selected" : ""}>${label}</option>`;
    }
    return html;
  };
  if (timeClock() === "12") {
    const hour = parts ? String(parts.hour % 12 || 12) : "";
    const period = parts ? (parts.hour >= 12 ? "pm" : "am") : "";
    return `
      <div class="time-row${invalid ? " invalid" : ""}">
        <select id="check-hour" aria-label="${escapeHtml(t("Hour"))}">${numbered(12, hour, 1, false)}</select>
        <select id="check-minute" aria-label="${escapeHtml(t("Minute"))}">${numbered(60, minute, 0, true)}</select>
        <select id="check-period" aria-label="${escapeHtml(t("am"))}">
          ${blank}
          <option value="am" ${period === "am" ? "selected" : ""}>${escapeHtml(t("(am)"))}</option>
          <option value="pm" ${period === "pm" ? "selected" : ""}>${escapeHtml(t("(pm)"))}</option>
        </select>
      </div>
    `;
  }
  const hour = parts ? String(parts.hour).padStart(2, "0") : "";
  return `
    <div class="time-row${invalid ? " invalid" : ""}">
      <select id="check-hour" aria-label="${escapeHtml(t("Hour"))}">${numbered(24, hour, 0, true)}</select>
      <select id="check-minute" aria-label="${escapeHtml(t("Minute"))}">${numbered(60, minute, 0, true)}</select>
    </div>
  `;
}

function setTimeFormat(format) {
  const current = settings();
  const next = format === "12" ? "12" : "24";
  if (current.timeFormat === next) return;
  current.timeFormat = next;
  saveStore(state.store);
  render();
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

function verdictChosen(owner) {
  return Boolean(owner) && (owner.verdict === "safe" || owner.verdict === "defect");
}

function verdictLabel(owner) {
  if (!owner) return "";
  if (owner.verdict === "safe") return t("Legal and safe to drive");
  if (owner.verdict === "defect") return t("Defect");
  return "";
}

function ownersNeedingVerdict() {
  if (!state.form) return [];
  if (state.addingKind === "unit") {
    return state.form.units.filter((unit) => unit.id === state.addingId);
  }
  if (state.addingKind === "trailer") {
    return state.form.trailers.filter((trailer) => trailer.id === state.addingId);
  }
  return [
    ...state.form.units,
    ...(isSingle(state.form) ? [] : state.form.trailers)
  ];
}

function renderVerdict(kind, owner) {
  const key = `${kind}:${owner.id}`;
  const missing = state.showErrors && !verdictChosen(owner);
  return `
    <div class="verdict ${missing ? "error" : ""}" data-verdict-block="${key}">
      <h3>${escapeHtml(t("Legal and safe to drive"))}</h3>
      <p class="muted">${escapeHtml(t("Confirm it is legal and safe to drive, or defect it."))}</p>
      <button type="button" class="verdict-choice safe ${owner.verdict === "safe" ? "selected" : ""}" data-set-verdict="${key}:safe">
        <span class="box"></span>
        <span>${escapeHtml(t("Legal and safe to drive"))}</span>
      </button>
      <button type="button" class="verdict-choice defect ${owner.verdict === "defect" ? "selected" : ""}" data-set-verdict="${key}:defect">
        <span class="box"></span>
        <span>${escapeHtml(t("Defect"))}</span>
      </button>
    </div>
  `;
}

function verdictSummary(record) {
  const rigid = isSingle(record);
  const lines = [];
  (record.units || []).forEach((unit, index) => {
    const text = verdictLabel(unit);
    if (!text) return;
    const name = rigid ? t("Vehicle") : t("Unit {n}", { n: index + 1 });
    const who = String(unit.reg || "").trim() ? `${name} ${unit.reg}` : name;
    lines.push(`<p class="verdict-line ${unit.verdict === "defect" ? "defect" : "safe"}">${escapeHtml(`${who}: ${text}`)}</p>`);
  });
  if (!rigid) {
    (record.trailers || []).forEach((trailer, index) => {
      const text = verdictLabel(trailer);
      if (!text) return;
      const name = t("Trailer {n}", { n: index + 1 });
      const who = String(trailer.number || "").trim() ? `${name} ${trailer.number}` : name;
      lines.push(`<p class="verdict-line ${trailer.verdict === "defect" ? "defect" : "safe"}">${escapeHtml(`${who}: ${text}`)}</p>`);
    });
  }
  return lines.join("");
}

function verdictLog(owner) {
  const text = verdictLabel(owner);
  if (!text) return "";
  return `<div class="log-item ${owner.verdict === "defect" ? "log-problem" : "log-safe"}"><strong>${escapeHtml(text)}</strong></div>`;
}

function spannerIcon() {
  return `<svg class="spanner" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22.7 19 13.6 9.9c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>`;
}

function unitsOnThisCheck() {
  if (!state.form) return [];
  if (state.addingKind === "unit") return state.form.units.filter((unit) => unit.id === state.addingId);
  if (state.addingKind === "trailer") return [];
  return state.form.units || [];
}

function unitsDefected() {
  return unitsOnThisCheck().some((unit) => unit.verdict === "defect");
}

function hasSafeUnit() {
  return unitsOnThisCheck().some((unit) => unit.verdict === "safe");
}

function collapseDefectedUnits() {
  const categories = categoriesForUnit(state.form);
  for (const unit of state.form.units || []) {
    if (unit.verdict !== "defect") continue;
    categories.forEach((cat) => {
      const key = `unit:${unit.id}:${cat.id}`;
      state.collapsedCategories.add(key);
      state.defectCollapsed.add(key);
    });
  }
}

function hasSafeTrailer() {
  return (state.form.trailers || []).some((trailer) => trailer.verdict === "safe");
}

function ownerHasDefect(owner) {
  if (!owner) return false;
  if (owner.verdict === "defect") return true;
  return (owner.categories || []).some(categoryHasSavedProblem);
}

function formHasDefect() {
  const trailers = isSingle(state.form) ? [] : (state.form.trailers || []);
  return [...(state.form.units || []), ...trailers].some(ownerHasDefect);
}

function shouldAskDefectReport() {
  if (!state.form || isSingle(state.form) || state.addingKind) return false;
  if (hasSafeTrailer()) return false;
  return formHasDefect();
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
  pendingDeleteMonth: "",
  updatingRecordId: null,
  addingKind: null,
  addingId: null,
  pickingTrailerType: false,
  choosingLanguage: false,
  profileDraft: null,
  collapsedCategories: new Set(),
  defectCollapsed: new Set(),
  notice: null,
  noticeReason: "",
  allowAnotherTrailer: false,
  allowAnotherUnit: false,
  continueIgnoringMileage: false,
  flashAddTrailer: false
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

function savedUnitReg(profile) {
  if (!profile || !profile.units || !profile.units[0]) return "";
  return String(profile.units[0].reg || "").trim();
}

function profileComplete(profile) {
  if (!profile) return false;
  const name = String(profile.name || "").trim();
  const company = String(profile.company || "").trim();
  if (!name || !company) return false;
  if (profile.unitMode === "various") return true;
  if (profile.unitMode === "same") return Boolean(savedUnitReg(profile));
  return Boolean(savedUnitReg(profile));
}

function startNewCheck(unitId) {
  const profile = state.store.profile || { units: [] };
  const various = profile.unitMode === "various";
  const units = various ? [] : (profile.units || []);
  const unit = various
    ? { id: uid(), reg: "" }
    : (units.find((u) => u.id === unitId) || units[0] || { id: uid(), reg: "" });
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
  state.defectCollapsed = new Set();
  state.notice = null;
  state.noticeReason = "";
  state.allowAnotherTrailer = false;
  state.allowAnotherUnit = false;
  state.form = {
    vehicleType: "ce",
    date: "",
    startTime: "",
    startMileage: "",
    endMileage: "",
    units: [
      {
        id: unit.id,
        reg: "",
        heightFeet: "",
        heightInches: "",
        heightMetres: "",
        categories: emptyChecks(UNIT_CATEGORIES)
      }
    ],
    trailers: []
  };
  state.screen = "checks";
}

function startSingleCheck(vehicleClass) {
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
  state.defectCollapsed = new Set();
  state.notice = null;
  state.noticeReason = "";
  state.allowAnotherTrailer = false;
  state.allowAnotherUnit = false;
  state.form = {
    vehicleType: vehicleClass,
    date: "",
    startTime: "",
    startMileage: "",
    endMileage: "",
    units: [
      {
        id: uid(),
        reg: "",
        heightFeet: "",
        heightInches: "",
        heightMetres: "",
        categories: emptyChecks(categoriesForUnit({ vehicleType: vehicleClass }))
      }
    ],
    trailers: []
  };
  state.screen = "checks";
}

function render() {
  const app = document.getElementById("app");
  if (state.editingProfile) {
    app.innerHTML = renderProfile();
    bindProfile();
    return;
  }
  if (state.screen === "boot" || state.screen === "home") {
    app.innerHTML = renderHome();
    bindHome();
    return;
  }
  if (state.screen === "legal") {
    app.innerHTML = renderLegal();
    bindLegal();
    return;
  }
  if (state.screen === "terms") {
    app.innerHTML = renderTerms();
    bindTerms();
    return;
  }
  if (state.screen === "privacy") {
    app.innerHTML = renderPrivacy();
    bindPrivacy();
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
  const title = editing ? t("Edit profile") : t("Set up once");
  const name = draft ? draft.name : (existing?.name || "");
  const company = draft ? draft.company : (existing?.company || "");
  const employeeNumber = draft ? draft.employeeNumber : (existing?.employeeNumber || "");
  const reg = draft ? draft.unitReg : savedUnitReg(existing);
  const unitMode = draft ? draft.unitMode : (existing?.unitMode || (savedUnitReg(existing) ? "same" : ""));
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
    ${profileComplete(state.store.profile) ? "" : renderLanguagePicker()}
    ${heading}
    <form id="profile-form">
      <div class="card stack">
        <label>${escapeHtml(t("Name"))}
          <input name="name" type="text" autocomplete="off" value="${escapeHtml(name)}" />
        </label>
        <label>${escapeHtml(t("Company name"))}
          <input name="company" type="text" autocomplete="off" value="${escapeHtml(company)}" />
        </label>
        <label>${escapeHtml(t("Employee number"))}
          <input name="employeeNumber" type="text" autocomplete="off" placeholder="${escapeHtml(t("Optional"))}" value="${escapeHtml(employeeNumber)}" />
        </label>
        <div class="unit-choice">
          <label>
            <input type="radio" name="unitMode" value="same" ${unitMode === "same" ? "checked" : ""} />
            <span>${escapeHtml(t("I have the same unit"))}</span>
          </label>
          <label>
            <input type="radio" name="unitMode" value="various" ${unitMode === "various" ? "checked" : ""} />
            <span>${escapeHtml(t("I use various units"))}</span>
          </label>
        </div>
        <label id="same-unit-field" ${unitMode === "same" ? "" : "hidden"}>
          ${escapeHtml(t("Unit reg"))}
          <input name="unitReg" type="text" autocomplete="off" style="text-transform:uppercase" value="${escapeHtml(reg)}" />
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
  const profileForm = document.getElementById("profile-form");
  profileForm.querySelectorAll('input[name="unitMode"]').forEach((input) => {
    input.addEventListener("change", () => {
      const field = document.getElementById("same-unit-field");
      if (field) field.hidden = profileForm.querySelector('input[name="unitMode"]:checked')?.value !== "same";
    });
  });
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const unitMode = String(data.get("unitMode") || "");
    const reg = unitMode === "same" ? String(data.get("unitReg") || "").trim().toUpperCase() : "";
    const existing = state.editingProfile || state.store.profile;
    const units = unitMode === "various"
      ? []
      : [{ id: existing?.units?.[0]?.id || uid(), reg }];
    const profile = {
      name: String(data.get("name")).trim(),
      company: String(data.get("company")).trim(),
      employeeNumber: String(data.get("employeeNumber") || "").trim(),
      unitMode: unitMode === "various" ? "various" : (unitMode === "same" ? "same" : ""),
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

function openShiftRecord() {
  const id = state.store && state.store.openShiftId;
  if (!id) return null;
  const record = (state.store.records || []).find((item) => item.id === id);
  if (!record || record.shiftComplete) return null;
  return record;
}

function openCurrentShift() {
  const record = openShiftRecord();
  if (!record) return;
  state.viewingRecordId = record.id;
  state.historyMonth = monthKey(record.date) || "";
  state.pendingDeleteId = null;
  state.viewingUnitIndex = 0;
  state.viewingTrailerIndex = 0;
  state.flashAddTrailer = !isSingle(record);
  state.notice = null;
  state.screen = "history";
  render();
  const add = document.getElementById("add-trailer-to-save");
  if (add) add.scrollIntoView({ behavior: "smooth", block: "center" });
}

function askCompleteShift() {
  state.notice = "shift-complete";
  render();
}

function completeShift() {
  const record = state.store.records.find((item) => item.id === state.viewingRecordId);
  if (!record) return;
  record.shiftComplete = true;
  if (state.store.openShiftId === record.id) state.store.openShiftId = "";
  state.notice = null;
  state.flashAddTrailer = false;
  saveStore(state.store);
  render();
}

function declineCompleteShift() {
  state.notice = null;
  state.flashAddTrailer = false;
  state.screen = "home";
  state.historyMonth = "";
  state.viewingRecordId = null;
  state.pendingDeleteId = null;
  render();
}

function renderHome() {
  const { records } = state.store;
  const profile = state.store.profile || { name: "", company: "", units: [] };
  const profileClass = profileComplete(profile) ? "" : " needs-profile";
  return `
    <div class="topbar">
      <div>
        <h1 class="app-title">${escapeHtml(t("HGV walkaround"))}</h1>
      </div>
    </div>
    <div class="card">
      <p><strong>${escapeHtml(t("Name"))}:</strong> ${escapeHtml(profile.name)}</p>
      <p><strong>${escapeHtml(t("Company name"))}:</strong> ${escapeHtml(profile.company)}</p>
      ${String(profile.employeeNumber || "").trim() ? `<p><strong>${escapeHtml(t("Employee number"))}:</strong> ${escapeHtml(profile.employeeNumber)}</p>` : ""}
    </div>
    ${openShiftRecord() ? `<button class="btn-green shift-live" type="button" id="current-shift">${escapeHtml(t("Current Shift"))}</button>` : ""}
    <div class="btn-row">
      <button class="btn-primary" type="button" id="start-checks">${escapeHtml(t("Start checks"))}</button>
      <button class="btn-secondary" type="button" id="view-saved">${escapeHtml(t("View saved checks"))}</button>
      <button class="btn-secondary${profileClass}" type="button" id="edit-profile">${escapeHtml(t("Edit profile"))}</button>
      <button class="btn-secondary" type="button" id="open-settings">${escapeHtml(t("Settings"))}</button>
    </div>
    ${records.length ? `<p class="muted">${escapeHtml(tCount("savedOnDevice", records.length))}</p>` : ""}
    <div class="home-legal-row">
      <button class="legal-home" type="button" id="open-legal">${escapeHtml(t("Legal requirements"))}</button>
      <button class="legal-home" type="button" id="open-terms">${escapeHtml(t("Terms and conditions"))}</button>
      <button class="legal-home" type="button" id="open-privacy">${escapeHtml(t("Privacy policy"))}</button>
    </div>
  `;
}

function bindHome() {
  const currentShift = document.getElementById("current-shift");
  if (currentShift) currentShift.addEventListener("click", () => openCurrentShift());
  document.getElementById("start-checks").addEventListener("click", () => {
    const units = (state.store.profile && state.store.profile.units) || [];
    startNewCheck(units[0] && units[0].id);
    render();
  });
  document.getElementById("edit-profile").addEventListener("click", () => {
    state.editingProfile = state.store.profile || { name: "", company: "", units: [] };
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
  document.getElementById("open-legal").addEventListener("click", () => {
    state.screen = "legal";
    render();
  });
  document.getElementById("open-terms").addEventListener("click", () => {
    state.screen = "terms";
    render();
  });
  document.getElementById("open-privacy").addEventListener("click", () => {
    state.screen = "privacy";
    render();
  });
}

const LEGAL_REQUIREMENTS = [
  {
    paragraphs: [
      "Conducting a Heavy Goods Vehicle (HGV) daily walkaround safety check is a strict statutory necessity under UK law, driven by the principle of absolute liability and the rigorous requirements of the operator licensing system.",
      "The detailed legal rationale for this mandatory requirement spans road traffic law, operator licensing obligations, and occupational health and safety legislation."
    ]
  },
  {
    title: "1. The Principle of Absolute Driver Liability",
    paragraphs: [
      "Under Section 40A of the Road Traffic Act 1988, a person is guilty of a criminal offence if they use, or cause or permit to be used, a motor vehicle on a road when its condition involves a danger of injury to any person.",
      "No \"Ignorance\" Defence: This is an absolute liability offence. In court, a driver cannot successfully argue that they were unaware of a defect (such as a severely worn tyre or a faulty brake bulb) if it could have been detected by a physical inspection.",
      "The Necessity: The daily walkaround check is the only legally recognized mechanism by which a driver can discharge their personal statutory duty to ensure the vehicle is safe before it enters a public highway. Without it, the driver is exposed to immediate fixed penalties, graduated financial fines, driving licence points, and criminal prosecution."
    ]
  },
  {
    title: "2. Statutory Operator Licensing Undertakings",
    paragraphs: [
      "Under Section 26 of the Goods Vehicles (Licensing of Operators) Act 1995, traffic commissioners grant Operator Licences (O-Licences) subject to explicit, legally binding undertakings.",
      "The Undertaking: Operators must legally promise that \"vehicles will be kept in a fit and serviceable condition\" and that they will maintain a robust system for recording and rectifying defects.",
      "The Necessity: The Driver and Vehicle Standards Agency (DVSA) Guide to Maintaining Roadworthiness sets the standard for how this law is enforced. The daily walkaround check acts as the foundational, active layer of an operator’s maintenance regime. If a vehicle is stopped at a roadside checkpoint and found to have a defect that should have been caught on a morning walkaround, the Traffic Commissioner has the power to suspend, curtail, or completely revoke the company’s licence to operate, effectively shutting down the business."
    ]
  },
  {
    title: "3. Structural Construction and Use Regulations",
    paragraphs: [
      "The Road Vehicles (Construction and Use) Regulations 1986 mandate specific manufacturing, maintenance, and operational standards for critical components such as braking systems, steering gear, tyres, lights, and mirrors.",
      "The Necessity: HGVs operate under extreme mechanical stress due to heavy payloads and high mileage. Mechanical degradation can happen rapidly. A formal safety check is a legal necessity to ensure that the vehicle remains compliant with these granular structural laws at the exact moment it leaves the operating centre, rather than relying solely on periodic workshop inspections (which typically occur every 4 to 12 weeks)."
    ]
  },
  {
    title: "4. Workplace Health and Safety Compliance",
    paragraphs: [
      "Under the Health and Safety at Work etc. Act 1974 (Section 2 and Section 3), employers have a duty of care to ensure the health, safety, and welfare of their employees and the public. Under UK law, a commercial vehicle is legally defined as an extension of the workplace.",
      "The Necessity: Allowing a driver to operate a 44-tonne vehicle without a formal verification of its safety systems constitutes a failure by the employer to provide a safe working environment and safe work equipment. If a catastrophic failure occurs due to an unchecked defect, both the company and individual directors face severe corporate manslaughter or health and safety prosecutions, resulting in unlimited fines and custodial sentences."
    ]
  }
];

function renderLegal() {
  const body = LEGAL_REQUIREMENTS.map((section) => {
    const heading = section.title ? `<h2>${escapeHtml(section.title)}</h2>` : "";
    const paragraphs = section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    return heading + paragraphs;
  }).join("");
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(t("HGV walkaround"))}</p>
        <h1>${escapeHtml(t("Legal requirements"))}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-home">${escapeHtml(t("Back"))}</button>
    </div>
    <article class="card legal-copy">${body}</article>
  `;
}

function bindLegal() {
  document.getElementById("back-home").addEventListener("click", () => {
    state.screen = "home";
    render();
  });
}

const TERMS = [
  {
    paragraphs: [
      "HGV walkaround is a tool for writing down a walkaround check. It does not inspect the vehicle for you, and it is not legal advice."
    ]
  },
  {
    title: "Your responsibility",
    paragraphs: [
      "The driver who uses the vehicle, and the operator who sends it out, are responsible for making sure it is safe and lawful before it goes on the road. You must look at the vehicle yourself and follow the law and your own procedures.",
      "Ticking a box, saving a check, or sending a PDF does not by itself show that the check was done properly. It does not remove your duty, and it is not a defence if something is wrong with the vehicle."
    ]
  },
  {
    title: "Not an official body",
    paragraphs: [
      "This app is not the DVLA, the DVSA, the police, or a traffic commissioner. It does not replace the Guide to Maintaining Roadworthiness, an operator’s maintenance system, or a proper inspection of the vehicle."
    ]
  },
  {
    title: "No liability",
    paragraphs: [
      "The person who provides this app is not liable for any fine, penalty points, fixed penalty, prohibition, prosecution, or action against a driving licence or an operator’s licence. That includes action by the DVLA, the DVSA, the police, a traffic commissioner, a court, or anyone else.",
      "The same applies to any loss, claim, injury, or cost that follows from using the app, from a defect, or from a check that was missed, incomplete, or wrong. The checklist may not cover every item the law requires, and it is provided as it is, without a promise that it is complete or up to date.",
      "If you do not accept these terms, do not use the app. Using the app means you accept them."
    ]
  }
];

function renderTerms() {
  const body = TERMS.map((section) => {
    const heading = section.title ? `<h2>${escapeHtml(section.title)}</h2>` : "";
    const paragraphs = section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    return heading + paragraphs;
  }).join("");
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(t("HGV walkaround"))}</p>
        <h1>${escapeHtml(t("Terms and conditions"))}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-home">${escapeHtml(t("Back"))}</button>
    </div>
    <article class="card legal-copy">${body}</article>
  `;
}

function bindTerms() {
  document.getElementById("back-home").addEventListener("click", () => {
    state.screen = "home";
    render();
  });
}

const PRIVACY = [
  {
    paragraphs: [
      "HGV walkaround does not collect personal data. We do not receive, store, or see anything you enter in the app."
    ]
  },
  {
    title: "What stays on your device",
    paragraphs: [
      "Your name, company, vehicle details, walkaround checks, and photos stay on this phone or this browser. They are saved only on that device. They are not sent to us, to a server, or to an advertising or analytics service.",
      "There is no account, no sign-in, and no tracking."
    ]
  },
  {
    title: "Sharing a PDF",
    paragraphs: [
      "If you share a PDF, you are sending that file yourself through an app you choose, such as WhatsApp or email. That send is outside HGV walkaround. We do not receive a copy."
    ]
  },
  {
    title: "Deleting your information",
    paragraphs: [
      "Deleting the app removes the saved checks and profile from the device. Clearing the browser’s site data does the same for the website."
    ]
  }
];

function renderPrivacy() {
  const body = PRIVACY.map((section) => {
    const heading = section.title ? `<h2>${escapeHtml(section.title)}</h2>` : "";
    const paragraphs = section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    return heading + paragraphs;
  }).join("");
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(t("HGV walkaround"))}</p>
        <h1>${escapeHtml(t("Privacy policy"))}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-home">${escapeHtml(t("Back"))}</button>
    </div>
    <article class="card legal-copy">${body}</article>
  `;
}

function bindPrivacy() {
  document.getElementById("back-home").addEventListener("click", () => {
    state.screen = "home";
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
    <button type="button" class="lang-open lang-stack" id="open-language">
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
      <strong>${escapeHtml(t("Time"))}</strong>
      <div class="unit-choice">
        ${choice("time-format", "24", current.timeFormat, escapeHtml(t("24h")))}
        ${choice("time-format", "12", current.timeFormat, escapeHtml(t("12h (am/pm)")))}
      </div>
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
  document.querySelectorAll('input[name="time-format"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) setTimeFormat(input.value);
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
          <input data-${kind}-metres="${id}" type="text" autocomplete="off" inputmode="decimal" placeholder="${escapeHtml(t("m"))}" value="${escapeHtml(owner.heightMetres || "")}" class="${invalid ? "invalid" : ""}" />
        </label>
      </div>
    `;
  }
  const feetInvalid = invalid && !String(owner.heightFeet || "").trim();
  const inchesInvalid = invalid && String(owner.heightInches ?? "").trim() === "";
  return `
    <div class="height-row" ${vehicleAttr} ${hide}>
      <label>${escapeHtml(t("Height (feet)"))}
        <input data-${kind}-feet="${id}" type="text" autocomplete="off" inputmode="numeric" placeholder="${escapeHtml(t("ft"))}" value="${escapeHtml(owner.heightFeet || "")}" class="${feetInvalid ? "invalid" : ""}" />
      </label>
      <label>${escapeHtml(t("Height (inches)"))}
        <input data-${kind}-inches="${id}" type="text" autocomplete="off" inputmode="numeric" placeholder="${escapeHtml(t("in"))}" value="${escapeHtml(owner.heightInches || "")}" class="${inchesInvalid ? "invalid" : ""}" />
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

function addReplacementUnit() {
  if (!state.form) return;
  const extra = {
    id: uid(),
    reg: "",
    heightFeet: "",
    heightInches: "",
    heightMetres: "",
    verdict: "",
    categories: emptyChecks(categoriesForUnit(state.form))
  };
  state.form.units.push(extra);
  state.allowAnotherUnit = false;
  state.notice = null;
  render();
  const input = document.querySelector(`[data-unit-reg="${extra.id}"]`);
  if (input) {
    input.scrollIntoView({ behavior: "smooth", block: "center" });
    input.focus();
  }
}

function chooseTrailerType(typeId) {
  if (!trailerTypeById(typeId) || !state.form) return;
  const trailer = newTrailer(typeId);
  state.form.trailers.push(trailer);
  state.pickingTrailerType = false;
  state.allowAnotherTrailer = false;
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
    <section class="card${unit.verdict === "defect" ? " defected" : ""}">
      <div class="topbar">
        <h2>${spannerIcon()}${escapeHtml(rigid ? t("Vehicle") : unitTitle)}</h2>
        ${!rigid && !state.addingKind && state.form.units.length > 1 ? `<button type="button" class="btn-danger" data-remove-unit="${unit.id}">${escapeHtml(t("Remove"))}</button>` : ""}
      </div>
      <label>${escapeHtml(rigid ? t("Vehicle reg") : t("Unit reg"))}
        <input data-unit-reg="${unit.id}" type="text" autocomplete="off" value="${escapeHtml(unit.reg)}" style="text-transform:uppercase" class="${state.showErrors && !unit.reg.trim() ? "invalid" : ""}" />
      </label>
      ${heightFields}
      ${unitCategories.map((cat, catIndex) => renderCategory(unit.categories[catIndex], cat, `unit:${unit.id}:${cat.id}`)).join("")}
      ${renderVerdict("unit", unit)}
    </section>
  `;
  }).join("");

  const trailersHtml = visibleTrailers.map((trailer) => {
    const typeName = trailerTypeName(trailer);
    const trailerIndex = state.form.trailers.findIndex((item) => item.id === trailer.id) + 1;
    return `
    <section class="card${trailer.verdict === "defect" ? " defected" : ""}">
      <div class="topbar">
        <h2>${spannerIcon()}${escapeHtml(t("Trailer {n}", { n: trailerIndex }))}${typeName ? ` · ${escapeHtml(typeName)}` : ""}</h2>
        ${!state.addingKind ? `<button type="button" class="btn-danger" data-remove-trailer="${trailer.id}">${escapeHtml(t("Remove"))}</button>` : ""}
      </div>
      <label>${escapeHtml(t("Trailer number"))}
        <input data-trailer-number="${trailer.id}" type="text" autocomplete="off" value="${escapeHtml(trailer.number)}" class="${state.showErrors && !trailer.number.trim() ? "invalid" : ""}" />
      </label>
      ${heightEnabled() ? heightEntryHtml("trailer", trailer.id, trailer, false, false) : ""}
      ${trailerCategories(trailer).map((cat, catIndex) => renderCategory(trailer.categories[catIndex], cat, `trailer:${trailer.id}:${cat.id}`, true)).join("")}
      ${renderVerdict("trailer", trailer)}
    </section>
  `;
  }).join("");

  return `
    <div class="topbar">
      <div>
        ${vehicleTypeLabel(state.form) ? `<p class="eyebrow">${escapeHtml(vehicleTypeLabel(state.form))}</p>` : ""}
        <h1 class="${state.updatingRecordId ? "" : "app-title"}">${escapeHtml(state.updatingRecordId ? (state.addingKind && !state.editingExisting ? t("Add to saved check") : t("Edit this check")) : t("HGV walkaround"))}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-select">${escapeHtml(t("Back"))}</button>
    </div>
    ${error}
    ${state.addingKind ? "" : `<div class="card stack">
      <label>${escapeHtml(t("Date"))}
        <input id="check-date" type="date" autocomplete="off" value="${state.form.date}" class="${state.showErrors && !state.form.date ? "invalid" : ""}" />
      </label>
      <label>${escapeHtml(t("Time of check"))}
        ${timeEntryHtml(state.form.startTime, state.showErrors && !state.form.startTime)}
      </label>
      ${mileageEnabled() ? `<label>${escapeHtml(t("Start mileage ({unit})", { unit: mileageUnitWord() }))}
        <input id="start-mileage" type="text" autocomplete="off" inputmode="decimal" placeholder="${escapeHtml(t("Optional"))}" value="${escapeHtml(state.form.startMileage)}" />
      </label>` : ""}
    </div>`}
    ${unitsHtml}
    ${!rigid && !state.addingKind && state.allowAnotherUnit ? `<button type="button" class="btn-secondary add-trailer" id="add-unit">${escapeHtml(t("Add unit"))}</button>` : ""}
    ${trailersHtml}
    ${!rigid && !state.addingKind && (!state.form.trailers.length || state.allowAnotherTrailer) ? `<button type="button" class="btn-secondary add-trailer" id="add-trailer">${escapeHtml(t("Add trailer"))}</button>` : ""}
    <div class="action-bar">
      <button class="btn-primary" type="button" id="continue-save">${escapeHtml(t("Continue"))}</button>
    </div>
    ${renderNotice()}
  `;
}

function renderNotice() {
  if (state.notice === "repair-unit") {
    return `
      <div class="notice-pop" role="dialog" aria-modal="true">
        <div class="notice-card">
          <p>${escapeHtml(t("Repair defect or get another Unit"))}</p>
          <button type="button" class="btn-primary" id="notice-ok">${escapeHtml(t("OK"))}</button>
        </div>
      </div>
    `;
  }
  if (state.notice === "report-defect" || state.notice === "minor-defect" || state.notice === "shift-complete") {
    const question = state.notice === "minor-defect"
      ? t("Is this a minor defect?")
      : state.notice === "shift-complete"
        ? t("Are you sure?")
        : t("Report defect?");
    return `
      <div class="notice-pop" role="dialog" aria-modal="true">
        <div class="notice-card">
          <p>${escapeHtml(question)}</p>
          <div class="notice-actions">
            <button type="button" class="btn-primary" id="notice-yes">${escapeHtml(t("Yes"))}</button>
            <button type="button" class="btn-secondary" id="notice-no">${escapeHtml(t("No"))}</button>
          </div>
        </div>
      </div>
    `;
  }
  return "";
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
  const collapsed = state.defectCollapsed.has(key) || (allChecked && state.collapsedCategories.has(key));
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
  if (key) {
    state.collapsedCategories.delete(key);
    state.defectCollapsed.delete(key);
  }
  setCategoryCollapsed(categoryEl, false);
}

function categoryOwnerKey(categoryEl) {
  const key = (categoryEl && categoryEl.getAttribute("data-category")) || "";
  const parts = key.split(":");
  if (parts.length < 2) return "";
  return `${parts[0]}:${parts[1]}`;
}

function scrollToMark(mark) {
  if (mark) {
    mark.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const button = document.getElementById("continue-save");
  if (!button) return;
  const scroller = document.scrollingElement || document.documentElement;
  scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
}

function scrollToNextSection(categoryEl) {
  const sections = [...document.querySelectorAll("[data-category]")];
  const next = sections[sections.indexOf(categoryEl) + 1];
  const currentOwner = categoryOwnerKey(categoryEl);
  const nextOwner = categoryOwnerKey(next);
  if (currentOwner && (!next || nextOwner !== currentOwner)) {
    const verdict = document.querySelector(`[data-verdict-block="${CSS.escape(currentOwner)}"]`);
    if (verdict) {
      scrollToMark(verdict);
      return;
    }
  }
  scrollToMark(next);
}

function scrollAfterVerdict(block) {
  const marks = [...document.querySelectorAll("[data-category], [data-verdict-block]")];
  scrollToMark(marks[marks.indexOf(block) + 1]);
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
  const startMileageInput = document.getElementById("start-mileage");
  if (dateInput) {
    ["change", "input", "blur"].forEach((evt) => {
      dateInput.addEventListener(evt, () => { state.form.date = dateInput.value; });
    });
  }
  ["check-hour", "check-minute", "check-period"].forEach((id) => {
    const field = document.getElementById(id);
    if (field) field.addEventListener("change", () => readCheckTime());
  });
  if (startMileageInput) {
    const saveMileage = () => {
      state.form.startMileage = startMileageInput.value;
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
        state.defectCollapsed.delete(key);
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
      if (!dataUrl) return;
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
  document.querySelectorAll("[data-set-verdict]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const [kind, id, value] = btn.dataset.setVerdict.split(":");
      if (value !== "safe" && value !== "defect") return;
      const owner = kind === "unit"
        ? state.form.units.find((unit) => unit.id === id)
        : state.form.trailers.find((trailer) => trailer.id === id);
      if (!owner) return;
      owner.verdict = value;
      const block = btn.closest("[data-verdict-block]");
      const card = block && block.closest("section.card");
      if (card) card.classList.toggle("defected", value === "defect");
      if (block) {
        block.classList.remove("error");
        block.querySelectorAll("[data-set-verdict]").forEach((choice) => {
          choice.classList.toggle("selected", choice.dataset.setVerdict.endsWith(`:${value}`));
        });
      }
      scrollAfterVerdict(block);
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
      if (unitsDefected() && !hasSafeUnit()) {
        state.notice = "repair-unit";
        render();
        return;
      }
      state.notice = null;
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
  if (continueSave) continueSave.addEventListener("click", () => attemptContinue(false));
  const noticeOk = document.getElementById("notice-ok");
  if (noticeOk) noticeOk.addEventListener("click", () => {
    state.notice = null;
    render();
  });
  const noticeNo = document.getElementById("notice-no");
  if (noticeNo) noticeNo.addEventListener("click", () => {
    if (state.notice === "report-defect" && state.noticeReason === "unit") {
      collapseDefectedUnits();
      state.notice = null;
      state.noticeReason = "";
      state.allowAnotherUnit = !isSingle(state.form);
      render();
      const add = document.getElementById("add-unit");
      if (add) add.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (state.notice === "report-defect") {
      state.notice = "minor-defect";
      render();
      return;
    }
    state.notice = null;
    state.allowAnotherTrailer = true;
    render();
    const add = document.getElementById("add-trailer");
    if (add) add.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  const addUnit = document.getElementById("add-unit");
  if (addUnit) addUnit.addEventListener("click", () => addReplacementUnit());
  const noticeYes = document.getElementById("notice-yes");
  if (noticeYes) noticeYes.addEventListener("click", () => {
    if (state.notice === "minor-defect") {
      finishContinue(state.continueIgnoringMileage);
      return;
    }
    state.notice = null;
    commitCheck();
    copyRecordPdf();
  });
}

function attemptContinue(ignoreMileage) {
  const result = validateForm();
  if (!result.ok) {
    state.showErrors = true;
    state.errorMessage = result.message;
    state.notice = null;
    render();
    const firstError = document.querySelector(".error, input.invalid");
    if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (unitsDefected() && !hasSafeUnit()) {
    state.showErrors = false;
    state.errorMessage = "";
    state.continueIgnoringMileage = ignoreMileage;
    state.noticeReason = "unit";
    state.notice = "report-defect";
    render();
    return;
  }
  if (shouldAskDefectReport()) {
    state.showErrors = false;
    state.errorMessage = "";
    state.continueIgnoringMileage = ignoreMileage;
    state.noticeReason = "check";
    state.notice = "report-defect";
    render();
    return;
  }
  finishContinue(ignoreMileage);
}

function finishContinue() {
  state.showErrors = false;
  state.errorMessage = "";
  state.notice = null;
  state.promptMileage = false;
  goToSave();
}

function goToSave() {
  state.promptMileage = false;
  state.showErrors = false;
  state.errorMessage = "";
  state.screen = "save";
  render();
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

function savedPhotoList(value) {
  return (Array.isArray(value) ? value : []).filter((src) => typeof src === "string" && src.startsWith("data:image/"));
}

function categoryHasSavedProblem(cat) {
  if (!cat) return false;
  if ((cat.problems || []).some((note) => String(note || "").trim())) return true;
  if (savedPhotoList(cat.photos).length) return true;
  if ((cat.itemPhotos || []).some((list) => savedPhotoList(list).length)) return true;
  return (cat.items || []).some((item) => {
    if (!item || typeof item !== "object") return false;
    return Boolean(String(item.problem || "").trim()) || savedPhotoList(item.photos).length > 0;
  });
}

function checkHasProblems(record) {
  const owners = [...(record.units || []), ...(record.trailers || [])];
  return owners.some((owner) => owner.verdict === "defect" || (owner.categories || []).some(categoryHasSavedProblem));
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
  if (ownersNeedingVerdict().some((owner) => !verdictChosen(owner))) {
    return { ok: false, message: "Confirm it is legal and safe to drive, or defect it, before continuing." };
  }
  return { ok: true };
}

function renderSave() {
  const profile = state.store.profile || { name: "", company: "" };
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
      <p><strong>${escapeHtml(profile.name)}</strong> · ${escapeHtml(profile.company)}</p>
      ${String(profile.employeeNumber || "").trim() ? `<p>${escapeHtml(t("Employee number"))}: ${escapeHtml(profile.employeeNumber)}</p>` : ""}
      <p>${escapeHtml(t("Date: {date}", { date: formatDate(state.form.date) }))}</p>
      <p>${escapeHtml(t("Time of check: {time}", { time: formatTime(state.form.startTime) }))}</p>
      ${mileageEnabled() ? `<p>${escapeHtml(mileageLine("Start mileage", state.form.startMileage))}</p>` : ""}
      ${vehicleTypeLabel(state.form) ? `<p>${escapeHtml(vehicleTypeLabel(state.form))}</p>` : ""}
      ${isSingle(state.form)
        ? `<p>${escapeHtml(t("Vehicle: {value}", { value: state.form.units.map((u) => u.reg).join(", ") }))}${shownHeight(state.form.units[0]) ? ` · ${escapeHtml(shownHeight(state.form.units[0]))}` : ""}</p>`
        : `<p>${escapeHtml(t("Units: {value}", { value: state.form.units.map((u) => u.reg).join(", ") }))}</p>
      ${recordedTrailers(state.form.trailers).length ? `<p>${escapeHtml(t("Trailers: {value}", { value: recordedTrailers(state.form.trailers).map((trailer) => trailerSummary(trailer)).join(", ") }))}</p>` : ""}`}
      ${verdictSummary(state.form)}
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
    commitCheck();
  });
}

function commitCheck() {
  const profile = state.store.profile || { name: "", company: "", units: [] };
    if (profile && profile.unitMode !== "various") {
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
    } else if (isSingle(state.form) && heightEnabled()) {
      const unit = state.form.units[0];
      unit.reg = unit.reg.trim().toUpperCase();
      rememberVehicleHeight(unit);
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
      employeeNumber: String(profile.employeeNumber || "").trim(),
      units: state.form.units,
      trailers: isSingle(state.form) ? [] : recordedTrailers(state.form.trailers)
    };
    if (state.updatingRecordId) {
      const index = state.store.records.findIndex((r) => r.id === state.updatingRecordId);
      if (index >= 0) {
        state.store.records[index] = { ...state.store.records[index], ...payload, shiftComplete: false };
        state.store.openShiftId = state.store.records[index].id;
        state.viewingRecordId = state.store.records[index].id;
        state.viewingUnitIndex = state.addingKind === "unit" ? Math.max(0, payload.units.length - 1) : state.viewingUnitIndex;
        state.viewingTrailerIndex = state.addingKind === "trailer" ? Math.max(0, payload.trailers.length - 1) : state.viewingTrailerIndex;
      }
      state.updatingRecordId = null;
      state.addingKind = null;
      state.addingId = null;
    } else {
      const created = { id: uid(), ...payload, shiftComplete: false };
      state.store.openShiftId = created.id;
      state.store.records.unshift(created);
      state.viewingRecordId = created.id;
      state.viewingUnitIndex = 0;
      state.viewingTrailerIndex = 0;
    }
    saveStore(state.store);
    state.historyMonth = monthKey(state.form.date);
    state.screen = "history";
    state.notice = null;
    state.noticeReason = "";
    state.allowAnotherTrailer = false;
    state.allowAnotherUnit = false;
    render();
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
  const defected = [...(record.units || []), ...(isSingle(record) ? [] : (record.trailers || []))].some((owner) => owner.verdict === "defect");
  const details = [typeLabel ? escapeHtml(typeLabel) : "", regs, trailers, defected ? escapeHtml(t("Defect")) : ""].filter(Boolean).join(" · ");
  return `
    <div class="saved-row">
      <button type="button" data-open-record="${record.id}">
        ${escapeHtml(formatTime(record.startTime))}${details ? ` · ${details}` : ""}
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
    <button class="btn-delete-save delete-month" type="button" id="delete-month">${escapeHtml(state.pendingDeleteMonth === key ? t("Tap again to delete") : t("Delete {label}", { label }))}</button>
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
    const hasProblem = unit.categories.some(categoryHasSavedProblem);
    const height = rigid && shownHeight(unit) ? ` · ${escapeHtml(shownHeight(unit))}` : "";
    const verdictMark = unit.verdict === "defect" ? ` · ${escapeHtml(t("Defect"))}` : "";
    return `
      <details class="log-drop${unit.verdict === "defect" ? " defected" : ""}">
        <summary>${unit.verdict === "defect" ? spannerIcon() : ""}${escapeHtml(rigid ? t("Vehicle") : t("Unit {n}", { n: i + 1 }))}: ${escapeHtml(unit.reg || t("No reg"))}${height}${verdictMark}${hasProblem ? ` · ${escapeHtml(t("Problem"))}` : ""}</summary>
        <div class="record">
          ${unitCategories.map((cat, catIndex) => categoryLog(cat, unit.categories[catIndex])).join("")}
          ${verdictLog(unit)}
          ${photos.length ? `<div class="photos">${photos.map((src) => `<img src="${src}" alt="${escapeHtml(t("Saved photo"))}">`).join("")}</div>` : ""}
        </div>
      </details>
    `;
  }).join("");

  const trailerMenus = (record.trailers || []).map((trailer, i) => {
    const photos = trailer.categories.flatMap((c) => c.photos || []);
    const hasProblem = trailer.categories.some(categoryHasSavedProblem);
    const typeName = trailerTypeName(trailer);
    const verdictMark = trailer.verdict === "defect" ? ` · ${escapeHtml(t("Defect"))}` : "";
    return `
      <details class="log-drop${trailer.verdict === "defect" ? " defected" : ""}">
        <summary>${trailer.verdict === "defect" ? spannerIcon() : ""}${escapeHtml(t("Trailer {n}", { n: i + 1 }))}: ${escapeHtml(trailer.number || t("No number"))}${typeName ? ` · ${escapeHtml(typeName)}` : ""}${shownHeight(trailer) ? ` · ${escapeHtml(shownHeight(trailer))}` : ""}${verdictMark}${hasProblem ? ` · ${escapeHtml(t("Problem"))}` : ""}</summary>
        <div class="record">
          ${trailerCategories(trailer).map((cat, catIndex) => categoryLog(cat, trailer.categories[catIndex])).join("")}
          ${verdictLog(trailer)}
          ${photos.length ? `<div class="photos">${photos.map((src) => `<img src="${src}" alt="${escapeHtml(t("Saved photo"))}">`).join("")}</div>` : ""}
        </div>
      </details>
    `;
  }).join("");

  return `
    <div class="card">
      ${problemBanner(record)}
      <h2>${escapeHtml(formatDate(record.date))} · ${escapeHtml(formatTime(record.startTime))}</h2>
      ${vehicleTypeLabel(record) ? `<p>${escapeHtml(vehicleTypeLabel(record))}</p>` : ""}
      <p>${escapeHtml(record.driver)} · ${escapeHtml(record.company)}</p>
      ${String(record.employeeNumber || "").trim() ? `<p>${escapeHtml(t("Employee number"))}: ${escapeHtml(record.employeeNumber)}</p>` : ""}
      ${mileageEnabled() ? `<p>${escapeHtml(mileageLine("Start mileage", record.startMileage))}</p>
      <label class="saved-end-mileage ${String(record.startMileage || "").trim() && !String(record.endMileage || "").trim() ? "needs-end" : ""}">${escapeHtml(t("End mileage ({unit})", { unit: mileageUnitWord() }))}
        <input id="saved-end-mileage" type="text" inputmode="decimal" placeholder="${escapeHtml(t("Add end mileage"))}" value="${escapeHtml(record.endMileage || "")}" />
      </label>` : ""}
      <div class="record-actions">
        ${record.id === state.store.openShiftId && !record.shiftComplete ? `<button type="button" class="btn-green" id="shift-complete">${escapeHtml(t("Shift Complete"))}</button>` : ""}
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
        <button type="button" class="btn-secondary${state.flashAddTrailer ? " trailer-flash" : ""}" id="add-trailer-to-save">${escapeHtml(t("Add trailer"))}</button>
      </div>`}
    </div>
    ${renderNotice()}
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

function deleteMonth(key) {
  if (!key) return;
  if (state.pendingDeleteMonth !== key) {
    state.pendingDeleteMonth = key;
    state.pendingDeleteId = null;
    render();
    return;
  }
  const removedIds = new Set(
    state.store.records.filter((record) => monthKey(record.date) === key).map((record) => record.id)
  );
  state.pendingDeleteMonth = "";
  state.store.records = state.store.records.filter((record) => !removedIds.has(record.id));
  if (removedIds.has(state.store.openShiftId)) state.store.openShiftId = "";
  if (removedIds.has(state.viewingRecordId)) {
    state.viewingRecordId = null;
    state.viewingUnitIndex = 0;
    state.viewingTrailerIndex = 0;
  }
  state.historyMonth = "";
  saveStore(state.store);
  render();
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
  if (state.store.openShiftId === id) state.store.openShiftId = "";
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
    state.pendingDeleteMonth = "";
    state.flashAddTrailer = false;
    render();
  });
  const historyBack = document.getElementById("history-back");
  if (historyBack) {
    historyBack.addEventListener("click", () => {
      state.pendingDeleteId = null;
      state.pendingDeleteMonth = "";
      state.flashAddTrailer = false;
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
      state.pendingDeleteMonth = "";
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
      state.flashAddTrailer = false;
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
  const shiftComplete = document.getElementById("shift-complete");
  if (shiftComplete) shiftComplete.addEventListener("click", () => askCompleteShift());
  const noticeYes = document.getElementById("notice-yes");
  if (noticeYes && state.notice === "shift-complete") noticeYes.addEventListener("click", () => completeShift());
  const noticeNo = document.getElementById("notice-no");
  if (noticeNo && state.notice === "shift-complete") noticeNo.addEventListener("click", () => declineCompleteShift());
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
    addTrailerToSave.addEventListener("click", () => {
      state.flashAddTrailer = false;
      startAddToSave("trailer");
    });
  }
  const copyPdf = document.getElementById("copy-pdf");
  if (copyPdf) copyPdf.addEventListener("click", () => copyRecordPdf());
  const shareMonth = document.getElementById("share-month");
  if (shareMonth) shareMonth.addEventListener("click", () => copyMonthPdf());
  const deleteMonthButton = document.getElementById("delete-month");
  if (deleteMonthButton) deleteMonthButton.addEventListener("click", () => deleteMonth(state.historyMonth));
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
    const saved = owner.categories[i] || { checks: [], problems: [], photos: [], itemPhotos: [] };
    return {
      title: t(cat.title),
      items: cat.items.map((label, n) => ({
        label: t(label),
        ok: Boolean(saved.checks[n]),
        problem: String((saved.problems || [])[n] || "").trim(),
        photos: savedPhotoList((saved.itemPhotos || [])[n])
      })),
      photos: savedPhotoList(saved.photos),
      photoCount: categoryPhotoCount(saved)
    };
  });
  const rigid = isSingle(record);
  const profile = state.store.profile || {};
  const driver = String(record.driver || profile.name || "").trim();
  const company = String(record.company || profile.company || "").trim();
  const employeeNumber = String(record.employeeNumber || profile.employeeNumber || "").trim();
  return {
    date: formatDate(record.date),
    vehicleType: classOf(record),
    vehicleLabel: vehicleTypeLabel(record),
    startTime: formatTime(record.startTime),
    startMileage: record.startMileage || "",
    endMileage: record.endMileage || "",
    mileageLines: shareMileageLines(record),
    labels: pdfLabels(),
    driver,
    company,
    employeeNumber,
    units: record.units.map((unit) => ({
      title: unit.reg || (rigid ? t("Vehicle") : t("Unit")),
      height: heightEnabled() && rigid ? formatHeight(unit) : "",
      verdict: unit.verdict || "",
      verdictText: verdictLabel(unit),
      categories: sections(unit, categoriesForUnit(record))
    })),
    trailers: rigid ? [] : (record.trailers || []).map((trailer) => ({
      title: trailerSummary(trailer) || t("Trailer"),
      height: heightEnabled() ? formatHeight(trailer) : "",
      verdict: trailer.verdict || "",
      verdictText: verdictLabel(trailer),
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
  const ios = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.nativeApp;
  if (ios) return ios;
  const android = window.AndroidNative;
  if (android && typeof android.postMessage === "function") {
    return {
      postMessage(payload) {
        android.postMessage(typeof payload === "string" ? payload : JSON.stringify(payload));
      }
    };
  }
  return null;
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

function pdfText(text) {
  return { kind: "text", text: String(text ?? "") };
}

function pdfImage(src) {
  return { kind: "image", src };
}

function checkPdfBlocks(record) {
  const blocks = [pdfText(t("HGV walkaround"))];
  const vehicleLabel = String(record.vehicleLabel || "").trim();
  if (vehicleLabel && !isCeClassLabel(vehicleLabel)) blocks.push(pdfText(vehicleLabel));
  const identity = [];
  const driver = String(record.driver || "").trim();
  const company = String(record.company || "").trim();
  const employeeNumber = String(record.employeeNumber || "").trim();
  if (driver) identity.push(pdfText(`${t("Name")}: ${driver}`));
  if (company) identity.push(pdfText(`${t("Company name")}: ${company}`));
  if (employeeNumber) identity.push(pdfText(`${t("Employee number")}: ${employeeNumber}`));
  blocks.push(
    pdfText(`${record.date || ""}  ${record.startTime || ""}`),
    ...identity,
    pdfText(checkHasProblems(record) ? t("YOU HAVE PROBLEMS REPORTED") : t("NO PROBLEM 😊"))
  );
  const mileageLines = Array.isArray(record.mileageLines)
    ? record.mileageLines
    : shareMileageLines(record);
  mileageLines.forEach((line) => {
    if (String(line || "").trim()) blocks.push(pdfText(line));
  });
  blocks.push(pdfText(""));
  const addPhotos = (sources) => {
    const photos = savedPhotoList(sources);
    photos.forEach((src) => blocks.push(pdfImage(src)));
    return photos.length;
  };
  const addOwner = (heading, owner) => {
    blocks.push(pdfText(heading + ": " + (owner.title || "")));
    if (owner.height) blocks.push(pdfText(t("Height") + ": " + owner.height));
    owner.categories.forEach((cat) => {
      blocks.push(pdfText(cat.title));
      let placed = 0;
      cat.items.forEach((item) => {
        const photos = savedPhotoList(item.photos);
        if (item.problem || photos.length) {
          blocks.push(pdfText(t("PROBLEM") + " — " + item.label));
          if (item.problem) blocks.push(pdfText(item.problem));
          photos.forEach((src) => blocks.push(pdfImage(src)));
          placed += photos.length;
        } else {
          blocks.push(pdfText((item.ok ? t("OK") : "—") + " — " + item.label));
        }
      });
      placed += addPhotos(cat.photos);
      if (!placed && cat.photoCount) blocks.push(pdfText(t("Photos") + ": " + cat.photoCount));
    });
    if (owner.verdictText) blocks.push(pdfText(owner.verdictText));
    blocks.push(pdfText(""));
  };
  const rigid = isSingle(record);
  record.units.forEach((unit, i) => addOwner(rigid ? t("Vehicle") : t("Unit {n}", { n: i + 1 }), unit));
  if (!rigid) record.trailers.forEach((trailer, i) => addOwner(t("Trailer {n}", { n: i + 1 }), trailer));
  return blocks;
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

function asciiBytes(value) {
  return new TextEncoder().encode(value);
}

function concatBytes(parts) {
  let length = 0;
  parts.forEach((part) => { length += part.length; });
  const out = new Uint8Array(length);
  let offset = 0;
  parts.forEach((part) => {
    out.set(part, offset);
    offset += part.length;
  });
  return out;
}

function jpegBytesFromDataUrl(src) {
  const text = String(src || "");
  const comma = text.indexOf(",");
  if (!text.startsWith("data:image/") || comma < 0) return null;
  const meta = text.slice(5, comma).toLowerCase();
  const mime = meta.split(";")[0];
  if ((mime !== "image/jpeg" && mime !== "image/jpg") || !meta.includes("base64")) return null;
  try {
    const binary = atob(text.slice(comma + 1));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    if (bytes.length < 4 || bytes[0] !== 0xFF || bytes[1] !== 0xD8) return null;
    return bytes;
  } catch {
    return null;
  }
}

function jpegSize(bytes) {
  let i = 2;
  while (i + 9 < bytes.length) {
    if (bytes[i] !== 0xFF) { i += 1; continue; }
    const marker = bytes[i + 1];
    if (marker === 0xD8 || marker === 0xD9 || marker === 0x01 || (marker >= 0xD0 && marker <= 0xD7)) {
      i += 2;
      continue;
    }
    const length = (bytes[i + 2] << 8) | bytes[i + 3];
    if (length < 2) break;
    if (marker >= 0xC0 && marker <= 0xCF && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
      return {
        height: (bytes[i + 5] << 8) | bytes[i + 6],
        width: (bytes[i + 7] << 8) | bytes[i + 8]
      };
    }
    i += 2 + length;
  }
  return null;
}

function buildTextPdf(blocks, title) {
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  const lineHeight = 16;
  const maxImageHeight = 280;
  const pages = [];
  let page = { commands: [], images: [] };
  let cursor = margin;
  const ensure = (height) => {
    if (cursor + height <= pageHeight - margin) return;
    pages.push(page);
    page = { commands: [], images: [] };
    cursor = margin;
  };
  const source = blocks.length ? blocks : [pdfText("")];
  source.forEach((block) => {
    if (block && block.kind === "image") {
      const bytes = jpegBytesFromDataUrl(block.src);
      const size = bytes && jpegSize(bytes);
      if (!bytes || !size || !size.width || !size.height) {
        ensure(lineHeight);
        const baseline = pageHeight - cursor - 11;
        page.commands.push(`BT /F1 11 Tf 1 0 0 1 ${margin} ${baseline.toFixed(2)} Tm (${pdfEscape(t("Photos"))}) Tj ET`);
        cursor += lineHeight;
        return;
      }
      let width = contentWidth;
      let height = width * (size.height / size.width);
      if (height > maxImageHeight) {
        height = maxImageHeight;
        width = height * (size.width / size.height);
      }
      ensure(height + 8);
      const name = `Im${page.images.length + 1}`;
      const pdfY = pageHeight - cursor - height;
      page.commands.push(`q ${width.toFixed(2)} 0 0 ${height.toFixed(2)} ${margin} ${pdfY.toFixed(2)} cm /${name} Do Q`);
      page.images.push({ name, width: size.width, height: size.height, bytes });
      cursor += height + 8;
      return;
    }
    ensure(lineHeight);
    const baseline = pageHeight - cursor - 11;
    const text = pdfEscape(block && block.text != null ? block.text : block);
    page.commands.push(`BT /F1 11 Tf 1 0 0 1 ${margin} ${baseline.toFixed(2)} Tm (${text}) Tj ET`);
    cursor += lineHeight;
  });
  pages.push(page);

  let nextId = 3;
  const pageIds = pages.map(() => nextId++);
  const contentIds = pages.map(() => nextId++);
  const imageIds = pages.map((item) => item.images.map(() => nextId++));
  const fontId = nextId++;
  const infoId = nextId++;
  const objects = new Array(infoId + 1);
  const put = (id, body) => {
    objects[id] = concatBytes([asciiBytes(`${id} 0 obj `), body, asciiBytes(" endobj\n")]);
  };
  put(1, asciiBytes("<< /Type /Catalog /Pages 2 0 R >>"));
  put(2, asciiBytes(`<< /Type /Pages /Count ${pages.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`));
  pages.forEach((item, index) => {
    const xobjects = item.images.map((image, imageIndex) => `/${image.name} ${imageIds[index][imageIndex]} 0 R`).join(" ");
    const resources = `/Resources << /Font << /F1 ${fontId} 0 R >> /XObject << ${xobjects} >> >>`;
    put(pageIds[index], asciiBytes(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents ${contentIds[index]} 0 R ${resources} >>`));
    const stream = asciiBytes(item.commands.join("\n"));
    put(contentIds[index], concatBytes([
      asciiBytes(`<< /Length ${stream.length} >>\nstream\n`),
      stream,
      asciiBytes("\nendstream")
    ]));
    item.images.forEach((image, imageIndex) => {
      put(imageIds[index][imageIndex], concatBytes([
        asciiBytes(`<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.bytes.length} >>\nstream\n`),
        image.bytes,
        asciiBytes("\nendstream")
      ]));
    });
  });
  put(fontId, asciiBytes("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"));
  put(infoId, asciiBytes(`<< /Title (${pdfEscape(title || "")}) >>`));

  const parts = [asciiBytes("%PDF-1.4\n")];
  const offsets = [0];
  let position = parts[0].length;
  for (let id = 1; id <= infoId; id++) {
    offsets.push(position);
    parts.push(objects[id]);
    position += objects[id].length;
  }
  let trailer = `xref\n0 ${infoId + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    trailer += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  trailer += `trailer << /Size ${infoId + 1} /Root 1 0 R /Info ${infoId} 0 R >>\nstartxref\n${position}\n%%EOF`;
  parts.push(asciiBytes(trailer));
  return concatBytes(parts);
}

function buildCheckPdf(record) {
  const blocks = checkPdfBlocks(record);
  const title = blocks[2] && blocks[2].text ? blocks[2].text : t("HGV walkaround");
  return buildTextPdf(blocks, title);
}

function buildMonthPdf(records, title) {
  const blocks = [pdfText(title), pdfText("")];
  records.forEach((record, index) => {
    if (index) blocks.push(pdfText(""));
    blocks.push(...checkPdfBlocks(record));
  });
  return buildTextPdf(blocks, title);
}

function loadRecordForm(record) {
  state.updatingRecordId = record.id;
  state.showErrors = false;
  state.errorMessage = "";
  state.promptMileage = false;
  state.collapsedCategories = new Set();
  state.defectCollapsed = new Set();
  state.notice = null;
  state.noticeReason = "";
  state.allowAnotherTrailer = false;
  state.allowAnotherUnit = false;
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
    || Boolean(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.nativeApp)
    || Boolean(window.AndroidNative);
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

function blobToDataUrl(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve("");
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(blob);
  });
}

function loadImageElement(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    img.src = url;
  });
}

async function compressImage(file) {
  try {
    const buffer = await file.arrayBuffer();
    if (!buffer || !buffer.byteLength) return "";
    const blob = new Blob([buffer], { type: file.type || "image/jpeg" });
    let source = null;
    if (typeof createImageBitmap === "function") {
      try { source = await createImageBitmap(blob); } catch { source = null; }
    }
    if (!source) {
      try { source = await loadImageElement(blob); } catch { source = null; }
    }
    if (!source) return blobToDataUrl(blob);
    const width = source.width || source.naturalWidth || 1;
    const height = source.height || source.naturalHeight || 1;
    const max = 1200;
    const scale = Math.min(1, max / Math.max(width, height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return blobToDataUrl(blob);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    if (typeof source.close === "function") source.close();
    const jpeg = canvas.toDataURL("image/jpeg", 0.72);
    if (jpeg.startsWith("data:image/jpeg") && jpeg.length > 64) return jpeg;
    return blobToDataUrl(blob);
  } catch {
    return "";
  }
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
if (window.AndroidNative && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => reg.unregister());
  }).catch(() => {});
} else if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
render();
