const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
const coletaNotas = require('./coletaNotas')
const coletaPresenca = require('./coletaPresenca')
const montaObjetoDisciplina = require('./montaObjetoDisciplina')


async function crawler() {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://sig.ifc.edu.br/sigaa/verTelaLogin.do');
    
    const userLogin = readlineSync.question('Informe seu usuario : ') ;
    const userSenha = readlineSync.question('Informe a sua senha : ') ;

    console.log('[1] - Para coletar de todas as disciplinas ') ;
    console.log('[2] - para coletar de só uma disciplina ') ;
    const option = readlineSync.question('Opcao : ...') ;
    //// Fazendo Login
    
    await login(page, userLogin, userSenha);

    await page.waitForNavigation();

    const dados = await page.evaluate(() => {
        return {
            name : document.querySelector('.usuario span').title.trim(),
            matricula : document.querySelector('#agenda-docente table tbody tr').innerText.trim(),
            unidade : document.querySelector('.unidade').textContent.trim(),
            quantidadeDeMaterias : document.getElementsByClassName('descricao').length,
        }
    });

    console.log(`Bem vindo ${dados.name}`)
    console.log(dados.matricula)

    if (option == 1){
        await paraCadaDisciplina(page , dados.quantidadeDeMaterias)
    } else{
        const CH = readlineSync.question(`Digite um numero de 0 a ${dados.quantidadeDeMaterias-1} ... `)
        await entrandoNasPaginasColetandoInformacoes(page, CH)
        await page.waitForNavigation();
    }
    
    console.log('[ main ]: encerrando...')
    await browser.close();
}

async function paraCadaDisciplina(page , disciplinas){
    for (let i = 0; i < disciplinas; i++) {
        console.log(`- Disciplina ${i}`)
        await entrandoNasPaginasColetandoInformacoes(page, i)
        await page.waitForNavigation();
    }
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
    
    const notas = await coletaNotas(page , disciplina)

    const presenca = await coletaPresenca( page , disciplina )
    
    const noticias = []

    montaObjetoDisciplina(disciplina , notas , presenca , noticias)
    /// voltando pra home
    await page.evaluate(() => {
        document.getElementById('formAcoesTurma:botaoPortalDiscente').click()
    })
}

crawler()
