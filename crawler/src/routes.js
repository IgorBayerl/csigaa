const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
const coletaNotas = require('./coletaNotas')
const coletaPresenca = require('./coletaPresenca')
const montaObjetoDisciplina = require('./montaObjetoDisciplina')
const coletaDadosGerais = require('./coletaDadosGerais')
const login = require('./login')



async function crawler() {


    const init = await openBrowser()
    const page = init.page
    const browser = init.browser
    
    
    const userLogin = readlineSync.question('Informe seu usuario : ') ;
    const userSenha = readlineSync.question('Informe a sua senha : ') ;

    //// Fazendo Login
    
    await login(page, userLogin, userSenha);
   
    await page.waitForNavigation();

    const dados = await coletaDadosGerais(page)
    
    console.log(`Bem vindo ${dados.name}`)
    console.log(dados.matricula)
    
    console.log('[1] - Para coletar de todas as disciplinas ') ;
    console.log('[2] - para coletar de só uma disciplina ') ;
    const option = readlineSync.question('Opcao : ... ') ;

    if (option == 1){
        await paraCadaDisciplina(page , dados)
    } else{
        for (let i = 0; i < dados.array_materias.length; i++) {
            console.log(`-> [${i}] - ${dados.array_materias[i]}:`)
        }
        console.log('====================================')
        const CH = readlineSync.question(`Digite um numero de 0 a ${dados.quantidadeDeMaterias-1} : `)
        const obj = await entrandoNasPaginasColetandoInformacoes(page, CH)
        await page.waitForNavigation();
    }
    
    console.log('[ main ]: encerrando...')
    await browser.close();
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
        console.log(`- ${disciplinas.array_materias[i]}`)
        const obj = await entrandoNasPaginasColetandoInformacoes(page, i)
        objGeral.push(obj)
        await page.waitForNavigation();
    }
    console.log(JSON.stringify(objGeral))
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
    
    const presenca = await coletaPresenca( page , disciplina )
    const notas = await coletaNotas(page , disciplina)
    const noticias = []

    // Montando objeto
    const objDisciplina = await montaObjetoDisciplina(disciplina , notas , presenca , noticias)

    /// voltando pra home
    await page.evaluate(() => {
        document.getElementById('formAcoesTurma:botaoPortalDiscente').click()
    })

    return objDisciplina
}

crawler()
