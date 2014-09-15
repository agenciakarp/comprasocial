//FUNCAO ERRO
function show_modal(texto){
	console.log(texto);
	alert(texto);
}

//FUNCAO AUTOLOGIN
function autologin(){
	if(localStorage.getItem('token')){
		$.ui.loadContent("#produtos");
	}
}

//FUNCAO VERIFICA TOKEN
function check_token(){
	if(!localStorage.getItem('token')){
		$.ui.loadContent("#main");
	}
}

//FUNCAO LOGOUT
function logout(){
	console.log("logout");
	localStorage.removeItem('token');
	$.ui.loadContent("#main");
}

//FUNCAO CADASTRAR USUARIO
function user_add(){
	input_nome = document.getElementById("nome_cadastro").value;
	input_apelido = document.getElementById("apelido_cadastro").value;
	input_email = document.getElementById("email_cadastro").value;
	input_senha = document.getElementById("senha_cadastro").value;
	input_senha_confirmar = document.getElementById("senha_confirmar_cadastro").value;
	input_nascimento = document.getElementById("nascimento_cadastro").value;
	function success(data,status){
		show_modal(data);
		$.ui.loadContent("#login");
	}
	if(input_nome && input_apelido && input_email && input_senha && input_senha_confirmar && input_senha==input_senha_confirmar){
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

//FUNCAO LOGIN USUARIO
function user_login(){
	input_email = document.getElementById("email_login").value;
	input_senha = document.getElementById("senha_login").value;
	function success(data,status){
		response = eval(data);
		if(response==null){
			show_modal("Ocorreu um erro");
		}else{
			localStorage.setItem('token', response[0]['id']);
			autologin();
		}
	}
	if(input_email && input_senha){
		url = "http://sygoapp.com.br/webservice.php";
		data = { action:"user_login", email: input_email, senha:input_senha };
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

//FUNCAO CARREGAR O PAINEL MAIN
function load_main(){
	autologin();
}

//FUNCAO CARREGAR O PAINEL LOGIN
function load_login(){
	autologin();
}

//FUNCAO CARREGAR O PAINEL CADASTRO
function load_cadastro(){
	autologin();
}

//FUNCAO CARREGAR O PAINEL PRODUTOS
function load_produtos(){
	check_token();
}

//FUNCAO CARREGAR O PAINEL AMIGOS
function load_amigos(){
	check_token();
}

//FUNCAO CARREGAR O PAINEL LOJAS
function load_lojas(){
	check_token();
}

//FUNCAO CARREGAR O PAINEL MAPA
function load_mapa(){
	check_token();
}

//FUNCAO CARREGAR O PAINEL CONFIG
function load_config(){
	check_token();
}

//FUNCAO DE ESPERA PARA CARREGAR O APP
function onDeviceReady() {
	autologin();
}
document.addEventListener("deviceready", onDeviceReady, false);
autologin();
