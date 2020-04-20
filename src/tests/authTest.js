// eslint-disable-next-line import/prefer-default-export
export async function routeAfterLogin(page, userlogin, userPassword) {
    await page.goto('http://localhost:8080/hiking');
    // находим кнопку Войти
    let btnLogon = await page.$eval('a[href="/login?return=/hiking"]', e => e.text);
    expect(btnLogon).toBe('Войти');
    // кликаем на кнопку Войти
    await page.click('a[href="/login?return=/hiking"]');
    // проверяем, что попали на страницу логина
    let pageUrl = await page.url();
    expect(pageUrl).toMatch(/http:\/\/localhost:8080\/login\?return=.+/);
    // заполняем логин и пароль
    await page.type('#basic_username', userlogin);
    await page.type('#basic_password', userPassword);
    await page.click('.ant-btn.ant-btn-primary');
    // проверяем что логин прошел успешно
    // нет кнопки Войти
    btnLogon = await page.$eval('a[href^="/login?"]', e => e.textContent);
    expect(btnLogon).toBeUndefined();
    // есть куки
    const userCookies = await page.cookies();
    console.log(userCookies);
    // проверяем, что попали на предыдущую страницу после логина
    pageUrl = await page.url();
    expect(pageUrl).toBe('http://localhost:8080/hiking');
}
