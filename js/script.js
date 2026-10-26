/* ============================================
   1. MENU MOBILE - TOGGLE
   ============================================ */
const botaoMenu = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (botaoMenu && menu) {
    // Alternar abertura/fechamento do menu
    botaoMenu.addEventListener('click', function () {
        const aberto = menu.classList.toggle('aberto');
        botaoMenu.setAttribute('aria-expanded', String(aberto));
    });

    // Fechar menu ao clicar em um link
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('aberto');
            botaoMenu.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ============================================
   2. FORMULARIO - ENVIO EMAIL E WHATSAPP
   ============================================ */
const formContacto = document.getElementById('formContacto');
const btnWhatsapp = document.getElementById('btnWhatsapp');

// Defina o número da igreja com o indicativo internacional (ex: 258 para Moçambique)
const numeroWhatsApp = '258879021275';

// Envio para WhatsApp
if (btnWhatsapp && formContacto) {
    btnWhatsapp.addEventListener('click', function () {
        const nome = formContacto.querySelector('#nome').value.trim();
        const email = formContacto.querySelector('#email').value.trim();
        const telefone = formContacto.querySelector('#telefone').value.trim();
        const selectAssunto = formContacto.querySelector('#assunto');
        const assunto = selectAssunto.options[selectAssunto.selectedIndex].text;
        const mensagem = formContacto.querySelector('#mensagem').value.trim();

        if (!nome || !mensagem || !selectAssunto.value) {
            alert('Por favor, preencha o Nome, Assunto e Mensagem antes de enviar pelo WhatsApp.');
            return;
        }

        const texto = 
            `*Novo Contacto - Portal IEFEL*\n\n` +
            `*Nome:* ${nome}\n` +
            `*E-mail:* ${email || 'Não informado'}\n` +
            `*Telefone:* ${telefone || 'Não informado'}\n` +
            `*Assunto:* ${assunto}\n\n` +
            `*Mensagem:*\n${mensagem}`;

        const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank');
    });
}

// Envio para E-mail
document.querySelectorAll('form[data-demonstracao]').forEach(function (form) {
    form.addEventListener('submit', async function (evento) {
        evento.preventDefault();

        const aviso = form.querySelector('.aviso');
        const dados = new FormData(form);

        // Se o action ainda for "#", faz apenas a simulação visual original
        if (form.getAttribute('action') === '#' || form.getAttribute('action').includes('SEU_ID_AQUI')) {
            if (aviso) {
                aviso.textContent = 'Mensagem enviada com sucesso! Entraremos em contacto brevemente.';
                aviso.classList.add('visivel');
                setTimeout(function () {
                    aviso.classList.remove('visivel');
                }, 5000);
            }
            form.reset();
            return;
        }

        try {
            const resposta = await fetch(form.action, {
                method: form.method,
                body: dados,
                headers: { 'Accept': 'application/json' }
            });

            if (resposta.ok) {
                if (aviso) {
                    aviso.textContent = 'Mensagem enviada com sucesso! Entraremos em contacto brevemente.';
                    aviso.classList.add('visivel');
                    setTimeout(function () {
                        aviso.classList.remove('visivel');
                    }, 5000);
                }
                form.reset();
            } else {
                alert('Ocorreu um erro ao enviar o e-mail. Se preferir, utilize o botão de WhatsApp.');
            }
        } catch (erro) {
            alert('Erro de ligação. Tente novamente ou envie pelo WhatsApp.');
        }
    });
});

/* ============================================
   3. VERSICULO - ROTATIVO
   ============================================ */
const versos = [
    ['Lampada para os meus pes eh a tua palavra, e luz para o meu caminho.', 'Salmos 119:105'],
    ['Tudo posso naquele que me fortalece.', 'Filipenses 4:13'],
    ['O Senhor eh o meu pastor; nada me faltara.', 'Salmos 23:1']
];

const texto = document.querySelector('[data-versiculo]');
const ref = document.querySelector('[data-referencia]');

if (texto && ref) {
    // Usa o dia atual para escolher um versiculo diferente
    var indice = new Date().getDate() % versos.length;

    texto.textContent = versos[indice][0];
    ref.textContent = versos[indice][1];
}