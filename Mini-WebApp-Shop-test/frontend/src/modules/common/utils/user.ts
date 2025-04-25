import { getUserId } from "../services/userService";

/**
 * Возвращает ID текущего пользователя из куки
 * @param defaultId ID для использования, если куки не содержит ID (по умолчанию 1)
 * @returns ID пользователя
 */
export function getCurrentUserId(defaultId = 1): number {
  const userId = getUserId();
  return userId ? parseInt(userId, 10) : defaultId;
}
