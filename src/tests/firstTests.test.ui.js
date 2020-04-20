import {
    routeAfterLogin
} from './authTest';

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
});

describe('Страница авторизации', () => {
    test('Ожидается возврат на предыдущую страницу после логина', () => routeAfterLogin(page, 'ugoljok', '1111'));
});


afterAll(async () => {
    await browser.close();
});
