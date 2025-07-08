// ===============================================
//         CONTROLE DO MENU HAMBÚRGUER
// ===============================================

// Seleciona os elementos do DOM para o menu
const menuHamburguer = document.querySelector('.menu-hamburguer');
const navList = document.querySelector('nav ul');

// Adiciona um "ouvinte de evento" para o clique no botão do hambúrguer
// Isso abre e fecha o menu.
menuHamburguer.addEventListener('click', () => {
  menuHamburguer.classList.toggle('active');
  navList.classList.toggle('active');
});


// ===================================================================
//  FECHA O MENU MOBILE AUTOMATICAMENTE APÓS CLICAR EM UM LINK
// ===================================================================

// Seleciona todos os links que estão dentro do menu de navegação
const navLinks = document.querySelectorAll('nav ul a');

// Adiciona um "ouvinte de clique" para CADA link do menu
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Quando um link for clicado, remove a classe 'active' para fechar o menu.
    // Usamos .remove() em vez de .toggle() para garantir que o menu sempre feche.
    menuHamburguer.classList.remove('active');
    navList.classList.remove('active');
  });
});


// ===============================================
//         ANIMAÇÃO AO ROLAR A PÁGINA
// ===============================================

// Cria o observador que vai vigiar os elementos
const observer = new IntersectionObserver((entries) => {
  // Loop sobre os elementos que o observador está vendo
  entries.forEach((entry) => {
    // Se o elemento estiver visível na tela
    if (entry.isIntersecting) {
      // Adiciona a classe 'show' para torná-lo visível
      entry.target.classList.add('show');
    } else {
      // Opcional: Se quiser que a animação aconteça toda vez que o elemento
      // entrar e sair da tela, descomente a linha abaixo.
      // entry.target.classList.remove('show');
    }
  });
});

// Seleciona todos os elementos que têm a classe 'hidden' para serem observados
const hiddenElements = document.querySelectorAll('.hidden');

// Manda o observador vigiar cada um desses elementos
hiddenElements.forEach((el) => observer.observe(el));

// ===============================================
//         ENVIO DO FORMULÁRIO VIA AJAX
// ===============================================

// Seleciona o formulário e a mensagem de sucesso
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

// Adiciona um "ouvinte" para o evento de 'submit' do formulário
form.addEventListener("submit", function(event) {
  // 1. Previne o comportamento padrão do navegador (que é recarregar a página)
  event.preventDefault(); 
  
  // 2. Coleta os dados do formulário
  const formData = new FormData(form);
  
  // 3. Envia os dados para o Formspree usando a API Fetch (AJAX)
  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    // 4. Se o envio foi bem-sucedido...
    if (response.ok) {
      // Esconde o formulário
      form.style.display = 'none';
      // Mostra a mensagem de sucesso
      successMessage.style.display = 'block';
    } else {
      // Se houve um erro na resposta do Formspree
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert('Oops! Ocorreu um problema ao enviar seu formulário.');
        }
      })
    }
  }).catch(error => {
    // Se houve um erro de rede (sem conexão, por exemplo)
    alert('Oops! Ocorreu um problema ao enviar seu formulário.');
  });
});