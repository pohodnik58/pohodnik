import authService from './authService';

test('two plus two is four', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
});

test('the data is ololo', async () => {
    const data = await authService.fetchData(1000);
    expect(data).toBe('ololo');
});

test('should fetch users', () => {
    authService.checkAuth().then(data => expect(data).toEqual({auth: true}));
});
