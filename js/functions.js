//FUNCAO ERRO
function show_modal(texto){
	console.log(texto);
	$.ui.popup( {
		title:"Mensagem:",
		message:texto,
		cancelText:"Continuar",
		cancelCallback: function(){console.log("cancelled");},
		doneText:"Ok",
		doneCallback: function(){console.log("Done for!");},
		cancelOnly:true
	});

}

//FUNCAO CADASTRAR USUARIO
function user_add(){
	input_nome = document.getElementById("nome").value
	input_apelido = document.getElementById("apelido").value
	input_email = document.getElementById("email").value
	input_senha = document.getElementById("senha").value
	input_senha_confirmar = document.getElementById("senha_confirmar").value
	input_nascimento = document.getElementById("nascimento").value
	if(nome && apelido && email && senha==senha_confirmar){
		url = "../webservice.php";
		data = { action:"user_add", nome: input_nome, apelido: input_apelido,email: input_email, senha:input_senha,nascimento:input_nascimento };
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: success
		});
		function success(data,status){
			response = eval(data);
			console.log(response);
			show_modal("Usuário cadastrado com sucesso");
		}
	}else{
		show_modal("Confira os campos e tente novamente");
	}
}

