export async function getBtnText(page){
    const text = await page.$eval('.ant-btn.ant-btn-primary', e => e.textContent);
    expect(text).toBe('Войти');
}

export async function getLoginInput(page){
    const input = await page.$('#basic_username');
    expect(input).toBeDefined();
}

export async function getPassInput(page){
    const input = await page.$('#basic_password');
    expect(input).toBeDefined();
}

