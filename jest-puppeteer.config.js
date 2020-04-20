module.exports = {
    launch: {
        headless: process.env.HEADLESS !== 'false', // если запускать без параметров - запустится безголовый
        slowMo: process.env.SLOWMO? process.env.SLOWMO: 0,
        devtools: true
    }
}
