<?php
header('Access-Control-Allow-Origin: *');
define( "HOST", "sygoapp.com.br" );
define( "DB", "sygoapp_sistema" );
define( "LOGIN", "sygoapp_sistema" );
define( "PASS", "49#ccMu6" );
$con=mysqli_connect(HOST,LOGIN,PASS,DB);

//Função pra adicionar usuário novo no webservice
if($_POST['action']=="user_add"){
	$nome_usuario=$_POST['nome'];
	$apelido=$_POST['apelido'];
	$email=$_POST['email'];
	$senha=md5($_POST['senha']);
	$nascimento=$_POST['nascimento'];
	$data_cadastro=date("Y-m-d H:i:s");
	$ultimo_acesso=date("Y-m-d H:i:s");
	$result = mysqli_query($con,"INSERT INTO app_usuarios  (nome_usuario,apelido,email,senha,nascimento,data_cadastro,ultimo_acesso) VALUES ('$nome_usuario','$apelido','$email','$senha','$nascimento','$data_cadastro','$ultimo_acesso')") or die(mysql_error());
	if($result){
		echo "Usuário cadastrado com sucesso";
	}else{
		echo "Erro ao cadastrar usuário";
	}
}

//Função pra fazer o login do usuario
if($_POST['action']=="user_login"){
	$email=$_POST['email'];
	$senha=md5($_POST['senha']);
	$result = mysqli_query($con,"SELECT id from app_usuarios  WHERE email='$email' AND senha='$senha' LIMIT 2") or die(mysql_error());
	while($row = $result->fetch_assoc()) $response[] = $row;
	$response = json_encode($response);
	echo $response;
}


mysqli_close($con);
?>

