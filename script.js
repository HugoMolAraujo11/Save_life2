const estadoSelect = document.getElementById('estado');
const municipioSelect = document.getElementById('municipio');
const buscarHospitaisButton = document.getElementById('buscarHospitais');
const resultadoDiv = document.getElementById('resultado');
const loadingMessage = document.getElementById('loading');

// Preencher o dropdown de estados
const estados = [...new Set(hospitais.map(h => h.estado))];
estados.forEach(estado => {
    const option = document.createElement('option');
    option.value = estado;
    option.textContent = estado;
    estadoSelect.appendChild(option);
});

// Evento para habilitar o select de municípios
estadoSelect.addEventListener('change', function () {
    const estadoSelecionado = this.value;
    municipioSelect.innerHTML = '<option value="">Selecione um município</option>'; // Limpa municípios

    if (estadoSelecionado) {
        const municipios = [...new Set(hospitais.filter(h => h.estado === estadoSelecionado).map(h => h.municipio))];
        municipios.forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio;
            option.textContent = municipio;
            municipioSelect.appendChild(option);
        });
        municipioSelect.disabled = false; // Habilita o select de municípios
    } else {
        municipioSelect.disabled = true; // Desabilita se nenhum estado for selecionado
    }
});

// Evento para habilitar o botão de buscar hospitais
municipioSelect.addEventListener('change', function () {
    buscarHospitaisButton.disabled = this.value === ""; // Habilita se um município for selecionado
});

// Evento para buscar hospitais e exibir informações
buscarHospitaisButton.addEventListener('click', function () {
    const estadoSelecionado = estadoSelect.value;
    const municipioSelecionado = municipioSelect.value;

    if (estadoSelecionado && municipioSelecionado) {
        loadingMessage.style.display = 'block'; // Exibe a mensagem de carregamento
        const hospitaisFiltrados = hospitais.filter(h => h.estado === estadoSelecionado && h.municipio === municipioSelecionado);

        // Limpa resultados anteriores
        resultadoDiv.innerHTML = '';

        // Exibe os hospitais filtrados ou uma mensagem
        if (hospitaisFiltrados.length > 0) {
            hospitaisFiltrados.forEach(hospital => {
                const hospitalInfo = document.createElement('div');
                hospitalInfo.classList.add('hospital-info');
                hospitalInfo.innerHTML = `
                    <strong>${hospital.nome}</strong><br>
                    Endereço: ${hospital.endereco}<br>
                    Telefone: ${hospital.telefone}
                `;
                resultadoDiv.appendChild(hospitalInfo);
            });
        } else {
            resultadoDiv.textContent = 'Nenhum hospital encontrado para este município.';
        }
        loadingMessage.style.display = 'none'; // Esconde a mensagem de carregamento
    }
});