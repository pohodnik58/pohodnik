# pohodnik

site <https://pohodnik.tk>

## Разработка
### Используемые технологии
* `HTML5`
* `JavaScript` (`ES6`, `React`)
* `CSS` (`LESS`, `CSS-modules`)

- Сборка через `Webpack`
- Юнит-тесты `JEST` [docs](https://jestjs.io/docs/en/using-matchers)
- Документация в коде `JSDoc` [jsdoc.app](https://jsdoc.app/)
- Проверка кода (настроены precommit и prepush)
    - `eslint` - на базе конфига [airbnb](https://github.com/airbnb/javascript)
    - `stylelint` - на базе конфига [airbnb](https://github.com/airbnb/css)
    - `jsdoc`
 
 
 #### Требования
 * Система контроля версий [git](https://git-scm.com/)
 * Среда исполнения [nodejs](https://nodejs.org/ru/)
 * Пакетный менеджер [yarn](https://yarnpkg.com/lang/ru/)
 
 #### Начало работы
 Клонировать репозиторий
 ```bash
git clone https://github.com/pohodnik58/pohodnik.git
 ```

Выкачать зависимости
 ```bash
yarn
 ```
 #### Скрипты
 Скрипт | Описание | Prepush *
 ------------ | ------------- | -------------
`yarn dev` | Запускает devserver (проект собирается и обновляется в браузере на горячую) | 
`yarn start` | Собирает в папку _/dist_ **development** версию сайта | 
`yarn start:watch` | Пересобирает **development** версию сайта при изменениях в файлах | 
`yarn build` | Собирает в папку _/dist_ **production** версию сайта | 
`yarn deploy` | Заливает **production** версию сайта в продакшн | 
`yarn test` | Прогоняет все тесты | :stop_sign:
`yarn test:watch` | Следит за изменениями и прогоняет измененные тесты | 
`yarn eslint` | Проверка JS кода | :stop_sign:
`yarn eslint:fix"` | Проверка JS кода и автоматическая правка ошибок | 
`yarn stylelint` | Проверка CSS/LESS кода | :stop_sign:
`yarn stylelint:fix` |  Проверка CSS/LESS кода с автоматическим исправлением ошибок | 
`yarn jsdoc` | Формирует документацию из JSDoc комментариев | 
`yarn jsdoc:lint` | Проверяет корректность JSDoc комментариев | :stop_sign:


 \* prepush - блокирующие скрипты (если в результате их исполнения возникнут ошибки, push коммитов будует заблокирован)
 
 
 #### Внесение изменений
 Внесение изменений производится через **git pull request**
 * создается ветка (прим. `git checkout -b hotfix`)
 * вносятся изменения
 * делается комит с адекватным сообщением (прим. `git add .` → `git commit -m"сообщение"`)
 * изменения заливаются на github (прим. `git push`)
 * делается Pull-request с подробным описанием ([:link:pulls](https://github.com/pohodnik58/pohodnik/pulls))
 * получаются аппрувы от владельца репозитория
 * изменения сливаются в мастер-ветку
 * удаляется ветка
 
 
 
---
[Актуальная документация по коду](docs/docs.md)
