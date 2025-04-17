const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

  alertPlaceholder.append(wrapper);
}

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o recarregamento

    // Captura os valores dos campos
    const cpfUsuario = document.getElementById("cpfUsuario").value.trim();
    const nomeUsuario = document.getElementById("nomeUsuario").value.trim();
    const dataNasc = document.getElementById("dataNasc").value.trim();
    const cargFunc = document.getElementById("cargFunc").value;

    // Inicializa uma variável para armazenar erros
    let mensagemErro = "";

    // Remove a formatação do CPF para validar corretamente
    const cpfSemFormatacao = cpfUsuario.replace(/\D/g, "");

    // Validação do CPF
    if (cpfSemFormatacao === "" || !/^\d{11}$/.test(cpfSemFormatacao)) {
        mensagemErro += "O CPF deve conter 11 dígitos.\n";
    }

    // Validação do Nome
    if (nomeUsuario === "") {
        mensagemErro += "O campo Nome é obrigatório.\n";
    }

    // Validação da Data de Nascimento
    if (dataNasc === "") {
        mensagemErro += "A Data de Nascimento é obrigatória.\n";
    }

    // Validação do Cargo
    if (cargFunc === "") {
        mensagemErro += "Selecione um cargo válido.\n";
    }

    // Exibe erros ou envia o formulário
    if (mensagemErro) {
        alert(mensagemErro); // Exibe os erros em um alerta
    } else {
        appendAlert('Usuário Cadastrado com sucesso!', 'success'); // Chama a função para exibir o alerta
        // Aqui você pode enviar o formulário, se necessário
        // this.submit(); // Envia o formulário
    }
});

document.getElementById("cpfUsuario").addEventListener("input", function () {
    let cpf = this.value;

    // Remove caracteres que não sejam números
    cpf = cpf.replace(/\D/g, "");

    // Adiciona a máscara de CPF (000.000.000-00)
    cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");       // Adiciona o primeiro ponto
    cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3"); // Adiciona o segundo ponto
    cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4"); // Adiciona o hífen

    // Atualiza o valor do campo com a máscara aplicada
    this.value = cpf;
});

