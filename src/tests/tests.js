export async function getBtnText(page) {
    const text = await page.$eval('.ant-btn.ant-btn-primary', e => e.textContent);
    expect(text).toBe('Войти');
}

export async function getCheckBoxOn(page) {
    const checkBox = await page.$('label.ant-checkbox-wrapper.ant-checkbox-wrapper-checked > span.ant-checkbox.ant-checkbox-checked');
    expect(checkBox).toBeDefined();

    const label = await page.$eval('div.ant-form-item-control-input span.ant-checkbox+span', e => e.textContent);
    expect(label).toBe('Запомнить меня');
}

export async function getLoginInput(page) {
    const input = await page.$('#basic_username');
    expect(input).toBeDefined();

    const label = await page.$eval('label[for="basic_username"].ant-form-item-required', e => e.title);
    expect(label).toBeDefined();
    expect(label).toBe('Имя пользователя');
}

export async function getPassInput(page) {
    const input = await page.$('#basic_password');
    expect(input).toBeDefined();

    const label = await page.$eval('label[for="basic_password"].ant-form-item-required', e => e.title);
    expect(label).toBeDefined();
    expect(label).toBe('Пароль');
}
