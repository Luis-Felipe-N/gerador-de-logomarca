document.querySelectorAll('form').forEach(input => {
    input.addEventListener('input', (e) => {
        let to = e.target.getAttribute("for")
        let texto = e.target.value
        
        if (e.target.type == 'url') {
            let url = e.target.value

            if (to == "msite") {
                url = "https://ww2.uft.edu.br/" + url
                texto = "www.uft.edu.br/" + texto
            }

            document.querySelector(`#${to}`).href = url
        }

        if (e.target.type == 'tel' || to == "mlink2") {
            if (texto) {
                texto = "| " + texto
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


function addTextWrap() {
    textCampos = document.getElementsByClassName('informacao')
    for (var i = 0; i <= 5; i++) {
        if (textCampos[i].value != '') {
            textCampos[i].insertAdjacentHTML('afterend', '<br>');
        }
    }
}

