/**
 * Для запросов к API (ожидается ответ в формате JSON)
 * @namespace helpers/httpClient
 */

function getHost() {
    return PRODUCTION ? '/' : 'http://localhost:8000/';
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
    return fetch(fullUrl, data, opts).then(res => res.json());
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
    return fetch(fullUrl, data, opts).then(res => res.json());
}

export default { get, post };
