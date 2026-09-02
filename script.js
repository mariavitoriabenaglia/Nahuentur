const TIERS = ["0", "5", "10", "15", "promo"];
const INTERESTS = ["Montanha/neve", "Vinícolas", "Cidade/cultura", "Litoral", "Atacama", "Ainda não definiu"];
const PACKAGES = [
  { name: "Montanha + vinho + cidade", detail: "Andes Panorâmico · Undurraga · City Tour", tours: ["andes-panoramico", "undurraga", "walking-tour"] },
  { name: "Montanha + vinho + litoral", detail: "Andes Panorâmico · Concha y Toro · Viña del Mar", tours: ["andes-panoramico", "concha-y-toro-premium", "vina-valparaiso"] },
  { name: "Chile completo em 4 dias", detail: "Andes Panorâmico · Portillo · Undurraga · Viña del Mar", tours: ["andes-panoramico", "portillo-laguna-del-inca", "undurraga", "vina-valparaiso"] },
  { name: "Cordilheira + litoral + cidade", detail: "Portillo · Viña del Mar · City Tour", tours: ["portillo-laguna-del-inca", "vina-valparaiso", "walking-tour"] },
];

const DIRECT_DESCRIPTIONS = {
  "walking-tour": "Caminhada pelos principais pontos históricos e culturais de Santiago.",
  "turistik-hop-on-hop-off": "Conheça os principais pontos de Santiago com ônibus turístico, teleférico, funicular e áudio-guia.",
  farellones: "Dia de neve no Parque Farellones, com tempo livre para aproveitar suas atividades e paisagens.",
  "valle-nevado": "Dia de neve no Valle Nevado, um dos centros de esqui mais conhecidos da Cordilheira dos Andes.",
  "el-colorado": "Dia de neve em El Colorado, com tempo livre para aproveitar a estação e suas paisagens.",
  "andes-panoramico": "Conheça Farellones, El Colorado e Valle Nevado, com paradas panorâmicas para fotos, sem entrar nos parques.",
  "portillo-laguna-del-inca": "Conheça a Cordilheira, a estrada Los Caracoles e a Laguna del Inca, com picnic em meio às paisagens.",
  "vina-valparaiso": "Conheça os principais pontos de Valparaíso e Viña del Mar, combinando cultura, litoral e paisagens do Pacífico.",
  "isla-negra-algarrobo-undurraga": "Combine vinícola e litoral em um dia, passando por Undurraga, Algarrobo e Isla Negra.",
  undurraga: "Conheça uma das vinícolas mais tradicionais do Chile, com visita aos vinhedos, degustação e taça de presente.",
  "santa-rita": "Visite os jardins, vinhedos e adegas históricas da Santa Rita, com degustação e taça de presente.",
  "concha-y-toro-premium": "Conheça a Concha y Toro e a história do Casillero del Diablo, com visita guiada e degustação de vinhos.",
  "concha-y-toro-marques": "Experiência especial na Concha y Toro com vinhos da linha Marques, queijos e acompanhamento de enólogo.",
  "concha-y-toro-centro-del-vino": "Visita completa ao Centro del Vino da Concha y Toro, com adegas, jardins e degustação.",
  "concha-y-toro-noturno": "Conheça a Concha y Toro iluminada à noite, com degustação, lenda do Casillero del Diablo e jantar.",
  "alyan-sunset": "Experiência ao pôr do sol entre vinhedos, com degustação, queijos, jantar e acompanhamento de enólogo.",
  "monteluz-sunset": "Experiência ao pôr do sol na Monteluz, com vinhos, petiscos gourmet e festa com DJ.",
  "parque-safari": "Passeio pelo Parque Safari com diferentes experiências de contato e observação dos animais.",
  "zerando-sunset": "Experiência de fim de tarde com paisagens da Cordilheira e uma programação especial ao pôr do sol.",
  "infinitum-3k": "Experiência de altitude na Cordilheira dos Andes, com paisagens panorâmicas a cerca de 3.000 metros.",
  "moto-de-neve": "Experiência de moto de neve na Cordilheira, com percurso acompanhado e paisagens incríveis.",
  "tour-astronomico": "Observe o céu do Atacama em uma experiência guiada com explicações e telescópios.",
  "valle-de-la-luna": "Conheça as formações e paisagens do Valle de la Luna, um dos cenários mais famosos do Atacama.",
  "geyser-del-tatio": "Visite o campo geotérmico El Tatio ao amanhecer e conheça um dos principais atrativos do Atacama.",
  "piedras-rojas": "Conheça Piedras Rojas, as lagoas altiplânicas e paisagens de grande altitude no Atacama.",
  "valle-del-arcoiris": "Conheça as formações coloridas do Valle del Arcoíris e a história dos povos do deserto.",
  baltinache: "Visite as Lagunas Escondidas de Baltinache e experimente a flutuação em águas de alta salinidade.",
  "vallecito-magic-bus": "Conheça as paisagens de Vallecito e o famoso Magic Bus em meio ao deserto do Atacama.",
  "laguna-cejar": "Visite a Laguna Cejar e outros cenários de sal do Atacama, com experiência de flutuação.",
  "ruta-de-los-salares": "Percorra salares, lagoas e paisagens de altitude em uma rota completa pelo Atacama.",
  "termas-puritama": "Relaxe nas águas termais de Puritama, cercadas pelas paisagens naturais do Atacama.",
  "termas-purilibre": "Aproveite piscinas termais naturais em um ambiente tranquilo no meio do deserto.",
  "volcan-lascar": "Subida ao Vulcão Lascar para uma experiência de alta montanha no Atacama.",
};

const state = {
  destination: "Todos",
  search: "",
  customerName: "",
  travelDate: "",
  noDate: false,
  people: 0,
  interests: [],
  messageStyle: null,
  tier: "10",
  selectedIds: [],
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const selectedTours = () => state.selectedIds.map((id) => window.TOURS.find((tour) => tour.id === id)).filter(Boolean);

function money(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function punctuate(items) {
  return `${items.join(", ").replace(/[.!?]+$/, "")}.`;
}

function firstEmoji(emoji) {
  return emoji.match(/\p{Extended_Pictographic}/u)?.[0] || "🇨🇱";
}

function peopleTotalLabel(people) {
  if (people === 1) return "Total individual";
  if (people === 2) return "Total para o casal";
  return `Total para ${people} pessoas`;
}

function qualificationState() {
  return {
    hasDate: Boolean(state.travelDate.trim()) || state.noDate,
    hasPeople: state.people > 0,
    hasInterests: state.interests.length > 0,
    hasStyle: state.messageStyle !== null,
  };
}

function qualificationComplete() {
  return Object.values(qualificationState()).every(Boolean);
}

function buildQualificationMessage() {
  const { hasDate, hasPeople, hasInterests, hasStyle } = qualificationState();
  const questions = [];
  if (!hasDate) questions.push("📅 Qual é a data da viagem?");
  if (!hasPeople) questions.push("👥 Quantas pessoas vão viajar?");
  if (!hasInterests) questions.push("🏔️ O que vocês querem conhecer: montanha/neve, vinícola, cidade, litoral ou Atacama?");
  if (!hasStyle) questions.push("💬 Você prefere receber um orçamento objetivo, com valores e o que inclui, ou um orçamento mais detalhado?");
  return ["Oii! 😊 Para eu preparar as melhores opções para a viagem de vocês, preciso confirmar só algumas informações:", "", ...questions].join("\n");
}

function buildQuote() {
  const tours = selectedTours();
  if (!tours.length) return "";
  const people = state.people;
  const total = tours.reduce((sum, tour) => sum + (tour.prices[state.tier] ?? tour.prices["0"] ?? 0) * people, 0);
  const greeting = state.customerName.trim() ? `Oii, ${state.customerName.trim()}! 😊` : "Oii! 😊";
  const intro = state.messageStyle === "direct"
    ? tours.length === 1 ? "" : `${greeting} Separei um orçamento para ${tours.length} dias de passeio:`
    : tours.length === 1
      ? `${greeting} Separei o orçamento do passeio que vocês escolheram 🇨🇱`
      : `${greeting} Separei um orçamento para ${tours.length} dias de passeio, com experiências diferentes para vocês aproveitarem bastante o Chile 🇨🇱`;

  const blocks = tours.map((tour, index) => {
    const normalPrice = tour.prices["0"] || 0;
    const selectedPrice = tour.prices[state.tier] ?? normalPrice;
    const dayTitle = tours.length === 1 ? tour.name.toUpperCase() : `${index + 1}º DIA — ${tour.name.toUpperCase()}`;
    const titleEmoji = state.messageStyle === "direct" ? firstEmoji(tour.emoji) : tour.emoji;
    const lines = [`${titleEmoji} *${dayTitle}*`, ""];

    if (state.messageStyle === "detailed") {
      lines.push(...tour.highlights.map((highlight) => `👉 ${highlight}`), "", `🕡 *Saída:* ${tour.departure}`, `⏱️ *Duração:* ${tour.duration}`, "");
    } else {
      lines.push(DIRECT_DESCRIPTIONS[tour.id] || punctuate(tour.highlights.slice(0, 2)), "");
    }

    lines.push(`✅ *Inclui:* ${punctuate(tour.included)}`);
    if (tour.excluded?.length) lines.push(`❌ *Não inclui:* ${punctuate(tour.excluded)}`);
    if (tour.note) lines.push(`⚠️ *Importante:* ${tour.note}`);
    lines.push("", `${state.messageStyle === "detailed" ? "💰 " : ""}Valor normal: *${money(normalPrice)} por pessoa*`);
    if (state.tier !== "0" && tour.prices[state.tier] != null) {
      const condition = state.tier === "promo" ? "Promo especial" : "Condição especial";
      lines.push(`🔥 *${condition}: ${money(selectedPrice)} por pessoa*`);
    }
    lines.push("", `👥 *${peopleTotalLabel(people)}: ${money(selectedPrice * people)}*`);
    return lines.join("\n");
  });

  if (state.messageStyle === "direct" && tours.length === 1) return blocks[0];
  const result = [intro, intro ? "" : null, ...blocks.flatMap((block, index) => index ? ["", "—", "", block] : [block]), "", "—", "", `🔥 *TOTAL DO PACOTE: ${money(total)}*`, `👤 *${money(total / people)} por pessoa*`];
  return result.filter((line) => line !== null).join("\n");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { toast.hidden = true; }, 3000);
}

function renderQualification() {
  const complete = qualificationComplete();
  const status = $("#qualification-status");
  status.className = `qualification-status ${complete ? "complete" : "pending"}`;
  status.innerHTML = complete
    ? "<strong>✓ Lead pré-qualificado</strong><span>Agora escolha o orçamento pronto ou os passeios.</span>"
    : "<strong>Pré-qualificação pendente</strong><span>A prévia gera somente as perguntas que ainda faltam.</span>";
  $("#quote-builder").className = `quote-builder ${complete ? "ready" : "waiting"}`;

  $$("[data-style]").forEach((button) => button.classList.toggle("active", button.dataset.style === state.messageStyle));
  $$("#interest-options button").forEach((button) => button.classList.toggle("active", state.interests.includes(button.dataset.interest)));
  $("#no-date").classList.toggle("active", state.noDate);
  $("#no-date").textContent = `${state.noDate ? "✓" : "○"} Cliente ainda não definiu a data`;
  $("#travel-date").disabled = state.noDate;
}

function renderTours() {
  const term = state.search.trim().toLocaleLowerCase("pt-BR");
  const visible = window.TOURS.filter((tour) => (state.destination === "Todos" || tour.destination === state.destination) && (!term || `${tour.name} ${tour.highlights.join(" ")}`.toLocaleLowerCase("pt-BR").includes(term)));
  const picker = $("#tour-picker");
  picker.innerHTML = "";
  visible.forEach((tour) => {
    const selected = state.selectedIds.includes(tour.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tour-option ${selected ? "selected" : ""}`;
    button.setAttribute("aria-pressed", String(selected));
    button.innerHTML = `<span class="tour-option-emoji">${tour.emoji}</span><span><strong>${tour.name}</strong><small>${tour.destination} · a partir de ${money(tour.prices["0"] || 0)}</small></span><em>${selected ? "✓" : "+"}</em>`;
    button.addEventListener("click", () => toggleTour(tour));
    picker.appendChild(button);
  });

  $$("#destination-tabs button").forEach((button) => button.classList.toggle("active", button.dataset.destination === state.destination));
}

function renderDiscounts() {
  $$("#discount-options button").forEach((button) => button.classList.toggle("active", button.dataset.tier === state.tier));
  const normalOnly = state.tier === "0" ? [] : selectedTours().filter((tour) => tour.prices[state.tier] == null);
  const note = $("#mixed-price-note");
  note.hidden = normalOnly.length === 0;
  if (normalOnly.length) note.innerHTML = `<strong>Valor normal:</strong> ${normalOnly.map((tour) => tour.name).join(", ")}. O desconto continua aplicado aos demais passeios.`;
}

function renderItinerary() {
  const tours = selectedTours();
  const box = $("#selected-itinerary");
  box.hidden = tours.length === 0;
  if (!tours.length) return;
  box.innerHTML = `<div class="selected-itinerary-head"><strong>Ordem do roteiro</strong><small>${tours.length} ${tours.length === 1 ? "passeio" : "passeios"}</small></div>`;
  tours.forEach((tour, index) => {
    const row = document.createElement("div");
    row.className = "selected-tour-row";
    row.innerHTML = `<span>${index + 1}º</span><strong>${tour.name}</strong><div><button type="button" data-action="up" ${index === 0 ? "disabled" : ""}>↑</button><button type="button" data-action="down" ${index === tours.length - 1 ? "disabled" : ""}>↓</button><button type="button" data-action="remove">×</button></div>`;
    row.querySelector('[data-action="up"]').addEventListener("click", () => moveTour(index, -1));
    row.querySelector('[data-action="down"]').addEventListener("click", () => moveTour(index, 1));
    row.querySelector('[data-action="remove"]').addEventListener("click", () => toggleTour(tour));
    box.appendChild(row);
  });
}

function renderPreview() {
  const complete = qualificationComplete();
  const text = complete ? buildQuote() : buildQualificationMessage();
  $("#preview-eyebrow").textContent = complete ? `Prévia ${state.messageStyle === "direct" ? "objetiva" : "detalhada"}` : "Pré-qualificação";
  $("#preview-title").textContent = complete ? "Orçamento para o cliente" : "Perguntas que ainda faltam";
  $("#copy-label").textContent = complete ? "Copiar para o Kommo" : "Copiar perguntas de pré-qualificação";
  $("#quote-output").classList.toggle("qualification-output", !complete);
  $("#quote-output").textContent = text;
  $("#quote-output").hidden = !text;
  $("#quote-empty").hidden = Boolean(text);
}

function render() {
  renderQualification();
  renderTours();
  renderDiscounts();
  renderItinerary();
  renderPreview();
}

function toggleTour(tour) {
  if (state.selectedIds.includes(tour.id)) state.selectedIds = state.selectedIds.filter((id) => id !== tour.id);
  else {
    if (state.tier !== "0" && tour.prices[state.tier] == null) showToast(`${tour.name} ficará no valor normal; o desconto continua nos outros passeios.`);
    state.selectedIds.push(tour.id);
  }
  render();
}

function moveTour(index, direction) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= state.selectedIds.length) return;
  [state.selectedIds[index], state.selectedIds[nextIndex]] = [state.selectedIds[nextIndex], state.selectedIds[index]];
  render();
}

function initializeButtons() {
  INTERESTS.forEach((interest) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.interest = interest;
    button.textContent = interest;
    button.addEventListener("click", () => {
      if (state.interests.includes(interest)) state.interests = state.interests.filter((item) => item !== interest);
      else if (interest === "Ainda não definiu") state.interests = [interest];
      else state.interests = [...state.interests.filter((item) => item !== "Ainda não definiu"), interest];
      render();
    });
    $("#interest-options").appendChild(button);
  });

  ["Todos", "Santiago", "Atacama"].forEach((destination) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.destination = destination;
    button.textContent = destination;
    button.addEventListener("click", () => { state.destination = destination; render(); });
    $("#destination-tabs").appendChild(button);
  });

  PACKAGES.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<strong>${item.name}</strong><small>${item.detail}</small>`;
    button.addEventListener("click", () => {
      state.destination = "Santiago";
      state.selectedIds = [...item.tours];
      showToast("Orçamento de setembro aplicado. Você ainda pode alterar a ordem e os passeios.");
      render();
    });
    $("#package-presets").appendChild(button);
  });

  TIERS.forEach((tier) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.tier = tier;
    button.textContent = tier === "0" ? "0%" : tier === "promo" ? "PROMO" : `${tier}%`;
    button.addEventListener("click", () => {
      state.tier = tier;
      const normalOnly = tier === "0" ? [] : selectedTours().filter((tour) => tour.prices[tier] == null);
      if (normalOnly.length) showToast(`${normalOnly.map((tour) => tour.name).join(", ")} ficará no valor normal.`);
      render();
    });
    $("#discount-options").appendChild(button);
  });
}

function bindEvents() {
  $("#customer-name").addEventListener("input", (event) => { state.customerName = event.target.value; renderPreview(); });
  $("#travel-date").addEventListener("input", (event) => { state.travelDate = event.target.value; render(); });
  $("#no-date").addEventListener("click", () => { state.noDate = !state.noDate; state.travelDate = ""; $("#travel-date").value = ""; render(); });
  $("#people").addEventListener("input", (event) => { state.people = Math.min(50, Math.max(0, Number(event.target.value))); render(); });
  $("#people-minus").addEventListener("click", () => { state.people = Math.max(0, state.people - 1); $("#people").value = state.people || ""; render(); });
  $("#people-plus").addEventListener("click", () => { state.people = Math.min(50, state.people + 1); $("#people").value = state.people; render(); });
  $$("[data-style]").forEach((button) => button.addEventListener("click", () => { state.messageStyle = button.dataset.style; render(); }));
  $("#tour-search").addEventListener("input", (event) => { state.search = event.target.value; renderTours(); });
  $("#copy").addEventListener("click", async () => {
    const text = qualificationComplete() ? buildQuote() : buildQualificationMessage();
    if (qualificationComplete() && !text) return showToast("Selecione pelo menos um passeio.");
    try {
      await navigator.clipboard.writeText(text);
      showToast(qualificationComplete() ? "Orçamento copiado para colar no Kommo." : "Perguntas de pré-qualificação copiadas.");
    } catch {
      showToast("Não foi possível copiar automaticamente.");
    }
  });
  $("#reset").addEventListener("click", () => {
    Object.assign(state, { destination: "Todos", search: "", customerName: "", travelDate: "", noDate: false, people: 0, interests: [], messageStyle: null, tier: "10", selectedIds: [] });
    $("#customer-name").value = "";
    $("#travel-date").value = "";
    $("#people").value = "";
    $("#tour-search").value = "";
    showToast("Novo atendimento iniciado.");
    render();
  });
}

$("#tour-count").textContent = window.TOURS.length;
initializeButtons();
bindEvents();
render();
