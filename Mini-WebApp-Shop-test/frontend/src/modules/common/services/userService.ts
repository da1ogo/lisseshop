import { getCookie, setCookie, generateRandomNumber } from "../utils/cookies";
import store from "@/store";

const TELEGRAM_ID_KEY = "telegram_id";
const USER_ID_KEY = "user_id";

/**
 * Проверяет, есть ли у пользователя Telegram ID в куки
 * @returns true, если Telegram ID уже существует
 */
export function hasTelegramId(): boolean {
  return !!getCookie(TELEGRAM_ID_KEY);
}

/**
 * Получает Telegram ID из куки
 * @returns ID пользователя Telegram
 */
export function getTelegramId(): string {
  return getCookie(TELEGRAM_ID_KEY);
}

/**
 * Получает ID пользователя из куки
 * @returns ID пользователя в системе
 */
export function getUserId(): string {
  return getCookie(USER_ID_KEY);
}

/**
 * Генерирует случайный Telegram ID и сохраняет его в куки
 * @returns Сгенерированный ID
 */
export function generateTelegramId(): string {
  // Генерируем случайное большое число для имитации Telegram ID
  const telegramId = generateRandomNumber(10000000, 999999999).toString();
  setCookie(TELEGRAM_ID_KEY, telegramId);
  return telegramId;
}

/**
 * Сохраняет ID пользователя в куки
 * @param userId ID пользователя
 */
export function saveUserId(userId: number | string): void {
  setCookie(USER_ID_KEY, userId.toString());
}

/**
 * Инициализирует пользователя при первом входе на сайт
 * Проверяет наличие Telegram ID в куки,
 * при отсутствии генерирует новый ID и создает пользователя
 */
export async function initializeUser(): Promise<void> {
  // Проверяем, есть ли уже Telegram ID в куки
  if (!hasTelegramId()) {
    // Генерируем и сохраняем новый Telegram ID
    const telegramId = generateTelegramId();

    try {
      // Создаем пользователя в БД
      const userData = {
        telegram_id: telegramId,
        // Можно добавить дополнительные поля, если они нужны при создании пользователя
      };

      const user = await store.dispatch("users/CREATE_USERS", userData);

      // Если пользователь успешно создан, сохраняем его ID в куки
      if (user && user.id) {
        saveUserId(user.id);
      }

      console.log("Создан новый пользователь с TelegramID:", telegramId);
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
    }
  } else {
    // Если Telegram ID уже существует, проверяем наличие user_id
    const telegramId = getTelegramId();
    const userId = getUserId();

    if (!userId) {
      try {
        // Если user_id отсутствует, но есть telegram_id, ищем пользователя по telegram_id
        await store.dispatch("users/FETCH_ALL_USERS", {
          search_data: { telegram_id: telegramId },
        });

        const users = store.getters["users/GET_ALL_USERS"];
        if (users && users.length > 0) {
          // Нашли пользователя, сохраняем его ID
          saveUserId(users[0].id);
          console.log("Найден существующий пользователь с TelegramID:", telegramId);
        } else {
          // Не нашли пользователя с этим telegram_id, создаем нового
          const userData = {
            telegram_id: telegramId,
          };

          const user = await store.dispatch("users/CREATE_USERS", userData);

          if (user && user.id) {
            saveUserId(user.id);
          }

          console.log("Создан новый пользователь для существующего TelegramID:", telegramId);
        }
      } catch (error) {
        console.error("Ошибка при поиске/создании пользователя:", error);
      }
    }
  }
}
