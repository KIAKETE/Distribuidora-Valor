// Dados do formulário
let formData = {};
let currentStep = 1;
const totalSteps = 7; // Total de seções do formulário

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
    updateProgress();
});

function initializeForm() {
    // Carregar dados salvos se existirem
    const savedData = localStorage.getItem('individualFormData');
    if (savedData) {
        formData = JSON.parse(savedData);
        populateForm();
    }
}

function setupEventListeners() {
    const form = document.getElementById('individualForm');
    const nextBtn = document.getElementById('nextBtn');
    
    // Event listeners para campos condicionais
    setupConditionalFields();
    
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

function setupConditionalFields() {
    // NIF Americano
    const nifAmericanoRadios = document.querySelectorAll('input[name="temNifAmericano"]');
    nifAmericanoRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const nifAmericanoGroup = document.getElementById('nifAmericanoGroup');
            if (this.value === 'sim') {
                nifAmericanoGroup.style.display = 'block';
                document.getElementById('nifAmericano').required = true;
            } else {
                nifAmericanoGroup.style.display = 'none';
                document.getElementById('nifAmericano').required = false;
                document.getElementById('nifAmericano').value = '';
            }
        });
    });
    
    // Outra Nacionalidade
    const outraNacionalidadeRadios = document.querySelectorAll('input[name="temOutraNacionalidade"]');
    outraNacionalidadeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const outraNacionalidadeGroup = document.getElementById('outraNacionalidadeGroup');
            if (this.value === 'sim') {
                outraNacionalidadeGroup.style.display = 'block';
            } else {
                outraNacionalidadeGroup.style.display = 'none';
                document.getElementById('outraNacionalidade').value = '';
            }
        });
    });
    
    // Checkbox vitalício
    const vitalicioCheckbox = document.getElementById('vitalicio');
    const dataValidadeInput = document.getElementById('dataValidade');
    
    vitalicioCheckbox.addEventListener('change', function() {
        if (this.checked) {
            dataValidadeInput.disabled = true;
            dataValidadeInput.value = '';
            dataValidadeInput.required = false;
        } else {
            dataValidadeInput.disabled = false;
            dataValidadeInput.required = true;
        }
    });
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
        case 'nif':
            if (value && !/^\d{9}$/.test(value)) {
                isValid = false;
                errorMessage = 'NIF deve ter 9 dígitos.';
            }
            break;
            
        case 'email':
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Email inválido.';
            }
            break;
            
        case 'telemovel':
        case 'telemovelCasa':
        case 'telemovelTrabalho':
            if (value && !/^\+?[\d\s\-\(\)]{9,}$/.test(value)) {
                isValid = false;
                errorMessage = 'Número de telefone inválido.';
            }
            break;
            
        case 'dataNascimento':
            if (value) {
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                
                if (age < 18) {
                    isValid = false;
                    errorMessage = 'Deve ter pelo menos 18 anos.';
                } else if (age > 120) {
                    isValid = false;
                    errorMessage = 'Data de nascimento inválida.';
                }
            }
            break;
            
        case 'dataEmissao':
            if (value) {
                const emissionDate = new Date(value);
                const today = new Date();
                
                if (emissionDate > today) {
                    isValid = false;
                    errorMessage = 'Data de emissão não pode ser futura.';
                }
            }
            break;
            
        case 'dataValidade':
            if (value && !document.getElementById('vitalicio').checked) {
                const validityDate = new Date(value);
                const today = new Date();
                
                if (validityDate <= today) {
                    isValid = false;
                    errorMessage = 'Documento expirado.';
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
    const form = document.getElementById('individualForm');
    const visibleFields = form.querySelectorAll('input:not([style*="display: none"]), select:not([style*="display: none"]), textarea:not([style*="display: none"])');
    let isValid = true;
    
    visibleFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validação especial para checkboxes obrigatórios
    const confirmaEndereco = document.getElementById('confirmaEndereco');
    if (confirmaEndereco && !confirmaEndereco.checked) {
        showError(confirmaEndereco, 'Deve confirmar o endereço.');
        isValid = false;
    }
    
    return isValid;
}

function saveFormData() {
    const form = document.getElementById('individualForm');
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
    localStorage.setItem('individualFormData', JSON.stringify(formData));
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
    
    // Trigger change events para campos condicionais
    document.querySelectorAll('input[name="temNifAmericano"]:checked').forEach(radio => {
        radio.dispatchEvent(new Event('change'));
    });
    
    document.querySelectorAll('input[name="temOutraNacionalidade"]:checked').forEach(radio => {
        radio.dispatchEvent(new Event('change'));
    });
    
    const vitalicioCheckbox = document.getElementById('vitalicio');
    if (vitalicioCheckbox.checked) {
        vitalicioCheckbox.dispatchEvent(new Event('change'));
    }
}

function handleNext() {
    if (validateCurrentStep()) {
        saveFormData();
        
        // Por agora, redirecionar para página de confirmação
        // Em implementação completa, aqui seria mostrada a próxima seção
        window.location.href = 'confirmacao.html?tipo=individual';
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
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Função para limpar dados salvos (útil para desenvolvimento)
function clearSavedData() {
    localStorage.removeItem('individualFormData');
    location.reload();
}

// Prevenir perda de dados ao sair da página
window.addEventListener('beforeunload', function(e) {
    saveFormData();
});

// Auto-save a cada 30 segundos
setInterval(saveFormData, 30000);

