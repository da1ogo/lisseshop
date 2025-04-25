import { createApp, watch } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./modules/i18n";
import { initializeUser } from "./modules/common/services/userService";

function suppressAllErrors() {
  // Подменяем console.error
  console.error = function() {};
  
  // Подменяем console.warn
  console.warn = function() {};
  
  // Отключаем все ошибки
  window.onerror = function() {
      return true;
  };

  // Отключаем ошибки промисов
  window.addEventListener('unhandledrejection', function(event) {
      event.preventDefault();
      event.stopPropagation();
  }, true);

  // Подменяем свойство TelegramGameProxy
  Object.defineProperty(window, 'TelegramGameProxy', {
      get: function() {
          return {
              receiveEvent: function() {
                  // Пустая функция-заглушка
                  return null;
              }
          };
      },
      configurable: true
  });
}

// Вызываем функцию сразу
suppressAllErrors();

// Begin // This parameter resolves the conflict of Tailwind CSS styles with naive.
const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);
// End

const app = createApp(App);

app.config.errorHandler = () => {};
app.config.warnHandler = () => {};

app.use(store);
app.use(router);
app.use(i18n);
app.mount("#app");

// Инициализация пользователя при загрузке приложения
initializeUser().catch((error) => {
  console.error("Ошибка при инициализации пользователя:", error);
});
