export async function successLogin(page, startPageUrl, testUser) {
    await page.goto(startPageUrl);
    // находим кнопку Войти
    const btnLogon = await page.$eval('a[href^="/login?return=/"]', e => e.text);
    expect(btnLogon).toBe('Войти');
    // кликаем на кнопку Войти
    await page.click('a[href^="/login?return=/"]');
    // проверяем, что попали на страницу логина
    const pageUrl = await page.url();
    expect(pageUrl).toMatch(/http:\/\/localhost:8080\/login\?return=.+/);
    // заполняем логин и пароль
    // eslint-disable-next-line no-use-before-define
    await inputLogin(page, testUser.login, testUser.password);
    // добавляем задержку
    await page.waitFor(1000);
    // есть куки тестового пользователя
    const userCookies = await page.cookies();
    expect(userCookies).toMatchObject([{ name: 'hash' }, { name: 'user', value: testUser.id }]);
    // подпись у аватара
    const nameProfile = await page.$eval('.submenu-title-wrapper', e => e.textContent);
    expect(nameProfile).toMatch(testUser.name);
    // наличие аватара
    const avatar = await page.$eval('.ant-avatar-circle', e => e.textContent);
    expect(avatar).toBeDefined();

    // разлогиниваемся в конце теста
    await page.hover('.submenu-title-wrapper');
    await page.waitForSelector('.logoutBtn');
    await page.click('.logoutBtn');
}

export async function successLogout(page, startPageUrl) {
    await page.goto(startPageUrl);
}

// eslint-disable-next-line import/prefer-default-export
export async function routeAfterLogin(page, testUser) {
    await page.goto('http://localhost:8080/hiking');
    // находим кнопку Войти
    const btnLogon = await page.$eval('a[href="/login?return=/hiking"]', e => e.text);
    expect(btnLogon).toBe('Войти');
    // кликаем на кнопку Войти
    await page.click('a[href="/login?return=/hiking"]');
    // проверяем, что попали на страницу логина
    let pageUrl = await page.url();
    expect(pageUrl).toMatch(/http:\/\/localhost:8080\/login\?return=.+/);
    // заполняем логин и пароль
    // eslint-disable-next-line no-use-before-define
    await inputLogin(page, testUser.login, testUser.password);
    // добавляем задержку
    await page.waitFor(1000);
    // проверяем что логин прошел успешно
    // находим кнопку Выйти
    await page.waitForSelector('.logoutBtn', { hidden: true });
    // нет кнопки Войти
    // const btnLogon = await page.$eval('a[href^="/login?"]', e => e.text);
    // console.log(btnLogon);
    // есть куки
    const userCookies = await page.cookies();
    // eslint-disable-next-line no-sequences
    expect(userCookies).toMatchObject([{ name: 'hash' }, { name: 'user' }]);
    // проверяем, что попали на предыдущую страницу после логина
    pageUrl = await page.url();
    expect(pageUrl).toBe('http://localhost:8080/hiking');
}

// заполнение формы логина
async function inputLogin(page, login, password) {
    await page.type('#basic_username', login);
    await page.type('#basic_password', password);
    await page.click('.ant-btn.ant-btn-primary');
}

// разлогинивание
// eslint-disable-next-line no-unused-vars
async function logOut(page) {
    await page.click('.logoutBtn');
}
