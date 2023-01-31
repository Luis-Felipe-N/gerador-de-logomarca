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
let formatoCircular = true

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

    containerImagens.querySelectorAll('li').forEach(li => li.classList.remove('active'))
    event.currentTarget.classList.add('active')

    escreverNaImagem(inputDaSigla.value)
}

function escreverNaImagem(texto) {
    const imageParaEscrever = document.querySelector('.resultado-container img')
    const corDaImagem = listaImagens[imagemSelecionada].cor

    const canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d');
    canvas.width = imageParaEscrever.width;
    canvas.height = imageParaEscrever.height;

    if (formatoCircular) {
        ctx = canvas.getContext('2d');
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI); 
        ctx.clip();
    } else {
        ctx.restore();
    }

    canvas.crossOrigin = "Anonymous";
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

const avatarFormatos = document.querySelectorAll('[data-avatarFormato]')
avatarFormatos.forEach(formato => {
    formato.addEventListener('click', (e) => {
        const formato = e.currentTarget.getAttribute('data-avatarFormato')
        const textoAtual = inputDaSigla.value

        if (formato == 'quadrado') {
            formatoCircular = false
        }
        
        if (formato == 'circular') {
            formatoCircular = true
        }
        
        escreverNaImagem(textoAtual)
    })
})

document.onloadeddata = escreverNaImagem('')