import {
    successLogin
    // routeAfterLogin,
    // successLogout
} from './authTest';

const puppeteer = require('puppeteer');

let page;
let browser;
const width = 1920;
const height = 1080;

// тестовые данные
const testUser = {
    id: '34',
    login: 'ugoljok',
    password: '1111',
    name: 'Лена'
};
const startPageUrl = {
    main: 'http://localhost:8080'
};


beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 0,
        args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
});

describe('Страница авторизации', () => {
    test('Ожидается успешный логин', () => successLogin(page, startPageUrl.main, testUser));
    // eslint-disable-next-line max-len
    // test('Ожидается возврат на предыдущую страницу после логина', () => routeAfterLogin(page, testUser.login, testUser.password));
    // test('Ожидается успешный выход из профиля', () => successLogout(page, startPageUrl.main));
});


afterAll(async () => {
    await browser.close();
});
