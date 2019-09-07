/**
 * Для запросов к API (ожидается ответ в формате JSON)
 * @namespace helpers/httpClient
 */
/**
 * Выполняет GET запрос к серверу
 * @param url
 * @param data
 * @param opts
 * @returns {Promise<any>}
 */
function get(url, data, opts) {
    return fetch(url, data, opts).then(res => res.json());
}

/**
 * Выполняет POST запрос к серверу
 * @param {string} url адрес
 * @param data
 * @param opts
 * @returns {Promise<any>}
 */
function post(url, data, opts) {
    return fetch(url, data, opts).then(res => res.json());
}

export default { get, post };
