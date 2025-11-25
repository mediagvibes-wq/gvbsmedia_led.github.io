// assets/js/i18n.js

const GVBS_I18N = {
  currentLang: "ru",
  translations: {
    ru: {
      nav_solutions: "Решения",
      nav_video: "Видео",
      nav_projects: "Проекты",
      nav_reviews: "Отзывы",
      nav_contact: "Контакты",

      hero_title: "Премиальные LED-экраны",
      hero_subtitle: "Производство, монтаж, гарантия по РФ и СНГ",
      hero_cta: "Получить предложение",

      solutions_title: "Каталог решений",
      solution1_title: "OUTDOOR SYSTEMS",
      solution1_desc:
        "Сверхъяркие уличные LED-экраны с защитой IP65. Работа 24/7 в мороз, дождь и солнце.",
      solution2_title: "INDOOR PRESTIGE",
      solution2_desc:
        "Интерьерные LED-экраны 4K/8K для залов, холлов и шоу-румов. Бесшумная работа и идеальная картинка.",
      solution3_title: "RENTAL & STAGE",
      solution3_desc:
        "Прокатные сценические экраны с быстрым монтажом, частота 3840 Гц, легкие кабинеты.",

      video_title: "Как выглядят наши экраны в работе",

      projects_title: "Реализованные проекты",

      reviews_title: "Отзывы клиентов",

      contact_title: "Оставьте заявку на расчёт",
      contact_submit: "Отправить заявку",
      contact_name_placeholder: "Имя",
      contact_phone_placeholder: "Телефон",
      contact_message_placeholder: "Комментарий или задача",

      calc_title: "Онлайн-калькулятор LED-экрана",
      calc_distance_label: "Дистанция просмотра",
      calc_width_label: "Ширина (м)",
      calc_height_label: "Высота (м)",
      calc_model_label: "Рекомендуемая модель",
      calc_budget_label: "Примерный бюджет",
      calc_note:
        "*Предварительный расчёт. Точная стоимость после подготовки проекта.",

      footer_text: "© 2025 GVBS MEDIA. Все права защищены."
    },

    en: {
      nav_solutions: "Solutions",
      nav_video: "Video",
      nav_projects: "Projects",
      nav_reviews: "Reviews",
      nav_contact: "Contacts",

      hero_title: "Premium LED Screens",
      hero_subtitle:
        "Production, installation & warranty across Russia and CIS",
      hero_cta: "Get a quote",

      solutions_title: "Our LED Solutions",
      solution1_title: "OUTDOOR SYSTEMS",
      solution1_desc:
        "High-brightness outdoor LED screens with IP65 protection. 24/7 operation in any weather.",
      solution2_title: "INDOOR PRESTIGE",
      solution2_desc:
        "Indoor 4K/8K LED displays for halls, lobbies and showrooms. Silent operation and perfect image.",
      solution3_title: "RENTAL & STAGE",
      solution3_desc:
        "Rental stage LED screens with fast setup, 3840 Hz refresh rate and lightweight cabinets.",

      video_title: "How our LED screens look in action",

      projects_title: "Completed projects",

      reviews_title: "Client testimonials",

      contact_title: "Request a project quote",
      contact_submit: "Send request",
      contact_name_placeholder: "Name",
      contact_phone_placeholder: "Phone",
      contact_message_placeholder: "Comment or project details",

      calc_title: "LED Screen Online Calculator",
      calc_distance_label: "Viewing distance",
      calc_width_label: "Width (m)",
      calc_height_label: "Height (m)",
      calc_model_label: "Recommended model",
      calc_budget_label: "Estimated budget",
      calc_note:
        "*Rough estimation. Final price after project evaluation.",

      footer_text: "© 2025 GVBS MEDIA. All rights reserved."
    }
  }
};

function applyTranslations(lang) {
  const dict = GVBS_I18N.translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

  document.documentElement.lang = lang;
  GVBS_I18N.currentLang = lang;
  try {
    localStorage.setItem("gvbs_lang", lang);
  } catch (e) {}
}

function setLanguage(lang) {
  applyTranslations(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  let lang = "ru";
  try {
    const saved = localStorage.getItem("gvbs_lang");
    if (saved && GVBS_I18N.translations[saved]) {
      lang = saved;
    }
  } catch (e) {}
  applyTranslations(lang);
});
