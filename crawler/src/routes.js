const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
const coletaNotas = require('./coletaNotas')
const coletaPresenca = require('./coletaPresenca')
const montaObjetoDisciplina = require('./montaObjetoDisciplina')
const coletaDadosGerais = require('./coletaDadosGerais')




async function crawler() {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://sig.ifc.edu.br/sigaa/verTelaLogin.do');
    
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

async function paraCadaDisciplina(page , disciplinas){
    let objGeral = []
    for (let i = 0; i < disciplinas.quantidadeDeMaterias; i++) {
        console.log(`- ${disciplinas.array_materias[i]}`)
        const obj = await entrandoNasPaginasColetandoInformacoes(page, i)
        objGeral.push(obj)
        await page.waitForNavigation();
    }
    console.log(objGeral)
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

    const objDisciplina = await montaObjetoDisciplina(disciplina , notas , presenca , noticias)
    /// voltando pra home
    await page.evaluate(() => {
        document.getElementById('formAcoesTurma:botaoPortalDiscente').click()
    })
    return objDisciplina
}

crawler()
