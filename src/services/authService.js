/**
 * @namespace authService
 */
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
    }
};
