// Dados do formulário e configurações
let formData = {};
let formType = '';

// Mapeamento de campos para labels legíveis
const fieldLabels = {
    // Tipo de Serviço
    tipoServico: 'Tipo de Serviço',
    tipoCliente: 'Tipo de Cliente',
    tipoSociedade: 'Tipo de Sociedade',
    
    // Identificação (Individual)
    nomeCompleto: 'Nome Completo',
    nif: 'NIF',
    temNifAmericano: 'Tem NIF Americano',
    nifAmericano: 'NIF Americano',
    genero: 'Género',
    tipoDocumento: 'Tipo de Documento',
    numeroDocumento: 'Número do Documento',
    entidadeEmissora: 'Entidade Emissora',
    nacionalidade: 'Nacionalidade',
    paisEmissao: 'País de Emissão',
    dataEmissao: 'Data de Emissão',
    dataValidade: 'Data de Validade',
    vitalicio: 'Vitalício',
    residenteCambial: 'Residente Cambial',
    dataNascimento: 'Data de Nascimento',
    temOutraNacionalidade: 'Tem Outra Nacionalidade',
    outraNacionalidade: 'Outra Nacionalidade',
    profissao: 'Profissão',
    objectivo: 'Objectivo',
    nomePai: 'Nome do Pai',
    nomeMae: 'Nome da Mãe',
    
    // Dados da Empresa (Coletiva)
    denominacaoSocial: 'Denominação Social',
    nifEmpresa: 'NIF da Empresa',
    diarioRepublica: 'Nº Diário da República',
    serie: 'Série',
    matriculaRegistoComercial: 'Nº Matrícula do Registo Comercial',
    dataCRC: 'Data da CRC',
    sectorActividades: 'Sector de Actividades',
    objectoSocial: 'Objecto Social',
    actividadePrincipal: 'Actividade Principal',
    finalidadeNegocio: 'Finalidade do Negócio',
    
    // Morada e Contactos (Individual)
    residencia: 'Residência',
    municipio: 'Município',
    provincia: 'Província',
    codigoPostal: 'Código Postal',
    pais: 'País',
    contactoPreferencial: 'Contacto Preferencial',
    melhorHoraDas: 'Melhor Hora (Das)',
    melhorHoraAte: 'Melhor Hora (Até)',
    telemovel: 'Telemóvel',
    telemovelCasa: 'Telemóvel Casa',
    telemovelTrabalho: 'Telemóvel Trabalho',
    email: 'Email',
    confirmaEndereco: 'Confirma Endereço',
    
    // Morada e Contactos (Empresa)
    enderecoSede: 'Endereço da Sede',
    municipioEmpresa: 'Município',
    provinciaEmpresa: 'Província',
    codigoPostalEmpresa: 'Código Postal',
    paisEmpresa: 'País',
    meioPreferencialComunicacao: 'Meio Preferencial de Comunicação',
    melhorHoraDasEmpresa: 'Melhor Hora (Das)',
    melhorHoraAteEmpresa: 'Melhor Hora (Até)',
    telemovelEmpresa: 'Telemóvel',
    telemovel2Empresa: 'Telemóvel 2',
    emailEmpresa: 'Email',
    websiteEmpresa: 'Website',
    
    // Dados Financeiros
    volumeNegocios: 'Volume de Negócios',
    moedaVolumeNegocios: 'Moeda (Volume de Negócios)',
    resultadoLiquido: 'Resultado Líquido',
    moedaResultadoLiquido: 'Moeda (Resultado Líquido)',
    capitalSocial: 'Capital Social',
    
    // Dados Bancários
    possuiContaCustodia: 'Possui Conta Custódia',
    bancoEmpresa: 'Banco',
    ibanEmpresa: 'IBAN'
};

// Mapeamento de valores para texto legível
const valueMapping = {
    tipoServico: {
        'CORRETAGEM': 'Corretagem',
        'GESTAO_NAO_DISCRICIONARIA': 'Gestão de Carteira Não Discricionária',
        'GESTAO_DISCRICIONARIA': 'Gestão Discricionária',
        'CONSULTORIA': 'Consultoria'
    },
    tipoCliente: {
        'PRIVADA': 'Privada',
        'ESTATAL': 'Estatal',
        'INSTITUCIONAL': 'Institucional',
        'ONGS': 'ONG\'s',
        'RELIGIOSAS': 'Religiosas',
        'INSTITUICAO_FINANCEIRA': 'Instituição Financeira',
        'OUTRO': 'Outro'
    },
    tipoSociedade: {
        'ANONIMA': 'Anónima',
        'POR_QUOTAS': 'Por Quotas',
        'COOPERATIVA': 'Cooperativa',
        'EM_NOME_COLETIVO': 'Em Nome Coletivo',
        'SGPS': 'SGPS',
        'OUTRO': 'Outro'
    },
    genero: {
        'masculino': 'Masculino',
        'feminino': 'Feminino'
    },
    tipoDocumento: {
        'BI': 'Bilhete de Identidade',
        'CEDULA': 'Cédula',
        'PASSAPORTE': 'Passaporte',
        'CARTAO_ESTRANGEIRO': 'Cartão de Estrangeiro',
        'OUTRO': 'Outro'
    },
    temNifAmericano: {
        'sim': 'Sim',
        'nao': 'Não'
    },
    residenteCambial: {
        'sim': 'Sim',
        'nao': 'Não'
    },
    temOutraNacionalidade: {
        'sim': 'Sim',
        'nao': 'Não'
    },
    contactoPreferencial: {
        'telefone': 'Telefone',
        'email': 'Email'
    },
    meioPreferencialComunicacao: {
        'telefone': 'Telefone',
        'email': 'Email'
    },
    possuiContaCustodia: {
        'sim': 'Sim',
        'nao': 'Não'
    },
    moedaVolumeNegocios: {
        'AOA': 'AOA (Kwanza)',
        'USD': 'USD (Dólar)',
        'EUR': 'EUR (Euro)'
    },
    moedaResultadoLiquido: {
        'AOA': 'AOA (Kwanza)',
        'USD': 'USD (Dólar)',
        'EUR': 'EUR (Euro)'
    }
};

// Seções do formulário
const formSections = {
    individual: [
        {
            title: 'Tipo de Serviço',
            fields: ['tipoServico']
        },
        {
            title: 'Identificação',
            fields: [
                'nomeCompleto', 'nif', 'temNifAmericano', 'nifAmericano', 'genero',
                'tipoDocumento', 'numeroDocumento', 'entidadeEmissora', 'nacionalidade',
                'paisEmissao', 'dataEmissao', 'dataValidade', 'vitalicio', 'residenteCambial',
                'dataNascimento', 'temOutraNacionalidade', 'outraNacionalidade', 'profissao',
                'objectivo', 'nomePai', 'nomeMae'
            ]
        },
        {
            title: 'Morada de Residência Permanente e Contactos',
            fields: [
                'residencia', 'municipio', 'provincia', 'codigoPostal', 'pais',
                'contactoPreferencial', 'melhorHoraDas', 'melhorHoraAte', 'telemovel',
                'telemovelCasa', 'telemovelTrabalho', 'email', 'confirmaEndereco'
            ]
        }
    ],
    coletiva: [
        {
            title: 'Tipo de Serviço e Cliente',
            fields: ['tipoServico', 'tipoCliente', 'tipoSociedade']
        },
        {
            title: 'Dados da Empresa',
            fields: [
                'denominacaoSocial', 'nifEmpresa', 'diarioRepublica', 'serie',
                'matriculaRegistoComercial', 'dataCRC', 'sectorActividades',
                'objectoSocial', 'actividadePrincipal', 'finalidadeNegocio'
            ]
        },
        {
            title: 'Morada e Contactos da Empresa',
            fields: [
                'enderecoSede', 'municipioEmpresa', 'provinciaEmpresa', 'codigoPostalEmpresa',
                'paisEmpresa', 'meioPreferencialComunicacao', 'melhorHoraDasEmpresa',
                'melhorHoraAteEmpresa', 'telemovelEmpresa', 'telemovel2Empresa',
                'emailEmpresa', 'websiteEmpresa'
            ]
        },
        {
            title: 'Dados Financeiros',
            fields: [
                'volumeNegocios', 'moedaVolumeNegocios', 'resultadoLiquido',
                'moedaResultadoLiquido', 'capitalSocial'
            ]
        },
        {
            title: 'Dados Bancários',
            fields: ['possuiContaCustodia', 'bancoEmpresa', 'ibanEmpresa']
        }
    ]
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

function initializePage() {
    // Obter tipo de formulário da URL
    const urlParams = new URLSearchParams(window.location.search);
    formType = urlParams.get('tipo') || 'individual';
    
    // Carregar dados do formulário
    loadFormData();
    
    // Renderizar confirmação
    renderConfirmation();
}

function loadFormData() {
    const storageKey = formType === 'individual' ? 'individualFormData' : 'coletivaFormData';
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
        formData = JSON.parse(savedData);
    } else {
        // Se não há dados, redirecionar de volta
        window.location.href = 'index.html';
    }
}

function setupEventListeners() {
    const editBtn = document.getElementById('editBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const submitBtn = document.getElementById('submitBtn');
    const newFormBtn = document.getElementById('newFormBtn');
    const homeBtn = document.getElementById('homeBtn');
    
    editBtn.addEventListener('click', handleEdit);
    downloadBtn.addEventListener('click', handleDownload);
    submitBtn.addEventListener('click', handleSubmit);
    newFormBtn.addEventListener('click', handleNewForm);
    homeBtn.addEventListener('click', handleHome);
}

function renderConfirmation() {
    const container = document.getElementById('confirmationContent');
    const sections = formSections[formType] || formSections.individual;
    
    let html = '';
    
    sections.forEach(section => {
        html += `
            <div class="confirmation-section">
                <h3 class="section-title">${section.title}</h3>
                <div class="confirmation-grid">
        `;
        
        section.fields.forEach(fieldName => {
            const label = fieldLabels[fieldName] || fieldName;
            const value = formatFieldValue(fieldName, formData[fieldName]);
            const isEmpty = !value || value === 'Não especificado';
            
            html += `
                <div class="confirmation-item ${isFullWidthField(fieldName) ? 'full-width' : ''}">
                    <div class="confirmation-label">${label}</div>
                    <div class="confirmation-value ${isEmpty ? 'empty' : ''}">${value}</div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function formatFieldValue(fieldName, value) {
    if (!value && value !== false) {
        return 'Não especificado';
    }
    
    // Valores booleanos
    if (typeof value === 'boolean') {
        return value ? 'Sim' : 'Não';
    }
    
    // Mapeamento de valores
    if (valueMapping[fieldName] && valueMapping[fieldName][value]) {
        return valueMapping[fieldName][value];
    }
    
    // Formatação de datas
    if (fieldName.includes('data') || fieldName.includes('Data')) {
        if (value) {
            const date = new Date(value);
            return date.toLocaleDateString('pt-PT');
        }
    }
    
    // Formatação de horas
    if (fieldName.includes('Hora')) {
        if (value) {
            return value;
        }
    }
    
    return value || 'Não especificado';
}

function isFullWidthField(fieldName) {
    const fullWidthFields = [
        'nomeCompleto', 'residencia', 'email', 'objectivo', 'nomePai', 'nomeMae',
        'denominacaoSocial', 'objectoSocial', 'actividadePrincipal', 'finalidadeNegocio',
        'enderecoSede', 'emailEmpresa', 'ibanEmpresa'
    ];
    return fullWidthFields.includes(fieldName);
}

function handleEdit() {
    const formPage = formType === 'individual' ? 'form-individual.html' : 'form-coletiva.html';
    window.location.href = formPage;
}

function handleDownload() {
    generatePDF();
}

function handleSubmit() {
    // Simular submissão
    const referenceNumber = generateReferenceNumber();
    
    // Mostrar modal de sucesso
    document.getElementById('referenceNumber').textContent = referenceNumber;
    document.getElementById('successModal').style.display = 'flex';
    
    // Limpar dados salvos
    const storageKey = formType === 'individual' ? 'individualFormData' : 'coletivaFormData';
    localStorage.removeItem(storageKey);
}

function handleNewForm() {
    window.location.href = 'index.html';
}

function handleHome() {
    window.location.href = 'index.html';
}

function generateReferenceNumber() {
    const prefix = formType === 'individual' ? 'IND' : 'COL';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
}

function generatePDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configurações
        const pageWidth = doc.internal.pageSize.width;
        const margin = 20;
        const lineHeight = 7;
        let yPosition = margin;
        
        // Cabeçalho
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('DISTRIBUIDORA VALOR - S.D.V.M. (SU), S.A.', margin, yPosition);
        yPosition += lineHeight + 5;
        
        doc.setFontSize(14);
        doc.text('Ficha de Abertura de Conta de Custódia', margin, yPosition);
        yPosition += lineHeight + 5;
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text(`Tipo: ${formType === 'individual' ? 'Pessoa Individual' : 'Pessoa Coletiva'}`, margin, yPosition);
        yPosition += lineHeight + 10;
        
        // Dados do formulário
        const sections = formSections[formType] || formSections.individual;
        
        sections.forEach(section => {
            // Verificar se precisa de nova página
            if (yPosition > doc.internal.pageSize.height - 40) {
                doc.addPage();
                yPosition = margin;
            }
            
            // Título da seção
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text(section.title, margin, yPosition);
            yPosition += lineHeight + 3;
            
            // Linha separadora
            doc.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 5;
            
            // Campos da seção
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            
            section.fields.forEach(fieldName => {
                if (yPosition > doc.internal.pageSize.height - 30) {
                    doc.addPage();
                    yPosition = margin;
                }
                
                const label = fieldLabels[fieldName] || fieldName;
                const value = formatFieldValue(fieldName, formData[fieldName]);
                
                doc.text(`${label}: ${value}`, margin, yPosition);
                yPosition += lineHeight;
            });
            
            yPosition += 10;
        });
        
        // Rodapé
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(
                'Rua Marechal Brós Tito nº 35/37, Torre Escom, 2º andar, Kinaxixi, Luanda | NIF: 5001492500',
                margin,
                doc.internal.pageSize.height - 10
            );
            doc.text(
                `Página ${i} de ${pageCount}`,
                pageWidth - margin - 20,
                doc.internal.pageSize.height - 10
            );
        }
        
        // Baixar PDF
        const fileName = `ficha_abertura_conta_${formType}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);
        
        showNotification('PDF gerado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showNotification('Erro ao gerar PDF. Tente novamente.', 'error');
    }
}

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos inline para a notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Cores baseadas no tipo
    switch (type) {
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        default:
            notification.style.backgroundColor = '#007bff';
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

