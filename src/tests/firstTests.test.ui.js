import { getBtnText, getLoginInput, getPassInput } from './tests';

const puppeteer = require('puppeteer');

let page;
let browser;
const width = 1920;
const height = 1080;


beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 0,
        args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto('http://localhost:8080/login');
});

describe('Страница авторизации', () => {
    test('Ожидается наличие кнопки Войти', () => getBtnText(page));
    test('Ожидается наличие поля Логин', () => getLoginInput(page));
    test('Ожидается наличие поля Пароль', () => getPassInput(page));
});


afterAll(async () => {
    await browser.close();
});
