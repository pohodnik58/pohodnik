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
}

function getHost() {
    return PRODUCTION ? '' : 'http://pohodnik.tk:8000';
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
    return fetch(fullUrl, { ...options, ...opts, method: 'POST' }, data).then(res => res.json());
}

export default { get, post };
