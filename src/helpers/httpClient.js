/**
 * Для запросов к API (ожидается ответ в формате JSON)
 * @namespace helpers/httpClient
 */

const options = {
    headers: {
        Accept: 'application/json',
        'cache-control': 'no-cache'
    },
    credentials: 'omit', // include, *same-origin, omit
    mode: 'cors'
};

function getHost() {
    return PRODUCTION ? '' : '//pohodnik.tk';
}

/**
 * Выполняет GET запрос к серверу
 * @param url
 * @param data
 * @param opts
 * @returns {Promise<any>}
 */
export function get(url, data, opts) {
    const fullUrl = `${getHost()}${url}`;
    return fetch(fullUrl, data, { ...options, ...opts }).then(res => res.json());
}

/**
 * Выполняет POST запрос к серверу
 * @param {string} url адрес
 * @param data
 * @param opts
 * @returns {Promise<any>}
 */
export function post(url, data, opts) {
    const fullUrl = `${getHost()}${url}`;
    let body;
    if (data) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        body = formData;
    }
    return fetch(fullUrl, {
        ...options,
        ...opts,
        method: 'POST',
        body
    }).then(res => res.json());
}

export default { get, post };
