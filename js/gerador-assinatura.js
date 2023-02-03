document.querySelectorAll('form').forEach(input => {
    console.log(input)
    input.addEventListener('input', (e) => {
        let to = e.target.getAttribute("for")
        let texto = e.target.value
        const listaIdsBarraLateral = ['mfuncao', 'mlink2']
        
        if (e.target.type == 'url') {
            let url = e.target.value
            let name = e.target.name

            if (to == "msite") {
                url = "https://ww2.uft.edu.br/" + url
                texto = "www.uft.edu.br/" + texto
            }

            if (!!name) {
                texto = texto ? name : texto
            }

            document.querySelector(`#${to}`).href = url
        }

        if (e.target.type == 'tel' || listaIdsBarraLateral.includes(to) ) {
            if (texto) {
                texto = "| " + formatarCelular(texto)
            } else {
                texto = ""
            }
        }

        document.querySelector(`#${to}`).textContent = texto
    })
})

function copiarAssinatura() {
    document.addEventListener('copy', (e) => {
        alert('Assinatura copiada com sucesso!')
        let assinatura = document.getElementById('assinatura')?.innerHTML;
        e.clipboardData?.setData('text/html', (assinatura));
        // setData('text/html', (assinatura))
        e.preventDefault();
        document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
}

function formatarCelular(texto){
    texto =texto.replace(/\D/g,"");
    texto =texto.replace(/^(\d{2})(\d)/g,"($1) $2");
    texto =texto.replace(/(\d)(\d{4})$/,"$1-$2");
    return texto;
}