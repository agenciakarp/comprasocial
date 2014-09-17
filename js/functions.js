//FUNCAO ERRO
function show_modal(texto){
	console.log(texto);
	alert(texto);
}

//FUNCAO LOGIN FACEBOOK
function facebook_login() {
	function success(data,status){
		localStorage.setItem('facebooklogin', '1');
		user_login();
	}
	FB.login(
		function(response){
			if(response.authResponse) {
				FB.api('/me', function(response) {
					//document.getElementById("faceinfo").innerHTML='Bem vindo, ' + response.name+'</br>Email: ' + response.email;
					document.getElementById("email_login").value=response.email;
					document.getElementById("senha_login").value=response.email;
					input_nome = response.name;
					input_apelido = response.name;
					input_email = response.email;
					input_senha = response.email;
					input_senha_confirmar = response.email;
					input_nascimento = "0";
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
						show_modal("Ocorreu um erro ao logar com facebook");
					}
				});
			}else{
				show_modal('Erro ao autenticar');
			}	
		},
		{ scope: "email,user_friends" }
	);
}

//FUNCAO CONFIG CONECTAR COM FACEBOOK ( AMIGOS )
function facebook_friends() {
	FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
		if(response.error) {
			show_modal("Erro");
			show_modal(JSON.stringify(response.error));
		}else{
			show_modal("Total de Amigos "+response.summary['total_count']);
			show_modal("Amigo 1: "+JSON.stringify(response.data[1]));
		}
	});
}

//FUNCAO AUTOLOGIN
function autologin(){
	if(localStorage.getItem('token')){
		$.ui.loadContent("#produtos");
	}
}

//FUNCAO LOGOUT
function app_logout(){
	localStorage.removeItem('token');
	localStorage.removeItem('nome');
	localStorage.removeItem('email');
	localStorage.removeItem('apelido');
	localStorage.removeItem('nascimento');
	localStorage.removeItem('facebooklogin');
	$.ui.loadContent("#main");
}

//FUNCAO VERIFICA TOKEN
function check_token(){
	if(!localStorage.getItem('token')){
		$.ui.loadContent("#main");
	}
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

//FUNCAO EDITAR USUARIO
function user_edit(){
	input_id = localStorage.getItem('token');
	input_nome = document.getElementById("nome_edit").value;
	input_apelido = document.getElementById("apelido_edit").value;
	input_email = document.getElementById("email_edit").value;
	input_senha = document.getElementById("senha_edit").value;
	input_senha_confirmar = document.getElementById("senha_confirmar_edit").value;
	input_nascimento = document.getElementById("nascimento_edit").value;
	function success(data,status){
		show_modal(data);
		app_logout();
		//$.ui.loadContent("#config");
	}
	if(input_nome && input_apelido && input_email && input_senha==input_senha_confirmar){
		url = "http://sygoapp.com.br/webservice.php";
		data = { action:"user_edit", id: input_id, nome: input_nome, apelido: input_apelido,email: input_email, senha:input_senha,nascimento:input_nascimento };
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
			app_logout();
		}else{
			localStorage.setItem('token', response[0]['id']);
			localStorage.setItem('nome', response[0]['nome_usuario']);
			localStorage.setItem('email', response[0]['email']);
			localStorage.setItem('apelido', response[0]['apelido']);
			localStorage.setItem('nascimento', response[0]['nascimento']);
			autologin();
		}
	}
	if(input_email && input_senha){
		url = "http://sygoapp.com.br/webservice.php";
		if(localStorage.getItem('facebooklogin')=='1'){
			input_action = "user_login_facebook";
		}else{
			input_action = "user_login";
		}
		data = { action:input_action, email: input_email, senha:input_senha };
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
	$.ui.disableRightSideMenu();
	document.getElementById("btnsidebar").style.display="none";
}

//FUNCAO CARREGAR O PAINEL LOGIN
function load_login(){
	autologin();
	$.ui.disableRightSideMenu();
	document.getElementById("btnsidebar").style.display="none";
}

//FUNCAO CARREGAR O PAINEL CADASTRO
function load_cadastro(){
	autologin();
	$.ui.disableRightSideMenu();
	document.getElementById("btnsidebar").style.display="none";
}

//FUNCAO CARREGAR O PAINEL PRODUTOS
function load_produtos(){
	check_token();
	$.ui.enableRightSideMenu();
	document.getElementById("btnsidebar").style.display="block";
}

//FUNCAO CARREGAR O PAINEL AMIGOS
function load_amigos(){
	check_token();
	$.ui.enableRightSideMenu();
	document.getElementById("btnsidebar").style.display="block";
}

//FUNCAO CARREGAR O PAINEL LOJAS
function load_lojas(){
	check_token();
	$.ui.enableRightSideMenu();
	document.getElementById("btnsidebar").style.display="block";
}

//FUNCAO CARREGAR O PAINEL MAPA
function load_mapa(){
	check_token();
	$.ui.enableRightSideMenu();
	document.getElementById("btnsidebar").style.display="block";
}

//FUNCAO CARREGAR O PAINEL CONFIG
function load_config(){
	check_token();
	$.ui.enableRightSideMenu();
	if(localStorage.getItem('facebooklogin')==1){
		document.getElementById("config_facebook").style.display="block";
		document.getElementById("config_profile").style.display="none";
	}else{
		document.getElementById("config_facebook").style.display="none";
		document.getElementById("config_profile").style.display="block";
		document.getElementById("nome_edit").value=localStorage.getItem('nome');
		document.getElementById("apelido_edit").value=localStorage.getItem('apelido');
		document.getElementById("email_edit").value=localStorage.getItem('email');
		document.getElementById("nascimento_edit").value=localStorage.getItem('nascimento');
	}
	document.getElementById("btnsidebar").style.display="block";
}

//FUNCAO QUE ESPERA ATÉ CARREGAR O APP
function onDeviceReady() {
	//Inicia a API do login do facebook
	FB.init({ appId: "496715470431107", nativeInterface: CDV.FB, useCachedDialogs: false });
	autologin();
}

document.addEventListener("deviceready", onDeviceReady, false);
autologin();

