const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
const coletaNotas = require('./coletaNotas')
const coletaPresenca = require('./coletaPresenca')
const montaObjetoDisciplina = require('./montaObjetoDisciplina')
const coletaDadosGerais = require('./coletaDadosGerais')
const login = require('./login')



async function crawler(userLogin, userSenha) {


    const init = await openBrowser()
    const page = init.page
    const browser = init.browser
    
    await login(page, userLogin, userSenha);
   
    await page.waitForNavigation();

    const dados = await coletaDadosGerais(page)
    
    console.log(`Bem vindo ${dados.name}`)
    console.log(dados.matricula)
    
    const arrayMaterias = await paraCadaDisciplina(page , dados)
    
    const objResposta = {
        nome:dados.name,
        matricula: dados.matricula,
        unidade: dados.unidade,
        arrayMaterias:arrayMaterias
    }
    console.log('[ main ]: encerrando...')
    await browser.close();

    return objResposta
}

async function openBrowser(){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://sig.ifc.edu.br/sigaa/verTelaLogin.do');
    return {
        page: page,
        browser: browser
    }
}

async function paraCadaDisciplina(page , disciplinas){
    let objGeral = []
    for (let i = 0; i < disciplinas.quantidadeDeMaterias; i++) {
        const obj = await entrandoNasPaginasColetandoInformacoes(page, i)
        objGeral.push(obj)
        await page.waitForNavigation();
    }
    return objGeral
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
    // entrando na pagina da disciplina
    await clicandoNaDisciplina(page, disciplina)
    
    //const name = 'nomeDaMateria' /// document.querySelector('#linkNomeTurma').textContent
    const name = await page.evaluate(() => {
        return String(document.querySelector('#linkNomeTurma').textContent)
    });

    const presenca = await coletaPresenca( page , disciplina )
    const notas = await coletaNotas(page , disciplina)
    const noticias = []

    // Montando objeto
    const objDisciplina = await montaObjetoDisciplina(disciplina , notas , presenca , noticias, name)

    /// voltando pra home
    await page.evaluate(() => {
        document.getElementById('formAcoesTurma:botaoPortalDiscente').click()
    })

    return objDisciplina
}

module.exports = {
    crawler
}