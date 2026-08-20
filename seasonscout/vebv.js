/* ============================================================
   SeasonScout — front-end prototype logic
   (all data below is mocked for demo purposes)
   ============================================================ */

const MONTHS = [
  { name:"January",  season:"Winter",  note:"Clear skies, cold north. Great for deserts & hill stations.", pool:["Udaipur","Rishikesh","Jaisalmer","Hampi","Coorg"] },
  { name:"February", season:"Winter",  note:"Pleasant everywhere. Peak season, book stays early.",         pool:["Udaipur","Coorg","Hampi","Rishikesh","Jaisalmer"] },
  { name:"March",    season:"Spring",  note:"Warming up in the plains, still cool in the hills.",           pool:["Coorg","Munnar","Rishikesh","Hampi","Udaipur"] },
  { name:"April",    season:"Summer",  note:"Hills only — plains get harsh. Road conditions still good.",   pool:["Manali","Munnar","Coorg","Ooty","Rishikesh"] },
  { name:"May",      season:"Summer",  note:"Peak heat in the plains. Stick to altitude.",                  pool:["Manali","Munnar","Ooty","Coorg","Rishikesh"] },
  { name:"June",     season:"Pre-monsoon", note:"Monsoon arriving on the coast — landslide risk rising.",   pool:["Ooty","Manali","Coorg","Munnar","Wayanad"] },
  { name:"July",     season:"Monsoon", note:"Heavy rainfall, some hill roads closed. Waterfalls at their best.", pool:["Munnar","Coorg","Wayanad","Ooty","Manali"] },
  { name:"August",   season:"Monsoon", note:"Lush and green, but check road/landslide alerts before riding.", pool:["Wayanad","Coorg","Munnar","Ooty","Manali"] },
  { name:"September",season:"Post-monsoon", note:"Rain easing, waterfalls still full, crowds still low.",   pool:["Wayanad","Coorg","Udaipur","Munnar","Hampi"] },
  { name:"October",  season:"Autumn", note:"Ideal all-round month — clear roads, moderate heat.",           pool:["Udaipur","Rishikesh","Hampi","Jaisalmer","Coorg"] },
  { name:"November", season:"Autumn", note:"Best visibility of the year in the hills and deserts.",         pool:["Jaisalmer","Hampi","Udaipur","Rishikesh","Coorg"] },
  { name:"December", season:"Winter", note:"Cold in the north, festive everywhere. Book early.",            pool:["Udaipur","Rishikesh","Coorg","Jaisalmer","Hampi"] },
];

const SEASON_COLOR = {
  "Winter":"#5C8A6C", "Spring":"#E8A33D", "Summer":"#C1502E",
  "Pre-monsoon":"#C1502E", "Monsoon":"#16504F", "Post-monsoon":"#5C8A6C", "Autumn":"#E8A33D"
};

const DESTINATIONS = {
  "Udaipur":   { perDay: 1150, emoji:"🏰", color:"#E8A33D", km: 660  },
  "Rishikesh": { perDay: 1080, emoji:"🏞️", color:"#5C8A6C", km: 240  },
  "Jaisalmer": { perDay: 1300, emoji:"🐪", color:"#E8A33D", km: 780  },
  "Coorg":     { perDay: 1480, emoji:"🌿", color:"#5C8A6C", km: 2180 },
  "Hampi":     { perDay: 1000, emoji:"🏛️", color:"#E8A33D", km: 1500 },
  "Manali":    { perDay: 1350, emoji:"🏔️", color:"#16504F", km: 540  },
  "Munnar":    { perDay: 1420, emoji:"🍃", color:"#5C8A6C", km: 2700 },
  "Ooty":      { perDay: 1250, emoji:"🌫️", color:"#16504F", km: 2450 },
  "Wayanad":   { perDay: 1140, emoji:"🌧️", color:"#16504F", km: 2350 },
};

/* ---------- Populate month select ---------- */
const monthSelect = document.getElementById("month");
const now = new Date();
MONTHS.forEach((m, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = m.name;
  if (i === now.getMonth()) opt.selected = true;
  monthSelect.appendChild(opt);
});

/* ---------- Ticket: Find my trip ---------- */
const findBtn = document.getElementById("findTrip");
const resultBox = document.getElementById("result");

function punch(el){
  el.classList.remove("impact");
  void el.offsetWidth; // restart animation
  el.classList.add("impact");
}

function flashPage(){
  const flash = document.createElement("div");
  flash.className = "page-flash";
  document.body.appendChild(flash);
  flash.addEventListener("animationend", () => flash.remove());
}

findBtn.addEventListener("click", () => {
  punch(findBtn);
  flashPage();
  const budget = Number(document.getElementById("budget").value) || 0;
  const days = Number(document.getElementById("days").value) || 1;
  const people = Number(document.getElementById("people").value) || 1;
  const monthData = MONTHS[Number(monthSelect.value)];

  const perPersonBudget = budget / people;

  const scored = monthData.pool.slice(0, 3).map(name => {
    const perDay = DESTINATIONS[name].perDay;
    const estTotal = perDay * days;
    return { name, estTotal, fits: estTotal <= perPersonBudget };
  });

  resultBox.innerHTML = "";
  scored.forEach(d => {
    const row = document.createElement("div");
    row.className = "dest";
    row.innerHTML = `
      <strong>${d.name}</strong>
      <span>${d.fits ? "fits" : "over"} · ~₹${d.estTotal.toLocaleString("en-IN")}/person</span>
    `;
    resultBox.appendChild(row);
  });

  const hint = document.createElement("div");
  hint.className = "hint";
  const anyFit = scored.some(d => d.fits);
  hint.textContent = anyFit
    ? `Best match for ${monthData.name.toLowerCase()}, ₹${perPersonBudget.toLocaleString("en-IN")}/person.`
    : `Tight for ${monthData.name.toLowerCase()} — try +${days} days fewer or raise budget.`;
  resultBox.appendChild(hint);
});

/* ---------- Suggested destinations: 3D flip cards ---------- */
const suggestGrid = document.getElementById("suggestGrid");
let currentPicks = [];

function shuffleArray(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickThree(pool, exclude){
  let available = shuffleArray(pool.filter(n => !exclude.includes(n)));
  if (available.length < 3) available = shuffleArray(pool);
  return available.slice(0, 3);
}

function buildSuggestCards(names){
  const days = Number(document.getElementById("days").value) || 1;
  const people = Number(document.getElementById("people").value) || 1;
  const budget = Number(document.getElementById("budget").value) || 0;
  const perPersonBudget = budget / people;

  suggestGrid.innerHTML = "";
  names.forEach(name => {
    const info = DESTINATIONS[name];
    const total = info.perDay * days;
    const perPerson = Math.round(total);
    const fits = perPerson <= perPersonBudget;

    const card = document.createElement("div");
    card.className = "suggest-card";
    card.innerHTML = `
      <div class="suggest-card-inner">
        <div class="suggest-face suggest-front" style="--face-color:${info.color}">
          <span class="badge ${fits ? "fits" : "over"}">${fits ? "Fits your budget" : "Over budget"}</span>
          <span class="suggest-emoji">${info.emoji}</span>
          <h3>${name}</h3>
        </div>
        <div class="suggest-face suggest-back">
          <div class="line"><span>Per day</span><strong>₹${info.perDay.toLocaleString("en-IN")}</strong></div>
          <div class="line"><span>${days} day${days > 1 ? "s" : ""} × 1 person</span><strong>₹${perPerson.toLocaleString("en-IN")}</strong></div>
          <div class="line"><span>Your budget / person</span><strong>₹${Math.round(perPersonBudget).toLocaleString("en-IN")}</strong></div>
          <div class="total"><span>${name}</span><span>${fits ? "✓ fits" : "⚠ over"}</span></div>
        </div>
      </div>
    `;
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    suggestGrid.appendChild(card);
  });

  currentPicks = names;
  populateRidePicker(names);
  renderRoutes(names);
}

/* ---------- Route view: 3D animated "map" for each pick ---------- */
const routeGrid = document.getElementById("routeGrid");
const routeHeading = document.getElementById("routeHeading");

function renderRoutes(names){
  const fromCity = document.getElementById("from").value.trim() || "Delhi";
  routeHeading.textContent = `The route — ${fromCity} to each pick`;

  routeGrid.innerHTML = "";
  names.forEach(name => {
    const info = DESTINATIONS[name];
    const card = document.createElement("div");
    card.className = "route-card";
    card.innerHTML = `
      <div class="route-stage">
        <div class="route-floor"></div>
        <svg class="route-svg" viewBox="0 0 240 150">
          <path class="route-path" d="M 30 110 Q 120 20 210 90" />
          <circle class="route-dot" cx="30" cy="110" r="5"/>
          <circle class="route-dot dest" cx="210" cy="90" r="5"/>
          <text x="30" y="130" class="route-mono-label">${fromCity}</text>
          <text x="210" y="70" class="route-mono-label" text-anchor="end">${name}</text>
          <text class="route-mover" text-anchor="middle" dy="4">✈️
            <animateMotion dur="2.4s" repeatCount="indefinite"
              path="M 30 110 Q 120 20 210 90" rotate="auto"/>
          </text>
        </svg>
      </div>
      <div class="route-info">
        <div class="route-info-top"><span>${fromCity}</span><span>→ ${name}</span></div>
        <div class="route-km">~${info.km.toLocaleString("en-IN")} km by road</div>
      </div>
    `;
    routeGrid.appendChild(card);
  });
}

function renderSuggestions(){
  const fromCity = document.getElementById("from").value.trim() || "Delhi";
  const monthData = MONTHS[Number(monthSelect.value)];
  document.getElementById("fromCityLabel").textContent = fromCity;

  const picks = pickThree(monthData.pool, []);
  buildSuggestCards(picks);
}

/* ---------- Shuffle: swap in a new 3, same season, with a 3D flip ---------- */
const shuffleBtn = document.getElementById("shuffleBtn");

function doShuffle(){
  const monthData = MONTHS[Number(monthSelect.value)];
  const nextPicks = pickThree(monthData.pool, currentPicks);

  shuffleBtn.querySelector(".shuffle-icon").classList.add("spin");
  suggestGrid.classList.add("shuffling");

  setTimeout(() => {
    buildSuggestCards(nextPicks);
    requestAnimationFrame(() => suggestGrid.classList.remove("shuffling"));
  }, 380);

  setTimeout(() => shuffleBtn.querySelector(".shuffle-icon").classList.remove("spin"), 650);
}

shuffleBtn.addEventListener("click", () => {
  punch(shuffleBtn);
  restartAutoSlide();
  doShuffle();
});

/* ---------- Auto-slide: shuffle picks every 5s, pause while browsing ---------- */
let autoSlideTimer = null;
function startAutoSlide(){
  autoSlideTimer = setInterval(doShuffle, 5000);
}
function restartAutoSlide(){
  clearInterval(autoSlideTimer);
  startAutoSlide();
}
suggestGrid.addEventListener("mouseenter", () => clearInterval(autoSlideTimer));
suggestGrid.addEventListener("mouseleave", () => restartAutoSlide());

findBtn.addEventListener("click", renderSuggestions);
["budget","days","people","from"].forEach(id => {
  document.getElementById(id).addEventListener("change", renderSuggestions);
});
monthSelect.addEventListener("change", renderSuggestions);

/* ---------- 3D tilt-on-mouse for cards ---------- */
document.querySelectorAll(".tilt-card").forEach(card => {
  const maxTilt = card.classList.contains("feature-card") ? 8 : 10;
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0..1
    const py = (e.clientY - rect.top) / rect.height;    // 0..1
    const ry = (px - 0.5) * maxTilt * 2;
    const rx = (0.5 - py) * maxTilt * 2;
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.style.setProperty("--tz", `12px`);
  });
  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
    card.style.setProperty("--tz", `0px`);
  });
});

/* ---------- Season Dial (SVG) ---------- */
const svg = document.getElementById("seasonDial");
const NS = "http://www.w3.org/2000/svg";
const CX = 260, CY = 260, R = 190, ARC_R = 190;
const readout = document.getElementById("dialReadout");

function polar(cx, cy, r, angleDeg){
  const a = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(cx, cy, r, startDeg, endDeg){
  const start = polar(cx, cy, r, endDeg);
  const end = polar(cx, cy, r, startDeg);
  const largeArc = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

/* hub */
const hub = document.createElementNS(NS, "circle");
hub.setAttribute("cx", CX); hub.setAttribute("cy", CY); hub.setAttribute("r", 92);
hub.setAttribute("class", "dial-hub");
svg.appendChild(hub);

const hubText = document.createElementNS(NS, "text");
hubText.setAttribute("x", CX); hubText.setAttribute("y", CY + 6);
hubText.setAttribute("text-anchor", "middle");
hubText.setAttribute("class", "dial-hub-text");
hubText.textContent = "12 seasons";
svg.appendChild(hubText);

MONTHS.forEach((m, i) => {
  const start = i * 30 + 2;
  const end = i * 30 + 28;
  const arc = document.createElementNS(NS, "path");
  arc.setAttribute("d", arcPath(CX, CY, ARC_R, start, end));
  arc.setAttribute("class", "dial-arc");
  arc.setAttribute("stroke", SEASON_COLOR[m.season] || "#5C8A6C");
  arc.setAttribute("opacity", "0.55");
  arc.dataset.index = i;
  svg.appendChild(arc);

  const labelPos = polar(CX, CY, ARC_R + 32, i * 30 + 15);
  const label = document.createElementNS(NS, "text");
  label.setAttribute("x", labelPos.x);
  label.setAttribute("y", labelPos.y);
  label.setAttribute("text-anchor", "middle");
  label.setAttribute("class", "dial-month-label");
  label.textContent = m.name.slice(0,3).toUpperCase();
  label.dataset.index = i;
  svg.appendChild(label);

  function activate(){
    svg.querySelectorAll(".dial-arc").forEach(a => a.setAttribute("opacity", "0.35"));
    svg.querySelectorAll(".dial-month-label").forEach(l => l.classList.remove("active"));
    arc.setAttribute("opacity", "1");
    label.classList.add("active");
    readout.querySelector(".dial-month").textContent = `${m.name.toUpperCase()} · ${m.season.toUpperCase()}`;
    readout.querySelector(".dial-desc").textContent = `${m.note} Top picks: ${m.pool.slice(0,3).join(", ")}.`;
  }

  arc.addEventListener("mouseenter", activate);
  label.addEventListener("mouseenter", activate);
  label.addEventListener("click", activate);
});

/* show current month by default */
(function initDial(){
  const idx = now.getMonth();
  svg.querySelectorAll(`[data-index="${idx}"]`).forEach(el => el.dispatchEvent(new Event("mouseenter")));
})();

/* ---------- Budget receipt slider ---------- */
const FIXED_TRIP_COST = 7400; // base receipt total from the sample itinerary
const slider = document.getElementById("budgetSlider");
const sliderValue = document.getElementById("budgetSliderValue");
const verdict = document.getElementById("receiptVerdict");

function updateVerdict(){
  const budget = Number(slider.value);
  sliderValue.textContent = `₹${budget.toLocaleString("en-IN")}`;
  verdict.classList.add("show");
  if (budget >= FIXED_TRIP_COST){
    verdict.className = "receipt-verdict show ok";
    verdict.textContent = `✓ Covers this trip, with ₹${(budget - FIXED_TRIP_COST).toLocaleString("en-IN")} to spare.`;
  } else {
    const short = FIXED_TRIP_COST - budget;
    verdict.className = "receipt-verdict show warn";
    verdict.textContent = `⚠ Short by ₹${short.toLocaleString("en-IN")}. Try Wayanad (₹5,700) or Rishikesh (₹5,400) instead.`;
  }
}
slider.addEventListener("input", updateVerdict);
updateVerdict();

/* ---------- Logo: click to jump to top ---------- */
document.querySelectorAll(".logo3d").forEach(logo => {
  logo.style.cursor = "pointer";
  logo.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});

/* ============================================================
   STAY MARKETPLACE
   ============================================================ */
const STAYS = [
  { name:"Riverside Homestay", type:"Homestay", emoji:"🏡", destination:"Wayanad", price:900,  rating:4.6, freeCancel:true,  nearGems:true  },
  { name:"Backpackers Nest",   type:"Hostel",   emoji:"🛏️", destination:"Hampi",   price:550,  rating:4.3, freeCancel:true,  nearGems:false },
  { name:"Misty Hill Camp",    type:"Camp",     emoji:"⛺",  destination:"Munnar",  price:750,  rating:4.5, freeCancel:false, nearGems:true  },
  { name:"Heritage Haveli",    type:"Hotel",    emoji:"🏨",  destination:"Udaipur", price:1400, rating:4.7, freeCancel:true,  nearGems:true  },
  { name:"Lakeview Cottage",   type:"Homestay", emoji:"🏡",  destination:"Coorg",   price:1100, rating:4.4, freeCancel:false, nearGems:true  },
  { name:"Desert Bunk Stay",   type:"Hostel",   emoji:"🛏️", destination:"Jaisalmer", price:480, rating:4.1, freeCancel:true,  nearGems:false },
];

const stayGrid = document.getElementById("stayGrid");
const activeStayFilters = new Set();

function renderStays(){
  stayGrid.innerHTML = "";
  const filtered = STAYS.filter(s => {
    if (activeStayFilters.has("budget") && (s.price < 500 || s.price > 1500)) return false;
    if (activeStayFilters.has("rating") && s.rating < 4) return false;
    if (activeStayFilters.has("gems") && !s.nearGems) return false;
    if (activeStayFilters.has("cancel") && !s.freeCancel) return false;
    return true;
  });

  if (!filtered.length){
    stayGrid.innerHTML = `<p class="hero-sub center-sub">No stays match every filter — try removing one.</p>`;
    return;
  }

  filtered.forEach(s => {
    const card = document.createElement("div");
    card.className = "stay-card";
    card.innerHTML = `
      <div class="stay-card-media">${s.emoji}</div>
      <div class="stay-card-body">
        <div class="stay-card-top"><h3>${s.name}</h3><span class="rating">★ ${s.rating}</span></div>
        <div class="stay-card-loc">${s.type} · near ${s.destination}</div>
        <div class="stay-card-badges">
          ${s.freeCancel ? "<span>Free cancellation</span>" : ""}
          ${s.nearGems ? "<span>Near hidden gems</span>" : ""}
        </div>
        <div class="stay-card-foot">
          <span class="stay-price mono">₹${s.price}<small>/night</small></span>
          <button class="book-btn">Book</button>
        </div>
      </div>
    `;
    card.querySelector(".book-btn").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      punch(btn);
      const booked = btn.classList.toggle("booked");
      btn.textContent = booked ? "Booked ✓" : "Book";
    });
    stayGrid.appendChild(card);
  });
}

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const key = chip.dataset.filter;
    chip.classList.toggle("active");
    if (activeStayFilters.has(key)) activeStayFilters.delete(key);
    else activeStayFilters.add(key);
    renderStays();
  });
});

renderStays();

/* ============================================================
   RIDE RENTAL
   ============================================================ */
const RIDE_TYPES = [
  { name:"Scooty (Activa)",   emoji:"🛵", price:500,  deposit:1000 },
  { name:"Bike (Royal Enfield)", emoji:"🏍️", price:1200, deposit:3000 },
  { name:"Car (Hatchback)",   emoji:"🚗", price:1800, deposit:4000 },
  { name:"EV Scooter",        emoji:"⚡", price:450,  deposit:1000 },
];

const ridePicker = document.getElementById("ridePlace");
const rideGrid = document.getElementById("rideGrid");

function populateRidePicker(destinations){
  const current = ridePicker.value;
  ridePicker.innerHTML = "";
  destinations.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name; opt.textContent = name;
    ridePicker.appendChild(opt);
  });
  if (destinations.includes(current)) ridePicker.value = current;
  renderRides();
}

function renderRides(){
  const place = ridePicker.value || "your destination";
  rideGrid.innerHTML = "";
  RIDE_TYPES.forEach(r => {
    const card = document.createElement("div");
    card.className = "ride-card";
    card.innerHTML = `
      <div class="ride-emoji">${r.emoji}</div>
      <h3>${r.name}</h3>
      <div class="ride-price mono">₹${r.price}/day</div>
      <div class="ride-meta">Deposit ₹${r.deposit} · Pickup: ${place} Bus Stand</div>
      <button class="rent-btn">Rent now</button>
    `;
    card.querySelector(".rent-btn").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      punch(btn);
      const reserved = btn.classList.toggle("reserved");
      btn.textContent = reserved ? "Reserved ✓" : "Rent now";
    });
    rideGrid.appendChild(card);
  });
}

ridePicker.addEventListener("change", renderRides);

/* ============================================================
   PARENTS MODE
   ============================================================ */
const parentsToggle = document.getElementById("parentsToggle");
const toggleStatus = document.getElementById("toggleStatus");

parentsToggle.addEventListener("change", () => {
  toggleStatus.textContent = parentsToggle.checked
    ? "On · last shared just now"
    : "Off · your parents won't see live location";
});

const contactForm = document.getElementById("contactForm");
const contactsList = document.getElementById("contactsList");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("contactName");
  const name = input.value.trim();
  if (!name) return;
  const li = document.createElement("li");
  li.innerHTML = `${name} <span class="mono">Added</span>`;
  contactsList.appendChild(li);
  input.value = "";
});

/* ============================================================
   SOS — press and hold to send
   ============================================================ */
const sosBtn = document.getElementById("sosBtn");
const sosRingFg = document.getElementById("sosRingFg");
const sosLabel = document.getElementById("sosLabel");
const sosHint = document.getElementById("sosHint");
const RING_LENGTH = 339;
const HOLD_MS = 3000;
let holdStart = null, holdRaf = null, sosSent = false;

function resetSos(){
  cancelAnimationFrame(holdRaf);
  holdStart = null;
  sosBtn.classList.remove("sending");
  if (!sosSent){
    sosRingFg.style.strokeDashoffset = RING_LENGTH;
    sosLabel.textContent = "HOLD FOR SOS";
  }
}

function tickHold(ts){
  if (!holdStart) holdStart = ts;
  const elapsed = ts - holdStart;
  const progress = Math.min(elapsed / HOLD_MS, 1);
  sosRingFg.style.strokeDashoffset = RING_LENGTH * (1 - progress);
  if (progress >= 1){
    sosSent = true;
    sosBtn.classList.remove("sending");
    sosBtn.classList.add("sent");
    sosLabel.textContent = "SOS SENT";
    sosHint.textContent = "Your live location and trip details were sent to your emergency contacts. Tap to reset.";
    return;
  }
  holdRaf = requestAnimationFrame(tickHold);
}

function startHold(){
  if (sosSent) return;
  sosBtn.classList.add("sending");
  holdStart = null;
  holdRaf = requestAnimationFrame(tickHold);
}

sosBtn.addEventListener("pointerdown", startHold);
sosBtn.addEventListener("pointerup", () => { if (!sosSent) resetSos(); });
sosBtn.addEventListener("pointerleave", () => { if (!sosSent) resetSos(); });
sosBtn.addEventListener("click", () => {
  if (sosSent){
    sosSent = false;
    sosBtn.classList.remove("sent");
    sosLabel.textContent = "HOLD FOR SOS";
    sosHint.textContent = "Press and hold 3 seconds to alert your emergency contacts with live location.";
    sosRingFg.style.strokeDashoffset = RING_LENGTH;
  }
});

/* ---------- Run everything once now that all sections are wired ---------- */
findBtn.click();
startAutoSlide();