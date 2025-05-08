document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Atualizar informações do perfil
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userSchool').textContent = `Escola: ${currentUser.school}`;
    document.getElementById('userEmail').textContent = `Email: ${currentUser.email}`;

    // Manipular formulário de preferências
    const preferencesForm = document.getElementById('preferencesForm');
    preferencesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
            .map(checkbox => checkbox.value);
        const budget = document.getElementById('budget').value;

        const preferences = { interests, budget };
        
        // Salvar preferências no localStorage
        const updatedUser = { ...currentUser, preferences };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        alert('Preferências salvas com sucesso!');
    });

    // Carregar preferências salvas
    if (currentUser.preferences) {
        const { interests, budget } = currentUser.preferences;
        
        interests?.forEach(interest => {
            const checkbox = document.querySelector(`input[value="${interest}"]`);
            if (checkbox) checkbox.checked = true;
        });

        if (budget) {
            document.getElementById('budget').value = budget;
        }
    }
});