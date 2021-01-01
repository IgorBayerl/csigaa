// const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const FormData = require('form-data');


async function verifyLogin(userLogin, userSenha) {
    console.log(`Verificando login de ${userLogin}`)
    
    let formData = new FormData();
    
    formData.append('user.login', userLogin);
    formData.append('user.senha', userSenha);

    const options = {
        method: 'POST',
        body: formData,
    }
    
    const serverSigaaLoginResponse = await fetch('https://sig.ifc.edu.br/sigaa/logar.do?dispatch=logOn', options);
    const content = await serverSigaaLoginResponse.text()
    console.log(content.length)
    if(content.length < 300){
        console.log(true)
        return true
    }else{
        console.log(false)
        return false
    }
    
    // const init = await openBrowser()
    // const { page , browser } = init
    
    // await page.evaluate(({ userLogin, userSenha }) => {
    //     document.getElementsByName('user.login')[0].value = userLogin;
    //     document.getElementsByName('user.senha')[0].value = userSenha;
    //     document.forms[0].submit();
    // }, { userLogin, userSenha });

    // await page.waitForNavigation();
    // const response = await page.evaluate(() => {
    //     const testando = document.getElementsByName('user.login')[0]
    //     if (testando == undefined){
    //         return true
    //     }else{
    //         return false
    //     }
    // });

    // await browser.close();
    // return response
}

// async function openBrowser(){
//     const browser = await puppeteer.launch({ 
//         headless: true,
//         args: ["--no-sandbox", "--disable-setuid-sandbox"]
//     });
//     const page = await browser.newPage();
//     await page.goto('https://sig.ifc.edu.br/sigaa/verTelaLogin.do');
//     return {
//         page: page,
//         browser: browser
//     }
// }

module.exports = verifyLogin