import { post } from '../helpers/httpClient';

/**
 * @namespace authService
 */

/**
 * Параметры функции авторизации пользователя по логину.паролю
 * @name LogPasswAuthParams
 * @typedef {Object} LogPasswAuthParams
 * @property <string> username логин
 * @property <string> password пароль
 * @property <Boolean> [remember=true] признак того, что нужно запомнить пользователя
 */

/**
 * Авторизация пользователя
 * @param <LogPasswAuthParams>
 * @returns {Promise<any>} ok: {userId: XXX} err: {error: XXX, message: xxx}
 */
export async function login({ username, password, remember = true }) {
    const result = await post('/ajax/login_start.php', { login: username, pass: password, is_remember: remember });
    return result;
}

export default {
    /**
     * fake fetch
     * @param timeout
     * @returns {Promise<unknown>}
     */
    fetchData(timeout = 500) {
        return new Promise((res, rej) => {
            if (timeout > 1000) { rej(); return; }
            setTimeout(() => { res('ololo'); }, timeout);
        });
    },

    checkAuth(timeout = 500) {
        return new Promise((res, rej) => {
            if (timeout > 1000) { rej(); return; }
            setTimeout(() => { res({ auth: true }); }, timeout);
        });
    },
    login
};
