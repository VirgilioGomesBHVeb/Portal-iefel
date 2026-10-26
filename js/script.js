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
   2. FORMULARIO - DEMONSTRACAO
   ============================================ */
document.querySelectorAll('form[data-demonstracao]').forEach(function (form) {
    form.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const aviso = form.querySelector('.aviso');
        if (aviso) {
            aviso.classList.add('visivel');

            // Esconder o aviso depois de 5 segundos
            setTimeout(function () {
                aviso.classList.remove('visivel');
            }, 5000);
        }

        form.reset();
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