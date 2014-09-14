//FUNCAO ERRO
function show_modal(texto){
	console.log(texto);
	$.ui.popup( {
		title:"Mensagem:",
		message:texto,
		cancelText:"Continuar",
		cancelCallback: function(){console.log("Cancel");},
		doneText:"Ok",
		doneCallback: function(){console.log("Ok");},
		cancelOnly:true
	});
}

//FUNCAO CADASTRAR USUARIO
function user_add(){
	input_nome = document.getElementById("nome").value;
	input_apelido = document.getElementById("apelido").value;
	input_email = document.getElementById("email").value;
	input_senha = document.getElementById("senha").value;
	input_senha_confirmar = document.getElementById("senha_confirmar").value;
	input_nascimento = document.getElementById("nascimento").value;
	function success(data,status){
		//response = eval(data);
		console.log(response);
		show_modal(response);
	}
	if(input_nome && input_apelido && input_email && input_senha==input_senha_confirmar){
		url = "http://sygoapp.com.br/webservice.php";
		data = { action:"user_add", nome: input_nome, apelido: input_apelido,email: input_email, senha:input_senha,nascimento:input_nascimento };
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: success
		});
	}else{
		show_modal("Confira os campos e tente novamente");
	}
}

