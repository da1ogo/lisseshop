/**
 * Утилиты для работы с куками в приложении
 */

/**
 * Установка куки
 * @param name Имя куки
 * @param value Значение куки
 * @param days Срок действия куки в днях
 */
export function setCookie(name: string, value: string, days = 365): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

/**
 * Получение значения куки по имени
 * @param name Имя куки
 * @returns Значение куки или пустую строку, если куки не найдена
 */
export function getCookie(name: string): string {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return "";
}

/**
 * Удаление куки по имени
 * @param name Имя куки для удаления
 */
export function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

/**
 * Генерация псевдослучайного числа в заданном диапазоне
 * @param min Минимальное значение
 * @param max Максимальное значение
 * @returns Случайное число
 */
export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
