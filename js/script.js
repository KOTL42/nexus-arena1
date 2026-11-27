document.addEventListener("DOMContentLoaded", () => {
  // 0. СКРЫТИЕ НЕЗАГРУЖЕННЫХ КАРТИНОК
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
    });
  });

  // 1. ВСПЛЫВАЮЩИЕ ОКНА (МОДАЛКИ)
  const bookingModal = document.getElementById("bookingModal");
  const successModal = document.getElementById("successModal");
  const successText = document.getElementById("successText");

  const openModal = (modal) => {
    if (modal) modal.classList.add("open");
  };

  const closeAllModals = () => {
    document.querySelectorAll(".modal").forEach((m) => m.classList.remove("open"));
  };

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(bookingModal));
  });

  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", closeAllModals);
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeAllModals();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  // 2. ОБРАБОТКА ФОРМ БРОНИРОВАНИЯ
  const handleFormSubmit = (form) => {
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("username") || "Игрок";
      const zone = formData.get("zone") || "Standard Zone";

      closeAllModals();
      if (successText) {
        successText.textContent = `${name}, ваша бронь в «${zone}» принята. Администратор свяжется с вами в ближайшее время.`;
      }
      openModal(successModal);
      form.reset();
    });
  };

  handleFormSubmit(document.getElementById("modalForm"));
  handleFormSubmit(document.getElementById("pageBookingForm"));

  // 3. КАСТОМНЫЙ ZERO-БЛОК: ПЕРЕКЛЮЧЕНИЕ ТАРИФОВ И ЖЕЛЕЗА
  const zonesData = {
    standard: {
      price: "150 ₽ / час",
      title: "Открытый зал Standard",
      desc: "30 посадочных мест с широкими столами 140 см, креслами с поясничной поддержкой и периферией Logitech G Pro.",
      gpu: "RTX 4070 Ti",
      monitor: '24.5" 280 Hz',
      gear: "Logitech G Pro X"
    },
    bootcamp: {
      price: "220 ₽ / час",
      title: "Изолированный Bootcamp 5x5",
      desc: "Отдельная звукоизолированная комната для командных тренировок и праков с тактической доской и климат-контролем.",
      gpu: "RTX 4080 Super",
      monitor: '24.5" 360 Hz',
      gear: "Zowie / HyperX"
    },
    vip: {
      price: "300 ₽ / час",
      title: "Приватная комната VIP Duo",
      desc: "Максимальный комфорт для игры вдвоём: увеличенные столы, флагманские видеокарты и отдельный мини-холодильник.",
      gpu: "RTX 4090",
      monitor: '27" OLED 360 Hz',
      gear: "Custom Mechanical"
    }
  };

  const zoneTabs = document.querySelectorAll(".zone-tab");
  if (zoneTabs.length) {
    zoneTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        zoneTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        const data = zonesData[tab.dataset.zone];
        if (!data) return;

        document.getElementById("zonePrice").textContent = data.price;
        document.getElementById("zoneTitle").textContent = data.title;
        document.getElementById("zoneDesc").textContent = data.desc;
        document.getElementById("specGpu").textContent = data.gpu;
        document.getElementById("specMonitor").textContent = data.monitor;
        document.getElementById("specGear").textContent = data.gear;
      });
    });
  }

  // 4. СЛАЙДЕР ГАЛЕРЕИ
  const slider = document.getElementById("clubSlider");
  if (slider) {
    const slides = slider.querySelectorAll(".slide");
    const dotsContainer = document.getElementById("sliderDots");
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");
    let currentIndex = 0;

    const goToSlide = (index) => {
      const dots = dotsContainer.querySelectorAll(".slider__dot");
      slides[currentIndex].classList.remove("active");
      dots[currentIndex].classList.remove("active");

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add("active");
      dots[currentIndex].classList.add("active");
    };

    slides.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = idx === 0 ? "slider__dot active" : "slider__dot";
      dot.ariaLabel = `Слайд ${idx + 1}`;
      dot.addEventListener("click", () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

    setInterval(() => goToSlide(currentIndex + 1), 5000);
  }
});

