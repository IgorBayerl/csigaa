const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');



// OK  Fazer login no sigaa
// OK coletar informações basicas do aluno ( nome, curso ...)
// Limpar informações coletadas
// verificar as materias que o aluno está matriculado 
// Extrair essas materias para um array de objetos com cada objeto sendo uma disciplina
// celetar as notas de cada disciplina
// coletar as informações de presença de cada disciplina
// retornar um log com todas as informações coletadas

async function crawlerTest() {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://sig.ifc.edu.br/sigaa/verTelaLogin.do');

    const userLogin = readlineSync.question('Informe seu usuario : ') ;
    const userSenha = readlineSync.question('Informe a sua senha : ') ;

    const disciplina = 1

    //// Fazendo Login
    await login(page, userLogin, userSenha);

    await page.waitForNavigation();


    const name = await page.evaluate(() => {
        return document.querySelector('.usuario span').title
    });

    const unidade = await page.evaluate(() => {
        return document.querySelector('.unidade').textContent
    });

    const matricula = await page.evaluate(() => {
        return document.querySelector('#agenda-docente table tbody tr').innerText
    });

    //// CONTANDO AS MATERIAS MATRICULADAS
    const disciplinas = await page.evaluate(() => {
        return document.getElementsByClassName('descricao').length
    });

    
    console.log(`Bem vindo ${name}`)
    console.log(matricula)

    for (let i = 0; i < disciplinas; i++) {
        console.log(` disciplina ${i}`)
        await entrandoNasPaginasColetandoInformacoes(page, i)
        await page.waitForNavigation();
    }

    // await browser.close();
}



async function login(page, userLogin, userSenha) {

    await page.evaluate(({ userLogin, userSenha }) => {
        document.getElementsByName('user.login')[0].value = userLogin;
        document.getElementsByName('user.senha')[0].value = userSenha;
        document.forms[0].submit();
    }, { userLogin, userSenha });
}



async function clicandoNaDisciplina(page, disciplina) {
    await page.evaluate((disciplina) => {
        if (disciplina != 0) {
            document.querySelector(`#form_acessarTurmaVirtualj_id_${disciplina} a`).click();
        } else {
            document.querySelector(`#form_acessarTurmaVirtual a`).click();
        }
    }, disciplina);

    await page.waitForNavigation();
}


async function entrandoNasPaginasColetandoInformacoes(page , disciplina){
    
    await clicandoNaDisciplina(page, disciplina)

    // acessando pagina de notas
    await page.evaluate(() => {
        document.getElementsByClassName('rich-panelbar rich-panelbar-interior ')[1].getElementsByClassName('itemMenu')[2].click()
    });

    await page.waitForNavigation();
    await page.goBack()

    /// voltando pra home
    await page.evaluate(() => {
        document.getElementById('formAcoesTurma:botaoPortalDiscente').click()
    })
}

crawlerTest()
