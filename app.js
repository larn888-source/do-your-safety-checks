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
      "Load security – cargo properly strapped, blocked, braced; load evenly distributed"
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

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function emptyChecks(categories) {
  return categories.map((cat) => ({
    id: cat.id,
    checks: cat.items.map(() => false),
    problems: cat.items.map(() => ""),
    photos: []
  }));
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

const state = {
  screen: "boot",
  store: loadStore(),
  selectedUnitId: null,
  form: null,
  showErrors: false,
  errorMessage: "",
  historyDate: "",
  viewingRecordId: null,
  viewingUnitIndex: 0,
  viewingTrailerIndex: 0,
  pendingDeleteId: null,
  updatingRecordId: null,
  addingKind: null,
  addingId: null
};

function startNewCheck(unitId) {
  const profile = state.store.profile;
  const unit = profile.units.find((u) => u.id === unitId) || profile.units[0];
  state.selectedUnitId = unit.id;
  state.showErrors = false;
  state.errorMessage = "";
  state.updatingRecordId = null;
  state.addingKind = null;
  state.addingId = null;
  state.form = {
    date: "",
    startTime: "",
    units: [
      {
        id: unit.id,
        reg: unit.reg,
        categories: emptyChecks(UNIT_CATEGORIES)
      }
    ],
    trailers: [
      {
        id: uid(),
        number: "",
        categories: emptyChecks(TRAILER_CATEGORIES)
      }
    ]
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
  if (state.screen === "boot" || state.screen === "select") {
    app.innerHTML = renderSelectUnit();
    bindSelectUnit();
    return;
  }
  if (state.screen === "checks") {
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
  }
}

function renderProfile() {
  const existing = state.editingProfile;
  const title = existing ? "Edit your profile" : "Create your profile";
  return `
    <p class="eyebrow">Do Your Safety Checks</p>
    <h1>${title}</h1>
    <p class="muted">Saved on this phone. No login needed. Works on iPhone and Android.</p>
    ${installHint()}
    <form id="profile-form" class="card stack">
      <label>Name
        <input name="name" type="text" required autocomplete="name" value="${escapeHtml(existing?.name || "")}" />
      </label>
      <label>Company name
        <input name="company" type="text" required value="${escapeHtml(existing?.company || "")}" />
      </label>
      <label>Unit reg
        <input name="unitReg" type="text" required style="text-transform:uppercase" value="${escapeHtml(existing?.units?.[0]?.reg || "")}" />
      </label>
      <button class="btn-primary" type="submit">Save profile</button>
    </form>
  `;
}

function bindProfile() {
  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const reg = String(data.get("unitReg")).trim().toUpperCase();
    const existing = state.editingProfile;
    const units = existing?.units?.length ? existing.units.map((unit, i) => (
      i === 0 ? { ...unit, reg } : unit
    )) : [{ id: uid(), reg }];
    state.store.profile = {
      name: String(data.get("name")).trim(),
      company: String(data.get("company")).trim(),
      units
    };
    state.editingProfile = null;
    saveStore(state.store);
    state.screen = "select";
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
        <p class="eyebrow">Do Your Safety Checks</p>
        <h1>Select your unit</h1>
      </div>
    </div>
    <div class="card">
      <p><strong>${escapeHtml(profile.name)}</strong></p>
      <p class="muted">${escapeHtml(profile.company)}</p>
    </div>
    <form id="select-form" class="card">
      <div class="unit-choice">${units}</div>
      <div class="btn-row">
        <button class="btn-primary" type="submit">Start checks</button>
        <button class="btn-secondary" type="button" id="edit-profile">Edit profile</button>
        <button class="btn-secondary" type="button" id="view-saved">View saved checks</button>
      </div>
    </form>
    ${records.length ? `<p class="muted">${records.length} saved check${records.length === 1 ? "" : "s"} on this device.</p>` : ""}
  `;
}

function bindSelectUnit() {
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
    state.historyDate = "";
    state.viewingRecordId = null;
    render();
  });
}

function renderChecks() {
  const error = state.showErrors && state.errorMessage
    ? `<div class="error-banner">${escapeHtml(state.errorMessage)}</div>`
    : "";

  const visibleUnits = state.updatingRecordId && state.addingKind === "unit"
    ? state.form.units.filter((unit) => unit.id === state.addingId)
    : state.updatingRecordId
      ? []
      : state.form.units;
  const visibleTrailers = state.updatingRecordId && state.addingKind === "trailer"
    ? state.form.trailers.filter((trailer) => trailer.id === state.addingId)
    : state.updatingRecordId
      ? []
      : state.form.trailers;

  const unitsHtml = visibleUnits.map((unit, unitIndex) => `
    <section class="card">
      <h2>HGV Tractor Unit</h2>
      <label>Unit reg
        <input data-unit-reg="${unit.id}" type="text" value="${escapeHtml(unit.reg)}" style="text-transform:uppercase" />
      </label>
      ${UNIT_CATEGORIES.map((cat, catIndex) => renderCategory(unit.categories[catIndex], cat, `unit:${unit.id}:${cat.id}`, unitIndex === 0 && catIndex === 0)).join("")}
    </section>
  `).join("");

  const trailersHtml = visibleTrailers.map((trailer, i) => `
    <section class="card">
      <div class="topbar">
        <h2>Trailer ${state.form.trailers.findIndex((t) => t.id === trailer.id) + 1}</h2>
        ${!state.updatingRecordId && state.form.trailers.length > 1 ? `<button type="button" class="btn-danger" data-remove-trailer="${trailer.id}">Remove</button>` : ""}
      </div>
      <label>Trailer number
        <input data-trailer-number="${trailer.id}" type="text" value="${escapeHtml(trailer.number)}" class="${state.showErrors && !trailer.number.trim() ? "invalid" : ""}" />
      </label>
      ${TRAILER_CATEGORIES.map((cat, catIndex) => renderCategory(trailer.categories[catIndex], cat, `trailer:${trailer.id}:${cat.id}`)).join("")}
    </section>
  `).join("");

  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">Do Your Safety Checks</p>
        <h1>${state.updatingRecordId ? "Add to saved check" : "Daily walkaround"}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-select">Back</button>
    </div>
    ${error}
    ${state.updatingRecordId ? "" : `<div class="card stack">
      <label>Date
        <input id="check-date" type="date" value="${state.form.date}" class="${state.showErrors && !state.form.date ? "invalid" : ""}" />
      </label>
      <label>Start time
        <input id="check-time" type="time" value="${state.form.startTime}" class="${state.showErrors && !state.form.startTime ? "invalid" : ""}" />
      </label>
    </div>`}
    ${unitsHtml}
    ${trailersHtml}
    <div class="action-bar">
      <button class="btn-primary" type="button" id="continue-save">Continue</button>
    </div>
  `;
}

function renderCategory(saved, cat, key) {
  if (!saved.problems) saved.problems = cat.items.map(() => "");
  const invalid = state.showErrors && categoryIncomplete(saved);
  const items = cat.items.map((label, i) => {
    const note = saved.problems[i] || "";
    const open = Boolean(note.trim()) || saved.problemsOpen && saved.problemsOpen[i];
    return `
    <div class="check-block ${note.trim() ? "has-problem" : ""} ${state.showErrors && !itemComplete(saved, i) ? "error" : ""}">
      <div class="check-item ${saved.checks[i] ? "checked" : ""}" data-check="${key}:${i}" role="checkbox" aria-checked="${saved.checks[i] ? "true" : "false"}">
        <span class="box"></span>
        <span>${escapeHtml(label)}</span>
      </div>
      <button type="button" class="btn-problem" data-toggle-problem="${key}:${i}">${note.trim() ? "Remove problem" : "Report problem"}</button>
      <textarea class="problem-text ${open ? "" : "hidden"}" data-problem="${key}:${i}" rows="3" placeholder="Describe the problem">${escapeHtml(note)}</textarea>
    </div>
  `;
  }).join("");

  const photos = saved.photos.map((src, i) => `
    <div class="photo-wrap">
      <img src="${src}" alt="Problem photo" />
      <button type="button" data-remove-photo="${key}:${i}" aria-label="Remove photo">×</button>
    </div>
  `).join("");

  return `
    <div class="category ${invalid ? "error" : ""}">
      <div class="category-head">
        <h3>${escapeHtml(cat.title)}</h3>
        <label class="file-btn">Take photo of problem
          <input type="file" accept="image/*" capture="environment" data-photo="${key}" />
        </label>
      </div>
      ${items}
      <div class="photos">${photos}</div>
    </div>
  `;
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
      state.screen = "select";
    }
    render();
  });
  const dateInput = document.getElementById("check-date");
  const timeInput = document.getElementById("check-time");
  if (dateInput && timeInput) {
    ["change", "input", "blur"].forEach((evt) => {
      dateInput.addEventListener(evt, () => { state.form.date = dateInput.value; });
      timeInput.addEventListener(evt, () => { state.form.startTime = timeInput.value; });
    });
  }
  document.querySelectorAll("[data-unit-reg]").forEach((input) => {
    input.addEventListener("input", () => {
      const unit = state.form.units.find((u) => u.id === input.dataset.unitReg);
      unit.reg = input.value.toUpperCase();
    });
  });
  document.querySelectorAll("[data-trailer-number]").forEach((input) => {
    input.addEventListener("input", () => {
      const trailer = state.form.trailers.find((t) => t.id === input.dataset.trailerNumber);
      trailer.number = input.value;
      input.classList.toggle("invalid", state.showErrors && !input.value.trim());
    });
  });
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
      const hasNote = Boolean(String(cat.problems[i] || "").trim());
      if (hasNote) {
        cat.problems[i] = "";
        cat.problemsOpen[i] = false;
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
  document.querySelectorAll("[data-photo]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const dataUrl = await compressImage(file);
      const [kind, id, catId] = input.dataset.photo.split(":");
      const owner = kind === "unit"
        ? state.form.units.find((u) => u.id === id)
        : state.form.trailers.find((t) => t.id === id);
      owner.categories.find((c) => c.id === catId).photos.push(dataUrl);
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
  document.getElementById("continue-save").addEventListener("click", () => {
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
    state.screen = "save";
    render();
  });
}

function validateForm() {
  if (!state.form.date) return { ok: false, message: "Enter the date before continuing." };
  if (!state.form.startTime) return { ok: false, message: "Enter the start time before continuing." };
  for (const unit of state.form.units) {
    if (!unit.reg.trim()) return { ok: false, message: "Enter a unit reg for every tractor unit." };
    if (unit.categories.some(categoryIncomplete)) {
      return { ok: false, message: "Tick each tractor unit item, or report a problem, before continuing. Incomplete items are marked in red." };
    }
  }
  for (const trailer of state.form.trailers) {
    if (!trailer.number.trim()) return { ok: false, message: "Enter a trailer number for every trailer." };
    if (trailer.categories.some(categoryIncomplete)) {
      return { ok: false, message: "Tick each trailer item, or report a problem, before continuing. Incomplete items are marked in red." };
    }
  }
  return { ok: true };
}

function renderSave() {
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">Do Your Safety Checks</p>
        <h1>${state.updatingRecordId ? "Update this check" : "Save this check"}</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-checks">Back</button>
    </div>
    <div class="card">
      <p><strong>${escapeHtml(state.store.profile.name)}</strong> · ${escapeHtml(state.store.profile.company)}</p>
      <p>Date: ${escapeHtml(state.form.date)}</p>
      <p>Start time: ${escapeHtml(state.form.startTime)}</p>
      <p>Units: ${state.form.units.map((u) => escapeHtml(u.reg)).join(", ")}</p>
      <p>Trailers: ${state.form.trailers.map((t) => escapeHtml(t.number)).join(", ")}</p>
    </div>
    <div class="action-bar">
      <button class="btn-green" type="button" id="save-data">${state.updatingRecordId ? "Update save" : "Save data"}</button>
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
    for (const unit of state.form.units) {
      if (!profile.units.some((u) => u.reg === unit.reg.trim().toUpperCase())) {
        profile.units.push({ id: unit.id, reg: unit.reg.trim().toUpperCase() });
      }
    }
    const payload = {
      savedAt: new Date().toISOString(),
      date: state.form.date,
      startTime: state.form.startTime,
      driver: profile.name,
      company: profile.company,
      units: state.form.units,
      trailers: state.form.trailers
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
    state.historyDate = state.form.date;
    state.screen = "history";
    render();
  });
}

function renderHistory() {
  const dates = [...new Set(state.store.records.map((r) => r.date))].sort().reverse();
  const dateOptions = [`<option value="">Select a date</option>`]
    .concat(dates.map((d) => `<option value="${d}" ${d === state.historyDate ? "selected" : ""}>${d}</option>`))
    .join("");

  const matching = state.store.records.filter((r) => r.date === state.historyDate);
  const list = matching.map((r) => `
    <div class="saved-row">
      <button type="button" data-open-record="${r.id}">
        ${escapeHtml(r.startTime)} · ${r.units.map((u) => escapeHtml(u.reg)).join(", ")}
      </button>
      <button type="button" class="btn-delete-save" data-delete-record="${r.id}">${state.pendingDeleteId === r.id ? "Tap again to delete" : "Delete"}</button>
    </div>
  `).join("");

  const record = state.store.records.find((r) => r.id === state.viewingRecordId);
  const detail = record ? renderRecord(record) : (state.historyDate && !matching.length
    ? `<p class="muted">No checks saved for that date.</p>`
    : `<p class="muted">Select a date to open a saved check.</p>`);

  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">Do Your Safety Checks</p>
        <h1>Saved checks</h1>
      </div>
      <button class="btn-secondary" type="button" id="back-home">Home</button>
    </div>
    <div class="card stack">
      <label>Select date
        <select id="history-date">${dateOptions}</select>
      </label>
      <div class="saved-list stack">${list}</div>
    </div>
    ${detail}
  `;
}

function renderRecord(record) {
  const unitMenus = record.units.map((unit, i) => {
    const photos = unit.categories.flatMap((c) => c.photos || []);
    const hasProblem = unit.categories.some((c) => (c.problems || []).some((note) => String(note || "").trim()));
    return `
      <details class="log-drop">
        <summary>Unit ${i + 1}: ${escapeHtml(unit.reg || "No reg")}${hasProblem ? " · Problem" : ""}</summary>
        <div class="record">
          ${UNIT_CATEGORIES.map((cat, catIndex) => categoryLog(cat, unit.categories[catIndex])).join("")}
          ${photos.length ? `<div class="photos">${photos.map((src) => `<img src="${src}" alt="Saved photo">`).join("")}</div>` : ""}
        </div>
      </details>
    `;
  }).join("");

  const trailerMenus = record.trailers.map((trailer, i) => {
    const photos = trailer.categories.flatMap((c) => c.photos || []);
    const hasProblem = trailer.categories.some((c) => (c.problems || []).some((note) => String(note || "").trim()));
    return `
      <details class="log-drop">
        <summary>Trailer ${i + 1}: ${escapeHtml(trailer.number || "No number")}${hasProblem ? " · Problem" : ""}</summary>
        <div class="record">
          ${TRAILER_CATEGORIES.map((cat, catIndex) => categoryLog(cat, trailer.categories[catIndex])).join("")}
          ${photos.length ? `<div class="photos">${photos.map((src) => `<img src="${src}" alt="Saved photo">`).join("")}</div>` : ""}
        </div>
      </details>
    `;
  }).join("");

  return `
    <div class="card">
      <h2>${escapeHtml(record.date)} · ${escapeHtml(record.startTime)}</h2>
      <p>${escapeHtml(record.driver)} · ${escapeHtml(record.company)}</p>
      <button type="button" class="btn-delete-save" data-delete-record="${record.id}">${state.pendingDeleteId === record.id ? "Tap again to delete" : "Delete this save"}</button>
      <div class="stack" style="margin:16px 0 8px">
        ${unitMenus}
        ${trailerMenus}
      </div>
      <div class="btn-row" style="margin-top:12px">
        <button type="button" class="btn-secondary" id="add-unit-to-save">Add unit</button>
        ${record.trailers.length < 5 ? `<button type="button" class="btn-secondary" id="add-trailer-to-save">Add trailer</button>` : ""}
      </div>
    </div>
  `;
}

function categoryLog(cat, saved) {
  if (!saved) return "";
  const problems = saved.problems || [];
  const lines = cat.items.map((item, i) => {
    const note = String(problems[i] || "").trim();
    if (note) {
      return `<div class="log-item log-problem"><strong>Problem</strong> — ${escapeHtml(item)}<div class="log-note">${escapeHtml(note)}</div></div>`;
    }
    return `<div class="log-item">${saved.checks[i] ? "OK" : "—"} — ${escapeHtml(item)}</div>`;
  }).join("");
  const photoNote = saved.photos && saved.photos.length ? `<div class="muted">Photos: ${saved.photos.length}</div>` : "";
  return `<h4>${escapeHtml(cat.title)}</h4>${lines}${photoNote}`;
}

function deleteRecord(id) {
  if (!id) return;
  if (state.pendingDeleteId !== id) {
    state.pendingDeleteId = id;
    render();
    return;
  }
  state.pendingDeleteId = null;
  state.store.records = state.store.records.filter((r) => r.id !== id);
  saveStore(state.store);
  if (state.viewingRecordId === id) {
    const next = state.store.records.find((r) => r.date === state.historyDate);
    state.viewingRecordId = next ? next.id : null;
    state.viewingUnitIndex = 0;
    state.viewingTrailerIndex = 0;
  }
  if (state.historyDate && !state.store.records.some((r) => r.date === state.historyDate)) {
    state.historyDate = "";
  }
  render();
}

function bindHistory() {
  document.getElementById("back-home").addEventListener("click", () => {
    state.screen = "select";
    render();
  });
  document.getElementById("history-date").addEventListener("change", (e) => {
    state.historyDate = e.target.value;
    const first = state.store.records.find((r) => r.date === state.historyDate);
    state.viewingRecordId = first ? first.id : null;
    state.viewingUnitIndex = 0;
    state.viewingTrailerIndex = 0;
    render();
  });
  document.querySelectorAll("[data-open-record]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.viewingRecordId = btn.dataset.openRecord;
      state.viewingUnitIndex = 0;
      state.viewingTrailerIndex = 0;
      render();
    });
  });
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
}

function startAddToSave(kind) {
  const record = state.store.records.find((r) => r.id === state.viewingRecordId);
  if (!record) return;
  if (kind === "trailer" && record.trailers.length >= 5) return;
  state.updatingRecordId = record.id;
  state.showErrors = false;
  state.errorMessage = "";
  state.form = {
    date: record.date,
    startTime: record.startTime,
    units: JSON.parse(JSON.stringify(record.units)),
    trailers: JSON.parse(JSON.stringify(record.trailers))
  };
  if (kind === "unit") {
    const extra = { id: uid(), reg: "", categories: emptyChecks(UNIT_CATEGORIES) };
    state.form.units.push(extra);
    state.addingKind = "unit";
    state.addingId = extra.id;
  } else {
    const extra = { id: uid(), number: "", categories: emptyChecks(TRAILER_CATEGORIES) };
    state.form.trailers.push(extra);
    state.addingKind = "trailer";
    state.addingId = extra.id;
  }
  state.screen = "checks";
  render();
  const focus = kind === "unit"
    ? document.querySelector(`[data-unit-reg="${state.addingId}"]`)
    : document.querySelector(`[data-trailer-number="${state.addingId}"]`);
  if (focus) {
    focus.scrollIntoView({ behavior: "smooth", block: "center" });
    focus.focus();
  }
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
  return `<p class="install-hint"><strong>iPhone:</strong> Safari → Share → Add to Home Screen.<br><strong>Android:</strong> Chrome → menu (⋮) → Add to Home screen / Install app.</p>`;
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

  const down = (e) => {
    if (e.target.closest("input, textarea, select, button, summary, details, .file-btn, .action-bar, .btn-problem, .btn-delete-save")) return;
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
    if (!window.__dyscDragging && !dragged) return;
    e.preventDefault();
    e.stopPropagation();
  }, true);
}

enableDragScroll();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
render();
