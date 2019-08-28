/*
  Здесь лежит функция,
  которая по имени класса и пути до CSS файла
  вернет минифицированное название класса
*/

// Модуль для генерации уникальных названий
const incstr = require('incstr');

const createUniqueIdGenerator = () => {
    const uniqIds = {};

    const generateNextId = incstr.idGenerator({
        // Буквы d нету, чтобы убрать сочетание ad,
        // так как его может заблокировать Adblock
        alphabet: 'abcefghijklmnopqrstuvwxyzABCEFGHJKLMNOPQRSTUVWXYZ',
    });

    // Для имени возвращаем его минифицированную версию
    return (name) => {
        if (!uniqIds[name]) {
            uniqIds[name] = generateNextId();
        }

        return uniqIds[name];
    };
};

const localNameIdGenerator = createUniqueIdGenerator();
const componentNameIdGenerator = createUniqueIdGenerator();

module.exports = (localName, resourcePath) => {
    // Получим название папки, в которой лежит наш index.css
    const componentName = resourcePath
        .split('/')
        .slice(-2, -1)[0];

    const localId = localNameIdGenerator(localName);
    const componentId = componentNameIdGenerator(componentName);

    return `${componentId}_${localId}`;
};