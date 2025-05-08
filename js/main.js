// Função para atualizar informações do usuário na navegação
function updateUserInfo() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        const userInfo = document.getElementById('userInfo');
        if (userInfo) {
            userInfo.textContent = `Olá, ${user.name}`;
        }
    }
}

// Função para fazer logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/pages/login.html';
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateUserInfo();
    
    // Adiciona comportamento suave ao scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adiciona handlers para os botões "Saiba mais"
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', () => {
            alert('Entre em contato conosco para mais informações sobre este pacote!');
        });
    });

    // Handler para o formulário de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert(`Obrigado por se inscrever! Você receberá nossas novidades no email: ${email}`);
            newsletterForm.reset();
        });
    }
});