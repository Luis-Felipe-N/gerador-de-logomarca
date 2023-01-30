const containerImagens = document.querySelector('.lista-imagens')
const listaImagens = [{
    nome: '',
    url: 'images/logo-0.png',
    cor: 'black'
}, {
    nome: '',
    url: 'images/logo-1.png',
    cor: '#004A80'
}, {
    nome: '',
    url: 'images/logo-2.png',
    cor: 'white'
}, {
    nome: '',
    url: 'images/logo-3.png',
    cor: '#004A80'
}, {
    nome: '',
    url: 'images/logo-4.png',
    cor: 'white'
}, {
    nome: '',
    url: 'images/logo-5.png',
    cor: 'white'
}, {
    nome: '',
    url: 'images/logo-6.png',
    cor: 'white'
}]

let imagemSelecionada = 0
let fonte = 60

listaImagens.forEach((imagem, index) => {
    const liElement = document.createElement('li')
    liElement.setAttribute('data-index', index)

    const imgElement = document.createElement('img')
    imgElement.setAttribute('src', imagem.url)

    liElement.append(imgElement)

    liElement.addEventListener('click', mudarImagemPrincipal)

    containerImagens.append(liElement)
})

function mudarImagemPrincipal(event) {
    const indexImagem = event.currentTarget.getAttribute('data-index')
    const imagemResultado = document.querySelector('.resultado-container img')
    imagemSelecionada = indexImagem

    imagemResultado.src = listaImagens[indexImagem].url

    escreverNaImagem(inputDaSigla.value)
}

function escreverNaImagem(texto) {
    const imageParaEscrever = document.querySelector('.resultado-container img')
    const corDaImagem = listaImagens[imagemSelecionada].cor

    const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = imageParaEscrever.width;
    canvas.crossOrigin = "Anonymous";
    canvas.height = imageParaEscrever.height;
    ctx.drawImage(imageParaEscrever, 0, 0, imageParaEscrever.width, imageParaEscrever.height);
    ctx.font = `700 ${fonte}pt Raleway`;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(imageParaEscrever, 0, 0, imageParaEscrever.width, imageParaEscrever.height);
    
    // ESCREVENDO O TEXTO NA IMAGEM
    ctx.fillStyle = corDaImagem;
    
    ctx.textAlign = "center";
    ctx.fillText(texto.toUpperCase(),canvas.width / 2 ,canvas.height / 1.30 );
}

function downloadImagem(imageIndex) {
    const canvas = document.getElementById('canvas')
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    

    var a = document.createElement('a');
    a.href = image;
    a.download = `Logo-${inputDaSigla.value.replaceAll(' ', '_')}.png`;
    document.body.appendChild(a);
    a.click();
}

const inputDaSigla = document.querySelector('#inputDaSigla')
inputDaSigla.addEventListener('input', (e) => escreverNaImagem(e.target.value))

const btnDownloadImagem = document.querySelector('#downloadImagem')
btnDownloadImagem.addEventListener('click', (e) => downloadImagem(imagemSelecionada))

const tamanhoDaFonte = document.querySelector('#tamanhoDaFonte')
tamanhoDaFonte.addEventListener('input', (e) => {
    fonte = e.target.value
    escreverNaImagem(inputDaSigla.value)
})

document.onloadeddata = escreverNaImagem('')