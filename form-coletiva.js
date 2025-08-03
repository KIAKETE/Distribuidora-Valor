// Dados do formulário
let formData = {};
let currentStep = 1;
const totalSteps = 6; // Total de seções do formulário

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
    updateProgress();
});

function initializeForm() {
    // Carregar dados salvos se existirem
    const savedData = localStorage.getItem('coletivaFormData');
    if (savedData) {
        formData = JSON.parse(savedData);
        populateForm();
    }
}

function setupEventListeners() {
    const form = document.getElementById('coletivaForm');
    const nextBtn = document.getElementById('nextBtnColetiva');
    
    // Validação em tempo real
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            clearError(input);
            saveFormData();
        });
    });
    
    // Botão continuar
    nextBtn.addEventListener('click', handleNext);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Validação de campos obrigatórios
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório.';
    }
    
    // Validações específicas
    switch (fieldName) {
        case 'nifEmpresa':
            if (value && !/^\d{9}$/.test(value)) {
                isValid = false;
                errorMessage = 'NIF deve ter 9 dígitos.';
            }
            break;
            
        case 'emailEmpresa':
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Email inválido.';
            }
            break;
            
        case 'telemovelEmpresa':
        case 'telemovel2Empresa':
            if (value && !/^\+?[\d\s\-\(\)]{9,}$/.test(value)) {
                isValid = false;
                errorMessage = 'Número de telefone inválido.';
            }
            break;
            
        case 'websiteEmpresa':
            if (value && !/^https?:\/\/.+\..+/.test(value)) {
                isValid = false;
                errorMessage = 'URL inválida. Deve começar com http:// ou https://';
            }
            break;
            
        case 'volumeNegocios':
        case 'resultadoLiquido':
        case 'capitalSocial':
            if (value && parseFloat(value) < 0) {
                isValid = false;
                errorMessage = 'Valor deve ser positivo.';
            }
            break;
            
        case 'ibanEmpresa':
            if (value && !/^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}$/.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'IBAN inválido.';
            }
            break;
            
        case 'dataCRC':
            if (value) {
                const crcDate = new Date(value);
                const today = new Date();
                
                if (crcDate > today) {
                    isValid = false;
                    errorMessage = 'Data não pode ser futura.';
                }
            }
            break;
    }
    
    // Validação de radio buttons obrigatórios
    if (field.type === 'radio' && field.required) {
        const radioGroup = document.querySelectorAll(`input[name="${fieldName}"]`);
        const isChecked = Array.from(radioGroup).some(radio => radio.checked);
        
        if (!isChecked) {
            isValid = false;
            errorMessage = 'Selecione uma opção.';
        }
    }
    
    // Mostrar/esconder erro
    if (isValid) {
        clearError(field);
    } else {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function validateCurrentStep() {
    const form = document.getElementById('coletivaForm');
    const visibleFields = form.querySelectorAll('input:not([style*="display: none"]), select:not([style*="display: none"]), textarea:not([style*="display: none"])');
    let isValid = true;
    
    visibleFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function saveFormData() {
    const form = document.getElementById('coletivaForm');
    const formDataObj = new FormData(form);
    
    // Converter FormData para objeto
    formData = {};
    for (let [key, value] of formDataObj.entries()) {
        formData[key] = value;
    }
    
    // Salvar checkboxes
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        formData[checkbox.name] = checkbox.checked;
    });
    
    // Salvar no localStorage
    localStorage.setItem('coletivaFormData', JSON.stringify(formData));
}

function populateForm() {
    Object.keys(formData).forEach(key => {
        const field = document.querySelector(`[name="${key}"]`);
        if (field) {
            if (field.type === 'checkbox') {
                field.checked = formData[key];
            } else if (field.type === 'radio') {
                const radioButton = document.querySelector(`[name="${key}"][value="${formData[key]}"]`);
                if (radioButton) {
                    radioButton.checked = true;
                }
            } else {
                field.value = formData[key];
            }
        }
    });
}

function handleNext() {
    if (validateCurrentStep()) {
        saveFormData();
        
        // Redirecionar para página de confirmação
        window.location.href = 'confirmacao.html?tipo=coletiva';
    } else {
        // Scroll para o primeiro erro
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        showNotification('Por favor, corrija os erros antes de continuar.', 'error');
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = progress + '%';
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

// Função para limpar dados salvos (útil para desenvolvimento)
function clearSavedData() {
    localStorage.removeItem('coletivaFormData');
    location.reload();
}

// Prevenir perda de dados ao sair da página
window.addEventListener('beforeunload', function(e) {
    saveFormData();
});

// Auto-save a cada 30 segundos
setInterval(saveFormData, 30000);

