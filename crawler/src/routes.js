const puppeteer = require('puppeteer');



async function crawlerTest() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://sig.ifc.edu.br/sigaa/verTelaLogin.do');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
}

crawlerTest()


// https://www.youtube.com/watch?v=4W55nFDyIrc