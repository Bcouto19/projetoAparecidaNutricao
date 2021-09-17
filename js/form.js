//Adcionando novos pacientes

var botaoAdicionar = document.querySelector("#adicionar-paciente"); // nessa parte do codigo pego o evento de click no botão
botaoAdicionar.addEventListener("click", function(event){ // nessa parte do evito o evento padrão do imput Submit
	event.preventDefault();
	
	var form = document.querySelector("#form-adiciona"); 
    // Extrai informações do paciente
    var paciente = obtemPacienteDoFormulario(form);

    var erros = validaPaciente(paciente);
    console.log(erros);
    if(erros.length > 0){
       exibeMensagensDeErro(erros);
       return;
    }

    
    adicionaPacienteNatabela(paciente);
	
    
    form.reset();
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

});

function adicionaPacienteNatabela(paciente){

     // cria a tr a td do paciente
    var pacienteTr = montaTr(paciente);

    // adicionando o paciente na tabela
	var tabela = document.querySelector("#tabela-pacientes"); // adicona de fato um novo cleinte na tag Tbody

    tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement("li")
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)

    }

    return paciente;
}

function montaTr(paciente){

    var pacienteTr = document.createElement("tr"); // cria uma nova tr
    pacienteTr.classList.add("paciente");
	
	pacienteTr.appendChild(montaTd(paciente.nome, "info-nome")); //adiciona os dados preenchidos nas tds
	pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
	pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
	pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;

}

function montaTd(dado,classe){

    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe)

    return td;
}

function validaPaciente(paciente){

    var erros = [];
    
    if(!validaPeso(paciente.peso))erros.push("Peso é inválido");
    if(!validaAltura(paciente.altura))erros.push("Altura é invalida");

    if(paciente.gordura.length == 0)erros.push("Digite o valor da gordura");
    if(paciente.nome.length == 0)erros.push("Digite o nome do paciente");
    if(paciente.altura.length == 0)erros.push("Digite a altura do paciente");
    if(paciente.peso.length == 0)erros.push("Digite o peso do paciente");

    return erros;
}