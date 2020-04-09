import { get, post } from '../helpers/httpClient';

/**
 * @namespace authService
 */

/**
 * Авторизация пользователя
 * @param <Object>
 * @returns {Promise<any>} ok: {userId: XXX} err: {error: XXX, message: xxx}
 */
export async function login({ username, password, remember = true }) {
    const result = await post('/ajax/login_start.php', { login: username, pass: password, is_remember: remember });
    return result;
}

export async function logout(cb) {
    await post('/ajax/login_out.php');
    cb();
}

export async function loginCheck() {
    const result = await get('/ajax/login_check.php');
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
