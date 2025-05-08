// Função para verificar se o usuário está autenticado
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.href.includes('/pages/login.html') && !window.location.href.includes('/pages/register.html')) {
        window.location.href = '/pages/login.html';
    }
}

// Função para validar o formulário de registro
function validateRegisterForm(name, email, school, password, confirmPassword) {
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return false;
    }
    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!');
        return false;
    }
    return true;
}

// Função para salvar usuário no localStorage
function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para verificar login
function checkLogin(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => user.email === email && user.password === password);
}

// Manipulador do formulário de registro
if (document.getElementById('registerForm')) {
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const school = document.getElementById('school').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (validateRegisterForm(name, email, school, password, confirmPassword)) {
            const user = { name, email, school, password };
            saveUser(user);
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        }
    });
}

// Manipulador do formulário de login
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = checkLogin(email, password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login realizado com sucesso!');
            window.location.href = '../index.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    });
}

// Verifica autenticação ao carregar a página
document.addEventListener('DOMContentLoaded', checkAuth);