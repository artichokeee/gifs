(function() {
  function initPopup() {
    // 1. Проверяем localStorage перед тем, как вообще что-то создавать
    const storageKey = 'qaPromoPopupClosedTime';
    const delayDays = 3;
    const delayMs = delayDays * 24 * 60 * 60 * 1000;
    const lastClosedTime = localStorage.getItem(storageKey);
    const currentTime = new Date().getTime();
    
    if (lastClosedTime) {
      const timePassed = currentTime - parseInt(lastClosedTime, 10);
      if (timePassed < delayMs) {
        return; // Если 3 дня не прошло, скрипт просто останавливается
      }
    }

    // 2. Создаем и добавляем стили (CSS)
    const styles = document.createElement('style');
    styles.innerHTML = `
      .qa-popup-overlay {
        position: fixed; inset: 0; z-index: 999998;
        background: rgba(0, 0, 0, 0.6);
        display: flex; justify-content: center; align-items: center;
        opacity: 0; visibility: hidden;
        transition: opacity 0.4s ease, visibility 0.4s ease;
        font-family: Arial, sans-serif;
      }
      .qa-popup-overlay.show { opacity: 1; visibility: visible; }
      .qa-popup-content {
        background: #ffffff; border-radius: 16px; padding: 35px 25px;
        width: 90%; max-width: 380px; text-align: center;
        position: relative; box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        transform: translateY(20px); transition: transform 0.4s ease;
      }
      .qa-popup-overlay.show .qa-popup-content { transform: translateY(0); }
      .qa-popup-close {
        position: absolute; top: 10px; right: 15px;
        background: none; border: none; font-size: 32px;
        color: #a0a0a0; cursor: pointer; line-height: 1; padding: 0;
        transition: color 0.2s;
      }
      .qa-popup-close:hover { color: #333; }
      .qa-popup-image {
        width: 140px; height: 140px; object-fit: cover;
        border-radius: 12px; margin: 0 auto 20px; display: block;
        box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      }
      .qa-popup-title {
        font-size: 18px; line-height: 1.4; color: #222;
        margin: 0 0 25px 0; font-weight: 700;
      }
      .qa-popup-button {
        display: inline-block !important; background: #2d72fe !important;
        color: #ffffff !important; padding: 14px 28px !important;
        border-radius: 8px !important; text-decoration: none !important;
        font-weight: 600 !important; font-size: 16px !important;
        border: none !important; line-height: normal !important;
        transition: background 0.2s ease, transform 0.1s ease !important;
      }
      .qa-popup-button:hover { background: #1e5dd8 !important; color: #ffffff !important; text-decoration: none !important; }
      .qa-popup-button:active { transform: scale(0.98) !important; }
    `;
    document.head.appendChild(styles);

    // 3. Создаем и добавляем HTML-каркас попапа
    const popup = document.createElement('div');
    popup.id = 'qa-promo-popup';
    popup.className = 'qa-popup-overlay';
    popup.innerHTML = `
      <div class="qa-popup-content">
        <button class="qa-popup-close" id="qa-popup-close">&times;</button>
        <img class="qa-popup-image" src="https://cdn.stepik.net/media/cache/images/courses/280340/cover_1UKiGLu/c7108cd2841e78a486f101f13f8b3f0a.png" alt="Курс Fullstack QA">
        <h3 class="qa-popup-title">Новый пакет из курсов для Fullstak QA: ручное + автоматизация на Stepik!</h3>
        <a class="qa-popup-button" href="https://stepik.org/course/280340" target="_blank">Перейти к курсу</a>
      </div>
    `;
    document.body.appendChild(popup);

    // 4. Логика появления и закрытия
    const closeBtn = document.getElementById('qa-popup-close');

    const closePopup = () => {
      popup.classList.remove('show');
      localStorage.setItem(storageKey, new Date().getTime().toString());
    };

    // Показываем попап через 4 секунды
    setTimeout(() => {
      popup.classList.add('show');
    }, 4000);

    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
      if (e.target === popup) closePopup();
    });
  }

  // Запускаем скрипт убедившись, что страница загружена
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopup);
  } else {
    initPopup();
  }
})();
