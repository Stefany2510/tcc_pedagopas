function calculateCustomTour() {
    const destination = document.getElementById('destination').value;
    const duration = document.getElementById('duration').value;
    const experiences = Array.from(document.querySelectorAll('input[name="experience"]:checked'))
        .map(checkbox => checkbox.value);

    if (!destination || !duration || experiences.length === 0) {
        alert('Por favor, preencha todas as opções para calcular seu roteiro personalizado.');
        return;
    }

    const basePrice = {
        'paris': 800,
        'roma': 750,
        'atenas': 700
    };

    const durationMultiplier = {
        '5': 1,
        '7': 1.4,
        '10': 2
    };

    const experiencePrice = 200;
    const totalPrice = basePrice[destination] * durationMultiplier[duration] + 
                      (experiences.length * experiencePrice);

    const resultDiv = document.getElementById('tourResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>Seu Roteiro Personalizado</h3>
        <p><strong>Destino:</strong> ${getDestinationName(destination)}</p>
        <p><strong>Duração:</strong> ${duration} dias</p>
        <p><strong>Experiências:</strong> ${experiences.map(exp => getExperienceName(exp)).join(', ')}</p>
        <p><strong>Investimento Total:</strong> R$ ${totalPrice.toLocaleString('pt-BR')}</p>
        <button class="btn-primary" onclick="requestCustomTour()">Solicitar Roteiro</button>
    `;
}

function getDestinationName(code) {
    const destinations = {
        'paris': 'Paris, França',
        'roma': 'Roma, Itália',
        'atenas': 'Atenas, Grécia'
    };
    return destinations[code];
}

function getExperienceName(code) {
    const experiences = {
        'cultural': 'Cultural',
        'historical': 'Histórica',
        'scientific': 'Científica'
    };
    return experiences[code];
}

function requestCustomTour() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Por favor, faça login para solicitar seu roteiro personalizado.');
        window.location.href = 'pages/login.html';
        return;
    }

    alert('Sua solicitação foi enviada com sucesso! Em breve nossa equipe entrará em contato.');
}