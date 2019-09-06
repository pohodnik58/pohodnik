export default {
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
