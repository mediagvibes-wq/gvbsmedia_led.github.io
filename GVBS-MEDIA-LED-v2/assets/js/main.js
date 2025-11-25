// main.js — калькулятор, форма и отзывы

document.addEventListener("DOMContentLoaded", () => {
  initCalculator();
  initForm();
  renderReviews();
});

function initCalculator() {
  const distInput = document.getElementById("viewDist");
  const widthInput = document.getElementById("widthIn");
  const heightInput = document.getElementById("heightIn");
  const distValEl = document.getElementById("distVal");
  const modelEl = document.getElementById("recModel");
  const priceEl = document.getElementById("totalPrice");

  if (!distInput || !widthInput || !heightInput) return;

  function safeNumber(value, fallback) {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) return fallback;
    return num;
  }

  function calculate() {
    const dist = safeNumber(distInput.value, 10);
    let w = safeNumber(widthInput.value, 3);
    let h = safeNumber(heightInput.value, 2);

    distValEl.textContent = dist.toString();

    let model = "OUTDOOR P10";
    let pricePerSqm = 60000;

    if (dist <= 3) {
      model = "INDOOR P1.8 / P2";
      pricePerSqm = 145000;
    } else if (dist <= 6) {
      model = "OUTDOOR P4 / P5";
      pricePerSqm = 95000;
    } else if (dist <= 10) {
      model = "OUTDOOR P6 / P8";
      pricePerSqm = 75000;
    }

    const total = Math.round(w * h * pricePerSqm);

    modelEl.textContent = model;
    priceEl.textContent = `${total.toLocaleString("ru-RU")} ₽`;
  }

  [distInput, widthInput, heightInput].forEach((input) => {
    input.addEventListener("input", calculate);
    input.addEventListener("blur", calculate);
  });

  calculate();
}

function initForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (form.name?.value || "").trim();
    const phone = (form.phone?.value || "").trim();
    const message = (form.message?.value || "").trim();

    if (!name || !phone) {
      alert("Пожалуйста, заполните имя и телефон.");
      return;
    }

    const widthInput = document.getElementById("widthIn");
    const heightInput = document.getElementById("heightIn");
    const distInput = document.getElementById("viewDist");
    const modelEl = document.getElementById("recModel");
    const priceEl = document.getElementById("totalPrice");

    const w = widthInput ? widthInput.value : "";
    const h = heightInput ? heightInput.value : "";
    const dist = distInput ? distInput.value : "";
    const model = modelEl ? modelEl.textContent : "";
    const price = priceEl ? priceEl.textContent : "";

    let text = "Заявка с сайта GVBS MEDIA\n";
    text += `Имя: ${name}\n`;
    text += `Телефон: ${phone}\n`;
    if (message) {
      text += `Комментарий: ${message}\n`;
    }

    if (w && h) {
      text += `\nПараметры экрана:\nРазмер: ${w} x ${h} м`;
      if (dist) text += `\nДистанция просмотра: ~${dist} м`;
      if (model) text += `\nРекомендуемая модель: ${model}`;
      if (price) text += `\nОриентировочный бюджет: ${price}`;
    }

    const url = `https://t.me/GVBS_MEDIA?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    form.reset();
  });
}

async function renderReviews() {
  const container = document.getElementById("reviews");
  if (!container) return;

  try {
    const response = await fetch("data/reviews.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const reviews = await response.json();
    if (!Array.isArray(reviews) || reviews.length === 0) throw new Error("empty");

    container.innerHTML = "";

    reviews.forEach((item) => {
      const div = document.createElement("div");
      div.className = "review";

      const name = item.name || "Клиент";
      const text = item.text || "";

      div.innerHTML = `<strong>${name}</strong>${text ? "<br>" + text : ""}`;
      container.appendChild(div);
    });
  } catch (e) {
    console.warn("Не удалось загрузить отзывы", e);
    container.innerHTML = "";
    const fallback = document.createElement("div");
    fallback.className = "review";
    fallback.innerHTML =
      "<strong>Кейсы и отзывы</strong><br>Подборку реализованных проектов и детальных отзывов отправим по запросу — оставьте заявку или напишите в Telegram.";
    container.appendChild(fallback);
  }
}
