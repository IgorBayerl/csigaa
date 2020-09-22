const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
const coletaNotas = require('./coletaNotas')


// OK  Fazer login no sigaa
// OK coletar informações basicas do aluno ( nome, curso ...)
// Limpar informações coletadas
// OK verificar as materias que o aluno está matriculado 
// Extrair essas materias para um array de objetos com cada objeto sendo uma disciplina
// celetar as notas de cada disciplina
// coletar as informações de presença de cada disciplina
// retornar um log com todas as informações coletadas

async function crawlerTest() {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://sig.ifc.edu.br/sigaa/verTelaLogin.do');
    
    const userLogin = readlineSync.question('Informe seu usuario : ') ;
    const userSenha = readlineSync.question('Informe a sua senha : ') ;

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

    //// CONTANDO AS MATERIAS MATRICULADAS
    // const disciplinas = await page.evaluate(() => {
    //     return document.getElementsByClassName('descricao').length
    // });

    
    console.log(`Bem vindo ${dados.name}`)
    console.log(dados.matricula)

    await paraCadaDisciplina(page , dados.quantidadeDeMaterias)
    
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

    // acessando pagina de notas
    console.log(`[acessando disciplina ${disciplina}]: acessando pagina de notas...`)
    await page.evaluate(() => {
        document.getElementsByClassName('rich-panelbar rich-panelbar-interior ')[1].getElementsByClassName('itemMenu')[2].click()
    });

    
    const notas = await coletaNotas(page)

    /// acessando pagina presença
    console.log(`[acessando disciplina ${disciplina}]: acessando pagina de presença...`)
    await page.evaluate(() => {
        document.getElementsByClassName('rich-panelbar rich-panelbar-interior ')[1].getElementsByClassName('itemMenu')[0].click()
    });
    await page.waitForNavigation();

    const presencas = await page.evaluate(() => {
        const linhasPar = document.getElementsByClassName('linhaPar').length
        const linhasImpar = document.getElementsByClassName('linhaImpar').length
        return{
            quantidadeDeAulasRegistradas: linhasImpar + linhasPar,
        }
    })
    console.log(`[ Presenca ] - [Aulas registradas]: ${presencas.quantidadeDeAulasRegistradas}`)

    /// voltando pra home
    await page.evaluate(() => {
        document.getElementById('formAcoesTurma:botaoPortalDiscente').click()
    })
}

crawlerTest()
