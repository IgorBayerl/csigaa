const puppeteer = require('puppeteer');



async function crawlerTest() {


    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://sig.ifc.edu.br/sigaa/verTelaLogin.do');
    await page.screenshot({ path: 'example.png' });

    await page.evaluate(() => {
        return {
            valueUserLogin: document.getElementsByName('user.login')[0].value = 'igor_bayerl',
            valueUserPassword: document.getElementsByName('user.senha')[0].value = '10012001',
        }
    });

    // function clickButton(val) {
    //     var buttons = document.getElementsByTagName('input');

    //     for (var i = 0; i < buttons.length; i++) {
    //         if (buttons[i].type == 'submit' && buttons[i].value == val) {
    //             buttons[i].click();
    //             break;
    //         }
    //     }
    // }
    //await browser.close();
}

crawlerTest()


// https://www.youtube.com/watch?v=4W55nFDyIrc